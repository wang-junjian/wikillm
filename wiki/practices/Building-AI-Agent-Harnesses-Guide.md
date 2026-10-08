---
title: "构建 AI 智能体 Harness 完全指南（amux）"
source: "https://amux.io/guides/harness-engineering/"
author: "amux"
published: 2026
last_updated: 2026-10-09
tags:
  - practices
  - harness-engineering
  - multi-agent
  - orchestration
raw_sources:
  - path: raw/Harness Engineering The Complete Guide to Building AI Agent Harnesses amux.md
    hash: "sha256:fb09ef96700dc568d5e4f802f8970f5dbc4ab28464a754e31e1976dcdfbfcb92"
confidence_score: 0.88
---

# 构建 AI 智能体 Harness 完全指南（amux）

模型是马，[[Harness-Engineering|Harness]] 是让它变得有用的全套马具。本文是 amux 团队发布的从业者指南，系统梳理了 Harness 工程如何从 Prompt 工程手中接棒、成为 AI 原生开发的决定性技能——从 `Agent = Model + Harness` 的奠基公式，到支撑多智能体协作的编排模式与开源工具实践。

## Harness 工程的起源

Harness 工程指设计模型周围一切使之可用为智能体的学科，涵盖上下文管道、指南（Guides）、传感器（Sensors）、工具接口、记忆、编排、权限与可观测性。

该术语于 2026 年 2 月由两篇几乎同时发表的文章确立：

- **Mitchell Hashimoto**（HashiCorp 联合创始人、Terraform 与 Ghostty 作者）描述了他与编码智能体协作中沉淀的纪律：*「每当发现智能体犯错，就花时间设计一个方案，让它永远不会再犯同样的错误。」*
- **OpenAI 的 Ryan Lopopolo** 发布案例研究：一个小团队以**零行人工编写代码**交付了一款产品——100 万行代码由 Codex 智能体生成，3 名工程师以每人每天 3.5 个 PR 的速度合并了 1500 个 PR。

两者的共同洞察是：当 AI 编写全部代码时，技艺从「写代码」迁移到「设计写代码者周围的系统」。随后 Thoughtworks 的 Birgitta Böckeler 在 Martin Fowler 的站点上发表权威框架，借控制论词汇确立了行业通用语：**指南**（前馈控制）与**传感器**（反馈控制）。这一框架在 [[What-Is-Harness-Engineering|什么是 Harness 工程]] 中有更完整的概念梳理。

## 核心公式：Agent = Model + Harness

模型本身不是智能体。GPT、Claude、Gemini 只是推理引擎——唯有 Harness 赋予其状态、工具执行、反馈循环与可强制执行约束之后，才成为智能体。隐喻取自马具：缰绳、马鞍、衔铁，是引导强壮却不可预测的牲口的全套装备。

Harness 包含模型之外的一切：

| 组件 | 职责 | Claude Code 中的落地形式 |
| :--- | :--- | :--- |
| 上下文管道 | 供给智能体推理所用的信息 | CLAUDE.md、`.claude/rules/`、子目录 CLAUDE.md |
| 指南 / 技能 | 行动前的前馈约束 | `.claude/skills/`、系统提示词、会话指令 |
| 传感器 | 行动后的反馈校验 | Hooks（PreToolUse / PostToolUse）、linter、测试套件 |
| 工具接口 | 对外部系统的受控访问 | MCP 服务器、bash 执行、浏览器自动化 |
| 记忆 | 跨会话的持久状态 | MEMORY.md、会话记忆、共享笔记 |
| 沙箱 | 安全的执行环境 | Docker、E2B、Firecracker、权限白名单 |
| 编排 | 多智能体协调 | amux：会话管理、任务看板、worktree |
| 生命周期钩子 | 关键事件上的程序化拦截 | PreToolUse、PostToolUse、pre-commit 钩子 |
| 权限 | 界定智能体能做什么 | `settings.json` 白名单、工具风险分级、YOLO 模式 |
| 可观测性 | 监控与调试智能体行为 | 会话窥探、SSE 实时事件、token 统计 |

**模型是商品，Harness 才是护城河。** 在 SWE-bench 上更换 Harness 可带来 22 分的分差，更换模型仅影响 1 分；[[LangChain-Harness-Engineering|LangChain 团队]]仅靠重设计 Harness 便将 Terminal Bench 2.0 成绩从 52.8% 提升至 66.5%——同一模型，13.7 分纯架构增益。更多基准数据参见 [[State-of-AI-Harness-Engineering-2026|2026 年 AI Harness 工程现状]]。

## 演进路径：Prompt → Context → Harness

Harness 工程并未取代 Prompt 工程，而是将其**吸收**。层级关系是叠加而非竞争：

- **Prompt 工程（2022–2024）**：在单次交互内塑造**行为**——打磨指令、示例与格式。依然必要，但已降格为 Harness 内部的一个组件。
- **Context 工程（2025）**：通过构建完整信息环境塑造**推理**——对话历史、检索文档、工具、输出格式。其核心认知是：模型*看到什么*比你*怎么问*更重要。
- **Harness 工程（2026）**：通过设计整个运行环境塑造**执行**——上下文、工具、传感器、编排、护栏。它包含前两者，是模型周围的完整系统。

如 Atlan 所言：Prompt 工程「没有消亡，而是被重新归类」。82% 的 IT 负责人认为仅靠 Prompt 工程不足以支撑生产级智能体。

## 两类控制：指南与传感器

Böckeler 框架将 Harness 拆分为借自控制论的两类控制，这是整套学科中最具操作性的心智模型：

**指南（前馈控制）**——在智能体行动*之前*约束与引导：

- CLAUDE.md / AGENTS.md：项目级规则、构建命令、禁用模式
- 系统提示词：角色定义、输出格式约束
- 技能 / 参考文档：按需加载的知识
- 工具定义：有哪些工具、参数、何时使用
- 任务规约：单任务的目标、需求与验收标准
- 架构约束：文件结构规则、API 契约、schema 定义

指南的被遵循率约为 70%——它施加影响，但不强制。

**传感器（反馈控制）**——在智能体行动*之后*观测与验证：

- 计算型传感器（确定性）：linter、类型检查器、格式化器、测试套件、语法校验
- 推理型传感器（基于 LLM）：语义代码审查、结果质量评分、漂移检测
- Hooks：以退出码 2 阻断危险操作的 PreToolUse / PostToolUse
- Eval：对照预期行为自动评分
- UI 自动化：基于浏览器验证应用确实可用

传感器的强制率约为 100%。Böckeler 认为传感器是「强大却鲜被讨论」的组件——多数团队对指南投入过度、对传感器投入不足。

核心洞察：**指南告诉智能体该做什么，传感器验证它是否做对。** 只有指南的 Harness 如同有方向盘没刹车的车；只有传感器的 Harness 能抓错却无法预防。两者缺一不可。

## 棘轮原则（Ratchet Principle）

**每一个智能体错误都转化为一处永久性修复。** Addy Osmani 称之为棘轮原则：Harness 只收紧，从不放松。智能体犯错时，不修结果本身，而是修 Harness，让该错误*永不再现*。

诊断流程——智能体给出劣质结果时，定位是哪个 Harness 组件失效：

1. 不知道某条规则？→ 写进 CLAUDE.md（指南）
2. 知道规则却违反？→ 加 hook 强制执行（传感器）
3. 缺少信息？→ 加技能或 MCP 服务器（上下文管道）
4. 用了危险工具？→ 收紧权限（护栏）
5. 上下文被污染？→ 用子智能体隔离（编排）
6. 崩溃后无人察觉？→ 加监控（可观测性）

**Hashimoto 准则**：AGENTS.md 中的每一行都应可追溯到一次真实的智能体失败。指不出对应错误的那一行，删掉。零容忍「愿望式规则」。

**信息对等（Information Parity）**：人类可得而智能体不可得的信息，即 Harness 上的漏洞。你读过的每份文档、你「想当然」的每条惯例、每一点部落知识——都必须编码进 Harness，否则智能体会犯下人类绝不会犯的错误。

## 构建第一个 Harness：六步

无需框架，从手头已有的工具起步。

**第一步：写一份精简的 CLAUDE.md。** 这是主指南——常驻加载的项目规则，保持在 500 行以内。只收录智能体无法从代码推断的内容：构建与测试命令、风格规则、禁用模式、指向深层文档的索引。

```markdown
# CLAUDE.md

## Build & test
- `npm run build` — builds the project
- `npm test` — runs all tests (must pass before committing)
- `npm run lint` — ESLint + Prettier (auto-fix with --fix)

## Rules
- Never modify files in `src/generated/` — these are auto-generated
- All API endpoints must have request validation with zod
- Use `pnpm` not `npm` for package management
```

**第二步：加传感器（hooks）。** CLAUDE.md 中要求 100% 执行的规则，下沉为 hook。指令遵循率约 70%，hook 强制率 100%：

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "command": "if echo '$TOOL_INPUT' | grep -q 'src/generated/'; then echo 'BLOCKED: never modify generated files' >&2; exit 2; fi"
    }]
  }
}
```

**第三步：为按需上下文添加技能。** 大型参考文档、API 规约、工作流说明放入 `.claude/skills/`。启动时智能体只见技能名与描述（约 200 token），按需加载全文。

**第四步：接入快速反馈回路。** 测试、linter、类型检查器等计算型传感器在每次编辑后自动运行。反馈越快，劣质结果级联扩散得越少。

**第五步：加跨会话记忆。** MEMORY.md 沉淀智能体跨会话习得的内容——用户偏好、项目惯例、历史决策，防止同类错误在新对话中复发。

**第六步：基于失败迭代。** 应用棘轮：每次失败都让 Harness 更紧。运行智能体一周后，CLAUDE.md 会长一倍，hook 覆盖的边缘情形会多一倍，可靠性显著提升。

面向编码智能体使用者的配套视角，参见 [[Harness-Engineering-for-Coding-Agent-Users|编码智能体用户的 Harness 工程]]。

## 多智能体系统的 Harness 工程

单智能体的 Harness 是配置，十智能体的 Harness 是编排平台。从 1 扩展到 10+ 时，Harness 会长出单智能体场景不需要的新组件：

| 挑战 | 单智能体 Harness | 多智能体 Harness（amux） |
| :--- | :--- | :--- |
| 任务分配 | 人工输入提示词 | 看板 + REST API 原子化任务认领 |
| Git 隔离 | 单分支 | 每智能体一个 worktree，从 main 切出 |
| 崩溃恢复 | 人工重启 | 自愈看门狗：自动重启、上下文压缩、卡死提示处理 |
| 协调 | 不适用 | 跨会话消息、共享看板、会话窥探 |
| 监控 | 盯终端 | Web 仪表盘，全会话 SSE 实时状态 |
| 成本追踪 | 查 API 后台 | 仪表盘按会话统计 token |
| 上下文管道 | 单个 CLAUDE.md | 根 CLAUDE.md + 按会话引导 + REST API 共享记忆 |
| 过夜运行 | screen + 祈祷 | 无人值守运行，健康监控与自动恢复 |

OpenAI 的 Symphony 项目展示了该模式的规模化形态：100 万行代码、每日 10 亿 token、零人工编写代码，全部由 Harness 管理的智能体驱动。Stripe 的「Minions」借助一套区分确定性节点（跑 linter、提交 commit）与智能体节点（实现功能、修 CI）的 Harness，每周交付 1300 个 AI 生成的 PR。平台化落地的完整打法，可对照 [[Agent-Harness-Platform-Playbook|智能体 Harness 平台行动手册]]。

不必是 Stripe 或 OpenAI：一名独立开发者用 amux 管理 5–10 个 Claude Code 会话，即拥有同等架构——编排、传感器、指南、记忆与自愈，封装在单个 Rust 二进制中。

## 证据：Harness > 模型

2026 年最反直觉的发现是 Harness 比模型更重要，且数据在各基准上高度一致：

- **SWE-bench**：更换 Harness 带来 22 分分差，更换模型仅 1 分。
- **Terminal Bench 2.0**：LangChain 仅重设计 Harness 提升 13.7 分（52.8% → 66.5%）。
- **Atlan 数据管道**：无受治理上下文时裸 schema 准确率 10–31%；配置得当的 Harness 下达 94–99%。
- **普林斯顿研究**：相比基础配置，Harness 配置可将任务解决率提升 64%。

这正是 Augment Code、Red Hat、SIG 等机构将 Harness 工程作为学科投入的原因——回报远高于追逐最新模型。

## 十条最佳实践

1. **从简起步。** 一份好的 CLAUDE.md 加 pre-commit 钩子，胜过复杂的中间件。简单控制失效时再引入复杂度。
2. **应用棘轮。** 每个智能体错误都沉淀为 Harness 的永久修复；只收紧，不放松（Osmani）。
3. **零愿望式规则。** CLAUDE.md 每行追溯到真实失败；指不出错误就删行（Hashimoto）。
4. **重传感器而非只重指南。** 多数团队对 markdown 文件投入过度、对自动化检查投入不足。
5. **规划与执行分离。** Planner 智能体把提示词展开为规约，Generator 负责实现，Evaluator 负责测试评分。智能体给自评打分过于慷慨——分离才能换来诚实反馈。
6. **上下文结构 > 提示词措辞。** 多数从业者花数小时推敲措辞、数分钟搭建上下文结构，方向恰好相反。
7. **达成信息对等。** 人类可得而智能体不可得的信息即漏洞；把每条惯例、捷径与部落知识编码进 Harness。
8. **接快速反馈回路。** 每次编辑后自动跑测试、linter、类型检查；反馈越快，级联失败越少。
9. **计算型传感器优先于推理型。** Linter 比基于 LLM 的代码审查更快、更便宜、更可靠；确定性工具先行，LLM 判断只补足其覆盖不到的区域（Böckeler）。
10. **为过夜运行而设计。** Harness 应无人干预地处理崩溃、上下文耗尽与卡死状态。无法脱手离开的 Harness 必然存在缺口。

## 2026 年 8 月的新组件：与模型能力复合

Harness 工程是实践而非产品，其组件随被包裹的智能体一同进化。三个新组件诠释了同一条设计原则——**Harness 只有与模型能力复合增长，才能随模型变强而变强**：静态传感器在 GPT-3 与 GPT-6 时代给出同等质量的信息，模型驱动的传感器则随底层模型升级而免费升级。

- **Simple tab（新传感器）**：按 worker 询问模型「你在做什么」，将回答渲染为白话语义卡片。运维者不必解析脆弱的终端流（ANSI 污染、任意宽度截断），直接阅读模型对自身状态的三句总结。摘要格式可配置（如「一句话、现在时」），并支持 iOS 朗读，实现不看屏幕的舰队监控。
- **语音舰队编排器（新指南下发通道）**：对着手机说话即可向整个智能体舰队派发任务。语音转写后作为引导消息广播给所有活跃 worker——早晨在厨房说一句「今天聚焦结账流程」，每个编码智能体都会收到优先级调整。
- **事件驱动的子智能体生命周期计数（新可观测传感器）**：worker 派生子智能体（隔离、并行、高风险操作）的事件实时上报仪表盘。棘轮原则应用于可观测性：看得见派生行为，才能对其制定策略——一小时派生 40 个子智能体的 worker 与派生 2 个的 worker，行为模式截然不同。

三者的共同模式：弥合「模型在做什么」与「运维者能看见什么」之间的鸿沟。无法表达判别式的 Harness，就无法对其执行策略。

## 工具与资源

**智能体平台与编排器**：

- **amux** — Claude Code 的开源多智能体编排层：会话管理、看板、自愈看门狗、REST API，并行智能体的完整 Harness（单个 Rust 二进制）
- **Claude Code** — Anthropic 的终端原生编码智能体，内置 Harness 原语：CLAUDE.md、hooks、技能、子智能体、MCP
- **OpenAI Codex** — 云沙箱编码智能体：AGENTS.md 作指南，容器化执行作隔离
- **Cursor** — AI 原生 IDE：`.cursorrules` 作指南，内置 lint 作传感器

**Harness 组件资源**：CLAUDE.md 模板库、Hooks 手册（20 个生产级传感器配方）、MCP 服务器、沙箱方案对比（Docker / E2B / Firecracker / gVisor）、配置文件横评（CLAUDE.md vs .cursorrules vs AGENTS.md）。

**延伸阅读**：Mitchell Hashimoto《My AI Adoption Journey》（公式起源）、OpenAI《Harness Engineering》（Codex 案例）、Thoughtworks/Martin Fowler《Harness Engineering》（指南-传感器框架）、Addy Osmani《Agent Harness Engineering》（棘轮原则）、LangChain《The Anatomy of an Agent Harness》、Latent Space《Extreme Harness Engineering》。

## FAQ 摘要

- **Harness 工程与 Prompt 工程有何区别？** Prompt 工程塑造单次交互内的行为，Context 工程塑造推理环境，Harness 工程塑造整个执行环境并包含前两者。Prompt 工程没有消亡，而是被重新归类为 Harness 内部的一个组件。
- **为什么 Harness 比模型重要？** SWE-bench 上 Harness 贡献 22 分、模型仅 1 分；模型日益商品化，Harness 才是竞争护城河。
- **需要 amux 才能实践 Harness 工程吗？** 不需要。一份 CLAUDE.md 加一个 pre-commit 钩子即可起步；当并行智能体扩展到 3 个以上、需要编排、监控与自愈时，amux 才开始体现价值。

## 相关研究

- [[What-Is-Harness-Engineering|什么是 Harness 工程]] — 2026 年 Harness 工程的权威定义与概念框架
- [[Harness-Engineering|Harness 工程]] — 本 wiki 的 Harness 工程核心概念页
- [[LangChain-Harness-Engineering|LangChain Harness 工程实践]] — 仅靠改进 Harness 将 Terminal Bench 2.0 成绩提升 13.7 分的实证
- [[Harness-Engineering-for-Coding-Agent-Users|编码智能体用户的 Harness 工程]] — 面向使用者的 Harness 工程实践视角
- [[Agent-Harness-Platform-Playbook|智能体 Harness 平台行动手册]] — 多智能体编排平台化的工程打法
