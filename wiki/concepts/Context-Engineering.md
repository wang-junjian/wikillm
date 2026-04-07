---
title: 上下文工程
tags: [核心概念, 上下文, Harness]
source: [OpenAI, Anthropic, LangChain]
confidence_score: 高
last_updated: 2026-04-07
---

# 上下文工程

**上下文工程**（Context Engineering）是[[Harness-Engineering|Harness 工程]]的三大支柱之一，专注于确保智能体在正确的时间获得正确的信息。

## 核心原则

### 给地图，而不是一千页说明书

OpenAI 团队学到的最早经验之一很简单：要给 Codex 的是一张地图，而不是一本 1,000 页的说明书。

他们尝试了"一个大型的 AGENTS.md 方法。可想而知，这是一次失败的尝试：

- **上下文是一种稀缺资源**：一个巨大的指令文件会挤掉任务、代码和相关文档——因此智能体要么会错过关键约束条件，要么开始针对错误的约束条件进行优化。
- **过多的指导反而变得无效**：当一切都"重要"时，一切都不重要了。智能体最终会在本地进行模式匹配，而不是有意识地进行导航。
- **它会立即腐烂**：一本庞杂的手册会变成陈旧规则的坟场。智能体无法判断哪些信息仍然有效，一旦人类停止维护它，此文件就会悄然成为一个颇具吸引力的麻烦源头。
- **这很难核实**：单个 blob 不适合进行机械检查（覆盖率、新鲜度、所有权、交叉链接），因此漂移是不可避免的。

因此，他们不再将 AGENTS.md 视为百科全书，而是将其视为内容目录。

## 静态上下文与动态上下文

### 静态上下文

静态上下文是仓库中不会频繁变化的文档和规范：

- **仓库本地文档**：架构规范、API 契约、风格指南
- **AGENTS.md 或 CLAUDE.md 文件**：编码项目特定规则
- **交叉链接设计文档**：由 linter 验证的设计文档

### 动态上下文

动态上下文是随时间变化的运行时信息：

- **可观测性数据**：日志、指标、追踪——智能体可访问
- **目录结构映射**：智能体启动时的目录映射
- **CI/CD 流水线状态**：测试结果和流水线状态

## 关键规则

**从智能体的角度来看，它无法在上下文中访问的任何内容都不存在。**

存储在 Google Docs、Slack 线程或人们头脑中的知识对系统是不可见的。**仓库必须是单一事实来源。**

### 渐进式披露

这个框架实现了渐进式披露：智能体从一个小而稳定的切入点开始，并被指导下一步该去哪里查看，而不是一开始就被淹没。

OpenAI 团队严格执行这一点。专职的 linter 和 CI 作业会验证知识库的更新状况、是否已交叉链接且结构正确。一个定期运行的"doc-gardening"智能体会扫描那些不再反映真实代码行为的过时或废弃文档，并发起修复用的 Pull Request。

## 实践中的上下文工程

### OpenAI 的知识库布局

```
AGENTS.md
ARCHITECTURE.md
docs/
├── design-docs/
│   ├── index.md
│   ├── core-beliefs.md
│   └── ...
├── exec-plans/
│   ├── active/
│   ├── completed/
│   └── tech-debt-tracker.md
├── generated/
│   └── db-schema.md
├── product-specs/
│   ├── index.md
│   ├── new-user-onboarding.md
│   └── ...
├── references/
│   ├── design-system-reference-llms.txt
│   ├── nixpacks-llms.txt
│   ├── uv-llms.txt
│   └── ...
├── DESIGN.md
├── FRONTEND.md
├── PLANS.md
├── PRODUCT_SENSE.md
├── QUALITY_SCORE.md
├── RELIABILITY.md
└── SECURITY.md
```

设计文档已被编目和索引，其中包括验证状态和一套核心理念，定义了智能体优先的操作原则。架构文档提供域和包分层的顶层地图。一份高质量的文档会对每个产品领域和架构层进行评分，并随着时间的推移追踪差距。

计划被视为一流的工件。临时轻量计划用于小幅变更，而复杂工作则记录在执行计划中，并附带进度和决策日志，这些日志会被提交到代码仓库。活跃计划、已完成计划和已知的技术债务都已进行版本控制并集中存放，使智能体能够在不依赖外部情境的情况下运行。

### LangChain 的 LocalContextMiddleware

LangChain 使用 `LocalContextMiddleware` 在智能体启动时运行，映射 `cwd` 和其他父+子目录。他们运行 `bash` 命令来查找工具如 `Python` 安装。上下文发现和搜索容易出错，因此注入上下文减少了这个错误表面并帮助**将智能体引导到其环境中。**

## 将更多情境推送到仓库中

随着时间的推移，需要将越来越多的情境推送到仓库中。那次让团队在架构模式上达成一致的 Slack 讨论？如果智能体无法发现它，那么它就会像迟了三个月入职的新员工一样，对其一无所知。

为 Codex 提供更多情境意味着要组织和展示正确的信息，好令智能体能够基于这些信息进行推理，而不是用临时指令使其不堪重负。就像你会在产品原则、工程规范和团队文化（包括表情符号偏好）方面为新队友提供引导一样，将这些信息提供给智能体会带来更一致的输出。

## 相关概念

- [[Harness-Engineering|Harness 工程]]
- [[Context Reset|上下文重置]]
- [[Context Anxiety|上下文焦虑]]
- [[Architectural-Constraints|架构约束]]

## 参考来源

1. OpenAI - Harness Engineering：在智能体优先的世界中利用 Codex
2. LangChain - Improving Deep Agents with harness engineering
3. Anthropic - Effective context engineering for AI agents

---

*最后更新：2026-04-07*  
*本文档由 [[WikiLLM]] 编译自多个来源*
