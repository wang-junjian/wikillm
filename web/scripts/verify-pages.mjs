#!/usr/bin/env node
/**
 * Pages 产物自检：静态站点没有服务端兜底，任何一个 href/src 指不到文件
 * 都会变成线上 404。这里在上传前把所有内部 URL 逐条解析回产物文件。
 *
 * 用法：node scripts/verify-pages.mjs [site目录]
 * 环境变量：PAGES_BASE_PATH（默认 /wikillm）
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '../..')
const site = path.resolve(process.argv[2] ?? path.join(repoRoot, 'site'))
const basePath = process.env.PAGES_BASE_PATH ?? '/wikillm'
const sourceAssets = path.join(repoRoot, 'wiki', 'assets')

let passed = 0
let failed = 0

function check(name, ok, detail = '') {
  if (ok) {
    passed++
    console.log(`  ✓ ${name}`)
  } else {
    failed++
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ''}`)
  }
}

function walk(dir) {
  const files = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else if (entry.isFile()) files.push(full)
  }
  return files
}

console.log(`检查站点：${site}（basePath=${basePath}）`)
check('发布目录存在', fs.existsSync(site))
if (!fs.existsSync(site)) process.exit(1)

const allFiles = walk(site)
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'))
const siteAssets = allFiles.filter((f) =>
  f.startsWith(path.join(site, 'assets') + path.sep),
)
const sourceAssetCount = fs.existsSync(sourceAssets) ? walk(sourceAssets).length : -1

check('index.html 存在', fs.existsSync(path.join(site, 'index.html')))
check('404.html 存在', fs.existsSync(path.join(site, '404.html')))
check('.nojekyll 存在', fs.existsSync(path.join(site, '.nojekyll')))
check('build.txt 存在', fs.existsSync(path.join(site, 'build.txt')))
check('预渲染页面不少于 40 个', htmlFiles.length >= 40, `实际 ${htmlFiles.length}`)
check(
  '图片数量与 wiki/assets 一致',
  siteAssets.length === sourceAssetCount && sourceAssetCount > 0,
  `产物 ${siteAssets.length} / 源 ${sourceAssetCount}`,
)

const svgFiles = allFiles.filter((f) => f.toLowerCase().endsWith('.svg'))
const svgWithoutNs = svgFiles.filter((f) => {
  const tag = fs.readFileSync(f, 'utf8').slice(0, 800).match(/<svg\b[^>]*>/i)?.[0] ?? ''
  return !/\bxmlns=/.test(tag)
})
check(
  '产物 SVG 均带 xmlns（可被 <img> 解码）',
  svgWithoutNs.length === 0,
  `${svgWithoutNs.length}/${svgFiles.length} 个缺失`,
)

const attrRe = /(?:href|src)="([^"]+)"/g
const urls = new Map()
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8')
  for (const match of html.matchAll(attrRe)) {
    if (!urls.has(match[1])) urls.set(match[1], path.relative(site, file))
  }
}

const problems = []
let internal = 0
for (const [raw, from] of urls) {
  if (/^(?:https?:|mailto:|data:|javascript:|#)/i.test(raw)) continue
  internal++

  if (!raw.startsWith(`${basePath}/`)) {
    problems.push(`裸路径 ${raw}（${from}）`)
    continue
  }

  const rel = raw.slice(basePath.length).split('#')[0].split('?')[0]
  let decoded
  try {
    decoded = decodeURIComponent(rel)
  } catch {
    decoded = rel
  }
  const target = path.join(site, decoded)
  const candidates = [
    target,
    path.join(target, 'index.html'),
    `${target}.html`,
    target.replace(/\/$/, '.html'),
  ]
  if (!candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile())) {
    problems.push(`缺失 ${raw}（${from}）`)
  }
}

check(
  `全部 ${internal} 个内部 URL 命中产物文件`,
  problems.length === 0,
  problems.slice(0, 12).join('\n    '),
)
check(
  'HTML 中无遗漏的根相对 /assets/ 或 /wiki/',
  !htmlFiles.some((f) =>
    /(?:href|src)="(?:\/assets\/|\/wiki\/)/.test(fs.readFileSync(f, 'utf8')),
  ),
)

const total = passed + failed
console.log(`\n结果：${passed}/${total} 通过`)
if (failed > 0) {
  console.error('产物自检未通过，禁止上传 Pages。')
  process.exit(1)
}
