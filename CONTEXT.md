# CONTEXT.md — WikiLLM 领域模型

WikiLLM 把 LLM 作为「编译器」：源文档进 `raw/`，LLM 增量编译出 `wiki/` markdown 知识库，Obsidian 与 Next.js Web 应用（`web/`）是两个并行的消费前端。

## 核心概念

### Raw（原始语料）
`raw/` 下的源文档（文章、论文、仓库、数据集、图片）。编译的唯一输入。

### Wiki（编译产物）
`wiki/` 下的 markdown 知识库，由 LLM 全权写入和维护，人工编辑是例外。按一级目录分类：`concepts/`、`practices/`、`queries/`、`visual/`（Marp 幻灯片）、`assets/`（图片）。

### 编译（Compile）
把 raw 文档转化为 wiki 页面的过程：摘要、双链、归类、互链。增量编译依据 **编译状态台账** 判断跳过与否。

### 编译状态台账（Compile Ledger）
`wiki/compile-results.tsv`：raw_path / hash / wiki_paths / status。增量编译的权威状态来源；hash 必须是真实 SHA-256，占位符视为漂移（由 lint 检查捕获）。

### Wikilink
Obsidian 风格链接 `[[Target|Label]]`。解析规则：vault 级裸文件名，不带目录前缀。Web 端必须自行重建这一解析（Obsidian 靠 vault 全局解析）。

### Slug
wiki 页面在 Web 端的 URL 标识：相对路径去 `.md` 后把 `/` 编码为 `--`。已知边界：文件名本身含 `--` 时编码不可逆（维持现状，视为 defined-but-lossy）。

### 断链（Broken Link）
wikilink 未命中任何已知页面。显式数据（`BrokenLink`），在页面上可见呈现，并反哺 skill 的孤岛扫描——绝不静默 fallback 成 404。

## 模块（web/）

### WikiIndex
Web 端读取 wiki 的唯一深模块。接口两个方法：`scan()`（遍历文件系统 + frontmatter，产出 slug/title/category 索引与分组，不含渲染）与 `render(slug)`（按需单页处理 wikilink/图片/remark，返回 html 与断链列表）。通过 `createWikiIndex(root)` 构造注入根路径；dev 模式每请求重扫，生产缓存。

### WikiSlug
slug 编解码的纯函数值对象（`web/lib/slug.ts`）：`fromPath` / `toPath` / `categoryOf` / `fromWikilink`。slug 规则的唯一权威。
