# 输出质量标准与文件结构

## 标准文件系统架构

严格遵循 I/O 分离原则，确保知识库的纯净度与可迁移性。wiki/ 同时被 **Obsidian** 与 **web/（Next.js 应用）** 两个前端消费；其中 `assets/` 与 `visual/` 在 web 端不作为 wiki 页面索引（visual/ 仅供 Obsidian 演示）。

```text
📁 wikillm
├── 📁 raw/               # 【输入层】原始素材（只读）
│   └── 📁 images/        # 原始图片文件（png, jpg, webp, gif, svg 等）
└── 📁 wiki/              # 【输出层】编译器生成的知识产物
    ├── 📁 concepts/      # 核心概念、原理分析
    ├── 📁 practices/     # 部署指南、最佳实践
    ├── 📁 visual/        # Marp 幻灯片、Matplotlib 趋势图
    ├── 📁 queries/       # 高价值 Q&A 的沉淀归档
    ├── 📁 assets/        # 图像和资源文件（从 raw/images/ 同步而来）
    ├── INDEX.md          # 动态索引与学习路径
    ├── Glossary.md       # 统一术语表与双链枢纽
    └── sources.md        # 来源文档索引（原始 URL 列表）
```

## 表达标准

**原则**：读起来像是由该领域的资深专家直接用中文撰写的。

**禁止词汇**：产生、输出（作为动词）、这个、那个（指代不明）

**提倡词汇**：负责构建、驱动、沉淀、权衡（Trade-off）

## 技术标准

| 维度 | 要求 |
| :--- | :--- |
| **术语表** | 必须包含 40+ 核心概念，中英对照并带有 Wikilink |
| **链接密度** | 每 500 字需包含至少 3-5 个内部链接 |
| **视觉呈现** | 复杂架构必须有 Mermaid 图，数据趋势必须有 Markdown 表格 |
| **Marp 适配** | 综述类文章必须同步生成一份 `visual/` 下的 Slide 文档 |

## 编译状态文件

项目使用三个核心文件来追踪编译状态：

### 1. `wiki/compile-results.tsv`

结构化的编译结果（TSV 格式）

- 字段：`raw_path`、`hash`、`last_modified`、`wiki_paths`、`compile_time`、`status`
- 记录每个 raw 文件的编译状态和生成的 wiki 文档

### 2. `wiki/compile.log`

详细的编译日志

- 记录每次编译的输入、输出、决策过程
- 用于调试、审查和回溯

### 3. `wiki/sources.md`

来源文档索引

- 记录所有原始来源的标题和 URL
- 格式：`- [标题](URL)` 的无序列表
- 按"学术论文"、"概念文章"、"实践指南"等分类组织
- 每次增量编译后更新

## Wiki 文档元数据（统一 schema）

两类页面各有一套 frontmatter 模板，所有引用处以此为准。两条 web 端硬约束：**`title` 必填**（索引与侧栏的显示名）、**YAML 必须合法**（解析失败的页面会从 web 索引中静默消失）。

### 编译页（concepts/、practices/）

```yaml
---
title: 文档标题            # 必填
source: [来源名称]
tags:
  - 标签
raw_sources:
  - path: raw/source-file.md
    hash: "sha256:abc123..."
confidence_score: 0.9
last_updated: YYYY-MM-DD
---
```

### Q&A 页（queries/）

```yaml
---
title: "问题标题（用中文）"  # 必填
source: "WikiLLM Q&A"
tags:
  - "Q&A"
question: |
  在这里记录原始问题
last_updated: YYYY-MM-DD
---
```

## 常用命令

```bash
# 增量扫描：输出 新增/已修改/未变更/已删除 清单及图片名冲突检查
python3 -I skills/wikillm/scripts/scan-raw.py

# 修复台账漂移：把占位或过期的 hash 回写为真实 SHA-256
python3 -I skills/wikillm/scripts/scan-raw.py --write

# 查看所有已编译文件
cat wiki/compile-results.tsv

# 查找特定文件的编译状态
grep "raw/xxx.md" wiki/compile-results.tsv

# 查看最近的编译日志
tail -100 wiki/compile.log

# 查看上次编译摘要
grep "=== 编译完成 ===" -A 5 wiki/compile.log
```
