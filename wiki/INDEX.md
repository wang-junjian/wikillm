---
title: "WikiLLM 知识库索引"
source: "Externalization in LLM Agents: A Unified Review"
last_updated: 2026-10-09
---

# WikiLLM 知识库索引

欢迎来到 WikiLLM 知识库！本 wiki 基于论文《Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering》编译而成。

## 快速导航

- [[Glossary|术语表]] - 核心概念定义与对照
- [[Externalization-in-LLM-Agents|LLM Agent 中的外部化]] - 核心理论框架
- [[Harness-Engineering|Harness 工程]] - 统一集成层

## 核心概念

本知识库围绕 LLM Agent 的**外部化框架**组织，涵盖四大支柱：

### 1. 外部化理论
- [[Externalization-in-LLM-Agents|LLM Agent 中的外部化]] - 外部化作为组织原则
- [[From-Weights-to-Context-to-Harness|从权重到上下文到 Harness]] - 历史演进路径

### 2. 三大外部化维度
- [[Memory-Systems|记忆系统]] - 跨时间外部化状态
- [[Skill-Systems|技能系统]] - 外部化程序专长
- [[Agent-Protocols|智能体协议]] - 外部化交互结构

### 3. Harness 工程
- [[Harness-Engineering|Harness 工程]] - 统一协调层
- [[What-Is-Harness-Engineering|什么是 Harness 工程：2026 定义性指南]] - Atlan 的控制系统视角定义
- [[Harness-Engineering-Complete-Guide|Harness 工程完整指南]] - NxCode 的完整 Harness 工程指南
- [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]] - Martin Fowler 的指南与传感器框架
- [[Harness-Engineering-First-Thoughts|Harness 工程：最初的思考]] - Martin Fowler 团队的早期备忘录
- [[State-of-AI-Harness-Engineering-2026|AI Harness 工程行业现状 2026]] - marmelab 的行业盘点与警示
- [[Agent-System-Harness-Design-Survey|从问答到任务完成：智能体系统与 Harness 设计综述]] - 智能体系统设计的全景综述

### 4. Harness 自动合成与进化
- [[Meta-Harness|Meta-Harness：模型 Harness 的端到端优化]] - 斯坦福/MIT 的自动 Harness 优化研究
- [[AutoHarness|AutoHarness：自动合成代码 Harness]] - Google DeepMind 的 Thompson 采样树搜索 Harness 合成
- [[Agentic-Harness-Engineering|AHE：可观测性驱动的编码智能体 Harness 自动进化]] - 复旦等的证据驱动 Harness 演化
- [[Self-Harness|Self-Harness：自我改进的 Harness]] - 上海 AI 实验室的 propose-evaluate-accept 循环
- [[EvoHarness-RL|EvoHarness-RL：用强化学习训练可自我进化的运行时 Harness]] - 面向长程智能体的 RL Harness 策略学习
- [[HarnessX|HarnessX：可组合、自适应、可进化的智能体 Harness 铸造厂]] - Darwin Agent Team 的 Harness 铸造厂
- [[Harness-Continual-Learning|Harness Continual Learning：围绕冻结模型的 Harness 持续进化]] - 南京大学提出的 HCL 新范式
- [[Code-as-Agent-Harness|Code as Agent Harness：迈向可执行、可验证、有状态的智能体系统]] - UIUC/Meta/Stanford 的代码基底立场论文

### 5. 实践指南
- [[Long-Running-Harness-Design|长运行应用的 Harness 设计]] - Anthropic 团队的多 Agent 架构实践
- [[OpenAI-Codex-Harness-Engineering|OpenAI Codex Harness 工程]] - 完全由智能体生成代码的产品开发实践
- [[Mitchellh-AI-Adoption-Journey|Mitchell Hashimoto 的 AI 采用之旅]] - HashiCorp 创始人从怀疑论者到深度用户的六个阶段
- [[LangChain-Harness-Engineering|LangChain Harness 工程实践]] - 从 Top 30 到 Top 5 的 Harness 优化经验
- [[Managed-Agents-Decoupling-Brain-from-Hands|Managed Agents：将大脑与手分离]] - Anthropic 的托管智能体架构设计
- [[MiniMax-M27-Self-Evolution|MiniMax M2.7：开启模型的自我进化]] - 模型参与迭代自己的实践
- [[Harness-Engineering-Coding-Agents-Guide|Harness 工程实践指南：构建更可靠的 AI 编码智能体]] - Faros 的五层架构与度量体系
- [[Building-AI-Agent-Harnesses-Guide|构建 AI 智能体 Harness 完全指南]] - amux 的十组件与六步构建流程
- [[Agent-Harness-Platform-Playbook|智能体 Harness 工程：2026 平台团队手册]] - PuppyOne 的五原语平台治理框架

## 学习路径

### 初学者路径
1. 从 [[Externalization-in-LLM-Agents|LLM Agent 中的外部化]] 开始，理解核心论点
2. 阅读 [[From-Weights-to-Context-to-Harness|从权重到上下文到 Harness]]，了解历史背景
3. 深入三大外部化维度：[[Memory-Systems|记忆]]、[[Skill-Systems|技能]]、[[Agent-Protocols|协议]]
4. 最后学习 [[Harness-Engineering|Harness 工程]] 如何将它们统一

### 架构师路径
1. 直接阅读 [[Harness-Engineering|Harness 工程]] 了解六大分析维度
2. 参考 [[Externalization-in-LLM-Agents|外部化理论]] 作为理论基础
3. 根据需要深入各模块细节

## 最新研究

本知识库持续收录 2026 年的最新综述论文和实践报告，涵盖：
- 记忆架构的四代演进（单片上下文 → 检索存储 → 分层编排 → 自适应系统）
- 技能系统从工具使用到能力包的演变
- 协议生态系统（MCP、A2A、ACP、ANP、A2UI 等）
- Harness 工程的六大分析维度
- 多 Agent 架构实践（Planner-Generator-Evaluator 三 Agent 系统）
- 自动 Harness 合成（[[Meta-Harness|Meta-Harness]] 外环搜索、[[AutoHarness|AutoHarness]] 自我合成代码 Harness）
- Harness 自我进化谱系（[[Self-Harness|Self-Harness]]、[[EvoHarness-RL|EvoHarness-RL]]、[[Agentic-Harness-Engineering|AHE]]、[[HarnessX|HarnessX]]）
- Harness 持续学习与遗忘治理（[[Harness-Continual-Learning|HCL]]）
- 平台化 Harness 治理（[[Agent-Harness-Platform-Playbook|平台团队手册]]）

## Q&A 归档

- [[What-is-Harness-Engineering-in-Simple-Terms|用通俗易懂的方式理解 Harness 工程]] - 科普风格的 Harness 工程简介

## 相关研究

- 认知人工制品理论 (Norman, 1991)
- 分布式认知 (Hutchins, 1995)
- 互补策略 (Kirsh, 1995)
- CoALA 架构
