---
title: "HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"
source: "https://arxiv.org/html/2606.01779v1"
author:
published: 2026-06
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

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html) [![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-9460bfd162f6dd2b64933716701d8b45644b7907.svg]] Report Issue](# "Report an Issue") [![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-f4ed920725e9b5296c72053a104d078507650738.svg]] Back to Abstract](/abs/2606.01779v1 "Back to abstract page") [![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-4bbb243fc6a5e4dd4d39aba2869aefc67b826b09.svg]] Download PDF](/pdf/2606.01779v1 "Download PDF") [![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-0dba01bd0011e6490f7c1a4e47e93ab96d726eeb.svg]]](javascript:toggleNavTOC(); "Toggle navigation") [![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-98a8199842c1940bd0868e386354f161924d800b.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")

![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-80caa2dcce69c296ad0598f894738eb7727e6bba.svg]] ![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-b2ea290a36a1f7fb9e144d575314ef3789ddadf3.svg]] ![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-1aaf13981d449dba7bb168c83f444fcbda5674e4.svg]]

1.  [Abstract](#abstract1 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
2.  [1 Introduction](#S1 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
3.  [2 Related Work](#S2 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [Optimization for Agent System Design](#S2.SS0.SSS0.Px1 "In 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [Agentic RL for Policy Evolution](#S2.SS0.SSS0.Px2 "In 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
4.  [3 Methodology](#S3 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [3.1 Preliminary](#S3.SS1 "In 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Agent-System Formulation.](#S3.SS1.SSS0.Px1 "In 3.1 Preliminary ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Evaluation Criteria.](#S3.SS1.SSS0.Px2 "In 3.1 Preliminary ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [3.2 Meta-Adaptive Joint Evolution](#S3.SS2 "In 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Round Structure.](#S3.SS2.SSS0.Px1 "In 3.2 Meta-Adaptive Joint Evolution ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Overview.](#S3.SS2.SSS0.Px2 "In 3.2 Meta-Adaptive Joint Evolution ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    3.  [3.3 Fault-Guided Harness Tailoring](#S3.SS3 "In 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Fault Attribution.](#S3.SS3.SSS0.Px1 "In 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Archive-Guided Improvement.](#S3.SS3.SSS0.Px2 "In 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [Refine-and-Filter.](#S3.SS3.SSS0.Px3 "In 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    4.  [3.4 Harness-Conditioned Policy Alignment](#S3.SS4 "In 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Parent Initialization.](#S3.SS4.SSS0.Px1 "In 3.4 Harness-Conditioned Policy Alignment ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Trajectory Curation.](#S3.SS4.SSS0.Px2 "In 3.4 Harness-Conditioned Policy Alignment ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [Harness-Conditioned Evolution.](#S3.SS4.SSS0.Px3 "In 3.4 Harness-Conditioned Policy Alignment ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
5.  [4 Experiments](#S4 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [4.1 Experimental Setup](#S4.SS1 "In 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Benchmarks.](#S4.SS1.SSS0.Px1 "In 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Implementation Details.](#S4.SS1.SSS0.Px2 "In 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [Baselines.](#S4.SS1.SSS0.Px3 "In 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [4.2 Main Results](#S4.SS2 "In 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    3.  [4.3 Ablation Study](#S4.SS3 "In 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    4.  [4.4 Framework Analysis](#S4.SS4 "In 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Retained-harness sensitivity.](#S4.SS4.SSS0.Px1 "In 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Rollout-budget efficiency.](#S4.SS4.SSS0.Px2 "In 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [Adaptation necessity analysis.](#S4.SS4.SSS0.Px3 "In 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        4.  [Training-method agnosticism.](#S4.SS4.SSS0.Px4 "In 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    5.  [4.5 Case Study](#S4.SS5 "In 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
6.  [5 Conclusion](#S5 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
7.  [References](#bib "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
8.  [A Algorithm and Notation](#A1 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [A.1 Notation](#A1.SS1 "In Appendix A Algorithm and Notation ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
9.  [B Datasets Details](#A2 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [B.1 Evaluation Benchmark and Metrics](#A2.SS1 "In Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [ToolHop.](#A2.SS1.SSS0.Px1 "In B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [SearchQA.](#A2.SS1.SSS0.Px2 "In B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [RestBench-TMDB.](#A2.SS1.SSS0.Px3 "In B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        4.  [API-Bank.](#A2.SS1.SSS0.Px4 "In B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [B.2 Training & Evolution Data](#A2.SS2 "In Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    3.  [B.3 Split and Deduplication Protocol](#A2.SS3 "In Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
10. [C Harness Tailoring Details](#A3 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [C.1 Evaluator Setting](#A3.SS1 "In Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [C.2 Hyperparameter Configuration](#A3.SS2 "In Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    3.  [C.3 Harness Representation and Edit Space](#A3.SS3 "In Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    4.  [C.4 Meta Tailoring Operator and Prompt Protocol](#A3.SS4 "In Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [C.4.1 Fault-Attribution Operation](#A3.SS4.SSS1 "In C.4 Meta Tailoring Operator and Prompt Protocol ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [C.4.2 Archive-Guided Improvement](#A3.SS4.SSS2 "In C.4 Meta Tailoring Operator and Prompt Protocol ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [C.4.3 Refinement and Generation](#A3.SS4.SSS3 "In C.4 Meta Tailoring Operator and Prompt Protocol ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        4.  [C.4.4 Retry Mechanism](#A3.SS4.SSS4 "In C.4 Meta Tailoring Operator and Prompt Protocol ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        5.  [C.4.5 Filter and Archive Update](#A3.SS4.SSS5 "In C.4 Meta Tailoring Operator and Prompt Protocol ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
11. [D Policy Alignment Details](#A4 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [D.1 Policy Lineage and Adapter Operation](#A4.SS1 "In Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [D.2 Trajectory Curation and Success Filtering](#A4.SS2 "In Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    3.  [D.3 Objective Instantiations](#A4.SS3 "In Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Training-objective agnostic alignment.](#A4.SS3.SSS0.Px1 "In D.3 Objective Instantiations ‣ Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Default policy-evolution objective.](#A4.SS3.SSS0.Px2 "In D.3 Objective Instantiations ‣ Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [Policy-alignment objective agnosticism.](#A4.SS3.SSS0.Px3 "In D.3 Objective Instantiations ‣ Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
12. [E Baselines and Fairness Protocol](#A5 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [E.1 Shared Fairness Protocol](#A5.SS1 "In Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [E.2 Search-Style Baselines](#A5.SS2 "In Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Baseline-specific notes.](#A5.SS2.SSS0.Px1 "In E.2 Search-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Transfer setting for TMDB and API-Bank.](#A5.SS2.SSS0.Px2 "In E.2 Search-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    3.  [E.3 Training-Style Baselines](#A5.SS3 "In Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [SFT.](#A5.SS3.SSS0.Px1 "In E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Reward Design.](#A5.SS3.SSS0.Px2 "In E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [GRPO.](#A5.SS3.SSS0.Px3 "In E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        4.  [RLOO.](#A5.SS3.SSS0.Px4 "In E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
13. [F Reproducibility Artifacts](#A6 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [Reproducibility of Meta-Agent Harness Evolution.](#A6.SS0.SSS0.Px1 "In Appendix F Reproducibility Artifacts ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
14. [G Additional Results and Analysis](#A7 "In HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    1.  [G.1 Adaptation Necessity Analysis](#A7.SS1 "In Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    2.  [G.2 Module-Level Repair Statistics](#A7.SS2 "In Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
    3.  [G.3 Case Study](#A7.SS3 "In Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        1.  [Case 1: Multi-hop comparison.](#A7.SS3.SSS0.Px1 "In G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        2.  [Case 2: Structured API execution.](#A7.SS3.SSS0.Px2 "In G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        3.  [Case 3: Retrieval-heavy multi-hop QA.](#A7.SS3.SSS0.Px3 "In G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        4.  [Case 4: Multi-hop tool-chain execution.](#A7.SS3.SSS0.Px4 "In G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")
        5.  [Case 5: REST-style endpoint routing.](#A7.SS3.SSS0.Px5 "In G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")

[License: CC BY 4.0](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2606.01779v1 \[cs.CL\] 01 Jun 2026

# HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems

Mingju Chen Affiliation: Beijing Advanced Innovation Center for Future Blockchain and Privacy Computing    Can Lv Affiliation: Beijing Advanced Innovation Center for Future Blockchain and Privacy Computing    Guibin Zhang    Heng Chang    Shiji Zhou Affiliation: Beijing Advanced Innovation Center for Future Blockchain and Privacy Computing    School of Artificial Intelligence    Beihang University    Tsinghua University Project Lead: Heng Chang, Corresponding to: Shiji Zhou \<[zhoushiji25@buaa.edu.cn](mailto:email@domain)\>

###### Abstract

LLM agents are increasingly expected to operate across heterogeneous task regimes that require distinct execution paradigms. This challenges fixed agent systems and motivates system-level meta-adaptation beyond isolated component updates. While existing works have adapted external harness or trained underlying reasoning policies, full-system adaptation remains insufficiently characterized. The adaptation space between structure and execution is rarely made explicit, and the compatibility between the external harness and the internal reasoner is not optimized jointly. We propose HarnessForge, a meta-adaptive framework for evolving LLM agent systems. HarnessForge formulates an agent system as a harness–policy pair, defining a stable adaptation space that separates harness-level execution structure from policy-level reasoning behavior. It then performs harness–policy co-evolution through fault-guided harness tailoring and harness-conditioned policy alignment. Experiments across five benchmarks from diverse domains show that HarnessForge consistently improves both Qwen3-4B and Qwen3-8B backbones, outperforming harness-only and policy-only baselines with gains of up to 12.0% over the strongest baseline and achieving favorable rollout-efficiency tradeoffs, demonstrating that harness–policy co-evolution is effective, and that executable compatibility between the harness and reasoning policy is essential for agent-system adaptation. The code is available at [https://github.com/mingju-c/HarnessForge](https://github.com/mingju-c/HarnessForge).

Refer to caption

Figure 1: A three-stage view of LLM agent adaptation: fixed handcrafted systems, local component adaptation, and harness–policy co-evolution (HarnessForge).

## 1 Introduction

LLM agents are increasingly deployed in complex and heterogeneous task regimes, including multi-step tool use ([Schick et al., 2023](#bib.bib23); [Qian et al., 2026](#bib.bib21)), retrieval-heavy reasoning ([Jin et al., 2025](#bib.bib15); [Shen et al., 2025](#bib.bib25)), web interaction ([Yao et al., 2022](#bib.bib6)), and stateful multi-turn tasks ([Yao et al., 2024](#bib.bib7); [Shinn et al., 2023](#bib.bib26)). These regimes differ not only in task difficulty, but also in the structural requirements they impose on agent execution. Some require explicit task decomposition and verification, some rely on strict action schemas and tool-use protocols, while others demand persistent memory exposure, or state tracking. Such diversity suggests that there is unlikely to be a single fixed agent system that performs optimally across regimes. Instead, agent systems should be able to meta-adapt their execution paradigms to the target task regime.

As shown in Fig. [1](#S0.F1 "Figure 1 ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), recent work has begun to move toward this goal by treating agent components as adaptive objects rather than fixed hand-written artifacts ([Hu et al., 2025](#bib.bib14); [Zhang et al., 2025c](#bib.bib39); [Shang et al., 2025](#bib.bib24); [Zhang et al., 2025a](#bib.bib37)). Concretely, some search-style methods optimize external execution structures, including workflows, tool-use procedures, role assignments, memory management, or execution graphs ([Wu et al., 2024](#bib.bib31); [Hong et al., 2024](#bib.bib12); [Zhong et al., 2023](#bib.bib42); [Packer et al., 2024](#bib.bib20); [Zhang et al., 2025b](#bib.bib38)), showing that external execution structures can be searched, revised, or evolved. Other training-style methods adapt the model policy through supervised learning, preference learning, or reinforcement learning on agentic trajectories ([Shinn et al., 2023](#bib.bib26); [Madaan et al., 2023](#bib.bib19); [Qian et al., 2026](#bib.bib21); [Li et al., 2025](#bib.bib18); [Shao et al., 2024](#bib.bib10)), improving the model’s internal execution behavior. These works demonstrate that different components of an agent system can be adapted.

However, this component-level view remains insufficient for system-level meta-adaptation. The core issue lies in the *adaptation target*: existing methods typically optimize external harness or internal policies as separate objects, whereas a full LLM agent system operates as a coupled harness–policy pair. This coupling is especially salient in resource-constrained settings, where the harness provides structural support for limited model capabilities and the policy must learn to execute the harness-induced execution paradigm. Moreover, existing adaptation still faces a *compatibility gap*. A more expressive harness may expose useful planning, action, or memory structures, yet fail if the reasoner cannot reliably execute them; conversely, a stronger policy may still be constrained by a harness that exposes unsuitable states, actions, or control signals. Effective system-level adaptation should therefore go beyond optimizing either side alone and instead co-evolve the external harness and internal policy to improve their compatibility.

Motivated by this view, we formulate an LLM agent system as a harness–policy pair, making the coupled harness and policy the explicit unit of adaptation. The harness specifies the external execution interface, including planning, action, and memory structures that shape agent behavior; the policy captures how the reasoner executes within this interface. Based on this formulation, we propose HarnessForge, a framework for harness–policy co-adaptation. On the harness side, HarnessForge uses rollout diagnostics with a meta-agent to perform fault-guided harness tailoring over planning, action, and memory components. On the policy side, it trains harness-conditioned adapters from curated trajectories to align the reasoner with the selected harness. Finally, HarnessForge selects and evolves harness–policy pairs, optimizing task-regime-adapted agent systems rather than isolated workflows or policies across evolutionary rounds.

Our contributions are summarized as follows:

- •
  We reformulate system-level LLM agent adaptation from local component optimization to harness–policy pair evolution, treating the coupled external harness and internal policy as the basic unit of optimization.
- •
  We propose HarnessForge, a meta-adaptive co-evolution framework that coordinates fault-guided harness tailoring with harness-conditioned policy alignment to improve pair-level executable compatibility.
- •
  We evaluate HarnessForge across five benchmarks and two backbones, improving over the strongest harness-only and policy-only baselines by 3.56% on average and up to 12.0%, while preserving favorable rollout–performance trade offs and harness–policy compatibility.

Refer to caption

Figure 2: Overview of the HarnessForge co-evolution workflow. Starting from a harness–policy pair, each round diagnoses execution failures, tailors the harness over planning, action, and memory modules, trains a harness-conditioned adapter from curated trajectories, and selects improved matched pairs for the next round.

## 2 Related Work

##### Optimization for Agent System Design

Prior work shows that LLM-agent capabilities are strongly shaped by the external harness used to organize reasoning and execution. Early prompting and interaction paradigms, such as Chain-of-Thought ([Wei et al., 2022](#bib.bib30)), Plan-and-Solve ([Wang et al., 2023](#bib.bib29)), and ReAct ([Yao et al., 2023](#bib.bib34)), introduce explicit reasoning traces, plans, actions, and observations. Agent frameworks further expose more components, including roles, protocols, and memory modules in AutoGen ([Wu et al., 2024](#bib.bib31)), MetaGPT ([Hong et al., 2024](#bib.bib12)), and memory-augmented agent systems ([Zhong et al., 2023](#bib.bib42); [Packer et al., 2024](#bib.bib20); [Zhang et al., 2025b](#bib.bib38)). More recent search-style methods automate harness design through workflow or architecture search, including ADAS ([Hu et al., 2025](#bib.bib14)), AFlow ([Zhang et al., 2025c](#bib.bib39)), AgentSquare ([Shang et al., 2025](#bib.bib24)), MaAS ([Zhang et al., 2025a](#bib.bib37)), AutoHarness ([Lou et al., 2026](#bib.bib2)), Meta-Harness ([Lee et al., 2026](#bib.bib3)) and MermaidFlow ([Zheng et al., 2025a](#bib.bib41)). These works reduce manual engineering and establish harnesses as important optimization targets, but they mainly optimize external structures while leaving compatibility with the model-side executor implicit.

##### Agentic RL for Policy Evolution

Another line of work optimizes the model-side policy. Recent agentic RL methods train models from interactive trajectories with task rewards, tool feedback, or environment signals. For search and tool use, Search-R1 ([Jin et al., 2025](#bib.bib15)), ToolRL ([Qian et al., 2026](#bib.bib21)), and ToRL ([Li et al., 2025](#bib.bib18)) optimize when and how models issue external actions. For long-horizon agent execution, GiGPO ([Feng et al., 2025](#bib.bib9)), TreeRL ([Hou et al., 2025](#bib.bib13)), and ARPO ([Dong et al., 2026](#bib.bib8)) address credit assignment and trajectory-level optimization, while Planner-R1 ([Zhu et al., 2025](#bib.bib43)) and Memory-R1 ([Yan et al., 2026](#bib.bib32)) extend RL to planning and memory management. Broader reasoning-RL systems, including DeepseekMATH (GRPO) ([Shao et al., 2024](#bib.bib10)), DAPO ([Yu et al., 2025](#bib.bib36)), GSPO ([Zheng et al., 2025b](#bib.bib22)), Satori ([Shen et al., 2025](#bib.bib25)), and Absolute Zero ([Zhao et al., 2025](#bib.bib40)), further show that RL can improve reasoning, exploration, and self-generated curricula. These methods strengthen the internal executor, but typically assume a fixed, externally specified interaction loop or task interface.

## 3 Methodology

Fig. [2](#S1.F2 "Figure 2 ‣ 1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") shows the overall workflow of HarnessForge. Sec. [3.1](#S3.SS1 "3.1 Preliminary ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") formalizes the agent system, and evaluation criteria. Sec. [3.2](#S3.SS2 "3.2 Meta-Adaptive Joint Evolution ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") presents our meta-adaptive joint evolution mechanism. Secs. [3.3](#S3.SS3 "3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") and [3.4](#S3.SS4 "3.4 Harness-Conditioned Policy Alignment ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") detail harness and policy evolution, respectively.

### 3.1 Preliminary

##### Agent-System Formulation.

We formulate an LLM agent system $`\mathcal{G}`$ as the coupling of an external harness $`\mathcal{H}`$ and an adapted reasoner $`\mathcal{R}_{\delta}`$:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{G}=(\mathcal{H},\mathcal{R}_{\delta}),\mathcal{H}=(\mathcal{P},\mathcal{A},\mathcal{M}),\mathcal{R}_{\delta}=\mathcal{R}_{\theta_{0}+\delta}.
``` |  | (1) |

Here $`\mathcal{H}`$ is the editable execution harness, which decomposes into three execution-layer components: $`\mathcal{P}`$ denotes the planning component, including task decomposition, replanning, and termination. $`\mathcal{A}`$ denotes the action component, including tool interfaces, role assignment, and orchestration rules. $`\mathcal{M}`$ denotes the memory component, including what is written, retrieved, summarized, and exposed to future decisions. The adapted reasoner $`\mathcal{R}_{\delta}`$ denotes the reasoning component, which parameterizes the policy that executes under this harness, and $`\delta`$ is a lightweight adapter on base reasoner $`\mathcal{R}_{\theta_{0}}`$.

##### Evaluation Criteria.

Given a task $`x`$ and trajectory $`\tau_{x}`$, we let $`\boldsymbol{\phi}(\tau,x)`$ collect final response quality within environment, negative token cost, negative latency to evaluate the agent system, with larger values preferred in every dimension. For a batch $`B\subset\mathcal{D}`$, we define fitness indicator $`\mathbf{J}(\mathcal{G};B)`$:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathbf{J}(\mathcal{G};B)=\frac{1}{|B|}\sum_{x\in B}\boldsymbol{\phi}\big(\tau_{x}(\mathcal{G}),x\big).
``` |  | (2) |

These criteria are used for Pareto-based validation and selection of candidate systems; the detailed evaluation procedure is provided in App. [C.1](#A3.SS1 "C.1 Evaluator Setting ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

### 3.2 Meta-Adaptive Joint Evolution

Previous work typically improves only individual components of an agent system and overlooks the compatibility between the external harness and the internal reasoning policy. To remedy this gap, HarnessForge adopts a meta-adaptive joint evolution mechanism over iterative rounds. The two evolution processes are mutually reinforcing: better harnesses induce more structured and informative trajectories, while stronger reasoning policies execute harness protocols more faithfully.

##### Round Structure.

At round $`r`$, HarnessForge maintains a population of the agent systems $`\mathbb{G}^{(r)}`$:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathbb{G}^{(r)}=\{\mathcal{G}_{i}^{(r)}=(\mathcal{H}_{i}^{(r)},\mathcal{R}^{(r)}_{\delta_{i}})\}_{i\in I^{(r)}},
``` |  | (3) |

where each element is an executable harness–policy pair. The initial round $`r=0`$ starts from a singleton population containing a manually designed base harness and the frozen base reasoner.

Given the evolution batch data $`B_{r}`$, HarnessForge first performs harness tailoring. For each agent, $`\mathcal{G}_{i}^{(r)}`$ executes tasks on $`B_{r}`$ and collects trajectories, execution statistics, and environment feedback. A meta-agent tailoring operator $`T_{\psi}`$ then updates the harness population through controlled executable harness editing, including fault attribution, archive-guided improvement, candidate generation, and budgeted Pareto selection:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{C}^{(r+1)}=T_{\psi}\big(\{\mathcal{G}_{i}^{(r)}\}_{i\in I^{(r)}},\mathcal{Z}^{(r)},B_{r}\big),
``` |  | (4) |

where $`\mathcal{C}^{(r+1)}`$ is the survivor harness set retained for the next policy-evolution stage.

Conditioned on the survivor harness set $`\mathcal{C}^{(r+1)}`$, HarnessForge performs policy alignment for each harness through a policy-evolution operator $`E_{\eta}`$:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{R}^{(r+1)}_{\delta_{k}}=E_{\eta}\big((\mathcal{H}_{k}^{(r+1)},\mathcal{R}^{(r)}_{\delta_{k}}),{B_{r}}\big)
``` |  | (5) |

Unlike traditional post-training, the goal of policy evolution is to improve compatibility between the reasoning policy and the execution harness instead of optimizing a universally stronger reasoner.

##### Overview.

At a higher level, each round alternates between (i) evolving harness structures from trajectory-level execution evidence, and (ii) evolving harness-conditioned reasoning policies from the resulting survivor population:

|  |  |  |  |
|----|----|----|----|
|  | $`\displaystyle\mathbb{G}^{(r)}=\{(\mathcal{H}_{k}^{(r)},\mathcal{R}^{(r)}_{\delta_{k}})\}\rightarrow\{(\mathcal{H}_{k}^{(r+1)},\mathcal{R}^{(r)}_{\delta_{k}})\}`$ |  | (6) |
|  | $`\displaystyle\rightarrow\{(\mathcal{H}_{k}^{(r+1)},\mathcal{R}^{(r+1)}_{\delta_{k}})\}=\mathbb{G}^{(r+1)}.`$ |  |  |

By iterating this co-evolution process, both the execution harness and the governing reasoning policy evolve jointly, yielding increasingly adaptive agent systems over time. The implementation details of harness evolution and policy evolution are presented in Sec. [3.3](#S3.SS3 "3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") and Sec. [3.4](#S3.SS4 "3.4 Harness-Conditioned Policy Alignment ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), respectively.

### 3.3 Fault-Guided Harness Tailoring

The main challenge in agent system evolution is to locate which part of the harness causes failed execution. We therefore introduce a locate-and-refine mechanism to tailor better harnesses. We use $`T_{\psi}=(\mathbb{L}_{\omega},\mathbb{R}_{\omega},\Gamma_{\omega})`$ to denote the overall evolution pipeline, where $`\mathbb{L}_{\omega}`$ performs fault attribution, $`\mathbb{R}_{\omega}`$ produces archive-guided improvement reports, $`\Gamma_{\omega}`$ generates revised harness candidates.

##### Fault Attribution.

For each active system $`\mathcal{G}_{i}^{(r)}=(\mathcal{H}_{i}^{(r)},\mathcal{R}^{(r)}_{\delta_{i}})`$, HarnessForge first evaluates $`\mathcal{G}_{i}^{(r)}`$ on batch $`B_{r}`$, producing rollout traces $`\mathcal{T}_{i}^{(r)}`$ and the evaluation vector $`\mathbf{J}(\mathcal{G}_{i}^{(r)};B_{r})`$ defined in Eq. [2](#S3.E2 "In Evaluation Criteria. ‣ 3.1 Preliminary ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"). A meta-agent then performs fault-attribution operation $`\mathbb{L}_{\omega}`$ by jointly inspecting the current harness design and its representative failure trajectories:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathbf{F}_{\mathcal{H}_{i}}^{(r)}=\mathbb{L}_{\omega}\left(\mathcal{H}_{i}^{(r)},\mathcal{T}_{i}^{(r)},\mathbf{J}(\mathcal{G}_{i}^{(r)};B_{r})\right),
``` |  | (7) |

where $`\mathbf{F}_{\mathcal{H}_{i}}^{(r)}`$ is the fault report, attributing failures to planning, action and memory components.

##### Archive-Guided Improvement.

HarnessForge maintains an archive $`\mathcal{Z}^{(r)}`$ of historical harnesses, storing compact summaries of harness designs and their corresponding evaluation vectors $`\mathbf{J}`$. Given the current harness $`\mathcal{H}_{i}^{(r)}`$ and its fault report $`\mathbf{F}_{\mathcal{H}_{i}}^{(r)}`$, the meta-agent samples exemplar cases $`\mathcal{S}_{\mathcal{H}_{i}}^{(r)}\subset\mathcal{Z}^{(r)}`$ based on fault relevance and Pareto-front quality, and produces an improvement report:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathbf{I}_{\mathcal{H}_{i}}^{(r)}=\mathbb{R}_{\omega}\left(\mathcal{H}_{i}^{(r)},\mathbf{F}_{\mathcal{H}_{i}}^{(r)},\mathcal{S}_{\mathcal{H}_{i}}^{(r)}\right).
``` |  | (8) |

The improvement report summarizes the likely improvement directions for the current harness, such as which component should be edited and which historical designs should be referenced. It serves as the input to the subsequent generation operator.

##### Refine-and-Filter.

Based on the improvement report, HarnessForge generates revised harness candidates. For each active harness $`\mathcal{H}_{i}^{(r)}`$, the generation operator $`\Gamma_{\omega}`$ proposes $`K_{\mathrm{gen}}`$ revised harnesses:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{C}_{\mathcal{H}_{i}}^{(r)}=\Gamma_{\omega}\left(\mathcal{H}_{i}^{(r)},\mathbf{I}_{\mathcal{H}_{i}}^{(r)}\right),~~\left|\mathcal{C}_{\mathcal{H}_{i}}^{(r)}\right|=K_{\mathrm{gen}}.
``` |  | (9) |

The operator only edits the execution-layer components $`\mathcal{P}`$, $`\mathcal{A}`$, and $`\mathcal{M}`$. Let $`\mathcal{C}_{0}^{(r)}=\bigcup_{i}\mathcal{C}_{\mathcal{H}_{i}}^{(r)}`$ be the pooled candidate set. Since fully evaluating every candidate is expensive, HarnessForge applies half-selection over progressively larger task subsets. At filtering stage $`t`$, each candidate harness $`\mathcal{H}\in\mathcal{C}_{t-1}^{(r)}`$ is paired with the corresponding policy to form an executable system $`\mathcal{G}_{\mathcal{H}}`$ and evaluated on $`B_{r,t}`$ using the batch fitness $`\mathbf{J}(\mathcal{G}_{\mathcal{H}};B_{r,t})`$. Candidates are selected according to Pareto optimality over the dimensions of this evaluation vector, and the retained subset becomes $`\mathcal{C}_{t}^{(r)}`$. After filtering, HarnessForge updates the archive $`\mathcal{Z}^{(r+1)}`$ with each evaluated harness and its evaluation vector $`\mathbf{J}(\mathcal{G}_{\mathcal{H}};B_{r,t})`$, enabling later Pareto-aware retrieval. The survivor harnesses $`\mathcal{C}^{(r+1)}=\mathcal{C}_{T}^{(r)}`$ are then passed to policy evolution. Implementation details of the whole tailoring process are provided in App. [C.4](#A3.SS4 "C.4 Meta Tailoring Operator and Prompt Protocol ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

|  |  |  |  |  |  |  |  |  |  |  |
|----|----|----|----|----|----|----|----|----|----|----|
| Method | ToolHop |  | SearchQA |  |  | TMDB |  | API-Bank |  |  |
|  |  Ans. |  Path |  Hotpot |  2Wiki |  Overall |  Succ. |  Path |  Succ. |  Path |  API. |
| Qwen3-4B |  |  |  |  |  |  |  |  |  |  |
| ADAS |  40.00 |  44.99 |  28.67 |  28.00 |  28.33 |  45.00 |  57.43 |  51.75 |  57.31 |  60.99 |
| AgentSquare |  29.23 |  39.46 |  29.33 |  30.00 |  29.67 |  35.00 |  49.83 |  39.47 |  47.82 |  46.10 |
| AFlow |  31.28 |  43.81 |  30.67 |  29.33 |  30.00 |  32.00 |  47.64 |  37.72 |  45.72 |  41.13 |
| MaAS |  42.05 |  51.80 |  30.67 |  30.00 |  30.33 |  37.00 |  46.57 |  52.63 |  62.74 |  63.83 |
| MermaidFlow |  44.62 |  58.74 |  31.33 |  28.00 |  29.67 |  39.00 |  51.95 |  54.39 |  64.33 |  60.28 |
| SFT |  45.13 |  63.90 |  36.67 |  38.67 |  37.67 |  61.00 |  75.70 |  69.30 |  75.10 |  73.76 |
| RLOO |  46.15 |  64.87 |  35.33 |  40.00 |  37.67 |  61.00 |  77.42 |  72.81 |  78.82 |  76.60 |
| GRPO |  49.74 |  66.41 |  36.00 |  43.33 |  39.67 |  64.00 |  76.67 |  71.93 |  76.46 |  75.18 |
| HarnessForge |  52.82 |  68.10 |  42.00 |  42.00 |  42.00 |  76.00 |  85.10 |  77.19 |  80.07 |  82.27 |
| Qwen3-8B |  |  |  |  |  |  |  |  |  |  |
| ADAS |  42.05 |  61.32 |  31.33 |  32.00 |  31.67 |  51.00 |  60.41 |  54.39 |  60.14 |  59.57 |
| AgentSquare |  30.77 |  41.22 |  29.33 |  30.00 |  29.50 |  38.00 |  53.83 |  45.61 |  54.37 |  53.90 |
| AFlow |  32.82 |  54.12 |  31.33 |  32.67 |  32.00 |  39.00 |  51.28 |  43.86 |  49.74 |  47.52 |
| MaAS |  44.62 |  51.80 |  32.00 |  32.00 |  32.00 |  43.00 |  54.78 |  57.89 |  66.72 |  60.28 |
| MermaidFlow |  47.39 |  59.31 |  32.67 |  30.67 |  31.67 |  47.00 |  58.67 |  57.02 |  67.46 |  62.41 |
| SFT |  48.72 |  72.20 |  40.67 |  41.33 |  41.00 |  69.00 |  82.92 |  68.42 |  73.80 |  73.05 |
| RLOO |  50.77 |  72.75 |  40.00 |  39.33 |  39.67 |  74.00 |  84.25 |  66.67 |  73.76 |  71.63 |
| GRPO |  51.28 |  75.62 |  41.33 |  42.00 |  41.67 |  70.00 |  83.20 |  69.30 |  74.71 |  73.76 |
| HarnessForge |  54.87 |  74.05 |  41.33 |  44.33 |  42.83 |  80.00 |  88.75 |  74.56 |  78.22 |  78.01 |

Table 1: Main results across benchmark groups for the Qwen3-4B and Qwen3-8B backbones. pale blue rows indicate search-style methods, soft blue rows indicate training-style methods, and blue-purple rows indicate our HarnessForge framework. Detailed benchmark and baseline configurations are provided in App. [B](#A2 "Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") and App. [E](#A5 "Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

### 3.4 Harness-Conditioned Policy Alignment

After harness evolution, each survivor harness must be paired with an executor that can reliably operate under its evolved planning, action, and memory interface. We relabel the survivor set $`\mathcal{C}^{(r+1)}=\{\mathcal{H}_{k}^{(r+1)}\}_{k}`$ by lineage, so each survivor inherits the corresponding round-$`r`$ parent policy $`\mathcal{R}^{(r)}_{\delta_{k}}`$. Its goal is not to train a universally stronger reasoner, but to align the inherited policy with the execution conventions induced by a particular harness.

##### Parent Initialization.

For each survivor harness $`\mathcal{H}_{k}^{(r+1)}`$, HarnessForge initializes the child policy from its parent lineage and trains a new harness-specific LoRA ([Hu et al., 2021](#bib.bib4)) update, denoted as $`\delta_{k}^{(r+1)}=\mathrm{Merge}(\delta_{k}^{(r)})\oplus\Delta\delta_{k}^{(r+1)}`$. Here, $`\mathrm{Merge}(\cdot)`$ folds the parent adapter into the child initialization, while $`\Delta\delta_{k}^{(r+1)}`$ adapts the policy to the evolved harness. Details are provided in App. [D.1](#A4.SS1 "D.1 Policy Lineage and Adapter Operation ‣ Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

##### Trajectory Curation.

Under the same rollout budget, policy evolution should not introduce a separate data-collection stage. HarnessForge therefore reuses the rollout pool already produced when $`\mathcal{H}_{k}^{(r+1)}`$ is evaluated during budgeted harness selection. Denote this pool by $`\mathcal{T}_{k}^{(r+1)}`$. We keep the successful trajectories:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{T}_{k}^{+}=\{\tau_{x}\in\mathcal{T}_{k}^{(r+1)}\mid S(\tau_{x})=1\}.
``` |  | (10) |

Here $`S(\tau_{x})`$ is the task-success indicator used in evaluation. This keeps trajectory curation tied to the same success signal that determines the harness success rate, while avoiding extra rollout cost.

##### Harness-Conditioned Evolution.

HarnessForge converts the retained successful rollouts into step-level supervision for the selected harness. Each trajectory $`\tau_{x}\in\mathcal{T}_{k}^{+}`$ is decomposed into decision pairs $`(z_{t},y_{t})`$ over its time steps, yielding the harness-conditioned dataset $`\mathcal{D}_{\mathcal{H}_{k}}=\{(z_{t},y_{t})\}`$ used by the alignment loss. The input $`z_{t}=\bigl(x,\mathcal{H}_{k}^{(r+1)},o_{\leq t},m_{t},a_{t}\bigr)`$ packages the task instruction, active harness interface, accumulated observations, current memory state, and available actions; the target $`y_{t}`$ is the corresponding next behavior, such as a reasoning step, tool action, memory operation, or final response. More general policy-update objectives can instantiate this stage, as discussed in App. [D](#A4 "Appendix D Policy Alignment Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"). In the main experiments, HarnessForge uses supervised trace alignment because it reuses the successful trajectories above and offers a favorable rollout–performance tradeoff::

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\Delta\delta_{k}^{(r+1)}=\arg\min_{\Delta\delta}\mathcal{L}\big(\mathcal{R}^{(r)}_{\delta_{k}}\oplus\Delta\delta;\mathcal{D}_{\mathcal{H}_{k}}\big).
``` |  | (11) |

This objective learns only an incremental adapter on top of the inherited policy, aligning the executor to $`\mathcal{H}_{k}^{(r+1)}`$ without spending additional rollouts. The result is a matched next-round harness–policy pair $`\mathcal{G}_{k}^{(r+1)}=(\mathcal{H}_{k}^{(r+1)},\mathcal{R}^{(r+1)}_{\delta_{k}})`$, which enters the next-round population rather than being treated as a general-purpose model upgrade.

## 4 Experiments

### 4.1 Experimental Setup

##### Benchmarks.

We evaluate HarnessForge on diverse benchmarks: ToolHop ([Ye et al., 2025](#bib.bib35)), RestBench-TMDB ([Song et al., 2023](#bib.bib28)), and API-Bank ([Li et al., 2023](#bib.bib17)) measure tool selection, and API-grounded execution capabilities. SearchQA, built from HotpotQA ([Yang et al., 2018](#bib.bib33)) and 2WikiMultiHopQA ([Ho et al., 2020](#bib.bib11)), evaluates retrieval-heavy multi-hop question answering. Detailed descriptions and dataset statistics are in App. [B](#A2 "Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

##### Implementation Details.

We instantiate HarnessForge with Qwen3-4B and Qwen3-8B ([Yang et al., 2025](#bib.bib5)) as the default backbones to evaluate its effectiveness. The meta-agent used for harness evolution is GPT-5.5. We run $`r=3`$ evolution rounds and report the main setting that retains $`|C|=2`$ survivor harnesses per round. Additional implementation details are provided in App. [C](#A3 "Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

##### Baselines.

We compare HarnessForge against two main baseline groups: Search-style harness baselines include AFlow ([Zhang et al., 2025c](#bib.bib39)), ADAS ([Hu et al., 2025](#bib.bib14)), AgentSquare ([Shang et al., 2025](#bib.bib24)), MaAS ([Zhang et al., 2025a](#bib.bib37)), and MermaidFlow ([Zheng et al., 2025a](#bib.bib41)). Training-style baselines include SFT, GRPO ([Shao et al., 2024](#bib.bib10)), and RLOO ([Ahmadian et al., 2024](#bib.bib1)). Detailed configurations of baselines are provided in App. [E](#A5 "Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

(a) Retained-harness sensitivity across four benchmark groups.

(b) Budget–performance Pareto analysis across benchmarks.

Figure 3: Framework analysis of HarnessForge. Left: performance sensitivity to the number of retained harnesses per evolution round. Right: rollout-budget efficiency compared with alternative adaptation settings.

### 4.2 Main Results

Tab. [1](#S3.T1 "Table 1 ‣ Refine-and-Filter. ‣ 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") compares HarnessForge with harness-search and policy-training baselines across five agentic benchmark and two backbone sizes, averaging +3.56% over per-metric strongest baselines. HarnessForge delivers strong performance gains and reaches SOTA results on most benchmarks, spanning both tool-use and retrieval settings. Notably, the policy-training baselines RLOO and GRPO require larger rollout budgets than HarnessForge (App. [E.3](#A5.SS3 "E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")), yet still fall behind on most metrics. The largest gains appear on TMDB: HarnessForge improves success by 12.00% with Qwen3-4B and 6.00% with Qwen3-8B over the strongest baseline. On API-Bank, it improves API accuracy by average 4.96% across backbones. It also remains strong on reasoning-heavy benchmarks, with average 3.34% ToolHop answer gains across backbones and best SearchQA overall scores 42.83%.

|  |  |  |  |
|----|----|----|----|
| Round |  Variant | ToolHop | SearchQA |
| Round0 |  Vanilla | 41.03 | 34.33 |
| Round1 |  HarnessForge | 46.15 | 38.67 |
|  |  -w/o Harness Evo. | 43.08 ($`\downarrow`$3.07) | 35.67 ($`\downarrow`$3.00) |
|  |  -w/o Policy Evo. | 44.62 ($`\downarrow`$1.53) | 36.33 ($`\downarrow`$2.34) |
| Round2 |  HarnessForge | 50.77 | 40.33 |
|  |  -w/o Harness Evo. | 44.62 ($`\downarrow`$6.15) | 36.33 ($`\downarrow`$4.00) |
|  |  -w/o Policy Evo. | 48.72 ($`\downarrow`$2.05) | 38.33 ($`\downarrow`$2.00) |
| Round3 |  HarnessForge | 52.82 | 42.00 |
|  |  -w/o Harness Evo. | 46.67 ($`\downarrow`$6.15) | 37.00 ($`\downarrow`$5.00) |
|  |  -w/o Policy Evo. | 50.26 ($`\downarrow`$2.56) | 39.00 ($`\downarrow`$3.00) |

Table 2: Module ablation of HarnessForge using Qwen3-4B. ToolHop reports final-answer correctness, and SearchQA reports the macro-average answer F1.

### 4.3 Ablation Study

Tab. [2](#S4.T2 "Table 2 ‣ 4.2 Main Results ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") shows that removing either harness tailoring or policy alignment consistently degrades performance on both ToolHop and SearchQA, indicating that both modules are necessary for HarnessForge. Harness tailoring is the dominant factor: disabling it causes the largest drop in every round, and the gap becomes larger as evolution proceeds, increasing from -3.07%/-3.00% in Round 1 to -6.15%/-5.00% in Round 3 on ToolHop/SearchQA. Removing policy alignment also hurts performance, with final-round drops of -2.56% on ToolHop and -3.00% on SearchQA, suggesting that the reasoner must adapt to the evolved execution interface. Overall, the widening gaps show that HarnessForge’s gains come from harness-policy co-evolution.

### 4.4 Framework Analysis

##### Retained-harness sensitivity.

Fig. [3a](#S4.F3.sf1 "In Figure 3 ‣ Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") studies how the survivor pool size affects harness evolution. Retaining a single harness is often too restrictive: at the final round, increasing from $`k=1`$ to $`k=2`$ improves the main metric by $`3.6\%`$ on ToolHop, $`0.7\%`$ on SearchQA, $`6.0\%`$ on TMDB, and $`2.6\%`$ on API-Bank, averaging $`3.2\%`$ points. Further increasing to $`k=3`$ brings only marginal additional gains on most benchmarks, suggesting that excessive retention weakens selection pressure. Across rounds, $`k=2`$ also yields consistent improvements from R1 to R3 on the four benchmarks groups. These results indicate that a small survivor population preserves useful harness diversity while still maintaining effective selection, enabling agent systems to emerge through population-level harness–policy evolution rather than one-shot scaffold optimization.

##### Rollout-budget efficiency.

Fig. [3b](#S4.F3.sf2 "In Figure 3 ‣ Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") compares different methods under varying rollout budgets. HarnessForge consistently lies on or near the Pareto frontier across all four benchmark groups, indicating that the proposed co-evolution process is both performance-effective and rollout-efficient. Unlike policy-only training methods that must spend additional rollouts to explore better behaviors under a fixed interface, HarnessForge reuses rollout evidence to improve the external harness and then aligns the policy to the selected interface. This allows useful structural revisions and harness-conditioned execution patterns to accumulate across rounds, reducing the need for large-scale exploration. Consequently, HarnessForge provides a stronger performance–budget tradeoff than other on-policy training-style baselines.

Refer to caption

Figure 4: Harness–policy compatibility matrices on API-Bank. Rows denote evolved harnesses and columns denote evolved policy across evolution rounds.

Refer to caption

Figure 5: Representative ToolHop lineage of HarnessForge across three harness–policy co-evolution rounds.

##### Adaptation necessity analysis.

Fig. [4](#S4.F4 "Figure 4 ‣ Rollout-budget efficiency. ‣ 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") evaluates all cross-combinations of evolved harnesses and policy adapters on API-Bank. Along the matched diagonal, performance improves from $`69.30\%`$ for the base pair to $`77.19\%`$ for the final pair. Moreover, the final harness paired with earlier policies averages only $`71.93\%`$, and the final policy paired with earlier harnesses averages only $`71.06\%`$. These gaps indicate that HarnessForge does not simply produce independently stronger components, but instead reveals pair-specific compatibility gains. It induces harness-conditioned policy specialization, making matched harness–policy pairs substantially more effective than mismatched combinations. Additional compatibility matrices and detailed analysis are provided in App. [G.1](#A7.SS1 "G.1 Adaptation Necessity Analysis ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

|       |          |         |       |          |       |       |                  |
|-------|----------|---------|-------|----------|-------|-------|------------------|
| Round | Training | ToolHop |       | API-Bank |       |       |  Budget (K)      |
|       |          | Ans.    | Path  | Succ.    | Path  | API.  |                  |
| 1     | SFT      | 45.13   | 60.66 | 69.30    | 74.85 | 73.05 | 2.40             |
|       | GRPO     | 45.64   | 59.49 | 70.18    | 76.02 | 74.47 | 7.20             |
|       | RLOO     | 46.67   | 61.17 | 70.18    | 75.73 | 73.76 | 7.20             |
| 2     | SFT      | 48.72   | 63.70 | 71.05    | 75.15 | 75.89 | 5.60             |
|       | GRPO     | 49.23   | 64.28 | 69.30    | 76.90 | 73.76 | 20.00            |
|       | RLOO     | 49.74   | 63.80 | 71.05    | 77.78 | 75.18 | 20.00            |
| 3     | SFT      | 50.77   | 65.87 | 71.05    | 76.90 | 75.18 | 12.00            |
|       | GRPO     | 52.31   | 67.32 | 71.93    | 77.78 | 75.18 | 45.60            |
|       | RLOO     | 51.28   | 66.45 | 72.80    | 79.09 | 76.60 | 45.60            |

Table 3: Training agnostic analysis. We evaluate HarnessForge+SFT, HarnessForge+GRPO, and HarnessForge+RLOO on ToolHop, and report API-Bank as an auxiliary transfer/evaluation setting.

##### Training-method agnosticism.

HarnessForge is not tied to a specific policy-training method. In the main experiments, we use supervised fine-tuning (SFT) as the default instantiation because it directly internalizes harness-induced execution patterns from curated trajectories. Tab. [3](#S4.T3 "Table 3 ‣ Adaptation necessity analysis. ‣ 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") compares SFT, GRPO, and RLOO within the same harness–policy co-evolution framework. Across rounds, replacing SFT with GRPO or RLOO further improves several metrics, e.g., in Round 3 GRPO improves ToolHop answer accuracy from 50.77% to 52.31%, while RLOO improves API-Bank success from 71.05% to 72.80%. These gains, however, require substantially larger rollout budgets: Round-3 RL-style instantiations use 45.6K rollouts compared with 12.0K for SFT. This suggests that HarnessForge’s framework-level gains are not specific to SFT, while SFT remains a rollout-efficient default and RL-style objectives provide additional improvement potential at higher cost.

### 4.5 Case Study

Fig. [5](#S4.F5 "Figure 5 ‣ Rollout-budget efficiency. ‣ 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") visualizes a representative ToolHop lineage of HarnessForge across three harness–policy co-evolution rounds. Starting from the base agent, Round 1 improves task decomposition and memory exposure by introducing finer-grained subgoals, and more consistent context injection, yielding a $`2.14\%`$ performance gain and the subsequent adapter alignment further contributes $`1.57\%`$. Round 2 focuses on planning and action reliability, followed by a matched adapter update that together adds $`2.51\%`$ and $`2.10\%`$. Round 3 targets memory retrieval, improving retrieval relevance, reducing noisy memory access with the final adapter update adding another $`0.94\%`$ and $`1.11\%`$. This lineage shows that HarnessForge’s performance improves progressively as the harness is tailored and the policy is aligned to the evolving execution interface. Additional case studies are provided in App. [G.3](#A7.SS3 "G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

## 5 Conclusion

We introduced HarnessForge, a meta-adaptive framework that reformulates LLM agent adaptation as harness–policy pair evolution. Instead of optimizing external workflows or internal policies in isolation, HarnessForge co-evolves the execution harness and the reasoning policy through fault-guided harness tailoring and harness-conditioned policy alignment. Experiments across diverse agent benchmarks show consistent gains over diverse baselines, favorable rollout–performance tradeoffs, and strong matched-pair compatibility. These results demonstrate that effective agent-system adaptation depends on optimizing the executable compatibility between the harness and the policy.

## Limitations

HarnessForge is primarily evaluated with Qwen3-4B and Qwen3-8B backbones. This setting is important for resource-constrained agent deployment, where the coupling between the external harness and the internal policy is especially salient: the harness can provide structural support for limited model capabilities, while the policy must learn to execute the harness-induced paradigm. Whether the same magnitude of harness–policy compatibility gains holds for substantially larger frontier-scale models remains an open direction.

HarnessForge also requires repeated rollouts for harness profiling, selection, and policy alignment. Although our design reuses rollout trajectories across harness evolution and policy alignment to improve rollout efficiency, long-horizon environments can still make the evolution process costly. Future work could reduce this cost through proxy evaluation, adaptive rollout allocation, or learned early-stopping criteria.

Finally, the HarnessForge currently uses a structured meta-evolution protocol with constrained edit operators over planning, action, and memory components. This design improves executability and makes the evolution process auditable, but it does not exhaustively explore the full space of possible agent-system implementations, such as arbitrary code-level harness rewrites, new tool abstractions, or learned verifier modules. Future work could extend the operator space and study cost-aware meta-evolution with alternative closed- or open-source meta-agents.

## References

- Ahmadian et al. (2024) A. Ahmadian, C. Cremer, M. Gallé, M. Fadaee, J. Kreutzer, O. Pietquin, A. Üstün, and S. Hooker Back to basics: revisiting reinforce style optimization for learning from human feedback in llms. External Links: 2402.14740, [Link](https://arxiv.org/abs/2402.14740) Cited by: [§4.1](#S4.SS1.SSS0.Px3.p1.1 "Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Dong et al. (2026) G. Dong, H. Mao, K. Ma, L. Bao, Y. Chen, Z. Wang, Z. Chen, J. Du, H. Wang, F. Zhang, G. Zhou, Y. Zhu, J. Wen, and Z. Dou Agentic reinforced policy optimization. In The Fourteenth International Conference on Learning Representations, External Links: [Link](https://openreview.net/forum?id=TX4k7BF6aO) Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Feng et al. (2025) L. Feng, Z. Xue, T. Liu, and B. An Group-in-group policy optimization for llm agent training. In Advances in Neural Information Processing Systems, D. Belgrave, C. Zhang, H. Lin, R. Pascanu, P. Koniusz, M. Ghassemi, and N. Chen (Eds.), Vol. 38, pp. 46375–46408. External Links: [Link](https://proceedings.neurips.cc/paper_files/paper/2025/file/420c9f777c0b4f78d515e53cf74d58b2-Paper-Conference.pdf) Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Ho et al. (2020) X. Ho, A. Duong Nguyen, S. Sugawara, and A. Aizawa Constructing a multi-hop QA dataset for comprehensive evaluation of reasoning steps. In Proceedings of the 28th International Conference on Computational Linguistics, D. Scott, N. Bel, and C. Zong (Eds.), Barcelona, Spain (Online), pp. 6609–6625. External Links: [Link](https://aclanthology.org/2020.coling-main.580/), [Document](https://dx.doi.org/10.18653/v1/2020.coling-main.580) Cited by: [3rd item](#A2.I1.i3.p1.1 "In B.2 Training & Evolution Data ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§B.1](#A2.SS1.SSS0.Px2.p1.1 "SearchQA. ‣ B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px1.p1.1 "Benchmarks. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Hong et al. (2024) S. Hong, M. Zhuge, J. Chen, X. Zheng, Y. Cheng, J. Wang, C. Zhang, Z. Wang, S. K. S. Yau, Z. Lin, L. Zhou, C. Ran, L. Xiao, C. Wu, and J. Schmidhuber MetaGPT: meta programming for a multi-agent collaborative framework. In The Twelfth International Conference on Learning Representations, External Links: [Link](https://openreview.net/forum?id=VtmBAGCN7o) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Hou et al. (2025) Z. Hou, Z. Hu, Y. Li, R. Lu, J. Tang, and Y. Dong TreeRL: LLM reinforcement learning with on-policy tree search. In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), W. Che, J. Nabende, E. Shutova, and M. T. Pilehvar (Eds.), Vienna, Austria, pp. 12355–12369. External Links: [Link](https://aclanthology.org/2025.acl-long.604/), [Document](https://dx.doi.org/10.18653/v1/2025.acl-long.604), ISBN 979-8-89176-251-0 Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Hu et al. (2021) E. J. Hu, Y. Shen, P. Wallis, Z. Allen-Zhu, Y. Li, S. Wang, L. Wang, and W. Chen LoRA: low-rank adaptation of large language models. External Links: 2106.09685, [Link](https://arxiv.org/abs/2106.09685) Cited by: [§3.4](#S3.SS4.SSS0.Px1.p1.1 "Parent Initialization. ‣ 3.4 Harness-Conditioned Policy Alignment ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Hu et al. (2025) S. Hu, C. Lu, and J. Clune Automated design of agentic systems. In International Conference on Learning Representations, Y. Yue, A. Garg, N. Peng, F. Sha, and R. Yu (Eds.), Vol. 2025, pp. 21344–21377. External Links: [Link](https://proceedings.iclr.cc/paper_files/paper/2025/file/36b7acf6f6010652b3f2a433774a66fe-Paper-Conference.pdf) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px3.p1.1 "Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Jin et al. (2025) B. Jin, H. Zeng, Z. Yue, J. Yoon, S. Arik, D. Wang, H. Zamani, and J. Han Search-r1: training llms to reason and leverage search engines with reinforcement learning. External Links: 2503.09516, [Link](https://arxiv.org/abs/2503.09516) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Kwiatkowski et al. (2019) T. Kwiatkowski, J. Palomaki, O. Redfield, M. Collins, A. Parikh, C. Alberti, D. Epstein, I. Polosukhin, J. Devlin, K. Lee, K. Toutanova, L. Jones, M. Kelcey, M. Chang, A. M. Dai, J. Uszkoreit, Q. Le, and S. Petrov Natural questions: a benchmark for question answering research. Transactions of the Association for Computational Linguistics 7, pp. 453–466. External Links: ISSN 2307-387X, [Document](https://dx.doi.org/10.1162/tacl%5Fa%5F00276), [Link](https://doi.org/10.1162/tacl_a_00276), https://direct.mit.edu/tacl/article-pdf/doi/10.1162/tacl_a_00276/1923288/tacl_a_00276.pdf Cited by: [3rd item](#A2.I1.i3.p1.1 "In B.2 Training & Evolution Data ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Lee et al. (2026) Y. Lee, R. Nair, Q. Zhang, K. Lee, O. Khattab, and C. Finn Meta-harness: end-to-end optimization of model harnesses. External Links: 2603.28052, [Link](https://arxiv.org/abs/2603.28052) Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Li et al. (2023) M. Li, Y. Zhao, B. Yu, F. Song, H. Li, H. Yu, Z. Li, F. Huang, and Y. Li API-bank: a comprehensive benchmark for tool-augmented LLMs. In Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing, H. Bouamor, J. Pino, and K. Bali (Eds.), Singapore, pp. 3102–3116. External Links: [Link](https://aclanthology.org/2023.emnlp-main.187/), [Document](https://dx.doi.org/10.18653/v1/2023.emnlp-main.187) Cited by: [§B.1](#A2.SS1.SSS0.Px4.p1.1 "API-Bank. ‣ B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px1.p1.1 "Benchmarks. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Li et al. (2025) X. Li, H. Zou, and P. Liu ToRL: scaling tool-integrated rl. External Links: 2503.23383, [Link](https://arxiv.org/abs/2503.23383) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Lou et al. (2026) X. Lou, M. Lázaro-Gredilla, A. Dedieu, C. Wendelken, W. Lehrach, and K. P. Murphy AutoHarness: improving llm agents by automatically synthesizing a code harness. External Links: 2603.03329, [Link](https://arxiv.org/abs/2603.03329) Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Madaan et al. (2023) A. Madaan, N. Tandon, P. Gupta, S. Hallinan, L. Gao, S. Wiegreffe, U. Alon, N. Dziri, S. Prabhumoye, Y. Yang, S. Gupta, B. P. Majumder, K. Hermann, S. Welleck, A. Yazdanbakhsh, and P. Clark Self-refine: iterative refinement with self-feedback. In Thirty-seventh Conference on Neural Information Processing Systems, External Links: [Link](https://openreview.net/forum?id=S37hOerQLB) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Packer et al. (2024) C. Packer, S. Wooders, K. Lin, V. Fang, S. G. Patil, I. Stoica, and J. E. Gonzalez MemGPT: towards llms as operating systems. External Links: 2310.08560, [Link](https://arxiv.org/abs/2310.08560) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Qian et al. (2026) C. Qian, E. C. Acikgoz, Q. He, H. WANG, X. Chen, D. Hakkani-Tür, G. Tur, and H. Ji ToolRL: reward is all tool learning needs. In The Thirty-ninth Annual Conference on Neural Information Processing Systems, External Links: [Link](https://openreview.net/forum?id=eOLdGbXT6t) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Schick et al. (2023) T. Schick, J. Dwivedi-Yu, R. Dessi, R. Raileanu, M. Lomeli, E. Hambro, L. Zettlemoyer, N. Cancedda, and T. Scialom Toolformer: language models can teach themselves to use tools. In Thirty-seventh Conference on Neural Information Processing Systems, External Links: [Link](https://openreview.net/forum?id=Yacmpz84TH) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Shang et al. (2025) Y. Shang, Y. Li, K. Zhao, L. Ma, J. Liu, F. Xu, and Y. Li AgentSquare: automatic LLM agent search in modular design space. In The Thirteenth International Conference on Learning Representations, External Links: [Link](https://openreview.net/forum?id=mPdmDYIQ7f) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px3.p1.1 "Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Shao et al. (2024) Z. Shao, P. Wang, Q. Zhu, R. Xu, J. Song, X. Bi, H. Zhang, M. Zhang, Y. K. Li, Y. Wu, and D. Guo DeepSeekMath: pushing the limits of mathematical reasoning in open language models. External Links: 2402.03300, [Link](https://arxiv.org/abs/2402.03300) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px3.p1.1 "Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Shen et al. (2025) M. Shen, G. Zeng, Z. Qi, Z. Hong, Z. Chen, W. Lu, G. Wornell, S. Das, D. Cox, and C. Gan Satori: reinforcement learning with chain-of-action-thought enhances llm reasoning via autoregressive search. External Links: 2502.02508, [Link](https://arxiv.org/abs/2502.02508) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Shinn et al. (2023) N. Shinn, F. Cassano, A. Gopinath, K. R. Narasimhan, and S. Yao Reflexion: language agents with verbal reinforcement learning. In Thirty-seventh Conference on Neural Information Processing Systems, External Links: [Link](https://openreview.net/forum?id=vAElhFcKW6) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Song et al. (2026) X. Song, H. Chang, G. Dong, Y. Zhu, J. Wen, and Z. Dou EnvScaler: scaling tool-interactive environments for llm agent via programmatic synthesis. External Links: 2601.05808, [Link](https://arxiv.org/abs/2601.05808) Cited by: [1st item](#A2.I1.i1.p1.1 "In B.2 Training & Evolution Data ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Song et al. (2023) Y. Song, W. Xiong, D. Zhu, W. Wu, H. Qian, M. Song, H. Huang, C. Li, K. Wang, R. Yao, Y. Tian, and S. Li RestGPT: connecting large language models with real-world restful apis. External Links: 2306.06624, [Link](https://arxiv.org/abs/2306.06624) Cited by: [§B.1](#A2.SS1.SSS0.Px3.p1.1 "RestBench-TMDB. ‣ B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px1.p1.1 "Benchmarks. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Wang et al. (2023) L. Wang, W. Xu, Y. Lan, Z. Hu, Y. Lan, R. K. Lee, and E. Lim Plan-and-solve prompting: improving zero-shot chain-of-thought reasoning by large language models. In Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), A. Rogers, J. Boyd-Graber, and N. Okazaki (Eds.), Toronto, Canada, pp. 2609–2634. External Links: [Link](https://aclanthology.org/2023.acl-long.147/), [Document](https://dx.doi.org/10.18653/v1/2023.acl-long.147) Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Wei et al. (2022) J. Wei, X. Wang, D. Schuurmans, M. Bosma, brian ichter, F. Xia, E. H. Chi, Q. V. Le, and D. Zhou Chain of thought prompting elicits reasoning in large language models. In Advances in Neural Information Processing Systems, A. H. Oh, A. Agarwal, D. Belgrave, and K. Cho (Eds.), External Links: [Link](https://openreview.net/forum?id=_VjQlMeSB_J) Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Wu et al. (2024) Q. Wu, G. Bansal, J. Zhang, Y. Wu, B. Li, E. Zhu, L. Jiang, X. Zhang, S. Zhang, J. Liu, A. H. Awadallah, R. W. White, D. Burger, and C. Wang AutoGen: enabling next-gen LLM applications via multi-agent conversations. In First Conference on Language Modeling, External Links: [Link](https://openreview.net/forum?id=BAakY1hNKS) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Yan et al. (2026) S. Yan, X. Yang, Z. Huang, E. Nie, Z. Ding, Z. Li, X. Ma, J. Bi, K. Kersting, J. Z. Pan, H. Schütze, V. Tresp, and Y. Ma Memory-r1: enhancing large language model agents to manage and utilize memories via reinforcement learning. External Links: 2508.19828, [Link](https://arxiv.org/abs/2508.19828) Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Yang et al. (2025) A. Yang, A. Li, B. Yang, B. Zhang, B. Hui, B. Zheng, B. Yu, C. Gao, C. Huang, C. Lv, C. Zheng, D. Liu, F. Zhou, F. Huang, F. Hu, H. Ge, H. Wei, H. Lin, J. Tang, J. Yang, J. Tu, J. Zhang, J. Yang, J. Yang, J. Zhou, J. Zhou, J. Lin, K. Dang, K. Bao, K. Yang, L. Yu, L. Deng, M. Li, M. Xue, M. Li, P. Zhang, P. Wang, Q. Zhu, R. Men, R. Gao, S. Liu, S. Luo, T. Li, T. Tang, W. Yin, X. Ren, X. Wang, X. Zhang, X. Ren, Y. Fan, Y. Su, Y. Zhang, Y. Zhang, Y. Wan, Y. Liu, Z. Wang, Z. Cui, Z. Zhang, Z. Zhou, and Z. Qiu Qwen3 technical report. External Links: 2505.09388, [Link](https://arxiv.org/abs/2505.09388) Cited by: [§4.1](#S4.SS1.SSS0.Px2.p1.1 "Implementation Details. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Yang et al. (2018) Z. Yang, P. Qi, S. Zhang, Y. Bengio, W. Cohen, R. Salakhutdinov, and C. D. Manning HotpotQA: a dataset for diverse, explainable multi-hop question answering. In Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing, E. Riloff, D. Chiang, J. Hockenmaier, and J. Tsujii (Eds.), Brussels, Belgium, pp. 2369–2380. External Links: [Link](https://aclanthology.org/D18-1259/), [Document](https://dx.doi.org/10.18653/v1/D18-1259) Cited by: [3rd item](#A2.I1.i3.p1.1 "In B.2 Training & Evolution Data ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§B.1](#A2.SS1.SSS0.Px2.p1.1 "SearchQA. ‣ B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px1.p1.1 "Benchmarks. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Yao et al. (2022) S. Yao, H. Chen, J. Yang, and K. Narasimhan WebShop: towards scalable real-world web interaction with grounded language agents. In Advances in Neural Information Processing Systems, S. Koyejo, S. Mohamed, A. Agarwal, D. Belgrave, K. Cho, and A. Oh (Eds.), Vol. 35, pp. 20744–20757. External Links: [Link](https://proceedings.neurips.cc/paper_files/paper/2022/file/82ad13ec01f9fe44c01cb91814fd7b8c-Paper-Conference.pdf) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Yao et al. (2024) S. Yao, N. Shinn, P. Razavi, and K. Narasimhan $`\tau`$-Bench: a benchmark for tool-agent-user interaction in real-world domains. External Links: 2406.12045, [Link](https://arxiv.org/abs/2406.12045) Cited by: [§1](#S1.p1.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Yao et al. (2023) S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. R. Narasimhan, and Y. Cao ReAct: synergizing reasoning and acting in language models. In The Eleventh International Conference on Learning Representations, External Links: [Link](https://openreview.net/forum?id=WE_vluYUL-X) Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Ye et al. (2025) J. Ye, Z. Du, X. Yao, W. Lin, Y. Xu, Z. Chen, Z. Wang, S. Zhu, Z. Xi, S. Yuan, T. Gui, Q. Zhang, X. Huang, and J. Chen ToolHop: a query-driven benchmark for evaluating large language models in multi-hop tool use. In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), W. Che, J. Nabende, E. Shutova, and M. T. Pilehvar (Eds.), Vienna, Austria, pp. 2995–3021. External Links: [Link](https://aclanthology.org/2025.acl-long.150/), [Document](https://dx.doi.org/10.18653/v1/2025.acl-long.150), ISBN 979-8-89176-251-0 Cited by: [2nd item](#A2.I1.i2.p1.1 "In B.2 Training & Evolution Data ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§B.1](#A2.SS1.SSS0.Px1.p1.1 "ToolHop. ‣ B.1 Evaluation Benchmark and Metrics ‣ Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px1.p1.1 "Benchmarks. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Yu et al. (2025) Q. Yu, Z. Zhang, R. Zhu, Y. Yuan, X. Zuo, Y. Yue, W. Dai, T. Fan, G. Liu, j. liu, L. Liu, X. Liu, H. Lin, Z. Lin, B. Ma, G. Sheng, Y. Tong, C. Zhang, M. Zhang, R. Zhang, W. Zhang, H. Zhu, J. Zhu, J. Chen, J. Chen, C. Wang, H. Yu, Y. Song, X. Wei, H. Zhou, J. Liu, W. Ma, Y. Zhang, L. Yan, Y. Wu, and M. Wang DAPO: an open-source llm reinforcement learning system at scale. In Advances in Neural Information Processing Systems, D. Belgrave, C. Zhang, H. Lin, R. Pascanu, P. Koniusz, M. Ghassemi, and N. Chen (Eds.), Vol. 38, pp. 113222–113244. External Links: [Link](https://proceedings.neurips.cc/paper_files/paper/2025/file/a4277440d50f1f15d2cb4c14f7e0c0d2-Paper-Conference.pdf) Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zhang et al. (2025a) G. Zhang, L. Niu, J. Fang, K. Wang, L. BAI, and X. Wang Multi-agent architecture search via agentic supernet. In Forty-second International Conference on Machine Learning, External Links: [Link](https://openreview.net/forum?id=imcyVlzpXh) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px3.p1.1 "Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zhang et al. (2025b) G. Zhang, H. Ren, C. Zhan, Z. Zhou, J. Wang, H. Zhu, W. Zhou, and S. Yan MemEvolve: meta-evolution of agent memory systems. External Links: 2512.18746, [Link](https://arxiv.org/abs/2512.18746) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zhang et al. (2025c) J. Zhang, J. Xiang, Z. Yu, F. Teng, X. Chen, J. Chen, M. Zhuge, X. Cheng, S. Hong, J. Wang, B. Zheng, B. Liu, Y. Luo, and C. Wu AFlow: automating agentic workflow generation. In The Thirteenth International Conference on Learning Representations, External Links: [Link](https://openreview.net/forum?id=z5uVAKwmjf) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px3.p1.1 "Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zhao et al. (2025) A. Zhao, Y. Wu, Y. Yue, T. Wu, Q. Xu, Y. Yue, M. Lin, S. Wang, Q. Wu, Z. Zheng, and G. Huang Absolute zero: reinforced self-play reasoning with zero data. External Links: 2505.03335, [Link](https://arxiv.org/abs/2505.03335) Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zheng et al. (2025a) C. Zheng, J. Chen, Y. Lyu, W. Z. T. Ng, H. Zhang, Y. Ong, I. Tsang, and H. Yin MermaidFlow: redefining agentic workflow generation via safety-constrained evolutionary programming. External Links: 2505.22967, [Link](https://arxiv.org/abs/2505.22967) Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§4.1](#S4.SS1.SSS0.Px3.p1.1 "Baselines. ‣ 4.1 Experimental Setup ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zheng et al. (2025b) C. Zheng, S. Liu, M. Li, X. Chen, B. Yu, C. Gao, K. Dang, Y. Liu, R. Men, A. Yang, J. Zhou, and J. Lin Group sequence policy optimization. External Links: 2507.18071, [Link](https://arxiv.org/abs/2507.18071) Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zhong et al. (2023) W. Zhong, L. Guo, Q. Gao, H. Ye, and Y. Wang MemoryBank: enhancing large language models with long-term memory. External Links: 2305.10250, [Link](https://arxiv.org/abs/2305.10250) Cited by: [§1](#S1.p2.1 "1 Introduction ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), [§2](#S2.SS0.SSS0.Px1.p1.1 "Optimization for Agent System Design ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").
- Zhu et al. (2025) S. Zhu, Y. Jiang, H. Sang, S. Tang, Q. Song, B. He, R. Jain, Z. Wang, and A. Geramifard Planner-r1: reward shaping enables efficient agentic rl with smaller llms. External Links: 2509.25779, [Link](https://arxiv.org/abs/2509.25779) Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Agentic RL for Policy Evolution ‣ 2 Related Work ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

## Appendix A Algorithm and Notation

1: parent population $`\mathcal{G}^{(r)}`$, evolution batch $`B_{r}`$, archive $`\mathcal{Z}^{(r)}`$

2: for each parent pair $`G_{i}^{(r)}=(H_{i}^{(r)},R_{\delta_{i}}^{(r)})`$ do

3:   Roll out $`G_{i}^{(r)}`$ on $`B_{r}`$ and collect traces $`\mathcal{T}_{i}^{(r)}`$

4:   Generate fault report $`F_{H_{i}}^{(r)}`$

5:   Retrieve archive cases and produce improvement brief $`\mathbf{I}_{H_{i}}^{(r)}`$

6:   Generate $`K_{\mathrm{gen}}`$ child harnesses

7:   Discard invalid children using interface and smoke tests

8: end for

9: Select survivor harnesses by staged Pareto filtering over $`B_{r,1},\ldots,B_{r,T}`$

10: for each survivor harness $`H_{k}^{(r+1)}`$ do

11:   Reuse successful rollout traces from filtering to construct $`D_{H_{k}}`$

12:   Materialize an independent copy of the parent lineage policy and train a new harness-specific adapter

13:   Return matched pair $`(H_{k}^{(r+1)},R_{\delta_{k}}^{(r+1)})`$

14: end for

15: Update archive with evaluated harnesses, metrics, reports, and selection logs

Algorithm 1 HarnessForge Co-evolution Round

### A.1 Notation

Tab. [4](#A1.T4 "Table 4 ‣ A.1 Notation ‣ Appendix A Algorithm and Notation ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") summarizes the notation used in the main text and appendix.

|  |  |
|----|----|
|  Symbol |  Meaning |
|  $`\mathcal{G}=(\mathcal{H},\mathcal{R}_{\delta})`$ |  Agent system consisting of an executable harness and an adapted reasoner. |
|  $`\mathcal{H}=(\mathcal{P},\mathcal{A},\mathcal{M})`$ |  Harness with planning, action, and memory components. |
|  $`\mathcal{R}_{\theta_{0}}`$ |  Frozen base reasoner before harness-conditioned adaptation. |
|  $`\delta`$ |  Lightweight adapter parameters associated with a policy lineage. |
|  $`\mathbb{G}^{(r)}`$ |  Population of harness–policy pairs at evolution round $`r`$. |
|  $`B_{r},B_{r,t}`$ |  Evolution batch at round $`r`$, and the subset used at filtering stage $`t`$. |
|  $`\mathcal{T}_{i}^{(r)}`$ |  Rollout traces collected by pair $`i`$ at round $`r`$. |
|  $`\mathbf{J}(\mathcal{G};B)`$ |  Multi-objective evaluation vector over task performance and efficiency. |
|  $`\mathcal{Z}^{(r)}`$ |  Archive of evaluated harnesses, rollout summaries, diagnostics, and selection records. |
|  $`\mathbf{F}_{\mathcal{H}}^{(r)}`$, $`\mathbf{I}_{\mathcal{H}}^{(r)}`$ |  Fault report and archive-guided improvement brief for harness $`\mathcal{H}`$. |
|  $`\mathcal{C}^{(r+1)}`$ |  Survivor harness set passed to policy alignment for the next round. |

Table 4: Notation used by HarnessForge.

## Appendix B Datasets Details

### B.1 Evaluation Benchmark and Metrics

The main experiments cover five datasets organized into four benchmark families. ToolHop, RestBench-TMDB, and API-Bank each form one benchmark family. SearchQA is the retrieval-heavy benchmark family and contains two datasets, HotpotQA and 2WikiMultiHopQA. We therefore use “five datasets” when describing dataset coverage and “four benchmark families” or “four benchmark groups” when referring to the columns in Tab. [1](#S3.T1 "Table 1 ‣ Refine-and-Filter. ‣ 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

Let $`\mathcal{D}`$ denote the evaluated split, $`N=|\mathcal{D}|`$, $`\hat{a}_{i}`$ and $`a_{i}`$ denote the predicted and gold final answers for instance $`i`$, and $`\hat{\pi}_{i}`$ and $`\pi_{i}`$ denote the predicted and gold tool/API-call paths. We use $`\mathbf{1}[\cdot]`$ for the indicator function. For answer matching, $`\operatorname{norm}(\cdot)`$ lowercases text and removes articles, punctuation, and extra whitespace, following standard QA evaluation.

##### ToolHop.

ToolHop evaluates multi-hop tool use, where each instance requires the agent to decompose a question, call tools for intermediate evidence, and return a final answer ([Ye et al., 2025](#bib.bib35)). Our current held-out split contains 195 evaluated instances. We report Correct, the final-answer correctness judged by the benchmark evaluator. Let $`m_{i}^{\mathrm{ans}}=1`$ iff the normalized prediction matches the gold answer. Then

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Correct}_{\mathrm{ToolHop}}=\frac{\sum_{i=1}^{N}m_{i}^{\mathrm{ans}}}{N},
``` |  | (12) |

and Path, the average fraction of required intermediate subgoals solved during the trajectory. If $`G_{i}`$ is the set of required intermediate subgoals and $`\hat{G}_{i}`$ is the set credited by the evaluator, then

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Path}_{\mathrm{ToolHop}}=\frac{1}{N}\sum_{i=1}^{N}\frac{|\hat{G}_{i}\cap G_{i}|}{|G_{i}|}.
``` |  | (13) |

##### SearchQA.

SearchQA evaluates retrieval-heavy multi-hop question answering over local evidence corpora constructed from HotpotQA and 2WikiMultiHopQA ([Yang et al., 2018](#bib.bib33); [Ho et al., 2020](#bib.bib11)). We use the normalized token-level answer F1 score. For token multisets $`T(\hat{a}_{i})`$ and $`T(a_{i})`$, let

|  |  |  |  |  |
|----|----|----|----|----|
|  | $`\displaystyle P_{i}`$ | $`\displaystyle=\frac{|T(\hat{a}_{i})\cap T(a_{i})|}{|T(\hat{a}_{i})|},`$ |  | (14) |
|  | $`\displaystyle R_{i}`$ | $`\displaystyle=\frac{|T(\hat{a}_{i})\cap T(a_{i})|}{|T(a_{i})|},`$ |  |  |
|  | $`\displaystyle F1_{i}`$ | $`\displaystyle=\frac{2P_{i}R_{i}}{P_{i}+R_{i}}.`$ |  |  |

The reported HotpotQA and 2WikiMultiHopQA scores are

|  |  |  |  |  |
|----|----|----|----|----|
|  | $`\displaystyle\mathrm{Score}_{d}`$ | $`\displaystyle=\frac{\sum_{i\in\mathcal{D}_{d}}F1_{i}}{|\mathcal{D}_{d}|},`$ |  | (15) |
|  | $`\displaystyle d`$ | $`\displaystyle\in\{\mathrm{Hotpot},\mathrm{2Wiki}\},`$ |  |  |

and Overall is the macro-average over the two subsets:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Overall}_{\mathrm{SearchQA}}=\frac{\mathrm{Score}_{\mathrm{Hotpot}}+\mathrm{Score}_{\mathrm{2Wiki}}}{2}.
``` |  | (16) |

##### RestBench-TMDB.

RestBench-TMDB evaluates REST-style API use over a movie-database environment ([Song et al., 2023](#bib.bib28)). Each task specifies an information need that must be satisfied through one or more API calls. Our current evaluation split contains 100 instances. We report Success, the fraction of tasks whose final answer satisfies the verifier,

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Success}_{\mathrm{TMDB}}=\frac{\sum_{i=1}^{N}v_{i}}{N},\quad v_{i}\in\{0,1\},
``` |  | (17) |

and Path, the evaluator’s path-rate metric for matching the required API execution path. Following the RestBench notion of a correct API path, we count a path as matched if the gold API-call sequence is preserved as an ordered subsequence of the predicted path:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Path}_{\mathrm{TMDB}}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\!\left[\pi_{i}\preceq\hat{\pi}_{i}\right],
``` |  | (18) |

where $`\preceq`$ denotes ordered-subsequence matching.

##### API-Bank.

API-Bank evaluates structured API calling across diverse user requests ([Li et al., 2023](#bib.bib17)). Each instance provides a user instruction and a gold API-call specification, including the function name and arguments. Our current evaluation split contains 114 instances. We report Success, the fraction of instances whose full call trajectory and final response satisfy the evaluator,

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Success}_{\mathrm{APIBank}}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\!\left[\operatorname{Eval}(\hat{\pi}_{i},\hat{a}_{i})=1\right].
``` |  | (19) |

We report Path as an ordered API-name overlap score. Let $`L_{i}`$ be the length of the longest common subsequence between the predicted and gold API-name sequences, $`P_{i}^{\pi}=L_{i}/|\hat{\pi}_{i}|`$, and $`R_{i}^{\pi}=L_{i}/|\pi_{i}|`$. Then

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Path}_{\mathrm{APIBank}}=\frac{1}{N}\sum_{i=1}^{N}\frac{2P_{i}^{\pi}R_{i}^{\pi}}{P_{i}^{\pi}+R_{i}^{\pi}}.
``` |  | (20) |

Finally, API Accuracy measures call-level exactness after aligning predicted calls to gold calls. Let $`m_{i,t}^{\mathrm{api}}=1`$ iff the aligned predicted call has the correct API name and schema-normalized arguments, i.e., $`\operatorname{name}(\hat{c}_{i,t})=\operatorname{name}(c_{i,t})`$ and $`\operatorname{args}(\hat{c}_{i,t})\simeq\operatorname{args}(c_{i,t})`$. Then

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{APIAcc}_{\mathrm{APIBank}}=\frac{1}{\sum_{i}|\pi_{i}|}\sum_{i=1}^{N}\sum_{t=1}^{|\pi_{i}|}m_{i,t}^{\mathrm{api}},
``` |  | (21) |

where $`\simeq`$ denotes schema-normalized argument equivalence.

### B.2 Training & Evolution Data

We construct a 3.8K(3,800)-task training pool covering three complementary agent capabilities: general tool use, complex environment interaction, and offline retrieval. The training pool is strictly disjoint from all held-out evaluation splits used in the main experiments. Training tasks are used only for HarnessForge harness evolution, trajectory curation, and policy-adapter training, as well as for training the training-style baselines (SFT, GRPO, and RLOO); the test splits are reserved for final evaluation.

- •
  Complex Environment Interaction: We sample 2.0k tasks from EnvScaler-RL ([Song et al., 2026](#bib.bib27)). Each task provides an executable environment, an initial configuration, a task instruction, available tools, and verifier-based feedback. This subset targets multi-step tool use in stateful environments.
- •
  General Tool-Use: We sample 0.8k instances from ToolHop ([Ye et al., 2025](#bib.bib35)). These tasks emphasize tool selection, tool chaining, and precise function-call execution.
- •
  Offline QA & Retrieval: We sample 1.0k tasks from Wikipedia-based QA datasets, including Natural Questions (NQ) ([Kwiatkowski et al., 2019](#bib.bib16)), HotpotQA ([Yang et al., 2018](#bib.bib33)), and 2WikiMultiHopQA ([Ho et al., 2020](#bib.bib11)). In our setup, we convert these datasets into an offline/local-corpus retrieval setting: each question is paired with a fixed local document collection, and the model must retrieve supporting evidence from that corpus before answering. This subset trains reproducible evidence retrieval and answer generation without relying on live web access.

Overall, the resulting training pool contains 3.8k samples and provides a compact mixture of tool-use, environment interaction, and offline retrieval tasks.

### B.3 Split and Deduplication Protocol

All reported test scores are computed on held-out evaluation splits. The 3.8K training and evolution pool is used for harness evolution, trajectory curation, and policy-adapter training, but is disjoint from the held-out test splits used for final reporting. When a source dataset contributes to both training/evolution and evaluation, we use non-overlapping split identifiers and remove potential duplicates by dataset identifier and normalized task instruction. For converted offline retrieval tasks, the local evidence corpus is fixed before adaptation and the held-out question identifiers are not exposed during harness search, policy training, or model selection.

## Appendix C Harness Tailoring Details

### C.1 Evaluator Setting

HarnessForge uses a multi-objective evaluator to select harness candidates and retrieve useful historical cases from the archive. We reuse the benchmark metrics defined in App. [B](#A2 "Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") as the task-performance dimension, and add efficiency dimensions for candidate selection. For each candidate agent system $`\mathcal{G}`$ and evaluation batch $`B`$, we compute

|  |  |  |  |  |
|----|----|----|----|----|
|  | $`\displaystyle\mathbf{J}(\mathcal{G};B)=\big(`$ | $`\displaystyle\operatorname{Perf}(\mathcal{G};B),-\operatorname{Tok}(\mathcal{G};B),`$ |  | (22) |
|  |  | $`\displaystyle-\operatorname{Delay}(\mathcal{G};B)\big),`$ |  |  |

where larger values are preferred in every dimension. $`\operatorname{Perf}`$ denotes benchmark-specific task performance, $`\operatorname{Tok}`$ denotes token usage, and $`\operatorname{Delay}`$ denotes wall-clock latency. The negative signs convert efficiency objectives into maximization dimensions.

The performance term is instantiated according to the domain of each task. Our evolution data mainly covers ToolHop, EnvScaler-RL, and SearchQA. For ToolHop, we combine the final-answer correctness and path-completion metrics defined in App. [B](#A2 "Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"):

|  |  |  |  |  |
|----|----|----|----|----|
|  | $`\displaystyle\operatorname{Perf}_{\mathrm{ToolHop}}(\tau,x)=`$ | $`\displaystyle\lambda_{\mathrm{ans}}\mathbbm{1}[\mathrm{AnsCorrect}(\tau,x)]`$ |  | (23) |
|  |  | $`\displaystyle+\lambda_{\mathrm{path}}\operatorname{PathScore}(\tau,x),`$ |  |  |

where $`\lambda_{\mathrm{ans}}+\lambda_{\mathrm{path}}=1`$, and we use $`\lambda_{\mathrm{ans}}=\lambda_{\mathrm{path}}=0.5`$ by default.

For SearchQA, we use the normalized token-level answer F1 score defined in App. [B](#A2 "Appendix B Datasets Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"):

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\operatorname{Perf}_{\mathrm{SearchQA}}(\tau,x)=\operatorname{F1}(\hat{a}(\tau),a_{x}),
``` |  | (24) |

where $`\hat{a}(\tau)`$ is the final answer produced by trajectory $`\tau`$ and $`a_{x}`$ is the gold answer.

For EnvScaler-RL, we follow the official environment-state verifier. Each task scenario provides a checklist of terminal-state validation functions $`\mathcal{C}_{x}=\{c^{x}_{j}\}_{j=1}^{m_{x}}`$, where each function checks whether one required condition is satisfied in the final environment state. Let $`s_{T}(\tau,x)`$ denote the terminal state reached after executing trajectory $`\tau`$. We define

|  |  |  |  |
|----|----|----|----|
|  | $`\displaystyle\operatorname{Perf}_{\mathrm{Env}}(\tau,x)=\operatorname{Done}(\tau,x)=`$ |  | (25) |
|  | $`\displaystyle\frac{1}{m_{x}}\sum_{j=1}^{m_{x}}\mathbbm{1}\!\left[c^{x}_{j}\!\left(s_{T}(\tau,x)\right)=\mathrm{True}\right].`$ |  |  |

This score measures task completion by verifying the final environment state, rather than matching a single reference action sequence.

For a batch $`B`$, each metric is averaged over all tasks in the batch:

|  |  |  |  |
|----|----|----|----|
|  | $`\displaystyle\operatorname{Perf}(\mathcal{G};B)=\frac{1}{|B|}\sum_{x\in B}\operatorname{Perf}_{d(x)}\big(\tau_{x}(\mathcal{G}),x\big),`$ |  | (26) |

where $`d(x)`$ denotes the benchmark domain of task $`x`$.

Given two candidate harnesses $`\mathcal{H}_{a}`$ and $`\mathcal{H}_{b}`$, paired with their corresponding policies to form executable systems $`\mathcal{G}_{a}`$ and $`\mathcal{G}_{b}`$, we say $`\mathcal{H}_{a}`$ Pareto-dominates $`\mathcal{H}_{b}`$ on batch $`B`$ if

|  |  |  |  |  |
|----|----|----|----|----|
|  | $`\displaystyle\mathcal{H}_{a}\succ_{B}\mathcal{H}_{b}\iff`$ | $`\displaystyle\mathbf{J}(\mathcal{G}_{a};B)\succeq\mathbf{J}(\mathcal{G}_{b};B)`$ |  | (27) |
|  |  | $`\displaystyle\land\mathbf{J}(\mathcal{G}_{a};B)\neq\mathbf{J}(\mathcal{G}_{b};B).`$ |  |  |

That is, $`\mathcal{G}_{a}`$ is no worse in every objective and strictly better in at least one objective. During budgeted filtering, HarnessForge ranks candidates by Pareto fronts and uses the primary task performance as the tie-breaker when candidates are otherwise comparable. The retained Pareto-competitive harnesses form the survivor set passed to policy alignment.

The same evaluator is also used to maintain the archive. For each evaluated harness, HarnessForge stores its design summary, fault report, rollout summary, and evaluation vector $`\mathbf{J}`$. During archive-guided improvement, reference cases are retrieved based on both fault relevance and Pareto quality: the meta-agent prioritizes historical harnesses that address similar planning, action, or memory failures and lie on or near the Pareto frontier. Thus, the evaluator provides a unified criterion for both harness selection and archive retrieval.

### C.2 Hyperparameter Configuration

Tab. [5](#A3.T5 "Table 5 ‣ C.2 Hyperparameter Configuration ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") summarizes the main implementation configuration used by HarnessForge. Unless otherwise stated, the same configuration is used across benchmarks and backbones.

|  |  |
|----|----|
|  Parameter |  Value |
|  Base reasoner |  Qwen3-4B and Qwen3-8B |
|  Meta-agent |  GPT-5.5 |
|  Evolution rounds |  3 |
|  Harness proposals per round |  8 candidates |
|  Filtering stages |  Two-stage half-selection |
|  Retained harnesses |  $`|C|=2`$ survivor harnesses per round |
|  Harness components |  Planning, Action, Memory |
|  Tailoring target |  Harness edits under task-interface constraints |
|  Adapter type |  Harness-specific LoRA adapter |
|  Trainable parameters |  LoRA adapters only; base model frozen |
|  Adapter objective |  SFT on filtered successful trajectories |
|  LoRA target modules |  Attention and MLP projections |
|  LoRA rank / alpha / dropout |  8 / 16 / 0.05 |
|  Adapter learning rate |  $`2\times 10^{-6}`$ |
|  Adapter epochs |  1 |

Table 5: Implementation configuration of HarnessForge.

### C.3 Harness Representation and Edit Space

Each harness is stored as an executable code/configuration bundle. The editable scope is restricted to the harness controller, so all candidate children can be run under the same evaluator. Tab. [6](#A3.T6 "Table 6 ‣ C.3 Harness Representation and Edit Space ‣ Appendix C Harness Tailoring Details ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") lists the main edit categories used by the meta-agent.

|  |  |
|----|----|
|  Component |  Editable harness-side fields |
|  Planning $`\mathcal{P}`$ |  Decomposition templates, replanning triggers, verification steps, termination conditions, and controller order. |
|  Action $`\mathcal{A}`$ |  Tool descriptions, argument schemas, routing rules, validity guards, retry policies, and role/tool orchestration. |
|  Memory $`\mathcal{M}`$ |  State keys, write conditions, retrieval rules, summarization format, and which memory fields are exposed to the reasoner. |

Table 6: Executable harness representation and edit boundaries.

A proposed child harness must instantiate the same controller interface as its parent and pass a lightweight validity check before rollout evaluation: required fields must be present, tool schemas must be parseable, action names must map to available tools, and memory keys referenced by planning or action code must be defined. Invalid children are discarded before budgeted selection. This representation makes the parent harness $`\rightarrow`$ fault report $`\rightarrow`$ child harness transition reproducible as a constrained code-editing problem rather than an unconstrained natural-language redesign.

### C.4 Meta Tailoring Operator and Prompt Protocol

The meta tailoring operator is implemented as a staged prompt-driven meta-agent pipeline. Instead of relying on a single monolithic generation call, the pipeline decomposes tailoring into diagnosis, improvement planning, executable harness generation, and smoke-test repair.

This staged design improves controllability and noise isolation: each stage consumes a compact, task-specific intermediate artifact rather than the full long-context evidence bundle, which reduces context drift and prevents later generation steps from being dominated by irrelevant trajectory details. Concretely, one call diagnoses failures, one converts the diagnosis into transferable improvement directions, one writes executable harness code, and a bounded retry loop repairs implementation errors discovered by smoke tests. The full prompt for this operation is available in our open-source codebase, and the appendix includes a representative excerpt for reference.

#### C.4.1 Fault-Attribution Operation

The first stage localizes observed execution failures to specific harness modules. Instead of treating every wrong final answer as a generic model-reasoning failure, the meta-agent distinguishes planning, action, and memory failures.

As shown in Eq. ([7](#S3.E7 "In Fault Attribution. ‣ 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")), the fault-attribution operation produces a structured report $`\mathbf{F}_{\mathcal{H}_{i}}^{(r)}`$ that localizes observed failures to harness modules. In brief, it instructs the meta-agent to analyze the current harness, rollout metrics, and representative trajectories, and to produce an evidence-grounded diagnosis rather than task-specific patches. The prompt requires the meta-agent to (i) reverse-engineer the implemented planning, action, memory, and wiring behavior, (ii) identify stable failure modes and their first meaningful error points, (iii) assign module ownership with concrete trajectory evidence, (iv) distinguish transferable harness weaknesses from benchmark-specific artifacts, and (v) output repair priorities, preservation constraints, and generation-ready instructions for the next tailoring stage.

![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-bd4001628766de67bdf5746c8d7240d424b637f5.svg]]

#### C.4.2 Archive-Guided Improvement

The second stage converts the fault report into a generation-ready improvement brief. Rather than generating the next harness from scratch, HarnessForge retrieves reference cases from the archive $`\mathcal{Z}^{(r)}`$, which stores previously explored harnesses, rollout summaries, validation scores, and diagnosis reports. Retrieval is conditioned on both fault relevance and Pareto quality: the meta-agent prioritizes historical harnesses that address similar planning, action, or memory failures and lie on or near the Pareto frontier of validation performance and execution cost. This allows the improvement stage to reuse transferable design patterns without overfitting to narrow task-specific patches.

We retrieve the reference cases as

|  |  |  |  |
|----|----|----|----|
|  | $`\displaystyle\mathcal{S}_{\mathcal{H}_{i}}^{(r)}=\operatorname{Retrieve}\Big(\mathcal{Z}^{(r)},\mathbf{F}_{i}^{(r)}\Big),`$ |  | (28) |

where $`\mathcal{S}_{\mathcal{H}_{i}}^{(r)}`$ denotes the selected Pareto-competitive reference harnesses. The improvement agent then produces an implementation brief:

|  |  |  |  |
|----|----|----|----|
|  | $`\displaystyle\mathbf{I}_{i}^{(r)}=\mathbb{R}_{\omega}\Big(\mathcal{H}_{i}^{(r)},\mathbf{F}_{i}^{(r)},\mathcal{E}_{i}^{(r)}\Big).`$ |  | (29) |

In brief, the prompt instructs the meta-agent to read the current harness, the module-localized fault report $`\mathbf{F}_{\mathcal{H}_{i}}^{(r)}`$, and the retrieved archive examples, then produce a transferable improvement brief rather than executable code. The brief specifies which failure modes to prioritize, which planning/action/memory or cross-module interface should own each fix, which historical design patterns should be reused or avoided, and what preservation constraints should guide the subsequent harness-generation stage. This separates diagnosis, improvement abstraction, and code generation, reducing trajectory-level overfitting and making harness edits more transferable. Concretely, we instantiate this operation with the following prompt:

![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-faff397e28a6a7fc1924b8c2e4436757923061e1.svg]]

#### C.4.3 Refinement and Generation

The third stage converts the improvement brief $`\mathbf{I}_{i}^{(r)}`$ into executable harness candidates and filters them before policy alignment. The generator may revise the internal planning, action, memory, and wiring logic, but must preserve the dataset, evaluator, backend model, benchmark runner, and task labels. This constraint ensures that improvements come from harness tailoring rather than task-specific shortcuts.

In brief, it instructs the meta-agent to generate a production-ready harness candidate from the current harness, the module-localized fault report $`\mathbf{F}_{i}^{(r)}`$, the archive-guided improvement brief $`\mathbf{I}_{i}^{(r)}`$, and selected reference examples. The prompt requires the generated harness to be self-contained, importable, compatible with the expected builder interface, and organized into the required planning, action, memory, and wiring files. It also asks the meta-agent to implement evidence-grounded module-level repairs, preserve useful parent-harness behaviors, avoid cosmetic or unrelated changes, and prevent hard-coded benchmark shortcuts. After generation, candidates are checked by smoke tests and evaluated under a bounded rollout budget; only valid and Pareto-competitive survivors are passed to the policy-alignment stage.

Concretely, we instantiate this operation with the following prompt:

![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-0fef86d340eaab1ac96a36f36e952bcb8c6e4745.svg]]

#### C.4.4 Retry Mechanism

Generated harnesses may contain implementation errors even when their high-level design is useful. Before rollout validation, we apply a lightweight smoke-test for importability, builder-interface compatibility, provider signatures, tool-call format validity, and execution on diagnostic examples. Failed candidates are returned to the meta-agent with the error trace and intended improvement brief for repair. We allow at most $`N_{\mathrm{retry}}=3`$ repair attempts; candidates that still fail are discarded before validation. This prevents invalid harnesses from consuming rollout budget, and the surviving executable harnesses are passed to harness-conditioned policy alignment.

#### C.4.5 Filter and Archive Update

HarnessForge uses a budgeted half-selection protocol to filter generated harness candidates before policy alignment. Each evolution round uses an evolution batch of about $`1.2\mathrm{K}`$ tasks. Instead of evaluating every candidate on the full batch, we apply staged filtering on progressively consumed subsets. In our default setting, each filtering stage evaluates candidates on $`200`$ tasks.

Let $`\mathcal{C}_{0}^{(r)}`$ denote the pooled candidate set generated at round $`r`$. At filtering stage $`t`$, each candidate harness $`\mathcal{H}\in\mathcal{C}_{t-1}^{(r)}`$ is paired with its corresponding policy to form an executable system $`\mathcal{G}_{\mathcal{H}}`$, and is evaluated on a fresh filtering subset $`B_{r,t}`$ with $`|B_{r,t}|=200`$. We compute the multi-objective evaluation vector $`\mathbf{J}(\mathcal{G}_{\mathcal{H}};B_{r,t})`$, rank candidates by Pareto dominance with task performance as the primary tie-breaker, and retain the top half:

|  |  |  |  |
|----|----|----|----|
|  | $`\displaystyle\mathcal{C}_{t}^{(r)}=\operatorname{Half}_{\mathrm{Pareto}}\Big(\mathcal{C}_{t-1}^{(r)},\{\mathbf{J}(\mathcal{G}_{\mathcal{H}};B_{r,t})\}_{\mathcal{H}\in\mathcal{C}_{t-1}^{(r)}}\Big).`$ |  | (30) |

We use two half-selection stages by default. Thus, starting from eight generated candidates, the first $`200`$-task filtering stage retains four harnesses, and the second $`200`$-task filtering stage retains two survivor harnesses. The remaining tasks in the round batch are then used to finish rollout evaluation for the survivor harnesses. These survivor rollouts are reused for harness-conditioned policy alignment, so the policy-alignment stage does not require a separate data-collection phase.

After each filtering stage, HarnessForge updates the archive $`\mathcal{Z}^{(r)}`$. For every evaluated harness, the archive stores its design summary, parent lineage, fault report, improvement brief, rollout summary, selection status, and evaluation vector $`\mathbf{J}`$. The updated archive is used in later rounds for Pareto-aware retrieval: archive cases are selected not only by fault relevance, but also by whether they lie on or near the Pareto frontier of performance and efficiency. This makes the filtering process both budget-efficient and reproducible, while also turning past evaluations into reusable evidence for subsequent harness tailoring.

## Appendix D Policy Alignment Details

The policy side of HarnessForge is always conditioned on the selected harness and its lineage. This appendix separates the alignment protocol from the baseline-training configuration in App. [E](#A5 "Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

### D.1 Policy Lineage and Adapter Operation

HarnessForge keeps a lineage for each survivor pair. When multiple survivor harnesses descend from the same parent pair, each child receives an independent copy of the parent policy state. The copied policy is then adapted separately using trajectories collected under the corresponding child harness, so sibling survivor pairs do not share trainable adapter parameters after branching.

Operationally, we first materialize the parent lineage policy as the initialization for the child pair. The parent adapter state is folded into the child initialization, and a new harness-specific LoRA adapter is attached and trained on successful trajectories collected under the child harness. We write this update as

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\delta_{k}^{(r+1)}=\operatorname{Mat}\!\left(\delta_{\mathrm{parent}(k)}^{(r)}\right)\oplus\Delta\delta_{k}^{(r+1)},
``` |  | (31) |

where $`\operatorname{Mat}(\cdot)`$ denotes materializing the parent lineage policy for the child branch, $`\oplus`$ denotes attaching the new round-specific adapter to that materialized initialization, and $`\Delta\delta_{k}^{(r+1)}`$ is trained independently for harness $`\mathcal{H}_{k}^{(r+1)}`$. This convention makes pair lineage explicit while preserving the matched harness–policy interpretation used in the compatibility analysis.

### D.2 Trajectory Curation and Success Filtering

For each survivor harness, HarnessForge reuses rollout traces already collected during staged harness filtering. A trajectory is retained for policy alignment only when it satisfies the task-success signal used by the corresponding benchmark evaluator. The retained trajectories are then decomposed into step-level decision pairs over the active harness interface, observation history, memory state, available actions, and next behavior. This reuse keeps the default SFT instantiation rollout-neutral with respect to the harness-selection budget.

### D.3 Objective Instantiations

##### Training-objective agnostic alignment.

The policy-alignment step in HarnessForge is not tied to a specific training objective. Given a harness $`\mathcal{H}`$ and a set of harness-conditioned trajectories collected under $`\mathcal{H}`$, the goal is to update the adapter so that the reasoner can execute reliably within the interface defined by that harness. We therefore view this step as a harness-conditioned policy-alignment operator rather than an SFT-specific operator. This operator can be instantiated with supervised fine-tuning, preference optimization, or reinforcement learning objectives. In this sense, HarnessForge defines the harness-conditioned adaptation problem, while the specific optimizer determines how the policy side is updated.

##### Default policy-evolution objective.

In the main experiments, HarnessForge instantiates policy evolution with supervised fine-tuning. We use SFT for two practical reasons. First, it preserves the rollout budget: the successful trajectories used for policy learning are already collected during budgeted harness selection, so the policy step does not require a new environment-interaction phase,

|     |                                                      |     |      |
|-----|------------------------------------------------------|-----|------|
|     |                                                      
       ``` math                                              
       \mathcal{T}_{k}^{+}\subseteq\mathcal{T}_{k}^{(r+1)}.  
       ```                                                   |     | (32) |

Second, SFT gives a direct step-level supervision signal. Each retained successful rollout is decomposed into decision-level pairs,

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{D}_{\mathcal{H}_{k}}=\{(z_{t},y_{t})\mid\tau\in\mathcal{T}_{k}^{+},~t=1,\ldots,|\tau|\}.
``` |  | (33) |

Here $`z_{t}`$ contains the task, active harness specification, observation history, memory state, and available actions; $`y_{t}`$ is the demonstrated next behavior under that harness, such as a reasoning step, tool call, memory write, or final answer. The corresponding objective is

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{L}_{\mathrm{sft}}=-\sum_{(z_{t},y_{t})\in\mathcal{D}_{\mathcal{H}_{k}}}\log p_{\mathcal{R}^{(r)}_{\delta_{k}}\oplus\Delta\delta}(y_{t}\mid z_{t}).
``` |  | (34) |

Thus, SFT does not optimize a separate scalar reward; it teacher-forces the executor to imitate successful harness-conditioned decisions. This makes it a natural and rollout-efficient objective for learning harness-specific execution behaviors, including action formatting, tool-use discipline, memory utilization, verification habits, and termination control.

##### Policy-alignment objective agnosticism.

The policy-alignment step in HarnessForge is defined at the framework level rather than being tied to one particular optimization objective. Its role is to adapt the executor to the selected harness, so the same operator can be instantiated with SFT, preference-style objectives, or RL-style objectives. In this view, different objectives mainly provide different ways of converting harness-conditioned execution evidence into an updated policy: SFT imitates curated successful trajectories, preference-style training contrasts stronger and weaker executions, and RL-style training directly optimizes reward signals under the current harness.

This design makes the choice of policy optimizer a practical tradeoff rather than a methodological constraint. As shown in Tab. [3](#S4.T3 "Table 3 ‣ Adaptation necessity analysis. ‣ 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), GRPO and RLOO can bring additional improvements in several settings, suggesting that HarnessForge still has headroom when stronger policy optimization and larger interaction budgets are available. However, these methods typically require extra rollout sampling for candidate generation, preference construction, or reward estimation. By contrast, SFT can reuse trajectories already collected during harness evolution, making it a more budget-efficient default. We therefore use SFT in the main experiments as a conservative tradeoff between performance and rollout cost, while treating preference- and RL-style objectives as higher-budget instantiations of the same alignment step.

## Appendix E Baselines and Fairness Protocol

### E.1 Shared Fairness Protocol

For fair comparison, training-style baselines such as SFT, GRPO, and RLOO are paired with the same fixed base scaffold and trained on the same 3.8K trajectory pool used by HarnessForge for trajectory curation and policy alignment. These baselines therefore isolate the effect of policy optimization under a fixed execution scaffold, without performing harness evolution. Meta-agent-based harness-search baselines use the same GPT-5.5 meta-agent backend as HarnessForge. Following prior agent-search work, rollout budget counts executable environment/model rollouts, while meta-agent generation cost is treated as implementation overhead and is not included in rollout counts. The same convention is applied to HarnessForge and all meta-agent-based harness-search baselines.

### E.2 Search-Style Baselines

Search-style harness baselines use the same frozen base reasoners as HarnessForge and optimize only the external execution structure. The executor is served through an OpenAI-compatible local vLLM endpoint with deterministic decoding ($`\text{temperature}=0`$, $`\text{top-p}=1`$), Qwen3 thinking disabled, and a 300-second request timeout. The held-out test split is never used during search. TMDB and API-Bank are used only for transfer evaluation rather than task-specific evolution. For TMDB and API-Bank, all methods start from the ToolHop-evolved harness or workflow and are evaluated under the target API interface without using TMDB or API-Bank held-out test examples. Tab. [7](#A5.T7 "Table 7 ‣ E.2 Search-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") summarizes the executable search budgets used in our local baseline ports.

|  |  |  |  |  |
|----|----|----|----|----|
|  Method |  Evolution Data |  Search Budget / Max Rounds |  Validation Selection Criterion |  Task Interface / Executor |
|  ADAS |  ToolHop: 800 online-dev examples; SearchQA: 1000 offline validation examples. |  Target 30 valid agent generations; up to 3 debug attempts and 3 meta retries; invalid generations skipped. |  Select by ToolHop hybrid validation score or SearchQA validation exact-match score. |  ToolHop closed-mode tool calls; SearchQA E5 retrieval, top-$`3`$, max 4 searches, 6000-char observations; frozen executor. |
|  AFlow |  ToolHop: 800 online-dev examples; SearchQA: 1000 offline validation examples. |  Top-$`4`$ workflow sampling per round; one validation pass per workflow; SearchQA search capped at 20 rounds. |  Select the workflow with the best validation score on the corresponding task split. |  Code-represented workflows with ToolHop/SearchQA tool-call operators and no executor training. |
|  AgentSquare |  ToolHop: 800 online-dev examples; SearchQA: 1000 offline validation examples. |  Enumerates 1050 modular combinations from planning, reasoning, tool-use, and memory modules; target 30 valid generations. |  Select the best valid modular agent by validation performance. |  Same adapters as ADAS; invalid generated modules skipped; retrieval settings matched to ADAS. |
|  MaAS |  ToolHop: 800 online-dev examples; SearchQA: 1000 offline validation examples. |  Adam controller search with lr $`0.01`$, batch size 4, sample size 4; up to 9 recorded training rounds. |  Select by controller validation objective on the development split. |  Operator-controller search over 5–6 operators; no deterministic path repairs. |
|  MermaidFlow |  ToolHop: 800 online-dev examples; SearchQA: 1000 offline validation examples. |  Elite workflow sampling with Mermaid-code validation; recombination after round 4 with probability $`0.1`$; search capped by recorded evolution rounds. |  Select the best executable Mermaid workflow by validation performance. |  Mermaid graph plus executable code; SearchQA E5 retrieval, top-$`3`$, max 4 searches; deterministic executor, no policy tuning. |

Table 7: Executable configuration of search-style harness baselines. Validation statistics are used only for model or workflow selection; held-out test scores are reported in Tab. [1](#S3.T1 "Table 1 ‣ Refine-and-Filter. ‣ 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

##### Baseline-specific notes.

ADAS is used as a free-form executable agent-code search baseline; we port generated agents to the ToolHop and SearchQA runtimes and discard invalid or schema-breaking generations before held-out evaluation. AFlow searches Python workflow programs with task-specific tool-call operators, so it tests whether workflow-level code evolution alone can match paired harness–policy adaptation. AgentSquare provides a structured modular-search counterpart, combining planning, reasoning, tool-use, and memory modules under the same task adapters. MaAS searches an operator controller for multi-agent execution rather than a single explicit workflow; deterministic path-repair shortcuts are disabled in our port. MermaidFlow follows the AFlow-style workflow search protocol but constrains candidates to a Mermaid graph plus executable code representation. Across all search-style baselines, the executor policy is not trained; only the external harness or workflow structure is selected.

##### Transfer setting for TMDB and API-Bank.

TMDB and API-Bank are used only for transfer evaluation rather than task-specific harness search, because they do not provide dedicated evolution or training splits in our setting. For these two benchmarks, we start from the workflow or harness evolved on ToolHop and adapt it to the new task interface by replacing the tool APIs, environment wrappers, action schemas, and benchmark-specific execution constraints. No TMDB or API-Bank held-out test examples are used during this adaptation. This setting evaluates whether a harness discovered on ToolHop encodes reusable agent-system execution patterns that can be re-instantiated under new tools and environments.

### E.3 Training-Style Baselines

Training-style baselines keep the harness fixed and update only the model-side executor. Unless otherwise stated, the base reasoner is frozen and only LoRA adapters are updated. Tab. [8](#A5.T8 "Table 8 ‣ RLOO. ‣ E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") summarizes the shared adapter-training configuration, while Fig. [6](#A5.F6 "Figure 6 ‣ E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") reports online optimization traces for the RL-style baselines. Final comparisons are based on held-out test evaluation in Tab. [1](#S3.T1 "Table 1 ‣ Refine-and-Filter. ‣ 3.3 Fault-Guided Harness Tailoring ‣ 3 Methodology ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems").

\(a\) RLOO training diagnostics

\(b\) GRPO training diagnostics

Figure 6: Online optimization diagnostics for the RLOO and GRPO training-style baselines over the first 300 update steps. We report actor loss, rollout reward, and policy KL from the training learner. Curves are smoothed for readability; these traces are used only as training diagnostics, while final comparisons are based on blind-test evaluation.

##### SFT.

SFT trains LoRA adapters with multi-turn trajectories collected under the selected fixed-harness interface. We use rejection sampling to construct the training set: only trajectories with valid final answers and positive task feedback are retained, while failed executions, malformed action traces, and trajectories without valid answers are discarded. Given a curated trajectory dataset $`\mathcal{D}_{\mathrm{sft}}=\{(x_{i},y_{i})\}_{i=1}^{|\mathcal{D}_{\mathrm{sft}}|}`$, where $`x_{i}`$ denotes the task prompt together with the harness-conditioned interaction history and $`y_{i}`$ denotes the target assistant action/response sequence, we optimize the token-level negative log-likelihood

|  |  |  |  |
|----|----|----|----|
|  | $`\displaystyle\mathcal{L}_{\mathrm{SFT}}(\delta)=-\mathbb{E}_{(x,y)\sim\mathcal{D}_{\mathrm{sft}}}`$ |  | (35) |
|  | $`\displaystyle\left[\frac{1}{|y|}\sum_{t=1}^{|y|}\log\pi_{\theta_{0}+\delta}(y_{t}\mid x,y_{<t})\right],`$ |  |  |

where the backbone parameters $`\theta_{0}`$ are frozen and only the LoRA adapter $`\delta`$ is updated. This instantiation is rollout-budget efficient because it reuses successful trajectories already produced during harness evolution rather than requiring an additional exploration stage.

##### Reward Design.

All RL-style baselines use the same function-based verifier reward rather than a learned reward model. The rollout worker executes the complete scaffold-conditioned tool trajectory and assigns a scalar reward from the final trace. For ToolHop, the reward combines final-answer correctness and a path score that measures whether intermediate tool observations cover the annotated subtask answers, with equal weights $`0.5/0.5`$. Missing or malformed final answers incur a $`-0.1`$ penalty, and non-final tool calls beyond four are penalized by $`0.01`$ per call; the resulting score is clipped to $`[-0.1,1]`$. For SearchQA, exact-match final answers receive full credit, substring matches receive $`0.5`$ partial credit, and responses without an extractable answer receive zero. For EnvScaler-style stateful tasks, the terminal reward is the fraction of task postcondition checks satisfied after the agent calls the completion action. GRPO and RLOO share this reward function and the same terminal environment feedback, so their comparison isolates the advantage estimator rather than reward design.

##### GRPO.

GRPO normalizes group-relative advantages within the $`N=4`$ completions for each prompt. KL is not added to the reward, instead, both methods use an actor-side low-variance KL loss with coefficient $`10^{-3}`$.

##### RLOO.

RLOO uses the same on-policy scaffold agent loop as GRPO. For each prompt, the rollout worker samples $`N=4`$ trajectories. The advantage of a trajectory is computed against the mean reward of the other trajectories in the same prompt group, giving a leave-one-out baseline without training a separate value critic. We keep the clipped actor objective, token-mean loss aggregation, entropy coefficient, KL loss, and rollout budget identical to GRPO so that the comparison isolates the advantage estimator.

|  |  |
|----|----|
|  Parameter |  Value |
|  Trainable parameters |  LoRA adapters only |
|  LoRA target modules |  Attention and MLP projections |
|  LoRA rank |  8 |
|  LoRA alpha |  16 |
|  LoRA dropout |  0.05 |
|  Epoch |  1.0 |
|  Optimizer |  AdamW with bf16 training |
|  Learning rate |  $`2\times 10^{-6}`$ |
|  LR sweep |  $`\{5\times 10^{-6},1\times 10^{-5},2\times 10^{-5}\}`$ |
|  Scheduler |  Cosine decay, $`3\%`$ warmup |
|  KL coefficient |  0.01 |
|  Clip range |  0.2 |
|  Reward |  Success, validity, tool call counts |
|  GRPO $`rollout_{n}`$ |  4 rollouts per prompt |
|  RLOO $`rollout_{n}`$ |  4 rollouts per prompt |

Table 8: Training configuration for training-style baselines.

Figure 7: Fault and improvement-signal distribution across benchmarks. Each row is normalized within a benchmark, and columns group repair signals into planning-, action-, and memory-related categories.

## Appendix F Reproducibility Artifacts

##### Reproducibility of Meta-Agent Harness Evolution.

HarnessForge uses a strong meta-agent for harness evolution, but implements it as a staged operator with fixed input-output contracts rather than an unconstrained generation call. Each stage takes structured inputs, including the parent harness, rollout evidence, evaluation summaries, and archive records, and produces schema-controlled artifacts such as fault reports, evolution manifests, harness-candidate manifests, and smoke-test logs. These artifacts record the diagnosed failure modes, responsible modules, supporting evidence, edited components, repair priorities, and expected behavioral changes, making the evolution process auditable rather than opaque.

We support reproducibility at two levels. For result-level replay, we release the final selected harness–policy pairs, including evolved harnesses, adapter checkpoints and configurations, benchmark wrappers, evaluation scripts, and split identifiers. This allows the reported systems to be evaluated without re-running meta-agent evolution. For process-level auditability, we release the prompts, operator schemas, generated reports, candidate manifests, smoke-test outcomes, and survivor-selection logs used during evolution. These records expose how each harness was generated, what failure it aimed to repair, and why it was retained.

Because meta-agent outputs may vary across model versions and providers, we do not assume exact regeneration of every intermediate candidate. Instead, our artifact release separates replaying the final executable systems from re-instantiating the evolution protocol. The released schemas and stage-wise contracts allow future work to replace the proprietary meta-agent with alternative closed- or open-source models under the same evolution interface and selection procedure.

## Appendix G Additional Results and Analysis

### G.1 Adaptation Necessity Analysis

Figs. [4](#S4.F4 "Figure 4 ‣ Rollout-budget efficiency. ‣ 4.4 Framework Analysis ‣ 4 Experiments ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") and Figs. [8](#A7.F8 "Figure 8 ‣ G.1 Adaptation Necessity Analysis ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") provide full harness–policy compatibility matrices on API-Bank and ToolHop. Rows correspond to evolved harnesses, columns correspond to evolved policies, and each cell evaluates one cross-combination of a harness and a policy. The diagonal entries therefore represent the matched harness–policy pairs produced by HarnessForge across co-evolution rounds.

The matrices show that matched pairs generally achieve stronger performance than mismatched combinations. Along the diagonal, performance improves as evolution proceeds, indicating that gains accumulate through progressive harness–policy co-evolution rather than from a single late-stage component. Off-diagonal entries reveal the compatibility gap: later policies do not always transfer cleanly to earlier or non-corresponding harnesses, and strong harnesses may underperform when paired with misaligned policies. This pattern supports our main claim that HarnessForge improves agent systems by evolving compatible harness–policy pairs, rather than independently optimizing reusable harnesses or universally stronger policies.

Refer to caption

Figure 8: Harness–policy compatibility matrix on ToolHop. Rows denote evolved harnesses and columns denote evolved policies across co-evolution rounds.

### G.2 Module-Level Repair Statistics

Fig. [7](#A5.F7 "Figure 7 ‣ RLOO. ‣ E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") shows that harness failures are module-specific and benchmark-dependent. Action-side signals dominate on API-heavy benchmarks such as API-Bank and TMDB, where common failures include invalid API formats, schema mismatches, missing guards, repeated actions, and incorrect endpoint or tool selection. These tasks therefore benefit most from action-layer repairs such as stricter format contracts, schema preflight, and loop prevention.

Planning-side signals are more visible on retrieval-heavy and multi-hop benchmarks. The SearchQA variants mainly require current-query repair and stronger coupling between search actions and supporting evidence, while ToolHop more often requires preserving multi-hop tool chains and grounding final answers in the accumulated evidence. These patterns indicate that planning repairs are most useful when success depends on maintaining the right intermediate intent across several reasoning or retrieval steps.

Memory-related signals are smaller but still meaningful. They typically appear as co-repairs with planning or action modules, suggesting that memory quarantine acts as a stabilizing layer rather than an isolated repair target. It helps prevent stale or irrelevant traces from disrupting otherwise valid plans and tool actions. Overall, the heatmap suggests a clear division of repair pressure: API tasks stress action reliability, search tasks stress query planning and evidence coupling, multi-hop tool-use tasks stress path preservation, and memory repairs provide cross-cutting execution stability.

### G.3 Case Study

To complement the aggregate repair statistics in Fig. [7](#A5.F7 "Figure 7 ‣ RLOO. ‣ E.3 Training-Style Baselines ‣ Appendix E Baselines and Fairness Protocol ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"), we present five representative parent–child trajectory comparisons in Figs. [9](#A7.F9 "Figure 9 ‣ Case 5: REST-style endpoint routing. ‣ G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems")–[13](#A7.F13 "Figure 13 ‣ Case 5: REST-style endpoint routing. ‣ G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems"). Each case shows how HarnessForge turns a recurring trajectory-level failure into a reusable repair over planning, action, or memory.

##### Case 1: Multi-hop comparison.

Fig. [9](#A7.F9 "Figure 9 ‣ Case 5: REST-style endpoint routing. ‣ G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") shows that the child harness replaces repeated unsupported finalization with entity-level evidence slots and support-record verification.

##### Case 2: Structured API execution.

Fig. [10](#A7.F10 "Figure 10 ‣ Case 5: REST-style endpoint routing. ‣ G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") illustrates API-route repair: the child harness follows the required authentication–deletion sequence and enforces the expected API-request output format.

##### Case 3: Retrieval-heavy multi-hop QA.

Fig. [11](#A7.F11 "Figure 11 ‣ Case 5: REST-style endpoint routing. ‣ G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") shows current-query repair, where the child harness avoids stale repeated searches and grounds the final answer in question-specific evidence.

##### Case 4: Multi-hop tool-chain execution.

Fig. [12](#A7.F12 "Figure 12 ‣ Case 5: REST-style endpoint routing. ‣ G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") demonstrates schema-guarded tool use: the child harness preserves the source–intermediate–transform chain while normalizing invalid date-tool arguments.

##### Case 5: REST-style endpoint routing.

Fig. [13](#A7.F13 "Figure 13 ‣ Case 5: REST-style endpoint routing. ‣ G.3 Case Study ‣ Appendix G Additional Results and Analysis ‣ HarnessForge: Joint Harness and Policy Evolution for Adaptive Agent Systems") shows endpoint-routing repair, where the child harness avoids unnecessary season-level calls and retrieves the answer from the correct TV-detail endpoint.

Overall, these cases show that HarnessForge improves execution behavior by modifying reusable interfaces, such as evidence slots, schema guards, support records, API contracts, and memory quarantine, rather than applying task-specific answer patches.

Refer to caption

Figure 9: Case Study 1: evidence-supported finalization for multi-hop comparison. The child harness replaces repeated unsupported finalization with entity-level evidence slots and support-record verification.

Refer to caption

Figure 10: Case Study 2: API-contract repair for account deletion. The child harness follows the required API route and emits the final answer in the expected API-request format.

Refer to caption

Figure 11: Case Study 3: current-query repair for retrieval-heavy multi-hop QA. The child harness replaces stale repeated searches with question-grounded queries and support-record finalization.

Refer to caption

Figure 12: Case Study 4: schema-guarded multi-hop tool-chain repair. The child harness preserves the source–intermediate–transform path while repairing invalid date-tool arguments.

Refer to caption

Figure 13: Case Study 5: endpoint-routing repair in TMDB-style API use. The child harness routes to the correct TV-detail endpoint and avoids unnecessary repeated season-level calls.

Experimental support, please [view the build logs](./2606.01779v1/__stdout.txt) for errors. Generated by [ L A T E xml ![\[LOGO\]](/Users/junjian/GitHub/wang-junjian/wikillm/.scratch/harness-batch-2/media/HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems/055b977d0a6a655149fabb1dc4ed16049b0af31f.png)](https://math.nist.gov/~BMiller/LaTeXML/) .

## Instructions for reporting errors

We are continuing to improve HTML versions of papers, and your feedback helps enhance accessibility and mobile support. To report errors in the HTML that will help us improve conversion and rendering, choose any of the methods listed below:

- Click the "Report Issue" (![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-a556641380f7b97e2e131566a80a75ad0f230978.svg]]) button, located in the page header.

**Tip:** You can select the relevant text first, to include it in your report.

Our team has already identified [the following issues](https://github.com/arXiv/html_feedback/issues). We appreciate your time reviewing and reporting rendering errors we may not have found yet. Your efforts will help us improve the HTML versions for all readers, because disability should not be a barrier to accessing research. Thank you for your continued support in championing open access for all.

Have a free development cycle? Help support accessibility at arXiv! Our collaborators at LaTeXML maintain a [list of packages that need conversion](https://github.com/brucemiller/LaTeXML/wiki/Porting-LaTeX-packages-for-LaTeXML), and welcome [developer contributions](https://github.com/brucemiller/LaTeXML/issues).

We gratefully acknowledge support from our **major funders**, [**member institutions**](https://info.arxiv.org/about/ourmembers.html), , and all contributors.

[About](https://info.arxiv.org/about) · [Help](https://info.arxiv.org/help) · [Contact](https://info.arxiv.org/help/contact.html) · [Subscribe](https://info.arxiv.org/help/subscribe) · [Copyright](https://info.arxiv.org/help/license/index.html) · [Privacy](https://info.arxiv.org/help/policies/privacy_policy.html) · [Accessibility](https://info.arxiv.org/help/web_accessibility.html) · [Operational Status (opens in new tab)](https://status.arxiv.org)

Major funding support from

[Simons Foundation](https://www.simonsfoundation.org/) [Simons Foundation International](https://www.sfi.org.bm/) [Schmidt Sciences](https://www.schmidtsciences.org/)

[![[HarnessForge Joint Harness and Policy Evolution for Adaptive Agent Systems-ee4fa28cc5b5a2e145a514bf2b95e569978d92fb.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")
