---
title: "Natural-Language Agent Harnesses"
source: "https://arxiv.org/html/2603.25723v1"
author:
published: 2026-03
created: 2026-10-09
description:
tags:
  - "clippings"
---
##### Report GitHub Issue

×

Title:

Content selection saved. Describe the issue below:

Description:

Submit without GitHub

Submit in GitHub

arXiv is now an independent nonprofit! [Learn more](https://info.arxiv.org/about)

×

[arXiv logo Back to arXiv](/)

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html) [![[Natural-Language Agent Harnesses-9460bfd162f6dd2b64933716701d8b45644b7907.svg]] Report Issue](# "Report an Issue") [![[Natural-Language Agent Harnesses-f4ed920725e9b5296c72053a104d078507650738.svg]] Back to Abstract](/abs/2603.25723v1 "Back to abstract page") [![[Natural-Language Agent Harnesses-4bbb243fc6a5e4dd4d39aba2869aefc67b826b09.svg]] Download PDF](/pdf/2603.25723v1 "Download PDF") [![[Natural-Language Agent Harnesses-0dba01bd0011e6490f7c1a4e47e93ab96d726eeb.svg]]](javascript:toggleNavTOC(); "Toggle navigation") [![[Natural-Language Agent Harnesses-98a8199842c1940bd0868e386354f161924d800b.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")

![[Natural-Language Agent Harnesses-80caa2dcce69c296ad0598f894738eb7727e6bba.svg]] ![[Natural-Language Agent Harnesses-b2ea290a36a1f7fb9e144d575314ef3789ddadf3.svg]] ![[Natural-Language Agent Harnesses-1aaf13981d449dba7bb168c83f444fcbda5674e4.svg]]

1.  [Abstract](#abstract1 "In Natural-Language Agent Harnesses")
2.  [1 Introduction](#S1 "In Natural-Language Agent Harnesses")
    1.  [Problem.](#S1.SS0.SSS0.Px1 "In 1 Introduction ‣ Natural-Language Agent Harnesses")
    2.  [Motivation.](#S1.SS0.SSS0.Px2 "In 1 Introduction ‣ Natural-Language Agent Harnesses")
    3.  [Thesis and approach.](#S1.SS0.SSS0.Px3 "In 1 Introduction ‣ Natural-Language Agent Harnesses")
    4.  [Contributions.](#S1.SS0.SSS0.Px4 "In 1 Introduction ‣ Natural-Language Agent Harnesses")
3.  [2 Methodology](#S2 "In Natural-Language Agent Harnesses")
    1.  [2.1 Harnesses and the pattern layer](#S2.SS1 "In 2 Methodology ‣ Natural-Language Agent Harnesses")
    2.  [2.2 Intelligent Harness Runtime](#S2.SS2 "In 2 Methodology ‣ Natural-Language Agent Harnesses")
        1.  [From model calls to agent calls.](#S2.SS2.SSS0.Px1 "In 2.2 Intelligent Harness Runtime ‣ 2 Methodology ‣ Natural-Language Agent Harnesses")
    3.  [2.3 Natural-Language Agent Harnesses](#S2.SS3 "In 2 Methodology ‣ Natural-Language Agent Harnesses")
    4.  [2.4 File-backed state as an explicit module](#S2.SS4 "In 2 Methodology ‣ Natural-Language Agent Harnesses")
4.  [3 Experimental Design](#S3 "In Natural-Language Agent Harnesses")
    1.  [3.1 Research questions](#S3.SS1 "In 3 Experimental Design ‣ Natural-Language Agent Harnesses")
    2.  [3.2 Instantiation](#S3.SS2 "In 3 Experimental Design ‣ Natural-Language Agent Harnesses")
    3.  [3.3 Benchmarks and harness families](#S3.SS3 "In 3 Experimental Design ‣ Natural-Language Agent Harnesses")
        1.  [Coding.](#S3.SS3.SSS0.Px1 "In 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses")
        2.  [Computer use.](#S3.SS3.SSS0.Px2 "In 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses")
    4.  [3.4 Experimental setup](#S3.SS4 "In 3 Experimental Design ‣ Natural-Language Agent Harnesses")
5.  [4 Results](#S4 "In Natural-Language Agent Harnesses")
    1.  [4.1 RQ1: Behavioral effect](#S4.SS1 "In 4 Results ‣ Natural-Language Agent Harnesses")
    2.  [4.2 RQ2: Harness pattern ablations](#S4.SS2 "In 4 Results ‣ Natural-Language Agent Harnesses")
    3.  [4.3 RQ3: Code-to-text harness migration](#S4.SS3 "In 4 Results ‣ Natural-Language Agent Harnesses")
        1.  [Case sketches.](#S4.SS3.SSS0.Px1 "In 4.3 RQ3: Code-to-text harness migration ‣ 4 Results ‣ Natural-Language Agent Harnesses")
6.  [5 Discussion](#S5 "In Natural-Language Agent Harnesses")
    1.  [Code versus natural language.](#S5.SS0.SSS0.Px1 "In 5 Discussion ‣ Natural-Language Agent Harnesses")
    2.  [Why natural language still matters.](#S5.SS0.SSS0.Px2 "In 5 Discussion ‣ Natural-Language Agent Harnesses")
    3.  [Searching harness representations.](#S5.SS0.SSS0.Px3 "In 5 Discussion ‣ Natural-Language Agent Harnesses")
7.  [6 Related Work](#S6 "In Natural-Language Agent Harnesses")
    1.  [Prompts as programs and LLM programming systems.](#S6.SS0.SSS0.Px1 "In 6 Related Work ‣ Natural-Language Agent Harnesses")
    2.  [Agent control patterns and orchestration.](#S6.SS0.SSS0.Px2 "In 6 Related Work ‣ Natural-Language Agent Harnesses")
    3.  [Natural language to workflows, constraints, and enforcement.](#S6.SS0.SSS0.Px3 "In 6 Related Work ‣ Natural-Language Agent Harnesses")
    4.  [Harness engineering in practice and automatic harness synthesis.](#S6.SS0.SSS0.Px4 "In 6 Related Work ‣ Natural-Language Agent Harnesses")
    5.  [Reusable instruction carriers and skills.](#S6.SS0.SSS0.Px5 "In 6 Related Work ‣ Natural-Language Agent Harnesses")
8.  [7 Conclusion](#S7 "In Natural-Language Agent Harnesses")
9.  [References](#bib "In Natural-Language Agent Harnesses")
10. [A From model calls to agent calls](#A1 "In Natural-Language Agent Harnesses")
11. [B Canonical workspace for file-backed state](#A2 "In Natural-Language Agent Harnesses")
12. [C Outline of the shared runtime skill](#A3 "In Natural-Language Agent Harnesses")
13. [D Supplementary RQ1 case notes](#A4 "In Natural-Language Agent Harnesses")
14. [E Supplementary RQ2 analysis](#A5 "In Natural-Language Agent Harnesses")
    1.  [Self-evolution positive case: scikit-learn\_\_scikit-learn-25747.](#A5.SS0.SSS0.Px1 "In Appendix E Supplementary RQ2 analysis ‣ Natural-Language Agent Harnesses")
    2.  [File/evidence positive case: mwaskom\_\_seaborn-3069.](#A5.SS0.SSS0.Px2 "In Appendix E Supplementary RQ2 analysis ‣ Natural-Language Agent Harnesses")
    3.  [Verifier positive case: django\_\_django-11734.](#A5.SS0.SSS0.Px3 "In Appendix E Supplementary RQ2 analysis ‣ Natural-Language Agent Harnesses")
    4.  [Shared counterexample: sympy\_\_sympy-23950.](#A5.SS0.SSS0.Px4 "In Appendix E Supplementary RQ2 analysis ‣ Natural-Language Agent Harnesses")
15. [F Shared modules used in RQ2](#A6 "In Natural-Language Agent Harnesses")

[License: arXiv.org perpetual non-exclusive license](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2603.25723v1 \[cs.CL\] 26 Mar 2026

# Natural-Language Agent Harnesses

Linyue Pan Affiliation: Shenzhen International Graduate School, Tsinghua University Email: [ply24@mails.tsinghua.edu.cn](mailto:)    Lexiao Zou Affiliation: Harbin Institute of Technology (Shenzhen) Email: [zheng.haitao@sz.tsinghua.edu.cn](mailto:)    Shuo Guo Affiliation: Shenzhen International Graduate School, Tsinghua University    Jingchen Ni Affiliation: Shenzhen International Graduate School, Tsinghua University    Hai-Tao Zheng ^(†)^(†)thanks: Corresponding author. Affiliation: Shenzhen International Graduate School, Tsinghua University

###### Abstract

Agent performance increasingly depends on *harness engineering*, yet harness design is usually buried in controller code and runtime-specific conventions, making it hard to transfer, compare, and study as a scientific object. We ask whether the high-level control logic of an agent harness can instead be externalized as a portable executable artifact. We introduce Natural-Language Agent Harnesses (NLAHs), which express harness behavior in editable natural language, and Intelligent Harness Runtime (IHR), a shared runtime that executes these harnesses through explicit contracts, durable artifacts, and lightweight adapters. Across coding and computer-use benchmarks, we conduct controlled evaluations of operational viability, module ablation, and code-to-text harness migration.

## 1 Introduction

Modern agents increasingly succeed or fail because of the surrounding *harness*: the control stack that structures multi-step reasoning, tool use, memory, delegation, and stopping beyond any single model call. A large body of research shows that externalized control patterns can be decisive, including reason–act loops ([Yao et al., 2023](#bib.bib19)), retrieval-augmented generation ([Lewis et al., 2021](#bib.bib24)), and explicit self-feedback ([Shinn et al., 2023](#bib.bib21)). Recent work has expanded this space toward explicit memory and self-evolution ([Zhang et al., 2026](#bib.bib53)), workflow generation ([Li et al., 2024](#bib.bib40); [Zheng et al., 2025](#bib.bib60)), multi-agent orchestration ([Fourney et al., 2024](#bib.bib23); [Wang et al., 2025b](#bib.bib73); [Ke et al., 2026](#bib.bib61); [Costa, 2026](#bib.bib69); [Xia et al., 2026](#bib.bib55)), and interface-level test-time scaling and native tool execution ([Muennighoff et al., 2025](#bib.bib22); [Wang et al., 2024b](#bib.bib20); [HKUDS, 2026](#bib.bib14)). In parallel, long-context and long-horizon settings have exposed that the control stack—including state management, context curation, and context folding—can bottleneck performance even when the base model is fixed ([Liu et al., 2024](#bib.bib71); [Chroma Research, 2025](#bib.bib70); [Tang et al., 2025](#bib.bib26); [Tang et al., 2026a](#bib.bib25); [Tang et al., 2026b](#bib.bib27); [Sun et al., 2025](#bib.bib28); [Su et al., 2026](#bib.bib29)). The same pressure appears in scaffold-aware evaluation and increasingly demanding reasoning settings, where differences in scaffolds and harnesses can dominate outcomes even under fixed base models ([Ding et al., 2026](#bib.bib62); [An et al., 2025](#bib.bib30); [Zhan et al., 2026b](#bib.bib31); [Zhan et al., 2026a](#bib.bib32)).

Refer to caption

Figure 1: Examples of harness design patterns used by modern agents (reason–act, retrieval, reflection, verification, memory, search, orchestration).

This shift reframes “prompt engineering” into the broader practice of *context engineering*: deciding what instructions, evidence, intermediate artifacts, and state should be made available at each step of a long run. Practitioner accounts emphasize that as tasks span many context windows, robust progress depends less on one-shot phrasing and more on durable state surfaces, validation gates, and clear responsibility boundaries ([Anthropic, 2024](#bib.bib7); [Anthropic, 2025a](#bib.bib8); [Anthropic, 2025b](#bib.bib9); [Bui, 2026](#bib.bib13)). In the same spirit, recent discussions of *harness engineering* treat the harness as a first-class systems object, not a thin wrapper around a model ([OpenAI, 2026a](#bib.bib17); [LangChain, 2026b](#bib.bib15); [LangChain, 2026a](#bib.bib16); [LangChain, 2025](#bib.bib67)).

#### Problem.

Despite the growing importance of harness design, harness logic is rarely exposed as a coherent, portable artifact. In most agent systems, the effective harness is scattered across controller code, hidden framework defaults, tool adapters, verifier scripts, and runtime-specific assumptions ([Lou et al., 2026](#bib.bib12); [Shi et al., 2025](#bib.bib41); [Chivukula et al., 2025](#bib.bib42); [Wang et al., 2025a](#bib.bib44); [Zhang et al., 2025](#bib.bib18)). As a result, harnesses are difficult to transfer across runtimes, hard to compare fairly, and hard to ablate cleanly: two systems that nominally differ by one design choice often differ simultaneously in prompts, tool mediation, artifact conventions, verification gates, and state semantics ([Liang et al., 2025](#bib.bib33); [Cheng et al., 2025](#bib.bib39)). This collapses evaluation into controller-bundle comparisons rather than module-level evidence.

#### Motivation.

Natural-language artifacts such as AGENTS.md and skill bundles show that practical systems can package repository-local conventions and reusable procedures in portable text ([AGENTS.md, 2026](#bib.bib48); [AgentSkills, 2026](#bib.bib49)). Recent work further treats these artifacts as learnable and benchmarkable objects through experience-driven skill creation, context-engineering skill evolution, reusable procedural memory, and cross-task skill evaluation ([Hao et al., 2026](#bib.bib50); [Ye et al., 2026](#bib.bib51); [Mi et al., 2026](#bib.bib52); [Zhang et al., 2026](#bib.bib53); [Li et al., 2026b](#bib.bib54)). What they establish, however, is feasibility at the level of reusable control knowledge, not an explicit executable harness representation. They typically attach local instructions or reusable routines, but they do not make harness-wide contracts, role boundaries, state semantics, failure handling, and runtime-facing adapters first-class and jointly executable under a shared runtime. This gap motivates our setting rather than closing it: we lift natural language from a carrier of reusable procedures to an explicit, executable harness object.

#### Thesis and approach.

We ask whether the *design-pattern layer* inside agent harnesses can be made explicit as an *executable* natural-language object under shared runtime assumptions. We propose: (i) Natural-Language Agent Harnesses (NLAHs), a structured natural-language representation of harness control bound to explicit contracts and artifact carriers; and (ii) an Intelligent Harness Runtime (IHR), which interprets NLAHs directly and separates shared *runtime charter* from task-family *harness logic*.

Refer to caption

Figure 2: Framework overview. Intelligent Harness Runtime (IHR), with an in-loop LLM, a backend with tool access and child-agent support, and a runtime charter that specifies policy and semantics, executes a Natural-Language Agent Harness (NLAH), which exposes harness logic, roles, contracts, adapters, and state conventions, over task instances.

#### Contributions.

- •
  Formulation. We formalize the harness *design-pattern layer* as an explicit representation object distinct from runtime policy and low-level execution hooks.
- •
  Representation ingredients. We specify the components a natural-language harness must expose to be executable: contracts, roles, stage structure, adapters, scripts, state semantics, and a failure taxonomy.
- •
  Shared intelligent runtime. We introduce Intelligent Harness Runtime (IHR), an in-loop LLM runtime that interprets harness logic directly while cleanly separating the runtime charter from harness logic.
- •
  Controlled evidence. We conduct controlled experiments on shared-runtime behavioral effect (RQ1), module composition/ablation (RQ2), and paired code-to-text migration fidelity (RQ3) on coding and computer-use benchmarks.

## 2 Methodology

### 2.1 Harnesses and the pattern layer

We use *harness* to denote the orchestration layer that governs multiple model or agent calls for a task family. A harness specifies (i) control: how work is decomposed and scheduled; (ii) contracts: what artifacts must be produced, what gates must be satisfied, and when the run should stop; and (iii) state: what must persist across steps, branches, and delegated workers. By *context engineering* we mean designing the immediate prompt and retrieved context for a single call; a harness subsumes this, but also manages multi-step structure, tool mediation, verification, and durable state ([Anthropic, 2025a](#bib.bib8); [Anthropic, 2025b](#bib.bib9)).

The boundary between harness and runtime is analytical rather than absolute. In practice, some generic services (tool adapters, sandboxing, child lifecycle) may live in the runtime, while task-family policy (stages, artifact contracts, verifiers) lives in the harness. We make this boundary explicit for study: our goal is to compare, migrate, and ablate harness *pattern logic* under shared runtime assumptions.

### 2.2 Intelligent Harness Runtime

Because NLAHs are written in natural language, executing them requires interpretation. IHR therefore places an LLM *inside* the runtime loop: at each step it reads (i) the harness, (ii) current state and environment, and (iii) the runtime charter, and then selects the next action consistent with contracts and budgets.

We decompose IHR into three components ([Figure 2](#S1.F2 "In Thesis and approach. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses")): (1) an in-loop LLM that interprets harness logic; (2) a backend that provides terminal tools and a first-class multi-agent interface (e.g., spawning and supervising child agents, ingesting returned artifacts); and (3) a runtime charter that defines the semantics of contracts, state, orchestration, and child lifecycle. In our experiments, child management uses the backend’s multi-agent tool surface (e.g., spawn_agent, wait_agent) ([OpenAI, 2026c](#bib.bib47)).

#### From model calls to agent calls.

We lift a single completion into an *agent call* bounded by an explicit execution contract: required outputs, budgets, permission scope, completion conditions, and designated output paths. [Appendix A](#A1 "Appendix A From model calls to agent calls ‣ Natural-Language Agent Harnesses") gives the contract-based formalization used by the runtime.

### 2.3 Natural-Language Agent Harnesses

An NLAH is a structured natural-language representation of harness control intended to be executed by IHR. Natural language does not replace low-level deterministic code. Instead, it carries *editable, inspectable orchestration logic*, while adapters and scripts provide deterministic hooks (tests, linters, scrapers, verifiers).

Our formulation makes the following core components explicit:

- •
  Contracts: required inputs and outputs, format constraints, validation gates, permission boundaries, retry and stop rules.
- •
  Roles: role prompts (solver, verifier, researcher, orchestrator) with non-overlapping responsibilities.
- •
  Stage structure: an explicit workload topology (e.g., plan $`\rightarrow`$ execute $`\rightarrow`$ verify $`\rightarrow`$ repair).
- •
  Adapters and scripts: named hooks for deterministic actions (tests, verifiers, retrieval, parsing).
- •
  State semantics: what persists across steps (artifacts, ledgers, child workspaces) and how it is reopened (paths, manifests).
- •
  Failure taxonomy: named failure modes that drive recovery (missing artifact, wrong path, verifier failure, tool error, timeout).

### 2.4 File-backed state as an explicit module

Long-horizon autonomy fails in practice when critical state remains implicit or ephemeral. Recent context-folding work similarly treats explicit context management as essential, compressing completed sub-trajectories or dialogue history into reusable summaries and logs ([Sun et al., 2025](#bib.bib28); [Su et al., 2026](#bib.bib29)). We therefore study an optional *file-backed state* module that externalizes durable state into path-addressable artifacts, improving stability under context truncation and branching ([Anthropic, 2025b](#bib.bib9); [Liu et al., 2024](#bib.bib71); [Chroma Research, 2025](#bib.bib70)).

Operationally, the module enforces three properties: externalized (state is written to artifacts rather than held only in transient context), path-addressable (later stages reopen the exact object by path), and compaction-stable (state survives truncation, restart, and delegation). [Appendix B](#A2 "Appendix B Canonical workspace for file-backed state ‣ Natural-Language Agent Harnesses") gives a canonical workspace and file-role mapping used in our experiments.

## 3 Experimental Design

### 3.1 Research questions

We evaluate whether harness pattern logic can become an executable and analyzable object under shared runtime assumptions.

- •
  RQ1 (Behavioral Effect). Under fixed budgets, how do the shared runtime charter and benchmark-specific harness logic change agent behavior and task outcomes?
- •
  RQ2 (Composability). Once patterns are explicit, can modules be composed and ablated at the pattern level?
- •
  RQ3 (Migration). What differences remain between native code harnesses and reconstructed natural-language harnesses under a shared runtime?

|  Benchmark |  Harness |  Setting |  Perf. |  Prompt Tokens |  Completion Tokens |  Tool Calls |  LLM Calls |  Runtime (min) |
|----|----|----|----|----|----|----|----|----|
|  SWE Verified |  TRAE |  Full IHR |  74.4 |  16.3M |  211k |  642.6 |  414.3 |  32.5 |
|  |  |  w/o RTS |  76.0 |  11.1M |  137k |  451.9 |  260.5 |  16.6 |
|  |  |  w/o HS |  75.2 |  1.2M |  13.6k |  51.1 |  34.0 |  6.7 |
|  |  Live-SWE |  Full IHR |  72.8 |  1.4M |  17.0k |  58.4 |  41.4 |  7.6 |
|  |  |  w/o RTS |  76.0 |  1.1M |  11.7k |  41.0 |  28.2 |  5.5 |
|  |  |  w/o HS |  75.2 |  1.2M |  13.6k |  51.1 |  34.0 |  6.7 |

Table 1: RQ1: Outcome and process metrics under Full IHR and ablations. The runtime skill carries shared charter; the harness skill carries benchmark-specific harness logic. Here, *w/o RTS* and *w/o HS* denote removing the runtime skill and harness skill, respectively.

|          | vs. w/o RTS |     |       | vs. w/o HS |     |       |
|----------|-------------|-----|-------|------------|-----|-------|
| Harness  |  F          |  A  |  S    |  F         |  A  |  S    |
| TRAE     |  4          |  6  |  115  |  7         |  8  |  110  |
| Live-SWE |  4          |  8  |  113  |  4         |  7  |  114  |

Table 2: RQ1 paired flips on SWE-bench Verified. Counts compare Full IHR against each ablation on the same 125 stitched samples. F means only Full resolves, A means only the ablation resolves, and S means both settings agree.

### 3.2 Instantiation

In our instantiation, the backend is realized by Codex with terminal tools and a multi-agent interface; the shared runtime charter is carried by a fixed runtime skill; and benchmark-specific harness logic is carried by harness skills ([OpenAI, 2025](#bib.bib65); [OpenAI, 2026b](#bib.bib66)). This factorization allows controlled ablations of shared runtime policy versus benchmark-specific harness logic. [Appendix C](#A3 "Appendix C Outline of the shared runtime skill ‣ Natural-Language Agent Harnesses") summarizes the shared runtime skill used in all IHR runs.

Refer to caption

Figure 3: Realization mapping: backend + runtime skill (charter) + harness skill (task-family logic).

### 3.3 Benchmarks and harness families

We evaluate on two representative benchmark families that require multi-step control, tool use, durable state accumulation, and verification or evidence management.

#### Coding.

SWE-bench Verified evaluates repository-grounded issue resolution; the main metric is issue resolution rate ([Jimenez et al., 2024](#bib.bib1); [Chowdhury et al., 2024](#bib.bib2)). We study coding harness families including TRAE-style multi-candidate search ([Team et al., 2025](#bib.bib3)) and Live-SWE-Agent ([Xia et al., 2025](#bib.bib4)).

#### Computer use.

OSWorld evaluates computer-use behavior grounded in real desktop environments; the main metric is task success rate ([Xie et al., 2024](#bib.bib5)). We study OS-Symphony as a holistic harness for computer-use agents ([Yang et al., 2026](#bib.bib6)).

|  Benchmark |  Basic |  File- Backed State |  Evidence- Backed Answering |  Verifier |  Self- Evolution |  Multi- Candidate Search |  Dynamic Orchestration |
|----|----|----|----|----|----|----|----|
|  SWE Verified |  75.2 |  76.8_(+1.6) |  76.8_(+1.6) |  74.4_(-0.8) |  80.0_(+4.8) |  72.8_(-2.4) |  75.2_(0.0) |
|  OSWorld |  41.7 |  47.2_(+5.5) |  41.7_(0.0) |  33.3_(-8.4) |  44.4_(+2.7) |  36.1_(-5.6) |  44.4_(+2.7) |

Table 3: RQ2: Module composition and ablation. Within each benchmark, we begin from a benchmark-specific *Basic* starting point and add one module at a time.

|  Metric             |  Runtime-owned parent  |  Delegated child agents  |
|---------------------|------------------------|--------------------------|
|  Prompt tokens      |  8.5%                  |  91.5%                   |
|  Completion tokens  |  8.1%                  |  91.9%                   |
|  Tool calls         |  9.8%                  |  90.2%                   |
|  LLM calls          |  9.4%                  |  90.6%                   |

Table 4: TRAE NLAH usage split. Approximate share of total usage attributable to the runtime-owned parent thread vs. delegated child agents (per-sample averages).

### 3.4 Experimental setup

All experiments use the same IHR instantiation: Codex CLI version 0.114.0, model GPT-5.4 ([OpenAI, 2026b](#bib.bib66)), and reasoning effort xhigh. Runs execute on Ubuntu 24.04 servers with 64 CPU cores and 251 GiB of memory. To improve reproducibility and sandbox safety, all runs are executed in Docker containers. Per-task container caps are 32 vCPUs, 84 GiB memory, and 40 GiB storage.

Due to budget limits, the current paper reports results on benchmark subsets sampled once with a fixed random seed rather than on the full benchmark suites. The current subsets contain 125 SWE-bench Verified samples and 36 OSWorld samples. We plan to rerun the full benchmarks with GPT-5.4-mini and update the reported results in a future revision.

## 4 Results

### 4.1 RQ1: Behavioral effect

RQ1 tests whether the shared runtime charter and benchmark-specific harness logic materially change agent behavior and task outcomes under fixed budgets. The first result is that process metrics move much more than resolved rate. On SWE-bench Verified, the TRAE and Live-SWE rows stay within a narrow performance band, but Full IHR produces much larger changes in tokens, calls, and runtime than either ablation. RQ1 should therefore be read first as evidence that the shared runtime and harness logic change system behavior, not as a monotonic gain story.

The trajectory-level evidence shows that Full IHR is not a prompt wrapper. For TRAE, Full IHR sharply increases tool calls, LLM calls, and runtime, and [Table 4](#S3.T4 "In Computer use. ‣ 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses") shows that about 90% of prompt tokens, completion tokens, tool calls, and LLM calls occur in delegated child agents rather than in the runtime-owned parent thread. The added budget therefore reflects multi-stage exploration, candidate comparison, artifact handoff, and extra verification. Live-SWE is the lighter regime of the same mechanism: it raises process cost more moderately, but it still pushes the run toward a more explicit staged workflow than either ablation. Taken together, the runtime charter plus harness logic are behaviorally real controls rather than prompt decoration.

The next result is that most SWE instances do not flip. Across both TRAE and Live-SWE, more than 110 of 125 stitched SWE samples agree between Full IHR and each ablation ([Table 2](#S3.T2 "In 3.1 Research questions ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses")). The meaningful differences are therefore concentrated in a small frontier of component-sensitive cases. Full IHR behaves more like a solved-set replacer than a uniform frontier expander: it creates some Full-only wins, but it also loses some direct-path repairs that lighter settings retain. Appendix [D](#A4 "Appendix D Supplementary RQ1 case notes ‣ Natural-Language Agent Harnesses") summarizes representative component-sensitive SWE cases.

The most informative failures are alignment failures rather than random misses. On matplotlib\_\_matplotlib-24570, TRAE Full expands into a large candidate search, runs multiple selector and revalidation stages, and still ends with a locally plausible patch that misses the official evaluator. Live-SWE exposes the lighter analogue on cases such as django\_\_django-14404, sympy\_\_sympy-23950, and django\_\_django-13406, where extra structure makes the run more organized and more expensive while drifting away from the shortest benchmark-aligned repair path or from the evaluator’s final acceptance object. These failures matter because they show not that the harness is inert, but that it can reshape local success signals in ways that do not always align with benchmark acceptance.

|  Benchmark |  Harness |  Realization |  Perf. |  Prompt Tokens |  Completion Tokens |  Agent Calls |  Tool Calls |  LLM Calls |  Runtime (min) |
|----|----|----|----|----|----|----|----|----|----|
|  OSWorld |  OS-Symphony |  Code |  30.4 |  11.4M |  147.2k |  99 |  651 |  1.2k |  361.5 |
|  |  |  NLAH |  47.2 |  15.7M |  228.5k |  72 |  683 |  34 |  140.8 |

Table 5: RQ3: Paired code-to-text harness comparison. Each harness is evaluated as original source code vs. reconstructed NLAH under IHR. Here, *Code* denotes the original source implementation.

### 4.2 RQ2: Harness pattern ablations

RQ2 asks whether, once harness patterns are made explicit, they can be composed and ablated as modules under a shared substrate.

For clarity, *Basic* is benchmark-specific in this table. On SWE, Basic is a bare Codex baseline with shell plus file reading, writing, and editing tools. On OSWorld, Basic is the NLAH realization of OS-Symphony before adding the extra RQ2 modules. We then add one module at a time: file-backed state, evidence-backed answering, a verifier stage, self-evolution, multi-candidate search, and dynamic orchestration. This makes the SWE rows close to tool-and-workflow ablations over a minimal coding agent, whereas the OSWorld rows are ablations over an already structured computer-use harness.

The first pattern is that module effects concentrate on a small solved frontier rather than shifting the whole benchmark uniformly. Most tasks are either solved robustly by nearly all conditions or remain unsolved across conditions, so the informative differences come from boundary cases that flip under changed control logic. RQ2 should therefore be read as a study of how modules reshape the frontier of difficult cases, not just as a ranking over mean scores.

The second pattern is that the modules fall into two qualitatively different families. Self-evolution is the clearest example of a module that improves the solve loop itself. The trajectory evidence suggests that its main benefit is not open-ended reflection, but a more disciplined acceptance-gated attempt loop that keeps the search narrow until failure signals justify another pass. Cases such as scikit-learn\_\_scikit-learn-25747 fit this interpretation: the module succeeds by forcing a cleaner success criterion around an ordinary repair attempt, not by expanding into an expensive tree of candidates. By contrast, file-backed state and evidence-backed answering mainly improve process structure. They leave durable external signatures such as task histories, manifests, and analysis sidecars, which is strong evidence that they really externalize state and evidence handling. Their gains remain mild, which suggests that they improve auditability, handoff discipline, and trace quality more directly than semantic repair ability.

The third pattern is that more explicit structure does not automatically mean better end-task performance. Dynamic orchestration is behaviorally real rather than inert because it changes which SWE instances are solved, but it mostly acts as a solved-set replacer instead of expanding the frontier. Verifier and multi-candidate search show a harsher version of the same principle. Verifier adds a genuine independent checking layer, yet failures such as sympy\_\_sympy-23950 show that verifier-level acceptance can still diverge from benchmark-level acceptance. Multi-candidate search makes search behavior more visible, but under the current runtime and budget it appears too overhead-heavy and infrastructure-sensitive to convert that richer behavior into better aggregate outcomes.

OSWorld points in the same direction from a different starting point: because its Basic condition is already a structured harness, the most useful additions are again the lighter modules that tighten local organization without adding a heavy extra acceptance layer. Overall, RQ2 does not support a simple “more structure is always better” story. The stronger interpretation is that explicit modules help when they tighten the path from intermediate behavior to the evaluator’s acceptance condition, and help less when they mainly add local process layers whose notion of success is only weakly aligned with the final benchmark. Appendix [E](#A5 "Appendix E Supplementary RQ2 analysis ‣ Natural-Language Agent Harnesses") adds token-cost and Basic-union views together with representative case studies that make the same mechanism-level pattern more concrete.

### 4.3 RQ3: Code-to-text harness migration

RQ3 is a paired migration study: each harness appears in two realizations (source code vs. reconstructed NLAH), evaluated under a shared reporting schema ([Table 5](#S4.T5 "In 4.1 RQ1: Behavioral effect ‣ 4 Results ‣ Natural-Language Agent Harnesses")). The target is task-level equivalence—comparable exposed logic, contracts, and benchmark-facing artifacts—not identical internal traces. On OSWorld, the migrated OS-Symphony realization reaches 47.2 versus 30.4 for the native code harness. The more important difference, however, is behavioral rather than purely numerical. Native OS-Symphony externalizes control as a screenshot-grounded repair loop: verify the previous step, inspect the current screen, choose the next GUI action, and retry locally when focus or selection errors occur. Under IHR, the same task family tends to re-center around file-backed state and artifact-backed verification. Runs materialize task files, ledgers, and explicit artifacts, and they switch more readily from brittle GUI repair to file, shell, or package-level operations when those operations provide a stronger completion certificate.

The retained RQ3 archives make this relocation concrete. The native side exposes 36 main traces plus 7 short nested search_1 traces, whereas the migrated side exposes 34 retained inner event streams and 2 missing-inner-stream stubs. This means the native topology is a desktop control loop with occasional detachable tutorial detours, while the migrated topology is a contract-first runtime flow whose state lives in task files, ledgers, and artifacts.

Search is preserved functionally, but relocated topologically. Among the 6 native-search samples whose migrated inner streams are retained, only 3 also contain explicit web_search, and 1 additional migrated sample uses web_search without a native search_1 branch. Search therefore survives less as an auxiliary sub-agent branch and more as in-band runtime support for substrate choice and deterministic repair.

Verification shifts even more strongly. Native traces often stop on screen plausibility, whereas migrated runs more often close on path-addressable evidence such as a written file, a reopened document, a package-level object, or a system query. This shift matters because OSWorld tasks often fail not at first-pass intent, but at recovery and closure.

Retained migrated traces are also denser, but that density should not be read as a raw action multiplier. Across paired retained samples, native main traces average 18.1 steps, while migrated traces average about 18.2 unique command starts but 58.5 total logged events because the runtime also preserves started/completed pairs, bookkeeping, and explicit artifact handling. The extra density is therefore better interpreted as observability plus recovery scaffolding than as dramatically more task actions. These tendencies are consistent with the OSWorld module results in RQ2, where file-backed state is the strongest positive addition, and they help explain why the NLAH realization obtains a modest performance gain rather than a penalty.

#### Case sketches.

Representative cases make the same mechanism concrete. In a system-configuration task, the native run stays trapped in GUI focus repair, whereas the NLAH realization shifts to shell-side configuration and closes only after explicit sshd validation. In a spreadsheet task, the native run reaches apparent visual progress yet fails to close robustly, whereas the migrated harness writes the target artifact deterministically and reopens it before completion. In a presentation task, the native harness can retrieve the right tutorial path yet still struggle with object binding and drag control, whereas the migrated harness edits the .pptx package directly and verifies the resulting slide artifact. Taken together, these cases suggest that the main migration effect is not loss of high-level orchestration, but relocation of reliability mechanisms from local screen repair to durable runtime state and artifact-backed closure.

## 5 Discussion

#### Code versus natural language.

We do not argue that natural language should replace code. Instead, natural language carries editable high-level harness logic, while code remains responsible for deterministic operations, tool interfaces, and sandbox enforcement. The scientific claim is about the unit of comparison: externalizing harness pattern logic as a readable, executable object under shared runtime semantics.

#### Why natural language still matters.

A natural concern is whether stronger foundation models reduce the value of natural-language control. Empirically, gains from complex prompt engineering can diminish or become brittle in some settings ([Wang et al., 2024a](#bib.bib63); [Cao et al., 2024](#bib.bib64)). However, our results support a different interpretation for agent systems: natural language remains important when used to specify *harness-level control*—roles, contracts, verification gates, durable state semantics, and delegation boundaries—rather than only one-shot prompt phrasing. This framing is consistent with practitioner accounts that emphasize context engineering and long-running harness design ([Anthropic, 2025a](#bib.bib8); [Anthropic, 2025b](#bib.bib9); [OpenAI, 2026a](#bib.bib17); [LangChain, 2026b](#bib.bib15)). It is also compatible with emerging scaffold-aware evaluation and harness-synthesis research that treat the surrounding control stack as part of the system under evaluation ([Ding et al., 2026](#bib.bib62); [Lou et al., 2026](#bib.bib12); [Chen et al., 2026b](#bib.bib34)).

#### Searching harness representations.

Once harnesses are explicit objects, they become a search space. Explicit harness modules can be manually designed, retrieved, migrated, recombined, and systematically ablated under shared assumptions. Longer term, this suggests automated search and optimization over harness representations rather than opaque bundle engineering, enabling harness engineering to become a more controlled scientific object.

## 6 Related Work

#### Prompts as programs and LLM programming systems.

Several lines of work treat prompts and LLM calls as programmable objects. Liang et al. argue that some prompts are programs and study how developers engineer prompt-enabled software systems ([Liang et al., 2025](#bib.bib33)). Promptware engineering further frames prompt-enabled systems as a software-engineering object with concerns of maintainability, testing, and integration ([Chen et al., 2026b](#bib.bib34)). At the language and systems level, LMQL adds constraints and control flow to prompting ([Beurer-Kellner et al., 2023](#bib.bib35)), DSPy compiles declarative LM pipelines ([Khattab et al., 2024](#bib.bib36)), APPL integrates prompts and Python programs ([Dong et al., 2025](#bib.bib37)), and SGLang provides an execution system for structured language-model programs ([Zheng et al., 2024](#bib.bib38)). Cheng et al. study mechanisms for sharing state between prompts and programs ([Cheng et al., 2025](#bib.bib39)). These works primarily program calls or pipelines; our focus is the harness layer that governs multi-step *agent calls*, artifact contracts, delegation, verification, and durable state.

#### Agent control patterns and orchestration.

Core agent control patterns include reason–act loops ([Yao et al., 2023](#bib.bib19)), retrieval augmentation ([Lewis et al., 2021](#bib.bib24)), and reflection/self-feedback ([Shinn et al., 2023](#bib.bib21)). Subsequent work expands this space toward memory and self-evolution ([Zhang et al., 2026](#bib.bib53); [Xia et al., 2025](#bib.bib4)), multi-agent generalists ([Fourney et al., 2024](#bib.bib23)), workflow generation ([Li et al., 2024](#bib.bib40); [Zheng et al., 2025](#bib.bib60)), and dynamic topology/routing ([Wang et al., 2025b](#bib.bib73); [Wang et al., 2025c](#bib.bib72); [Yue et al., 2025](#bib.bib74); [Ke et al., 2026](#bib.bib61); [Costa, 2026](#bib.bib69)). Our work is complementary: we do not propose a new orchestration algorithm, but instead externalize the harness pattern logic as an executable representation under a shared runtime.

#### Natural language to workflows, constraints, and enforcement.

Several systems translate natural language into workflows or executable constraints. AutoFlow generates workflows from natural-language descriptions ([Li et al., 2024](#bib.bib40)), FlowAgent studies compliance vs. flexibility ([Shi et al., 2025](#bib.bib41)), and Agint compiles software-engineering agents into agentic graphs ([Chivukula et al., 2025](#bib.bib42)). AgentSpec focuses on runtime enforcement mechanisms ([Wang et al., 2025a](#bib.bib44)), and ContextCov derives executable constraints from agent instruction files ([Sharma, 2026](#bib.bib43)). OpenProse and Lobster expose workflow/specification systems close to natural-language authoring ([OpenProse, 2026](#bib.bib45); [OpenClaw, 2026](#bib.bib46)). In contrast to compiling to a runtime-owned IR, IHR interprets harness logic directly, relying on explicit contracts and durable artifacts for auditability.

#### Harness engineering in practice and automatic harness synthesis.

Recent context-folding work tackles a nearby systems problem by compressing long interaction histories for long-horizon agents ([Sun et al., 2025](#bib.bib28); [Su et al., 2026](#bib.bib29)). Recent public engineering accounts describe harness engineering as a primary driver of robustness in long-running agents ([Anthropic, 2024](#bib.bib7); [Anthropic, 2025a](#bib.bib8); [Anthropic, 2025b](#bib.bib9); [Anthropic, 2025c](#bib.bib10); [Anthropic, 2026b](#bib.bib11); [Anthropic, 2026a](#bib.bib68); [OpenAI, 2026a](#bib.bib17); [LangChain, 2026a](#bib.bib16); [LangChain, 2026b](#bib.bib15); [Bui, 2026](#bib.bib13)). On the research side, AutoHarness explicitly treats harness synthesis as an optimization target, automatically producing code harnesses that improve agent behavior ([Lou et al., 2026](#bib.bib12)). General Modular Harness studies modular harness structure in multi-turn environments ([Zhang et al., 2025](#bib.bib18)). Our work differs by focusing on the harness *design-pattern layer* as a natural-language representation object that can be executed under a shared intelligent runtime.

#### Reusable instruction carriers and skills.

Natural-language carriers such as AGENTS.md, AgentSkills, and related skill bundles demonstrate that portable, attachable operational knowledge can be packaged as text and reused across environments ([AGENTS.md, 2026](#bib.bib48); [AgentSkills, 2026](#bib.bib49)). Recent skill work pushes this further by treating skills as objects that can be created from experience, evolved for context engineering, or maintained as reusable procedural memory rather than fixed one-off prompts ([Hao et al., 2026](#bib.bib50); [Ye et al., 2026](#bib.bib51); [Mi et al., 2026](#bib.bib52); [Zhang et al., 2026](#bib.bib53)). Skills also provide an alternative modularity substrate: a single agent equipped with a skill library can sometimes replace explicit multi-agent communication, although this substitution breaks when tasks require genuine parallelism, private state, or adversarial role structure ([Li, 2026](#bib.bib56)). At the ecosystem level, AgentSkillOS studies organizing and orchestrating large skill collections, while SkillsBench, SkillCraft, and PinchBench evaluate cross-task transfer, higher-level tool composition, and practical skill invocation under diverse tasks ([Li et al., 2026a](#bib.bib58); [Li et al., 2026b](#bib.bib54); [Chen et al., 2026a](#bib.bib57); [PinchBench, 2026](#bib.bib59)). We extend this idea from reusable local guidance to executable harness-level control.

## 7 Conclusion

We study whether the harness design-pattern layer can be externalized as an executable, comparable, and ablatable object. We propose Natural-Language Agent Harnesses and an Intelligent Harness Runtime that interprets harness logic directly under shared runtime semantics. Across the current coding and computer-use benchmarks, we provide controlled evidence that this stack is operationally viable, enables module-level composition and ablation, and supports meaningful code-to-text harness migration studies. These results suggest a path toward harness representation science, where harness modules become first-class research artifacts rather than incidental glue around models.

## Limitations

Natural language is less precise than code, and some harness mechanisms cannot be recovered faithfully from text, especially when they rely on hidden service-side state, proprietary schedulers, or training-induced behaviors not observable from released artifacts. Runtime contamination remains a real risk: a strong shared runtime charter may absorb part of the behavior that one might otherwise attribute to harness text. Module-level ablation is not strict causal identification; textual representations can introduce confounds such as instruction salience and prompt length.

## Broader impact and risks

Externalizing harness modules can reduce development cost, improve comparability, and encourage reuse of robust workflows. However, portable harness logic and scripts may also lower the barrier to spreading risky workflows. Because harnesses mediate tool use, artifact handling, and delegation, they can introduce new attack surfaces for prompt injection, malicious tool grafting, or supply-chain contamination. Deployments should combine provenance tracking, review, permission control, and sandbox isolation.

## References

- AGENTS.md (2026) AGENTS.md AGENTS.md. Note: Community specification websiteAccessed: 2026-03-13 External Links: [Link](https://agents.md/) Cited by: [§1](#S1.SS0.SSS0.Px2.p1.1 "Motivation. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- AgentSkills (2026) AgentSkills AgentSkills. Note: Website home pageAccessed: 2026-03-13 External Links: [Link](https://agentskills.io/home) Cited by: [§1](#S1.SS0.SSS0.Px2.p1.1 "Motivation. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- An et al. (2025) S. An, X. Cai, X. Cao, X. Li, Y. Lin, J. Liu, X. Lv, D. Ma, X. Wang, Z. Wang, and S. Zhou AMO-bench: large language models still struggle in high school math competitions. External Links: 2510.26768, [Link](https://arxiv.org/abs/2510.26768) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Anthropic (2024) Anthropic Building effective agents. Note: Engineering blogPublished: 2024-12-19. Accessed: 2026-03-12 External Links: [Link](https://www.anthropic.com/engineering/building-effective-agents) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Anthropic (2025a) Anthropic Effective context engineering for ai agents. Note: Engineering blogPublished: 2025-09-29. Accessed: 2026-03-12 External Links: [Link](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§2.1](#S2.SS1.p1.1 "2.1 Harnesses and the pattern layer ‣ 2 Methodology ‣ Natural-Language Agent Harnesses"), [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Anthropic (2025b) Anthropic Effective harnesses for long-running agents. Note: Engineering blogPublished: 2025-11-26. Accessed: 2026-03-12 External Links: [Link](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§2.1](#S2.SS1.p1.1 "2.1 Harnesses and the pattern layer ‣ 2 Methodology ‣ Natural-Language Agent Harnesses"), [§2.4](#S2.SS4.p1.1 "2.4 File-backed state as an explicit module ‣ 2 Methodology ‣ Natural-Language Agent Harnesses"), [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Anthropic (2025c) Anthropic How we built our multi-agent research system. Note: Engineering blogPublished: 2025-06-13. Accessed: 2026-03-12 External Links: [Link](https://www.anthropic.com/engineering/multi-agent-research-system) Cited by: [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Anthropic (2026a) Anthropic Claude code subagents. Note: Documentation pageAccessed: 2026-03-06 External Links: [Link](https://code.claude.com/docs/en/sub-agents) Cited by: [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Anthropic (2026b) Anthropic How claude remembers your project. Note: Documentation pageAccessed: 2026-03-12 External Links: [Link](https://code.claude.com/docs/en/memory) Cited by: [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Beurer-Kellner et al. (2023) L. Beurer-Kellner, M. Fischer, and M. Vechev Prompting is programming: a query language for large language models. Proc. ACM Program. Lang. 7 (PLDI). External Links: [Link](https://doi.org/10.1145/3591300), [Document](https://dx.doi.org/10.1145/3591300) Cited by: [§6](#S6.SS0.SSS0.Px1.p1.1 "Prompts as programs and LLM programming systems. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Bui (2026) N. D. Q. Bui Building effective ai coding agents for the terminal: scaffolding, harness, context engineering, and lessons learned. External Links: 2603.05344, [Link](https://arxiv.org/abs/2603.05344) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Cao et al. (2024) B. Cao, D. Cai, Z. Zhang, Y. Zou, and W. Lam On the worst prompt performance of large language models. External Links: 2406.10248, [Link](https://arxiv.org/abs/2406.10248) Cited by: [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses").
- Chen et al. (2026a) S. Chen, J. Gai, R. Zhou, J. Zhang, T. Zhu, J. Li, K. Wang, Z. Wang, Z. Chen, K. Kaleb, N. Miao, S. Gao, C. Lu, M. Li, J. He, and Y. W. Teh SkillCraft: can llm agents learn to use tools skillfully?. External Links: 2603.00718, [Link](https://arxiv.org/abs/2603.00718) Cited by: [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Chen et al. (2026b) Z. Chen, C. Wang, W. Sun, X. Liu, J. M. Zhang, and Y. Liu Promptware engineering: software engineering for prompt-enabled systems. External Links: 2503.02400, [Link](https://arxiv.org/abs/2503.02400) Cited by: [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px1.p1.1 "Prompts as programs and LLM programming systems. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Cheng et al. (2025) E. Y. Cheng, L. Weber, T. Jin, and M. Carbin Sharing state between prompts and programs. External Links: 2512.14805, [Link](https://arxiv.org/abs/2512.14805) Cited by: [§1](#S1.SS0.SSS0.Px1.p1.1 "Problem. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px1.p1.1 "Prompts as programs and LLM programming systems. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Chivukula et al. (2025) A. Chivukula, J. Somasundaram, and V. Somasundaram Agint: agentic graph compilation for software engineering agents. External Links: 2511.19635, [Link](https://arxiv.org/abs/2511.19635) Cited by: [§1](#S1.SS0.SSS0.Px1.p1.1 "Problem. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px3.p1.1 "Natural language to workflows, constraints, and enforcement. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Chowdhury et al. (2024) N. Chowdhury, J. Aung, C. J. Shern, O. Jaffe, D. Sherburn, G. Starace, E. Mays, R. Dias, M. Aljubeh, M. Glaese, C. E. Jimenez, J. Yang, L. Ho, T. Patwardhan, K. Liu, and A. Madry Introducing SWE-bench verified. External Links: [Link](https://openai.com/index/introducing-swe-bench-verified/) Cited by: [§3.3](#S3.SS3.SSS0.Px1.p1.1 "Coding. ‣ 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses").
- Chroma Research (2025) Chroma Research Context rot: how increasing input tokens impacts llm performance. Note: Research articleAccessed: 2026-03-06 External Links: [Link](https://research.trychroma.com/context-rot) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§2.4](#S2.SS4.p1.1 "2.4 File-backed state as an explicit module ‣ 2 Methodology ‣ Natural-Language Agent Harnesses").
- Costa (2026) I. Costa AgentSpawn: adaptive multi-agent collaboration through dynamic spawning for long-horizon code generation. External Links: 2602.07072, [Link](https://arxiv.org/abs/2602.07072) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Ding et al. (2026) D. Ding, S. Liu, E. Yang, J. Lin, Z. Chen, S. Dou, H. Guo, W. Cheng, P. Zhao, C. Xiao, Q. Zeng, Q. Zhang, X. Huang, Q. Xu, and T. Gui OctoBench: benchmarking scaffold-aware instruction following in repository-grounded agentic coding. External Links: 2601.10343, [Link](https://arxiv.org/abs/2601.10343) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses").
- Dong et al. (2025) H. Dong, Q. Su, Y. Gao, Z. Li, Y. Ruan, G. Pekhimenko, C. J. Maddison, and X. Si APPL: a prompt programming language for harmonious integration of programs and large language model prompts. In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), W. Che, J. Nabende, E. Shutova, and M. T. Pilehvar (Eds.), Vienna, Austria, pp. 1243–1266. External Links: [Link](https://aclanthology.org/2025.acl-long.63/), [Document](https://dx.doi.org/10.18653/v1/2025.acl-long.63), ISBN 979-8-89176-251-0 Cited by: [§6](#S6.SS0.SSS0.Px1.p1.1 "Prompts as programs and LLM programming systems. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Fourney et al. (2024) A. Fourney, G. Bansal, H. Mozannar, C. Tan, E. Salinas, Erkang, Zhu, F. Niedtner, G. Proebsting, G. Bassman, J. Gerrits, J. Alber, P. Chang, R. Loynd, R. West, V. Dibia, A. Awadallah, E. Kamar, R. Hosn, and S. Amershi Magentic-one: a generalist multi-agent system for solving complex tasks. External Links: 2411.04468, [Link](https://arxiv.org/abs/2411.04468) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Hao et al. (2026) Z. Hao, H. Wang, J. Luo, J. Zhang, Y. Zhou, Q. Lin, C. Wang, H. Dong, and J. Chen ReCreate: reasoning and creating domain agents driven by experience. External Links: 2601.11100, [Link](https://arxiv.org/abs/2601.11100) Cited by: [§1](#S1.SS0.SSS0.Px2.p1.1 "Motivation. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- HKUDS (2026) HKUDS CLI-Anything: Making ALL Software Agent-Native. Note: GitHub repositoryRepository created: 2026-03-08. Accessed: 2026-03-23 External Links: [Link](https://github.com/HKUDS/CLI-Anything) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Jimenez et al. (2024) C. E. Jimenez, J. Yang, A. Wettig, S. Yao, K. Pei, O. Press, and K. R. Narasimhan SWE-bench: can language models resolve real-world github issues?. In The Twelfth International Conference on Learning Representations, External Links: [Link](https://openreview.net/forum?id=VTF8yNQM66) Cited by: [§3.3](#S3.SS3.SSS0.Px1.p1.1 "Coding. ‣ 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses").
- Ke et al. (2026) Z. Ke, Y. Ming, A. Xu, R. Chin, X. Nguyen, P. Jwalapuram, J. Wang, S. Yavuz, C. Xiong, and S. Joty MAS-orchestra: understanding and improving multi-agent reasoning through holistic orchestration and controlled benchmarks. External Links: 2601.14652, [Link](https://arxiv.org/abs/2601.14652) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Khattab et al. (2024) O. Khattab, A. Singhvi, P. Maheshwari, Z. Zhang, K. Santhanam, S. V. A, S. Haq, A. Sharma, T. Joshi, H. Moazam, H. Miller, M. Zaharia, and C. Potts DSPy: compiling declarative language model calls into state-of-the-art pipelines. In International Conference on Learning Representations, B. Kim, Y. Yue, S. Chaudhuri, K. Fragkiadaki, M. Khan, and Y. Sun (Eds.), Vol. 2024, pp. 54928–54958. External Links: [Link](https://proceedings.iclr.cc/paper_files/paper/2024/file/f1cf02ce09757f57c3b93c0db83181e0-Paper-Conference.pdf) Cited by: [§6](#S6.SS0.SSS0.Px1.p1.1 "Prompts as programs and LLM programming systems. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- LangChain (2025) LangChain Deep agents. Note: Engineering blogPublished: 2025-07-30. Accessed: 2026-03-12 External Links: [Link](https://blog.langchain.com/deep-agents/) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- LangChain (2026a) LangChain Improving deep agents with harness engineering. Note: Engineering blogPublished: 2026-02-17. Accessed: 2026-03-12 External Links: [Link](https://blog.langchain.com/improving-deep-agents-with-harness-engineering/) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- LangChain (2026b) LangChain The anatomy of an agent harness. Note: Engineering blogPublished: 2026-03-10. Accessed: 2026-03-12 External Links: [Link](https://blog.langchain.com/the-anatomy-of-an-agent-harness/) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Lewis et al. (2021) P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Küttler, M. Lewis, W. Yih, T. Rocktäschel, S. Riedel, and D. Kiela Retrieval-augmented generation for knowledge-intensive nlp tasks. External Links: 2005.11401, [Link](https://arxiv.org/abs/2005.11401) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Li et al. (2026a) H. Li, C. Mu, J. Chen, S. Ren, Z. Cui, Y. Zhang, L. Bai, and S. Hu Organizing, orchestrating, and benchmarking agent skills at ecosystem scale. External Links: 2603.02176, [Link](https://arxiv.org/abs/2603.02176) Cited by: [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Li et al. (2026b) X. Li, W. Chen, Y. Liu, S. Zheng, X. Chen, Y. He, Y. Li, B. You, H. Shen, J. Sun, S. Wang, Q. Zeng, D. Wang, X. Zhao, Y. Wang, R. B. Chaim, Z. Di, Y. Gao, J. He, Y. He, L. Jing, L. Kong, X. Lan, J. Li, S. Li, Y. Li, Y. Lin, X. Liu, X. Liu, H. Lyu, Z. Ma, B. Wang, R. Wang, T. Wang, W. Ye, Y. Zhang, H. Xing, Y. Xue, S. Dillmann, and H. Lee SkillsBench: benchmarking how well agent skills work across diverse tasks. External Links: 2602.12670, [Link](https://arxiv.org/abs/2602.12670) Cited by: [§1](#S1.SS0.SSS0.Px2.p1.1 "Motivation. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Li (2026) X. Li When single-agent with skills replace multi-agent systems and when they fail. External Links: 2601.04748, [Link](https://arxiv.org/abs/2601.04748) Cited by: [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Li et al. (2024) Z. Li, S. Xu, K. Mei, W. Hua, B. Rama, O. Raheja, H. Wang, H. Zhu, and Y. Zhang AutoFlow: automated workflow generation for large language model agents. External Links: 2407.12821, [Link](https://arxiv.org/abs/2407.12821) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px3.p1.1 "Natural language to workflows, constraints, and enforcement. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Liang et al. (2025) J. T. Liang, M. Lin, N. Rao, and B. A. Myers Prompts are programs too! understanding how developers build software containing prompts. Proc. ACM Softw. Eng. 2 (FSE). External Links: [Link](https://doi.org/10.1145/3729342), [Document](https://dx.doi.org/10.1145/3729342) Cited by: [§1](#S1.SS0.SSS0.Px1.p1.1 "Problem. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px1.p1.1 "Prompts as programs and LLM programming systems. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Liu et al. (2024) N. F. Liu, K. Lin, J. Hewitt, A. Paranjape, M. Bevilacqua, F. Petroni, and P. Liang Lost in the middle: how language models use long contexts. Transactions of the Association for Computational Linguistics 12, pp. 157–173. External Links: [Link](https://aclanthology.org/2024.tacl-1.9/), [Document](https://dx.doi.org/10.1162/tacl%5Fa%5F00638) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§2.4](#S2.SS4.p1.1 "2.4 File-backed state as an explicit module ‣ 2 Methodology ‣ Natural-Language Agent Harnesses").
- Lou et al. (2026) X. Lou, M. Lázaro-Gredilla, A. Dedieu, C. Wendelken, W. Lehrach, and K. P. Murphy AutoHarness: improving llm agents by automatically synthesizing a code harness. External Links: 2603.03329, [Link](https://arxiv.org/abs/2603.03329) Cited by: [§1](#S1.SS0.SSS0.Px1.p1.1 "Problem. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Mi et al. (2026) Q. Mi, Z. Ma, M. Yang, H. Li, Y. Wang, H. Zhang, and J. Wang ProcMEM: learning reusable procedural memory from experience via non-parametric ppo for llm agents. External Links: 2602.01869, [Link](https://arxiv.org/abs/2602.01869) Cited by: [§1](#S1.SS0.SSS0.Px2.p1.1 "Motivation. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Muennighoff et al. (2025) N. Muennighoff, Z. Yang, W. Shi, X. L. Li, L. Fei-Fei, H. Hajishirzi, L. Zettlemoyer, P. Liang, E. Candès, and T. Hashimoto S1: simple test-time scaling. External Links: 2501.19393, [Link](https://arxiv.org/abs/2501.19393) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- OpenAI (2025) OpenAI Introducing codex. Note: Product announcementPublished: 2025-05-16. Accessed: 2026-03-13 External Links: [Link](https://openai.com/index/introducing-codex/) Cited by: [§3.2](#S3.SS2.p1.1 "3.2 Instantiation ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses").
- OpenAI (2026a) OpenAI Harness engineering: leveraging codex in an agent-first world. Note: Engineering blogPublished: 2026-02-11. Accessed: 2026-03-13 External Links: [Link](https://openai.com/index/harness-engineering/) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- OpenAI (2026b) OpenAI Introducing gpt-5.4. Note: Product announcementPublished: 2026-03-05. Accessed: 2026-03-13 External Links: [Link](https://openai.com/index/introducing-gpt-5-4/) Cited by: [§3.2](#S3.SS2.p1.1 "3.2 Instantiation ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses"), [§3.4](#S3.SS4.p1.1 "3.4 Experimental setup ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses").
- OpenAI (2026c) OpenAI Multi-agents. Note: Documentation pageAccessed: 2026-03-10 External Links: [Link](https://developers.openai.com/codex/multi-agent/) Cited by: [§2.2](#S2.SS2.p2.1 "2.2 Intelligent Harness Runtime ‣ 2 Methodology ‣ Natural-Language Agent Harnesses").
- OpenClaw (2026) OpenClaw Lobster. Note: GitHub repositoryFirst public repository commit: 2026-01-17; Accessed: 2026-03-11 External Links: [Link](https://github.com/openclaw/lobster) Cited by: [§6](#S6.SS0.SSS0.Px3.p1.1 "Natural language to workflows, constraints, and enforcement. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- OpenProse (2026) OpenProse OpenProse. Note: GitHub repositoryFirst public repository commit: 2026-01-03; Accessed: 2026-03-11 External Links: [Link](https://github.com/openprose/prose) Cited by: [§6](#S6.SS0.SSS0.Px3.p1.1 "Natural language to workflows, constraints, and enforcement. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- PinchBench (2026) PinchBench PinchBench. Note: GitHub repositoryAccessed: 2026-03-08 External Links: [Link](https://github.com/pinchbench/skill) Cited by: [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Sharma (2026) R. K. Sharma ContextCov: deriving and enforcing executable constraints from agent instruction files. External Links: 2603.00822, [Link](https://arxiv.org/abs/2603.00822) Cited by: [§6](#S6.SS0.SSS0.Px3.p1.1 "Natural language to workflows, constraints, and enforcement. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Shi et al. (2025) Y. Shi, S. Cai, Z. Xu, Y. Qin, G. Li, H. Shao, J. Chen, D. Yang, K. Li, and X. Sun FlowAgent: achieving compliance and flexibility for workflow agents. External Links: 2502.14345, [Link](https://arxiv.org/abs/2502.14345) Cited by: [§1](#S1.SS0.SSS0.Px1.p1.1 "Problem. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px3.p1.1 "Natural language to workflows, constraints, and enforcement. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Shinn et al. (2023) N. Shinn, F. Cassano, E. Berman, A. Gopinath, K. Narasimhan, and S. Yao Reflexion: language agents with verbal reinforcement learning. External Links: 2303.11366, [Link](https://arxiv.org/abs/2303.11366) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Su et al. (2026) J. Su, R. Fang, Y. Li, X. Wang, S. Cai, P. Xie, N. Zhang, and F. Yuan U-fold: dynamic intent-aware context folding for user-centric agents. External Links: 2601.18285, [Link](https://arxiv.org/abs/2601.18285) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§2.4](#S2.SS4.p1.1 "2.4 File-backed state as an explicit module ‣ 2 Methodology ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Sun et al. (2025) W. Sun, M. Lu, Z. Ling, K. Liu, X. Yao, Y. Yang, and J. Chen Scaling long-horizon llm agent via context-folding. External Links: 2510.11967, [Link](https://arxiv.org/abs/2510.11967) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§2.4](#S2.SS4.p1.1 "2.4 File-backed state as an explicit module ‣ 2 Methodology ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Tang et al. (2026a) J. Tang, S. Liu, Z. Zhang, Q. Lv, R. Zhao, T. Lu, L. Liu, H. Chen, Y. Yuan, H. Zheng, W. Su, and B. Zheng Read as human: compressing context via parallelizable close reading and skimming. External Links: 2602.01840, [Link](https://arxiv.org/abs/2602.01840) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Tang et al. (2025) J. Tang, J. Xu, T. Lu, Z. Zhang, Y. Zhao, L. Hai, and H. Zheng Perception compressor: a training-free prompt compression framework in long context scenarios. External Links: 2409.19272, [Link](https://arxiv.org/abs/2409.19272) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Tang et al. (2026b) J. Tang, Z. Zhang, S. Wu, J. Ye, L. Bai, Z. Wang, T. Lu, L. Hai, Y. Zhao, H. Zheng, and H. Kim GMSA: enhancing context compression via group merging and layer semantic alignment. External Links: 2505.12215, [Link](https://arxiv.org/abs/2505.12215) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Team et al. (2025) T. R. Team, P. Gao, Z. Tian, X. Meng, X. Wang, R. Hu, Y. Xiao, Y. Liu, Z. Zhang, J. Chen, C. Gao, Y. Lin, Y. Xiong, C. Peng, and X. Liu Trae agent: an llm-based agent for software engineering with test-time scaling. External Links: 2507.23370, [Link](https://arxiv.org/abs/2507.23370) Cited by: [§3.3](#S3.SS3.SSS0.Px1.p1.1 "Coding. ‣ 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses").
- Wang et al. (2024a) G. Wang, Z. Sun, Z. Gong, S. Ye, Y. Chen, Y. Zhao, Q. Liang, and D. Hao Do advanced language models eliminate the need for prompt engineering in software engineering?. External Links: 2411.02093, [Link](https://arxiv.org/abs/2411.02093) Cited by: [§5](#S5.SS0.SSS0.Px2.p1.1 "Why natural language still matters. ‣ 5 Discussion ‣ Natural-Language Agent Harnesses").
- Wang et al. (2025a) H. Wang, C. M. Poskitt, and J. Sun AgentSpec: customizable runtime enforcement for safe and reliable llm agents. External Links: 2503.18666, [Link](https://arxiv.org/abs/2503.18666) Cited by: [§1](#S1.SS0.SSS0.Px1.p1.1 "Problem. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px3.p1.1 "Natural language to workflows, constraints, and enforcement. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Wang et al. (2025b) S. Wang, Z. Tan, Z. Chen, S. Zhou, T. Chen, and J. Li AnyMAC: cascading flexible multi-agent collaboration via next-agent prediction. In Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing, C. Christodoulopoulos, T. Chakraborty, C. Rose, and V. Peng (Eds.), Suzhou, China, pp. 11555–11567. External Links: [Link](https://aclanthology.org/2025.emnlp-main.584/), [Document](https://dx.doi.org/10.18653/v1/2025.emnlp-main.584), ISBN 979-8-89176-332-6 Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Wang et al. (2024b) X. Wang, Y. Chen, L. Yuan, Y. Zhang, Y. Li, H. Peng, and H. Ji Executable code actions elicit better llm agents. External Links: 2402.01030, [Link](https://arxiv.org/abs/2402.01030) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Wang et al. (2025c) Z. Wang, Y. Wang, X. Liu, L. Ding, M. Zhang, J. Liu, and M. Zhang AgentDropout: dynamic agent elimination for token-efficient and high-performance LLM-based multi-agent collaboration. In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), W. Che, J. Nabende, E. Shutova, and M. T. Pilehvar (Eds.), Vienna, Austria, pp. 24013–24035. External Links: [Link](https://aclanthology.org/2025.acl-long.1170/), [Document](https://dx.doi.org/10.18653/v1/2025.acl-long.1170), ISBN 979-8-89176-251-0 Cited by: [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Xia et al. (2025) C. S. Xia, Z. Wang, Y. Yang, Y. Wei, and L. Zhang Live-swe-agent: can software engineering agents self-evolve on the fly?. External Links: 2511.13646, [Link](https://arxiv.org/abs/2511.13646) Cited by: [§3.3](#S3.SS3.SSS0.Px1.p1.1 "Coding. ‣ 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Xia et al. (2026) P. Xia, J. Chen, H. Wang, J. Liu, K. Zeng, Y. Wang, S. Han, Y. Zhou, X. Zhao, H. Chen, Z. Zheng, C. Xie, and H. Yao SkillRL: evolving agents via recursive skill-augmented reinforcement learning. External Links: 2602.08234, [Link](https://arxiv.org/abs/2602.08234) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Xie et al. (2024) T. Xie, D. Zhang, J. Chen, X. Li, S. Zhao, R. Cao, T. J. Hua, Z. Cheng, D. Shin, F. Lei, Y. Liu, Y. Xu, S. Zhou, S. Savarese, C. Xiong, V. Zhong, and T. Yu OSWorld: benchmarking multimodal agents for open-ended tasks in real computer environments. In Advances in Neural Information Processing Systems, A. Globerson, L. Mackey, D. Belgrave, A. Fan, U. Paquet, J. Tomczak, and C. Zhang (Eds.), Vol. 37, pp. 52040–52094. External Links: [Document](https://dx.doi.org/10.52202/079017-1650), [Link](https://proceedings.neurips.cc/paper_files/paper/2024/file/5d413e48f84dc61244b6be550f1cd8f5-Paper-Datasets_and_Benchmarks_Track.pdf) Cited by: [§3.3](#S3.SS3.SSS0.Px2.p1.1 "Computer use. ‣ 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses").
- Yang et al. (2026) B. Yang, K. Jin, Z. Wu, Z. Liu, Q. Sun, Z. Li, J. Xie, Z. Liu, F. Xu, K. Cheng, Q. Li, Y. Wang, Y. Qiao, Z. Wang, and Z. Ding OS-symphony: a holistic framework for robust and generalist computer-using agent. External Links: 2601.07779, [Link](https://arxiv.org/abs/2601.07779) Cited by: [§3.3](#S3.SS3.SSS0.Px2.p1.1 "Computer use. ‣ 3.3 Benchmarks and harness families ‣ 3 Experimental Design ‣ Natural-Language Agent Harnesses").
- Yao et al. (2023) S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. R. Narasimhan, and Y. Cao ReAct: synergizing reasoning and acting in language models. In The Eleventh International Conference on Learning Representations, External Links: [Link](https://openreview.net/forum?id=WE_vluYUL-X) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Ye et al. (2026) H. Ye, X. He, V. Arak, H. Dong, and G. Song Meta context engineering via agentic skill evolution. External Links: 2601.21557, [Link](https://arxiv.org/abs/2601.21557) Cited by: [§1](#S1.SS0.SSS0.Px2.p1.1 "Motivation. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Yue et al. (2025) Y. Yue, G. Zhang, B. Liu, G. Wan, K. Wang, D. Cheng, and Y. Qi MasRouter: learning to route LLMs for multi-agent systems. In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), W. Che, J. Nabende, E. Shutova, and M. T. Pilehvar (Eds.), Vienna, Austria, pp. 15549–15572. External Links: [Link](https://aclanthology.org/2025.acl-long.757/), [Document](https://dx.doi.org/10.18653/v1/2025.acl-long.757), ISBN 979-8-89176-251-0 Cited by: [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Zhan et al. (2026a) S. Zhan, Y. Lai, Z. Liu, H. Lin, S. Li, X. Cai, Z. Lin, W. Huang, and H. Zheng 3ViewSense: spatial and mental perspective reasoning from orthographic views in vision-language models. External Links: 2603.07751, [Link](https://arxiv.org/abs/2603.07751) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Zhan et al. (2026b) S. Zhan, Y. Lai, Z. Lu, D. Lin, Z. Yang, and F. Tan MathSmith: towards extremely hard mathematical reasoning by forging synthetic problems with a reinforced policy. External Links: 2508.05592, [Link](https://arxiv.org/abs/2508.05592) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses").
- Zhang et al. (2026) H. Zhang, Q. Long, J. Bao, T. Feng, W. Zhang, H. Yue, and W. Wang MemSkill: learning and evolving memory skills for self-evolving agents. External Links: 2602.02474, [Link](https://arxiv.org/abs/2602.02474) Cited by: [§1](#S1.SS0.SSS0.Px2.p1.1 "Motivation. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px5.p1.1 "Reusable instruction carriers and skills. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Zhang et al. (2025) Y. Zhang, H. Yu, L. Hu, H. Jin, and H. Zhang General modular harness for llm agents in multi-turn gaming environments. External Links: 2507.11633, [Link](https://arxiv.org/abs/2507.11633) Cited by: [§1](#S1.SS0.SSS0.Px1.p1.1 "Problem. ‣ 1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px4.p1.1 "Harness engineering in practice and automatic harness synthesis. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Zheng et al. (2025) C. Zheng, J. Chen, Y. Lyu, W. Z. T. Ng, H. Zhang, Y. Ong, I. Tsang, and H. Yin MermaidFlow: redefining agentic workflow generation via safety-constrained evolutionary programming. External Links: 2505.22967, [Link](https://arxiv.org/abs/2505.22967) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ Natural-Language Agent Harnesses"), [§6](#S6.SS0.SSS0.Px2.p1.1 "Agent control patterns and orchestration. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").
- Zheng et al. (2024) L. Zheng, L. Yin, Z. Xie, C. Sun, J. Huang, C. H. Yu, S. Cao, C. Kozyrakis, I. Stoica, J. E. Gonzalez, C. Barrett, and Y. Sheng SGLang: efficient execution of structured language model programs. In Proceedings of the 38th International Conference on Neural Information Processing Systems, NIPS ’24, Red Hook, NY, USA. External Links: ISBN 9798331314385 Cited by: [§6](#S6.SS0.SSS0.Px1.p1.1 "Prompts as programs and LLM programming systems. ‣ 6 Related Work ‣ Natural-Language Agent Harnesses").

## Appendix A From model calls to agent calls

A multimodal LLM can be viewed as a mapping from context $`c`$ to output $`y`$, where the context may include text, images, or video:

|     |                             |     |
|-----|-----------------------------|-----|
|     |                             
       ``` math                     
       y=\operatorname{LM}_{m}(c).  
       ```                          |     |

To support tool use, we assume a structured action format that can invoke external tools.

We lift a base model call into an *agent call*. We define a task as

|     |                             |     |
|-----|-----------------------------|-----|
|     |                             
       ``` math                     
       T=(p,F_{\text{in}},\kappa),  
       ```                          |     |

where $`p`$ is the task prompt, $`F_{\text{in}}`$ is the set of input files or linked resources, and $`\kappa`$ is an execution contract (required outputs, budget, permission scope, completion conditions, designated output paths).

An agent call is

|  |  |  |
|----|----|----|
|  | 
``` math
\operatorname{AgentCall}(T,\Omega_{t}^{\mathrm{in}})=(A_{t},\Delta\Omega_{t},y_{t}),
``` |  |

where $`\Omega_{t}^{\mathrm{in}}`$ is the visible environment and file state at call start, $`A_{t}`$ is the designated artifact set, $`\Delta\Omega_{t}`$ are environment modifications, and $`y_{t}`$ is a normalized final response pointing to artifacts and stating success or failure. A single model call is a degenerate special case where $`\kappa`$ enforces one-shot answering with no external action.

## Appendix B Canonical workspace for file-backed state

The file-backed module treats a canonical workspace as the authoritative carrier of durable cross-step state.

Canonical workspace\
run/      TASK.md      harness-skill/        SKILL.md        references/        scripts/      state/        task_history.jsonl      children/        001/        TASK.md        SKILL.md        inputs/        scripts/        scratch/        RESPONSE.md        artifacts/      RESPONSE.md      artifacts/

|  Abstract object |  Example carrier |  Role |
|----|----|----|
|  Task object |  TASK.md |  Run-local task statement, linked inputs, designated outputs |
|  Run-level final response |  RESPONSE.md, children/\*/RESPONSE.md |  Normalized outcome together with success or failure status and artifact pointers |
|  Harness skill |  harness-skill/SKILL.md, harness-skill/references/, harness-skill/scripts/ |  Task-family control logic together with reusable references and scripts |
|  Task history |  state/ task_history.jsonl |  Append-only record of child invocations and state promotions used to recover active runtime state |
|  Child workspace |  children/\*/TASK.md, children/\*/SKILL.md, children/\*/inputs/, children/\*/scripts/, children/\*/scratch/, children/\*/artifacts/ |  Child-local task packet, copied inputs, tools, scratch space, and local artifacts |
|  Final artifacts |  artifacts/ |  Benchmark-facing outputs and designated deliverables |

Table 6: Canonical workspace layout and file-role mapping for file-backed state.

## Appendix C Outline of the shared runtime skill

The fixed runtime skill used in IHR is not a benchmark-specific harness. It encodes the shared runtime charter that makes different harness skills executable under a common substrate. In operational terms, the charter enforces five ideas:

- •
  Runtime-only parent role. The top-level agent is an orchestrator rather than the direct worker, so even a nominally single-agent harness is realized as “parent runtime + one task child.” This keeps substantive workspace work inside child agents and makes delegation boundaries inspectable.
- •
  Minimal delegated baseline. If no harness skill is loaded, or if the loaded skills are incomplete, the runtime first constructs the thinnest runnable baseline from the benchmark contract and then treats extra skills as overlays on that baseline. This is the shared substrate behind the RQ1 “w/o harness skill” condition.
- •
  Call-graph recovery with explicit context semantics. The runtime reconstructs roles, stages, repetition structure, and independence requirements from the skill text, and then realizes them as child-agent launches. fork_context=true means that a child forks and inherits the parent’s accumulated conversational context. fork_context=false means that a child starts from a fresh, independent, clean context and receives only the minimal task packet explicitly handed to it. Together with disposable one-shot children and fresh children for independent branches, this preserves the original harness’s model-call boundaries instead of collapsing everything into one long dialogue.
- •
  Separated runtime state and final artifacts. Durable intermediate state is written under STATE_ROOT (default /sa-output/runtime) only when needed for reuse or auditability, while judgeable deliverables go to /sa-output/artifacts. This lets the runtime expose stable evidence surfaces without mirroring the entire task workspace.
- •
  Contract-first completion and auditability. Benchmark outputs and completion gates remain the primary contract, but the runtime must leave inspectable evidence when a harness claims staged or multi-role execution. As a result, removing the runtime skill in RQ1 removes a shared layer of orchestration, context, artifact, and reporting discipline rather than merely deleting extra prompt text.

## Appendix D Supplementary RQ1 case notes

Table [7](#A4.T7 "Table 7 ‣ Appendix D Supplementary RQ1 case notes ‣ Natural-Language Agent Harnesses") lists representative SWE cases that shape our RQ1 interpretation. The goal is not exhaustive error taxonomy. Instead, the table isolates a few component-sensitive samples that expose the main mechanisms behind the paired flips: moderate structure helping, over-expanded search hurting, direct-path over-structuring, and local-verifier mismatch.

|  Sample |  Outcome pattern |  Main lesson |
|----|----|----|
|  matplotlib\_\_ matplotlib-24570 |  Live-SWE Full resolves, but Live-SWE without the runtime skill, the shared baseline, and TRAE Full all fail. |  A moderate delegated topology can help on some boundary cases, but the same sample also shows that a much heavier candidate-search topology can overshoot the task. |
|  django\_\_ django-14404 |  Live-SWE Full fails, while lighter coding conditions resolve the task. |  Some local repository repairs favor the shortest direct patch path, so extra workflow structure can add friction instead of robustness. |
|  sympy\_\_ sympy-23950 |  The heavier Full conditions fail, while lighter structured conditions resolve. |  Component value is task-dependent: additional orchestration is not uniformly helpful when the bug mainly requires a tight local repair loop. |
|  django\_\_ django-13406 |  Structured runs report successful local revalidation, yet the official evaluator still fails. |  Local acceptance layers can diverge from the benchmark’s final acceptance object, so extra verification structure is only useful when it stays aligned with evaluator behavior. |

Table 7: Representative component-sensitive SWE cases for RQ1.

## Appendix E Supplementary RQ2 analysis

Figure [4](#A5.F4 "Figure 4 ‣ Appendix E Supplementary RQ2 analysis ‣ Natural-Language Agent Harnesses") adds two complementary views for SWE RQ2. Estimated API cost uses the public GPT-5.4 text-token rates on OpenAI’s API pricing page as accessed on March 26, 2026 ($`2.50/Minputand`$15.00/M output).¹¹ 1 [https://openai.com/api/pricing/](https://openai.com/api/pricing/) Because our logs only expose aggregate prompt and completion totals, we exclude cached-input discounts, context-length surcharges above 270K, and tool or container fees.

The left panel separates the modules more clearly than the score table alone. Self-evolution is the only module that moves upward without moving far right, which matches the claim that it tightens the solve loop rather than simply buying a larger search tree. File-backed state and evidence-backed answering move moderately right for only mild score gains, which is consistent with process-structure benefits rather than large correctness gains. Verifier and especially multi-candidate search are dominated in this view, while dynamic orchestration stays near Basic in score but not in cost.

The right panel explains why some score-neutral or slightly negative modules are still behaviorally interesting. Dynamic orchestration and verifier still enlarge the Basic union solved set even when their standalone score is weak, so they change which boundary cases are recoverable rather than merely leaving behavior unchanged.

Figure 4: Supplementary views for SWE RQ2. Left: resolved rate versus estimated token-based API cost per sample under public GPT-5.4 text pricing. Right: standalone solved rate and union solved rate with Basic for each ablated module.

#### Self-evolution positive case: scikit-learn\_\_scikit-learn-25747.

Basic fails this sample, but self-evolution resolves it. The trajectory organizes the run around an explicit attempt contract in which Attempt 1 is treated as successful only if the task acceptance gate is satisfied. In this case, the system closes the run after Attempt 1 rather than expanding into a larger retry tree, and the evaluator confirms that the final patch fixes the target FAIL_TO_PASS tests. This is the favorable regime for self-evolution: the extra structure makes the first repair attempt more disciplined and better aligned with the benchmark gate.

#### File/evidence positive case: mwaskom\_\_seaborn-3069.

Basic fails this sample, while both file-backed state and evidence-backed answering resolve it. Under file-backed state, the workspace leaves a durable spine consisting of a parent response, append-only task history, and manifest entries for the promoted patch artifact, which makes the child handoff and artifact lineage explicit. Under evidence-backed answering, the run produces a standalone analysis artifact that ties the patch to direct observations, root-cause reasoning, and focused validation on the nominal-axis regressions. Taken together, the pair shows that these modules are strongest when cleaner state handoff and release discipline help the solver keep one patch surface and one verification story.

#### Verifier positive case: django\_\_django-11734.

Verifier helps when the central claim can be checked independently and narrowly. In this sample, the verifier stage does more than restate the patch: it reruns targeted Django tests around OuterRef behavior, checks the resulting correlated-query behavior, and inspects whether the generated SQL binds against the outer-model columns that define the bug. The benchmark then agrees with that judgment and marks the sample resolved. This is the regime in which verifier adds value: the verifier’s local acceptance object is close to the benchmark’s final acceptance gate.

#### Shared counterexample: sympy\_\_sympy-23950.

This sample is resolved by Basic and self-evolution, but file-backed state, evidence-backed answering, verifier, dynamic orchestration, and multi-candidate search all fail it. The verifier run is especially informative because the final response explicitly says that a separate verifier reported “solved,” while the official evaluator still fails test_as_set. This is a compact example of the broader RQ2 warning sign: extra process layers can make a run more structured and locally convincing while still drifting away from the benchmark’s actual acceptance object. That is why RQ2 is better read as a study of alignment between intermediate control structure and final evaluator behavior, not as a monotonic story about adding more structure.

## Appendix F Shared modules used in RQ2

The module boxes below are concise paraphrastic summaries of the shared behaviors used in RQ2 rather than verbatim copies of the original skill text.

[⬇](data:text/plain;base64,Uk9PVDogQ2hvb3NlIFNUQVRFX1JPT1QgdW5kZXIgL3NhLW91dHB1dCwga2VlcCBpdCBzZXBhcmF0ZSBmcm9tIHRoZSBvcmlnaW5hbCB0YXNrIHdvcmtzcGFjZSwgYW5kIG1haW50YWluIFNUQVRFX1JPT1QvUkVTUE9OU0UubWQgYXMgdGhlIHN0YWJsZSBydW50aW1lLWxldmVsIHN0YXR1cyBmaWxlLgpIQU5ET0ZGOiBObyBwcm9tcHQsIHJvbGUgaW5zdHJ1Y3Rpb24sIHJlcGx5LCBvciBwcm9tb3RlZCBhcnRpZmFjdCBjb3VudHMgYXMgdHJhbnNmZXJyZWQgdW50aWwgaXQgZXhpc3RzIGFzIFRBU0subWQsIFNLSUxMLm1kLCBSRVNQT05TRS5tZCwgb3IgYW5vdGhlciBuYW1lZCBmaWxlIHVuZGVyIFNUQVRFX1JPT1QuCkNISUxEIFBBQ0tFVDogRWFjaCBsYXVuY2hlZCBjaGlsZCByZWNlaXZlcyBjaGlsZHJlbi88aWQ+L1RBU0subWQsIG9wdGlvbmFsIGNoaWxkcmVuLzxpZD4vU0tJTEwubWQsIGFuZCB3cml0ZXMgYmFjayBjaGlsZHJlbi88aWQ+L1JFU1BPTlNFLm1kLgpCT09LS0VFUElORzogS2VlcCBhcHBlbmQtb25seSBsYXVuY2ggYW5kIHByb21vdGlvbiBoaXN0b3J5IGluIHN0YXRlL3Rhc2tfaGlzdG9yeS5qc29ubCwgaW5kZXggcHJvbW90ZWQgb3V0cHV0cyBpbiBhcnRpZmFjdHMvbWFuaWZlc3QuanNvbiwgYW5kIHJlb3BlbiBmaWxlcyBieSBwYXRoIGZvciByZXVzZSBhbmQgcmVjb3Zlcnku)

ROOT: Choose STATE_ROOT under /sa-output, keep it separate from the original task workspace, and maintain STATE_ROOT/RESPONSE.md as the stable runtime-level status file.

HANDOFF: No prompt, role instruction, reply, or promoted artifact counts as transferred until it exists as TASK.md, SKILL.md, RESPONSE.md, or another named file under STATE_ROOT.

CHILD PACKET: Each launched child receives children/\<id\>/TASK.md, optional children/\<id\>/SKILL.md, and writes back children/\<id\>/RESPONSE.md.

BOOKKEEPING: Keep append-only launch and promotion history in state/task_history.jsonl, index promoted outputs in artifacts/manifest.json, and reopen files by path for reuse and recovery.

[⬇](data:text/plain;base64,QVJUSUZBQ1Q6IEJlZm9yZSBhbnkgZmluYWwgYW5zd2VyLCBmaW5hbCBwYXRjaCwgb3Igc29sdmVkIGNsYWltLCB3cml0ZSBvbmUgc3RhbmRhbG9uZSBldmlkZW5jZSBkb2N1bWVudCBhcyB0aGUgZGVzaWduYXRlZCBldmlkZW5jZSBhcnRpZmFjdCBmb3IgdGhlIGN1cnJlbnQgdGFzayBvciBzdGFnZS4KU1RSVUNUVVJFOiBDb3ZlciB0aGUgcHJvYmxlbSBzdGF0ZW1lbnQsIHJlbGV2YW50IG1hdGVyaWFscywgb2JzZXJ2ZWQgc3ltcHRvbXMsIHJvb3QgY2F1c2UsIGNhbmRpZGF0ZSByZXNvbHV0aW9uLCB2YWxpZGF0aW9uLCBhbmQgcmVzaWR1YWwgdW5jZXJ0YWludHkuCkNMQUlNIERJU0NJUExJTkU6IEVhY2ggbWFqb3IgY2xhaW0gbXVzdCBzdGF0ZSBpdHMgcHJvdmVuYW5jZSwgd2hldGhlciBpdCBpcyBkaXJlY3Qgb2JzZXJ2YXRpb24gb3IgaW5mZXJlbmNlLCBhbmQgdGhlIG1pbmltYWwgc3VwcG9ydGluZyBzcGFuIG9yIG91dHB1dCBzZWdtZW50IHdoZW4gYXZhaWxhYmxlLgpHQVRFOiBEbyBub3QgcmVsZWFzZSBhIGNvbXBsZXRlIGFuc3dlciB3aGlsZSByZWxlYXNlLWNyaXRpY2FsIGNsYWltcyByZW1haW4gdW5jaXRlZCwgY29udHJhZGljdGVkLCBvciBtYXRlcmlhbGx5IGluY29tcGxldGUgaW4gdGhhdCBldmlkZW5jZSBkb2N1bWVudC4=)

ARTIFACT: Before any final answer, final patch, or solved claim, write one standalone evidence document as the designated evidence artifact for the current task or stage.

STRUCTURE: Cover the problem statement, relevant materials, observed symptoms, root cause, candidate resolution, validation, and residual uncertainty.

CLAIM DISCIPLINE: Each major claim must state its provenance, whether it is direct observation or inference, and the minimal supporting span or output segment when available.

GATE: Do not release a complete answer while release-critical claims remain uncited, contradicted, or materially incomplete in that evidence document.

[⬇](data:text/plain;base64,Uk9MRTogVmVyaWZpZXIgaW5zcGVjdHMgb25lIGNhbmRpZGF0ZSBhbnN3ZXIgYWdhaW5zdCB0aGUgb3JpZ2luYWwgcHJvYmxlbSBhbmQgdGhlIGxpZ2h0ZXN0IHN1ZmZpY2llbnQgdGFzayBtYXRlcmlhbHMgbmVlZGVkIHRvIGNoZWNrIGl0LgpQUk9DRURVUkU6IElkZW50aWZ5IHRoZSBjYW5kaWRhdGUncyBjbGFpbSwgYnJlYWsgaXQgaW50byBjaGVja2FibGUgc3ViY2xhaW1zLCBhdWRpdCBjb21wbGV0ZW5lc3MsIGZhY3R1YWwgY29ycmVjdG5lc3MsIGFuZCBsb2dpY2FsIGNvcnJlY3RuZXNzLCBhbmQgcnVuIGF0IGxlYXN0IG9uZSBjZW50cmFsIGluZGVwZW5kZW50IGNoZWNrIHdoZW4gZmVhc2libGUuCk9VVFBVVDogUmV0dXJuIGV4YWN0bHkgb25lIHByaW1hcnkgdmVyZGljdCBsYWJlbCBwbHVzIGEgcmVwb3J0IHRoYXQgZXhwbGFpbnMgdGhlIHZlcmRpY3QsIG5hbWVzIHRoZSBjaGVja3MgcnVuIG9yIGJsb2NrZWQsIGFuZCBkb2VzIG5vdCByZXBhaXIgdGhlIGNhbmRpZGF0ZSBvbiBpdHMgYmVoYWxmLg==)

ROLE: Verifier inspects one candidate answer against the original problem and the lightest sufficient task materials needed to check it.

PROCEDURE: Identify the candidate’s claim, break it into checkable subclaims, audit completeness, factual correctness, and logical correctness, and run at least one central independent check when feasible.

OUTPUT: Return exactly one primary verdict label plus a report that explains the verdict, names the checks run or blocked, and does not repair the candidate on its behalf.

[⬇](data:text/plain;base64,TE9PUDogUnVuIGFuIGV4cGxpY2l0IHJldHJ5IGxvb3Agd2l0aCBhIHJlYWwgYmFzZWxpbmUgYXR0ZW1wdCBmaXJzdCBhbmQgYSBkZWZhdWx0IGNhcCBvZiBmaXZlIGF0dGVtcHRzIHVubGVzcyB0aGUgdGFzayBzcGVjaWZpZXMgb3RoZXJ3aXNlLgpUUklHR0VSOiBBZnRlciBldmVyeSBub24tc3VjY2Vzc2Z1bCwgcGFydGlhbGx5IHN1Y2Nlc3NmdWwsIHVuc3RhYmxlLCBvciBzdGFsbGVkIGF0dGVtcHQsIHJlZmxlY3Qgb24gY29uY3JldGUgZmFpbHVyZSBzaWduYWxzIGJlZm9yZSBwbGFubmluZyB0aGUgbmV4dCBhdHRlbXB0LgpBWEVTOiBSZWRlc2lnbiB0aGUgbmV4dCBhdHRlbXB0IGFsb25nIHByb21wdCwgdG9vbCwgYW5kIHdvcmtmbG93IGV2b2x1dGlvbiwgYW5kIG1ha2UgYXR0ZW1wdCAyIG1hdGVyaWFsbHkgcmVmbGVjdCB0aGUgcmVmbGVjdGlvbiBmcm9tIGF0dGVtcHQgMS4KU1RPUDogQ29udGludWUgdW50aWwganVkZ2VkIHN1Y2Nlc3Mgb3IgdGhlIGF0dGVtcHQgY2FwIGlzIHJlYWNoZWQsIGFuZCByZXBvcnQgaW5jb21wbGV0ZSByYXRoZXIgdGhhbiBwcmV0ZW5kaW5nIHRoZSBsYXN0IGF0dGVtcHQgcGFzc2VkLg==)

LOOP: Run an explicit retry loop with a real baseline attempt first and a default cap of five attempts unless the task specifies otherwise.

TRIGGER: After every non-successful, partially successful, unstable, or stalled attempt, reflect on concrete failure signals before planning the next attempt.

AXES: Redesign the next attempt along prompt, tool, and workflow evolution, and make attempt 2 materially reflect the reflection from attempt 1.

STOP: Continue until judged success or the attempt cap is reached, and report incomplete rather than pretending the last attempt passed.

[⬇](data:text/plain;base64,QlVER0VUOiBVc2UgYW4gZXhwbGljaXQgY2FuZGlkYXRlIGJ1ZGdldCBLLCBkZWZhdWx0aW5nIHRvIEs9NSB3aGVuIHVuc3BlY2lmaWVkLCBhbmQgcmVzdG9yZSBsb3N0IGJ1ZGdldCBpZiBhIGJyYW5jaCBjcmFzaGVzIGJlZm9yZSByZXR1cm5pbmcgY29tcGFyYWJsZSBldmlkZW5jZS4KRElWRVJTSVRZOiBWYXJ5IHRoZSBjb3JlIGh5cG90aGVzaXMsIGRlY29tcG9zaXRpb24sIGV2aWRlbmNlIHJvdXRlLCB0b29sIHBsYW4sIG9yIHJpc2sgcHJlZmVyZW5jZSBzbyBjYW5kaWRhdGVzIGFyZSBub3QgbmVhci1kdXBsaWNhdGVzLgpTRUxFQ1RJT046IFBydW5lIGR1cGxpY2F0ZXMsIHVuc3VwcG9ydGVkLCBkb21pbmF0ZWQsIG9yIG92ZXJseSByaXNreSBicmFuY2hlcywgdGhlbiBjb21wYXJlIHN1cnZpdm9ycyBvbiB0YXNrIGZpdCwgZXZpZGVuY2UgcXVhbGl0eSwgY29oZXJlbmNlLCBhbmQgcmVwYWlyIGNvc3QuCkVTQ0FMQVRJT046IElmIG5vIGNhbmRpZGF0ZSBpcyBnb29kIGVub3VnaCwgZXhwYW5kIG9yIHJlZGVzaWduIHRoZSBzZWFyY2ggaW5zdGVhZCBvZiBmb3JjaW5nIGEgZnJhZ2lsZSB3aW5uZXIu)

BUDGET: Use an explicit candidate budget K, defaulting to K=5 when unspecified, and restore lost budget if a branch crashes before returning comparable evidence.

DIVERSITY: Vary the core hypothesis, decomposition, evidence route, tool plan, or risk preference so candidates are not near-duplicates.

SELECTION: Prune duplicates, unsupported, dominated, or overly risky branches, then compare survivors on task fit, evidence quality, coherence, and repair cost.

ESCALATION: If no candidate is good enough, expand or redesign the search instead of forcing a fragile winner.

[⬇](data:text/plain;base64,QVVUT05PTVk6IEJleW9uZCB0aGUgbWFuZGF0b3J5IHRhc2stb3duaW5nIGNoaWxkLCBhZGQgZXh0cmEgc3ViYWdlbnRzIG9ubHkgd2hlbiBkZWxlZ2F0aW9uIG1hdGVyaWFsbHkgaW1wcm92ZXMgY292ZXJhZ2UsIGxhdGVuY3ksIHNwZWNpYWxpc3QgZm9jdXMsIG9yIHF1YWxpdHkgY29udHJvbCwgYW5kIHByZWZlciB0aGUgc21hbGxlc3QgYWRlcXVhdGUgdG9wb2xvZ3kuClRPUE9MT0dZOiBDbGFzc2lmeSB0aGUgdGFzayBzaGFwZSwgYXNzaWduIGVhY2ggY2hpbGQgYSBub24tb3ZlcmxhcHBpbmcgcmVzcG9uc2liaWxpdHkgYW5kIHN1Y2Nlc3MgY29uZGl0aW9uLCBhbmQgcGFyYWxsZWxpemUgb25seSBnZW51aW5lbHkgaW5kZXBlbmRlbnQgYnJhbmNoZXMuClBBUkVOVCBST0xFOiBPbmNlIGEgZGVsZWdhdGVkIHRvcG9sb2d5IGlzIGNob3NlbiwgdGhlIHBhcmVudCBzaG91bGQgbmFycmF0ZSBsYXVuY2hlcywgd2FpdHMsIGNvbXBhcmlzb25zLCBhbmQgaW50ZWdyYXRpb24gcmF0aGVyIHRoYW4gY2hpbGQtb3duZWQgc3Vic3RhbnRpdmUgYWN0aW9ucy4KQk9VTkRBUlk6IERpcmVjdCB0YXNrLXdvcmtzcGFjZSBmYW1pbGlhcml6YXRpb24gb3IgcmVwb3NpdG9yeSBwcm9iaW5nIGJlbG9uZ3MgdG8gY2hpbGQgcm9sZXMgYWZ0ZXIgY29tbWl0bWVudCB0byBkZWxlZ2F0ZWQgZXhlY3V0aW9uLCBub3QgdG8gdGhlIHBhcmVudC4=)

AUTONOMY: Beyond the mandatory task-owning child, add extra subagents only when delegation materially improves coverage, latency, specialist focus, or quality control, and prefer the smallest adequate topology.

TOPOLOGY: Classify the task shape, assign each child a non-overlapping responsibility and success condition, and parallelize only genuinely independent branches.

PARENT ROLE: Once a delegated topology is chosen, the parent should narrate launches, waits, comparisons, and integration rather than child-owned substantive actions.

BOUNDARY: Direct task-workspace familiarization or repository probing belongs to child roles after commitment to delegated execution, not to the parent.

Experimental support, please [view the build logs](./2603.25723v1/__stdout.txt) for errors. Generated by [ L A T E xml ![\[LOGO\]](/Users/junjian/GitHub/wang-junjian/wikillm/.scratch/harness-batch-2/media/Natural-Language Agent Harnesses/055b977d0a6a655149fabb1dc4ed16049b0af31f.png)](https://math.nist.gov/~BMiller/LaTeXML/) .

## Instructions for reporting errors

We are continuing to improve HTML versions of papers, and your feedback helps enhance accessibility and mobile support. To report errors in the HTML that will help us improve conversion and rendering, choose any of the methods listed below:

- Click the "Report Issue" (![[Natural-Language Agent Harnesses-a556641380f7b97e2e131566a80a75ad0f230978.svg]]) button, located in the page header.

**Tip:** You can select the relevant text first, to include it in your report.

Our team has already identified [the following issues](https://github.com/arXiv/html_feedback/issues). We appreciate your time reviewing and reporting rendering errors we may not have found yet. Your efforts will help us improve the HTML versions for all readers, because disability should not be a barrier to accessing research. Thank you for your continued support in championing open access for all.

Have a free development cycle? Help support accessibility at arXiv! Our collaborators at LaTeXML maintain a [list of packages that need conversion](https://github.com/brucemiller/LaTeXML/wiki/Porting-LaTeX-packages-for-LaTeXML), and welcome [developer contributions](https://github.com/brucemiller/LaTeXML/issues).

We gratefully acknowledge support from our **major funders**, [**member institutions**](https://info.arxiv.org/about/ourmembers.html), , and all contributors.

[About](https://info.arxiv.org/about) · [Help](https://info.arxiv.org/help) · [Contact](https://info.arxiv.org/help/contact.html) · [Subscribe](https://info.arxiv.org/help/subscribe) · [Copyright](https://info.arxiv.org/help/license/index.html) · [Privacy](https://info.arxiv.org/help/policies/privacy_policy.html) · [Accessibility](https://info.arxiv.org/help/web_accessibility.html) · [Operational Status (opens in new tab)](https://status.arxiv.org)

Major funding support from

[Simons Foundation](https://www.simonsfoundation.org/) [Simons Foundation International](https://www.sfi.org.bm/) [Schmidt Sciences](https://www.schmidtsciences.org/)

[![[Natural-Language Agent Harnesses-ee4fa28cc5b5a2e145a514bf2b95e569978d92fb.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")
