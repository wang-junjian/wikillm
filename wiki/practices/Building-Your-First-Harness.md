---
title: 构建你的第一个 Harness
tags: [实践指南, 入门, Harness]
source: [NxCode, OpenAI, Martin Fowler]
confidence_score: 高
last_updated: 2026-04-07
---

# 构建你的第一个 Harness

本文提供了构建 Harness 的实用框架，从个人开发者到工程组织的三个级别。

---

## Level 1：基础 Harness（单个开发者）

如果你正在为个人项目使用 Claude Code、Cursor 或 Codex：

### 需要设置的内容

- `CLAUDE.md` 或 `.cursorrules` 文件，包含项目约定
- 用于 linting 和格式化的预提交钩子
- 智能体可以运行以自我验证的测试套件
- 具有一致命名的清晰目录结构

**设置时间：** 1-2 小时  
**影响：** 防止最常见的智能体错误

### 快速入门清单

1. **创建 CLAUDE.md**
   ```markdown
   # 项目约定
   
   ## 代码风格
   - 使用 TypeScript，严格模式
   - 使用 2 空格缩进
   - 函数名使用驼峰命名
   
   ## 测试
   - 所有新代码必须有测试
   - 提交前运行 `npm test`
   
   ## 目录结构
   - src/ - 源代码
   - tests/ - 测试文件
   - docs/ - 文档
   ```

2. **设置预提交钩子**
   ```bash
   # 使用 husky 或 pre-commit
   npm install husky --save-dev
   npx husky install
   ```

3. **确保测试存在**
   - 即使是简单的集成测试也比没有好
   - 智能体需要可以运行的东西来验证其工作

---

## Level 2：团队 Harness（小团队）

对于共享代码库的 3-10 名开发者的团队：

### 在 Level 1 基础上添加

- 包含团队范围约定的 `AGENTS.md`
- CI 强制执行的架构约束
- 常见任务的共享提示模板
- 由 linter 验证的文档即代码
- 专门针对智能体生成的 PR 的代码审查清单

**设置时间：** 1-2 天  
**影响：** 整个团队的智能体行为一致

### AGENTS.md 结构建议

```markdown
# AGENTS.md

本文档包含智能体在此代码库中工作的约定。

## 1. 架构原则
- 我们使用分层架构：Types → Config → Repo → Service → API
- 不要跨层导入
- 所有外部依赖通过 Providers 访问

## 2. 编码标准
- [具体规则...]

## 3. 测试策略
- [具体指南...]

## 4. 审查清单
- [智能体在提交前应检查的内容...]
```

### 共享提示模板

创建一个 `prompts/` 目录，包含常见任务：
- `prompts/add-new-feature.md`
- `prompts/fix-bug.md`
- `prompts/write-tests.md`
- `prompts/refactor-code.md`

---

## Level 3：生产 Harness（工程组织）

对于运行数十个并发智能体的组织：

### 在 Level 2 基础上添加

- 自定义中间件层（循环检测、推理优化）
- 可观测性集成（智能体读取日志和指标）
- 计划运行的熵管理智能体
- Harness 版本控制和 A/B 测试
- 智能体性能监控仪表板
- 智能体陷入困境时的升级策略

**设置时间：** 1-2 周  
**影响：** 智能体作为自主贡献者运作

---

## 常见 Harness 工程错误

### 1. 过度工程化控制流

> "如果你过度工程化控制流，下一个模型更新会破坏你的系统。"

模型快速改进。2024 年需要复杂管道的能力现在由单个上下文窗口提示处理。构建你的 Harness 为**可剥离的**——当模型变得足够智能不需要时，你应该能够移除"智能"逻辑。

### 2. 将 Harness 视为静态的

Harness 需要随模型一起演进。当新模型版本改进推理时，你的推理优化中间件可能会适得其反。每次重大模型更新时审查和更新 Harness 组件。

### 3. 忽略文档层

最有影响力的 Harness 改进通常是最简单的：**更好的文档**。如果你的 `AGENTS.md` 含糊，你的智能体输出也会含糊。投资于精确、机器可读的文档，作为智能体的地面真理。

### 4. 没有反馈循环

没有反馈的 Harness 是一个笼子，而不是指南。智能体需要知道它何时成功何时失败。内置：
- 任务完成前的自我验证步骤
- 作为智能体工作流一部分的测试执行
- 按任务类型的智能体成功率指标

### 5. 仅人类可读的文档

如果你的架构决策存在于人们的头脑中或智能体无法访问的 Confluence 页面中，Harness 就有差距。**智能体需要的一切都必须在仓库中。**

---

## 从哪里开始

### 如果你是单个开发者

1. 从 Level 1 开始
2. 创建一个简单的 `CLAUDE.md`
3. 设置基础预提交钩子
4. 添加一个简单的测试套件
5. 迭代——观察智能体失败的地方并加以修复

### 如果你是一个团队

1. 首先就 Level 1 基础达成一致
2. 一起编写 `AGENTS.md` 的初稿
3. 识别最常见的 3 个智能体失败模式
4. 为这些模式构建前 3 个约束/检查
5. 每 2 周回顾一次什么有效/什么无效

### 如果你是一个组织

1. 从一些试点团队开始
2. 收集什么有效的模式
3. 构建可重用的 Harness 组件库
4. 投资于可观测性和指标
5. 建立 Harness 迭代的反馈循环

---

## 相关概念

- [[Harness-Engineering|Harness 工程]]
- [[Context-Engineering|上下文工程]]
- [[Architectural-Constraints|架构约束]]
- [[Mitchellh-Adoption-Journey|Mitchellh AI 采用之旅]]

## 参考来源

1. NxCode - Harness Engineering: The Complete Guide
2. OpenAI - Harness Engineering：在智能体优先的世界中利用 Codex
3. Martin Fowler - Harness engineering for coding agent users

---

*最后更新：2026-04-07*  
*本文档由 [[WikiLLM]] 编译自多个来源*
