---
title: 术语表
tags: [术语表, 核心概念]
last_updated: 2026-04-07
---

# 术语表

本术语表汇总了 [[Harness-Engineering|Harness 工程]] 领域的核心概念，为知识库提供统一的术语枢纽。

## A

### Agent (智能体)
**英文**：Agent  
**中文**：智能体  
**定义**：能够自主感知环境、做出决策并执行行动的 AI 系统。在编码场景中，智能体通常具备读取文件、执行程序、发起 HTTP 请求等工具调用能力。  
**相关概念**：[[Agent Teams|智能体团队]], [[Coding Agent|编码智能体]]

### Agent Teams (智能体团队)
**英文**：Agent Teams  
**中文**：智能体团队  
**定义**：多个智能体通过角色分工、协作协议和差异化行为共同完成复杂任务的系统。需要模型原生支持角色锚定、对抗性推理和协议遵守。  
**相关概念**：[[MiniMax M2.7]], [[Multi-Agent Collaboration|多智能体协作]]

### Anthropic Harness Design (Anthropic Harness 设计)
**英文**：Anthropic Harness Design  
**中文**：Anthropic Harness 设计  
**定义**：Anthropic 团队提出的多智能体架构，包含 Planner（规划者）、Generator（生成者）和 Evaluator（评估者）三种角色，通过生成-评估循环提升输出质量。  
**相关概念**：[[Generator-Evaluator Loop|生成-评估循环]], [[Context Reset|上下文重置]]

## B

### Build-Verify Loop (构建-验证循环)
**英文**：Build-Verify Loop  
**中文**：构建-验证循环  
**定义**：智能体在完成任务过程中自主进行的迭代改进流程，包括规划发现、构建实现、验证测试和修复问题四个阶段。  
**相关概念**：[[Self-Verification|自我验证]], [[Reasoning Sandwich|推理三明治]]

## C

### Codex (Codex 模型)
**英文**：Codex  
**中文**：Codex 模型  
**定义**：OpenAI 推出的专门用于代码生成的模型系列，在 Harness 工程中被用于从零生成完整产品代码库。  
**相关概念**：[[OpenAI Harness Engineering|OpenAI Harness 工程]]

### Coding Agent (编码智能体)
**英文**：Coding Agent  
**中文**：编码智能体  
**定义**：专门用于软件工程任务的 AI 智能体，能够理解代码库、编写代码、运行测试和调试问题。  
**相关概念**：[[Harness|Harness]], [[Agent|智能体]]

### Context Engineering (上下文工程)
**英文**：Context Engineering  
**中文**：上下文工程  
**定义**：Harness 工程的三大支柱之一，专注于确保智能体在正确的时间获得正确的信息，包括静态上下文和动态上下文。  
**相关概念**：[[Harness-Engineering|Harness 工程]], [[Context Reset|上下文重置]]

### Context Reset (上下文重置)
**英文**：Context Reset  
**中文**：上下文重置  
**定义**：一种解决长任务中上下文窗口填充和"上下文焦虑"问题的技术，通过清空上下文窗口并使用结构化交接传递状态来实现。  
**相关概念**：[[Context Compaction|上下文压缩]], [[Context Anxiety|上下文焦虑]]

### Context Anxiety (上下文焦虑)
**英文**：Context Anxiety  
**中文**：上下文焦虑  
**定义**：模型在接近其认为的上下文限制时提前结束工作的倾向，Claude Sonnet 4.5 表现出较强的这种行为。  
**相关概念**：[[Context Reset|上下文重置]], [[Context Window|上下文窗口]]

### Context Compaction (上下文压缩)
**英文**：Context Compaction  
**中文**：上下文压缩  
**定义**：通过摘要方式保留对话连续性的技术，但无法为智能体提供干净的状态，上下文焦虑问题仍可能存在。  
**相关概念**：[[Context Reset|上下文重置]]

## D

### Doom Loop (末日循环)
**英文**：Doom Loop  
**中文**：末日循环  
**定义**：智能体在陷入困境时对同一错误方法进行小幅变异的重复尝试现象，可能多达 10 次以上。  
**相关概念**：[[Loop Detection|循环检测]]

## E

### Entropy Management (熵管理)
**英文**：Entropy Management  
**中文**：熵管理  
**定义**：Harness 工程的三大支柱之一，通过定期清理智能体来管理 AI 生成代码库中随时间积累的熵（文档漂移、命名约定分歧、死代码堆积等）。  
**相关概念**：[[Harness-Engineering|Harness 工程]], [[Garbage Collection|垃圾回收]]

### Evaluator (评估者)
**英文**：Evaluator  
**中文**：评估者  
**定义**：Anthropic Harness 设计中的三种角色之一，负责评估 Generator 的输出质量，提供具体的反馈和评分。  
**相关概念**：[[Generator|生成者]], [[Planner|规划者]]

## F

### Feedforward (前馈控制)
**英文**：Feedforward  
**中文**：前馈控制  
**定义**：预期智能体行为并在其行动前进行引导的控制方式，提高智能体第一次尝试就产生良好结果的概率。  
**相关概念**：[[Feedback|反馈控制]], [[Guide|引导]]

### Feedback (反馈控制)
**英文**：Feedback  
**中文**：反馈控制  
**定义**：在智能体行动后进行观察并帮助其自我纠正的控制方式，特别是当产生针对 LLM 消费优化的信号时效果显著。  
**相关概念**：[[Feedforward|前馈控制]], [[Sensor|传感器]]

## G

### Garbage Collection (垃圾回收)
**英文**：Garbage Collection  
**中文**：垃圾回收  
**定义**：OpenAI 团队采用的定期清理流程，通过"黄金原则"和后台 Codex 任务来扫描偏差、更新质量等级并发起针对性重构。  
**相关概念**：[[Entropy Management|熵管理]]

### Generator (生成者)
**英文**：Generator  
**中文**：生成者  
**定义**：Anthropic Harness 设计中的三种角色之一，负责实际创建输出（如前端代码、应用功能等）。  
**相关概念**：[[Evaluator|评估者]], [[Planner|规划者]]

### Generator-Evaluator Loop (生成-评估循环)
**英文**：Generator-Evaluator Loop  
**中文**：生成-评估循环  
**定义**：受 GAN 启发的多智能体结构，Generator 生成输出，Evaluator 评估并提供反馈，Generator 根据反馈进行迭代改进。  
**相关概念**：[[Anthropic-Harness-Design|Anthropic Harness 设计]]

### Glossary (术语表)
**英文**：Glossary  
**中文**：术语表  
**定义**：WikiLLM 知识库的核心枢纽文档，统一术语翻译、提供中英对照，并通过 wikilinks 连接所有相关概念。  
**相关概念**：[[Wikilink|Wikilink]], [[WikiLLM]]

## H

### Harness (Harness)
**英文**：Harness  
**中文**：Harness  
**定义**：AI 智能体之外的一切，包括系统提示、工具选择、执行流程、约束条件、反馈循环等。公式：Agent = Model + Harness。  
**相关概念**：[[Harness-Engineering|Harness 工程]], [[Agent|智能体]]

### Harness Engineering (Harness 工程)
**英文**：Harness Engineering  
**中文**：Harness 工程  
**定义**：设计和实现使 AI 智能体可靠工作的系统的新学科，包括约束智能体行为、告知智能体应该做什么、验证智能体正确执行、纠正智能体错误四个方面。  
**相关概念**：[[Context-Engineering|上下文工程]], [[Architectural-Constraints|架构约束]], [[Entropy Management|熵管理]]

### Harness Template (Harness 模板)
**英文**：Harness Template  
**中文**：Harness 模板  
**定义**：为常见服务拓扑（如数据仪表板、CRUD 业务服务、事件处理器）准备的引导和传感器捆绑包，可实例化用于特定项目。  
**相关概念**：[[Harness-Engineering|Harness 工程]]

## L

### LangChain Harness Engineering (LangChain Harness 工程)
**英文**：LangChain Harness Engineering  
**中文**：LangChain Harness 工程  
**定义**：LangChain 团队通过仅改变 Harness 将编码智能体在 Terminal Bench 2.0 上的表现从 52.8% 提升到 66.5%（Top 30 到 Top 5）的实践。  
**相关概念**：[[Harness-Engineering|Harness 工程]], [[Self-Verification|自我验证]]

### Layered Domain Architecture (分层领域架构)
**英文**：Layered Domain Architecture  
**中文**：分层领域架构  
**定义**：OpenAI 采用的严格架构模型，每个业务领域划分为固定的层组（Types → Config → Repo → Service → Runtime → UI），依赖方向经过严格验证。  
**相关概念**：[[Architectural-Constraints|架构约束]]

### Loop Detection (循环检测)
**英文**：Loop Detection  
**中文**：循环检测  
**定义**：LangChain 采用的中间件，通过钩子跟踪每个文件的编辑次数，在对同一文件进行 N 次编辑后添加"考虑重新考虑你的方法"的上下文。  
**相关概念**：[[Doom Loop|末日循环]], [[Middleware|中间件]]

## M

### Middleware (中间件)
**英文**：Middleware  
**中文**：中间件  
**定义**：LangChain 结构化 Harness 的方式，通过可组合的中间件层在不修改核心智能体逻辑的情况下添加特定功能。  
**相关概念**：[[LangChain Harness Engineering|LangChain Harness 工程]]

### MiniMax M2.7 (MiniMax M2.7 模型)
**英文**：MiniMax M2.7  
**中文**：MiniMax M2.7 模型  
**定义**：MiniMax 推出的深度参与自我进化的模型，能够构建复杂智能体 Harness、完成高度复杂的生产力任务，包括 Agent Teams、复杂 Skills 和动态工具搜索。  
**相关概念**：[[Agent Teams|智能体团队]], [[Self-Evolution|自我进化]]

### Mitchellh AI Adoption Journey (Mitchellh AI 采用之旅)
**英文**：Mitchellh AI Adoption Journey  
**中文**：Mitchellh AI 采用之旅  
**定义**：HashiCorp 创始人 Mitchell Hashimoto 分享的个人 AI 工具采用历程，包括从聊天机器人到始终运行智能体的六个阶段。  
**相关概念**：[[Harness-Engineering|Harness 工程]]

## N

### NxCode Harness Engineering (NxCode Harness 工程)
**英文**：NxCode Harness Engineering  
**中文**：NxCode Harness 工程  
**定义**：NxCode 团队提供的 Harness 工程完整指南，总结了三大支柱、实践框架和常见错误。  
**相关概念**：[[Harness-Engineering|Harness 工程]]

## O

### OpenAI Harness Engineering (OpenAI Harness 工程)
**英文**：OpenAI Harness Engineering  
**中文**：OpenAI Harness 工程  
**定义**：OpenAI 团队在 5 个月内构建了超过 100 万行代码的产品，其中零行代码由人工编写，证明了 Harness 工程在生产规模上的有效性。  
**相关概念**：[[Harness-Engineering|Harness 工程]], [[Codex|Codex 模型]]

### Observability Stack (可观测性堆栈)
**英文**：Observability Stack  
**中文**：可观测性堆栈  
**定义**：OpenAI 为 Codex 提供的日志、指标和追踪记录展示系统，使智能体能够直接访问应用程序的运行状态。  
**相关概念**：[[Context-Engineering|上下文工程]]

## P

### Planner (规划者)
**英文**：Planner  
**中文**：规划者  
**定义**：Anthropic Harness 设计中的三种角色之一，负责将简单的 1-4 句话提示扩展为完整的产品规格。  
**相关概念**：[[Generator|生成者]], [[Evaluator|评估者]]

## R

### Reasoning Sandwich (推理三明治)
**英文**：Reasoning Sandwich  
**中文**：推理三明治  
**定义**：LangChain 采用的推理预算分配策略，在规划和验证阶段使用高推理预算，在实现阶段使用中等推理预算。  
**相关概念**：[[Build-Verify Loop|构建-验证循环]]

### Ralph Wiggum Loop (Ralph Wiggum 循环)
**英文**：Ralph Wiggum Loop  
**中文**：Ralph Wiggum 循环  
**定义**：使用钩子在智能体退出时强制其继续执行的循环模式，用于验证环节。  
**相关概念**：[[Self-Verification|自我验证]]

## S

### Self-Verification (自我验证)
**英文**：Self-Verification  
**中文**：自我验证  
**定义**：智能体通过运行测试、阅读完整输出并与原始要求进行比较来自我改进的能力。  
**相关概念**：[[Build-Verify Loop|构建-验证循环]]

### Self-Evolution (自我进化)
**英文**：Self-Evolution  
**中文**：自我进化  
**定义**：模型深度参与自身进化的过程，包括更新自身记忆、构建复杂技能、根据实验结果改进学习过程和 Harness。  
**相关概念**：[[MiniMax M2.7|MiniMax M2.7 模型]]

### Sensor (传感器)
**英文**：Sensor  
**中文**：传感器  
**定义**：观察智能体行动后结果并帮助其自我纠正的反馈控制，包括计算型和推理型两种类型。  
**相关概念**：[[Feedback|反馈控制]]

### Sprint Contract (冲刺契约)
**英文**：Sprint Contract  
**中文**：冲刺契约  
**定义**：在每个冲刺前，Generator 和 Evaluator 协商达成的协议，定义该阶段工作的"完成"标准。  
**相关概念**：[[Anthropic-Harness-Design|Anthropic Harness 设计]]

## T

### Terminal Bench (终端基准测试)
**英文**：Terminal Bench  
**中文**：终端基准测试  
**定义**：评估智能体编码能力的标准基准测试，包含机器学习、调试、生物学等多个领域的任务。  
**相关概念**：[[LangChain Harness Engineering|LangChain Harness 工程]]

## W

### Wikilink (Wikilink)
**英文**：Wikilink  
**中文**：Wikilink  
**定义**：使用 `[[文档标题]]` 格式的内部链接，在 Obsidian 等工具中支持双向链接和图谱视图。  
**相关概念**：[[Backlink|反向链接]], [[Glossary|术语表]]

### WikiLLM (WikiLLM)
**英文**：WikiLLM  
**中文**：WikiLLM  
**定义**：本项目的名称，一个利用 LLM 构建个人知识库的系统，通过"编译"原始数据生成结构化、交叉链接的高质量中文 Wiki。  
**相关概念**：[[Glossary|术语表]], [[INDEX]]

---

*最后更新：2026-04-07*  
*本文档由 [[WikiLLM]] 自动生成*
