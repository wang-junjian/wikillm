---
title: "Harness 的重要性：Philipp Schmid 论 2026 年的智能体基础设施"
source: "https://www.philschmid.de/agent-harness-2026"
author: "Philipp Schmid"
published: 2026-01-05
last_updated: 2026-10-09
tags:
  - concepts
  - harness
  - 评测
  - bitter-lesson
raw_sources:
  - path: raw/The Importance of Agent Harness Philipp Schmid.md
    hash: "sha256:9bbee0624f29449e0af81f0280330e4810a19242c2d222b5c744c5bc857faa76"
confidence_score: 0.9
---

# Harness 的重要性：Philipp Schmid 论 2026 年的智能体基础设施

Philipp Schmid（Hugging Face 技术负责人）在 2026 年 1 月的短评中提出：AI 正处在从"只盯模型"转向"审视系统"的拐点。静态榜单上顶尖模型的差距不断缩小，但这可能是幻觉——任务越长越复杂，模型间的真实差距才越清楚，核心变量是**耐久性（durability）**：模型在执行数百次工具调用的过程中能否始终遵循指令。榜单上 1% 的分差，检测不出模型在第五十步之后是否会偏离轨道。要证明模型能可靠地执行跨天的工作流，我们需要新的衡量方式，答案之一就是 **Agent Harness**。

## 什么是 Agent Harness

Agent Harness 是包裹在 AI 模型外围、用于管理长程任务的基础设施。它不是智能体本身，而是治理智能体如何运行的软件系统，确保其可靠、高效、可控。它位于比智能体框架（framework）更高的层次：框架提供工具积木或实现智能体循环，Harness 则自带 Prompt 预设、有主见的工具调用处理、生命周期钩子，以及规划、文件系统访问、子智能体管理等开箱能力——是"电池内置"的完整系统。

Schmid 用计算机作类比：

| 计算机部件 | 智能体系统对应物 | 角色 |
| :--- | :--- | :--- |
| CPU | 模型 | 提供原始算力 |
| RAM | Context 窗口 | 有限且易失的工作记忆 |
| 操作系统 | Agent Harness | 管理 Context、处理"启动"序列（Prompt、钩子）、提供标准驱动（工具处理） |
| 应用程序 | 智能体 | 运行在 OS 之上的具体业务逻辑 |

这一类比与 [[Harness-Runtime-Substrate|Harness 运行时基座]] 的系统层视角相互印证。Harness 落地了 Context 工程策略——压缩 Context、把状态卸载到存储、用子智能体隔离任务（参见 [[Memory-Systems|记忆系统]] 与 [[Skill-Systems|技能系统]]）。对开发者的意义在于：不必自建操作系统，专注编写应用层逻辑即可。

目前通用型 Harness 仍属稀缺。**Claude Code** 是这一新兴品类的代表，Claude Agent SDK 与 LangChain DeepAgents 都在尝试将其标准化；换一个角度看，**所有编码 CLI 本质上是面向特定垂直领域的专用 Harness**（详见 [[Harness-Engineering-Coding-Agents-Guide|编码智能体 Harness 工程指南]]）。

## 基准问题：为什么需要 Harness

过去的基准大多测量单轮模型回答；2025 年起出现评测"系统"而非裸模型的趋势，模型只是可使用工具、与环境交互的组件之一（如 AIMO、SWE-Bench）。但新一代基准仍难以测量**可靠性**——它们几乎从不检验模型在第 50 次、第 100 次工具调用之后的行为，而那才是真正的难点：模型或许足够聪明，两三次尝试就能解开难题，却在运行一小时后忘记最初的指令或无法正确推理中间步骤。

在基准日益复杂、基准宣传与用户体验脱节之际，Harness 有三重关键价值：

1. **验证真实进展**：基准与用户需求错位，而模型发布频繁。共享 Harness 让用户能直接用新模型跑自己的用例与约束，横向比较。
2. **保障用户体验**：没有 Harness，用户体验会落后于模型潜力；发布 Harness 意味着开发者基于经过验证的工具与最佳实践构建智能体，用户面对的是相同的系统结构。
3. **借真实反馈爬坡（Hill Climbing）**：共享且稳定的环境形成反馈回路，研究者可以基于真实的用户采纳数据迭代基准。

其底层逻辑是 Jason Wei 提出的**验证不对称性**：改进一个系统的能力，正比于验证其结果有多容易。Harness 把模糊的多步骤智能体工作流转化为可记录、可打分的结构化数据，爬坡才得以高效进行。

## 构建智能体的"苦涩教训"

Rich Sutton 在《苦涩的教训》（The Bitter Lesson）中断言：利用计算的通用方法终将胜过手工编码的人类知识。这一幕正在智能体开发中重演：

- **Manus** 在六个月内[重构 Harness 五次](https://www.youtube.com/watch?v=6_BcCthVvb8)，逐步剔除僵化假设；
- **LangChain** 一年内[三度重构 Open Deep Research 智能体](https://www.youtube.com/watch?v=2Muxy3wE-E0)；
- **Vercel** [砍掉了自家智能体 80% 的工具](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools)，换来更少步骤、更少 Token、更快响应。

要在苦涩教训中幸存，Harness 必须轻量。每一代新模型都有一种不同的最优智能体组织方式：2024 年需要复杂手工流水线的能力，2026 年一条 Context 窗口内的 Prompt 就能完成。开发者构建的 Harness 必须允许自己随时撕掉昨天写的"聪明"逻辑——控制流过度工程化，下一次模型更新就会摧毁整个系统。

## 下一步走向

Schmid 预判训练环境与推理环境将走向融合，新瓶颈是 **Context 耐久性**。Harness 将成为解决"模型漂移"的首要工具：实验室用它精确探测模型在第 100 步之后何时停止遵循指令、何时推理失准，再把数据直接回灌训练，造出在长任务中不会"疲惫"的模型。

对构建者而言，重心应随之迁移：

1. **从简开始**：不搭庞大的控制流；提供稳健的原子工具，让模型自己规划，Harness 只管护栏、重试与验证。
2. **为删除而建（Build to Delete）**：架构保持模块化。新模型会替代你写的逻辑，随时准备撕掉旧代码。
3. **Harness 即数据集**：竞争优势不再是 Prompt，而是 Harness 捕获的轨迹。智能体在工作流后段每一次指令遵循失败，都是训练下一轮模型的素材。

这一判断与 [[Harness-Engineering-Self-Improvement|Lilian Weng 的 Harness 自我改进框架]] 中"Harness 演进反哺模型训练"的递归路线高度呼应，也与 [[What-Is-an-AI-Agent-Harness|Databricks 的概念解析]] 中"Harness 质量决定同一模型表现"的实证相互支持。

## 相关研究

- [[What-Is-an-AI-Agent-Harness|什么是 AI 智能体 Harness：Databricks 的概念解析]]——Harness 八大构件与企业级治理的系统化定义
- [[Harness-Engineering-Self-Improvement|Harness 工程与自我改进：Lilian Weng 的框架]]——把"Harness 即数据集"扩展为完整的递归自我改进研究图景
- [[From-Weights-to-Context-to-Harness|从权重到 Context 再到 Harness]]——工程重心从模型权重外移至 Harness 的演进脉络
- [[Harness-Heavy-Lifting|Harness 能承担多少重活]]——对"轻量 Harness + 强模型"路线的边界探讨
