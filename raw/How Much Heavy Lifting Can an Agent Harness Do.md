---
title: "How Much Heavy Lifting Can an Agent Harness Do?"
source: "https://arxiv.org/html/2604.07236v1"
author:
published: 2026-04
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

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html) [![[How Much Heavy Lifting Can an Agent Harness Do-9460bfd162f6dd2b64933716701d8b45644b7907.svg]] Report Issue](# "Report an Issue") [![[How Much Heavy Lifting Can an Agent Harness Do-f4ed920725e9b5296c72053a104d078507650738.svg]] Back to Abstract](/abs/2604.07236v1 "Back to abstract page") [![[How Much Heavy Lifting Can an Agent Harness Do-4bbb243fc6a5e4dd4d39aba2869aefc67b826b09.svg]] Download PDF](/pdf/2604.07236v1 "Download PDF") [![[How Much Heavy Lifting Can an Agent Harness Do-0dba01bd0011e6490f7c1a4e47e93ab96d726eeb.svg]]](javascript:toggleNavTOC(); "Toggle navigation") [![[How Much Heavy Lifting Can an Agent Harness Do-98a8199842c1940bd0868e386354f161924d800b.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")

![[How Much Heavy Lifting Can an Agent Harness Do-80caa2dcce69c296ad0598f894738eb7727e6bba.svg]] ![[How Much Heavy Lifting Can an Agent Harness Do-b2ea290a36a1f7fb9e144d575314ef3789ddadf3.svg]] ![[How Much Heavy Lifting Can an Agent Harness Do-1aaf13981d449dba7bb168c83f444fcbda5674e4.svg]]

1.  [Abstract](#abstract1 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
2.  [1 Introduction](#S1 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    1.  [Contributions.](#S1.SS0.SSS0.Px1 "In 1 Introduction ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
3.  [2 Related Work](#S2 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    1.  [LLM agents.](#S2.SS0.SSS0.Px1 "In 2 Related Work ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    2.  [Program-guided agents.](#S2.SS0.SSS0.Px2 "In 2 Related Work ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    3.  [Metacognitive agents.](#S2.SS0.SSS0.Px3 "In 2 Related Work ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    4.  [Collaborative Battleship.](#S2.SS0.SSS0.Px4 "In 2 Related Work ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
4.  [3 Method](#S3 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    1.  [3.1 Declared Reflective Runtime Protocol](#S3.SS1 "In 3 Method ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    2.  [3.2 Runtime Instantiation](#S3.SS2 "In 3 Method ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    3.  [3.3 Agent Family](#S3.SS3 "In 3 Method ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
5.  [4 Experimental Setup](#S4 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
6.  [5 Results](#S5 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    1.  [5.1 RQ1: Explicit World Models Matter](#S5.SS1 "In 5 Results ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    2.  [5.2 RQ2: Symbolic Self-Revision Exists, but Needs Calibration](#S5.SS2 "In 5 Results ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
        1.  [Case study: B17-seed0.](#S5.SS2.SSS0.Px1 "In 5.2 RQ2: Symbolic Self-Revision Exists, but Needs Calibration ‣ 5 Results ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    3.  [5.3 RQ3: How Much LLM?](#S5.SS3 "In 5 Results ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
7.  [6 Discussion](#S6 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    1.  [Decomposition as methodology.](#S6.SS0.SSS0.Px1 "In 6 Discussion ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    2.  [What externalized reflection buys.](#S6.SS0.SSS0.Px2 "In 6 Discussion ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    3.  [F1/win-rate divergence.](#S6.SS0.SSS0.Px3 "In 6 Discussion ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    4.  [Relation to prior work.](#S6.SS0.SSS0.Px4 "In 6 Discussion ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
8.  [7 Conclusion](#S7 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
9.  [8 Limitations](#S8 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    1.  [Single domain.](#S8.SS0.SSS0.Px1 "In 8 Limitations ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    2.  [Reimplementation setting.](#S8.SS0.SSS0.Px2 "In 8 Limitations ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    3.  [Statistical power.](#S8.SS0.SSS0.Px3 "In 8 Limitations ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    4.  [Revision calibration.](#S8.SS0.SSS0.Px4 "In 8 Limitations ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    5.  [Sparse sweep and model specificity.](#S8.SS0.SSS0.Px5 "In 8 Limitations ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
10. [A Threshold Sweep Detail](#A1 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
11. [B B17-seed0 Trace Summary](#A2 "In How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")
    1.  [Code availability.](#A2.SS0.SSS0.Px1 "In Appendix B B17-seed0 Trace Summary ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision")

[License: CC BY 4.0](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2604.07236v1 \[cs.AI\] 08 Apr 2026

How Much LLM Does a Self-Revising Agent Actually Need?\
Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision
==============================================================================

Seongwoo Jeong Affiliation: Independent Researcher Correspondence to: [sigran0@gmail.com](mailto:)    Seonil Son Affiliation: RLWRLD.AI, Seoul, South Korea Correspondence to: [simon.son@rlwrld.ai](mailto:)

###### Abstract

Recent LLM-based agents often place world modeling, planning, and reflection inside a single language model loop. This can produce capable behavior, but it makes a basic scientific question difficult to answer: which part of the agent’s competence actually comes from the LLM, and which part comes from explicit structure around it?

We study this question not by claiming a general answer, but by making it empirically tractable. We introduce a declared reflective runtime protocol that externalizes agent state, confidence signals, guarded actions, and hypothetical transitions into inspectable runtime structure. We instantiate this protocol in a declarative runtime and evaluate it on noisy Collaborative Battleship \[4\] using four progressively structured agents over 54 games (18 boards $`\times`$ 3 seeds).

The resulting decomposition isolates four components: posterior belief tracking, explicit world-model planning, symbolic in-episode reflection, and sparse LLM-based revision. Across this decomposition, explicit world-model planning improves substantially over a greedy posterior-following baseline (+24.1pp win rate, +0.017 F1). Symbolic reflection operates as a real runtime mechanism—with prediction tracking, confidence gating, and guarded revision actions—even though its current revision presets are not yet net-positive in aggregate. Adding conditional LLM revision at about 4.3% of turns yields only a small and non-monotonic change: average F1 rises slightly (+0.005) while win rate drops (31$`\rightarrow`$29 out of 54).

These results suggest a methodological contribution rather than a leaderboard claim: externalizing reflection turns otherwise latent agent behavior into inspectable runtime structure, allowing the marginal role of LLM intervention to be studied directly.

###### Keywords: 

LLM Agents, Harness Design, Reflective Runtime, World Modeling, Metacognition

## 1 Introduction

Many recent LLM agents bundle world modeling, planning, and reflection inside a single language model loop \[12, 9, 11\]. This can produce capable behavior, but it makes a basic scientific question difficult to answer: which part of the agent’s competence actually comes from the LLM, and which part comes from explicit structure around it? In practice, prompts, latent reasoning, and external control logic are often entangled.

We study this question not by claiming a general answer, but by making it empirically tractable. We introduce a declared reflective runtime protocol that externalizes agent state, confidence signals, guarded actions, and hypothetical transitions. This allows belief tracking, planning, symbolic reflection, and LLM-based revision to be separated into distinct, measurable layers within one agent family. We instantiate this protocol in a declarative runtime and evaluate it on noisy Collaborative Battleship \[4\].

The resulting agents form a progression: a pure posterior-argmax baseline, a world-model planner, a symbolic reflective agent, and a reflective agent with conditional LLM access. This design lets us ask progressively sharper questions. Does a declared world model with planning outperform pure posterior argmax? Can in-episode self-revision operate symbolically without any LLM calls? And once reflective control is explicit, what measurable benefit remains for sparse LLM intervention?

We frame our investigation around three research questions:

- •
  RQ1. What performance gain comes from making world structure and question strategy explicit in a declared runtime?
- •
  RQ2. Can an agent perform in-episode self-revision symbolically, as a runtime operation, without invoking an LLM?
- •
  RQ3. After world modeling and reflection are externalized, what marginal benefit remains for sparse LLM intervention?

This paper does not offer a definitive answer to how much LLM a planning agent needs. Instead, it provides a first empirical decomposition that makes the contributions of belief tracking, explicit world-model planning, symbolic reflection, and sparse LLM revision separately measurable.

#### Contributions.

- •
  We introduce a declared reflective runtime protocol that externalizes prediction, reconciliation, confidence tracking, and guarded revision into explicit runtime structure.
- •
  We provide an empirical decomposition of four agent layers—belief tracking, explicit world-model planning, symbolic reflection, and sparse LLM revision—using a common Battleship evaluation harness.
- •
  We show that externalizing reflection makes the marginal role of LLM intervention measurable: explicit planning yields the clearest gain, symbolic reflection exists as a runtime mechanism even when not yet net-positive on aggregate, and sparse LLM revision produces small, non-monotonic effects.

## 2 Related Work

#### LLM agents.

ReAct \[12\] couples LLM reasoning with tool use per step. Reflexion \[9\] adds verbal self-reflection between episodes. DisCIPL \[5\] has a planner LLM write inference programs for smaller follower models. These keep reflection inside the LLM; we move it into a declared runtime.

#### Program-guided agents.

WorldCoder \[10\] uses an LLM to generate Python world models refined through interaction. LLM+P \[7\] translates natural language into PDDL for a symbolic planner. In each case the LLM creates the world model. Our approach differs: a human declares the world model in a non-Turing-complete DSL, and the LLM is available only as a conditional effect.

#### Metacognitive agents.

Soar \[6\] integrates planning with impasse-driven meta-level intervention. MIDCA \[2\] separates cognitive and metacognitive loops. HYDRA \[8\] detects environment novelty and repairs PDDL+ domains via heuristic search across episodes. Pathak et al. \[13\] track world-model prediction error in a separate self-model to guide exploration; our approach instead integrates error tracking into the same declared substrate that executes actions. Our approach shares the expectation-monitoring principle with HYDRA but differs in that (1) metacognition is declared inside the world model as computed signals and guarded actions, (2) revision is in-episode, and (3) the loop operates without LLM calls.

#### Collaborative Battleship.

Grand et al. \[4\] propose an 8$`\times`$8, 14-ship-cell collaborative Battleship benchmark for LLM-based Bayesian experimental design. Their best system (GPT-5 + LIPS + QMD) achieves F1 0.764 and 82% win rate under $`\varepsilon=0.1`$ noise. We use the same game constraints and noise parameters but note that our evaluation uses a synthetic board suite rather than the published benchmark configuration, so we treat their results as a directional reference rather than a direct comparison target.

## 3 Method

### 3.1 Declared Reflective Runtime Protocol

Our protocol rests on four elements: explicit state (world state, prediction records, error tracking, policy parameters), computed confidence signals (model confidence, revision eligibility, action preferences derived deterministically from state), guarded actions (actions with available when preconditions including revision actions gated on sustained low confidence and positive revision preview), and hypothetical transitions (sim.next(snapshot, action) for pre-commitment evaluation).

The central loop is: (1) score candidates via sim.next(); (2) record the predicted outcome; (3) execute and observe; (4) reconcile prediction with observation to update confidence; and (5) if confidence falls sufficiently, apply a policy revision. The contribution is not the loop itself—predict-compare-revise has a long history \[1, 3\]—but that it is made explicit and inspectable in a declared runtime.

The key design point is that revision eligibility is itself declared runtime structure. The following pseudo-code, drawn from the reflective world model, illustrates the core:

[⬇](data:text/plain;base64,Y29tcHV0ZWQgbW9kZWxDb25maWRlbmNlID0gMSAtIChwcmVkaWN0aW9uRXJyb3JFTUEgKyBjYWxpYnJhdGlvbkVycm9yRU1BKSAvIDIKY29tcHV0ZWQgY29uZmlkZW50ICAgICAgID0gbW9kZWxDb25maWRlbmNlID49IGNvbmZpZGVuY2VUaHJlc2hvbGQKY29tcHV0ZWQgbmVlZFJldmlzaW9uICAgID0gbm90IGNvbmZpZGVudApjb21wdXRlZCBjYW5SZXZpc2UgICAgICAgPSBuZWVkUmV2aXNpb24gYW5kIChjb29sZG93blJlbWFpbmluZyA9IDApCmNvbXB1dGVkIHN1c3RhaW5lZCAgICAgICA9IGxvd0NvbmZpZGVuY2VTdHJlYWsgPj0gMgoKY29tcHV0ZWQgcmV2aXNpb25SZXF1ZXN0ZWQgPSBjYW5SZXZpc2UgYW5kIHN1c3RhaW5lZAogICAgICAgICAgICAgICAgICAgICAgICAgICBhbmQgcG9zaXRpdmVQcmV2aWV3IGFuZCAocmV2aXNpb25LaW5kICE9ICIiKQpjb21wdXRlZCBzaG91bGRSZXZpc2UgICAgICA9IHJldmlzaW9uRW5hYmxlZCBhbmQgcmV2aXNpb25SZXF1ZXN0ZWQKCmFjdGlvbiBhcHBseVJldmlzaW9uIGF2YWlsYWJsZSB3aGVuIHNob3VsZFJldmlzZToKICAgIHBhdGNoIHBvbGljeVBhcmFtZXRlcnMgPC0gbmV4dFBhcmFtZXRlcnMKICAgIHBhdGNoIGNvb2xkb3duIDwtIGNvb2xkb3duVHVybnM=)

computed modelConfidence = 1 - (predictionErrorEMA + calibrationErrorEMA) / 2

computed confident = modelConfidence \>= confidenceThreshold

computed needRevision = not confident

computed canRevise = needRevision and (cooldownRemaining = 0)

computed sustained = lowConfidenceStreak \>= 2

computed revisionRequested = canRevise and sustained

and positivePreview and (revisionKind != "")

computed shouldRevise = revisionEnabled and revisionRequested

action applyRevision available when shouldRevise:

patch policyParameters \<- nextParameters

patch cooldown \<- cooldownTurns

This makes reflection a declared legality structure rather than a prompt pattern: confidence, revision eligibility, and the revision itself are computed, inspectable, and enforced through guarded actions. The base world model (used by WMA) includes prediction tracking but does not declare the sustained-confidence gate, revision preview, or guarded revision actions. The difference between the two models constitutes the metacognition layer.

### 3.2 Runtime Instantiation

We instantiate the protocol in a declarative runtime.¹¹ 1 Core runtime repository: [https://github.com/manifesto-ai/core](https://github.com/manifesto-ai/core). The Battleship world model is expressed in a non-Turing-complete DSL that provides declared state, computed signals, guarded actions, and hypothetical transitions. In this paper the runtime is the implementation vehicle rather than the main experimental variable.

### 3.3 Agent Family

greedy+MCMC maintains a 500-particle posterior over ship placements and fires at the highest-probability cell; it asks no questions and performs no revision. WMA adds declared world-model planning with sim.next() evaluation of shooting and questioning actions under coarse, local, and late question budgets; the question policy itself is part of the declared planning substrate. MRA adds the predict-compare-revise loop and three symbolic presets (coarse_roi_collapse, late_diffuse_reprobe, cluster_closeout_bias) without using an LLM. MRA-LLM uses the same reflective protocol but can delegate revision to a local 9B LLM when the confidence gate opens, making measured LLM rate a dependent variable of the threshold setting.

## 4 Experimental Setup

All experiments use noisy Collaborative Battleship (8$`\times`$8, 14 ship cells, 40 shots, 15 questions, $`\varepsilon=0.1`$) with MCMC belief (500 particles). Results are reported over 18 boards $`\times`$ 3 seeds = 54 games. Our evaluation uses a synthetic board suite; we therefore treat published results from \[4\] as a directional reference rather than a strict comparison target.

The key comparisons are threefold: greedy+MCMC vs. WMA for the world-model contribution; MRA revision-off vs. revision-on for symbolic reflection; and MRA-LLM threshold 0.0 vs. 1.0 for sparse LLM revision.

## 5 Results

### 5.1 RQ1: Explicit World Models Matter

| System      | Avg F1 | Wins  | Win Rate | Avg Q | LLM Rate |
|-------------|--------|-------|----------|-------|----------|
| greedy+MCMC | 0.522  | 27/54 | 50.0%    | 0.0   | 0%       |
| WMA         | 0.539  | 40/54 | 74.1%    | 11.9  | 0%       |
| $`\Delta`$  | +0.017 | +13   | +24.1pp  | +11.9 | —        |

Table 1: World model ablation.

Table [1](#S5.T1 "Table 1 ‣ 5.1 RQ1: Explicit World Models Matter ‣ 5 Results ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision") shows the world-model ablation results. Both systems share the same MCMC belief backend; the improvement is attributable to declared world-model planning and question strategy. The asymmetry between the modest F1 gain and the large win-rate gain indicates that questions serve a “last mile” function: sim.next()-evaluated question planning converts borderline games into wins without dramatically changing overall targeting precision.

A potential concern is that greedy+MCMC is a weak baseline since it asks no questions. We note that the question policy itself—selecting which question to ask and when—is evaluated through sim.next() and governed by declared budget constraints. The gain is therefore not “just asking questions” but asking questions selected and timed by the declared planning substrate.

### 5.2 RQ2: Symbolic Self-Revision Exists, but Needs Calibration

|                  |            |        |            |
|------------------|------------|--------|------------|
| System           | Avg F1     | Wins   | Win Rate   |
| MRA revision-off | 0.552      | 31/54  | 57.4%      |
| MRA revision-on  | 0.551      | 30/54  | 55.6%      |
| $`\Delta`$       | $`-0.001`$ | $`-1`$ | $`-1.8`$pp |

Table 2: Revision ablation.

Table [2](#S5.T2 "Table 2 ‣ 5.2 RQ2: Symbolic Self-Revision Exists, but Needs Calibration ‣ 5 Results ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision") shows that revision-on does not outperform revision-off on aggregate. We therefore do not claim that the current revision rule set improves the agent on average. Instead, the evidence shows that symbolic reflection exists as a real runtime mechanism whose effectiveness depends on calibration.

Recovery boards where revision helps include B02 (+0.140 F1, 1$`\rightarrow`$3 wins), B14 (+0.099), B17 (+0.092), and B09 (+0.076). Over-revision boards where revision hurts include B01 ($`-0.148`$), B15 ($`-0.085`$), and B11 ($`-0.079`$).

#### Case study: B17-seed0.

With revision on, MRA wins (F1 0.609): coarse_roi_collapse fires at turn 2, and cluster_closeout_bias fires at turns 12 and 15. With revision off, MRA loses (F1 0.333, 40 shots exhausted). Appendix Figure [1](#A2.F1 "Figure 1 ‣ Appendix B B17-seed0 Trace Summary ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision") gives a compact qualitative trace of this divergence. The mechanism is decisive in this case, even if the current presets are not globally calibrated.

The methodological point is that a mixed aggregate ablation shows the presets need calibration, not that the mechanism is absent. Making reflection an explicit runtime operation—rather than a latent prompt pattern—is what enables this kind of targeted diagnosis.

### 5.3 RQ3: How Much LLM?

| System         | Avg F1 | Wins  | Win Rate | Avg Q | LLM Rate |
|----------------|--------|-------|----------|-------|----------|
| greedy+MCMC    | 0.522  | 27/54 | 50.0%    | 0.0   | 0%       |
| WMA            | 0.539  | 40/54 | 74.1%    | 11.9  | 0%       |
| MRA rev-off    | 0.552  | 31/54 | 57.4%    | 8.0   | 0%       |
| MRA rev-on     | 0.551  | 30/54 | 55.6%    | 8.0   | 0%       |
| MRA-LLM th=0.0 | 0.552  | 31/54 | 57.4%    | 8.0   | 0%       |
| MRA-LLM th=1.0 | 0.557  | 29/54 | 53.7%    | 8.9   | 4.3%     |

Table 3: Main comparison.

Table [3](#S5.T3 "Table 3 ‣ 5.3 RQ3: How Much LLM? ‣ 5 Results ‣ How Much LLM Does a Self-Revising Agent Actually Need?Empirical Decomposition of World Modeling, Reflection, and Sparse LLM Revision") summarizes the main comparison across the agent family. We vary the confidence threshold and measure LLM invocation rate as a dependent variable. At threshold 0.0, model confidence never triggers revision; the system matches MRA revision-off. At threshold 1.0, a measured 4.3% of turns invoke the LLM (101 turns across 54 games).

Threshold 1.0 achieves the highest average F1 (0.557) but the lowest win rate among MRA variants (53.7%). LLM revision appears to improve local targeting quality while sometimes disrupting game-level completion. This F1/win-rate tension suggests that LLM revision decisions may interfere with question-budget allocation that the symbolic policy has optimized for completion.

A preliminary sweep on 18 games shows consistent non-monotonicity: thresholds 0.0 and 0.5 collapse into a no-LLM basin, threshold 1.0 produces the best F1 and win rate in that sample, but the pattern partially reverses at larger scale. This underscores the need for larger evaluation but preserves the qualitative finding.

Once the reflective loop is explicit, the LLM is neither the whole agent nor uniformly beneficial. It is a sparse revision resource whose contribution is bounded, measurable, and non-monotonic in this evaluation setting.

## 6 Discussion

#### Decomposition as methodology.

The primary contribution of this work is not a particular performance number but a decomposition that makes four layers of agent competence separately visible. greedy+MCMC isolates belief; WMA adds declared planning; MRA adds symbolic reflection; MRA-LLM adds sparse LLM revision. Each layer’s contribution can now be measured, ablated, and studied independently. This is what we mean by making LLM contribution measurable.

#### What externalized reflection buys.

Even where MRA does not improve aggregate scores, making revision explicit changes what can be studied and controlled. Prediction error, calibration error, confidence, revision eligibility, and revision outcomes become first-class runtime variables. This turns “reflection” from an opaque prompting pattern into an inspectable mechanism with diagnosable failure modes—as demonstrated by the B17-seed0 trace.

#### F1/win-rate divergence.

WMA achieves the highest win rate (74.1%) with about 12 questions, whereas MRA variants use about 8. Question budget appears critical for game completion. LLM revision adds questions (MRA-LLM th=1.0 averages 8.9) but may consume turns that would be more valuable as strategically timed questions.

#### Relation to prior work.

A substantial F1 gap remains relative to \[4\] (0.764 F1, 82% win rate). Because our evaluation uses a reimplementation setting rather than the exact published configuration, we treat this comparison as directional. A plausible contributor to the gap is the absence of LIPS-style language-informed belief integration. Our contribution is orthogonal: we offer a decomposition methodology, not a competing SOTA claim. Relative to HYDRA \[8\] and Soar \[6\], our metacognition is declared inside the world model, in-episode, LLM-free, and traceable through snapshots.

## 7 Conclusion

In this evaluation setting, making world structure and reflection explicit makes a substantial portion of the agent’s control structure inspectable and executable without per-turn LLM intervention, while LLM revision remains a bounded residual. The main result is methodological: externalizing reflection into declared runtime structure turns the question “how much LLM does an agent need?” from an unanswerable entanglement into a measurable decomposition. Explicit planning yields the clearest gain. Symbolic reflection exists as a real runtime mechanism with diagnosable strengths and failure modes. Sparse LLM revision is measurably non-monotonic.

These findings suggest a design principle: declare what you can, reflect symbolically where possible, and reserve the LLM for the residual that the declared substrate cannot resolve. In that design, the question is no longer whether an agent uses an LLM everywhere, but where LLM intervention is empirically justified—and the declared reflective protocol provides the instrumentation to answer.

## 8 Limitations

#### Single domain.

All results are from Collaborative Battleship. The protocol is domain-general in principle but untested elsewhere.

#### Reimplementation setting.

We use a synthetic board suite and MCMC belief rather than the exact configuration of \[4\]. Comparisons with their published results are therefore directional.

#### Statistical power.

Fifty-four games reveal qualitative patterns but do not support tight confidence intervals. We present this as an empirical decomposition, not a definitive benchmark result.

#### Revision calibration.

Symbolic revision is not net-positive on aggregate. The current three-preset rule set helps on belief-collapse boards but over-revises on stable boards.

#### Sparse sweep and model specificity.

The threshold sweep establishes non-monotonicity but does not characterize the full LLM-benefit curve, and the observed tradeoff may depend on the single local 9B model used here.

## References

\[1\] Boyd, J. (1960). The OODA Loop.

\[2\] Cox, M. et al. (2016). MIDCA: A Metacognitive Integrated Dual-Cycle Architecture. AAAI Workshop.

\[3\] Friston, K. (2010). The free-energy principle: a unified brain theory? *Nature Reviews Neuroscience*, 11(2).

\[4\] Grand, G. et al. (2025a). Collaborative Battleship with LLMs as Bayesian Experimental Designers.

\[5\] Grand, G. et al. (2025b). Self-Steering Language Models (DisCIPL). COLM 2025.

\[6\] Laird, J., Newell, A., Rosenbloom, P. (1990). Soar: An architecture for general intelligence. *Artificial Intelligence*, 33(1).

\[7\] Liu, B. et al. (2023). LLM+P: Empowering LLMs with Optimal Planning Proficiency.

\[8\] Piotrowski, W. et al. (2023). HYDRA: Adaptive Operation in Evolving Open Worlds.

\[9\] Shinn, N. et al. (2023). Reflexion: Language Agents with Verbal Reinforcement Learning. NeurIPS 2023.

\[10\] Tang, H., Key, D., Ellis, K. (2024). WorldCoder: A Model-Based LLM Agent. NeurIPS 2024.

\[11\] Wang, G. et al. (2023). Voyager: An Open-Ended Embodied Agent with Large Language Models.

\[12\] Yao, S. et al. (2023). ReAct: Synergizing Reasoning and Acting in Language Models. ICLR 2023.

\[13\] Haber, N., Mrowca, D., Wang, S., Fei-Fei, L., Yamins, D. L. K. (2018). Learning to Play With Intrinsically-Motivated, Self-Aware Agents. NeurIPS 2018.

## Appendix A Threshold Sweep Detail

| Scope    | Threshold | LLM Rate | Avg F1 | Win Rate |
|----------|-----------|----------|--------|----------|
| 18 games | 0.0       | 0.0%     | 0.522  | 50.0%    |
| 18 games | 0.5       | 0.0%     | 0.522  | 50.0%    |
| 18 games | 0.72      | 1.1%     | 0.515  | 50.0%    |
| 18 games | 1.0       | 4.6%     | 0.569  | 61.1%    |
| 54 games | 0.0       | 0.0%     | 0.552  | 57.4%    |
| 54 games | 1.0       | 4.3%     | 0.557  | 53.7%    |

Table 4: Threshold sweep detail.

Thresholds 0.0 and 0.5 collapse into a no-LLM basin. The 18-game and 54-game results diverge at threshold 1.0, underscoring the need for larger-scale evaluation while preserving the qualitative finding of non-monotonicity.

## Appendix B B17-seed0 Trace Summary

Revision-on (win, F1 0.609). Turn 2: coarse_roi_collapse. Turns 12 and 15: cluster_closeout_bias. Revision-off (loss, F1 0.333). No revision action fires; the agent exhausts 40 shots without finishing.

Figure 1: Qualitative event trace for the B17-seed0 case discussed in Section 5.2. The figure is intentionally compact because the full runtime trace is best inspected in the appendix or artifact bundle.

#### Code availability.

The declarative runtime implementation is available at [https://github.com/manifesto-ai/core](https://github.com/manifesto-ai/core), and the Battleship evaluation code is available at [https://github.com/eggplantiny/battleship-manifesto](https://github.com/eggplantiny/battleship-manifesto).

Experimental support, please [view the build logs](./2604.07236v1/__stdout.txt) for errors. Generated by [ L A T E xml ![\[LOGO\]](/Users/junjian/GitHub/wang-junjian/wikillm/.scratch/harness-batch-2/media/How Much Heavy Lifting Can an Agent Harness Do/055b977d0a6a655149fabb1dc4ed16049b0af31f.png)](https://math.nist.gov/~BMiller/LaTeXML/) .

## Instructions for reporting errors

We are continuing to improve HTML versions of papers, and your feedback helps enhance accessibility and mobile support. To report errors in the HTML that will help us improve conversion and rendering, choose any of the methods listed below:

- Click the "Report Issue" (![[How Much Heavy Lifting Can an Agent Harness Do-a556641380f7b97e2e131566a80a75ad0f230978.svg]]) button, located in the page header.

**Tip:** You can select the relevant text first, to include it in your report.

Our team has already identified [the following issues](https://github.com/arXiv/html_feedback/issues). We appreciate your time reviewing and reporting rendering errors we may not have found yet. Your efforts will help us improve the HTML versions for all readers, because disability should not be a barrier to accessing research. Thank you for your continued support in championing open access for all.

Have a free development cycle? Help support accessibility at arXiv! Our collaborators at LaTeXML maintain a [list of packages that need conversion](https://github.com/brucemiller/LaTeXML/wiki/Porting-LaTeX-packages-for-LaTeXML), and welcome [developer contributions](https://github.com/brucemiller/LaTeXML/issues).

We gratefully acknowledge support from our **major funders**, [**member institutions**](https://info.arxiv.org/about/ourmembers.html), , and all contributors.

[About](https://info.arxiv.org/about) · [Help](https://info.arxiv.org/help) · [Contact](https://info.arxiv.org/help/contact.html) · [Subscribe](https://info.arxiv.org/help/subscribe) · [Copyright](https://info.arxiv.org/help/license/index.html) · [Privacy](https://info.arxiv.org/help/policies/privacy_policy.html) · [Accessibility](https://info.arxiv.org/help/web_accessibility.html) · [Operational Status (opens in new tab)](https://status.arxiv.org)

Major funding support from

[Simons Foundation](https://www.simonsfoundation.org/) [Simons Foundation International](https://www.sfi.org.bm/) [Schmidt Sciences](https://www.schmidtsciences.org/)

[![[How Much Heavy Lifting Can an Agent Harness Do-ee4fa28cc5b5a2e145a514bf2b95e569978d92fb.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")
