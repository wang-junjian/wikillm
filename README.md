# WikiLLM

利用 LLM 构建个人知识库的系统。WikiLLM 将原始素材"编译"成结构化、交叉链接的高质量中文 Wiki，可在 Obsidian 中查看。

本项目基于 **Andrej Karpathy** 提出的理念构建。详见：[LLM Knowledge Bases](https://x.com/karpathy/status/2039805659525644595)

![技能界面](images/skill.png)

![Obsidian 索引](images/obsidian-index.png)

## 项目概述

WikiLLM 的工作流包括：

1. **数据摄入**：源文档（文章、论文、代码库、数据集、图像）被索引到 `raw/` 目录
2. **Wiki 编译**：LLM 增量地"编译"原始数据成 markdown 文件的 wiki，包含摘要、反向链接、分类概念和相互链接的文章
3. **IDE**：Obsidian 用作前端查看原始数据、编译后的 wiki 和可视化
4. **问答**：LLM 可以通过研究相关数据来回答针对 wiki 的复杂问题
5. **输出**：结果渲染为 markdown 文件、Marp 幻灯片或 matplotlib 图像，可在 Obsidian 中查看
6. **Linting**：LLM"健康检查"发现不一致、填补缺失数据、建议新文章候选
7. **额外工具**：诸如 wiki 上的朴素搜索引擎等额外工具

## 核心原则

- **LLM 编写和维护所有 wiki 数据**；手动编辑很少见
- **用户探索和查询被归档回 wiki** 以增强它
- **系统专注于 markdown 文件和 Obsidian 兼容格式**
- **图像被下载到本地** 以便 LLM 轻松引用

## 目录结构

```
wikillm/
├── raw/              # 源文档和未处理数据
├── wiki/             # LLM 编译的 markdown wiki
│   ├── concepts/     # 核心概念文章
│   ├── practices/    # 实践指南文章
│   ├── visual/       # 可视化内容
│   ├── queries/      # 查询存档
│   ├── assets/       # 图像和资源文件
│   ├── INDEX.md      # 首页索引
│   └── Glossary.md   # 术语表
├── skills/           # Claude Code 技能
├── CLAUDE.md         # 项目特定的 Claude 指令
└── README.md         # 本文件
```

## 当前内容

本 wiki 当前包含关于 **Harness 工程**的综合知识库，基于以下来源编译：

- OpenAI - Harness Engineering：在智能体优先的世界中利用 Codex
- Anthropic - Harness design for long-running application development
- Martin Fowler - Harness engineering for coding agent users
- LangChain - Improving Deep Agents with harness engineering
- NxCode - Harness Engineering: The Complete Guide
- MiniMax - MiniMax M2.7: Early Echoes of Self-Evolution
- Mitchell Hashimoto - My AI Adoption Journey

## 快速开始

### 在 Obsidian 中查看

1. 下载并安装 [Obsidian](https://obsidian.md/)
2. 在 Obsidian 中打开本仓库作为 vault
3. 从 `wiki/INDEX.md` 开始探索

### 使用技能

本项目包含 Claude Code 技能用于生成 wiki：

```bash
# 在 Claude Code 中
/skills wiki 编译
```

详细说明请参阅 [skills/SKILL.md](skills/SKILL.md)。

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。
