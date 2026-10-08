---
name: wikillm
description: Compiles raw documents into a structured, cross-linked Chinese Wiki knowledge base. Use when ingesting raw materials, answering questions about the wiki, or maintaining the wiki structure. 触发词：编译 wiki、增量编译、wiki 问答、归档问答、lint wiki。
license: MIT
metadata:
  version: "2.0"
  author: WikiLLM Project
---

# WikiLLM Skill

利用 LLM 将原始文档和图像增量"编译"为结构化、交叉链接、高质量的中文 Wiki 知识库。

## 任务路由（首先阅读本节！）

在执行任何操作前，先判断当前任务属于以下哪个场景：

| 场景 | 判断标准 | 跳转至 |
|------|----------|--------|
| **增量编译** | `raw/` 目录有新增或修改的文件需要编译到 `wiki/` | [references/workflows.md](references/workflows.md) |
| **Q&A** | 用户针对 Wiki 内容提出问题（询问、咨询、探讨） | [references/qa.md](references/qa.md) |
| **Linting** | 需要检查 Wiki 的一致性、修复孤岛页面等 | [references/errors.md](references/errors.md) |

## 快速开始

### 核心逻辑

- 人工不直接编写 Wiki，仅负责投放素材和发起查询
- LLM 负责理解、重写、链接与维护
- 消费前端：Obsidian 与 `web/`（Next.js 应用）**并行消费** wiki；文件命名与 frontmatter 约束对两者同时生效（详见 references/standards.md）

### 详细文档

- **编译工作流**：见 [references/workflows.md](references/workflows.md)
- **Q&A 流程**：见 [references/qa.md](references/qa.md)
- **质量标准**：见 [references/standards.md](references/standards.md)
- **常见错误**：见 [references/errors.md](references/errors.md)
