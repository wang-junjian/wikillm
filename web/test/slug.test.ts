import { describe, it, expect } from 'vitest'
import {
  fromPath,
  toPath,
  categoryOf,
  normalizeWikilinkTarget,
  fromWikilink,
} from '../lib/slug'

describe('fromPath / toPath', () => {
  it('编码：相对路径去 .md，/ 换成 --', () => {
    expect(fromPath('concepts/Foo.md')).toBe('concepts--Foo')
    expect(fromPath('INDEX.md')).toBe('INDEX')
  })

  it('解码：-- 换回 /', () => {
    expect(toPath('concepts--Foo')).toBe('concepts/Foo')
  })

  it('常规文件名 roundtrip 可逆', () => {
    expect(toPath(fromPath('practices/Baz-Qux.md'))).toBe('practices/Baz-Qux')
  })

  it('已知边界：文件名含 -- 时编码不可逆（defined-but-lossy）', () => {
    // 维持现状而非修正：wiki 文件名按 kebab-case 约定生成，实践中不出现 --
    expect(toPath(fromPath('concepts/a--b.md'))).toBe('concepts/a/b')
  })
})

describe('categoryOf', () => {
  it('取一级目录作为 category', () => {
    expect(categoryOf('concepts--Foo')).toBe('concepts')
  })

  it('根目录页面无 category', () => {
    expect(categoryOf('INDEX')).toBeUndefined()
  })
})

describe('normalizeWikilinkTarget', () => {
  it('小写并把连续空白折叠为连字符', () => {
    expect(normalizeWikilinkTarget('Harness Engineering')).toBe('harness-engineering')
    expect(normalizeWikilinkTarget('Foo')).toBe('foo')
  })
})

describe('fromWikilink', () => {
  const linkMap = new Map([
    ['foo', 'concepts--Foo'],
    ['harness-engineering', 'concepts--Harness-Engineering'],
  ])

  it('命中返回 slug', () => {
    expect(fromWikilink('Foo', linkMap)).toBe('concepts--Foo')
    expect(fromWikilink('Harness Engineering', linkMap)).toBe('concepts--Harness-Engineering')
  })

  it('未命中返回 null（断链，绝不 fallback 造 slug）', () => {
    expect(fromWikilink('不存在的页面', linkMap)).toBeNull()
  })
})
