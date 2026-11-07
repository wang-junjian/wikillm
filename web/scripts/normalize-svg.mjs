#!/usr/bin/env node
/**
 * 修正从论文 HTML 抓取的 SVG 素材：根标签常缺 xmlns，属性写成小写 viewbox，
 * 浏览器在 <img> 上下文中会拒绝解码（HTTP 200 却是破图）。
 * 只处理发布产物 site/assets 的副本，仓库里的 wiki/assets 源素材保持原样。
 *
 * 用法：node scripts/normalize-svg.mjs [assets目录]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')
const assetsDir = path.resolve(
  process.argv[2] ?? path.join(repoRoot, 'site', 'assets'),
)

function walk(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (entry.isFile()) files.push(full)
  }
  return files
}

const svgs = walk(assetsDir).filter((f) => f.toLowerCase().endsWith('.svg'))
let fixedNs = 0
let fixedViewBox = 0

for (const file of svgs) {
  let text = fs.readFileSync(file, 'utf8')
  const before = text

  const openTag = text.match(/<svg\b[^>]*>/i)
  if (openTag && !/\bxmlns=/.test(openTag[0])) {
    text = text.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"')
    fixedNs++
  }
  text = text.replace(/\bviewbox\s*=/g, 'viewBox=')
  if (/viewBox=/.test(text) && /\bviewbox\s*=/.test(before)) fixedViewBox++

  if (text !== before) fs.writeFileSync(file, text)
}

console.log(
  `SVG 规范化：扫描 ${svgs.length} 个，补 xmlns ${fixedNs} 个，修 viewBox ${fixedViewBox} 个（仅产物副本）`,
)
