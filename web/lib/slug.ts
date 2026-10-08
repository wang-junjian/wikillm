/**
 * WikiSlug — slug 编解码的唯一权威（领域定义见 CONTEXT.md）。
 *
 * 编码规则：wiki 内的相对路径去掉 .md 后缀，再把 `/` 替换为 `--`。
 * 已知边界：文件名本身包含 `--` 时编码不可逆（defined-but-lossy）。
 * wiki 文件名按 kebab-case 约定生成，实践中不出现 `--`，故维持现状。
 */

export function fromPath(relativePath: string): string {
  return relativePath.replace(/\.md$/, '').replace(/\//g, '--')
}

export function toPath(slug: string): string {
  return slug.replace(/--/g, '/')
}

export function categoryOf(slug: string): string | undefined {
  return slug.includes('--') ? slug.split('--')[0] : undefined
}

/** wikilink 目标的归一化规则：小写、连续空白折叠为连字符 */
export function normalizeWikilinkTarget(target: string): string {
  return target.toLowerCase().replace(/\s+/g, '-')
}

/**
 * 解析 Obsidian 风格 wikilink 目标为 slug。
 * 命中 linkMap 返回 slug；未命中返回 null，由调用方记为断链（BrokenLink）。
 */
export function fromWikilink(
  target: string,
  linkMap: Map<string, string>,
): string | null {
  return linkMap.get(normalizeWikilinkTarget(target)) ?? null
}
