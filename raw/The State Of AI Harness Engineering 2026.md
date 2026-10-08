---
title: "The State Of AI Harness Engineering 2026"
source: "https://marmelab.com/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html"
author: "marmelab"
published: 2026-09-24
created: 2026-10-09
description:
tags:
  - "clippings"
---

# The State Of AI Harness Engineering 2026





- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#a-few-words-of-caution" class="no-underline hover:underline">A Few Words Of Caution</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#harness-engineering-in-numbers" class="no-underline hover:underline">Harness Engineering In Numbers</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#test--eval-your-harness" class="no-underline hover:underline">Test / Eval Your Harness</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#reduce-the-harness-to-the-strict-minimum" class="no-underline hover:underline">Reduce The Harness To The Strict Minimum</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#double-or-replace-rules-with-scripts" class="no-underline hover:underline">Double Or Replace Rules With Scripts</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#let-the-agent-run-the-app" class="no-underline hover:underline">Let The Agent Run The App</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#measure-how-the-harness-is-actually-used" class="no-underline hover:underline">Measure How The Harness Is Actually Used</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#dont-let-the-harness-rot" class="no-underline hover:underline">Don’t Let the Harness Rot</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#what-doesnt-work" class="no-underline hover:underline">What Doesn’t Work</a>
- <a href="/blog/2026/09/24/the-state-of-ai-harness-engineering-2026.html#conclusion" class="no-underline hover:underline">Conclusion</a>











<img src="/_astro/francois.CHSMwzIw_2sl3Pl.webp" class="h-9 w-9 rounded-full" loading="lazy" decoding="async" width="181" height="180" alt="François Zaninotto" />







By <a href="/blog/authors/francois" class="text-orange-700 hover:underline">François Zaninotto</a>





September 24, 2026 • 28 min read





<a href="/blog/tags/ai" class="no-wrap inline-block text-sm border-gray-200 text-gray-600 hover:border-gray-400">#ai</a>











<style type="text/css">
  .post .small-table table {
    font-size: 0.7rem;
  }
  .post .small-table th,
  .post .small-table td {
    padding: 0.2rem;
    vertical-align: top;
  }
</style>

There is a lot of talk about harness engineering (building the tools, context, memory, and control loops to make an agent reliable) but what are people actually doing, and how is that working out for them?

One number summarizes the importance of this question. Someone ran the same model through [8 different harnesses on the same 25 tasks](https://composio.dev/content/best-ai-agent-harnesses), with the same provider and the same tools. Success rate went from 68% to 88%. As we’ll see, it’s about the only thing anyone has properly measured.

We’ve audited 246 repositories and read 57 publications to find out. We’ve limited the research to harnesses used for software development and coding agents, as it’s what we know the best. This post summarizes our findings about the main tendencies, best practices and actionable learnings of this young discipline.

Our sources

We’ve selected open-source repositories that describe themselves as harnesses, as well as large and popular repositories that contain a harness. This boils down to 246 open-source repositories. We’ve cloned each of them to get its real first commit date, its last activity, and the number of files it versions under `.claude/`.



| Repository | Kind | ★ | Language | Created | Activity | Commits | Harness |
|----|----|----|----|----|----|----|----|
| [obra/superpowers](https://github.com/obra/superpowers) | Collection | 288k | JavaScript | 2025-10-09 (11 mo) | 1 mo | 681 | — |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | Collection | 260k | JavaScript | 2026-01-17 (8 mo) | active | 2.7k | 13 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Collection | 246k | Python | 2025-07-22 (1.2 yr) | active | 36k | — |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | Standalone agent | 208k | TypeScript | 2025-03-21 (1.5 yr) | active | 16k | — |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Standalone agent | 187k | Python | 2023-03-16 (3.5 yr) | active | 9.0k | 67 |
| [langgenius/dify](https://github.com/langgenius/dify) | Standalone agent | 156k | TypeScript | 2023-05-15 (3.3 yr) | active | 13k | 6 |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | Standalone agent | 142k | TypeScript | 2025-02-22 (1.6 yr) | active | 850 | 3 |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | Collection | 141k | JavaScript | 2026-06-12 (3 mo) | active | 224 | 1 |
| [github/spec-kit](https://github.com/github/spec-kit) | Orchestrator | 137k | Python | 2025-08-21 (1.1 yr) | active | 2.0k | — |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Building block | 133k | Rust | 2025-08-04 (1.1 yr) | active | 2.4k | — |
| [openai/codex](https://github.com/openai/codex) | Standalone agent | 119k | Rust | 2025-04-16 (1.4 yr) | active | 11k | — |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Building block | 119k | Python | 2026-04-03 (5 mo) | active | 1.8k | — |
| [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | Collection | 116k | Markdown | 2026-03-31 (6 mo) | 2 mo | 61 | — |
| [earendil-works/pi](https://github.com/earendil-works/pi) | Standalone agent | 106k | TypeScript | 2025-08-09 (1.1 yr) | active | 6.4k | — |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Building block | 106k | Go | 2026-04-04 (5 mo) | active | 686 | — |
| [nexu-io/open-design](https://github.com/nexu-io/open-design) | Building block | 97k | TypeScript | 2026-04-28 (5 mo) | active | 3.6k | 23 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Collection | 96k | JavaScript | 2026-02-15 (7 mo) | active | 512 | 10 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | Building block | 94k | TypeScript | 2025-09-06 (1.0 yr) | active | 2.7k | 5 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Standalone agent | 91k | Go | 2023-12-12 (2.8 yr) | active | 9.4k | — |
| [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | Standalone agent | 88k | TypeScript | 2024-03-13 (2.5 yr) | active | 8.3k | — |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Collection | 88k | JavaScript | 2026-02-19 (7 mo) | active | 157 | — |
| [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | Building block | 83k | TypeScript | 2026-03-14 (6 mo) | active | 846 | — |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Standalone agent | 83k | Python | 2025-04-07 (1.4 yr) | active | 3.3k | 18 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Building block | 83k | Python | 2026-02-24 (7 mo) | active | 376 | — |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Building block | 81k | Rust | 2026-01-22 (8 mo) | active | 2.0k | 44 |
| [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | Standalone agent | 77k | Python | 2026-02-21 (7 mo) | active | 233 | — |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | Collection | 75k | Python | 2025-10-17 (11 mo) | 2 mo | 77 | — |
| [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) | Collection | 75k | Jupyter | 2024-11-28 (1.8 yr) | active | 2.0k | — |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | Orchestrator | 73k | TypeScript | 2025-06-02 (1.3 yr) | active | 7.5k | 371 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Building block | 73k | Python | 2026-01-06 (8 mo) | active | 2.8k | 1 |
| [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph) | Building block | 71k | C | 2026-01-18 (8 mo) | active | 1.0k | 4 |
| [stablyai/orca](https://github.com/stablyai/orca) | Orchestrator | 71k | TypeScript | 2026-03-16 (6 mo) | active | 11k | — |
| [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) | Standalone agent | 70k | Python | 2023-06-30 (3.2 yr) | dormant | 6.4k | — |
| [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) | Building block | 69k | TypeScript | 2025-12-03 (9 mo) | active | 17k | 4 |
| [cline/cline](https://github.com/cline/cline) | Standalone agent | 68k | TypeScript | 2024-07-05 (2.2 yr) | active | 7.3k | 10 |
| [openinterpreter/openinterpreter](https://github.com/openinterpreter/openinterpreter) | Standalone agent | 68k | Rust | 2025-04-16 (1.4 yr) | active | 11k | — |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | Collection | 67k | JavaScript | 2025-05-03 (1.4 yr) | active | 778 | — |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | Building block | 67k | TypeScript | 2026-02-18 (7 mo) | active | 8.7k | — |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | Standalone agent | 66k | JavaScript | 2023-06-03 (3.3 yr) | active | 2.4k | — |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | Collection | 66k | HTML | 2025-10-31 (11 mo) | active | 2.2k | 113 |
| [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) | Orchestrator | 65k | JavaScript | 2025-12-14 (9 mo) | 4 mo | 2.9k | — |
| [microsoft/autogen](https://github.com/microsoft/autogen) | Standalone agent | 61k | Python | 2020-12-04 (5.8 yr) | 5 mo | 3.8k | — |
| [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Standalone agent | 56k | TypeScript | 2023-04-06 (3.4 yr) | 1 mo | 3.6k | — |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Collection | 54k | Python | 2025-04-19 (1.4 yr) | active | 1.8k | — |
| [block/goose](https://github.com/block/goose) | Standalone agent | 54k | Rust | 2024-08-23 (2.1 yr) | active | 5.7k | — |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | Orchestrator | 53k | Python | 2025-04-13 (1.4 yr) | active | 2.2k | — |
| [router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) | Building block | 52k | Go | 2025-07-02 (1.2 yr) | active | 3.9k | — |
| [Aider-AI/aider](https://github.com/Aider-AI/aider) | Standalone agent | 49k | Python | 2023-04-03 (3.5 yr) | 4 mo | 13k | — |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Standalone agent | 48k | Python | 2026-02-01 (7 mo) | active | 4.4k | 3 |
| [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) | Collection | 48k | Python | 2025-09-09 (1.0 yr) | active | 1.8k | — |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | Standalone agent | 47k | Python | 2022-08-10 (4.1 yr) | active | 2.8k | — |
| [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) | Building block | 44k | C | 2026-02-25 (7 mo) | active | 3.0k | — |
| [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) | Standalone agent | 41k | Rust | 2026-01-20 (8 mo) | active | 9.8k | — |
| [tinyhumansai/openhuman](https://github.com/tinyhumansai/openhuman) | Standalone agent | 40k | Rust | 2026-01-27 (8 mo) | active | 21k | 16 |
| [wshobson/agents](https://github.com/wshobson/agents) | Collection | 40k | Python | 2025-07-24 (1.1 yr) | active | 576 | 3 |
| [herdrdev/herdr](https://github.com/herdrdev/herdr) | Standalone agent | 39k | Rust | 2026-03-23 (6 mo) | active | 1.7k | — |
| [continuedev/continue](https://github.com/continuedev/continue) | Standalone agent | 36k | TypeScript | 2023-05-23 (3.3 yr) | 2 mo | 22k | 1 |
| [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | Standalone agent | 36k | Go | 2026-05-29 (4 mo) | active | 7.1k | — |
| [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | Collection | 35k | Markdown | 2025-10-28 (11 mo) | active | 649 | — |
| [iOfficeAI/AionUi](https://github.com/iOfficeAI/AionUi) | Standalone agent | 33k | TypeScript | 2025-08-07 (1.1 yr) | active | 6.0k | 8 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Standalone agent | 33k | Go | 2026-05-18 (4 mo) | active | 711 | 2 |
| [agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope) | Standalone agent | 32k | Python | 2025-08-15 (1.1 yr) | active | 597 | — |
| [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | Standalone agent | 30k | Python | 2025-03-11 (1.5 yr) | active | 2.3k | — |
| [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) | Building block | 29k | TypeScript | 2026-02-25 (7 mo) | active | 482 | — |
| [google-labs-code/design.md](https://github.com/google-labs-code/design.md) | Collection | 28k | TypeScript | 2026-04-10 (5 mo) | 2 mo | 62 | — |
| [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | Standalone agent | 28k | TypeScript | 2025-04-15 (1.4 yr) | active | 9.8k | — |
| [openai/symphony](https://github.com/openai/symphony) | Orchestrator | 27k | Elixir | 2026-03-04 (6 mo) | active | 47 | — |
| [Fosowl/agenticSeek](https://github.com/Fosowl/agenticSeek) | Standalone agent | 27k | Python | 2025-02-19 (1.6 yr) | active | 992 | — |
| [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | Orchestrator | 27k | Shell | 2026-01-03 (8 mo) | active | 426 | 36 |
| [xai-org/grok-build](https://github.com/xai-org/grok-build) | Standalone agent | 27k | Rust | 2026-07-16 (2 mo) | active | 45 | — |
| [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | Standalone agent | 27k | Python | 2019-11-14 (6.8 yr) | active | 6.3k | — |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | Collection | 25k | Shell | 2025-07-30 (1.1 yr) | active | 517 | 1 |
| [letta-ai/letta](https://github.com/letta-ai/letta) | Standalone agent | 25k | Python | 2023-10-11 (2.9 yr) | active | 7.5k | — |
| [agentsmd/agents.md](https://github.com/agentsmd/agents.md) | Collection | 24k | TypeScript | 2025-08-19 (1.1 yr) | active | 38 | — |
| [browserbase/stagehand](https://github.com/browserbase/stagehand) | Standalone agent | 24k | TypeScript | 2024-03-20 (2.5 yr) | active | 1.5k | — |
| [RooCodeInc/Roo-Code](https://github.com/RooCodeInc/Roo-Code) | Standalone agent | 24k | TypeScript | 2024-07-05 (2.2 yr) | 4 mo | 7.1k | — |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | Building block | 23k | TypeScript | 2026-02-23 (7 mo) | active | 2.2k | 10 |
| [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) | Standalone agent | 21k | TypeScript | 2025-08-09 (1.1 yr) | active | 4.8k | 1 |
| [jnMetaCode/agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh) | Orchestrator | 21k | Shell | 2026-03-06 (6 mo) | active | 273 | — |
| [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | Standalone agent | 20k | Python | 2024-06-14 (2.3 yr) | active | 3.0k | 9 |
| [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) | Standalone agent | 20k | TypeScript | 2025-03-21 (1.5 yr) | active | 31k | — |
| [1jehuang/jcode](https://github.com/1jehuang/jcode) | Standalone agent | 20k | Rust | 2026-01-05 (8 mo) | active | 7.5k | 1 |
| [emcie-co/parlant](https://github.com/emcie-co/parlant) | Standalone agent | 18k | Python | 2024-02-15 (2.6 yr) | 3 mo | 5.5k | — |
| [microsoft/SkillOpt](https://github.com/microsoft/SkillOpt) | Collection | 17k | Python | 2026-05-21 (4 mo) | active | 531 | — |
| [cft0808/edict](https://github.com/cft0808/edict) | Orchestrator | 17k | Python | 2026-02-23 (7 mo) | 4 mo | 149 | — |
| [HKUDS/DeepCode](https://github.com/HKUDS/DeepCode) | Orchestrator | 17k | Python | 2025-07-20 (1.2 yr) | active | 513 | — |
| [HKUDS/OpenHarness](https://github.com/HKUDS/OpenHarness) | Orchestrator | 16k | Python | 2026-04-01 (6 mo) | 3 mo | 429 | 5 |
| [wasp-lang/open-saas](https://github.com/wasp-lang/open-saas) | Product-embedded | 16k | MDX | 2023-03-29 (3.5 yr) | 1 mo | 637 | — |
| [walkinglabs/learn-harness-engineering](https://github.com/walkinglabs/learn-harness-engineering) | Orchestrator | 15k | TypeScript | 2026-03-30 (6 mo) | active | 252 | — |
| [yc-software/qm](https://github.com/yc-software/qm) | Orchestrator | 15k | TypeScript | 2026-07-29 (2 mo) | active | 498 | 5 |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | Collection | 15k | Markdown | 2025-10-16 (11 mo) | 5 mo | 42 | — |
| [mindfold-ai/Trellis](https://github.com/mindfold-ai/Trellis) | Building block | 15k | TypeScript | 2026-01-26 (8 mo) | active | 1.4k | 96 |
| [NanmiCoder/cc-haha](https://github.com/NanmiCoder/cc-haha) | Building block | 15k | TypeScript | 2026-03-31 (6 mo) | active | 2.0k | — |
| [lsdefine/GenericAgent](https://github.com/lsdefine/GenericAgent) | Standalone agent | 14k | Python | 2026-01-16 (8 mo) | active | 1.4k | — |
| [The-Pocket/PocketFlow](https://github.com/The-Pocket/PocketFlow) | Standalone agent | 11k | Python | 2024-12-24 (1.7 yr) | 2 mo | 641 | 20 |
| [omnigent-ai/omnigent](https://github.com/omnigent-ai/omnigent) | Orchestrator | 10k | Python | 2026-06-13 (3 mo) | active | 3.8k | 11 |
| [diet103/claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) | Product-embedded | 10k | TypeScript | 2025-10-29 (11 mo) | 2 mo | 14 | 88 |
| [MervinPraison/PraisonAI](https://github.com/MervinPraison/PraisonAI) | Standalone agent | 9.1k | Python | 2024-03-19 (2.5 yr) | active | 9.4k | — |
| [revfactory/harness](https://github.com/revfactory/harness) | Orchestrator | 9.0k | Markdown | 2026-03-27 (6 mo) | 3 mo | 45 | — |
| [iflytek/astron-agent](https://github.com/iflytek/astron-agent) | Standalone agent | 9.0k | Java | 2025-09-22 (12 mo) | active | 3.2k | — |
| [automazeio/ccpm](https://github.com/automazeio/ccpm) | Orchestrator | 8.4k | Shell | 2025-08-19 (1.1 yr) | dormant | 87 | — |
| [YaoApp/yao](https://github.com/YaoApp/yao) | Standalone agent | 8.0k | Go | 2021-09-06 (5.0 yr) | active | 4.3k | — |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | Building block | 7.9k | Rust | 2025-10-16 (11 mo) | active | 5.1k | 6 |
| [SWE-agent/mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent) | Standalone agent | 7.7k | Python | 2025-06-28 (1.2 yr) | active | 1.0k | — |
| [mnfst/llm-gateway](https://github.com/mnfst/llm-gateway) | Standalone agent | 7.5k | TypeScript | 2022-09-27 (4.0 yr) | active | 6.2k | 2 |
| [Gentleman-Programming/gentle-ai](https://github.com/Gentleman-Programming/gentle-ai) | Orchestrator | 6.9k | Go | 2026-02-28 (7 mo) | active | 3.5k | 1 |
| [builderz-labs/mission-control](https://github.com/builderz-labs/mission-control) | Orchestrator | 6.2k | TypeScript | 2026-02-23 (7 mo) | active | 536 | — |
| [dontriskit/awesome-ai-system-prompts](https://github.com/dontriskit/awesome-ai-system-prompts) | Collection | 6.2k | TypeScript | 2025-03-05 (1.5 yr) | dormant | 67 | — |
| [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase) | Product-embedded | 6.1k | JavaScript | 2026-01-06 (8 mo) | dormant | 4 | 22 |
| [FlorianBruniaux/claude-code-ultimate-guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide) | Collection | 6.0k | Python | 2026-01-09 (8 mo) | active | 1.0k | 48 |
| [ModelEngine-Group/nexent](https://github.com/ModelEngine-Group/nexent) | Standalone agent | 5.9k | Python | 2025-04-28 (1.4 yr) | active | 5.8k | 30 |
| [SWE-bench/SWE-bench](https://github.com/SWE-bench/SWE-bench) | Lab / bench | 5.9k | Python | 2023-10-10 (2.9 yr) | active | 746 | — |
| [the-open-agent/openagent](https://github.com/the-open-agent/openagent) | Standalone agent | 5.6k | Go | 2022-03-31 (4.5 yr) | active | 2.4k | — |
| [kodu-ai/claude-coder](https://github.com/kodu-ai/claude-coder) | Standalone agent | 5.2k | TypeScript | 2024-07-05 (2.2 yr) | dormant | 1.0k | — |
| [entireio/cli](https://github.com/entireio/cli) | Building block | 5.1k | Go | 2026-01-03 (8 mo) | active | 8.8k | 37 |
| [campfirein/byterover-cli](https://github.com/campfirein/byterover-cli) | Building block | 5.0k | TypeScript | 2025-10-07 (11 mo) | 3 mo | 3.1k | 1 |
| [darrenhinde/OpenAgentsControl](https://github.com/darrenhinde/OpenAgentsControl) | Orchestrator | 4.9k | TypeScript | 2025-08-14 (1.1 yr) | 2 mo | 224 | — |
| [Kodezi/Chronos](https://github.com/Kodezi/Chronos) | Standalone agent | 4.9k | Java | 2025-07-26 (1.1 yr) | dormant | 5 | — |
| [Agenta-AI/agenta](https://github.com/Agenta-AI/agenta) | Standalone agent | 4.8k | TypeScript | 2023-04-27 (3.4 yr) | active | 28k | 25 |
| [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | Orchestrator | 4.4k | Markdown | 2025-07-26 (1.1 yr) | dormant | 43 | — |
| [gptme/gptme](https://github.com/gptme/gptme) | Standalone agent | 4.4k | Python | 2023-03-24 (3.5 yr) | active | 4.5k | — |
| [ai-boost/awesome-harness-engineering](https://github.com/ai-boost/awesome-harness-engineering) | Collection | 4.3k | Markdown | 2026-03-29 (6 mo) | active | 259 | — |
| [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community) | Collection | 4.2k | Python | 2026-03-20 (6 mo) | active | 2.3k | — |
| [parcadei/Continuous-Claude-v3](https://github.com/parcadei/Continuous-Claude-v3) | Orchestrator | 3.9k | Python | 2026-01-10 (8 mo) | dormant | 117 | 718 |
| [matt1398/claude-devtools](https://github.com/matt1398/claude-devtools) | Building block | 3.9k | TypeScript | 2026-02-11 (7 mo) | 4 mo | 349 | 11 |
| [gadievron/raptor](https://github.com/gadievron/raptor) | Collection | 3.8k | Python | 2025-11-21 (10 mo) | active | 7.4k | 151 |
| [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd) | Orchestrator | 3.7k | TypeScript | 2025-07-17 (1.2 yr) | 5 mo | 429 | — |
| [gemini-cli-extensions/conductor](https://github.com/gemini-cli-extensions/conductor) | Orchestrator | 3.7k | Python | 2025-12-17 (9 mo) | active | 133 | — |
| [smallcloudai/refact](https://github.com/smallcloudai/refact) | Standalone agent | 3.5k | Rust | 2022-07-24 (4.2 yr) | 4 mo | 11k | — |
| [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude) | Collection | 3.5k | Python | 2025-07-25 (1.1 yr) | active | 566 | — |
| [foryourhealth111-pixel/Vibe-Skills](https://github.com/foryourhealth111-pixel/Vibe-Skills) | Collection | 3.3k | Python | 2026-02-22 (7 mo) | active | 1.4k | — |
| [AutoCodeRoverSG/auto-code-rover](https://github.com/AutoCodeRoverSG/auto-code-rover) | Standalone agent | 3.1k | Python | 2024-04-09 (2.4 yr) | dormant | 219 | — |
| [jsynowiec/node-typescript-boilerplate](https://github.com/jsynowiec/node-typescript-boilerplate) | Product-embedded | 3.0k | TypeScript | 2016-08-20 (10.1 yr) | 3 mo | 347 | — |
| [WorldFlowAI/everything-claude-code](https://github.com/WorldFlowAI/everything-claude-code) | Collection | 3.0k | JavaScript | 2026-01-17 (8 mo) | dormant | 27 | 1 |
| [wesammustafa/Claude-Code-Everything-You-Need-to-Know](https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know) | Collection | 3.0k | Python | 2025-08-17 (1.1 yr) | 2 mo | 68 | 24 |
| [microsoft/skills](https://github.com/microsoft/skills) | Collection | 3.0k | TypeScript | 2026-01-16 (8 mo) | active | 750 | 1 |
| [rohitg00/pro-workflow](https://github.com/rohitg00/pro-workflow) | Orchestrator | 2.9k | JavaScript | 2026-02-01 (7 mo) | 2 mo | 86 | — |
| [intellectronica/ruler](https://github.com/intellectronica/ruler) | Building block | 2.9k | TypeScript | 2025-05-20 (1.3 yr) | active | 1.1k | — |
| [ciembor/agent-rules-books](https://github.com/ciembor/agent-rules-books) | Collection | 2.8k | Markdown | 2026-04-16 (5 mo) | active | 62 | — |
| [lopopolo/harness-engineering](https://github.com/lopopolo/harness-engineering) | Product-embedded | 2.7k | Markdown | 2026-07-18 (2 mo) | 2 mo | 2 | — |
| [zubair-trabzada/ai-marketing-claude](https://github.com/zubair-trabzada/ai-marketing-claude) | Collection | 2.7k | Python | 2026-03-01 (7 mo) | dormant | 1 | — |
| [centminmod/my-claude-code-setup](https://github.com/centminmod/my-claude-code-setup) | Product-embedded | 2.6k | Markdown | 2025-07-08 (1.2 yr) | active | 301 | 111 |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | Collection | 2.6k | JavaScript | 2026-02-04 (7 mo) | 4 mo | 700 | — |
| [humanlayer/advanced-context-engineering-for-coding-agents](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents) | Lab / bench | 2.6k | Markdown | 2025-08-29 (1.1 yr) | 1 mo | 45 | — |
| [AgentsMesh/AgentsMesh](https://github.com/AgentsMesh/AgentsMesh) | Standalone agent | 2.4k | Go | 2026-01-08 (8 mo) | 1 mo | 1.1k | 18 |
| [supabitapp/supacode](https://github.com/supabitapp/supacode) | Building block | 2.4k | Swift | 2026-01-20 (8 mo) | active | 2.0k | — |
| [0xSteph/pentest-ai-agents](https://github.com/0xSteph/pentest-ai-agents) | Collection | 2.2k | Shell | 2026-03-28 (6 mo) | 1 mo | 56 | — |
| [iannuttall/claude-agents](https://github.com/iannuttall/claude-agents) | Collection | 2.0k | Markdown | 2025-07-25 (1.1 yr) | dormant | 1 | — |
| [standardagents/dmux](https://github.com/standardagents/dmux) | Building block | 1.8k | HTML | 2025-08-19 (1.1 yr) | 1 mo | 747 | 2 |
| [kunchenguid/treehouse](https://github.com/kunchenguid/treehouse) | Building block | 1.7k | Go | 2026-03-14 (6 mo) | active | 110 | 1 |
| [google/mantis](https://github.com/google/mantis) | Building block | 1.6k | Python | 2026-06-15 (3 mo) | active | 72 | — |
| [openedclaude/claude-reviews-claude](https://github.com/openedclaude/claude-reviews-claude) | Building block | 1.6k | TypeScript | 2026-03-31 (6 mo) | 6 mo | 42 | — |
| [Paritok-official/paritok-4b-v1](https://github.com/Paritok-official/paritok-4b-v1) | Standalone agent | 1.5k | Python | 2026-07-15 (2 mo) | active | 147 | — |
| [CloudAI-X/claude-workflow-v2](https://github.com/CloudAI-X/claude-workflow-v2) | Orchestrator | 1.4k | Python | 2026-01-01 (9 mo) | 4 mo | 32 | — |
| [yohey-w/multi-agent-shogun](https://github.com/yohey-w/multi-agent-shogun) | Orchestrator | 1.4k | Shell | 2026-01-25 (8 mo) | 1 mo | 372 | 2 |
| [openai/SWELancer-Benchmark](https://github.com/openai/SWELancer-Benchmark) | Lab / bench | 1.4k | Python | 2025-02-18 (1.6 yr) | dormant | 55 | — |
| [first-fluke/oh-my-agent](https://github.com/first-fluke/oh-my-agent) | Orchestrator | 1.3k | TypeScript | 2026-01-27 (8 mo) | active | 3.6k | — |
| [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace) | Collection | 1.3k | Markdown | 2025-10-09 (11 mo) | active | 127 | 1 |
| [coollabsio/jean](https://github.com/coollabsio/jean) | Building block | 1.3k | TypeScript | 2026-01-23 (8 mo) | active | 1.7k | 8 |
| [Shopify/roast](https://github.com/Shopify/roast) | Orchestrator | 1.2k | Ruby | 2025-04-22 (1.4 yr) | 1 mo | 889 | 2 |
| [Gentleman-Programming/agent-teams-lite](https://github.com/Gentleman-Programming/agent-teams-lite) | Orchestrator | 1.2k | Shell | 2026-02-16 (7 mo) | 6 mo | 73 | — |
| [hoangnb24/repository-harness](https://github.com/hoangnb24/repository-harness) | Product-embedded | 1.2k | Rust | 2026-05-05 (4 mo) | 1 mo | 312 | — |
| [OpenHands/software-agent-sdk](https://github.com/OpenHands/software-agent-sdk) | Standalone agent | 1.1k | Python | 2025-08-23 (1.1 yr) | active | 2.4k | — |
| [fivetaku/gptaku_plugins](https://github.com/fivetaku/gptaku_plugins) | Collection | 1.1k | Python | 2026-03-02 (7 mo) | active | 307 | — |
| [numman-ali/n-skills](https://github.com/numman-ali/n-skills) | Collection | 1.0k | TypeScript | 2026-01-02 (8 mo) | active | 46 | — |
| [zhu1090093659/spec_driven_develop](https://github.com/zhu1090093659/spec_driven_develop) | Orchestrator | 978 | Shell | 2026-03-21 (6 mo) | 2 mo | 70 | — |
| [data-goblin/power-bi-agentic-development](https://github.com/data-goblin/power-bi-agentic-development) | Collection | 918 | C# | 2026-01-13 (8 mo) | 1 mo | 455 | — |
| [milisp/codexia](https://github.com/milisp/codexia) | Building block | 918 | TypeScript | 2025-08-13 (1.1 yr) | active | 1.6k | — |
| [michaelshimeles/skills](https://github.com/michaelshimeles/skills) | Product-embedded | 903 | Python | 2026-07-13 (2 mo) | active | 33 | — |
| [china-qijizhifeng/agentic-harness-engineering](https://github.com/china-qijizhifeng/agentic-harness-engineering) | Orchestrator | 892 | Python | 2026-04-26 (5 mo) | 2 mo | 47 | — |
| [augmentcode/augment-swebench-agent](https://github.com/augmentcode/augment-swebench-agent) | Standalone agent | 884 | Python | 2025-03-28 (1.5 yr) | dormant | 12 | — |
| [microsoft/power-platform-skills](https://github.com/microsoft/power-platform-skills) | Collection | 878 | JavaScript | 2026-01-21 (8 mo) | active | 249 | 1 |
| [sangrokjung/claude-forge](https://github.com/sangrokjung/claude-forge) | Orchestrator | 837 | Shell | 2026-02-23 (7 mo) | active | 134 | — |
| [marckohlbrugge/37signals-skills](https://github.com/marckohlbrugge/37signals-skills) | Collection | 715 | Markdown | 2025-12-17 (9 mo) | 3 mo | 35 | — |
| [gmickel/flow-next](https://github.com/gmickel/flow-next) | Orchestrator | 699 | Python | 2025-12-26 (9 mo) | active | 1.9k | — |
| [shotgun-sh/shotgun](https://github.com/shotgun-sh/shotgun) | Orchestrator | 684 | Python | 2025-09-10 (1.0 yr) | 5 mo | 488 | 3 |
| [ThibautBaissac/rails_ai_agents](https://github.com/ThibautBaissac/rails_ai_agents) | Orchestrator | 663 | Shell | 2025-12-09 (9 mo) | 4 mo | 90 | 148 |
| [QuantaAlpha/RepoMaster](https://github.com/QuantaAlpha/RepoMaster) | Standalone agent | 553 | Python | 2025-08-28 (1.1 yr) | dormant | 24 | — |
| [scaleapi/SWE-bench_Pro-os](https://github.com/scaleapi/SWE-bench_Pro-os) | Lab / bench | 526 | Python | 2025-09-05 (1.0 yr) | 4 mo | 75 | — |
| [multi-swe-bench/multi-swe-bench](https://github.com/multi-swe-bench/multi-swe-bench) | Lab / bench | 362 | Python | 2025-04-01 (1.5 yr) | dormant | 312 | — |
| [CronusL-1141/AI-company](https://github.com/CronusL-1141/AI-company) | Orchestrator | 361 | Python | 2026-03-12 (6 mo) | active | 728 | — |
| [kaanozhan/Frame](https://github.com/kaanozhan/Frame) | Orchestrator | 355 | JavaScript | 2026-01-21 (8 mo) | active | 755 | 2 |
| [athola/claude-night-market](https://github.com/athola/claude-night-market) | Orchestrator | 337 | Python | 2025-11-23 (10 mo) | active | 1.6k | 39 |
| [fstandhartinger/ralph-wiggum](https://github.com/fstandhartinger/ralph-wiggum) | Orchestrator | 296 | Shell | 2026-01-14 (8 mo) | 4 mo | 46 | 3 |
| [huangjia2019/agent-design-patterns](https://github.com/huangjia2019/agent-design-patterns) | Collection | 264 | HTML | 2026-05-18 (4 mo) | active | 113 | — |
| [QuantaAlpha/GitTaskBench](https://github.com/QuantaAlpha/GitTaskBench) | Lab / bench | 258 | Python | 2025-05-15 (1.3 yr) | dormant | 84 | — |
| [NeuZhou/awesome-ai-anatomy](https://github.com/NeuZhou/awesome-ai-anatomy) | Collection | 240 | D2 | 2026-04-04 (5 mo) | 5 mo | 212 | — |
| [RUCAIBox/awesome-agent-harness](https://github.com/RUCAIBox/awesome-agent-harness) | Collection | 198 | Markdown | 2026-03-15 (6 mo) | 4 mo | 44 | — |
| [sudokar/openspec-plus](https://github.com/sudokar/openspec-plus) | Orchestrator | 196 | Markdown | 2026-06-22 (3 mo) | active | 17 | — |
| [mattgierhart/PRD-driven-context-engineering](https://github.com/mattgierhart/PRD-driven-context-engineering) | Product-embedded | 182 | HTML | 2025-07-09 (1.2 yr) | 2 mo | 219 | 209 |
| [nwiizo/ccswarm](https://github.com/nwiizo/ccswarm) | Orchestrator | 152 | Rust | 2025-09-21 (12 mo) | active | 156 | 37 |
| [AnastasiyaW/codex-claude-code-config](https://github.com/AnastasiyaW/codex-claude-code-config) | Product-embedded | 150 | Python | 2026-03-31 (6 mo) | active | 367 | 3 |
| [aaddrick/claude-pipeline](https://github.com/aaddrick/claude-pipeline) | Orchestrator | 128 | Markdown | 2026-02-06 (7 mo) | dormant | 5 | 122 |
| [closedloop-ai/claude-plugins](https://github.com/closedloop-ai/claude-plugins) | Orchestrator | 103 | Python | 2026-03-04 (6 mo) | active | 519 | 15 |
| [GarrickZ2/grove](https://github.com/GarrickZ2/grove) | Orchestrator | 47 | TypeScript | 2026-01-13 (8 mo) | active | 835 | — |
| [TaylorHuston/ai-toolkit](https://github.com/TaylorHuston/ai-toolkit) | Orchestrator | 13 | Markdown | 2025-08-21 (1.1 yr) | 2 mo | 283 | — |
| [cisco-open/ai-harness-toolkit](https://github.com/cisco-open/ai-harness-toolkit) | Orchestrator | 12 | Python | 2026-04-30 (5 mo) | active | 4 | — |
| [tylerburleigh/claude-sdd-toolkit](https://github.com/tylerburleigh/claude-sdd-toolkit) | Orchestrator | 9 | Python | 2025-10-24 (11 mo) | dormant | 125 | — |
| [nesquikm/dev-process-toolkit](https://github.com/nesquikm/dev-process-toolkit) | Orchestrator | 7 | TypeScript | 2026-03-19 (6 mo) | active | 965 | 5 |
| [QuasarByte/codex-feature-driven-flow](https://github.com/QuasarByte/codex-feature-driven-flow) | Orchestrator | 7 | PowerShell | 2026-02-21 (7 mo) | dormant | 7 | — |
| [moruno21/agents-concerto](https://github.com/moruno21/agents-concerto) | Orchestrator | 2 | Markdown | 2026-07-23 (2 mo) | 2 mo | 31 | 1 |
| [microsoft/TaskWeaver](https://github.com/microsoft/TaskWeaver) | Orchestrator | — | Python | 2023-09-11 (3.0 yr) | 6 mo | 657 | — |
| [ScaleML/AgentSPEX](https://github.com/ScaleML/AgentSPEX) | Orchestrator | — | Python | 2026-04-19 (5 mo) | 3 mo | 6 | — |
| [statewright/statewright](https://github.com/statewright/statewright) | Orchestrator | — | TypeScript | 2026-05-03 (5 mo) | active | 443 | 1 |
| [cobusgreyling/loop-engineering](https://github.com/cobusgreyling/loop-engineering) | Orchestrator | — | Markdown | 2026-06-09 (3 mo) | active | 514 | — |
| [Tianshi-Xu/Life-Harness](https://github.com/Tianshi-Xu/Life-Harness) | Orchestrator | — | Python | 2026-05-21 (4 mo) | active | 24 | — |
| [reshashi/claude-orchestrator](https://github.com/reshashi/claude-orchestrator) | Orchestrator | — | Markdown | 2026-01-11 (8 mo) | dormant | 52 | — |
| [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) | Orchestrator | — | TeX | 2026-02-06 (7 mo) | active | 252 | 159 |
| [marmelab/atomic-crm](https://github.com/marmelab/atomic-crm) **←** | Product-embedded | — | TypeScript | 2024-02-07 (2.6 yr) | active | 1.7k | 146 |
| [codejunkie99/agentic-stack](https://github.com/codejunkie99/agentic-stack) | Product-embedded | — | Markdown | 2026-04-15 (5 mo) | active | 189 | — |
| [aattaran/deepclaude](https://github.com/aattaran/deepclaude) | Standalone agent | — | TypeScript | 2026-05-03 (5 mo) | 4 mo | 15 | — |
| [ithiria894/awesome-claude-code-workflows](https://github.com/ithiria894/awesome-claude-code-workflows) | Collection | — | Markdown | 2026-03-23 (6 mo) | 6 mo | 12 | — |
| [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | Collection | — | TypeScript | 2026-01-14 (8 mo) | active | 2.8k | — |
| [mgechev/skillgrade](https://github.com/mgechev/skillgrade) | Collection | — | TypeScript | 2026-02-26 (7 mo) | active | 75 | — |
| [QwenLM/Qwen-MM-Plugins](https://github.com/QwenLM/Qwen-MM-Plugins) | Collection | — | Python | 2026-08-03 (1 mo) | active | 209 | — |
| [rpamis/comet](https://github.com/rpamis/comet) | Collection | — | Java | 2026-05-14 (4 mo) | active | 356 | 15 |
| [upstash/context7](https://github.com/upstash/context7) | Building block | — | TypeScript | 2025-03-29 (1.5 yr) | active | 976 | — |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Building block | — | Python | 2023-06-20 (3.2 yr) | active | 2.6k | — |
| [getzep/zep](https://github.com/getzep/zep) | Building block | — | Go | 2023-04-29 (3.4 yr) | active | 396 | 1 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | Building block | — | Python | 2023-08-16 (3.1 yr) | active | 10k | 7 |
| [Gentleman-Programming/engram](https://github.com/Gentleman-Programming/engram) | Building block | — | Go | 2026-02-16 (7 mo) | active | 845 | — |
| [Infisical/agent-vault](https://github.com/Infisical/agent-vault) | Building block | — | Go | 2026-03-27 (6 mo) | active | 328 | 3 |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | Building block | — | TypeScript | 2024-11-19 (1.8 yr) | active | 4.2k | — |
| [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | Building block | — | TypeScript | 2025-03-21 (1.5 yr) | active | 582 | 1 |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | Building block | — | TypeScript | 2025-09-11 (1.0 yr) | active | 1.2k | — |
| [ComposioHQ/composio](https://github.com/ComposioHQ/composio) | Building block | — | Python | 2025-04-11 (1.4 yr) | active | 5.3k | 4 |
| [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) | Building block | — | Python | 2024-12-17 (1.7 yr) | dormant | 767 | — |
| [agentgateway/agentgateway](https://github.com/agentgateway/agentgateway) | Building block | — | Rust | 2025-03-18 (1.5 yr) | active | 2.7k | — |
| [microsoft/LLMLingua](https://github.com/microsoft/LLMLingua) | Building block | — | Python | 2023-07-07 (3.2 yr) | active | 87 | — |
| [dottxt-ai/outlines](https://github.com/dottxt-ai/outlines) | Building block | — | Python | 2023-03-17 (3.5 yr) | 1 mo | 1.3k | — |
| [volcengine/OpenViking](https://github.com/volcengine/OpenViking) | Building block | — | Python | 2026-01-29 (8 mo) | active | 2.4k | — |
| [langchain-ai/openwiki](https://github.com/langchain-ai/openwiki) | Building block | — | TypeScript | 2026-06-22 (3 mo) | active | 405 | 1 |
| [MinishLab/semble](https://github.com/MinishLab/semble) | Building block | — | Python | 2026-04-06 (5 mo) | active | 144 | — |
| [dirac-run/dirac](https://github.com/dirac-run/dirac) | Building block | — | Rust | 2026-04-09 (5 mo) | active | 954 | — |
| [Mibayy/token-savior](https://github.com/Mibayy/token-savior) | Building block | — | TypeScript | 2026-03-25 (6 mo) | 1 mo | 535 | — |
| [strukto-ai/mirage](https://github.com/strukto-ai/mirage) | Building block | — | Go | 2026-05-06 (4 mo) | active | 2.7k | — |
| [NanoNets/Graft](https://github.com/NanoNets/Graft) | Building block | — | Python | 2026-07-03 (2 mo) | active | 480 | 5 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | Building block | — | Python | 2026-03-08 (6 mo) | active | 885 | — |
| [vercel-labs/zerolang](https://github.com/vercel-labs/zerolang) | Building block | — | TypeScript | 2026-05-15 (4 mo) | active | 1.2k | — |
| [onesuper/tui-use](https://github.com/onesuper/tui-use) | Building block | — | Python | 2026-04-06 (5 mo) | 5 mo | 113 | 13 |
| [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) | Building block | — | TypeScript | 2025-06-14 (1.3 yr) | active | 2.1k | — |
| [Justin0504/Aegis](https://github.com/Justin0504/Aegis) | Building block | — | Python | 2026-03-03 (7 mo) | active | 401 | — |
| [manuelschipper/nah](https://github.com/manuelschipper/nah) | Building block | — | TypeScript | 2026-08-01 (2 mo) | active | 449 | — |
| [facebookresearch/cca-swebench](https://github.com/facebookresearch/cca-swebench) | Lab / bench | — | Python | 2025-12-26 (9 mo) | 4 mo | 2 | — |
| [VILA-Lab/Dive-into-Claude-Code](https://github.com/VILA-Lab/Dive-into-Claude-Code) | Lab / bench | — | Markdown | 2026-04-11 (5 mo) | active | 80 | — |
| [aws/agent-toolkit-for-aws](https://github.com/aws/agent-toolkit-for-aws) | Lab / bench | — | Python | 2026-04-23 (5 mo) | active | 240 | — |



Repositories that call themselves harnesses are a biased sample, so we’ve run a counter-test: 145 large open-source projects that have nothing to do with AI (Symfony, Rails, Django, React, Kubernetes, Rust, Spring, Odoo, the competing CRMs), cloned and inspected the same way. 26% of them have a non-empty `.claude/` directory (38).

Open source has adopted the documentation, but doesn’t constrain agents yet. And 54 of the 145 have nothing at all: `symfony`, `laravel`, `vuejs/core`, `golang/go`, `ruby/ruby`, `spring-boot`, `flask`, `fastapi`, `tailwindcss`, `express`, `nestjs`, `tokio`, `redis`, `postgres`, `curl`, `terraform`, `odoo`.

Then we looked for the harnesses that check themselves. 97 repositories remained, taking everything from the initial set of 246 repositories or from the 145 counter-test that ships at least 3 harness files, plus the well-known harnesses distributed as plugins.

We then eliminated the ones that don’t test their harness, the ones with less than 0.5 commit per harness file, the ones with a single author, and the ones whose harness lived less than 60 days or has been dormant for 90. The iteration filter matters more than it sounds: `parcadei/Continuous-Claude-v3` ships 718 harness files, the most of the whole inventory, and fails three criteria at once (0.09 commit per file, built in 16 days, nothing since). A ranking on volume would have put it first.

We ended up with 11 repositories:



| Repository | files | tests | % of code tested | evals | exec. hooks | deny | CI | iteration | authors | life |
|----|----|----|----|----|----|----|----|----|----|----|
| [gmickel/flow-next](https://github.com/gmickel/flow-next) | 1020 | 306 | 76 % | — | — | — | 2 | 1.08 | 11 | 262 d |
| [gadievron/raptor](https://github.com/gadievron/raptor) | 156 | 27 | 47 % | — | 2 | — | 2 | 2.98 | 14 | 298 d |
| [statewright/statewright](https://github.com/statewright/statewright) | 216 | 77 | 38 % | — | — | — | 5 | 1.4 | 3 | 136 d |
| [marmelab/atomic-crm](https://github.com/marmelab/atomic-crm) **←** | 148 | 33 | 36 % | — | 77 | yes | — | 0.88 | 6 | 259 d |
| [AnastasiyaW/codex-claude-code-config](https://github.com/AnastasiyaW/codex-claude-code-config) | 482 | 42 | 26 % | 29 | 92 | — | 1 | 0.53 | 5 | 161 d |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | 262 | 17 | 18 % | — | — | — | — | 0.59 | 5 | 466 d |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | 72 | 2 | 15 % | — | 12 | — | 2 | 1.96 | 37 | 229 d |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 774 | 19 | 12 % | 1 | — | — | 4 | 1.06 | 212 | 238 d |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | 1049 | 30 | 8 % | 22 | — | yes | 21 | 2.72 | 13 | 463 d |
| [ClickHouse/ClickHouse](https://github.com/ClickHouse/ClickHouse) | 90 | 1 | 3 % | 1 | 2 | — | — | 5.79 | 33 | 384 d |
| [closedloop-ai/claude-plugins](https://github.com/closedloop-ai/claude-plugins) | 534 | 8 | 2 % | 2 | — | — | 1 | 0.78 | 11 | 194 d |



“Iteration” is commits on the harness divided by harness files, ”% of code tested” relates test files to the harness’s executable files. The file counts here are a few units off the table above because this pass also counts harness files kept outside of `.claude/`, which matters for anything shipped as a plugin.

As for the articles, we’ve found 57 publications dealing with the matter.

Among them, 8 founding texts:

- [Harness engineering: leveraging Codex in an agent-first world — OpenAI](https://openai.com/index/harness-engineering/) — Ryan Lopopolo, February 11, 2026. The text that named the discipline, and the densest first-party account in this corpus: five months, ~1M lines, **0 lines of manually-written code**, ~1,500 merged PRs, 3.5 per engineer per day. Its author also appears in the inventory as `lopopolo/harness-engineering`.
- [Harness engineering for coding agent users — Birgitta Böckeler](https://martinfowler.com/articles/harness-engineering.html) — April 2, 2026, Thoughtworks/Fowler. The reference mental model: *Agent = Model + Harness*.
- [Effective harnesses for long-running agents — Anthropic](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) — Sustaining progress across several context windows.
- [Harness design for long-running application development — Anthropic](https://www.anthropic.com/engineering/harness-design-long-running-apps) — The three-agent Planner / Generator / Evaluator harness.
- [The anatomy of an agent harness — LangChain](https://blog.langchain.com/the-anatomy-of-an-agent-harness/) — A breakdown into five primitives.
- [The anatomy of harness engineering — Google](https://developers.googleblog.com/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/) — Evaluate, iterate, guard. Behavioural evals and tool-call tests.
- [Harness engineering — Red Hat](https://developers.redhat.com/articles/2026/04/07/harness-engineering-structured-workflows-ai-assisted-development) — The enterprise perspective: structured workflows and context.
- [Harness engineering — deepset](https://www.deepset.ai/blog/harness-engineering) — A taxonomy of failures (context, constraint, verification, planning) mapped onto harness components.

9 field reports from products:

- [Introducing Roast — Shopify Engineering](https://shopify.engineering/introducing-roast) — Breaking a complex prompt into discrete steps: the Augmented Engineering team’s thesis.
- [Advanced context engineering for coding agents — HumanLayer](https://www.humanlayer.dev/blog/advanced-context-engineering) — ACE-FCA. 300 kLOC of Rust, a week of work in a day, quality validated in expert review.
- [Skill issue: harness engineering for coding agents — HumanLayer](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents) — Subagents as the primary lever on enterprise brownfield codebases.
- [How Stripe ships 1 300 AI PRs a week](https://www.mindstudio.ai/blog/what-is-harness-engineering-beyond-prompt-context-engineering) — Stripe’s “Minions”: ~1,300 PRs/week, ~70% merged with no human rework.
- [Ranking Engineer Agent — Meta Engineering](https://engineering.fb.com/2026/03/17/developer-tools/ranking-engineer-agent-rea-autonomous-ai-system-accelerating-meta-ads-ranking-innovation/) — A production harness automating multi-day ML pipelines.
- [Context engineering — Azure SRE Agent, Microsoft](https://techcommunity.microsoft.com/blog/appsonazureblog/context-engineering-lessons-from-building-azure-sre-agent/4481200/) — The shift to filesystem-carried context.
- [The coding harness behind GitHub Copilot in VS Code](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode) — The loop and the eval suite, seen from the inside.
- [You can’t whisper at an AI agent — Stripe](https://stripe.dev/blog/ai-steering-experiments) — May 2026: passive documentation is ignored by agents. You need mechanisms, not instructions.
- [Building a C compiler with a team of parallel Claudes — Anthropic](https://www.anthropic.com/engineering/building-c-compiler) — The limit case of parallel orchestration.

12 articles about methods & patterns:

- [Agent harness engineering — Addy Osmani](https://addyosmani.com/blog/agent-harness-engineering/) — Separating generation and evaluation into distinct agents beats self-evaluation.
- [Make agents prove the work is done — Cheesecake Labs](https://cheesecakelabs.com/blog/harness-engineering/) — An evaluator that sees only the spec, the design, the tests and the diff.
- [Multi-agent workflows often fail — GitHub](https://github.blog/ai-and-ml/generative-ai/multi-agent-workflows-often-fail-heres-how-to-engineer-ones-that-dont/) — February 2026. The failure patterns, and typed schemas as the answer.
- [Choosing the right multi-agent architecture — LangChain](https://blog.langchain.com/choosing-the-right-multi-agent-architecture/) — Four patterns, with performance data.
- [Organizing context in a multi-agent harness — LangChain](https://www.langchain.com/blog/organizing-context-in-a-multi-agent-harness) — Context modes for subagents: isolate or fork.
- [Effective context engineering for AI agents — Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) — Context as a finite resource to be managed.
- [Beyond permission prompts — Anthropic](https://www.anthropic.com/engineering/claude-code-sandboxing) — Structured permission systems rather than natural-language trust.
- [Writing effective tools for agents — Anthropic](https://www.anthropic.com/engineering/writing-effective-tools-for-agents) — Naming, schemas, error messages: reliability runs through the tool interface.
- [Demystifying evals for AI agents — Anthropic](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) — How to measure a harness.
- [How middleware lets you customize your agent harness — LangChain](https://blog.langchain.com/how-middleware-lets-you-customize-your-agent-harness/) — Composable hooks at every step of the loop.
- [Build your own AI coding agent harness — Vercel Academy](https://vercel.com/academy/build-ai-agent-harness) — Vercel removed 80% of its agent’s tools and got better results.
- [Harness engineering and agent feedback — Thoughtworks](https://www.thoughtworks.com/en-de/insights/blog/generative-ai/harness-engineering-agent-feedback-exploring-ai-coding-sensors) — “Sensors”: what the harness gives the agent so it can correct itself.

8 articles about the loop and its variants:

- [Inventing the Ralph Wiggum loop — Geoffrey Huntley](https://devinterrupted.substack.com/p/inventing-the-ralph-wiggum-loop-creator) — Loop the agent until an oracle that cannot lie (test, linter, type checker) passes. Huntley calls it *back pressure engineering*.
- [The Ralph Wiggum loop — codecentric](https://www.codecentric.de/en/knowledge-hub/blog/the-ralph-wiggum-loop-autonomous-code-generation-with-a-fresh-context) — The “fresh context” variant of the loop.
- [Unrolling the Codex agent loop — OpenAI](https://openai.com/index/unrolling-the-codex-agent-loop/) — The canonical observe / plan / act / verify decomposition.
- [Unlocking the Codex harness: building the app server — OpenAI](https://openai.com/index/unlocking-the-codex-harness/) — The Item / Turn / Thread protocol.
- [Introducing dynamic workflows in Claude Code — Anthropic](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) — Orchestrating parallel subagents with verification.
- [Agent harness design: 3 patterns — Anthropic](https://claude.com/blog/harnessing-claudes-intelligence) — The architectural trade-offs, from the vendor’s side.
- [Hidden technical debt of AI systems: agent harness](https://leehanchung.github.io/blogs/2026/05/08/hidden-technical-debt-agent-harness/) — The harness as debt: what you accumulate by letting it grow.
- [Building a coding agent from scratch: harness architecture](https://www.decodingai.com/p/building-a-coding-agent-from-scratch-system-design) — Loop, context, memory, skills, sandbox, runtime, evals, observability.

12 research articles:

- [Architectural design decisions in AI agent harnesses](https://arxiv.org/abs/2604.18071) — April 2026: an empirical study of 70 systems across five architectural dimensions.
- [What makes a harness a harness](https://arxiv.org/abs/2606.10106) — June 2026: necessary and sufficient conditions, inclusion criteria.
- [The design space of today’s and future AI agent systems](https://arxiv.org/abs/2604.14228) — Reverse-engineering Claude Code: five-stage compaction.
- [Agent READMEs: an empirical study of context files](https://arxiv.org/abs/2511.12884) — 2,303 context files across 1,925 repositories. Tests 75.9%, architecture 68.1%, security 14.8%.
- [Evaluating AGENTS.md: are repository-level context files helpful for coding agents?](https://arxiv.org/abs/2602.11988) — ETH Zurich, February 2026. Across 138 real-world Python tasks: machine-generated context files lower the success rate compared to giving the agent nothing, for 20%+ more inference cost; human-written ones gain about 4%. Either way the agent burns 14 to 22% more reasoning tokens.
- [When “do not” is not deny: security rules in CLAUDE.md vs built-in controls](https://arxiv.org/abs/2608.23550) — Across 481 public CLAUDE.md files, **only 4.4%** of security rules are backed by a real control.
- [Do user-authored permission policies improve protection against AI agent overreach?](https://arxiv.org/abs/2608.27443) — 113 participants supervising the same 18-action simulated day, 7 of them overreach. Writing the rules up front blocked **20.1 points less** than approving action by action.
- [Agyn: a multi-agent system for team-based autonomous software engineering](https://arxiv.org/abs/2602.01465) — Coordinating teams of heterogeneous agents. 72.2% of SWE-bench 500 with four roles, against 71.8% for the best single-agent baseline.
- [AutoHarness — Google DeepMind](https://arxiv.org/abs/2603.03329) — Automatic generation of runtime constraint harnesses.
- [Natural-language agent harnesses](https://arxiv.org/abs/2603.25723) — Externalising control logic into portable natural-language artifacts.
- [Code as agent harness](https://arxiv.org/abs/2605.18747) — May 2026: code as the infrastructure of agent systems.
- [Agent systems with harness engineering — RUCAIBox](https://github.com/RUCAIBox/awesome-agent-harness) — The reference survey: a three-layer taxonomy, 502 references.

8 surveys & lists:

- [awesome-harness-engineering](https://github.com/ai-boost/awesome-harness-engineering) — 4,300 ★. 12 sections, 200+ entries. The front door to the field.
- [A comparison of AI agent harnesses in 2026 — Winder](https://winder.ai/ai-agent-harness-comparison/) — A cross-platform comparison.
- [8 best AI agent harnesses in 2026 — Composio](https://composio.dev/content/best-ai-agent-harnesses) — 25 real tasks, measuring success rate, speed, tokens, cost.
- [Best open source CLI coding agents in 2026 — Pinggy](https://pinggy.io/blog/best_open_source_cli_coding_agents/) — The star ranking, updated August 2026.
- [awesome-ai-anatomy](https://github.com/NeuZhou/awesome-ai-anatomy) — Source-code teardowns of 15 agents, Claude Code included.
- [2025 was agents. 2026 is agent harnesses.](https://aakashgupta.medium.com/2025-was-agents-2026-is-agent-harnesses-heres-why-that-changes-everything-073e9877655e) — A six-minute market synthesis: the model is commodity, the harness is the moat. Entirely second-hand — Manus, LangChain, Vercel — with no measurement of its own. Listed for completeness.
- [SE Radio 730 — Birgitta Boeckeler](https://se-radio.net/2026/07/se-radio-730-birgitta-boeckeler-on-harness-engineering-for-ai-agents/) — July 2026, long form.
- [Building a harness: how we standardized agentic coding in a real codebase](https://dev.to/tacoda/building-a-harness-how-we-standardized-agentic-coding-in-a-real-codebase-4oab) — The only account found of a harness embedded in a Laravel + React monorepo: from scattered CLAUDE.md files to a structured `.claude/`.

\

**Disclaimer**: We write AI harnesses ourselves, for our customer and open-source projects. Most notably, we’re the author of [Atomic CRM](https://marmelab.com/atomic-crm/), an open-source CRM with a sophisticated harness that lets non-developers modify the software through a supervised agent pipeline. This is the reason why we’ve made this study: we wanted to compare our harness engineering practices with the best ones in the field. Atomic CRM is one of the 11 finalists above, so read that for what it is.

## [A Few Words Of Caution](#a-few-words-of-caution)

**Harness Engineering Is A New Field**: The term “Harness Engineering” appeared in [a February 2026 article by OpenAI](https://openai.com/index/harness-engineering/). This ignited an exploration in many different directions, and it’s safe to say that the only consensus is about *what* Harness Engineering is (Agent = Model + Harness, a formula we owe to [Birgitta Böckeler](https://martinfowler.com/articles/harness-engineering.html)). As for the *how* to reliably build an AI harness, this is still an open subject. The median repository in our inventory is 8.7 months old, so nobody has a structural lead.

So if you don’t already have your own AI harness, don’t panic! Most teams don’t have one either: out of 145 large open-source projects, only 4 declare a subagent.

**Harness Engineering Is A Moving Target**: An AI harness constrains, guides, and elevates an AI model. As these models evolve, the shape of harnesses evolves, too. What used to be a good harness in early 2026 is no longer relevant for the last generation of frontier models. Anthropic [published the cleanest example of this](https://claude.com/blog/harnessing-claudes-intelligence): *“We added resets to clear the context window in order to address this ‘context anxiety.’ With Opus 4.5, the behavior was gone. The context resets we built to compensate had become dead weight in the agent harness.”* Their own conclusion is the general rule: a harness encodes assumptions about what the model can’t do on its own, and those assumptions rot as the model improves.

So any definition of a good harness (such as this article) is doomed to age poorly. If your harness doesn’t follow the practices below, no problem! You may be right and the sources we selected may be wrong. But we’d love to hear from you, as we’re trying to understand what works and what doesn’t.

**We Used AI To Explore the Sources**: We used AI to gather, rank, and aggregate trends from the numerous sources we’ve identified. Without AI, this work would have taken weeks.

## [Harness Engineering In Numbers](#harness-engineering-in-numbers)

**A fast-growing field**

- **73,400** GitHub repositories carry the `claude-code` topic, and **21,500** “agent harness” repositories were created in 2026 alone.
- The median harness repository is **8.7 months** old. 83% were created in 2025 or 2026.

**Everybody writes instructions, almost nobody enforces them**

- **63%** of the 145 large open-source projects (Rails, React, Kubernetes, Django…) ship an agent instruction file. Only **4** declare a subagent, and there are **14** hooks in total across all 145.
- **57%** of the root instruction files we read are longer than 100 lines (the size OpenAI settled on for theirs). The median is 123 lines.
- Only **12** of the 391 repositories commit a single `deny` rule in their Claude Code settings. **22** declare a `PreToolUse` hook, the kind that can veto an action before it runs.
- In the median repository that uses subagents, only **1 in 4** subagents has a restricted list of tools. The others see everything.

**AGENTS.md is winning**

- **189** repositories have an `AGENTS.md` at the root, **155** a `CLAUDE.md`. In the large open-source projects, 36 of the 53 `CLAUDE.md` files are just a symlink or a short redirect to `AGENTS.md`.
- **46%** of the repositories write instructions for at least two different agents (Claude Code, Codex, Copilot, Cursor, Gemini…).

**Few harnesses check themselves**

- Out of the 97 harnesses big enough to test, **60%** have neither a test nor an eval. 21% test themselves, 27% version evals, and only 7 do both.

**The agent writes its own harness**

- **25%** of the commits that touched a harness since January 2025 are explicitly signed by an AI. That’s a floor: many tools and people strip the signature. In 52 of 79 repositories, the harness is more AI-written than the code it governs (median 16% against 9%).

Now, on to the key learnings.

## [Test / Eval Your Harness](#test--eval-your-harness)

Just like code, a harness may contain bugs - or overly verbose or ambiguous instructions that don’t work all the time. Instructions in an `AGENTS.md` may never be followed. To make sure the harness works, it must be tested.

This is a rare practice: 60% of the harnesses we looked at have neither a test nor an eval. They’re markdown instructions, and nobody knows whether they hold.

Tests and evals are two different jobs, and an AI harness needs both.

**A test tells you a script still works.** A rule or a hook (a script that inspects what the agent is about to do and refuses it) may fail. A test is a reproducible way to prove it works. It uses code rather than an LLM. A good example is [hooks tests in Atomic CRM](https://github.com/marmelab/atomic-crm/tree/main/.claude/hooks/test).

Tests may fail in two ways: letting through what it should stop, or stopping what it should allow. So each rule should be tested twice, once to make sure it fires when required, and once to make sure it doesn’t fire when it shouldn’t. If your tests only contain things that must be blocked, tightening the guard is always safe and loosening it is invisible, so the harness slowly drifts towards blocking everything and strangling the agent. Anthropic [puts it in one line](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents): *“Test both the cases where a behavior should occur and where it shouldn’t. One-sided evals create one-sided optimization.”*

The clearest example in the corpus is [codex-claude-code-config](https://github.com/AnastasiyaW/codex-claude-code-config/blob/main/evals/hooks/cases.json), which files 63 cases against 12 guards: 29 that must be blocked, 19 that must be allowed, and 15 that check the exact text a router emits. `rm -rf /tmp/scratch-dir` is allowed but `rm -rf /` is blocked. A [runner](https://github.com/AnastasiyaW/codex-claude-code-config/blob/main/evals/hooks/run_hook_evals.py) replays every case against the real script.

A check can also pass because its trigger never fired, or because it quietly read something from your own machine (a personal settings file, an override variable, a warm cache). [flow-next](https://github.com/gmickel/flow-next) planted a file its tests shouldn’t have been able to see, and the harness *“reported the global owner block”*. The leak was real, which is why they changed how settings are loaded.

Automated harness tests also detect regressions.

**An eval tells you the harness helps.** Freeze a set of tasks, run them end to end, score the outcome. For a coding agent, this can be a series of bug fixes (faulty code + bug report) that an agent without harness fails to fix properly. Pick 20 to 50 tasks from failures you saw, each starting from a clean state with a known good answer. Keep the model fixed, change one part of the harness at a time, then remove each part in turn to see which ones were pulling their weight.

Out of the 26 repositories containing evaluation cases, only one ([flow-next](https://github.com/gmickel/flow-next)) publishes a before/after comparison with a replication and an owned null result. If you can’t prove a rule improves the agent’s behaviour, you can’t prove the agent needs it.

## [Reduce The Harness To The Strict Minimum](#reduce-the-harness-to-the-strict-minimum)

It’s tempting to download skills from popular repositories, or specialized subagents for security research. But out of the box, the last generation of coding agents is already very capable. So a harness should be built in reaction to an agent failure, not based on an assumption that the agent can’t do something properly.

That’s why the best source for harness instructions are past sessions. If you had to correct the agent, it may be because it didn’t have enough guidance or control, so this deserves an addition in the harness. [flow-next](https://github.com/gmickel/flow-next/tree/main/.flow/memory) does this in the open: 98 bug write-ups committed under `.flow/memory/bug/`, each carrying a `root_cause` field and a `Prevention` paragraph naming the rule that should have caught it.

That’s also why we think a harness should be built by a human, instead of an agent. If an agent needs supervision, how can it decide the supervision it needs? This is our opinion rather than a finding: the only ablation study we found ([NLAH, arXiv 2603.25723](https://arxiv.org/abs/2603.25723)) measures the opposite, with a self-improving harness gaining 4.8 and 2.7 points on two benchmarks.

Change one thing at a time, then check that the harness is actually better after the change (that’s what the eval is for). The risk is to add too many useless rules, that would increase the cost and the latency, and make the agent response less relevant due to context rot. And instructions are not free. ETH Zurich [tested context files across 138 real-world tasks](https://arxiv.org/abs/2602.11988): machine-generated ones reduce task success compared to giving the agent no context at all, while increasing inference cost by over 20%. Human-written ones helped by about 4%. Either way, the agent spends 14 to 22% more reasoning tokens to get there.

Keep agent rules small and don’t put too many of them in your harness. OpenAI [tried the single big instruction file](https://openai.com/index/harness-engineering/) and named four ways it failed: it crowds out the actual task, *“when everything is ‘important,’ nothing is”*, *“it rots instantly… a graveyard of stale rules”*, and *“a single blob doesn’t lend itself to mechanical checks.”* They replaced it with roughly 100 lines. The main AGENTS.md should act as a table of contents of the rule tree.

The same goes for tools. How many tools and skills the agent can see is a performance setting, and one of the very few changes in this survey that moves success rate, token cost and latency in the same direction. [Vercel](https://vercel.com/academy/build-ai-agent-harness) *“stripped 80% of the tools out of an agent and watched its success rate go from 80% to 100% on the same model, with tokens more than halved and latency down from 724 seconds to 141.”* Microsoft [passed 100 tools in two weeks](https://techcommunity.microsoft.com/blog/appsonazureblog/context-engineering-lessons-from-building-azure-sre-agent/4481200/) on its Azure operations agent and had to collapse them into two broad ones. Treat the direction as solid and the magnitude as unverified - Vercel’s page marks that figure as second-hand and nobody reproduces it. It’s also why no repository showed us this practice: restraint leaves no trace in git.

## [Double Or Replace Rules With Scripts](#double-or-replace-rules-with-scripts)

Agents may or may not follow the instructions written in an `AGENTS.md`, Skill or Rule files. This is especially true if a harness contains many of them, as the agent will start each session with a large context full of (sometimes contradicting) rules.

Across 481 public `CLAUDE.md` files, researchers checked how many written security rules had a real effect ([arXiv 2608.23550](https://arxiv.org/abs/2608.23550)). The results oscillate between 4% and 16%, which means the corresponding harness is as good as blind. Rules written in prose are almost never actually enforced.

The most effective harnesses enforce their rules via executable guards (e.g., git hooks, linter rules, static code analysis, custom scripts). These checks execute in the computer running the harness AND in the CI, as not every developer uses the same harness. Some developers manage to integrate these checks in the agentic loop (usually using Hooks), in which case they can limit the instructions to the minimum.

The gap is not cosmetic. codex-claude-code-config’s [`destructive-command-guard.py`](https://github.com/AnastasiyaW/codex-claude-code-config/blob/main/hooks/destructive-command-guard.py) refuses `rm --recursive --force /`, `rm / --recursive --force` and `rm -rf /; echo done` using regular expressions. An LLM looking for a text description of this pattern cannot catch them all.

And to avoid hallucinations, make the agent cite something a script can check. Have deterministic code produce the raw facts first (the files and functions, the lines the change touched), with no judgement attached, let the agent reason over that, then have a script match every claim back against it. Scripts measure and never judge; the agent judges and never measures.

## [Let The Agent Run The App](#let-the-agent-run-the-app)

Agents produce code faster than humans can review it, so the bottleneck is no longer the production of code but its verification. You can delegate part of this verification to the agent by letting it start its own instances of the app, open it in a real browser, click through the interface and act like a real user would do. Let the agent read the logs to locate bugs and regressions.

OpenAI [made their app startable per working copy](https://openai.com/index/harness-engineering/), wired browser control into the agent’s runtime, and gave each working copy a throwaway logging and metrics stack the agent can query. The agent reproduces the bug, records the failure, fixes it, then drives the app again to demonstrate the fix. It also turns instructions into actual checks: *“ensure service startup completes in under 800ms”*, or *“no span in these four critical user journeys exceeds two seconds”*. The same article describes a smart trick: write your custom checks so that the error message contains the fix. *“Because the lints are custom, we write the error messages to inject remediation instructions into agent context.”*

Once the agent has successfully tested a feature or a bug fix, it should convert the test to a reproducible script that doesn’t need an LLM to run - a smoke test. This reduces token costs and verification time.

The faster a test harness starts, the shorter the agent feedback loop is. So make sure your test app starts in less than a second, mock unstable external dependencies. Also, if you ever want to have more than one agent work on the codebase, modify it so that it can exist in several different instances (with varying port and database schema, or better, different containers).

## [Measure How The Harness Is Actually Used](#measure-how-the-harness-is-actually-used)

Evals tell you whether a change helps on a set of tasks you picked. They don’t tell you what happens in real sessions: which skills actually fire, how often a hook blocks something, how many iterations a session needs depending on the tools it gets. For that, you need observability: measure what actually happens when the harness runs, like any other piece of software.

The VS Code team runs offline benchmarks before shipping a change, then [keeps measuring once it’s live](https://code.visualstudio.com/blogs/2026/05/15/agent-harnesses-github-copilot-vscode), with A/B tests, aggregate usage signals and weekly reporting. Anthropic’s [guide to evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) says the same: production monitoring catches the drift that evals miss, and they don’t trust an eval score until someone has read some of the transcripts behind it.

It doesn’t take much. Claude Code can [log to any OpenTelemetry backend](https://code.claude.com/docs/en/agent-sdk/observability). n8n adds [a hook that fires after every skill call](https://github.com/n8n-io/n8n/blob/master/.claude/plugins/n8n/scripts/track-skill-usage.mjs) and sends a “Claude Code skill activated” event to its own telemetry server. [claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase/blob/main/.claude/hooks/lib/metrics.ts) writes every skill suggestion, activation and block to a local `metrics.jsonl` file, with a script to report on it (except for benchmark sessions, to avoid polluting the numbers).

Yet it’s currently a rare practice: only 5 of the 391 repositories record anything about how their harness is used. The [Atomic CRM Builder](https://marmelab.com/atomic-crm/doc/developers/agent-harness/#crm-builder-a-visual-ready-made-environment) logs every step of every session, and lets the user parse these logs to understand skill and tool usage.

## [Don’t Let the Harness Rot](#dont-let-the-harness-rot)

A codebase evolves quickly, especially when agents take care of it. Some architectural changes may invalidate a rule in the harness. Or you may upgrade to a more recent model that already does the right thing without the need for additional rules. As a consequence, even though a harness brings value at one moment, this value decreases over time.

Most controls exist to compensate for something the model used to get wrong. When it stops getting it wrong, the control is pure cost. So give every control an expiry condition, and write down the incident it exists for. One line per hook naming the failure behind it is the cheap version. We don’t do it: Atomic CRM ships 148 harness files and zero recorded decisions, so nothing says why any control exists, and none of them can be safely removed. flow-next does: 9 [decision records](https://github.com/gmickel/flow-next/tree/main/.flow/memory/knowledge/decisions), each dated and named after what it settled, plus a `declined/` folder for what the project deliberately chose not to build.

This means you should treat the harness like a garden: regularly scan for stale or obsolete documentation that does not reflect the real code behavior, remove old rules before planting new ones, and make sure the harness works fine after every major change. OpenAI [automates the first half](https://openai.com/index/harness-engineering/): *“a recurring ‘doc-gardening’ agent scans for stale or obsolete documentation that does not reflect the real code behavior and opens fix-up pull requests.”*

A good practice is to scan past sessions (JSONL files in Claude Code) for erratic behavior that should have been caught by the harness. Whenever such rot appears, it’s time to take care of the harness. This task can be (partially) delegated to a gardener agent.

## [What Doesn’t Work](#what-doesnt-work)

Another valuable thing we got out of the literature is the feedback of failed attempts.

**Adding a reviewer agent makes the code worse.** One paper ([NLAH, arXiv 2603.25723](https://arxiv.org/abs/2603.25723)) removed each harness component in turn and measured the difference. On a benchmark where the base agent solved 41% of tasks, adding a second reviewer agent lowered the success rate by 8%. An agent team isn’t necessarily better than a single agent either: [a four-role team](https://arxiv.org/abs/2602.01465) resolves 72.2% of SWE-bench 500 where the best single agent resolves 71.8%. This came as a surprise, as Atomic CRM does have a [reviewer role](https://github.com/marmelab/atomic-crm/blob/main/.claude/agents/quality-reviewer.md), and it does often improve the outcome.

**Past 4 agent-to-agent handovers, it stops working.** Microsoft grew its Azure operations agent team to more than 50 specialists. It wasn’t a good idea: [*“problems requiring more than four handoffs almost always failed.”*](https://techcommunity.microsoft.com/blog/appsonazureblog/context-engineering-lessons-from-building-azure-sre-agent/4481200/). They eventually rolled back to a few generalist agents. Atomic CRM [chains 7 roles](https://github.com/marmelab/atomic-crm/tree/main/.claude/agents).

**Writing permission rules in advance works worse than approving each action.** [A study with 113 participants](https://arxiv.org/abs/2608.27443) compared two ways of supervising an agent: writing the rules up front, or approving each action as it came. The rule writers blocked 20.1 percentage points fewer bad actions. They had set most of their rules to “ask me”, then approved the prompts anyway, as most people do ([93% of permission prompts get approved](https://www.anthropic.com/engineering/claude-code-sandboxing)). A rule that ends in a prompt isn’t a rule.

**When you ship a lot of code, waiting for every check to pass costs more than it saves.** Agents open far more pull requests than humans do, and the reflex is to add more checks before a merge. [OpenAI does the opposite](https://openai.com/index/harness-engineering/): few mandatory checks, short-lived PRs, and a re-run for a flaky test instead of a blocked merge. In their words, *“corrections are cheap, and waiting is expensive”*. A bad merge costs one extra PR to fix, while a blocked queue costs everyone, every time. But they warn that the same choice *“would be irresponsible in a low-throughput environment”*: the right answer depends on how much you ship. Atomic CRM still requires a human review for every PR.

**Looping works. Throwing away the context each time is unproven.** OpenAI runs the loop in production (they call it a [Ralph Wiggum Loop](https://devinterrupted.substack.com/p/inventing-the-ralph-wiggum-loop-creator)) at the scale of 1,500 merged PRs. The [fresh-context variant](https://www.codecentric.de/en/knowledge-hub/blog/the-ralph-wiggum-loop-autonomous-code-generation-with-a-fresh-context) rests on one uncontrolled run of a toy app, with no baseline. What actually helps isn’t the wipe, it’s that the work is written down in files.

## [Conclusion](#conclusion)

The best practices outlined in this article aren’t necessarily the ones we use in Atomic CRM. Working on this study helped us clarify the trade-offs we made, and traced the path to future improvements in our harness engineering approach.

Every strong measurement we quoted scores an autonomous coding agent on a public benchmark. A harness like Atomic CRM does something else: it governs a process (separate working copies, review gates, output contracts, merge discipline) on a task it doesn’t control. We think it’s the same mechanism in both cases: deterministic scaffolding around a probabilistic step. But it’s still an analogy, and only your own task set can turn it into a measurement. Which happens to be the first item on the list.

If your harness contradicts any of this, please tell us! That’s the part we can’t get from a repository. And the developer community very much needs well-sourced insights from real-world experiences to progress further in AI harness engineering.







## Authors







<img src="/_astro/francois.CHSMwzIw_2sl3Pl.webp" class="h-24 w-24 rounded-full" loading="lazy" decoding="async" width="181" height="180" alt="François Zaninotto" />





### <a href="/blog/authors/francois" class="hover:underline">François Zaninotto</a>



<a href="https://x.com/francoisz" class="hover:underline" aria-label="X profile of François Zaninotto"></a> <a href="https://github.com/fzaninotto" class="hover:underline" aria-label="GitHub profile of François Zaninotto"></a>





Marmelab founder and CEO, passionate about web technologies, agile, sustainability, leadership, and open-source. Lead developer of react-admin, founder of GreenFrame.io, and regular speaker at tech conferences.

















Ready to build something extraordinary?





Our team of talented full-stack developers is ready to tackle your next web or mobile project. Let's build it together!





<a href="mailto:contact@marmelab.com" class="_altButton_1k8r7_1 flex px-[1.75rem] py-[0.625rem] px-[1.5rem] py-[0.875rem]" data-magnetic="true">Contact us today!</a>










