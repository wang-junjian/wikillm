import path from 'path'
import { createWikiIndex } from './wiki-index'

export type {
  WikiIndex,
  WikiIndexEntry,
  WikiIndexSnapshot,
  RenderedPage,
  BrokenLink,
} from './wiki-index'
export { createWikiIndex }

// Web 应用消费的 wiki 单例；测试请用 createWikiIndex 注入 fixture 根目录
export const wiki = createWikiIndex(path.join(process.cwd(), '../wiki'))
