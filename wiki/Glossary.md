---
title: "术语表"
source: "Externalization in LLM Agents: A Unified Review"
last_updated: 2026-04-11
---

# 术语表

本术语表统一了 LLM Agent 外部化框架中的核心概念，提供中英对照和 Wikilink 链接。

## 核心框架

### Externalization (外部化)
**英文**: Externalization  
**中文**: 外部化  
**定义**: 将认知负担从模型的内部计算逐步迁移到持久、可检查和可重用的外部结构中的过程。  
**参见**: [[Externalization-in-LLM-Agents|LLM Agent 中的外部化]]

### Cognitive Artifact (认知人工制品)
**英文**: Cognitive Artifact  
**中文**: 认知人工制品  
**定义**: 设计用于维持、显示或操作信息的人工设备，通过改变任务本身的结构来改变认知性能。  
**参见**: [[Externalization-in-LLM-Agents|LLM Agent 中的外部化]]

### Harness (Harness)
**英文**: Harness  
**中文**: Harness  
**定义**: 将原始模型能力转化为可靠 Agent 行为的脚手架，是承载记忆、技能、协议并提供编排逻辑、约束、可观测性和反馈循环的工程层。  
**参见**: [[Harness-Engineering|Harness 工程]]

### Representational Transformation (表征转换)
**英文**: Representational Transformation  
**中文**: 表征转换  
**定义**: 认知人工制品的核心作用——重组问题，使智能体能够用它已经拥有的能力更可靠地解决问题。

## 记忆系统

### Memory System (记忆系统)
**英文**: Memory System  
**中文**: 记忆系统  
**定义**: 外部化 Agent 状态跨时间的系统，允许积累的知识在单个会话之外持续存在，并在相关时被选择性检索。  
**参见**: [[Memory-Systems|记忆系统]]

### Working Context (工作上下文)
**英文**: Working Context  
**中文**: 工作上下文  
**定义**: 当前任务的实时中间状态：打开的文件、临时变量、活跃假设、部分计划和执行检查点。

### Episodic Experience (情景经验)
**英文**: Episodic Experience  
**中文**: 情景经验  
**定义**: 记录先前运行中发生的事情：决策点、工具调用、失败、结果和反思。

### Semantic Knowledge (语义知识)
**英文**: Semantic Knowledge  
**中文**: 语义知识  
**定义**: 存储在任何单个情节之外都存在的抽象：领域事实、一般启发式、项目约定和稳定的世界知识。

### Personalized Memory (个性化记忆)
**英文**: Personalized Memory  
**中文**: 个性化记忆  
**定义**: 跟踪关于特定用户、团队或环境的稳定信息：偏好、习惯、重复出现的约束和先前的交互。

## 技能系统

### Skill System (技能系统)
**英文**: Skill System  
**中文**: 技能系统  
**定义**: 将程序、最佳实践和操作指导打包成可重用的人工制品的系统，而不是依赖模型的权重在每次调用时重新生成特定任务的知识。  
**参见**: [[Skill-Systems|技能系统]]

### Operational Procedure (操作程序)
**英文**: Operational Procedure  
**中文**: 操作程序  
**定义**: 任务骨架：将复杂工作分解为步骤、阶段、依赖关系和停止条件。

### Decision Heuristic (决策启发式)
**英文**: Decision Heuristic  
**中文**: 决策启发式  
**定义**: 在分支处管理发生情况的实用经验法则，从经验中得出而不是仅靠穷举搜索。

### Normative Constraint (规范性约束)
**英文**: Normative Constraint  
**中文**: 规范性约束  
**定义**: 程序被视为可接受的条件，包括测试要求、范围限制、访问限制、可追溯性期望和特定领域操作规则。

### Progressive Disclosure (渐进式披露)
**英文**: Progressive Disclosure  
**中文**: 渐进式披露  
**定义**: 一种分层加载策略，首先暴露技能的存在，仅在需要时才加载更深的细节。

## 协议系统

### Agent Protocol (智能体协议)
**英文**: Agent Protocol  
**中文**: 智能体协议  
**定义**: 定义了用于发现、调用、委托和权限管理的显式机器可读契约，而不是依赖临时提示级别的协调。  
**参见**: [[Agent-Protocols|智能体协议]]

### Invocation Grammar (调用语法)
**英文**: Invocation Grammar  
**中文**: 调用语法  
**定义**: 每个工具调用、API 请求或委托消息都需要的格式：参数名称、类型、排序和返回结构。

### Lifecycle Semantics (生命周期语义)
**英文**: Lifecycle Semantics  
**中文**: 生命周期语义  
**定义**: 多步交互需要的协调规则：谁接下来行动，允许什么状态转换，任务何时完成或失败。

### MCP (Model Context Protocol)
**英文**: Model Context Protocol (MCP)  
**中文**: 模型上下文协议 (MCP)  
**定义**: Anthropic 提出的标准化协议，为智能体提供跨异构服务发现工具、检查其模式和调用它们的方式。

### A2A (Agent-to-Agent Protocol)
**英文**: Agent-to-Agent Protocol (A2A)  
**中文**: 智能体到智能体协议 (A2A)  
**定义**: Google 提出的标准化智能体间通信协议，支持能力发现、任务委托和状态交换。

## Harness 工程

### Agent Loop (智能体循环)
**英文**: Agent Loop  
**中文**: 智能体循环  
**定义**: Harness 的时间骨干，实现感知-检索-计划-行动-观察周期。  
**参见**: [[Harness-Engineering|Harness 工程]]

### Sandboxing (沙箱)
**英文**: Sandboxing  
**中文**: 沙箱  
**定义**: 创建受控的执行边界，限制 Agent 可以读取、写入和修改的内容，并提供使失败可诊断和回滚可行的可再现性保证。

### Observability (可观测性)
**英文**: Observability  
**中文**: 可观测性  
**定义**: 使 Agent 的内部轨迹对开发者、操作员和 Agent 本身可见的机制，包括结构化日志、执行轨迹和聚合指标。

### Context Budget Management (上下文预算管理)
**英文**: Context Budget Management  
**中文**: 上下文预算管理  
**定义**: 主动管理最稀缺的共享资源——上下文窗口——的策略，包括摘要、基于优先级的驱逐和分阶段加载。

## 历史演进

### Weights Layer (权重层)
**英文**: Weights Layer  
**中文**: 权重层  
**定义**: LLM 部署的最早浪潮，其中能力几乎完全与模型参数等同。  
**参见**: [[From-Weights-to-Context-to-Harness|从权重到上下文到 Harness]]

### Context Layer (上下文层)
**英文**: Context Layer  
**中文**: 上下文层  
**定义**: 注意力从模型修改转向输入设计的阶段，包括提示工程、思维链、ReAct、RAG 等技术。

### Harness Layer (Harness 层)
**英文**: Harness Layer  
**中文**: Harness 层  
**定义**: 当前阶段，其中能力延伸超出提示管理进入持久基础设施。

## 理论基础

### Distributed Cognition (分布式认知)
**英文**: Distributed Cognition  
**中文**: 分布式认知  
**定义**: 拒绝认知完全驻留在个人心灵内的观点，而是将认知过程定位在人、人工制品、表征和协调实践之间。

### Complementary Strategies (互补策略)
**英文**: Complementary Strategies  
**中文**: 互补策略  
**定义**: Kirsh 的理论，认为智能体不仅通过在内部更努力地思考来提高性能，还通过重组外部环境使一些认知工作卸载到其中来提高性能。

## 实践术语

### Context Anxiety (上下文焦虑)
**英文**: Context Anxiety  
**中文**: 上下文焦虑  
**定义**: 一些模型表现出的倾向，当它们接近认为的上下文限制时，会过早地结束工作。

### Context Reset (上下文重置)
**英文**: Context Reset  
**中文**: 上下文重置  
**定义**: 完全清除上下文窗口并启动一个新的 Agent，结合结构化移交来携带前一个 Agent 的状态和下一步。

### Sprint Contract (冲刺契约)
**英文**: Sprint Contract  
**中文**: 冲刺契约  
**定义**: 在每个冲刺之前，生成器和评估器协商的协议，就在编写任何代码之前该工作块的"完成"是什么样子达成一致。

### Planner-Generator-Evaluator (规划器-生成器-评估器)
**英文**: Planner-Generator-Evaluator  
**中文**: 规划器-生成器-评估器  
**定义**: 一种三 Agent 架构，用于长运行自主编码：规划器将简单提示扩展为完整规范，生成器一次实现一个功能，评估器测试并评分结果。  
**参见**: [[Long-Running-Harness-Design|长运行应用的 Harness 设计]]

### Agent-First World (智能体优先的世界)
**英文**: Agent-First World  
**中文**: 智能体优先的世界  
**定义**: 一种软件工程范式，其中没有一行代码是人工编写的，人类工程师的工作重点转向设计环境、明确意图和构建反馈回路。  
**参见**: [[OpenAI-Codex-Harness-Engineering|OpenAI Codex Harness 工程]]

### Progressive Disclosure (渐进式披露)
**英文**: Progressive Disclosure  
**中文**: 渐进式披露  
**定义**: 一种情境管理策略，智能体从一个小而稳定的切入点开始，并被指导下一步该去哪里查看，而不是一开始就被淹没。  
**参见**: [[OpenAI-Codex-Harness-Engineering|OpenAI Codex Harness 工程]]

### Doc-Gardening (文档园艺)
**英文**: Doc-Gardening  
**中文**: 文档园艺  
**定义**: 定期运行的智能体，扫描那些不再反映真实代码行为的过时或废弃文档，并发起修复用的 Pull Request。

### Golden Principles (黄金原则)
**英文**: Golden Principles  
**中文**: 黄金原则  
**定义**: 带有主观意见的机械规则，旨在保持代码库的可读性和一致性，以便将来运行智能体。

### AI Slop (AI 残渣)
**英文**: AI Slop  
**中文**: AI 残渣  
**定义**: 智能体复现代码仓库中已存在的不均衡或不够理想的模式，随着时间的推移导致的漂移。

### Meta-Harness (元 Harness)
**英文**: Meta-Harness  
**中文**: 元 Harness  
**定义**: 一个外环系统，用于搜索和优化 LLM 应用的 Harness 代码，使用编码智能体通过文件系统访问完整历史记录（源代码、执行轨迹、分数）来提议和评估新的 Harness。  
**参见**: [[Meta-Harness|Meta-Harness：模型 Harness 的端到端优化]]

### Code-Space Search (代码空间搜索)
**英文**: Code-Space Search  
**中文**: 代码空间搜索  
**定义**: Meta-Harness 的关键设计选择，将 Harness 优化发生在代码空间中，通过检查执行轨迹推断为什么失败以及哪些早期设计选择导致了失败，而不仅仅是失败本身。

### Computational vs Inferential (计算型 vs 推理型)
**英文**: Computational vs Inferential  
**中文**: 计算型 vs 推理型  
**定义**: Harness 中指南和传感器的两种执行类型：计算型是确定性且快速的（测试、lint、类型检查）；推理型是语义分析、AI 代码审查、"LLM 作为法官"。  
**参见**: [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]]

### Feedforward Guide (前馈指南)
**英文**: Feedforward Guide  
**中文**: 前馈指南  
**定义**: 在智能体行动之前提供的指导，包括原则、规则、参考文档、操作指南等，增加智能体第一次就做对的概率。  
**参见**: [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]]

### Feedback Sensor (反馈传感器)
**英文**: Feedback Sensor  
**中文**: 反馈传感器  
**定义**: 在智能体行动之后提供的验证机制，包括静态分析、日志、浏览器测试、代码审查智能体等，用于自我纠正问题。  
**参见**: [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]]

### Harness Template (Harness 模板)
**英文**: Harness Template  
**中文**: Harness 模板  
**定义**: 针对常见应用拓扑（数据仪表板、CRUD 业务服务、事件处理器）的指南和传感器捆绑包，可以作为团队的起点。  
**参见**: [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]]

### Maintainability Harness (可维护性 Harness)
**英文**: Maintainability Harness  
**中文**: 可维护性 Harness  
**定义**: 监管内部代码质量和可维护性的 Harness 类别，包括 lint、结构测试、代码覆盖等工具。  
**参见**: [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]]

### Architecture Fitness Harness (架构适用性 Harness)
**英文**: Architecture Fitness Harness  
**中文**: 架构适用性 Harness  
**定义**: 定义和检查应用程序架构特征的指南和传感器，类似于架构适用性函数。  
**参见**: [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]]

### Behaviour Harness (行为 Harness)
**英文**: Behaviour Harness  
**中文**: 行为 Harness  
**定义**: 引导和感知应用程序是否按需要功能运行的 Harness 类别，包括功能规范和测试套件。  
**参见**: [[Harness-Engineering-for-Coding-Agent-Users|面向编码智能体用户的 Harness 工程]]

### Rippable Harness (可剥离 Harness)
**英文**: Rippable Harness  
**中文**: 可剥离 Harness  
**定义**: 设计为可以移除"智能"逻辑的 Harness，当模型变得足够智能不需要时。  
**参见**: [[Harness-Engineering-Complete-Guide|Harness 工程完整指南]]

### Three Pillars of Harness Engineering (Harness 工程三大支柱)
**英文**: Three Pillars of Harness Engineering  
**中文**: Harness 工程三大支柱  
**定义**: OpenAI 框架组织的三个核心类别：上下文工程、架构约束、熵管理（垃圾收集）。  
**参见**: [[Harness-Engineering-Complete-Guide|Harness 工程完整指南]]

### Context Engineering (上下文工程)
**英文**: Context Engineering  
**中文**: 上下文工程  
**定义**: 确保智能体在正确时间拥有正确信息的学科，包括存储库本地文档和动态可观测性数据。  
**参见**: [[Harness-Engineering-Complete-Guide|Harness 工程完整指南]]

### Architectural Constraints (架构约束)
**英文**: Architectural Constraints  
**中文**: 架构约束  
**定义**: 机械地强制执行好代码样子的机制，包括依赖分层规则、确定性 linter、结构测试等。  
**参见**: [[Harness-Engineering-Complete-Guide|Harness 工程完整指南]]

### Entropy Management (熵管理)
**英文**: Entropy Management  
**中文**: 熵管理  
**定义**: 定期清理智能体，用于解决 AI 生成代码库随时间积累的熵（文档漂移、命名约定发散、死代码积累）。  
**参见**: [[Harness-Engineering-Complete-Guide|Harness 工程完整指南]]

### Reasoning Sandwich (推理三明治)
**英文**: Reasoning Sandwich  
**中文**: 推理三明治  
**定义**: 一种推理预算分配策略：规划使用高推理、实现使用中推理、验证使用高推理。  
**参见**: [[LangChain-Harness-Engineering|LangChain Harness 工程实践]]

### Self-Verification Loop (自我验证循环)
**英文**: Self-Verification Loop  
**中文**: 自我验证循环  
**定义**: 让智能体验证其工作的机制：规划与发现、构建、验证、修复。  
**参见**: [[LangChain-Harness-Engineering|LangChain Harness 工程实践]]

### Managed Agents (托管智能体)
**英文**: Managed Agents  
**中文**: 托管智能体  
**定义**: Anthropic 的托管服务，通过一组通用接口虚拟化智能体组件（会话、Harness、沙箱）来运行长 horizon 智能体。  
**参见**: [[Managed-Agents-Decoupling-Brain-from-Hands|Managed Agents：将大脑与手分离]]

### Session (会话)
**英文**: Session  
**中文**: 会话  
**定义**: Managed Agents 中发生的一切的仅追加日志，作为生活在 Claude 上下文窗口之外的上下文对象。  
**参见**: [[Managed-Agents-Decoupling-Brain-from-Hands|Managed Agents：将大脑与手分离]]

### Meta-Harness (元 Harness)
**英文**: Meta-Harness  
**中文**: 元 Harness  
**定义**: 一种系统，具有允许许多不同 Harness 的通用接口，而对 Claude 未来将需要的特定 Harness 没有意见。  
**参见**: [[Managed-Agents-Decoupling-Brain-from-Hands|Managed Agents：将大脑与手分离]]

### Model Self-Evolution (模型自我进化)
**英文**: Model Self-Evolution  
**中文**: 模型自我进化  
**定义**: 模型深度参与迭代自己的过程，包括构建强化学习 Harness、更新记忆、驱动自身的强化学习。  
**参见**: [[MiniMax-M27-Self-Evolution|MiniMax M2.7：开启模型的自我进化]]

### Agent Teams (智能体团队)
**英文**: Agent Teams  
**中文**: 智能体团队  
**定义**: 多智能体协作的原生能力，要求角色边界、对抗性推理、协议遵循、行为分化内化到模型中。  
**参见**: [[MiniMax-M27-Self-Evolution|MiniMax M2.7：开启模型的自我进化]]

### Six Stages of AI Adoption (AI 采用的六个阶段)
**英文**: Six Stages of AI Adoption  
**中文**: AI 采用的六个阶段  
**定义**: Mitchell Hashimoto 的采用路径：放弃聊天机器人界面、重现自己的工作、日终智能体、外包确定的任务、工程化 Harness、始终有一个智能体在运行。  
**参见**: [[Mitchellh-AI-Adoption-Journey|Mitchell Hashimoto 的 AI 采用之旅]]
