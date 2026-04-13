import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

const WIKI_ROOT = path.join(process.cwd(), '../wiki')

export interface WikiPage {
  slug: string
  title: string
  content: string
  html: string
  frontmatter: Record<string, any>
  category?: string
}

export interface WikiLink {
  target: string
  label: string
}

// 全局缓存：链接目标 -> slug
let linkMap: Map<string, string> | null = null

// 构建链接映射
async function buildLinkMap(): Promise<Map<string, string>> {
  if (linkMap) return linkMap

  linkMap = new Map()
  const pages = await getAllPagesBasic()

  for (const page of pages) {
    // 用文件名作为键（不带扩展名）
    const filename = path.basename(page.slug.replace(/--/g, '/'))
    linkMap.set(filename.toLowerCase(), page.slug)
    // 也用标题作为键
    if (page.title) {
      const normalizedTitle = page.title.toLowerCase().replace(/\s+/g, '-')
      linkMap.set(normalizedTitle, page.slug)
    }
    // 也用完整 slug 作为键
    linkMap.set(page.slug.toLowerCase(), page.slug)
  }

  return linkMap
}

// 基本版本，不处理链接和图片（避免循环依赖）
async function getAllPagesBasic(): Promise<WikiPage[]> {
  const pages: WikiPage[] = []

  function traverse(dir: string, category?: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'assets' && entry.name !== 'visual') {
        traverse(path.join(dir, entry.name), entry.name)
      } else if (entry.name.endsWith('.md')) {
        const page = getPageBasic(path.join(dir, entry.name), category)
        if (page) {
          pages.push(page)
        }
      }
    }
  }

  traverse(WIKI_ROOT)
  return pages.sort((a, b) => a.title.localeCompare(b.title))
}

// 基本版本，不处理链接和图片
function getPageBasic(filePath: string, category?: string): WikiPage | null {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(content)

    const relativePath = path.relative(WIKI_ROOT, filePath)
    const slug = relativePath.replace(/\.md$/, '').replace(/\//g, '--')

    return {
      slug,
      title: data.title || path.basename(filePath, '.md'),
      content: '',
      html: '',
      frontmatter: data,
      category,
    }
  } catch (e) {
    return null
  }
}

// 获取所有 wiki 页面
export async function getAllPages(): Promise<WikiPage[]> {
  const pages: WikiPage[] = []
  const map = await buildLinkMap()

  async function traverse(dir: string, category?: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== 'assets' && entry.name !== 'visual') {
        await traverse(path.join(dir, entry.name), entry.name)
      } else if (entry.name.endsWith('.md')) {
        const page = await getPageByPath(path.join(dir, entry.name), category, map)
        if (page) {
          pages.push(page)
        }
      }
    }
  }

  await traverse(WIKI_ROOT)
  return pages.sort((a, b) => a.title.localeCompare(b.title))
}

// 通过路径获取页面
export async function getPageByPath(filePath: string, category?: string, linkMap?: Map<string, string>): Promise<WikiPage | null> {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const { data, content: markdown } = matter(content)

    const relativePath = path.relative(WIKI_ROOT, filePath)
    const slug = relativePath.replace(/\.md$/, '').replace(/\//g, '--')

    const map = linkMap || await buildLinkMap()
    let processedMarkdown = parseWikiLinks(markdown, map)
    processedMarkdown = parseImagePaths(processedMarkdown)

    const processed = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(processedMarkdown)

    const html = String(processed)

    const frontmatter: Record<string, any> = {}
    for (const [key, value] of Object.entries(data)) {
      frontmatter[key] = value instanceof Date ? value.toISOString().split('T')[0] : value
    }

    return {
      slug,
      title: frontmatter.title || path.basename(filePath, '.md'),
      content: markdown,
      html,
      frontmatter,
      category,
    }
  } catch (e) {
    console.error('Error reading page:', filePath, e)
    return null
  }
}

// 通过 slug 获取页面
export async function getPageBySlug(slug: string): Promise<WikiPage | null> {
  const map = await buildLinkMap()

  // 先尝试直接找
  let filePath = path.join(WIKI_ROOT, slug.replace(/--/g, '/') + '.md')
  if (fs.existsSync(filePath)) {
    const category = slug.includes('--') ? slug.split('--')[0] : undefined
    return getPageByPath(filePath, category, map)
  }

  // 尝试用链接映射找
  const actualSlug = map.get(slug.toLowerCase())
  if (actualSlug) {
    filePath = path.join(WIKI_ROOT, actualSlug.replace(/--/g, '/') + '.md')
    const category = actualSlug.includes('--') ? actualSlug.split('--')[0] : undefined
    return getPageByPath(filePath, category, map)
  }

  return null
}

// 解析 Obsidian 风格的 wiki 链接 [[Target|Label]]
function parseWikiLinks(content: string, linkMap: Map<string, string>): string {
  return content.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, target, label) => {
    const linkLabel = label || target
    const normalizedTarget = target.toLowerCase().replace(/\s+/g, '-')
    const actualSlug = linkMap.get(normalizedTarget) || target.replace(/\s+/g, '-')
    return `[${linkLabel}](/wiki/${actualSlug})`
  })
}

// 解析图片路径
function parseImagePaths(content: string): string {
  return content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, imgPath) => {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return match
    }
    const filename = path.posix.basename(imgPath)
    return `![${alt}](/assets/${filename})`
  })
}

// 获取页面分类
export function getCategories(pages: WikiPage[]): string[] {
  const categories = new Set<string>()
  pages.forEach(p => p.category && categories.add(p.category))
  return Array.from(categories).sort()
}
