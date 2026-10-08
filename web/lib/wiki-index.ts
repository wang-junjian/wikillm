import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import {
  fromPath,
  toPath,
  categoryOf,
  fromWikilink,
  normalizeWikilinkTarget,
} from './slug'

export interface WikiIndexEntry {
  slug: string
  title: string
  category?: string
}

export interface WikiIndexSnapshot {
  /** 按 title 排序的全部页面索引（不含 html） */
  entries: WikiIndexEntry[]
  /** 按一级目录分组，Sidebar 直接消费；根目录页面不在其中 */
  byCategory: Map<string, WikiIndexEntry[]>
}

export interface BrokenLink {
  target: string
  label: string
}

export interface RenderedPage extends WikiIndexEntry {
  html: string
  frontmatter: Record<string, unknown>
  brokenLinks: BrokenLink[]
}

export interface WikiIndex {
  /** 遍历文件系统 + frontmatter，产出索引；不渲染任何页面 */
  scan(): Promise<WikiIndexSnapshot>
  /** 按需渲染单页：wikilink 改写、图片路径拍平、remark → html */
  render(slug: string): Promise<RenderedPage | null>
}

interface ScanResult {
  snapshot: WikiIndexSnapshot
  linkMap: Map<string, string>
  pathBySlug: Map<string, string>
}

// 与 skill 约定一致：assets（图片）与 visual（Marp 幻灯片）不是 wiki 页面
const EXCLUDED_DIRS = new Set(['assets', 'visual'])

// 断链在 markdown 阶段以哨兵链接的形式存在（sanitize 会剥离 raw HTML，
// 链接则能安全通过），remark 输出后再还原为可见样式的 span
const BROKEN_LINK_PREFIX = '#wikillm-broken:'

export function createWikiIndex(root: string): WikiIndex {
  // 生产构建期缓存一次；dev 模式每请求重扫，wiki 变更即时可见
  const isDev = process.env.NODE_ENV === 'development'
  let cached: ScanResult | null = null

  function scanOnce(): ScanResult {
    const entries: WikiIndexEntry[] = []
    const pathBySlug = new Map<string, string>()

    function traverse(dir: string, category?: string) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          if (!EXCLUDED_DIRS.has(entry.name)) {
            traverse(path.join(dir, entry.name), entry.name)
          }
        } else if (entry.name.endsWith('.md')) {
          const filePath = path.join(dir, entry.name)
          const slug = fromPath(path.relative(root, filePath))
          let title = path.basename(entry.name, '.md')
          try {
            const { data } = matter(fs.readFileSync(filePath, 'utf8'))
            if (data.title) title = data.title
          } catch {
            // 读不了的页面不进索引
            continue
          }
          entries.push({ slug, title, category })
          pathBySlug.set(slug, filePath)
        }
      }
    }
    traverse(root)
    entries.sort((a, b) => a.title.localeCompare(b.title))

    const byCategory = new Map<string, WikiIndexEntry[]>()
    for (const entry of entries) {
      if (!entry.category) continue
      const list = byCategory.get(entry.category) ?? []
      list.push(entry)
      byCategory.set(entry.category, list)
    }

    // linkMap：wikilink 目标 -> slug。三种键（文件名 / 归一化标题 /
    // 完整 slug，全小写），与 Obsidian 侧的链接习惯保持行为兼容
    const linkMap = new Map<string, string>()
    for (const entry of entries) {
      const filename = path.basename(toPath(entry.slug))
      linkMap.set(filename.toLowerCase(), entry.slug)
      if (entry.title) {
        linkMap.set(normalizeWikilinkTarget(entry.title), entry.slug)
      }
      linkMap.set(entry.slug.toLowerCase(), entry.slug)
    }

    return { snapshot: { entries, byCategory }, linkMap, pathBySlug }
  }

  async function scan(): Promise<WikiIndexSnapshot> {
    if (cached && !isDev) return cached.snapshot
    cached = scanOnce()
    return cached.snapshot
  }

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  /** 把哨兵链接还原为断链 span；label 已经过 remark 的 HTML 转义 */
  function restoreBrokenLinks(html: string): string {
    return html.replace(
      /<a href="#wikillm-broken:([^"]*)">(.*?)<\/a>/g,
      (_match, encoded: string, label: string) =>
        `<span class="broken-link" title="断链: ${escapeHtml(decodeURIComponent(encoded))}">${label}</span>`,
    )
  }

  function renderWikiLinks(markdown: string, linkMap: Map<string, string>) {
    const brokenLinks: BrokenLink[] = []
    const processed = markdown.replace(
      /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
      (_match, target: string, label?: string) => {
        const linkLabel = label || target
        const actualSlug = fromWikilink(target, linkMap)
        if (!actualSlug) {
          brokenLinks.push({ target, label: linkLabel })
          return `[${linkLabel}](${BROKEN_LINK_PREFIX}${encodeURIComponent(target)})`
        }
        return `[${linkLabel}](/wiki/${actualSlug})`
      },
    )
    return { processed, brokenLinks }
  }

  function flattenImagePaths(markdown: string): string {
    return markdown.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt: string, imgPath: string) => {
        if (/^https?:\/\//.test(imgPath)) return match
        // 与 skill 的「assets 扁平同步」约定对应：图片按文件名从 /assets 服务
        return `![${alt}](/assets/${path.posix.basename(imgPath)})`
      },
    )
  }

  async function render(slug: string): Promise<RenderedPage | null> {
    await scan()
    const { linkMap, pathBySlug } = cached as ScanResult

    // 双重查找：先按 slug 直接命中，再经 linkMap 兜底（兼容 wikilink 风格 URL）
    const filePath =
      pathBySlug.get(slug) ??
      pathBySlug.get(linkMap.get(slug.toLowerCase()) ?? '')
    if (!filePath) return null

    try {
      const { data, content: markdown } = matter(fs.readFileSync(filePath, 'utf8'))
      const { processed, brokenLinks } = renderWikiLinks(markdown, linkMap)
      const withImages = flattenImagePaths(processed)

      const html = restoreBrokenLinks(
        String(
          await remark()
            .use(remarkGfm)
            .use(remarkHtml)
            .process(withImages),
        ),
      )

      const frontmatter: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(data)) {
        frontmatter[key] = value instanceof Date ? value.toISOString().split('T')[0] : value
      }

      const actualSlug = fromPath(path.relative(root, filePath))
      return {
        slug: actualSlug,
        title: (frontmatter.title as string) || path.basename(filePath, '.md'),
        category: categoryOf(actualSlug),
        html,
        frontmatter,
        brokenLinks,
      }
    } catch (e) {
      console.error('Error rendering page:', filePath, e)
      return null
    }
  }

  return { scan, render }
}
