import { describe, it, expect } from 'vitest'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { createWikiIndex } from '../lib/wiki-index'

const FIXTURE_ROOT = path.join(__dirname, 'fixtures', 'wiki')

describe('WikiIndex.scan', () => {
  it('索引全部页面并按 title 排序，不含 html', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const { entries } = await index.scan()

    expect(entries.map((e) => e.slug).sort()).toEqual([
      'INDEX',
      'concepts--Bar',
      'concepts--Foo',
      'practices--Baz',
    ])
    expect(entries[0]).not.toHaveProperty('html')
    // 排序按 title：Bar < Baz 实践 < Foo 概念 < 首页
    expect(entries.map((e) => e.title)).toEqual(
      [...entries.map((e) => e.title)].sort((a, b) => a.localeCompare(b)),
    )
  })

  it('title 优先取 frontmatter，缺省回退文件名', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const { entries } = await index.scan()
    const bySlug = new Map(entries.map((e) => [e.slug, e]))

    expect(bySlug.get('concepts--Foo')?.title).toBe('Foo 概念')
    expect(bySlug.get('concepts--Bar')?.title).toBe('Bar')
  })

  it('category 取自一级目录，根目录页面无 category', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const { entries } = await index.scan()
    const bySlug = new Map(entries.map((e) => [e.slug, e]))

    expect(bySlug.get('concepts--Foo')?.category).toBe('concepts')
    expect(bySlug.get('INDEX')?.category).toBeUndefined()
  })

  it('byCategory 分组供 Sidebar 直接消费，不含根目录页面', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const { byCategory } = await index.scan()

    expect([...byCategory.keys()].sort()).toEqual(['concepts', 'practices'])
    expect(byCategory.get('concepts')?.map((e) => e.slug).sort()).toEqual([
      'concepts--Bar',
      'concepts--Foo',
    ])
  })

  it('排除 assets 与 visual 目录', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const { entries } = await index.scan()

    expect(entries.some((e) => e.slug.includes('visual'))).toBe(false)
    expect(entries.some((e) => e.slug.includes('assets'))).toBe(false)
  })

  it('生产模式缓存：scan 后新增文件不进索引', async () => {
    // vitest 下 NODE_ENV=test（非 development），走缓存路径
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wikillm-'))
    fs.writeFileSync(path.join(tmp, 'A.md'), '# A\n')
    const index = createWikiIndex(tmp)

    const first = await index.scan()
    expect(first.entries.map((e) => e.slug)).toEqual(['A'])

    fs.writeFileSync(path.join(tmp, 'B.md'), '# B\n')
    const second = await index.scan()
    expect(second.entries.map((e) => e.slug)).toEqual(['A'])

    fs.rmSync(tmp, { recursive: true, force: true })
  })
})

describe('WikiIndex.render', () => {
  it('wikilink 改写为内部路由，图片拍平到 /assets', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const page = await index.render('concepts--Foo')

    expect(page).not.toBeNull()
    expect(page!.html).toContain('href="/wiki/concepts--Bar"')
    expect(page!.html).toContain('src="/assets/pic.png"')
    expect(page!.brokenLinks).toEqual([])
  })

  it('断链显式返回并渲染为可见样式', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const page = await index.render('INDEX')

    expect(page!.brokenLinks).toEqual([{ target: '不存在的页面', label: '不存在的页面' }])
    expect(page!.html).toContain('class="broken-link"')
    expect(page!.html).not.toContain('/wiki/不存在的页面')
    // 命中的 wikilink 照常改写，含 |Label 形式
    expect(page!.html).toContain('href="/wiki/concepts--Bar"')
    expect(page!.html).toContain('>巴</a>')
  })

  it('linkMap 兜底：wikilink 风格 URL 也能命中', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const page = await index.render('foo')

    expect(page?.slug).toBe('concepts--Foo')
  })

  it('未知 slug 返回 null', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    expect(await index.render('nonexistent')).toBeNull()
  })

  it('frontmatter 的 Date 归一化为 ISO 日期字符串', async () => {
    const index = createWikiIndex(FIXTURE_ROOT)
    const page = await index.render('INDEX')

    expect(page!.frontmatter.last_updated).toBe('2026-10-01')
  })
})
