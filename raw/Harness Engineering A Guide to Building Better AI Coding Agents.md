---
title: "Harness engineering: A guide to building better AI coding agents"
source: "https://www.faros.ai/blog/harness-engineering"
author: "Neely Dunlap (Faros AI)"
published: 2026
created: 2026-10-09
description:
tags:
  - "clippings"
---

# Harness engineering: A guide to building better AI coding agents





Agent = Model + Harness. Harness engineering is what makes AI agents reliable in production. See the five layers and the metrics that matter.































<img src="https://cdn.prod.website-files.com/plugins/Basic/assets/placeholder.60f9b1840c.svg" class="case_study-info-logo w-dyn-bind-empty" loading="lazy" />









About the Company

















Industry





















<img src="https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering.webp" id="w-node-c6068182-eb67-b7ad-a408-b4cfaea10c1a-79b0b989" class="blog-post-header_image" sizes="100vw" srcset="https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering-p-500.webp 500w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering-p-800.webp 800w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering-p-1080.webp 1080w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering-p-1600.webp 1600w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering-p-2000.webp 2000w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering-p-2600.webp 2600w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering-p-3200.webp 3200w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/6a10767d6a0c7f4366a512f9_Harness%20Engineering.webp 3984w" alt="AI icon within a fence (harness) on red background" />

































Chapters



















<a href="#" class="content27_link w-inline-block"></a>



Heading 2





<a href="#" class="content27_link is-h3 w-inline-block"></a>



Heading 3





<a href="#" class="content27_link is-h3 w-inline-block"></a>



Heading 4



















<a href="#" class="blog_share-link w-inline-block" aria-label="Twitter Share" data-fs-socialshare-element="twitter"></a>







<a href="#" class="blog_share-link w-inline-block" aria-label="LinkedIn Share" data-fs-socialshare-element="linkedin"></a>







<a href="#" id="share-mail" class="blog_share-link w-inline-block" aria-label="Mail Share"></a>









<a href="#" class="blog_share-link w-inline-block" aria-label="Copy Link" data-fs-copyclip-element="click"></a>











Copy link to blog post entry





Copied!















https://www.faros.ai/blog/harness-engineering

















































<a href="#" class="blog_share-link w-inline-block" aria-label="Twitter Share" data-fs-socialshare-element="twitter"></a>







<a href="#" class="blog_share-link w-inline-block" aria-label="LinkedIn Share" data-fs-socialshare-element="linkedin"></a>









<a href="#" class="blog_share-link w-inline-block" aria-label="Copy Link" data-fs-copyclip-element="click" data-w-id="a1855fa4-7c6a-79d4-0f7b-177783c1f0c0"></a>











Copied!















https://www.faros.ai/blog/harness-engineering



























<a href="/blog?category=AI#gallery" class="blog_category-tag w-inline-block"></a>



AI











<a href="/blog?category=Coding#gallery" class="blog_category-tag w-inline-block"></a>



Coding











<a href="/blog?category=Context#gallery" class="blog_category-tag w-inline-block"></a>



Context











<a href="/blog?category=Data%20Engineering#gallery" class="blog_category-tag w-inline-block"></a>



Data Engineering











<a href="/blog?category=Leaders#gallery" class="blog_category-tag w-inline-block"></a>



Leaders











<a href="/blog?category=Managers#gallery" class="blog_category-tag w-inline-block"></a>



Managers











<a href="/blog?category=Metrics#gallery" class="blog_category-tag w-inline-block"></a>



Metrics



















*Published May 22, 2026 · Updated July 15, 2026*

**TL;DR: Agent = Model + Harness**

The model contains the raw intelligence, and the harness makes that intelligence useful and actionable. **Harness engineering** is how we build the environment around AI models to turn them into reliable, autonomous agents. It’s the third phase of AI engineering maturity, following prompt engineering and context engineering, and the main focus of engineering investment in 2026.

{{cta}}

A production-grade harness contains five layers: tool orchestration, verification loops, context and memory, guardrails, and observability. Engineering leaders ready to improve agent reliability should first baseline their current state with metrics they can pull from existing systems (cost per merged PR, time-to-merge for agent-assisted PRs, review velocity relative to PR size, and compute spend per developer), then use that data to decide which of the five layers needs investment next.

## Is harness engineering the key to making AI coding agents actually work?

The questions engineering leaders are asking about AI in software development have shifted considerably in the last two years. We went from *“Which AI model writes the best code?”* to *“How do we feed AI the right context?”* to today’s burning question: *“How do we operationalize AI agents?”* 

To answer that, we need to talk about harness engineering. In this article, we explore the industry’s progression from prompting to harnessing, what an agent harness contains, and what engineering leaders should track as agents take on greater responsibility across the SDLC. 

## From prompt to context to harness: The three phases of AI engineering maturity

**AI engineering maturity has moved through three distinct phases: prompt engineering (language), context engineering (information), and now harness engineering (environment). **





| Phase | Time period | Core Discipline | What It Entails | Software Engineering Focus | Primary Output |
|----|----|----|----|----|----|
| 1 | 2022–2023 | Prompt Engineering | How we talk to the model | Syntax & phrasing: Refining natural language instructions to get better logic | Code snippets: Autocomplete and boilerplate generation |
| 2 | 2024–2025 | Context Engineering | What the model knows | Relevance & memory: Curating the right data and rules for the model’s window | Feature logic: Context-aware file and system updates |
| 3 | 2026 | Harness Engineering | How the model is allowed to act and self-correct | Autonomy & control: Building the feedback loops and safety rails for agents | Autonomous tasks: End-to-end task execution and verification |

The evolution of AI engineering disciplines: prompt engineering to context engineering to harness engineering





**Phase 1 (2022-2023) — Prompt engineering:** The focus was on language. Engineers discovered that how you phrased a request significantly changed the quality of output. AI tools functioned mostly as smart autocomplete, which was helpful for boilerplate and code snippets, but required constant human steering.

**Phase 2 (2024-2025) — Context engineering:** As AI models got more capable, the bottleneck shifted from wording to information. Engineers started curating what went into the model’s context window, including relevant files, project rules, and architectural constraints, so the AI could reason about a specific codebase rather than generating generic solutions. Tools like MCP and RAG made this more systematic.

**Phase 3 (2026) — Harness Engineering:** Now, the challenge is autonomy, accuracy, and control. Established by <a href="https://mitchellh.com/writing/my-ai-adoption-journey" target="_blank">Mitchell Hashimoto</a> earlier this year, the core premise is: “Anytime you find an agent makes a mistake, you take the time to engineer a solution so that the agent never makes that mistake again.” Most of the time, that solution comes in the form of an improved harness. Harness engineering is the practice of building that structure: the feedback loops, safety boundaries, and verification systems that keep agents accountable.

## Why AI coding agents forced the shift to harness engineering

**The harness, not the model, determines how well an AI coding agent performs in production.**

All AI coding tools can generate code at this point—and a lot of it, very quickly. Yet, more code doesn’t mean better code or better outcomes. Research from Faros’s [AI Engineering Report 2026 - Acceleration Whiplash](https://www.faros.ai/research/ai-acceleration-whiplash) found that AI adoption is producing code changes that are larger, more complex, and carry a wider blast radius than before. At the same time, the convincing surface quality of AI-generated code makes it cognitively taxing to review. Engineers have to hunt for subtle errors in code that reads like it was written by a careful senior developer. Review fatigue sets in, mistakes slip through, and unvetted code enters production at a higher rate just as the stakes of failure have grown. Faros calls this the [senior engineer tax](https://www.faros.ai/blog/ai-code-quality-senior-engineer-review-burden). 

Feeding the model better context helps, but it doesn’t solve the core problem. What’s needed is a framework built around the agent that enforces verification, limits scope, and maintains accountability across tasks. This is the insight behind the formula: **Agent = Model + Harness.** The model handles reasoning. The harness makes that reasoning reliable and actionable.

Anthropic’s <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps" target="_blank">research</a> identified several failure modes that are inherent to AI models but solvable at the harness level:

- **Victory declaration bias:** Agents frequently mark a task complete without verifying the outcome.
- **Context anxiety:** As the context window fills up, models “panic” and rush to finish, cutting corners to avoid running out of space.
- **One-shotting overreach:** Agents often try to tackle an entire problem in one go, which produces an undocumented tangle of changes. 

The importance of the harness is clearly demonstrated by this real-world example: In March 2026, the <a href="https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering" target="_blank">LangChain</a> engineering team moved their coding agent from the 30th to the 5th place on <a href="https://www.tbench.ai/leaderboard/terminal-bench/2.0" target="_blank">Terminal Bench 2.0</a> without changing the underlying model at all; the improvement was achieved entirely by optimizing the harness.

## The great equalizer: How a strong harness levels the playing field for open models

To prove just how critical the harness is to overall agent performance, we ran 211 real engineering tasks through our proprietary [AI model routing evaluation framework](https://www.faros.ai/blog/ai-model-routing-evaluation-framework) to [compare open-weight models against frontier models](https://www.faros.ai/blog/open-models-vs-frontier-models). The results were eye-opening: when paired with a highly optimized harness, open models such as GLM-5.2 and Kimi K2.6 landed in the top quality band, matching or even outperforming expensive frontier routes like Opus 4.8 and GPT-5.5 on real-world coding tasks. Because engineers don't use raw models in isolation—they use models *through* a harness that decides how context is loaded, how tools are called, and how failures are handled—the harness becomes the ultimate equalizer. You don't necessarily need to pay a premium for frontier AI coding model intelligence if you invest in a production-grade harness that makes an open model's reasoning reliable and actionable.

## **Prebuilt harnesses vs. custom harnesses: What teams actually build**

**While prebuilt harnesses give AI agents general-purpose execution capabilities out of the box, engineering teams must build custom scaffolding to ensure organization-specific compliance, safety, and accountability.**

Most AI coding agents ship with a default harness already built in. Claude Code is a good example. Out of the box, it comes with file read/write tools, the ability to run terminal commands, a multi-step execution loop, and permission controls that prompt for human approval before taking risky actions. That default harness is what makes it an agent rather than a chatbot. It can take actions, check results, and keep going until a task is done.

But the default harness is a starting point, not a finished product. Engineering teams routinely layer additional scaffolding on top of it to fit their specific environment, standards, and risk tolerance. This is where harness engineering as a discipline really begins.

Consider a mid-sized fintech company adopting Claude Code across their backend engineering team. The default harness lets agents read files, write code, and run tests. But the team has additional requirements the default harness doesn’t cover: every PR touching payment logic must pass a proprietary compliance linter before it can be submitted, agents must never modify database migration files without a human sign-off, and all agent activity needs to be logged to an internal audit system for regulatory review.

None of that exists in the default harness, so the team builds it themselves. They build a custom layer that sits between the agent and their codebase, enforcing those rules on every run. The model hasn’t changed. Claude Code’s default harness hasn’t changed. What’s changed is the additional scaffolding the team built around it.

This layered model is common and intentional. Tools like Claude Code are designed to be extended through mechanisms like MCP servers, which allow teams to plug in new tools the agent can call—internal APIs, proprietary databases, ticketing systems, compliance checks. A CLAUDE.md file in the repository automatically injects team-specific instructions into every session, functioning as a lightweight but persistent harness customization. More sophisticated teams build full orchestration pipelines that treat Claude Code as one step in a larger workflow where one agent triages the issue, Claude Code writes the fix, a second agent reviews it before the PR is opened.

The key distinction is this: the prebuilt harness gives the agent general-purpose reliability. The custom harness gives it organizational accountability. Both are necessary, and neither replaces the other.

## What a production-ready coding agent harness contains 

**A modern, production-ready harness is a layered system of orchestration, verification, memory, guardrails, and observability.**





| Harness Component | What It Is | Why It Matters |
|----|----|----|
| Tool Orchestration | The control plane which determines how an agent selects, chains, and executes tools (APIs, shells) while dynamically recovering from errors. | Transforms brittle scripts into resilient, autonomous workflows capable of handling unpredictable real-world environments. |
| Verification Loops | Automated, intermediate quality assurance steps (unit tests, self-critique) evaluated during execution, not just at the end. | Fails fast to prevent compounding errors, saving significant cloud compute costs and ensuring higher output accuracy. |
| Context & Memory | Systems that index specific codebases and persist conversational history or customized skills across multiple sessions. | Eliminates repetitive prompting overhead and ensures agents strictly adhere to proprietary company design patterns. |
| Guardrails | Hardcoded boundary limits, security sandboxes, budget ceilings, and human-in-the-loop (HITL) approval gates. | Mitigates enterprise risk by preventing runaway costs, unauthorized data access, or destructive infrastructure actions. |
| Observability | Comprehensive telemetry, execution tracing, and audit logs capturing the exact inputs, outputs, and state of the agent. | Unboxes AI decision-making, allowing engineering teams to debug failures, run regressions, and prove system reliability. |

Core harness engineering components and their role in reliable agentic systems





### Tool orchestration and verification

Tool orchestration is the central nervous system that transforms an AI model from a passive text generator into an autonomous actor capable of executing complex, multi-step workflows. It dictates how the agent accesses environments, like secure file systems, shells, or internal APIs, and how intelligently it can chain these utilities together to solve problems. Crucially, robust orchestration includes dynamic error handling, allowing the agent to recognize when something went wrong, pivot its strategy, and recover without requiring human intervention. This resilience is what separates a brittle proof-of-concept from a production-ready agent that can navigate unpredictable external systems.

### Verification loops

While tool orchestration ensures the tools run correctly, verification loops act as an automated quality assurance layer that evaluates the accuracy and logic of the agent’s intermediate work. By integrating unit tests, linters, and self-critique after individual steps, these loops catch hallucinations and logical flaws immediately rather than at the end of a long run. This fail-fast mechanism prevents minor early-stage mistakes from compounding into large, unrecoverable failures. For engineering teams, this reduces the time and compute wasted on dead-end agent runs while ensuring a higher baseline of output reliability.

### Context and memory systems

Context and memory systems give the agent continuity, transforming it from a generic assistant into a specialized extension of your engineering team. By actively indexing your codebase and retaining session history, the agent avoids having to relearn your architecture and constraints every time it’s invoked. This persistent memory allows the agent to adhere to established design patterns and reuse customized skill libraries to solve recurring problems faster. This helps reduce the overhead of repeated context-setting for developers and drive more consistent, domain-specific outcomes.

### Guardrails

Guardrails define the safe operating boundaries for an autonomous agent, ensuring it can’t cause unintended infrastructure damage or incur runaway costs. By enforcing strict scope limits, security sandboxes, and hard budget ceilings, engineering leadership can confidently mitigate the risks of autonomous execution. Human-in-the-loop gates for sensitive or irreversible actions—like modifying production databases—ensure that ultimate authority stays with your engineers. These mechanisms are non-negotiable prerequisites for building organizational trust and moving agents out of testing into real-world environments.

### Observability

Observability provides the telemetry required to unpack the black box of AI decision-making, letting your team track exactly what an agent did and why. Through execution tracing and detailed audit logs, engineers can debug failed agent runs by reviewing the agent's exact tool inputs and environmental state at any given moment. This infrastructure also powers systematic evaluations and regression detection, giving concrete data on whether recent changes to the prompt or harness actually improved the agent's success rate. In short, observability turns anecdotal agent behavior into quantifiable, actionable metrics.

## What engineering leaders should measure as harness engineering evolves

**Measure agent reliability, cost, and human-system quality in stages: Start with what you can pull from existing systems, then build the session-to-PR linkage that unlocks the rest.**

As AI agents take on more engineering work, the question leaders need to answer is whether the model-harness-human dynamics are producing strong, safe code at a reasonable cost. A quick definition before the metrics: In this section, a *task* is a piece of engineering work that ends in something a person can review—usually a pull request PR or a closed ticket. Individual chats with the agent and tool calls are the raw material; tasks are what gets shipped. Using the same definition of task everywhere keeps success and failure rates comparable across teams.

**The most useful way to think about harness engineering metrics is in stages, ordered by the data you actually have access to.** Start with metrics you can pull from your existing systems. Next, add metrics that need new tracking infrastructure as you build it. Save the metrics that need surveys or detailed categorization for last.

### A staged plan for measuring agent work

Rolling out metrics in the right order is what makes a measurement program more feasible. Match each stage to the data your team can actually collect.

#### Stage 1 — What you can measure right now

These metrics use data your engineering team already has: PR cycle times, AI vendor bills, headcount, git history. They give you a baseline on cost and pipeline impact using systems you already run.

#### Stage 2 — Once you can link agent sessions to PRs

This is the hardest piece of infrastructure to build, and it’s also the most valuable. You connect each agent session to the PR it created, label the session by what the engineer was trying to do (build something, explore an idea, ask a question), and trace bugs and incidents back to specific agent-assisted PRs. Once that’s in place, you can calculate how often the agent gets things right on the first try, how much of its code stays in production, and how often its work causes problems downstream.

#### Stage 3 — Once you can categorize tasks or run surveys

These metrics need either a system for classifying tasks by complexity, or a regular survey of engineers. Treat survey-based metrics as cultural signals; they tell you how the team is feeling about the work. Engineer retention on agent-heavy teams is also worth tracking, though it’s a slow signal that takes a year or more to show patterns.





| AI Agent Metric | What It Tells You | How To Calculate | What You Need To Track It |
|----|----|----|----|
| Dollars per merged PR | What each shipped PR costs in AI fees | Total AI spending ÷ PRs merged in the window | AI bill + PR data (have now) |
| Compute spend per active developer | AI cost per engineer | Total AI spending ÷ number of active developers | AI bill + HR data (have now) |
| Time-to-merge for agent-assisted PRs | How long agent-touched work takes to ship | Time from PR open to merge, looking only at AI-touched PRs | PR data with an AI-touched flag (have now) |
| PR size for agent-assisted PRs | How big agent PRs are compared to human PRs | Average lines changed per AI-touched PR vs. human-authored PRs | PR data with an AI-touched flag (have now) |
| Code churn on agent-touched code | How much agent code gets rewritten quickly | Lines the agent added that get removed or rewritten within two weeks | Git history with an AI-touched flag (have now) |
| Review velocity relative to PR size | Whether your reviewers can keep up with the volume | Review time ÷ lines changed, split by AI vs. human PRs | PR review data (have now) |
| First-pass success rate | How often the agent solves a real implementation task on the first try | Sessions that worked on attempt 1 ÷ all implementation-intent sessions | Session-to-PR linking + intent tagging |
| Agent-PR survival rate | How much agent code is still in production a month later | Agent-written lines still in main 30 days after merge ÷ original agent-written lines | Session-to-PR linking + git history |
| Defect escape rate on agent-generated changes | How often bugs trace back to agent work | Incidents tied to agent PRs ÷ total agent PRs | Session-to-PR linking + incident tracking |
| Distribution of task complexity across engineering levels | Whether agent work is changing what each engineering level handles | Task complexity scores broken down by engineer level over time | A way to score task complexity + engineer level data |
| Reviewer fatigue and confidence in agent PRs | How tired or trusting your reviewers feel | Short quarterly survey, tracked over time | A simple engineer survey each quarter |

Harness engineering metrics for tracking AI agent cost, quality, and reviewer impact





### Why linking agent sessions to PRs is the foundation

The hardest and most valuable piece of measurement infrastructure is the link between agent sessions and PRs. You connect each session to the PR it produced, label the session by what the engineer was trying to do, and trace bugs and incidents back to specific agent-assisted PRs. With that in place, you can measure how often the agent succeeds on a real task, how much of its code stays in production, and how often its work causes problems.

Engineering leaders investing in agent measurement should build this linking first. Metrics can follow once the linking works.

### Where to look when a metric shows a problem

When a metric flags something off, the harness is usually the first place to check. Three common patterns:

- A task failed → usually a harness problem: the harness gave the agent partial context about your code, skipped a verification step, or routed the agent through a broken tool connection.
- AI costs are climbing → usually [tokens are being wasted](https://www.faros.ai/blog/tokenmaxxing) through redundant tool calls, repeated context lookups, or evaluations that re-run on every change. [Vendor pricing](https://www.faros.ai/blog/ai-coding-roi-for-the-cfo-conversation) changes is another thing to check.
- Developers are losing confidence in agent work → usually the harness leaves out the reasoning behind agent changes, so reviewers have to figure out the intent themselves before they can review the code.

When deciding what to change, look at the whole system—the AI model, the harness, and how humans are working with both.

## The harness engineering work to prioritize this quarter

Harness engineering is the practice that converts raw model capability into production-grade engineering work. The orchestration, verification, memory, guardrails, and observability built around an AI agent determine whether its output reaches production safely and at scale—and the teams investing in these layers are the ones consistently moving agent-assisted code into real systems. 

A practical move engineering leaders should make this quarter: Start with the Stage 1 metrics covered above. Dollars per merged PR, time-to-merge for agent-assisted PRs, review velocity against PR size, and compute spend per active developer. None of these require new instrumentation. Once you have a baseline, the data will tell you which of the five harness layers needs your next round of engineering investment.

Remember, AI engineering requires more than better tools. Harness engineering is one of the [eight pillars](https://www.faros.ai/blog/ai-engineering) that make up this emerging system, and it should be treated as a deliberate, measured practice in 2026 and beyond.

Faros helps companies understand, optimize, and govern how AI coding tools and autonomous agents spend tokens across engineering workflows. The Faros platform reduces cost per outcome shipped, while continuously improving AI coding efficiency. [Contact us](https://www.faros.ai/contact-us) to see how Faros can help your organization optimize AI coding costs and engineering workflows.

{{cta}}

## Frequently asked questions about harness engineering

### What is harness engineering for AI coding agents?

**‍**Harness engineering is the practice of building the surrounding software infrastructure—the harness—that allows a raw AI model to function as a reliable, autonomous agent. It involves designing tool orchestration, verification loops, memory, and safety guardrails so the AI can execute multi-step software tasks and self-correct errors in production.

### What is the difference between an AI model and an AI agent?

**‍**The industry formula is: **Agent = Model + Harness**. The AI model provides the raw reasoning and intelligence. The agent is the complete system where that model is wrapped in a harness, giving it the ability to read files, run terminal commands, verify tests, and execute autonomous workflows.

### Can open-source AI models perform as well as frontier models for coding?

**‍**Yes, when paired with a highly optimized harness. Faros's internal testing across 211 real-world engineering tasks demonstrated that open-weight models (like GLM-5.2) equipped with a robust harness consistently matched or outperformed expensive proprietary frontier models, making them a highly capable and cost-effective option.

### How does harness engineering differ from prompt engineering and context engineering?

**‍**Prompt engineering focuses on how we talk to the model (optimizing syntax). Context engineering focuses on what the model knows (feeding it relevant codebase information). Harness engineering focuses on autonomy and control, dictating how the model is allowed to act, use tools, and verify its own work.

### Why do engineering teams need to build custom AI harnesses?

**‍**While prebuilt tools like Claude Code provide a general-purpose harness for basic execution, enterprise teams require custom scaffolding to enforce internal rules. Custom harnesses ensure the agent adheres to proprietary compliance linters, specific security boundaries, and internal audit logging that generic harnesses do not cover.

### How do guardrails work in an AI coding harness?

**‍**Guardrails act as hardcoded safety limits that prevent the AI from executing destructive or non-compliant actions. Examples include blocking agents from modifying database migration files without human sign-off, sandboxing execution environments, and enforcing strict token budget ceilings.

### What metrics should engineering leaders track to measure AI agent success?

**‍**To baseline agent reliability, engineering leaders should start by tracking cost per merged PR, time-to-merge for agent-assisted PRs, review velocity relative to PR size, and compute spend per developer. As the harness matures, tracking the success rate of autonomous tasks becomes critical.

### How does a strong harness reduce the cost of AI-augmented software development?

**‍**A well-engineered harness saves money in two ways. First, its verification loops "fail fast," catching mistakes early so the model doesn't waste tokens compounding errors. Second, a reliable harness enables teams to confidently route tasks to cheaper open-weight models rather than relying exclusively on premium frontier models.













<img src="https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/695be6d603b11be779b0bf41_b3580d3c5d053c32915177774c49f4ff4f3d15af-2405x2405.avif" class="author_image" sizes="100vw" srcset="https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/695be6d603b11be779b0bf41_b3580d3c5d053c32915177774c49f4ff4f3d15af-2405x2405.avif 500w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/695be6d603b11be779b0bf41_b3580d3c5d053c32915177774c49f4ff4f3d15af-2405x2405.avif 800w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/695be6d603b11be779b0bf41_b3580d3c5d053c32915177774c49f4ff4f3d15af-2405x2405.avif 1080w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/695be6d603b11be779b0bf41_b3580d3c5d053c32915177774c49f4ff4f3d15af-2405x2405.avif 1600w, https://cdn.prod.website-files.com/695be6d603b11be779b0b9b2/695be6d603b11be779b0bf41_b3580d3c5d053c32915177774c49f4ff4f3d15af-2405x2405.avif 2405w" alt="Neely Dunlap" />





