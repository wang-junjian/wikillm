---
title: "HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry"
source: "https://arxiv.org/abs/2606.14249"
author: "Darwin Agent Team"
published: 2026-06
created: 2026-10-09
description:
tags:
  - "clippings"
---

# HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry



 Darwin Agent Team 





###### Abstract

AI agent performance depends critically on the runtime harness, comprising the prompts, tools, memory, and control flow that mediate how a model observes, reasons, and acts. Yet today’s harnesses remain largely hand-crafted and static: each new model or task still demands bespoke scaffolding, and the rich traces produced during execution are rarely distilled back into systematic improvement. We introduce HarnessX, a foundry for composable, adaptive, and evolvable agent harnesses. HarnessX assembles typed harness primitives via a substitution algebra, adapts them through AEGIS, a trace-driven multi-agent evolution engine grounded in an operational mirror between symbolic adaptation and reinforcement learning, and closes the harness–model loop by turning trajectories into both harness updates and model training signal. Across five benchmarks (ALFWorld, GAIA, WebShop, $`\tau^{3}`$-Bench, and SWE-bench Verified), HarnessX yields an average gain of +14.5% (up to +44.0%), with gains largest where baselines are lowest. These results suggest that agent progress need not come from model scaling alone: composing and evolving runtime interfaces from execution feedback is an actionable and complementary lever. The complete codebase will be open-sourced in a future release.





<img src="2606.14249v1/fig1.png" id="p2.g1" class="ltx_graphics ltx_img_landscape" style="aspect-ratio:381/182;" width="381" height="182" alt="[Uncaptioned image]" />



<figure id="S0.F1" class="ltx_figure ltx_align_center">

<figcaption>Figure 1: HarnessX overview.</figcaption>
</figure>

###### Contents

1.  <a href="#S1" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">1 Introduction</a>
2.  <a href="#S2" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2 Related Work</a>
    1.  <a href="#S2.SS1" class="ltx_ref" title="In 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2.1 Harness Engineering</a>
    2.  <a href="#S2.SS2" class="ltx_ref" title="In 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2.2 Self-Evolving Agents</a>
3.  <a href="#S3" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3 Harness Composition</a>
    1.  <a href="#S3.SS1" class="ltx_ref" title="In 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.1 The Harness as a First-Class Object</a>
    2.  <a href="#S3.SS2" class="ltx_ref" title="In 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.2 The Processor Abstraction</a>
    3.  <a href="#S3.SS3" class="ltx_ref" title="In 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.3 The Nine-Dimensional Taxonomy</a>
4.  <a href="#S4" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4 Harness Adaptation</a>
    1.  <a href="#S4.SS1" class="ltx_ref" title="In 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.1 The Operational Mirror</a>
    2.  <a href="#S4.SS2" class="ltx_ref" title="In 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.2 Pathologies in Symbolic Space</a>
    3.  <a href="#S4.SS3" class="ltx_ref" title="In 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.3 AEGIS Architecture</a>
    4.  <a href="#S4.SS4" class="ltx_ref" title="In 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.4 The Adaptation Loop</a>
    5.  <a href="#S4.SS5" class="ltx_ref" title="In 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.5 Variant Isolation via Ensemble Routing</a>
5.  <a href="#S5" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5 Harness-Model Co-Evolution</a>
    1.  <a href="#S5.SS1" class="ltx_ref" title="In 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.1 The Co-evolution Iteration</a>
    2.  <a href="#S5.SS2" class="ltx_ref" title="In 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.2 Optimization Substrates</a>
    3.  <a href="#S5.SS3" class="ltx_ref" title="In 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.3 Model Training via Cross-Harness GRPO</a>
    4.  <a href="#S5.SS4" class="ltx_ref" title="In 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.4 Off-Policy Training over a Mixed-Policy Buffer</a>
6.  <a href="#S6" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6 Experiments</a>
    1.  <a href="#S6.SS1" class="ltx_ref" title="In 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.1 Experimental Setup</a>
    2.  <a href="#S6.SS2" class="ltx_ref" title="In 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.2 Main Results</a>
    3.  <a href="#S6.SS3" class="ltx_ref" title="In 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3 Evolution Strategy Comparison</a>
    4.  <a href="#S6.SS4" class="ltx_ref" title="In 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.4 Meta-Agent Effectiveness</a>
    5.  <a href="#S6.SS5" class="ltx_ref" title="In 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.5 Co-Evolution</a>
    6.  <a href="#S6.SS6" class="ltx_ref" title="In 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6 Failure Analysis</a>
7.  <a href="#S7" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7 Discussion</a>
    1.  <a href="#S7.SS1" class="ltx_ref" title="In 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7.1 Why Compositional Structure Matters for Evolution</a>
    2.  <a href="#S7.SS2" class="ltx_ref" title="In 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7.2 The Role of Trace Richness</a>
    3.  <a href="#S7.SS3" class="ltx_ref" title="In 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7.3 Scope and Limits of the Operational Mirror</a>
    4.  <a href="#S7.SS4" class="ltx_ref" title="In 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7.4 Generalization Across Model Families</a>
    5.  <a href="#S7.SS5" class="ltx_ref" title="In 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7.5 Cost-Performance Tradeoffs</a>
    6.  <a href="#S7.SS6" class="ltx_ref" title="In 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7.6 Ethical Considerations</a>
    7.  <a href="#S7.SS7" class="ltx_ref" title="In 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7.7 Limitations</a>
8.  <a href="#S8" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">8 Conclusion</a>
9.  <a href="#bib" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">References</a>
10. <a href="#Sx1" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">Contributions and Acknowledgments</a>
11. <a href="#S9" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9 Experimental Setup: Full Details</a>
    1.  <a href="#S9.SS1" class="ltx_ref" title="In 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9.1 Benchmarks</a>
    2.  <a href="#S9.SS2" class="ltx_ref" title="In 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9.2 Evaluation-Set Design</a>
    3.  <a href="#S9.SS3" class="ltx_ref" title="In 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9.3 Metric Definitions</a>
    4.  <a href="#S9.SS4" class="ltx_ref" title="In 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9.4 Evolution Protocol and Hyperparameters</a>
    5.  <a href="#S9.SS5" class="ltx_ref" title="In 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9.5 Runtime Infrastructure</a>
12. <a href="#S10" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">10 Prompts and Harness Defaults</a>
    1.  <a href="#S10.SS1" class="ltx_ref" title="In 10 Prompts and Harness Defaults ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">10.1 Meta-Agent Prompts</a>
    2.  <a href="#S10.SS2" class="ltx_ref" title="In 10 Prompts and Harness Defaults ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">10.2 Round-0 Task-Agent Prompts</a>
    3.  <a href="#S10.SS3" class="ltx_ref" title="In 10 Prompts and Harness Defaults ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">10.3 Change-Manifest Schema</a>
13. <a href="#S11" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">11 Anatomy of an Evolution Step</a>
    1.  <a href="#S11.SS1" class="ltx_ref" title="In 11 Anatomy of an Evolution Step ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">11.1 Worked Example: GAIA / Sonnet 4.6, Round 10</a>
14. <a href="#S12" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12 Additional Results</a>
    1.  <a href="#S12.SS1" class="ltx_ref" title="In 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12.1 GAIA</a>
    2.  <a href="#S12.SS2" class="ltx_ref" title="In 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12.2 ALFWorld</a>
    3.  <a href="#S12.SS3" class="ltx_ref" title="In 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12.3 WebShop</a>
    4.  <a href="#S12.SS4" class="ltx_ref" title="In 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12.4 <em>τ</em><sup>3</sup>-Bench</a>
    5.  <a href="#S12.SS5" class="ltx_ref" title="In 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12.5 SWE-bench Verified</a>
15. <a href="#S13" class="ltx_ref" title="In HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">13 Reproducibility and Artifacts</a>
    1.  <a href="#S13.SS1" class="ltx_ref" title="In 13 Reproducibility and Artifacts ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">13.1 Per-Run Directory Layout</a>







## 1 Introduction



The capacity of modern agents depends not only on the underlying model \[<a href="#bib.bib7" class="ltx_ref">5</a>, <a href="#bib.bib8" class="ltx_ref">8</a>, <a href="#bib.bib9" class="ltx_ref">42</a>, <a href="#bib.bib13" class="ltx_ref">36</a>\], but on the mediation imposed by the surrounding harness \[<a href="#bib.bib41" class="ltx_ref">24</a>, <a href="#bib.bib10" class="ltx_ref">20</a>, <a href="#bib.bib20" class="ltx_ref">1</a>\]. This harness converts raw model outputs into structured agent behaviors by determining how tasks are represented, how external services are accessed, and how intermediate decisions are communicated during execution. As agents tackle longer-horizon tasks in richer environments, harness design becomes integral to agent development.





Despite this importance, harness development remains far from a mature engineering discipline. First, harnesses are hand-engineered and static: any change in model version, tooling, or problem domain requires bespoke modification, with no mechanism for experience-driven improvement. Second, harnesses are architecturally entangled: they typically combine prompt templates, tool wrappers, retry policies, and memory in the same codepaths, so changes to one component silently break others, and reuse across domains reduces to copying rather than composition. Third, harness engineering and model training operate independently: trajectory data collected while improving the harness is discarded rather than incorporated into model training, and model improvements do not translate into harness improvements.





We address these gaps by treating the harness as a first-class object that can be composed, adapted, and evolved alongside the model. HarnessX embodies this principle as a unified harness foundry. It begins with a modular foundation: harness primitives spanning context, tools \[<a href="#bib.bib47" class="ltx_ref">6</a>\], skills, control, and memory are described via typed interfaces and composed via a substitution algebra. This separates concerns that existing systems typically conflate. On top of this substrate, we introduce AEGIS, an observability-driven and auditable harness adaptation engine. Framing harness adaptation not as ad-hoc editing but as a learning problem over symbolic artifacts (prompts \[<a href="#bib.bib48" class="ltx_ref">51</a>\], tools, memory, and control policies) reveals that standard RL pathologies (reward hacking, catastrophic forgetting \[<a href="#bib.bib45" class="ltx_ref">14</a>\], under-exploration \[<a href="#bib.bib46" class="ltx_ref">15</a>\]) become concrete design risks. To address these risks, AEGIS combines full trace observability with a four-stage pipeline (Digester, Planner, Evolver, and Critic) that compresses traces, plans adaptations, generates candidates, and assesses changes. Finally, we close the loop between harness adaptation and model training via harness-model co-evolution. Traces produced during harness adaptation serve as reinforcement-learning signal for model training, so that model improvements feed back into subsequent harness evolution.





We empirically validate HarnessX across five benchmarks (GAIA, ALFWorld, WebShop, $`\tau^{3}`$-Bench, SWE-bench Verified), three task-agent families (Claude Sonnet 4.6, GPT-5.4, Qwen3.5-9B), and up to 15 evolution rounds. Harness evolution yields an average absolute gain of +14.5% across 15 model–benchmark configurations, with individual gains ranging from 0.0% to +44.0% among improving configurations (14 of 15), from +1.1% ($`\tau^{3}`$-Bench, near-ceiling baseline) to +44.0% (ALFWorld, weakest agent). Gains exhibit an inverse-scaling pattern: on ALFWorld and GAIA, the weakest task agent benefits most (+44.0% for Qwen3.5-9B vs. +11.2% for Sonnet 4.6 on ALFWorld), suggesting that evolved harnesses address behavioral gaps that weaker models cannot self-correct. On heterogeneous task sets (GAIA), single-harness evolution stagnates; a variant-isolation ablation restores stable improvement (+13.6%, non-degrading over 15 rounds).





In summary, our contributions are four-fold:

- •
  

  Harness Composition (Section <a href="#S3" class="ltx_ref" title="3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a>). We formalize the harness as a first-class, typed object composed of processors attached to lifecycle hooks. A nine-dimensional taxonomy spans the full behavioral space, and a substitution algebra enables per-task configuration with type-safe insertion and removal. This compositional structure makes the intended scope of each behavioral change explicit—a precondition for the variant isolation that stabilizes evolution.

  
- •
  

  Harness Adaptation (Section <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>). We introduce AEGIS, a trace-driven, multi-agent harness evolution engine. An operational mirror maps harness adaptation onto standard RL constructs, converting familiar RL pathologies (reward hacking, catastrophic forgetting, under-exploration) into concrete design risks addressed by a four-stage pipeline (Digester, Planner, Evolver, Critic) with deterministic gating. An optional variant-isolation strategy prevents cross-task interference on heterogeneous benchmarks.

  
- •
  

  Harness-Model Co-Evolution (Section <a href="#S5" class="ltx_ref" title="5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a>). We close the optimization loop by interleaving harness evolution with model reinforcement learning over a shared replay buffer. Cross-harness GRPO enables the model to internalize strategies from successive harness versions, breaking the scaffolding ceiling that limits harness-only adaptation and the training-signal ceiling that limits model-only RL.

  
- •
  

  Empirical Validation (Section <a href="#S6" class="ltx_ref" title="6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6</a>). Across five benchmarks, three task-agent families, and up to 15 evolution rounds, HarnessX yields an average gain of +14.5% (up to +44.0%), with gains largest where baselines are lowest. A variant-isolation ablation resolves stagnation on heterogeneous task sets, and co-evolution yields an additional +4.7% over harness-only evolution (Section <a href="#S6.SS5" class="ltx_ref" title="6.5 Co-Evolution ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.5</a>).

  







## 2 Related Work



### 2.1 Harness Engineering



Existing agent infrastructure occupies a spectrum of increasingly opinionated harness abstractions. At the primitive layer, libraries such as LangChain \[<a href="#bib.bib16" class="ltx_ref">17</a>\], LlamaIndex \[<a href="#bib.bib14" class="ltx_ref">23</a>\], and Smolagents \[<a href="#bib.bib15" class="ltx_ref">32</a>\] provide typed building blocks for prompts, tools, retrieval, and memory. These primitives can be tested in isolation but do not support harness-level composition: two harnesses built from identical primitives may still differ in structure.





The next level of abstraction orchestrates these primitives into reusable patterns. LangGraph \[<a href="#bib.bib17" class="ltx_ref">16</a>\] models the behavior of an agent with a stateful graph; AutoGen \[<a href="#bib.bib18" class="ltx_ref">39</a>\] models multi-agent interaction as structured conversation; CrewAI \[<a href="#bib.bib19" class="ltx_ref">26</a>\] assigns role-based identities to agents; and Letta \[<a href="#bib.bib21" class="ltx_ref">28</a>\] couples autonomous loops with persistent memory. Although these frameworks make harness writing easier, they impose a particular control loop, so combining patterns, replacing components, and porting enhancements across tasks mostly remain manual.





Lastly, there are productized, domain-specific harnesses such as Claude Code \[<a href="#bib.bib20" class="ltx_ref">1</a>\], Cursor \[<a href="#bib.bib22" class="ltx_ref">3</a>\], Manus \[<a href="#bib.bib23" class="ltx_ref">34</a>\], and DeerFlow \[<a href="#bib.bib24" class="ltx_ref">4</a>\]. These systems demonstrate the impact of harness design but remain architecturally static, evolving only through manual iteration.





Two structural gaps persist across all three layers. First, no layer exposes the harness as a substitutable entity composed of typed elements, so building a per-task harness always involves rewriting. Second, no mechanism exists for in-loop improvement: once defined, a harness evolves only through human iteration between releases.





Concurrently, Claude Code introduced Dynamic Workflows \[<a href="#bib.bib1" class="ltx_ref">2</a>\], enabling the model to generate task-specific harness scripts at runtime. While this represents a step toward adaptive harnesses, it operates within a single session without persistent trace-based optimization, cross-session evolution, or harness–model co-training. HarnessX addresses both gaps by treating harness adaptation as a multi-round, trace-driven learning problem with typed composition for variant isolation, structured observability for pathology detection, and a shared replay buffer that closes the loop between harness evolution and model training.







### 2.2 Self-Evolving Agents



Research on self-evolving agents investigates how an agent system can improve without retraining the underlying foundation model. Early work focused on the single most easily editable aspect: the prompt. Approaches like APE \[<a href="#bib.bib25" class="ltx_ref">52</a>\], OPRO \[<a href="#bib.bib26" class="ltx_ref">43</a>\], EvoPrompt \[<a href="#bib.bib27" class="ltx_ref">10</a>\], Promptbreeder \[<a href="#bib.bib28" class="ltx_ref">7</a>\] treat instruction formulation as a black-box optimization problem, while ProTeGi \[<a href="#bib.bib29" class="ltx_ref">29</a>\] and TextGrad \[<a href="#bib.bib30" class="ltx_ref">46</a>\] introduce gradient-inspired textual feedback to make the optimization process explicit. DSPy \[<a href="#bib.bib31" class="ltx_ref">13</a>\] and MIPRO \[<a href="#bib.bib32" class="ltx_ref">27</a>\] extend this approach by compiling a declarative LM program, whose prompts are optimized against labeled data. These approaches establish instructions as a learnable component, but harness-level features (tools, memory, control flow) remain outside the optimization scope.





Another line of work improves agents by accumulating and reusing prior execution experience in memory: Memento \[<a href="#bib.bib53" class="ltx_ref">50</a>\] improves agents through case-based memory without fine-tuning the model, while MIA \[<a href="#bib.bib52" class="ltx_ref">30</a>\] unifies non-parametric and parametric memory within a single Manager-Planner-Executor framework: a non-parametric store of compressed trajectories and a parametric planner that evolves on the fly at test time, coupled by a bidirectional loop that continually converts experience between the two, demonstrating superiority across eleven benchmarks.





Subsequent works extend optimization to agent workflows. GPTSwarm \[<a href="#bib.bib33" class="ltx_ref">54</a>\], ADAS \[<a href="#bib.bib34" class="ltx_ref">11</a>\], AFlow \[<a href="#bib.bib35" class="ltx_ref">48</a>\], A<sup>2</sup>Flow \[<a href="#bib.bib36" class="ltx_ref">49</a>\], AgentSwift \[<a href="#bib.bib50" class="ltx_ref">21</a>\], ResMAS \[<a href="#bib.bib51" class="ltx_ref">53</a>\], and EvoAgentX \[<a href="#bib.bib37" class="ltx_ref">37</a>\] search over collaboration strategies, agent ordering, and aggregation mechanisms. These works demonstrate that workflow structure is learnable and yields larger gains than prompt-only optimization. However, component-level artifacts (tool implementations, memory policies, node-internal prompts) remain static: the optimization scope covers inter-component relations but does not encompass the full harness.





A final group treats harness evolution explicitly. SICA \[<a href="#bib.bib38" class="ltx_ref">31</a>\] optimizes a SWE-bench agent’s source code directly, while Darwin Gödel Machine \[<a href="#bib.bib49" class="ltx_ref">18</a>\] proposes open-ended optimization over a database of agent variants. HyperAgents \[<a href="#bib.bib39" class="ltx_ref">47</a>\] makes the optimization process itself adaptable; Meta-Harness \[<a href="#bib.bib42" class="ltx_ref">19</a>\] improves sampling efficiency via a file-system-based interface. AHE \[<a href="#bib.bib43" class="ltx_ref">22</a>\] and Life-Harness \[<a href="#bib.bib40" class="ltx_ref">41</a>\] emphasize observability, explainability, and source-code rewriting. Collectively, these works establish the harness as an evolutionary target and demonstrate that observability is essential for stable self-improvement. However, their designs lack a unifying theoretical framework that connects observed failure modes to principled defenses.





The heuristic-learning theory \[<a href="#bib.bib11" class="ltx_ref">38</a>\] partially addresses this gap by mapping RL concepts to symbolic self-optimization updates. In this framework, observable traces correspond to proper credit assignment, falsifiable change manifests correspond to reward shaping, and proposal-critique cycles provide structured exploration. HarnessX instantiates this paradigm, formalizing the correspondence as the operational mirror between RL and symbolic harness evolution (Section <a href="#S4.SS1" class="ltx_ref" title="4.1 The Operational Mirror ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.1</a>).









## 3 Harness Composition



The gap identified in Section <a href="#S2.SS1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2.1</a> is the absence of an infrastructure layer that exposes the harness as a typed, substitutable entity. Primitive libraries leave composition to application code, orchestrators expose a fixed set of patterns, and product harnesses are opaque end-to-end. Without a compositional substrate, every behavioral change or cross-team handoff requires re-implementation. HarnessX addresses this via a unified design principle: the harness is a first-class value, the processor is a typed atomic component, and composition proceeds via processor insertion at typed hook points. We formalize the harness (Section <a href="#S3.SS1" class="ltx_ref" title="3.1 The Harness as a First-Class Object ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.1</a>), its building block, the processor (Section <a href="#S3.SS2" class="ltx_ref" title="3.2 The Processor Abstraction ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.2</a>), and the nine-dimensional processor taxonomy (Section <a href="#S3.SS3" class="ltx_ref" title="3.3 The Nine-Dimensional Taxonomy ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.3</a>). Definitions are intentionally concise: their role is to establish the vocabulary and expose the edit surface on which harness evolution (Section <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>) operates.



<figure id="S3.T1" class="ltx_table">
<table id="S3.T1.3" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S3.T1.3.1" class="ltx_tr">
<th id="S3.T1.3.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Hook</th>
<th id="S3.T1.3.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Event type</th>
<th id="S3.T1.3.1.3" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Permitted modifications</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S3.T1.3.2" class="ltx_tr">
<td id="S3.T1.3.2.1" class="ltx_td ltx_align_left ltx_border_t">task_start</td>
<td id="S3.T1.3.2.2" class="ltx_td ltx_align_left ltx_border_t">TaskStartEvent</td>
<td id="S3.T1.3.2.3" class="ltx_td ltx_align_left ltx_border_t">system prompt</td>
</tr>
<tr id="S3.T1.3.3" class="ltx_tr">
<td id="S3.T1.3.3.1" class="ltx_td ltx_align_left">step_start</td>
<td id="S3.T1.3.3.2" class="ltx_td ltx_align_left">StepStartEvent</td>
<td id="S3.T1.3.3.3" class="ltx_td ltx_align_left">structural history edits</td>
</tr>
<tr id="S3.T1.3.4" class="ltx_tr">
<td id="S3.T1.3.4.1" class="ltx_td ltx_align_left">before_model</td>
<td id="S3.T1.3.4.2" class="ltx_td ltx_align_left">BeforeModelEvent</td>
<td id="S3.T1.3.4.3" class="ltx_td ltx_align_left">last user content; one user-message append</td>
</tr>
<tr id="S3.T1.3.5" class="ltx_tr">
<td id="S3.T1.3.5.1" class="ltx_td ltx_align_left">after_model</td>
<td id="S3.T1.3.5.2" class="ltx_td ltx_align_left">ModelResponseEvent</td>
<td id="S3.T1.3.5.3" class="ltx_td ltx_align_left">response content, tool calls</td>
</tr>
<tr id="S3.T1.3.6" class="ltx_tr">
<td id="S3.T1.3.6.1" class="ltx_td ltx_align_left">before_tool</td>
<td id="S3.T1.3.6.2" class="ltx_td ltx_align_left">ToolCallEvent</td>
<td id="S3.T1.3.6.3" class="ltx_td ltx_align_left">tool input, approval flag</td>
</tr>
<tr id="S3.T1.3.7" class="ltx_tr">
<td id="S3.T1.3.7.1" class="ltx_td ltx_align_left">after_tool</td>
<td id="S3.T1.3.7.2" class="ltx_td ltx_align_left">ToolResultEvent</td>
<td id="S3.T1.3.7.3" class="ltx_td ltx_align_left">tool result</td>
</tr>
<tr id="S3.T1.3.8" class="ltx_tr">
<td id="S3.T1.3.8.1" class="ltx_td ltx_align_left">step_end</td>
<td id="S3.T1.3.8.2" class="ltx_td ltx_align_left">StepEndEvent</td>
<td id="S3.T1.3.8.3" class="ltx_td ltx_align_left">read-only</td>
</tr>
<tr id="S3.T1.3.9" class="ltx_tr">
<td id="S3.T1.3.9.1" class="ltx_td ltx_align_left ltx_border_bb">task_end</td>
<td id="S3.T1.3.9.2" class="ltx_td ltx_align_left ltx_border_bb">TaskEndEvent</td>
<td id="S3.T1.3.9.3" class="ltx_td ltx_align_left ltx_border_bb">read-only</td>
</tr>
</tbody>
</table>
<figcaption>Table 1: Hook points and their permitted modifications.</figcaption>
</figure>



### 3.1 The Harness as a First-Class Object



A harness in HarnessX is the pair $`\mathcal{H}=(\mathcal{M},\mathcal{C})`$, where $`\mathcal{M}`$ is a model configuration and $`\mathcal{C}`$ is a harness configuration. The two address disjoint concerns: $`\mathcal{M}`$ records which model serves which role (main, judge, evaluator) and the fallback policy for each role; $`\mathcal{C}`$ records how the agent behaves independently of model identity. They combine into an executable agent via agent = model_config.agentic(harness_config): an agent in HarnessX is a processor pipeline bound to a model, both independently substitutable.





The harness configuration itself decomposes as $`\mathcal{C}=(\mathbf{P},\mathbf{S})`$. $`\mathbf{P}:\mathcal{H}\!\mathit{ook}\to\mathrm{List}[\mathit{Processor}]`$ is a hook-indexed list of processors, where $`\mathcal{H}\!\mathit{ook}`$ is the eight-element set of lifecycle events in Table <a href="#S3.T1" class="ltx_ref" title="Table 1 ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">1</a>. $`\mathbf{S}`$ is a fixed set of orthogonal slot resources: tool registry, tracer, workspace, sandbox provider, and plugin list. Slots are singletons, shared across all processors in a configuration; processor state is instance-private. $`\mathbf{P}`$ implements all per-step behavior; $`\mathbf{S}`$ houses the shared infrastructure that processors depend on but do not own.





We call $`\mathcal{C}`$ a first-class object because it is independently serializable, comparable, hashable, and substitutable. Two agents sharing $`\mathcal{C}`$ but differing in $`\mathcal{M}`$ execute the same processor pipeline, with behavior differing only in model responses; two agents sharing $`\mathcal{M}`$ but differing in $`\mathcal{C}`$ are behaviorally distinct. This reification is the precondition for programmatic evolution (Section <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>).







### 3.2 The Processor Abstraction



Every per-step behavior in HarnessX is implemented as a processor, an object satisfying the protocol async def process(self, event: Event) -\> AsyncIterator\[Event\]. A processor consumes one event and yields zero or more, producing exactly one of five outcomes: pass-through (yield unchanged), transform (yield modified), split (yield multiple same-type events, processed independently downstream), intercept (yield nothing, blocking propagation), or interrupt (raise an exception, which halts the loop). This restricted interface enables compositionality: every processor at a given hook consumes and yields the same event type, so processors compose by sequential application and can be inserted or removed without affecting type correctness of the surrounding pipeline.





As listed in Table <a href="#S3.T1" class="ltx_ref" title="Table 1 ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">1</a>, processors attach to one of eight hook points emitted by the run loop. The run loop validates hook contracts after each invocation: a violation (e.g., modifying a read-only field) raises an exception immediately rather than silently propagating corrupted state. Each processor carries three class-level metadata fields that govern composition: \_singleton_group names a mutual-exclusion class, ensuring at most one processor per group; \_order is an ordering hint within a hook (with constants PRE, NORMAL, POST); and \_after is a list of soft dependencies on other singleton groups.





This design makes harness evolution a first-class operation: AEGIS can insert a new processor at a specific hook, replace an existing one by matching its singleton group, or remove a processor entirely—all without touching other processors at the same or different hooks. Because the type contract (input event type $`=`$ output event type) is enforced per-hook, any such substitution preserves the well-typedness of the overall pipeline. The metadata fields further constrain composition: \_singleton_group prevents conflicting duplicates, and \_order ensures that newly inserted processors interact predictably with existing ones. These guarantees are the mechanism by which variant isolation (Section <a href="#S4.SS5" class="ltx_ref" title="4.5 Variant Isolation via Ensemble Routing ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.5</a>) operates—each variant differs only in which processors occupy which hooks, and the type system ensures that no variant can silently violate the pipeline contract during evolution.







### 3.3 The Nine-Dimensional Taxonomy



We organize the behavioral space along nine dimensions: model selection (D1) decides which model serves which role; context assembly (D2) determines what is presented to the model at each step; memory management (D3) governs what carries across steps and sessions; tool ecosystem (D4) controls which tools the agent can invoke; execution environment (D5) determines where tool-induced side-effects materialize; evaluation and reward (D6) specifies how outcomes are judged; control and safety (D7) enforces rules that keep the agent from looping, overspending, or drifting from intent; observability (D8) records each event, model call, and tool invocation; and the training bridge (D9) converts execution trajectories into reinforcement-learning records. Figure <a href="#S4.F2" class="ltx_ref" title="Figure 2 ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2</a> illustrates the full taxonomy along with representative processors and the hooks at which they typically attach in a standard configuration.





In practice, AEGIS edits span all nine dimensions during evolution: D2 (context assembly) and D4 (tool ecosystem) are the most frequent edit targets (Section <a href="#S6.SS2" class="ltx_ref" title="6.2 Main Results ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.2</a>), while D8 (observability) provides the trace substrate on which AEGIS itself reasons, and D9 (training bridge) supplies trajectory records for co-evolution (Section <a href="#S5" class="ltx_ref" title="5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a>), closing the optimization loop.



<figure id="S3.T2" class="ltx_table">
<table id="S3.T2.3" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S3.T2.3.1" class="ltx_tr">
<th id="S3.T2.3.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">RL concept</th>
<th id="S3.T2.3.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Symbolic-space dual</th>
<th id="S3.T2.3.1.3" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">AEGIS realization</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S3.T2.3.2" class="ltx_tr">
<td id="S3.T2.3.2.1" class="ltx_td ltx_align_left ltx_border_t">Policy <em>π</em></td>
<td id="S3.T2.3.2.2" class="ltx_td ltx_align_left ltx_border_t">Harness-update procedure <em>π</em><sub>evo</sub></td>
<td id="S3.T2.3.2.3" class="ltx_td ltx_align_left ltx_border_t">Four-stage pipeline (Section <a href="#S4.SS3" class="ltx_ref" title="4.3 AEGIS Architecture ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.3</a>)</td>
</tr>
<tr id="S3.T2.3.3" class="ltx_tr">
<td id="S3.T2.3.3.1" class="ltx_td ltx_align_left">State <em>s</em><sub><em>t</em></sub></td>
<td id="S3.T2.3.3.2" class="ltx_td ltx_align_left">(ℋ<sub><em>t</em></sub>, 𝒯<sub><em>t</em></sub>)</td>
<td id="S3.T2.3.3.3" class="ltx_td ltx_align_left">Harness configuration + trace store</td>
</tr>
<tr id="S3.T2.3.4" class="ltx_tr">
<td id="S3.T2.3.4.1" class="ltx_td ltx_align_left">Action <em>a</em><sub><em>t</em></sub></td>
<td id="S3.T2.3.4.2" class="ltx_td ltx_align_left">Typed harness edit</td>
<td id="S3.T2.3.4.3" class="ltx_td ltx_align_left">Builder operation + change manifest</td>
</tr>
<tr id="S3.T2.3.5" class="ltx_tr">
<td id="S3.T2.3.5.1" class="ltx_td ltx_align_left">Feedback</td>
<td id="S3.T2.3.5.2" class="ltx_td ltx_align_left">Trace <em>τ</em> + verifier score <em>r</em></td>
<td id="S3.T2.3.5.3" class="ltx_td ltx_align_left">Observability layer</td>
</tr>
<tr id="S3.T2.3.6" class="ltx_tr">
<td id="S3.T2.3.6.1" class="ltx_td ltx_align_left ltx_border_bb">Update</td>
<td id="S3.T2.3.6.2" class="ltx_td ltx_align_left ltx_border_bb">$\mathcal{H}_{t+1}\leftarrow U(\widetilde{\mathcal{H}}_{t},\mathcal{T}_{t},r_{t})$</td>
<td id="S3.T2.3.6.3" class="ltx_td ltx_align_left ltx_border_bb">Deterministic acceptance gate</td>
</tr>
</tbody>
</table>
<figcaption>Table 2: Operational mirror: RL concepts and their symbolic-space duals in AEGIS.</figcaption>
</figure>







## 4 Harness Adaptation



The composition layer (Section <a href="#S3" class="ltx_ref" title="3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a>) provides a typed, substitutable harness; as illustrated in Figure <a href="#S4.F2" class="ltx_ref" title="Figure 2 ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2</a>, AEGIS is the system that evolves it. The key insight is that harness evolution maps structurally onto reinforcement learning in a symbolic space: harness configurations are states, typed edits are actions, and execution traces plus verifier scores constitute feedback. This mapping is predictive: it identifies three failure modes analogous to known RL pathologies (reward hacking, catastrophic forgetting, under-exploration) that motivate AEGIS’s architectural defenses and are empirically confirmed in Section <a href="#S6.SS6" class="ltx_ref" title="6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6</a>.





We formalize the correspondence (Section <a href="#S4.SS1" class="ltx_ref" title="4.1 The Operational Mirror ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.1</a>), analyze the pathologies it predicts (Section <a href="#S4.SS2" class="ltx_ref" title="4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.2</a>), derive the four-stage pipeline as a defense architecture (Section <a href="#S4.SS3" class="ltx_ref" title="4.3 AEGIS Architecture ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.3</a>), present the adaptation loop (Section <a href="#S4.SS4" class="ltx_ref" title="4.4 The Adaptation Loop ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.4</a>), and introduce variant isolation for stable multi-variant evolution (Section <a href="#S4.SS5" class="ltx_ref" title="4.5 Variant Isolation via Ensemble Routing ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.5</a>).



<figure id="S4.F2" class="ltx_figure">
<img src="2606.14249v1/Harness_Evolution.png" id="S4.F2.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/189;" width="476" height="189" alt="Refer to caption" />
<figcaption>Figure 2: The AEGIS evolution loop. A single meta-agent ℳ drives all four stages (Digester, Planner, Evolver, Critic), selectively invoking each based on whether sufficient signal exists to continue. A deterministic gate ships or rejects the candidate edit.</figcaption>
</figure>



### 4.1 The Operational Mirror



We formalize harness evolution as an MDP over symbolic artifacts. Table <a href="#S3.T2" class="ltx_ref" title="Table 2 ‣ 3.3 The Nine-Dimensional Taxonomy ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2</a> summarizes the mapping; we first state three definitions that ground the correspondence.





#### Definition 1 (Harness Configuration).



A harness configuration is a tuple $`\mathcal{H}=(c_{1},c_{2},\ldots,c_{9})`$, where each $`c_{i}\in\mathcal{C}_{i}`$ instantiates one of the nine behavioral dimensions (Section <a href="#S3.SS3" class="ltx_ref" title="3.3 The Nine-Dimensional Taxonomy ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.3</a>): model selection ($`c_{1}`$), context assembly ($`c_{2}`$), memory management ($`c_{3}`$), tool ecosystem ($`c_{4}`$), execution environment ($`c_{5}`$), evaluation and reward ($`c_{6}`$), control and safety ($`c_{7}`$), observability ($`c_{8}`$), and training bridge ($`c_{9}`$). Each $`\mathcal{C}_{i}`$ is the set of valid processor configurations for dimension $`i`$, constrained by hook-type contracts and singleton-group exclusion (Section <a href="#S3.SS2" class="ltx_ref" title="3.2 The Processor Abstraction ‣ 3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3.2</a>).







#### Definition 2 (Harness Edit).



A harness edit is a function $`e:\mathcal{H}\to\mathcal{H}`$ that modifies one or more dimensions while preserving type contracts. The action space $`\mathcal{E}`$ is discrete but open-ended: each edit is a code-level artifact (new processor source, modified prompt template, reconfigured tool registry, or control-flow rewrite) generated by the meta-agent LLM, not selected from a pre-enumerated set. Combinatorial explosion is managed not by exhaustive search but by the LLM’s generative capacity—the Planner proposes edits from trace-grounded hypotheses—and by type constraints that prune invalid compositions at generation time.







#### Definition 3 (Operational Mirror).



The operational mirror is the tuple $`(\mathcal{H},\mathcal{E},\mathcal{R},\mathcal{T})`$, where $`\mathcal{H}`$ is the harness-configuration space (states), $`\mathcal{E}`$ is the code-level edit space (actions), $`\mathcal{R}:\mathcal{H}\times\mathcal{E}\to\mathbb{R}`$ maps a configuration–edit pair to a scalar reward (verifier scores aggregated over an adaptation batch), and $`\mathcal{T}`$ is the trace store that provides structured feedback beyond the scalar signal. This tuple forms an MDP at the harness level: harness configurations are states, typed edits are actions, execution traces plus verifier scores constitute feedback, and a deterministic acceptance gate governs state transitions.







#### MDP instantiation.



Let $`\mathcal{H}_{t}`$ denote the harness configuration at iteration $`t`$ (the model $`\mathcal{M}`$ is fixed throughout evolution), and let $`\mathcal{T}_{t}`$ denote the trace store accumulated from all previous executions. We define the symbolic state as $`s_{t}=(\mathcal{H}_{t},\mathcal{T}_{t})`$. A harness-update policy $`\pi_{\mathrm{evo}}`$ selects an action $`a_{t}\sim\pi_{\mathrm{evo}}(\cdot\mid s_{t})`$, where $`a_{t}\in\mathcal{E}`$ is a code-level edit drawn from the builder algebra. Applying this edit yields a candidate harness $`\widetilde{\mathcal{H}}_{t}=a_{t}(\mathcal{H}_{t})`$. Running the candidate on an adaptation batch (with the fixed model $`\mathcal{M}`$) produces new traces $`\Delta\mathcal{T}_{t}`$ and per-task verifier scores $`r_{t}`$. A deterministic acceptance operator $`U(\widetilde{\mathcal{H}}_{t},\mathcal{T}_{t},r_{t})`$ then either commits the candidate ($`\mathcal{H}_{t+1}=\widetilde{\mathcal{H}}_{t}`$) or rejects it ($`\mathcal{H}_{t+1}=\mathcal{H}_{t}`$), enforcing the seesaw constraint: the candidate must not regress any previously solved task recorded in $`\mathcal{T}_{t}`$. In both cases, the trace store grows: $`\mathcal{T}_{t+1}=\mathcal{T}_{t}\cup\Delta\mathcal{T}_{t}`$.





This MDP operates at the harness level: within a single task, $`\mathcal{H}_{t}`$ (together with the fixed $`\mathcal{M}`$) determines the agent’s behavior; across iterations, the harness-update policy $`\pi_{\mathrm{evo}}`$ modifies the harness. AEGIS realizes $`\pi_{\mathrm{evo}}`$ as a four-stage pipeline (Digester, Planner, Evolver, Critic) that maps $`s_{t}`$ to candidate edits through trace compression, adaptation planning, edit generation, and candidate assessment.









### 4.2 Pathologies in Symbolic Space



The mirror is not merely an analogy; it converts reinforcement-learning concepts into design requirements. We refer to three well-documented failure modes in RL, namely reward hacking \[<a href="#bib.bib44" class="ltx_ref">9</a>\], catastrophic forgetting \[<a href="#bib.bib45" class="ltx_ref">14</a>\], and under-exploration \[<a href="#bib.bib46" class="ltx_ref">15</a>\], collectively as RL pathologies. Once harness adaptation is cast as an MDP over symbolic artifacts, these pathologies reappear in amplified form, shaped by two properties of the symbolic setting: (1) a language-model evolver can construct structured exploits that numerical parameter perturbations cannot express, and (2) edits to shared components propagate non-locally through the harness. Each pathology below motivates a corresponding architectural defense in Section <a href="#S4.SS3" class="ltx_ref" title="4.3 AEGIS Architecture ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.3</a>.





#### Reward hacking.



In standard RL, reward hacking \[<a href="#bib.bib44" class="ltx_ref">9</a>\] exploits loopholes in the reward signal without genuine task completion. Symbolic harness evolution amplifies this risk because the evolver can target the verification protocol directly: embedding benchmark answers into prompts, exploiting format regularities in the verifier, or introducing a processor that rewrites outputs to match verifier expectations.







#### Catastrophic forgetting.



Catastrophic forgetting \[<a href="#bib.bib45" class="ltx_ref">14</a>\] occurs when improving performance on one region of the task distribution harms another. In symbolic harness evolution, an edit that repairs failure pattern $`A`$ can silently regress pattern $`B`$, because effects propagate through shared context, tools, memory policies, and control rules. Without explicit regression checking, an evolver conditioned only on failing-task traces cannot distinguish local gain from global regression.







#### Under-exploration.



Under-exploration \[<a href="#bib.bib46" class="ltx_ref">15</a>\] manifests as a bias toward low-risk local edits: prompt rephrasing, tool-description tuning, or minor control-flow tweaks. These edits are cheap to generate and frequently pass gating without regressing solved tasks, biasing subsequent Planner hypotheses toward the same edit neighborhood. Structural changes (decomposing one agent into several, replacing the control strategy, or adopting a new memory architecture) require deliberate hypothesis formation and rarely emerge from trace-conditional local repair. Without a mechanism to propose edits beyond the immediate failure neighborhood, the system plateaus once local edits are exhausted.







#### Summary.



Symbolic harness evolution inherits the structural risks of RL (reward hacking, catastrophic forgetting, and under-exploration), and AEGIS addresses each with a dedicated mechanism: the Critic (reward hacking), the deterministic gating layer (catastrophic forgetting), and the Planner (under-exploration).



<figure id="algorithm1" class="ltx_float ltx_algorithm ltx_framed ltx_framed_top">


 Input: Initial harness ℋ<sub>0</sub>, meta-agent ℳ, budget <em>T</em>, patience <em>P</em>, threshold <em>α</em>


Output: Evolved harness ℋ<sub><em>t</em> + 1</sub>, trace store 𝒯<sub><em>t</em> + 1</sub>


1 𝒯<sub>0</sub> ← ∅;


2 <em>i</em><em>d</em><em>l</em><em>e</em> ← 0;


3 for <em><em>t</em> = 0, 1, …, <em>T</em> − 1</em> do


     4 Sample batch <em>B</em><sub><em>t</em></sub>;


     5 run ℋ<sub><em>t</em></sub> on <em>B</em><sub><em>t</em></sub> to get traces <em>Δ</em>𝒯<sub><em>t</em></sub>;


     6 𝒯<sub><em>t</em> + 1</sub> ← 𝒯<sub><em>t</em></sub> ∪ <em>Δ</em>𝒯<sub><em>t</em></sub>;


    /* Digester (selective) */


     7 $(\mathit{evidence}_{t},\;a_{t})\leftarrow\mathcal{M}.\textsc{Digester}(\Delta\mathcal{T}_{t},\;\mathcal{T}_{t})$;


     8 if <em><em>a</em><sub><em>t</em></sub> &lt; <em>α</em></em> then ℋ<sub><em>t</em> + 1</sub> ← ℋ<sub><em>t</em></sub>;


     9 <em>i</em><em>d</em><em>l</em><em>e</em> + +;


     10 continue;


    /* Planner (selective) */


     11 $\mathit{landscape}_{t}\leftarrow\mathcal{M}.\textsc{Planner}(\mathit{evidence}_{t})$;


     12 if <em><em>l</em><em>a</em><em>n</em><em>d</em><em>s</em><em>c</em><em>a</em><em>p</em><em>e</em><sub><em>t</em></sub> = ∅</em> then ℋ<sub><em>t</em> + 1</sub> ← ℋ<sub><em>t</em></sub>;


     13 <em>i</em><em>d</em><em>l</em><em>e</em> + +;


     14 continue;


    /* Evolver (selective) */


     15 $\{(\widetilde{\mathcal{H}}_{t}^{\,k},\,\mathrm{manifest}_{k})\}_{k=1}^{K_{t}}\leftarrow\mathcal{M}.\textsc{Evolver}(\mathcal{H}_{t},\;\mathit{landscape}_{t})$;


     16 if <em><em>K</em><sub><em>t</em></sub> = 0</em> then ℋ<sub><em>t</em> + 1</sub> ← ℋ<sub><em>t</em></sub>;


     17 <em>i</em><em>d</em><em>l</em><em>e</em> + +;


     18 continue;


    /* Critic &amp; Gate (mandatory) */


     19 $\mathit{ranking}\leftarrow\mathcal{M}.\textsc{Critic}(\{(\widetilde{\mathcal{H}}_{t}^{\,k},\,\mathrm{manifest}_{k})\},\;\mathit{evidence}_{t})$;


     20 <em>k</em><sup>⋆</sup> ← ⊥;


     21 foreach <em><em>k</em> in <em>r</em><em>a</em><em>n</em><em>k</em><em>i</em><em>n</em><em>g</em></em> do


         22 if <em>DeterministicGate$(\widetilde{\mathcal{H}}_{t}^{\,k},\,\mathcal{H}_{t},\,\mathcal{T}_{t})$ passes</em> then <em>k</em><sup>⋆</sup> ← <em>k</em>;


         23 break;


     24 end foreach


     25 if <em><em>k</em><sup>⋆</sup> ≠ ⊥</em> then $\mathcal{H}_{t+1}\leftarrow\widetilde{\mathcal{H}}_{t}^{\,k^{\star}}$;


     26 <em>i</em><em>d</em><em>l</em><em>e</em> ← 0;


     27 else ℋ<sub><em>t</em> + 1</sub> ← ℋ<sub><em>t</em></sub>;


     28 <em>i</em><em>d</em><em>l</em><em>e</em> + +;


     29 if <em><em>i</em><em>d</em><em>l</em><em>e</em> ≥ <em>P</em></em> then break;


30 end for


31 return ℋ<sub><em>t</em> + 1</sub>, 𝒯<sub><em>t</em> + 1</sub> 


<figcaption>Algorithm 1 AEGIS Harness Evolution Loop (selective invocation)</figcaption>
</figure>







### 4.3 AEGIS Architecture



AEGIS is the harness-evolution engine of HarnessX. It comprises four stages arranged in a predefined workflow—Digester, Planner, Evolver, Critic—all driven by the same meta-agent LLM, which selectively invokes them: no external router decides stage execution; instead, the meta-agent itself determines at each stage whether sufficient signal exists to continue. The Digester, Planner, and Evolver each evaluate a continuation condition and may short-circuit the round (below-threshold actionability, empty landscape, or zero viable candidates), while the Critic together with the deterministic gating layer is mandatory for every candidate that reaches it. No edit can ship without passing through the Critic and gate. The division of labor across stages addresses the pathologies of Section <a href="#S4.SS2" class="ltx_ref" title="4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.2</a>: the Digester compresses raw traces into structured task-level evidence; the Planner constructs an adaptation landscape spanning both incremental and structural changes; the Evolver produces typed builder edits with explicit change manifests; and the Critic, together with the gating layer, rejects edits whose claimed improvement lacks trace support or whose acceptance would regress previously solved tasks.





All stages share a single information substrate: the trace store, a structured record of execution events, verifier-scored outcomes, regression signals, and shipped or rejected edits. No stage consumes input beyond the trace store and the current harness $`\mathcal{H}_{t}`$. Data flows forward through the pipeline with selective gating: the Digester may determine that no actionable failures exist (all tasks pass or signal is too sparse), terminating the round immediately; the Planner may find no viable adaptation landscape given the current evidence and edit history; and the Evolver may produce no type-safe candidates. In each case the round exits cleanly with a no-op outcome. Only the Critic and deterministic gate are unconditional: any candidate that survives the upstream stages must pass through both before shipping. The Critic may additionally issue a single revision request to the Evolver before returning its final verdict.





#### Digester.



A single iteration on GAIA (103 tasks, pass@2) generates $`{\sim}`$<!-- -->10M tokens of raw traces: model reasoning steps, tool invocations with their outputs, and timing metadata. Passing this volume directly to downstream stages exceeds context limits, yet naive truncation discards diagnostic signal. The Digester compresses each task’s traces into a structured per-task summary: binary outcome, failure category (if any), implicated component identifiers, and supporting evidence excerpts. It also provides cross-iteration continuity: each task’s summary links to its history of prior outcomes and shipped edits, enabling the Planner to distinguish persistent failures from transient noise.







#### Planner.



The Planner receives the Digester’s output (task-level summaries enriched with cross-iteration history) and constructs an adaptation landscape: which tasks are failing, what edits have been attempted, which components are implicated, and which edit types (prompt, tool, processor, configuration) remain untried. This stage is the primary defense against under-exploration: by constructing the landscape before edit generation, it prevents the pipeline from converging on trace-conditional local repair, ensuring that structural changes (tool additions, processor rewrites, memory-policy redesigns) are considered alongside incremental prompt edits.







#### Evolver.



Given the Planner’s adaptation landscape, the Evolver produces one or more candidate harnesses $`\{\widetilde{\mathcal{H}}_{t}^{\,k}\}_{k=1}^{K_{t}}`$, each specified as a typed builder operation on the current harness $`\mathcal{H}_{t}`$. Each candidate carries a change manifest: the edited components, the intended behavioral effect, and the tasks expected to improve or regress. When introducing new processor code, the Evolver must also provide a smoke test confirming that the processor instantiates and runs on synthetic input without raising exceptions. The builder algebra guarantees type-safety (every candidate satisfies hook-type contracts and processor-composition rules) but not behavioral safety; an edit that type-checks may still produce non-local behavioral effects, detectable only by the Critic and gating layer.







#### Critic and gating.



The Critic defends against reward hacking; the deterministic gating layer defends against catastrophic forgetting. The Critic evaluates each candidate by comparing its change manifest against trace evidence and assessing whether edits risk non-local effects through shared state or control flow. When gaps are detected, it issues a single revision request to the Evolver. After at most one revision cycle, the Critic returns either no_op or an ordered ship_ranking. The deterministic gate then applies acceptance checks in sequence: manifest completeness, configuration normalization (ensuring the candidate is in canonical form), build or smoke tests (when applicable), and the seesaw constraint (regression check on previously passing tasks; Section <a href="#S4.SS1" class="ltx_ref" title="4.1 The Operational Mirror ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.1</a>). The first failing check halts the sequence; passing candidates are committed and failing ones archived with their rejection reason. This decouples LLM judgment from acceptance: regardless of the Critic’s recommendation, only deterministic checks govern shipping.







#### Design principle.



Language-model subagents explore, hypothesize, and propose; typed structure and deterministic gates determine what ships. This separation ensures that safety properties (no regression, no unaudited edits) hold regardless of LLM subagent failure modes.









### 4.4 The Adaptation Loop



Algorithm <a href="#algorithm1" class="ltx_ref" title="Algorithm 1 ‣ Summary. ‣ 4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">1</a> formalizes the adaptation loop (each iteration corresponds to one “round” in Section <a href="#S6" class="ltx_ref" title="6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6</a>). Starting from an initial harness $`\mathcal{H}_{0}`$, each iteration executes the current harness on an adaptation batch and selectively invokes the four stages: the Digester, Planner, and Evolver each gate on a continuation condition (sufficient actionability, non-empty landscape, and at least one type-safe candidate, respectively), while the Critic and deterministic gate are mandatory for any candidate that reaches them. A round commits a new harness only when a candidate clears all acceptance checks.







### 4.5 Variant Isolation via Ensemble Routing



The adaptation loop (Section <a href="#S4.SS4" class="ltx_ref" title="4.4 The Adaptation Loop ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.4</a>) maintains a single harness $`\mathcal{H}_{t}`$. When tasks require conflicting behaviors, an edit that improves one subset may regress another; the seesaw constraint rejects it, protecting stability but discarding a locally beneficial change. Variant isolation lifts this limitation by maintaining up to $`K`$ harness variants $`\{\mathcal{H}_{t}^{(1)},\ldots,\mathcal{H}_{t}^{(V_{t})}\}`$ ($`V_{t}\leq K`$) and routing each task to the variant with the highest estimated success rate on that task’s cluster across prior rounds. We term this mechanism Ensemble routing.





The gating layer distinguishes two outcomes per candidate: (1) the edit improves some tasks without regressing any, in which case it is applied to its target variant; or (2) it improves a subset while regressing others, in which case the system forks a new variant rather than rejecting the edit outright (retiring the lowest-performing variant if the pool is full). Once multiple variants exist, the seesaw constraint is scoped per-variant: a candidate targeting variant $`k`$ is tested only against tasks routed to $`k`$, so improvements to one cluster cannot regress another. This design predicts three properties validated in Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>: (1) non-degrading aggregate trajectory (peak = final), (2) sustained exploration across more rounds, and (3) lower total token consumption.









## 5 Harness-Model Co-Evolution



Sections <a href="#S3" class="ltx_ref" title="3 Harness Composition ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a> and <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a> show that evolving the harness alone, with the foundation model held fixed, already delivers substantial gains, and that these gains are largest for weaker, smaller task agents, whose behavioral gaps a better harness most readily closes. Co-evolution does not displace that route; it extends it along a second axis. For a capability-limited small model, harness evolution eventually meets a scaffolding ceiling: once the harness exposes the right tools, context, and control flow, the binding constraint becomes whether the frozen model can actually exploit them, and no harness edit can supply reasoning capacity the model itself lacks.





Symmetrically, training the model under a fixed harness meets a training-signal ceiling: newly acquired capabilities go unexercised when the scaffold never surfaces the context, tools, or control flow that elicit them. The model is the agent’s cognitive core, supplying reasoning and planning, while the harness is its executive apparatus, determining what the model perceives, what it can invoke, and what constrains its execution. A sharper apparatus cannot compensate for a weak core, nor a stronger core for an apparatus that never calls on it. Co-evolution targets precisely this bottleneck: by training the model within the same loop that evolves its harness, the agent improves along both axes simultaneously, breaking the ceiling that either improvement alone would leave in place. The principle of jointly evolving complementary capability components also appears in other settings: K<sup>2</sup> Agent \[<a href="#bib.bib54" class="ltx_ref">40</a>\] co-evolves know-what (declarative knowledge) and know-how (procedural skill) for hierarchical mobile device control.





Figure <a href="#S5.F3" class="ltx_ref" title="Figure 3 ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a> illustrates the co-evolution mechanism. Rather than alternating between independent harness-evolution and model-training phases, HarnessX runs both within a single iteration over a shared replay buffer. We formalize the iteration (Section <a href="#S5.SS1" class="ltx_ref" title="5.1 The Co-evolution Iteration ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.1</a>), describe the two optimization substrates (Section <a href="#S5.SS2" class="ltx_ref" title="5.2 Optimization Substrates ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.2</a>), specify the model training objective via cross-harness GRPO (Section <a href="#S5.SS3" class="ltx_ref" title="5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.3</a>), and characterize off-policy training over the shared buffer, the property that lets model RL run at no additional rollout cost (Section <a href="#S5.SS4" class="ltx_ref" title="5.4 Off-Policy Training over a Mixed-Policy Buffer ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.4</a>).



<figure id="S5.F3" class="ltx_figure">
<img src="2606.14249v1/co-evo.png" id="S5.F3.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/184;" width="476" height="184" alt="Refer to caption" />
<figcaption>Figure 3: The harness-model co-evolution loop. The agent (ℳ<sub><em>t</em></sub>, ℋ<sub><em>t</em></sub>) runs the task batch <em>B</em><sub><em>t</em></sub> under a fixed verifier and the observability layer; the resulting traces and rewards (<em>τ</em>, <em>r</em>) enter a shared replay buffer ℬ, where cross-harness grouping pools trajectories of the same task across harness versions and computes group-relative advantages <em>Â</em>. The same buffer drives two updates over identical data: AEGIS harness evolution (Digester → Planner → Evolver → Critic, yielding the evolved harness ℋ<sub><em>t</em> + 1</sub>) and cross-harness GRPO (group sampling and a clipped GRPO objective, yielding the updated model ℳ<sub><em>t</em> + 1</sub>); both feed the next iteration.</figcaption>
</figure>



### 5.1 The Co-evolution Iteration



Co-evolution operates over the pair $`(\mathcal{M}_{t},\mathcal{H}_{t})`$, where $`\mathcal{M}_{t}`$ denotes trainable model parameters (relaxing the frozen-model assumption of Section <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>) and $`\mathcal{H}_{t}`$ denotes the harness configuration at iteration $`t`$. The system maintains a fixed-capacity replay buffer $`\mathcal{B}`$ with first-in-first-out eviction. Each iteration proceeds as:





1.  1.
    

    Rollout. Run $`(\mathcal{M}_{t},\mathcal{H}_{t})`$ on the adaptation batch $`B_{t}`$; the observability layer records each episode as a complete trace $`\tau_{i}`$, capturing every model turn, tool call, and tool result.

    
2.  2.
    

    Verification. A fixed verifier scores each trace into a scalar reward $`r_{i}`$. Holding the verifier fixed keeps rewards comparable across harness versions, which the cross-harness advantage (Eq. <a href="#S5.E3" class="ltx_ref" title="Equation 3 ‣ Task-level alignment, not action-level. ‣ 5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a>) requires.

    
3.  3.
    

    Buffer insertion. Append each scored trace to the shared buffer $`\mathcal{B}`$ together with the harness version that produced it, so successive rounds accumulate rather than overwrite; FIFO eviction keeps $`\mathcal{B}`$ restricted to recent rounds.

    
4.  4.
    

    Harness evolution ($`\mathcal{H}_{t+1}\leftarrow\text{AEGIS}(\mathcal{H}_{t},\mathcal{B})`$, non-parametric, Section <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>). The meta-agent reads the buffered traces as evidence of where the scaffold fails, proposes one discrete structural edit, and admits it only if the Critic and gating layer validate it.

    
5.  5.
    

    Behavior log-probabilities. For the traces just added this round, run a forward pass under the generating model $`\mathcal{M}_{t}`$ to obtain the token-level log-probabilities $`\pi_{\theta_{\text{old}}}(\tau_{i})`$ and cache them for use in the GRPO loss; trajectories from earlier rounds reuse the values cached at their own insertion (Section <a href="#S5.SS4" class="ltx_ref" title="5.4 Off-Policy Training over a Mixed-Policy Buffer ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.4</a>).

    
6.  6.
    

    GRPO update ($`\mathcal{M}_{t+1}\leftarrow\text{GRPO}(\mathcal{M}_{t},\mathcal{B})`$, parametric, Section <a href="#S5.SS3" class="ltx_ref" title="5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.3</a>). Partition traces into per-task groups spanning harness versions, assign each a group-relative advantage, and take a clipped policy-gradient step with a KL anchor to the fixed reference.

    
7.  7.
    

    Advance. Return to step 1 with the evolved pair $`(\mathcal{M}_{t+1},\mathcal{H}_{t+1})`$.

    





Every trace serves as both AEGIS diagnostic evidence and GRPO training signal. The harness evolution (step 4) and model update (steps 5–6) read the same buffer but neither conditions on the other’s output within the same iteration; both must complete before the next rollout begins.







### 5.2 Optimization Substrates



#### Harness side (non-parametric optimization).



Harness evolution proceeds as in Section <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>, drawing on the replay buffer $`\mathcal{B}`$ for trace evidence. The principal difference from standalone AEGIS is that $`\mathcal{B}`$ contains trajectories from multiple model checkpoints $`\mathcal{M}_{0},\mathcal{M}_{1},\ldots,\mathcal{M}_{t}`$, exposing the Digester to behavioral variation from both model updates and harness edits.







#### Model side (parametric optimization via GRPO).



The key design choice is the cross-harness grouping criterion (formalized in Section <a href="#S5.SS3" class="ltx_ref" title="5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.3</a>): all trajectories sharing a task identifier form one GRPO group regardless of which harness or model checkpoint produced them, so that within-group variation reflects strategy differences rather than sampling noise alone.







#### Complementarity.



The harness update makes discrete structural changes (adding a tool, replacing a control processor, restructuring the prompt) that cannot be expressed as parameter updates. The model update makes fine-grained behavioral adjustments (when to invoke which tool, how to phrase a query, when to terminate) that depend on high-dimensional in-context state and cannot be captured by symbolic specification. The harness defines coarse-grained strategy architecture; the model learns to exploit it.









### 5.3 Model Training via Cross-Harness GRPO



We adopt Group Relative Policy Optimization (GRPO) \[<a href="#bib.bib12" class="ltx_ref">33</a>\]. Formally, each trajectory in the buffer is generated as:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\tau_{i}\sim\text{Agent}(\mathcal{M}_{k},\,\mathcal{H}_{k},\,x_{i}),\quad k\in\{0,1,\ldots,t\},
``` |  | (1) |

where $`i`$ is the $`(x,\tau)`$ index in the buffer $`\mathcal{B}`$, $`\mathcal{M}_{k}`$ and $`\mathcal{H}_{k}`$ are the model checkpoint and harness used to roll out task $`x_{i}`$ into trajectory $`\tau_{i}`$. Because FIFO eviction bounds the buffer to recent iterations, buffered trajectories come from model versions close to the current policy. Yet they differ markedly in strategy (tool selection, prompt structure, control-flow logic), a diversity that stems from the successive harness versions $`\mathcal{H}_{0},\ldots,\mathcal{H}_{t}`$. Unlike single-policy RL, where within-group variation reduces to stochastic sampling, here harness identity dominates that variation, which makes the cross-harness grouping criterion (Eq. <a href="#S5.E2" class="ltx_ref" title="Equation 2 ‣ 5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2</a>) essential for meaningful advantage estimation.





Formally, for a task $`x`$, the trajectory group collects all traces of $`x`$ regardless of which $`(\mathcal{M}_{k},\mathcal{H}_{k})`$ pair produced them:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{G}_{x}=\{\tau_{i}\in\mathcal{B}\mid\text{task}(\tau_{i})=x\}=\bigcup_{k}\{\tau\sim\text{Agent}(\mathcal{M}_{k},\mathcal{H}_{k},x)\}.
``` |  | (2) |

The model therefore receives gradient signal from inter-strategy reward contrasts, rather than from stochastic variation within a fixed strategy alone, which enables it to internalize strategies that succeeded across harness versions.





#### Task-level alignment, not action-level.



Cross-harness GRPO performs task-level alignment: trajectories from different harness versions are grouped by task identity and compared by verifier reward alone. No action-level alignment is required, so harness versions with incompatible action spaces (different tool schemas, different prompt structures, different control-flow processors) coexist in the same group without conflict. When computing the policy gradient, each trajectory $`\tau_{i}`$ is replayed under the harness version $`\mathcal{H}_{k}`$ that produced it: the model’s log-probabilities $`\pi_{\theta}(\tau_{i}\mid x)`$ are evaluated against the prompt, tool schema, and observation context that $`\mathcal{H}_{k}`$ would have constructed at each turn. The GRPO gradient thus operates entirely on model output tokens conditioned on harness-specific context, rather than on harness structural actions or environment transitions. This design decouples harness evolution (which may freely alter the action space across versions) from model training (which only requires token-level log-probabilities under each trajectory’s own harness context).





The group-relative advantage is:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\hat{A}(\tau_{i})=\frac{r_{i}-\mu(\mathcal{G}_{x})}{\sigma(\mathcal{G}_{x})+\epsilon},
``` |  | (3) |

where $`r_{i}`$ is the reward for trajectory $`\tau_{i}`$, and $`\mu(\mathcal{G}_{x})`$, $`\sigma(\mathcal{G}_{x})`$ are the within-group reward mean and standard deviation. The evolving harness acts as a structured exploration operator for the model’s RL: each new version injects a distinct mode of behavior into the task’s sampling distribution, and the advantage in Eq. <a href="#S5.E3" class="ltx_ref" title="Equation 3 ‣ Task-level alignment, not action-level. ‣ 5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a> commits the model toward whichever modes the verifier scores highest. The exploration breadth that single-policy sampling cannot provide is thus supplied by the evolving scaffold itself.





The policy objective to maximize is:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{J}_{\text{GRPO}}(\theta)=\mathbb{E}_{x,\,\tau_{i}\sim\mathcal{B}}\left[\min\!\left(\rho_{i}(\theta)\,\hat{A}(\tau_{i}),\;\text{clip}\!\left(\rho_{i}(\theta),\,1{-}\epsilon_{c},\,1{+}\epsilon_{c}\right)\hat{A}(\tau_{i})\right)\right]-\beta\,D_{\text{KL}}\!\left(\pi_{\theta}\,\|\,\pi_{\text{ref}}\right),
``` |  | (4) |

where

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\rho_{i}(\theta)=\frac{\pi_{\theta}(\tau_{i}\mid x)}{\pi_{\theta_{\text{old}}}(\tau_{i}\mid x)},\qquad\pi_{\theta_{\text{old}}}=\mathcal{M}_{d},
``` |  | (5) |

is the importance-sampling ratio between the current policy $`\mathcal{M}_{k}`$ and the checkpoint $`\mathcal{M}_{d}`$ that generated $`\tau_{i}`$ (Eq. <a href="#S5.E1" class="ltx_ref" title="Equation 1 ‣ 5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">1</a>), $`\epsilon_{c}`$ is the clipping threshold, and $`\beta\,D_{\text{KL}}(\pi_{\theta}\|\pi_{\text{ref}})`$ penalizes divergence from the fixed reference model $`\pi_{\text{ref}}`$. The behavior policy $`\pi_{\theta_{\text{old}}}`$ in the ratio and the reference policy $`\pi_{\text{ref}}`$ in the KL term are distinct: $`\pi_{\text{ref}}=\mathcal{M}_{0}`$ is fixed throughout training, while $`\pi_{\theta_{\text{old}}}`$ varies per trajectory and must be recovered from the buffer (Section <a href="#S5.SS4" class="ltx_ref" title="5.4 Off-Policy Training over a Mixed-Policy Buffer ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.4</a>).









### 5.4 Off-Policy Training over a Mixed-Policy Buffer



The replay buffer is intrinsically off-policy: at iteration $`t`$ it holds trajectories generated by checkpoints $`\mathcal{M}_{0},\mathcal{M}_{1},\dots,\mathcal{M}_{t}`$ under harnesses $`\mathcal{H}_{0},\mathcal{H}_{1},\dots,\mathcal{H}_{t}`$ (Eq. <a href="#S5.E1" class="ltx_ref" title="Equation 1 ‣ 5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">1</a>), so the buffer distribution does not match the policy $`\pi_{\theta}`$ under update. Recovering $`\pi_{\theta_{\text{old}}}`$ for each buffered trajectory is the central off-policy challenge.





#### Behavior policy $`\pi_{\theta_{\text{old}}}`$.



The importance ratio (Eq. <a href="#S5.E5" class="ltx_ref" title="Equation 5 ‣ Task-level alignment, not action-level. ‣ 5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a>) corrects the gap between $`\pi_{\theta}`$ and the checkpoint $`\mathcal{M}_{k}`$ that produced $`\tau_{i}`$. Since $`\mathcal{M}_{k}`$ varies across the buffer, $`\pi_{\theta_{\text{old}}}(\tau_{i})`$ cannot be recovered from any single model: we materialize it at buffer insertion via one forward pass under $`\mathcal{M}_{k}`$, cache the token-level log-probabilities on disk, and reuse them at every gradient step. This decouples the cached behavior log-probabilities from the current log-probabilities $`\pi_{\theta}(\tau_{i})`$ recomputed each step.







#### Bounded off-policy bias.



FIFO eviction caps the buffer at $`C`$ trajectories; with $`s`$ samples per round the maximum model-version lag is $`\lfloor C/s\rfloor`$ rounds, so every cached $`\pi_{\theta_{\text{old}}}`$ originates within a bounded window of $`\pi_{\theta}`$ and the policy that generated a trajectory never differs greatly from the one being updated. The same window bounds harness staleness, so the cross-harness groups (Eq. <a href="#S5.E2" class="ltx_ref" title="Equation 2 ‣ 5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">2</a>) mix only recent scaffold versions, and the model is never trained predominantly against an obsolete harness.







#### Replay reuse at no added rollout cost.



The dominant cost of agentic RL is the rollout (executing the agent in the environment: model decoding, tool calls, and verification), not the gradient update. In co-evolution a single round of exploration produces one set of trajectories that serves both updates: the same traces drive the AEGIS harness update (Section <a href="#S4" class="ltx_ref" title="4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>) and, through the shared buffer (Section <a href="#S5.SS1" class="ltx_ref" title="5.1 The Co-evolution Iteration ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.1</a>), the cross-harness GRPO model update. GRPO consumes these trajectories by replay and issues no rollouts of its own. The marginal cost of adding the model update is therefore confined to (i) one cached forward pass per trajectory to record $`\pi_{\theta_{\text{old}}}`$ and (ii) the gradient steps themselves, both of which are rollout-free. No trajectory is generated solely to train the model. Joint optimization is therefore economical: it buys model improvement for the price of offline training compute alone, without any rollouts beyond those harness evolution already performs.











## 6 Experiments



We evaluate HarnessX along five axes: overall effectiveness across benchmarks and model families (Section <a href="#S6.SS2" class="ltx_ref" title="6.2 Main Results ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.2</a>), the impact of variant-management strategies on stability (Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>), the relative contribution of evolver architecture versus infrastructure (Section <a href="#S6.SS4" class="ltx_ref" title="6.4 Meta-Agent Effectiveness ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.4</a>), gains from joint model–harness co-evolution (Section <a href="#S6.SS5" class="ltx_ref" title="6.5 Co-Evolution ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.5</a>), and empirical confirmation of the predicted failure modes (Section <a href="#S6.SS6" class="ltx_ref" title="6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6</a>).





### 6.1 Experimental Setup



#### Benchmarks.



As summarized in Table <a href="#S6.T3" class="ltx_ref" title="Table 3 ‣ Benchmarks. ‣ 6.1 Experimental Setup ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a>, we evaluate on five benchmarks spanning multi-step retrieval, embodied planning, web interaction, multi-turn dialogue, and software engineering. Unless otherwise noted, each experiment runs for up to $`T{=}15`$ evolution rounds with early stopping after $`P{=}3`$ consecutive rounds without a shipped edit. The full task set is evaluated every round (no subsampling). The meta-agent token budget varies by benchmark (100M–175M total) but is held constant across task agents within a benchmark.



<figure id="S6.T3" class="ltx_table">
<table id="S6.T3.5" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S6.T3.5.1" class="ltx_tr">
<th id="S6.T3.5.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Benchmark</th>
<th id="S6.T3.5.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Domain</th>
<th id="S6.T3.5.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Sampled Tasks</th>
<th id="S6.T3.5.1.4" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Verifier</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S6.T3.5.2" class="ltx_tr">
<td id="S6.T3.5.2.1" class="ltx_td ltx_align_left ltx_border_t">GAIA (Level 1–3)</td>
<td id="S6.T3.5.2.2" class="ltx_td ltx_align_left ltx_border_t">Multi-step retrieval</td>
<td id="S6.T3.5.2.3" class="ltx_td ltx_align_center ltx_border_t">103</td>
<td id="S6.T3.5.2.4" class="ltx_td ltx_align_left ltx_border_t">Exact match</td>
</tr>
<tr id="S6.T3.5.3" class="ltx_tr">
<td id="S6.T3.5.3.1" class="ltx_td ltx_align_left">ALFWorld</td>
<td id="S6.T3.5.3.2" class="ltx_td ltx_align_left">Embodied planning</td>
<td id="S6.T3.5.3.3" class="ltx_td ltx_align_center">134</td>
<td id="S6.T3.5.3.4" class="ltx_td ltx_align_left">Goal completion</td>
</tr>
<tr id="S6.T3.5.4" class="ltx_tr">
<td id="S6.T3.5.4.1" class="ltx_td ltx_align_left">WebShop</td>
<td id="S6.T3.5.4.2" class="ltx_td ltx_align_left">Web interaction</td>
<td id="S6.T3.5.4.3" class="ltx_td ltx_align_center">100</td>
<td id="S6.T3.5.4.4" class="ltx_td ltx_align_left">Attribute match</td>
</tr>
<tr id="S6.T3.5.5" class="ltx_tr">
<td id="S6.T3.5.5.1" class="ltx_td ltx_align_left"><em>τ</em><sup>3</sup>-Bench</td>
<td id="S6.T3.5.5.2" class="ltx_td ltx_align_left">Multi-turn dialogue</td>
<td id="S6.T3.5.5.3" class="ltx_td ltx_align_center">3 domains</td>
<td id="S6.T3.5.5.4" class="ltx_td ltx_align_left">Rule compliance</td>
</tr>
<tr id="S6.T3.5.6" class="ltx_tr">
<td id="S6.T3.5.6.1" class="ltx_td ltx_align_left ltx_border_bb">SWE-bench Verified</td>
<td id="S6.T3.5.6.2" class="ltx_td ltx_align_left ltx_border_bb">Software engineering</td>
<td id="S6.T3.5.6.3" class="ltx_td ltx_align_center ltx_border_bb">55</td>
<td id="S6.T3.5.6.4" class="ltx_td ltx_align_left ltx_border_bb">Patch resolution</td>
</tr>
</tbody>
</table>
<figcaption>Table 3: Benchmark characteristics.</figcaption>
</figure>





#### Models.



We distinguish two roles: the meta-agent (Claude Opus 4.6 unless otherwise noted) drives the AEGIS evolution loop; the task agent runs under the evolved harness to solve benchmark tasks. Task agents span three families (Claude Sonnet 4.6, GPT-5.4, and Qwen3.5-9B) to test whether a single meta-agent can evolve effective harnesses across model families.







#### Baselines.



(1) Static Harness: a HarnessX configuration constructed from published benchmark-specific prompts and tool definitions, held fixed across all rounds. (2) Claude Code SDK (CC SDK)<sup>1</sup><sup>1</sup> 1 Claude Code SDK v0.0.25, model="opus" (Claude Opus 4.6), max_turns=200. Experiments conducted in May 2026.: a single-agent evolver (one LLM session per round) that replaces the four-stage pipeline while retaining the same infrastructure and round budget, isolating AEGIS’s multi-stage architecture from the shared infrastructure (Section <a href="#S6.SS4" class="ltx_ref" title="6.4 Meta-Agent Effectiveness ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.4</a>). This baseline also serves as a proxy for monolithic evolvers such as SICA \[<a href="#bib.bib38" class="ltx_ref">31</a>\].







#### Metrics.



Task success rate (%) under the benchmark-specific verifier. Each task receives two independent attempts per round (pass@2: solved if either succeeds), reducing sampling noise while preserving a binary per-task signal for the seesaw constraint (at the cost of masking sub-threshold success-probability drift; Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>).







#### Scope.



All reported gains are measured on the same task set used for evolution; held-out generalization to unseen tasks is not evaluated in this work.



<figure id="S6.F4" class="ltx_figure">
<img src="2606.14249v1/Evolution_Main.png" id="S6.F4.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:405/229;" width="405" height="229" alt="Refer to caption" />
<figcaption>Figure 4: Evolution trajectories (pass@2 success rate vs. round). Dashed lines: static-harness baselines.</figcaption>
</figure>







### 6.2 Main Results



Table <a href="#S6.T4" class="ltx_ref" title="Table 4 ‣ 6.2 Main Results ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a> and Figure <a href="#S6.F4" class="ltx_ref" title="Figure 4 ‣ Scope. ‣ 6.1 Experimental Setup ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a> report pass@2 success rates before and after harness evolution. AEGIS improves 14 of 15 model–benchmark configurations, with an average gain of +14.5% (up to +44.0%). The single stagnating configuration (GAIA, GPT-5.4, $`\Delta{=}0.0`$) reflects a fundamental limitation of single-harness evolution on heterogeneous task sets; Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a> shows that variant isolation resolves this. One configuration regressed mid-run ($`\tau^{3}`$-Bench Telecom, $`-`$<!-- -->14.0% at R7) due to accumulated same-type edits, recovering by R9 (Section <a href="#S6.SS6" class="ltx_ref" title="6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6</a>).



<figure id="S6.T4" class="ltx_table">
<table id="S6.T4.5" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S6.T4.5.1" class="ltx_tr">
<th id="S6.T4.5.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Benchmark</th>
<th id="S6.T4.5.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Task agent</th>
<th id="S6.T4.5.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Initial</th>
<th id="S6.T4.5.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Evolved</th>
<th id="S6.T4.5.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt"><em>Δ</em></th>
<th id="S6.T4.5.1.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Best round</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S6.T4.5.2" class="ltx_tr">
<td rowspan="3" id="S6.T4.5.2.1" class="ltx_td ltx_align_left ltx_border_t">ALFWorld</td>
<td id="S6.T4.5.2.2" class="ltx_td ltx_align_left ltx_border_t">Claude Sonnet 4.6</td>
<td id="S6.T4.5.2.3" class="ltx_td ltx_align_center ltx_border_t">83.6</td>
<td id="S6.T4.5.2.4" class="ltx_td ltx_align_center ltx_border_t">94.8</td>
<td id="S6.T4.5.2.5" class="ltx_td ltx_align_center ltx_border_t">+11.2</td>
<td id="S6.T4.5.2.6" class="ltx_td ltx_align_center ltx_border_t">7</td>
</tr>
<tr id="S6.T4.5.3" class="ltx_tr">
<td id="S6.T4.5.3.1" class="ltx_td ltx_align_left">GPT-5.4</td>
<td id="S6.T4.5.3.2" class="ltx_td ltx_align_center">76.9</td>
<td id="S6.T4.5.3.3" class="ltx_td ltx_align_center">97.8</td>
<td id="S6.T4.5.3.4" class="ltx_td ltx_align_center">+20.9</td>
<td id="S6.T4.5.3.5" class="ltx_td ltx_align_center">4</td>
</tr>
<tr id="S6.T4.5.4" class="ltx_tr">
<td id="S6.T4.5.4.1" class="ltx_td ltx_align_left">Qwen3.5-9B</td>
<td id="S6.T4.5.4.2" class="ltx_td ltx_align_center">53.0</td>
<td id="S6.T4.5.4.3" class="ltx_td ltx_align_center">97.0</td>
<td id="S6.T4.5.4.4" class="ltx_td ltx_align_center">+44.0</td>
<td id="S6.T4.5.4.5" class="ltx_td ltx_align_center">9</td>
</tr>
<tr id="S6.T4.5.5" class="ltx_tr">
<td rowspan="3" id="S6.T4.5.5.1" class="ltx_td ltx_align_left ltx_border_t">WebShop</td>
<td id="S6.T4.5.5.2" class="ltx_td ltx_align_left ltx_border_t">Claude Sonnet 4.6</td>
<td id="S6.T4.5.5.3" class="ltx_td ltx_align_center ltx_border_t">60.0</td>
<td id="S6.T4.5.5.4" class="ltx_td ltx_align_center ltx_border_t">76.0</td>
<td id="S6.T4.5.5.5" class="ltx_td ltx_align_center ltx_border_t">+16.0</td>
<td id="S6.T4.5.5.6" class="ltx_td ltx_align_center ltx_border_t">7</td>
</tr>
<tr id="S6.T4.5.6" class="ltx_tr">
<td id="S6.T4.5.6.1" class="ltx_td ltx_align_left">GPT-5.4</td>
<td id="S6.T4.5.6.2" class="ltx_td ltx_align_center">55.0</td>
<td id="S6.T4.5.6.3" class="ltx_td ltx_align_center">73.0</td>
<td id="S6.T4.5.6.4" class="ltx_td ltx_align_center">+18.0</td>
<td id="S6.T4.5.6.5" class="ltx_td ltx_align_center">8</td>
</tr>
<tr id="S6.T4.5.7" class="ltx_tr">
<td id="S6.T4.5.7.1" class="ltx_td ltx_align_left">Qwen3.5-9B</td>
<td id="S6.T4.5.7.2" class="ltx_td ltx_align_center">36.0</td>
<td id="S6.T4.5.7.3" class="ltx_td ltx_align_center">49.0</td>
<td id="S6.T4.5.7.4" class="ltx_td ltx_align_center">+13.0</td>
<td id="S6.T4.5.7.5" class="ltx_td ltx_align_center">7</td>
</tr>
<tr id="S6.T4.5.8" class="ltx_tr">
<td rowspan="3" id="S6.T4.5.8.1" class="ltx_td ltx_align_left ltx_border_t">GAIA</td>
<td id="S6.T4.5.8.2" class="ltx_td ltx_align_left ltx_border_t">Claude Sonnet 4.6</td>
<td id="S6.T4.5.8.3" class="ltx_td ltx_align_center ltx_border_t">73.8</td>
<td id="S6.T4.5.8.4" class="ltx_td ltx_align_center ltx_border_t">83.5</td>
<td id="S6.T4.5.8.5" class="ltx_td ltx_align_center ltx_border_t">+9.7</td>
<td id="S6.T4.5.8.6" class="ltx_td ltx_align_center ltx_border_t">11</td>
</tr>
<tr id="S6.T4.5.9" class="ltx_tr">
<td id="S6.T4.5.9.1" class="ltx_td ltx_align_left">GPT-5.4</td>
<td id="S6.T4.5.9.2" class="ltx_td ltx_align_center">73.8</td>
<td id="S6.T4.5.9.3" class="ltx_td ltx_align_center">73.8</td>
<td id="S6.T4.5.9.4" class="ltx_td ltx_align_center">0.0</td>
<td id="S6.T4.5.9.5" class="ltx_td ltx_align_center">4</td>
</tr>
<tr id="S6.T4.5.10" class="ltx_tr">
<td id="S6.T4.5.10.1" class="ltx_td ltx_align_left">Qwen3.5-9B</td>
<td id="S6.T4.5.10.2" class="ltx_td ltx_align_center">20.3</td>
<td id="S6.T4.5.10.3" class="ltx_td ltx_align_center">37.4</td>
<td id="S6.T4.5.10.4" class="ltx_td ltx_align_center">+17.1</td>
<td id="S6.T4.5.10.5" class="ltx_td ltx_align_center">4</td>
</tr>
<tr id="S6.T4.5.11" class="ltx_tr">
<td rowspan="3" id="S6.T4.5.11.1" class="ltx_td ltx_align_left ltx_border_t">SWE-bench Verified</td>
<td id="S6.T4.5.11.2" class="ltx_td ltx_align_left ltx_border_t">Claude Sonnet 4.6</td>
<td id="S6.T4.5.11.3" class="ltx_td ltx_align_center ltx_border_t">76.4</td>
<td id="S6.T4.5.11.4" class="ltx_td ltx_align_center ltx_border_t">87.3</td>
<td id="S6.T4.5.11.5" class="ltx_td ltx_align_center ltx_border_t">+10.9</td>
<td id="S6.T4.5.11.6" class="ltx_td ltx_align_center ltx_border_t">3</td>
</tr>
<tr id="S6.T4.5.12" class="ltx_tr">
<td id="S6.T4.5.12.1" class="ltx_td ltx_align_left">GPT-5.4</td>
<td id="S6.T4.5.12.2" class="ltx_td ltx_align_center">45.5</td>
<td id="S6.T4.5.12.3" class="ltx_td ltx_align_center">63.6</td>
<td id="S6.T4.5.12.4" class="ltx_td ltx_align_center">+18.2</td>
<td id="S6.T4.5.12.5" class="ltx_td ltx_align_center">3</td>
</tr>
<tr id="S6.T4.5.13" class="ltx_tr">
<td id="S6.T4.5.13.1" class="ltx_td ltx_align_left">Qwen3.5-9B</td>
<td id="S6.T4.5.13.2" class="ltx_td ltx_align_center">23.6</td>
<td id="S6.T4.5.13.3" class="ltx_td ltx_align_center">41.8</td>
<td id="S6.T4.5.13.4" class="ltx_td ltx_align_center">+18.2</td>
<td id="S6.T4.5.13.5" class="ltx_td ltx_align_center">2</td>
</tr>
<tr id="S6.T4.5.14" class="ltx_tr">
<td rowspan="3" id="S6.T4.5.14.1" class="ltx_td ltx_align_left ltx_border_bb ltx_border_t"><em>τ</em><sup>3</sup>-Bench (Avg.)</td>
<td id="S6.T4.5.14.2" class="ltx_td ltx_align_left ltx_border_t">Claude Sonnet 4.6</td>
<td id="S6.T4.5.14.3" class="ltx_td ltx_align_center ltx_border_t">89.6</td>
<td id="S6.T4.5.14.4" class="ltx_td ltx_align_center ltx_border_t">95.0</td>
<td id="S6.T4.5.14.5" class="ltx_td ltx_align_center ltx_border_t">+5.4</td>
<td id="S6.T4.5.14.6" class="ltx_td ltx_align_center ltx_border_t">–</td>
</tr>
<tr id="S6.T4.5.15" class="ltx_tr">
<td id="S6.T4.5.15.1" class="ltx_td ltx_align_left">GPT-5.4</td>
<td id="S6.T4.5.15.2" class="ltx_td ltx_align_center">76.2</td>
<td id="S6.T4.5.15.3" class="ltx_td ltx_align_center">90.7</td>
<td id="S6.T4.5.15.4" class="ltx_td ltx_align_center">+14.5</td>
<td id="S6.T4.5.15.5" class="ltx_td ltx_align_center">–</td>
</tr>
<tr id="S6.T4.5.16" class="ltx_tr">
<td id="S6.T4.5.16.1" class="ltx_td ltx_align_left ltx_border_bb">Qwen3.5-9B</td>
<td id="S6.T4.5.16.2" class="ltx_td ltx_align_center ltx_border_bb">93.5</td>
<td id="S6.T4.5.16.3" class="ltx_td ltx_align_center ltx_border_bb">94.6</td>
<td id="S6.T4.5.16.4" class="ltx_td ltx_align_center ltx_border_bb">+1.1</td>
<td id="S6.T4.5.16.5" class="ltx_td ltx_align_center ltx_border_bb">–</td>
</tr>
</tbody>
</table>
<figcaption>Table 4: Main results (pass@2 success rate, %). Evolved = peak accuracy achieved. “–” indicates domain-averaged results where no single peak round applies.</figcaption>
</figure>



Overall performance. Evolution improves 14 of 15 configurations. Gains range from +11.2% to +44.0% on ALFWorld, +13.0% to +18.0% on WebShop, and +10.9% to +18.2% on SWE-bench Verified. On GAIA, Sonnet 4.6 (+9.7%) and Qwen3.5-9B (+17.1%) improve, while GPT-5.4 stagnates ($`\Delta{=}0.0`$; resolving its failures demands mutually conflicting edits that no single-harness strategy can accommodate). On $`\tau^{3}`$-Bench, GPT-5.4 gains most (+14.5%) while Qwen3.5-9B gains only +1.1% due to its near-ceiling 93.5% baseline.





Inverse scaling with baseline performance. Across benchmarks, the weakest task agent (Qwen3.5-9B) consistently gains most: +44.0% on ALFWorld (baseline 53.0%), +17.1% on GAIA (baseline 20.3%), and +18.2% on SWE-bench Verified (baseline 23.6%). Stronger models (Sonnet 4.6, GPT-5.4) gain less on ALFWorld (+11.2%, +20.9%) and SWE-bench (+10.9%, +18.2%). The exception is GAIA GPT-5.4 ($`\Delta{=}0.0`$), where task heterogeneity prevents a single harness from improving aggregate accuracy—an observation that motivates the variant-isolation ablation in Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>. The overall pattern suggests that weaker models exhibit more behavioral gaps addressable by harness-level edits; once baseline performance is sufficiently high, remaining failures increasingly require task-specific adaptations rather than global improvements.





Cross-model generalization. The meta-agent (Opus 4.6) evolves harnesses for task agents across model families without family-specific adaptation. On ALFWorld, cross-family agents (GPT-5.4: +20.9%, Qwen3.5-9B: +44.0%) gain more than the same-family agent (Sonnet 4.6: +11.2%), indicating that gain magnitude tracks baseline performance rather than proximity to the meta-agent’s family.





Convergence rate tracks failure-mode concentration. ALFWorld (GPT-5.4) peaks at R4 and SWE-bench Verified (all agents) peaks at R2–R3; in both cases, failures concentrate in one or two component types, enabling rapid convergence. GAIA (Sonnet 4.6) requires 11 rounds because failures span four component types (prompt, tool, processor, configuration), forcing sequential exploration of multiple edit neighborhoods.





#### Domain-level variation within $`\tau^{3}`$-Bench.



The averaged $`\tau^{3}`$-Bench gains mask substantial per-domain variation. GPT-5.4 gains +25.4% on Telecom (67.5% $`\to`$ 93.0% at R2) and +9.7% on Retail (84.2% $`\to`$ 93.9% at R6). However, Sonnet 4.6 on Telecom regresses $`-`$<!-- -->14.0% in a single round (R7) due to accumulated same-type edits, recovering by R9 (Section <a href="#S6.SS6" class="ltx_ref" title="6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6</a>). This illustrates a structural limitation of per-edit gating: sub-threshold coupling from consecutive same-type edits accumulates undetected until a tipping point triggers visible regression.







#### Post-peak degradation on SWE-bench.



On SWE-bench Verified (GPT-5.4), evolution peaks at 63.6% (R3, +18.2%) but degrades to 50.9% by R5 ($`-`$<!-- -->12.7% from peak); final accuracy still exceeds the static baseline by +5.4%. Two factors accelerate degradation on this benchmark: (1) with only 55 tasks, each task flip shifts aggregate accuracy by $`{\sim}`$<!-- -->1.8% (vs. $`{\sim}`$<!-- -->1.0% at $`n{=}103`$), so fewer regressions suffice to produce visible decline; and (2) structural code edits have a broader blast radius than prompt edits. This parallels the GAIA GPT-5.4 stagnation: both cases motivate the variant-isolation strategy evaluated in Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>.









### 6.3 Evolution Strategy Comparison



The main experiments (Table <a href="#S6.T4" class="ltx_ref" title="Table 4 ‣ 6.2 Main Results ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>) use the Global strategy: a single harness evolved across all tasks. Table <a href="#S6.T5" class="ltx_ref" title="Table 5 ‣ 6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a> compares this default with a variant-isolation strategy on GAIA (103 tasks, GPT-5.4, 15 rounds, AEGIS evolver).



<figure id="S6.T5" class="ltx_table">
<table id="S6.T5.6" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S6.T5.6.1" class="ltx_tr">
<th id="S6.T5.6.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt">Strategy</th>
<th id="S6.T5.6.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Final (%)</th>
<th id="S6.T5.6.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Peak (%)</th>
<th id="S6.T5.6.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Final−Peak</th>
<th id="S6.T5.6.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Tokens</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S6.T5.6.2" class="ltx_tr">
<th id="S6.T5.6.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">Ensemble (up to <em>K</em> variants)</th>
<td id="S6.T5.6.2.2" class="ltx_td ltx_align_center ltx_border_t">87.4</td>
<td id="S6.T5.6.2.3" class="ltx_td ltx_align_center ltx_border_t">87.4</td>
<td id="S6.T5.6.2.4" class="ltx_td ltx_align_center ltx_border_t">0.0</td>
<td id="S6.T5.6.2.5" class="ltx_td ltx_align_center ltx_border_t">107.8M</td>
</tr>
<tr id="S6.T5.6.3" class="ltx_tr">
<th id="S6.T5.6.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb">Global (single harness)</th>
<td id="S6.T5.6.3.2" class="ltx_td ltx_align_center ltx_border_bb">49.5</td>
<td id="S6.T5.6.3.3" class="ltx_td ltx_align_center ltx_border_bb">73.8</td>
<td id="S6.T5.6.3.4" class="ltx_td ltx_align_center ltx_border_bb">−24.3</td>
<td id="S6.T5.6.3.5" class="ltx_td ltx_align_center ltx_border_bb">143.7M</td>
</tr>
</tbody>
</table>
<figcaption>Table 5: Evolution strategy comparison (GAIA, GPT-5.4, AEGIS evolver, 15 rounds). Final−Peak indicates stability; negative values signal catastrophic forgetting.</figcaption>
</figure>



Failure mechanism of Global. The Global strategy maintains a single harness for all 103 tasks. It peaks early at R4 (73.8%) before degrading steadily: subsequent edits introduce sub-threshold regressions that are individually undetectable under pass@2’s binary signal yet compound into aggregate decline. The peak–final gap ($`-`$<!-- -->24.3%) far exceeds the per-round binomial 95% confidence interval ($`\pm`$<!-- -->8.5% at $`n{=}103`$, $`p{\approx}0.74`$), ruling out evaluation noise and confirming catastrophic forgetting (Section <a href="#S4.SS2" class="ltx_ref" title="4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.2</a>). This explains the $`\Delta{=}0.0`$ stagnation for GAIA GPT-5.4 in Table <a href="#S6.T4" class="ltx_ref" title="Table 4 ‣ 6.2 Main Results ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4</a>: Global cannot sustain improvement on this heterogeneous task set.





Why Ensemble prevents cross-variant forgetting. Ensemble routing maintains up to $`K`$ harness variants and routes each task to the variant with the highest prior success rate. Edits are proposed and evaluated per-variant, so an edit improving one cluster cannot regress another. The comparison confirms three predicted properties: (1) non-degrading aggregate trajectory (peak = final), (2) later peak (R14 vs. R4), indicating sustained productive exploration, and (3) lower token consumption (107.8M vs. 143.7M), because each edit is evaluated only against its target cluster rather than the full task set, and edits target only their assigned cluster, avoiding the wasted proposals that accumulate when a degrading single harness is evaluated against all tasks.





Summary. Variant isolation resolves the stagnation observed under Global, lifting GAIA GPT-5.4 from $`\Delta{=}0.0`$ to +13.6% (87.4%, non-degrading). Finer-grained strategies (Domain-aware clustering, Task-level tournament) were explored at pilot scale (30–40 tasks, $`\leq`$<!-- -->8 rounds) but lack sufficient rounds and tasks for statistically meaningful comparison.







### 6.4 Meta-Agent Effectiveness



To disentangle evolver architecture from infrastructure, we replace the four-stage AEGIS pipeline with a single-agent CC SDK evolver that shares the same model (Opus 4.6), round budget, and infrastructure. Both evolvers run under variant isolation (introduced in Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>) to ensure non-degrading trajectories. Table <a href="#S6.T6" class="ltx_ref" title="Table 6 ‣ 6.4 Meta-Agent Effectiveness ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6</a> reports the comparison on GAIA (103 tasks, GPT-5.4, 15 rounds).



<figure id="S6.T6" class="ltx_table">
<table id="S6.T6.5" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S6.T6.5.1" class="ltx_tr">
<th id="S6.T6.5.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt">Evolver</th>
<th id="S6.T6.5.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Accuracy (%)</th>
<th id="S6.T6.5.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Best round</th>
<th id="S6.T6.5.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Tokens</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S6.T6.5.2" class="ltx_tr">
<th id="S6.T6.5.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">AEGIS</th>
<td id="S6.T6.5.2.2" class="ltx_td ltx_align_center ltx_border_t">87.4</td>
<td id="S6.T6.5.2.3" class="ltx_td ltx_align_center ltx_border_t">R14</td>
<td id="S6.T6.5.2.4" class="ltx_td ltx_align_center ltx_border_t">107.8M</td>
</tr>
<tr id="S6.T6.5.3" class="ltx_tr">
<th id="S6.T6.5.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb">CC SDK</th>
<td id="S6.T6.5.3.2" class="ltx_td ltx_align_center ltx_border_bb">86.4</td>
<td id="S6.T6.5.3.3" class="ltx_td ltx_align_center ltx_border_bb">R12</td>
<td id="S6.T6.5.3.4" class="ltx_td ltx_align_center ltx_border_bb">123.1M</td>
</tr>
</tbody>
</table>
<figcaption>Table 6: Meta-agent architecture comparison (GAIA, GPT-5.4, variant isolation, 15 rounds). Both evolvers use Opus 4.6.</figcaption>
</figure>



Accuracy is comparable; efficiency differs. The 1.0% accuracy gap falls within one standard error ($`{\sim}`$<!-- -->3.3% at $`n{=}103`$), indicating that the four-stage decomposition does not improve final accuracy at this meta-agent capability level. However, the single-agent variant consumes $`{\sim}`$<!-- -->14% more tokens (123.1M vs. 107.8M). We attribute this to the Digester’s compression: it reduces $`{\sim}`$<!-- -->10M raw trace tokens to $`{\sim}`$<!-- -->10K structured summaries before downstream stages consume them. Without this stage, the single-agent evolver must truncate traces to fit its context window, yielding less-informed edits that are rejected by the gate more frequently, wasting tokens on failed proposals.





Implication. With a capable meta-agent under variant isolation, accuracy gains derive primarily from HarnessX’s infrastructure (typed components enabling isolation, structured traces enabling diagnosis) rather than the evolver’s internal architecture. The four-stage decomposition contributes efficiency ($`{\sim}`$<!-- -->12% fewer tokens) and interpretability (auditable intermediate artifacts) but not measurable accuracy at this scale.







### 6.5 Co-Evolution



This experiment tests whether interleaving harness evolution with model RL (Section <a href="#S5" class="ltx_ref" title="5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a>) yields gains beyond harness-only evolution. As shown in Figure <a href="#S6.F5" class="ltx_ref" title="Figure 5 ‣ 6.5 Co-Evolution ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a>, we compare the two regimes on GAIA and WebShop using a Qwen3.5-9B task agent. Both conditions share a fixed-capacity FIFO replay buffer: each round runs the current agent on the adaptation batch, a fixed verifier scores the resulting traces, and both harness evolution (AEGIS) and model training (cross-harness GRPO) update over the same buffer (Section <a href="#S5.SS1" class="ltx_ref" title="5.1 The Co-evolution Iteration ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.1</a>). Section <a href="#S5" class="ltx_ref" title="5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a> predicts that each single-optimization route stalls at its own ceiling: harness-only at the scaffolding ceiling, model-RL-only at the training-signal ceiling. Co-evolution addresses both ceilings by enabling the model to internalize strategies that successive harness versions introduce.





Experimental setup. We run both regimes on the GAIA text-only subset (103 tasks) and a WebShop subset (100 tasks) with a Qwen3.5-9B task agent. GAIA exercises live web tools whose latency and availability fluctuate, so each round is evaluated twice and averaged. Both subsets are small, so we set the optimizer batch to the entire replay buffer and size the buffer as a four-round sliding window: at two rollouts per task this is 824 traces on GAIA ($`103\times 2\times 4`$) and 400 on WebShop ($`100\times 1\times 4`$), which supplies enough within-group samples for GRPO to estimate advantages stably. Training uses learning rate $`1\times 10^{-6}`$, GRPO clip $`\epsilon=0.2`$, no KL penalty (coefficient $`0`$), and 5 training steps per round. The GAIA agent is equipped with web search (Baidu API), web fetch, bash, and file read; WebShop uses its environment’s built-in action tools. Rewards are $`0.9\times`$correctness plus $`0.1\times`$format on GAIA, and WebShop’s native attribute-match reward (a task passes only at reward $`=1.0`$).



<figure id="S6.F5" class="ltx_figure">
<img src="2606.14249v1/images/coevolution_merged.png" id="S6.F5.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:357/122;" width="357" height="122" alt="Refer to caption" />
<figcaption>Figure 5: Co-evolution vs. harness-only evolution (AEGIS, model frozen) on GAIA and WebShop. Stars mark each method’s peak; the shaded band is the co-evolution gain.</figcaption>
</figure>



Co-evolution exceeds harness-only evolution. As Figure <a href="#S6.F5" class="ltx_ref" title="Figure 5 ‣ 6.5 Co-Evolution ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a> shows, interleaving cross-harness GRPO with harness evolution over a shared replay buffer raises peak success on both benchmarks: GAIA 37.4% $`\to`$ 41.7% (+4.3%) and WebShop 49.0% $`\to`$ 54.0% (+5.0%), averaging +4.7% over the model-frozen baseline. The two curves coincide until joint training takes effect (R4), then diverge, with co-evolution at or above harness-only for the remainder of the run. The gap persists to the final round (GAIA 36.4% $`\to`$ 39.8%, WebShop 46.0% $`\to`$ 50.0%) and is wider on WebShop, where more room remains for model-level improvement beyond the harness-only plateau. Co-evolution thus lifts end-of-run accuracy, not merely the peak.





Co-evolution breaks the scaffolding ceiling. Harness-only evolution plateaus at $`{\sim}`$<!-- -->37% on GAIA and $`{\sim}`$<!-- -->49% on WebShop. Co-evolution clears these plateaus: cross-harness GRPO enables the model to internalize strategies from successive harness versions, so later edits build on learned behavior rather than compensating for a fixed model’s intrinsic limitations.







### 6.6 Failure Analysis



We present three case studies, one per pathology predicted by the operational mirror (Section <a href="#S4.SS2" class="ltx_ref" title="4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">4.2</a>): reward hacking, catastrophic forgetting, and under-exploration. For each case we document the detection signal that first surfaced the issue, the root cause identified through trace analysis, and the outcome—whether the pipeline self-corrected or required manual intervention. Figure <a href="#S6.F6" class="ltx_ref" title="Figure 6 ‣ 6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6</a> provides the full set of confirmed and pending cases organized by pathology type.



<figure id="S6.F6" class="ltx_figure">
<img src="2606.14249v1/9_cases.png" id="S6.F6.g1" class="ltx_graphics ltx_centering ltx_img_portrait" style="aspect-ratio:333/438;" width="333" height="438" alt="Refer to caption" />
<figcaption>Figure 6: Failure cases organized by pathology (rows: reward hacking, catastrophic forgetting, under-exploration).</figcaption>
</figure>



#### Reward hacking (GAIA, Sonnet 4.6, R10).



At R10, the pipeline shipped a composite edit (tool + prompt + configuration) whose manifest predicted improved retrieval. The edit passed the seesaw constraint and raised accuracy from 74.8% to 79.6%. Trace analysis at R11 revealed that the tool genuinely fixed retrieval for most newly passing tasks, but a subset passed by exploiting format regularities in the verifier rather than performing actual retrieval. The Planner flagged this pathway at R12, and the resulting edit introduced a guard restricting the tool to tasks whose output could be cross-checked against a second retrieval path.







#### Catastrophic forgetting ($`\tau^{3}`$-Bench, Sonnet 4.6, Telecom, R7).



Evolution on Telecom shipped same-type prompt/processor edits across five consecutive rounds (R2–R6), each appending a “reminder” rule. Compliance rose from 89.5% to 100% at R4, then regressed to 94.7% by R6 as later rules conflicted with earlier ones. The R7 Critic flagged the concentration risk (“All 5 prior ships occupy the same bucket: \[prompt, processor\]”) but still approved the edit for shipping because ship-prediction accuracy remained high (R2–R6: 23/24, 5/6, 4/5, 7/7, 2/3) and no regressions were recorded. The sixth reminder degraded compliance from 94.7% to 80.7% ($`-`$<!-- -->14.0%) via cross-rule conflicts that destabilized previously passing tasks. This regression evaded the seesaw constraint because pass@2 registers only per-task binary flips, not sub-threshold coupling. The pipeline self-corrected by R9 once the Planner diagnosed the concentration pattern and proposed a structural edit that replaced the conflicting reminder stack.







#### Under-exploration (ALFWorld, Sonnet 4.6, R4–R7).



Between R4 and R7, the pipeline shipped predominantly prompt-level edits, yielding $`<`$<!-- -->1% gain per round. Ship-prediction accuracy (the fraction of manifest-predicted task flips that materialize) dropped from 80% (R3) to 0% (R7), signaling prompt-space exhaustion. The sole structural edit in this window (a processor-level change at R6) achieved only 14% ship-prediction accuracy (1/7 predicted flips materialized), suggesting that the Planner lacked sufficient structural-edit history to calibrate hypotheses beyond the prompt neighborhood.







#### Summary.



All three pathologies predicted by the operational mirror appear in practice. The pipeline detected and mitigated reward hacking within two rounds (R10–R12). Decaying ship-prediction accuracy diagnosed under-exploration (R4–R7). The catastrophic-forgetting case exposes a structural limitation of per-edit gating: sub-threshold coupling accumulates undetected until it exceeds the per-task detection threshold (Telecom R7). On $`\tau^{3}`$-Bench Telecom, the pipeline self-corrected (R8–R9) because the failure was localized to one domain; on GAIA (GPT-5.4), the same mechanism produces sustained stagnation ($`\Delta{=}0.0`$) because conflicting edits prevent any net gain. Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a> shows that variant isolation resolves this by confining edits to task-specific clusters.











## 7 Discussion



### 7.1 Why Compositional Structure Matters for Evolution



As Table <a href="#S6.T5" class="ltx_ref" title="Table 5 ‣ 6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5</a> shows, the Global strategy (used in all main experiments) peaks early at 73.8% (R4) on GAIA before collapsing to 49.5% (peak–final gap: $`-`$<!-- -->24.3%). Global uses HarnessX’s typed components but does not leverage them for isolation; every edit is evaluated against all tasks jointly. Under pass@2, a task whose success probability has degraded can still register as “solved,” so sub-threshold regressions evade the seesaw constraint. Preventing this collapse requires variant isolation, which composability enables: HarnessX’s compositional structure makes the *intended scope* of each edit explicit, a precondition for variant isolation to confine each edit’s evaluation to its target cluster rather than evaluating against the full task set indiscriminately (Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>).





The relationship parallels type systems: types do not generate correct programs, but they make incorrect programs *detectable*. Analogously, typed components do not prevent bad edits, but make their scope *explicit*, enabling independent variation. The strategy comparison suggests that variant isolation is necessary for stable evolution (Global, which lacks it, degrades after peaking); without compositional structure, the intended scope of an edit is undefined, making variant isolation ill-posed. Compositional structure does not, however, guarantee bounded behavioral effects: the $`\tau^{3}`$-Bench Telecom failure demonstrates that accumulated same-type edits can induce sub-threshold coupling that degrades multiple dialogue patterns simultaneously.







### 7.2 The Role of Trace Richness



HarnessX’s full execution trace $`\tau`$ provides diagnostic information beyond a scalar reward. The case studies (Section <a href="#S6.SS6" class="ltx_ref" title="6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6</a>) confirm this: detecting reward hacking on GAIA (shipped at R10, detected at R11) required inspecting *how* improvement occurred (format exploitation vs. genuine retrieval), and detecting under-exploration on ALFWorld (R4–R7) required tracking edit-type distribution and ship-prediction accuracy. Neither signal is recoverable from per-task binary outcomes alone.





These observations motivate a design principle: the richness of the feedback signal bounds the sophistication of evolution that can be safely performed. From scalar reward alone, none of the three pathologies is detectable: a score change cannot distinguish reward hacking from genuine improvement, under-exploration from convergence, or catastrophic forgetting from evaluation noise. Trace structure makes each pathology diagnosable, provided prior-round traces exist for comparison. The $`\tau^{3}`$-Bench Telecom failure illustrates the boundary: despite five rounds of prior traces (R2–R6), accumulated regressions evaded the seesaw constraint because no individual edit crossed the detection threshold. Structured trace recording is therefore necessary for detecting pathologies, but not sufficient for preventing them: when coupling accumulates below the per-task detection threshold, traces record the symptoms only after damage has occurred.







### 7.3 Scope and Limits of the Operational Mirror



The RL–symbolic-space mirror is a design heuristic, not a formal framework. Classical RL convergence guarantees require sufficient exploration of the state–action space, a condition unattainable when states are symbolic harness configurations and actions are open-ended code edits. Under the Global strategy, GAIA (GPT-5.4) stagnates entirely ($`\Delta{=}0.0`$ over 15 rounds); the variant-isolation ablation (Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>) recovers stable improvement (87.4% final = peak), but nothing guarantees this extends to longer horizons (where variants may over-specialize) or to task distributions whose inter-task dependencies prevent clean variant separation. The mirror also does not predict which pathology will dominate: on $`\tau^{3}`$-Bench Telecom, catastrophic forgetting surfaced at R7; on ALFWorld, under-exploration dominated R4–R7; on GAIA, reward hacking surfaced only at R10.





We therefore treat the mirror as a design checklist rather than a predictive theory: it identifies failure modes to defend against but does not predict their ordering, timing, or relative severity. The three pathologies are representative, not exhaustive; additional RL phenomena (e.g., distribution shift when the adaptation batch diverges from deployment tasks, reward sparsity on hard benchmarks) may manifest as analogous failure modes in symbolic space.







### 7.4 Generalization Across Model Families



On ALFWorld, the Opus 4.6 meta-agent evolves harnesses for task agents from three model families:

- •
  

  Sonnet 4.6 (same family): 83.6% $`\to`$ 94.8% (+11.2%)

  
- •
  

  GPT-5.4 (different family): 76.9% $`\to`$ 97.8% (+20.9%)

  
- •
  

  Qwen3.5-9B (different family, weaker): 53.0% $`\to`$ 97.0% (+44.0%)

  

The inverse-scaling effect (Section <a href="#S6.SS2" class="ltx_ref" title="6.2 Main Results ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.2</a>) explains the magnitude ordering: gains track inverse baseline performance (Qwen $`>`$ GPT $`>`$ Sonnet) rather than proximity to the meta-agent’s model family. All three configurations hold the meta-agent fixed (Opus 4.6) while varying the task agent; we do not evaluate whether a weaker meta-agent can achieve comparable gains.





A complementary ablation (Section <a href="#S6.SS4" class="ltx_ref" title="6.4 Meta-Agent Effectiveness ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.4</a>) finds that a single-agent evolver achieves comparable accuracy to the four-stage AEGIS pipeline (86.4% vs. 87.4%, within sampling noise at $`n{=}103`$) when both share the same meta-agent model and infrastructure. This suggests that at this meta-agent capability level, the four-stage decomposition primarily provides efficiency gains ($`{\sim}`$<!-- -->12% fewer tokens) and auditability rather than measurable accuracy improvement.







### 7.5 Cost-Performance Tradeoffs



As Table <a href="#S7.T7" class="ltx_ref" title="Table 7 ‣ 7.5 Cost-Performance Tradeoffs ‣ 7 Discussion ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7</a> details, evolution incurs upfront compute that amortizes over subsequent task invocations.



<figure id="S7.T7" class="ltx_table">
<table id="S7.T7.6" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S7.T7.6.1" class="ltx_tr">
<th id="S7.T7.6.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt">Experiment</th>
<th id="S7.T7.6.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_th_row ltx_border_tt">Rounds</th>
<th id="S7.T7.6.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Total Tokens</th>
<th id="S7.T7.6.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Gain</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S7.T7.6.2" class="ltx_tr">
<th id="S7.T7.6.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">GAIA, GPT-5.4 (Global)</th>
<th id="S7.T7.6.2.2" class="ltx_td ltx_align_center ltx_th ltx_th_row ltx_border_t">15</th>
<td id="S7.T7.6.2.3" class="ltx_td ltx_align_center ltx_border_t">143.7M</td>
<td id="S7.T7.6.2.4" class="ltx_td ltx_align_center ltx_border_t">0.0% (peak = initial)</td>
</tr>
<tr id="S7.T7.6.3" class="ltx_tr">
<th id="S7.T7.6.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">GAIA, GPT-5.4 (Variant isolation, ablation)</th>
<th id="S7.T7.6.3.2" class="ltx_td ltx_align_center ltx_th ltx_th_row">15</th>
<td id="S7.T7.6.3.3" class="ltx_td ltx_align_center">107.8M</td>
<td id="S7.T7.6.3.4" class="ltx_td ltx_align_center">+13.6%</td>
</tr>
<tr id="S7.T7.6.4" class="ltx_tr">
<th id="S7.T7.6.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb">ALFWorld, Sonnet 4.6 (Global)</th>
<th id="S7.T7.6.4.2" class="ltx_td ltx_align_center ltx_th ltx_th_row ltx_border_bb">7</th>
<td id="S7.T7.6.4.3" class="ltx_td ltx_align_center ltx_border_bb">43.4M</td>
<td id="S7.T7.6.4.4" class="ltx_td ltx_align_center ltx_border_bb">+11.2%</td>
</tr>
</tbody>
</table>
<figcaption>Table 7: Evolution cost summary. All main experiments use the Global (single-harness) strategy; the variant-isolation row is from the strategy ablation (Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>).</figcaption>
</figure>



The strategy ablation (Section <a href="#S6.SS3" class="ltx_ref" title="6.3 Evolution Strategy Comparison ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.3</a>) shows that variant isolation is both more effective (87.4% vs. 49.5% final) and more efficient (107.8M vs. 143.7M tokens) than Global on GAIA. The token reduction has two sources: (1) structurally, each edit under variant isolation is evaluated only against its target cluster rather than the full task set, reducing per-round evaluation cost; (2) under Global, the steadily degrading baseline causes more candidates to fail gating, wasting tokens on candidates that never ship. On benchmarks where evolution converges quickly (ALFWorld R4–R7, SWE-bench R2–R3), Global suffices and degradation does not materialize within the run horizon.





The evolved harness also affects per-task inference cost. On GAIA, per-task token consumption drops by $`{\sim}`$<!-- -->25% (targeted tool selection shortens trajectories); on ALFWorld, it rises by $`{\sim}`$<!-- -->60% (task-decomposition prompts lengthen execution).





At deployment, the evolved harness is a static artifact requiring no meta-agent inference; tasks outside the evolution set are routed to the variant with the highest overall success rate on the evolution set. On GAIA, the upfront 107.8M tokens amortize within $`{\sim}`$<!-- -->1,300 invocations ($`{\sim}`$<!-- -->83K tokens saved per invocation). On ALFWorld, per-task cost increases; the return is accuracy (+11.2%), not cost reduction.







### 7.6 Ethical Considerations



Self-evolving agent systems require explicit oversight. HarnessX provides three mechanisms:

1.  1.
    

    Auditability: every shipped edit carries a manifest and a rollback target; rejected candidates are archived with rejection reasons.

    
2.  2.
    

    Deterministic gating: the seesaw constraint rejects any edit that regresses even a single previously solved task under pass@2.

    
3.  3.
    

    Human-in-the-loop: the gating layer supports human approval for edits exceeding a configurable risk threshold (not exercised in our automated experiments).

    

The $`\tau^{3}`$-Bench failure (Section <a href="#S6.SS6" class="ltx_ref" title="6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6</a>) illustrates their limits: five consecutive same-type edits (R2–R6) accumulated sub-threshold coupling undetected by the seesaw constraint; the sixth edit (R7) triggered a visible $`-`$<!-- -->14.0% regression, yet no individual edit violated the constraint. This is a structural limitation of per-edit gating: sub-threshold regressions accumulate undetected regardless of how many prior rounds have demonstrated apparent stability under the same constraint.







### 7.7 Limitations



Beyond the limitations noted above, five additional constraints bound the generality of our results:

- •
  

  No held-out evaluation. All reported gains are measured on the same task set used for evolution. Since we report peak accuracy and evaluate on the adaptation set itself, the numbers carry both selection bias and potential overfitting. Generalization to unseen tasks within the same distribution is plausible but untested.

  
- •
  

  Discrete action spaces only. All experiments use agents with discrete, text-based action spaces. We have not tested whether the framework extends to continuous action spaces (e.g., robotic control).

  
- •
  

  Closed-source meta-agent. AEGIS requires a meta-agent capable of multi-file code generation, structured trace analysis, and multi-step planning. Open-weight models approaching this capability level (e.g., Qwen3.5-72B, Llama-4-Maverick) remain untested as meta-agents.

  
- •
  

  Joint control assumption. Co-evolution requires joint control over both harness evolution and model training. In practice, these concerns are often separated across teams or organizations, making a shared replay buffer (Section <a href="#S5.SS1" class="ltx_ref" title="5.1 The Co-evolution Iteration ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">5.1</a>) impractical without cross-team coordination.

  
- •
  

  Benchmark coverage. All SWE-bench Verified runs use a 55-task subsample, and $`\tau^{3}`$-Bench evaluates only three domains (Retail, Airline, Telecom). Conclusions, particularly the inverse-scaling effect, may not generalize to domains with different task heterogeneity or to larger evaluation sets.

  









## 8 Conclusion



We present HarnessX, a composable runtime foundry that treats the harness as a first-class interface between model and environment. This interface can be composed from typed primitives, evolved from execution traces, and coupled with model training in a unified improvement loop. Across five benchmarks and three model families, HarnessX achieves gains up to $`+44.0`$% (average $`+14.5`$% across 15 configurations) through trace-driven evolution over a compositional substrate, with co-evolution adding +4.7% beyond harness-only evolution on two benchmarks. These results suggest that agent progress need not rely on model scaling alone: composing and evolving the runtime interface from execution feedback is a complementary and actionable lever, particularly for capability-limited agents where harness-level gains are largest.











## References

- \[1\] Anthropic (2025)  Claude code.  Note: <a href="https://github.com/anthropics/claude-code" class="ltx_ref ltx_url ltx_font_typewriter">https://github.com/anthropics/claude-code</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>, <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[2\] Anthropic (2026)  Introducing dynamic workflows in claude code.  Note: <a href="https://claude.com/blog/introducing-dynamic-workflows-in-claude-code" class="ltx_ref ltx_url ltx_font_typewriter">https://claude.com/blog/introducing-dynamic-workflows-in-claude-code</a>  Cited by: <a href="#S2.SS1.p5.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[3\] Anysphere (2023)  Cursor.  Note: <a href="https://www.cursor.com" class="ltx_ref ltx_url ltx_font_typewriter">https://www.cursor.com</a>  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[4\] ByteDance (2025)  DeerFlow.  Note: <a href="https://github.com/bytedance/deer-flow" class="ltx_ref ltx_url ltx_font_typewriter">https://github.com/bytedance/deer-flow</a>  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[5\] DeepSeek-AI (2026)  DeepSeek-v4: towards highly efficient million-token context intelligence.  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[6\] J. Feng, S. Huang, X. Qu, G. Zhang, Y. Qin, B. Zhong, C. Jiang, J. Chi, and W. Zhong (2025)  Retool: reinforcement learning for strategic tool use in llms.  arXiv preprint arXiv:2504.11536.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[7\] C. Fernando, D. S. Banarse, H. Michalewski, S. Osindero, and T. Rocktäschel (2024)  Promptbreeder: self-referential self-improvement via prompt evolution.  In International Conference on Machine Learning,  pp. 13481–13544.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[8\] GLM-5-Team (2026)  GLM-5: from vibe coding to agentic engineering.  External Links: 2602.15763, <a href="https://arxiv.org/abs/2602.15763" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[9\] D. Guo, D. Yang, H. Zhang, J. Song, P. Wang, Q. Zhu, R. Xu, R. Zhang, S. Ma, X. Bi, et al. (2025)  Deepseek-r1: incentivizing reasoning capability in llms via reinforcement learning.  arXiv preprint arXiv:2501.12948.  Cited by: <a href="#S4.SS2.SSS0.Px1.p1.1" class="ltx_ref" title="Reward hacking. ‣ 4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§4.2</a>, <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§4.2</a>. 
- \[10\] Q. Guo, R. Wang, J. Guo, B. Li, K. Song, X. Tan, G. Liu, J. Bian, and Y. Yang (2024)  Connecting large language models with evolutionary algorithms yields powerful prompt optimizers.  In International Conference on Learning Representations,  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[11\] S. Hu, C. Lu, and J. Clune (2025)  Automated design of agentic systems.  In International Conference on Learning Representations,  Cited by: <a href="#S2.SS2.p3.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[12\] C. E. Jimenez, J. Yang, A. Wettig, S. Yao, K. Pei, O. Press, and K. Narasimhan (2024)  Swe-bench: can language models resolve real-world github issues?.  In International Conference on Learning Representations,  Cited by: <a href="#S9.SS1.SSS0.Px5.p1.1" class="ltx_ref" title="SWE-bench Verified. ‣ 9.1 Benchmarks ‣ 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§9.1</a>. 
- \[13\] O. Khattab, A. Singhvi, P. Maheshwari, Z. Zhang, K. Santhanam, S. Vardhamanan, S. Haq, A. Sharma, T. T. Joshi, H. Moazam, et al. (2023)  Dspy: compiling declarative language model calls into self-improving pipelines.  arXiv preprint arXiv:2310.03714.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[14\] J. Kirkpatrick, R. Pascanu, N. Rabinowitz, J. Veness, G. Desjardins, A. A. Rusu, K. Milan, J. Quan, T. Ramalho, A. Grabska-Barwinska, et al. (2017)  Overcoming catastrophic forgetting in neural networks.  Proceedings of the national academy of sciences 114 (13), pp. 3521–3526.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>, <a href="#S4.SS2.SSS0.Px2.p1.1" class="ltx_ref" title="Catastrophic forgetting. ‣ 4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§4.2</a>, <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§4.2</a>. 
- \[15\] P. Ladosz, L. Weng, M. Kim, and H. Oh (2022)  Exploration in deep reinforcement learning: a survey.  Information Fusion 85, pp. 1–22.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>, <a href="#S4.SS2.SSS0.Px3.p1.1" class="ltx_ref" title="Under-exploration. ‣ 4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§4.2</a>, <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Pathologies in Symbolic Space ‣ 4 Harness Adaptation ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§4.2</a>. 
- \[16\] LangChain AI (2024)  LangGraph.  Note: <a href="https://github.com/langchain-ai/langgraph" class="ltx_ref ltx_url ltx_font_typewriter">https://github.com/langchain-ai/langgraph</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[17\]  (2022)  LangChain.  Note: <a href="https://github.com/langchain-ai/langchain" class="ltx_ref ltx_url ltx_font_typewriter">https://github.com/langchain-ai/langchain</a>  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[18\] R. T. Lange, Y. Tang, and Y. Tian (2025)  The Darwin Gödel Machine: open-ended evolution of self-improving agents.  arXiv preprint arXiv:2505.22535.  Cited by: <a href="#S2.SS2.p4.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[19\] Y. Lee, R. Nair, Q. Zhang, K. Lee, O. Khattab, and C. Finn (2026)  Meta-harness: end-to-end optimization of model harnesses.  arXiv preprint arXiv:2603.28052.  Cited by: <a href="#S2.SS2.p4.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[20\] J. Li, X. Xiao, Y. Zhang, C. Liu, L. Zhao, X. Liao, Y. Ji, J. Wang, J. Gu, Y. Ge, et al. (2026)  Agent harness engineering: a survey.  arXiv preprint.  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[21\] Y. Li, L. Li, Z. Wu, Q. Liao, J. Hao, K. Shao, and F. Xu (2026)  AgentSwift: efficient llm agent design via value-guided hierarchical search.  In Proceedings of the AAAI Conference on Artificial Intelligence,  Vol. 40, pp. 31843–31851.  Cited by: <a href="#S2.SS2.p3.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[22\] J. Lin, S. Liu, C. Pan, L. Lin, S. Dou, X. Huang, H. Yan, Z. Han, and T. Gui (2026)  Agentic harness engineering: observability-driven automatic evolution of coding-agent harnesses.  arXiv preprint arXiv:2604.25850.  Cited by: <a href="#S2.SS2.p4.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[23\] LlamaIndex  External Links: <a href="https://dx.doi.org/10.5281/zenodo.1234" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="https://github.com/jerryjliu/llama_index" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[24\] S. Lu, K. Yu, S. Jiang, Y. Xu, B. Zhan, Y. Wang, C. Ke, Y. Xu, X. Xiong, X. Zhou, et al. (2026)  OpenClaw research: a systematic survey of large language model agents in open deployment.  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[25\] G. Mialon, C. Fourrier, T. Wolf, Y. LeCun, and T. Scialom (2024)  Gaia: a benchmark for general ai assistants.  In International Conference on Learning Representations,  Cited by: <a href="#S9.SS1.SSS0.Px1.p1.1" class="ltx_ref" title="GAIA. ‣ 9.1 Benchmarks ‣ 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§9.1</a>. 
- \[26\] J. Moura (2025)  CrewAI: framework for orchestrating role-playing autonomous ai agents.  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[27\] K. Opsahl-Ong, M. J. Ryan, J. Purtell, D. Broman, C. Potts, M. Zaharia, and O. Khattab (2024)  Optimizing instructions and demonstrations for multi-stage language model programs.  In Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing,  pp. 9340–9366.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[28\] C. Packer, V. Fang, S. G. Patil, K. Lin, S. Wooders, and J. E. Gonzalez (2023)  MemGPT: towards llms as operating systems..  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[29\] R. Pryzant, D. Iter, J. Li, Y. Lee, C. Zhu, and M. Zeng (2023)  Automatic prompt optimization with “gradient descent” and beam search.  In Proceedings of the 2023 conference on empirical methods in natural language processing,  pp. 7957–7968.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[30\] J. Qiao, W. Meng, Y. Cheng, Z. Lin, Z. Zhang, X. Tan, J. Gong, K. Shao, and Y. Xie (2026)  Memory intelligence agent.  arXiv preprint arXiv:2604.04503.  Cited by: <a href="#S2.SS2.p2.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[31\] M. Robeyns, M. Szummer, and L. Aitchison (2025)  A self-improving coding agent.  arXiv preprint arXiv:2504.15228.  Cited by: <a href="#S2.SS2.p4.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>, <a href="#S6.SS1.SSS0.Px3.p1.1" class="ltx_ref" title="Baselines. ‣ 6.1 Experimental Setup ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§6.1</a>. 
- \[32\] A. Roucher, A. V. del Moral, T. Wolf, L. von Werra, and E. Kaunismäki (2025)  ‘Smolagents‘: a smol library to build great agentic systems..  Note: <a href="https://github.com/huggingface/smolagents" class="ltx_ref ltx_url ltx_font_typewriter">https://github.com/huggingface/smolagents</a>  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[33\] Z. Shao, P. Wang, Q. Zhu, R. Xu, J. Song, X. Bi, H. Zhang, M. Zhang, Y. Li, Y. Wu, et al. (2024)  Deepseekmath: pushing the limits of mathematical reasoning in open language models.  arXiv preprint arXiv:2402.03300.  Cited by: <a href="#S5.SS3.p1.1" class="ltx_ref" title="5.3 Model Training via Cross-Harness GRPO ‣ 5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§5.3</a>. 
- \[34\] M. Shen, Y. Li, L. Chen, Z. Fan, Y. Li, and Q. Yang (2025)  From mind to machine: the rise of manus ai as a fully autonomous digital agent.  arXiv preprint arXiv:2505.02024.  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[35\] M. Shridhar, X. Yuan, M. Côté, Y. Bisk, A. Trischler, and M. Hausknecht (2020)  Alfworld: aligning text and embodied environments for interactive learning.  arXiv preprint arXiv:2010.03768.  Cited by: <a href="#S9.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="ALFWorld. ‣ 9.1 Benchmarks ‣ 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§9.1</a>. 
- \[36\] G. Team, R. Anil, S. Borgeaud, J. Alayrac, J. Yu, R. Soricut, J. Schalkwyk, A. M. Dai, A. Hauth, K. Millican, et al. (2023)  Gemini: a family of highly capable multimodal models.  arXiv preprint arXiv:2312.11805.  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[37\] Y. Wang, S. Liu, J. Fang, and Z. Meng (2025)  Evoagentx: an automated framework for evolving agentic workflows.  In Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing: System Demonstrations,  pp. 643–655.  Cited by: <a href="#S2.SS2.p3.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[38\] J. Weng (2026)  Learning beyond gradients.  Note: <a href="https://trinkle23897.github.io/learning-beyond-gradients/" class="ltx_ref ltx_url ltx_font_typewriter">https://trinkle23897.github.io/learning-beyond-gradients/</a>Blog post  Cited by: <a href="#S2.SS2.p5.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[39\] Q. Wu, G. Bansal, J. Zhang, Y. Wu, B. Li, E. Zhu, L. Jiang, X. Zhang, S. Zhang, J. Liu, et al. (2024)  Autogen: enabling next-gen llm applications via multi-agent conversations.  In First conference on language modeling,  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.1</a>. 
- \[40\] Z. Wu, D. Mo, H. Lu, J. Xing, J. Liu, Y. Jing, K. Li, K. Shao, J. Hao, and Y. Shi (2026)  Kˆ 2-agent: co-evolving know-what and know-how for hierarchical mobile device control.  arXiv preprint arXiv:2603.00676.  Cited by: <a href="#S5.p2.1" class="ltx_ref" title="5 Harness-Model Co-Evolution ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§5</a>. 
- \[41\] T. Xu, H. Wen, and M. Li (2026)  Adapting the interface, not the model: runtime harness adaptation for deterministic llm agents.  arXiv preprint arXiv:2605.22166.  Cited by: <a href="#S2.SS2.p4.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[42\] A. Yang, A. Li, B. Yang, B. Zhang, B. Hui, B. Zheng, B. Yu, C. Gao, C. Huang, C. Lv, et al. (2025)  Qwen3 technical report.  arXiv preprint arXiv:2505.09388.  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[43\] C. Yang, X. Wang, Y. Lu, H. Liu, Q. V. Le, D. Zhou, and X. Chen (2024)  Large language models as optimizers.  In International Conference on Learning Representations,  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[44\] S. Yao, H. Chen, J. Yang, and K. Narasimhan (2022)  Webshop: towards scalable real-world web interaction with grounded language agents.  Advances in Neural Information Processing Systems 35, pp. 20744–20757.  Cited by: <a href="#S9.SS1.SSS0.Px3.p1.1" class="ltx_ref" title="WebShop. ‣ 9.1 Benchmarks ‣ 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§9.1</a>. 
- \[45\] S. Yao, N. Shinn, P. Razavi, and K. Narasimhan (2024)  Tau-bench: a benchmark for tool-agent-user interaction in real-world domains.  arXiv preprint arXiv:2406.12045.  Cited by: <a href="#S9.SS1.SSS0.Px4.p1.1" class="ltx_ref" title="𝜏^3-Bench. ‣ 9.1 Benchmarks ‣ 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§9.1</a>. 
- \[46\] M. Yuksekgonul, F. Bianchi, J. Boen, S. Liu, Z. Huang, C. Guestrin, and J. Zou (2024)  Textgrad: automatic" differentiation" via text.  arXiv preprint arXiv:2406.07496.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[47\] J. Zhang, B. Zhao, W. Yang, J. Foerster, J. Clune, M. Jiang, S. Devlin, and T. Shavrina (2026)  Hyperagents.  arXiv preprint arXiv:2603.19461.  Cited by: <a href="#S2.SS2.p4.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[48\] J. Zhang, J. Xiang, Z. Yu, F. Teng, X. Chen, J. Chen, M. Zhuge, X. Cheng, S. Hong, J. Wang, et al. (2025)  Aflow: automating agentic workflow generation.  In International Conference on Learning Representations,  Cited by: <a href="#S2.SS2.p3.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[49\] M. Zhao, X. Wei, Y. Shao, K. Zhou, L. Yang, S. Rao, J. Zhan, and Z. Chen (2026)  A$`{}^{2}`$flow: automating agentic workflow generation via self-adaptive abstraction operators.  In Proceedings of the AAAI Conference on Artificial Intelligence,  Vol. 40, pp. 29930–29938.  Cited by: <a href="#S2.SS2.p3.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[50\] H. Zhou, Y. Chen, S. Guo, X. Yan, K. H. Lee, Z. Wang, K. Y. Lee, G. Zhang, K. Shao, L. Yang, et al. (2025)  Memento: fine-tuning llm agents without fine-tuning llms.  arXiv preprint arXiv:2508.16153.  Cited by: <a href="#S2.SS2.p2.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[51\] Y. Zhou, Q. Yang, K. Lin, M. Bai, X. Zhou, Y. Wang, S. Levine, and L. E. Li (2025)  Proposer-agent-evaluator (pae): autonomous skill discovery for foundation model internet agents.  In Forty-second International Conference on Machine Learning,  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§1</a>. 
- \[52\] Y. Zhou, A. I. Muresanu, Z. Han, K. Paster, S. Pitis, H. Chan, and J. Ba (2023)  Large language models are human-level prompt engineers.  In The Eleventh International Conference on Learning Representations,  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[53\] Z. Zhou, Z. Liu, J. Liu, Q. Shao, Y. Wang, K. Shao, D. Jin, and F. Xu (2026)  ResMAS: resilience optimization in llm-based multi-agent systems.  In Proceedings of the AAAI Conference on Artificial Intelligence,  Cited by: <a href="#S2.SS2.p3.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 
- \[54\] M. Zhuge, W. Wang, L. Kirsch, F. Faccio, D. Khizbullin, and J. Schmidhuber (2024)  Gptswarm: language agents as optimizable graphs.  In Forty-first International Conference on Machine Learning,  Cited by: <a href="#S2.SS2.p3.1" class="ltx_ref" title="2.2 Self-Evolving Agents ‣ 2 Related Work ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">§2.2</a>. 









## Contributions and Acknowledgments





\xiaomievblue

Core Contributors

- •
  

  Tingyang Chen\*

  
- •
  

  Shuo Lu\*

  
- •
  

  Kang Zhao\*

  
- •
  

  Weicheng Meng

  
- •
  

  Kun Shao<sup>†</sup>

  
- •
  

  Jian Luan<sup>†</sup>

  









\xiaomievblue

Contributors

- •
  

  Hanlin Teng

  
- •
  

  Tianhao Li

  
- •
  

  Chao Li

  
- •
  

  Xule Liu

  
- •
  

  Jian Liang

  
- •
  

  Zhizhong Zhang

  
- •
  

  Yuan Xie

  
- •
  

  Heng Qu

  





<sup>†</sup><sup>†</sup>footnotetext: \* Equal Contribution  <sup>†</sup> Corresponding Author







\beginappendix







## 9 Experimental Setup: Full Details



This appendix expands the condensed setup of Section <a href="#S6.SS1" class="ltx_ref" title="6.1 Experimental Setup ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.1</a> with the full benchmark descriptions, the formal metric definitions, the evolution protocol hyperparameters, and the runtime infrastructure.





### 9.1 Benchmarks



We evaluate on five benchmarks chosen to span the failure modes that harness design most affects, from short-horizon embodied planning to long-horizon software engineering.





#### GAIA.



The GAIA benchmark \[<a href="#bib.bib2" class="ltx_ref">25</a>\] poses real-world questions that are conceptually simple for humans but require an agent to compose multiple actions (web search, file extraction, multimodal interpretation, arithmetic) and evaluates via exact match against a reference answer. This benchmark stresses open-ended tool-based reasoning, where the harness dictates how evidence is collected and synthesized.







#### ALFWorld.



The ALFWorld benchmark \[<a href="#bib.bib3" class="ltx_ref">35</a>\] involves embodied instruction following where a text-based agent commands a simulated robotic agent in household settings. Given a natural-language goal (e.g., “Put a cooled apple in the microwave”), the agent navigates rooms, identifies objects, and manipulates them via textual actions; performance is measured by goal-completion rate. This benchmark stresses multi-step planning and grounded search under a tight step budget. We use the 134 tasks from the valid-unseen set, spanning six task types: pick-and-place, pick-two-and-place, look-at-in-light, and three transform-then-place variants (heat, cool, clean).







#### WebShop.



WebShop \[<a href="#bib.bib4" class="ltx_ref">44</a>\] is a web-interaction benchmark in which an agent acts as a customer in a simulated online store. Given a textual product description, the agent must search, browse product pages, select the best-matching item, and purchase it; scoring reflects how well the chosen product satisfies the request. We evaluate on 100 instances sampled with a fixed seed, each run as an independent shopping session.







#### $`\tau^{3}`$-Bench.



$`\tau^{3}`$-Bench \[<a href="#bib.bib5" class="ltx_ref">45</a>\] is a multi-turn dialogue benchmark in which the agent plays a customer-service assistant that must satisfy a user request while obeying an explicit domain policy. Performance is measured by rule compliance across the full conversation. The benchmark stresses dialogue-policy adherence: the harness must prevent the agent from agreeing to disallowed actions across many turns. For evaluation, we select three domains from the benchmark: Retail, Airline, and Telecom.







#### SWE-bench Verified.



SWE-bench Verified \[<a href="#bib.bib6" class="ltx_ref">12</a>\] is a human-validated subset of SWE-bench in which each task requires an agent to resolve a real GitHub issue by editing the corresponding repository so that the project’s hidden test suite passes. This benchmark stresses repository-level code editing: navigating a large codebase, localizing the relevant fault, implementing a patch, and avoiding regressions in existing tests. For evaluation, we sample a 55-task subset from SWE-bench Verified and measure performance by patch resolution.









### 9.2 Evaluation-Set Design



The sampled-task counts in Table <a href="#S6.T3" class="ltx_ref" title="Table 3 ‣ Benchmarks. ‣ 6.1 Experimental Setup ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">3</a> denote the fixed evaluation sets scored at each evolution round. GAIA uses a fixed 103-task set drawn across the three difficulty levels (39/52/12). ALFWorld uses all 134 tasks from the valid-unseen split. WebShop uses 100 tasks randomly sampled from the dataset with a fixed seed, with each task run as an independent shopping session. For $`\tau^{3}`$-Bench, we select three domains (Retail, Airline, and Telecom) and score the full task list within each selected domain. For software engineering, we use a 55-task subset sampled from SWE-bench Verified. The same evaluation set for each benchmark is re-scored at every round, so the curves in Appendix <a href="#S12" class="ltx_ref" title="12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12</a> measure round-over-round changes on fixed task sets rather than on moving samples.







### 9.3 Metric Definitions



#### Pass@$`k`$.



For a configuration evaluated on a task set $`D`$ with $`n`$ rollouts per task, let $`r_{i,j}\in\{0,1\}`$ denote the binary outcome of rollout $`j`$ on task $`i`$. Let $`c_{i}=\sum_{j=1}^{n}r_{i,j}`$ be the number of successful rollouts for task $`i`$. We report pass@$`k`$ using the standard unbiased estimator, i.e., the probability that at least one of $`k`$ sampled rollouts solves the task:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Pass@}k=\frac{1}{|D|}\sum_{i=1}^{|D|}\left(1-\frac{\binom{n-c_{i}}{k}}{\binom{n}{k}}\right).
``` |  | (6) |

All evolution curves use pass@2 as the primary metric: each task receives two independent rollouts and is solved if either succeeds. This reduces sensitivity to single-rollout stochasticity while preserving a strict task-level criterion. Rollouts terminated by infrastructure failures (sandbox crashes, API timeouts) count as failures rather than being excluded, keeping results comparable to official leaderboard protocols.









### 9.4 Evolution Protocol and Hyperparameters



The hyperparameters used in our evolutionary algorithm are detailed in Table <a href="#S9.T8" class="ltx_ref" title="Table 8 ‣ 9.4 Evolution Protocol and Hyperparameters ‣ 9 Experimental Setup: Full Details ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">8</a>. In round 0, the baseline is a competent composed harness augmented with the benchmark-specific tool registry, rather than a minimal default. The plots therefore show gains relative to a competent initial harness. The meta-agent is Opus 4.6 across all experiments; task agents vary: Sonnet 4.6, GPT-5.4, and Qwen3.5-9B. Per-task step limits are determined by the benchmark in question since the interaction length varies greatly among tasks.



<figure id="S9.T8" class="ltx_table">
<table id="S9.T8.5" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S9.T8.5.1" class="ltx_tr">
<th id="S9.T8.5.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Symbol</th>
<th id="S9.T8.5.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Meaning</th>
<th id="S9.T8.5.1.3" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Value</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S9.T8.5.2" class="ltx_tr">
<td id="S9.T8.5.2.1" class="ltx_td ltx_align_left ltx_border_t"><em>K</em><sub><em>t</em></sub></td>
<td id="S9.T8.5.2.2" class="ltx_td ltx_align_left ltx_border_t">candidates proposed per round</td>
<td id="S9.T8.5.2.3" class="ltx_td ltx_align_left ltx_border_t">4</td>
</tr>
<tr id="S9.T8.5.3" class="ltx_tr">
<td id="S9.T8.5.3.1" class="ltx_td ltx_align_left">seeds</td>
<td id="S9.T8.5.3.2" class="ltx_td ltx_align_left">random seeds per cell</td>
<td id="S9.T8.5.3.3" class="ltx_td ltx_align_left">3</td>
</tr>
<tr id="S9.T8.5.4" class="ltx_tr">
<td id="S9.T8.5.4.1" class="ltx_td ltx_align_left">noise threshold</td>
<td id="S9.T8.5.4.2" class="ltx_td ltx_align_left">ignored single-round pass-count delta</td>
<td id="S9.T8.5.4.3" class="ltx_td ltx_align_left">±5%</td>
</tr>
<tr id="S9.T8.5.5" class="ltx_tr">
<td id="S9.T8.5.5.1" class="ltx_td ltx_align_left">ℋ<sub>0</sub></td>
<td id="S9.T8.5.5.2" class="ltx_td ltx_align_left">round-0 harness</td>
<td id="S9.T8.5.5.3" class="ltx_td ltx_align_left">Handcrafted base harness</td>
</tr>
<tr id="S9.T8.5.6" class="ltx_tr">
<td id="S9.T8.5.6.1" class="ltx_td ltx_align_left">meta-agent</td>
<td id="S9.T8.5.6.2" class="ltx_td ltx_align_left">drives Digester / Planner / Evolver / Critic</td>
<td id="S9.T8.5.6.3" class="ltx_td ltx_align_left">Opus 4.6</td>
</tr>
<tr id="S9.T8.5.7" class="ltx_tr">
<td id="S9.T8.5.7.1" class="ltx_td ltx_align_left">task agent</td>
<td id="S9.T8.5.7.2" class="ltx_td ltx_align_left">model executing benchmark tasks</td>
<td id="S9.T8.5.7.3" class="ltx_td ltx_align_left">Sonnet 4.6; GPT-5.4; Qwen3.5-9B</td>
</tr>
<tr id="S9.T8.5.8" class="ltx_tr">
<td id="S9.T8.5.8.1" class="ltx_td ltx_align_left">concurrency</td>
<td id="S9.T8.5.8.2" class="ltx_td ltx_align_left">parallel task rollouts</td>
<td id="S9.T8.5.8.3" class="ltx_td ltx_align_left">10</td>
</tr>
<tr id="S9.T8.5.9" class="ltx_tr">
<td rowspan="5" id="S9.T8.5.9.1" class="ltx_td ltx_align_left ltx_border_bb ltx_border_t">max-steps</td>
<td id="S9.T8.5.9.2" class="ltx_td ltx_align_left ltx_border_t">GAIA</td>
<td id="S9.T8.5.9.3" class="ltx_td ltx_align_left ltx_border_t">20</td>
</tr>
<tr id="S9.T8.5.10" class="ltx_tr">
<td id="S9.T8.5.10.1" class="ltx_td ltx_align_left">WebShop</td>
<td id="S9.T8.5.10.2" class="ltx_td ltx_align_left">20</td>
</tr>
<tr id="S9.T8.5.11" class="ltx_tr">
<td id="S9.T8.5.11.1" class="ltx_td ltx_align_left">ALFWorld</td>
<td id="S9.T8.5.11.2" class="ltx_td ltx_align_left">15</td>
</tr>
<tr id="S9.T8.5.12" class="ltx_tr">
<td id="S9.T8.5.12.1" class="ltx_td ltx_align_left"><em>τ</em><sup>3</sup>-Bench</td>
<td id="S9.T8.5.12.2" class="ltx_td ltx_align_left">200</td>
</tr>
<tr id="S9.T8.5.13" class="ltx_tr">
<td id="S9.T8.5.13.1" class="ltx_td ltx_align_left ltx_border_bb">SWE-bench Verified</td>
<td id="S9.T8.5.13.2" class="ltx_td ltx_align_left ltx_border_bb">200</td>
</tr>
</tbody>
</table>
<figcaption>Table 8: Evolution-protocol hyperparameters.</figcaption>
</figure>





### 9.5 Runtime Infrastructure



Every rollout runs inside a fresh environment instance re-attached per task, so that side-effects (a WebShop cart, an ALFWorld world state, a shell working directory) cannot leak between tasks. The runtime records each rollout’s full trajectory (every model call, tool call, and environment observation) to the observability layer that the Digester subsequently compresses; the cross-round ledgers are aggregated from this log. Task rollouts execute at concurrency 10. The meta-agent runs at concurrency 4 with a 200-step limit per role. Co-evolution model training uses $`8\times`$ H100 GPUs with batch size 256 and learning rate $`1\times 10^{-6}`$.









## 10 Prompts and Harness Defaults



This appendix reproduces the prompts that drive the AEGIS outer loop and the Round-0 task-agent defaults. The blocks below are the literal contents of the corresponding files in the repository as of the commit that produced the experiments in Section <a href="#S6" class="ltx_ref" title="6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6</a>.





### 10.1 Meta-Agent Prompts







<a href="data:text/plain;base64,IyBQbGFubmVyIC0tIFJvdW5kIHt7IHJvdW5kIH19CgpZb3VyIGdvYWw6IHdyaXRlIGEgc2luZ2xlIGBsYW5kc2NhcGUubWRgIHRoYXQgc3ludGhlc2lzZXMgdGhpcyByb3VuZCdzIGV2aWRlbmNlCmludG8gYSBwaWN0dXJlIHRoZSBkb3duc3RyZWFtIEV2b2x2ZXIgY2FuIHVzZSB0byBmcmVlbHkgZXhwbG9yZSBldm9sdXRpb24KZGlyZWN0aW9ucy4gWW91IGFyZSB0aGUgY3Jvc3MtdHJhY2Ugc3ludGhlc2lzIGxheWVyIC0tIERpZ2VzdGVycyBwcm9kdWNlZApwZXItdGFzayBvdmVydmlld3M7IHlvdSB6b29tIG91dCBhbmQgc2F5IHdoYXQncyByZWFsbHkgZ29pbmcgb24uCgojIyBXaGF0IHRoZSBsYW5kc2NhcGUgc2hvdWxkIGNvbnZleQoKLSBSZWN1cnJpbmcgZmFpbHVyZSBtb2RlcyBhY3Jvc3MgdGhpcyByb3VuZCdzIGRpZ2VzdHMgLS0geW91ciBvd24gZ3JvdXBpbmcsIG5vdAogIGZvcmNlZCBieSBleGFjdC1zdHJpbmcgbWF0Y2hpbmcuCgotIFdoYXQgd2FzIHRyaWVkIGluIHByZXZpb3VzIHJvdW5kcyAoam91cm5hbC5tZCwgZGF0YS9zaGlwX291dGNvbWVzLmpzb24sCiAgZGF0YS9yZWplY3RlZF9jYW5kaWRhdGVzLmpzb25sLCBhcmNoaXZlLykgYW5kIHdoaWNoIG91dGNvbWVzIGhlbGQgdXAuCgotIFRhc2tzIHRoYXQgcGVyc2lzdGVudGx5IGZhaWxlZCBhY3Jvc3Mgcm91bmRzIChkYXRhL3Rhc2tfaGlzdG9yeS5qc29ubCkgYW5kCiAgdGhlb3JpZXMgYWJvdXQgdGhlbSB0aGF0IGhhdmUgTk9UIGJlZW4gdHJpZWQgeWV0LgoKLSBXaGV0aGVyIGxhc3Qgcm91bmQncyBzaGlwIGNhdXNlZCByZWdyZXNzaW9ucy4gUmVhZCBSe3sgcm91bmQgfX0vcmVncmVzc2lvbnMubWQKICBmaXJzdDogaXQgaXMgdGhlIGRldGVybWluaXN0aWMsIGstYXdhcmUgbGlzdCBvZiB0YXNrcyB3aG9zZSBwYXNzLXN0YXRlCiAgd29yc2VuZWQgdmVyc3VzIHRoZSBwcmV2aW91cyByb3VuZCwgd2l0aCB0aGUgam9pbnQtc3VzcGVjdCBzaGlwcyBmcm9tCiAgUnt7IHJvdW5kX21pbnVzXzEgfX0gYXR0YWNoZWQuIFRoZSBoaXQtcmF0ZSBpbiBzaGlwX291dGNvbWVzLmpzb24gb25seSBjb3VudHMKICBwcmVkaWN0ZWQtdGFzayBpbXByb3ZlbWVudHMsIHNvIGNvbGxhdGVyYWwgZGFtYWdlIG9uIHVuLXByZWRpY3RlZCB0YXNrcyBkb2VzCiAgTk9UIHNob3cgdXAgdGhlcmUgLS0gcmVncmVzc2lvbnMubWQgaXMgdGhlIG9ubHkgcGxhY2UgaXQgc3VyZmFjZXMuIElmIHRoZSBmaWxlCiAgbGlzdHMgcmVncmVzc2lvbnMsIHB1dCB0aGVtIGF0IHRoZSB0b3Agb2YgdGhlIGxhbmRzY2FwZSAoYSBkZWRpY2F0ZWQKICAiIyMgUmVncmVzc2lvbnMgdG8gYWRkcmVzcyIgc2VjdGlvbiksIG5hbWUgdGhlIHJlc3BvbnNpYmxlIHNoaXAncyBidWNrZXQocyksCiAgYW5kIGZsYWcgZWFjaCBpbiB1bmF0dGVtcHRlZF9kaXJlY3Rpb25zIHNvIHRoZSBFdm9sdmVyIHRyZWF0cyB0aGVtIGFzCiAgZmlyc3QtY2xhc3MgdGFyZ2V0cy4KCi0gV2hhdCB0aGUgcmVwdXRhdGlvbiBzaWduYWwgc2F5cyBhYm91dCB3aGljaCBtdXRhdGlvbiBsYXllcnMgaGF2ZSBoaXN0b3JpY2FsbHkKICB5aWVsZGVkIChwcm9wb3NlZCAtPiBzaGlwcGVkLCB3aW5kb3cpOiB7eyByZXB1dGF0aW9uX3N1bW1hcnkgfX0KCi0gV2hhdCBzY29yZWJvYXJkLmpzb24gYW5kIHNoaXBfb3V0Y29tZXMuanNvbiBzYXkgYWJvdXQgcGVyLWJ1Y2tldCBoaXQgcmF0ZXMuIElmCiAgb25lIGJ1Y2tldCBoYXMgc2hpcHBlZCAzKyByb3VuZHMgcnVubmluZyB3aXRoIGZsYXQgb3IgZGVjbGluaW5nIGhpdCByYXRlIHdoaWxlCiAgYW5vdGhlciBoYXMgbmV2ZXIgYmVlbiB0cmllZCBBTkQgdGhlIGRpZ2VzdHMgcG9pbnQgYXQgZmFpbHVyZXMgaXQgY291bGQKICBhZGRyZXNzLCBzYXkgc286IG5hbWUgdGhlIG5lZ2xlY3RlZCBidWNrZXQgYW5kIHRoZSBjbHVzdGVyIGl0IHdvdWxkIHRhcmdldC4KICBEbyBub3QgcHJlc2NyaWJlIFdISUNIIG11dGF0aW9uIHRvIHBpY2sgLS0gcG9pbnQgYXQgdGhlIGV2aWRlbmNlIGFuZCBsZXQgdGhlCiAgRXZvbHZlciBkZWNpZGUgdGhlIHNoYXBlLgoKeyUgaWYgcm91bmQgPj0gMiAlfS0gUHJpb3IgQ3JpdGljJ3Mgc3RyYXRlZ3lfY29uY2VybiwgaWYgYW55LiBSZWFkCiAgUnt7IHJvdW5kX21pbnVzXzEgfX0vZGVjaXNpb24ubWQ7IGlmIGl0cyBmcm9udG1hdHRlciBoYXMgYSBub24tZW1wdHkKICBzdHJhdGVneV9jb25jZXJuLCBzdXJmYWNlIGl0IGF0IHRoZSBUT1Agb2YgdGhlIGxhbmRzY2FwZSwgcXVvdGVkIHZlcmJhdGltLAogIHRoZW4gbm90ZSB3aGV0aGVyIHRoaXMgcm91bmQncyBldmlkZW5jZSBzdGlsbCBzdXBwb3J0cyBpdC4gVGhlIENyaXRpYyB3cml0ZXMKICBzdHJhdGVneV9jb25jZXJuIHRvIHJlYWNoIG5leHQgcm91bmQncyBFdm9sdmVyLCBidXQgdGhlIEV2b2x2ZXIgb25seSByZWFkcwogIGxhbmRzY2FwZS5tZCAtLSB5b3UgYXJlIHRoZSByZWxheS4KeyUgZW5kaWYgJX0KCkJlIGV2aWRlbmNlLWFuY2hvcmVkLiBXaGVuIHlvdSBzYXkgImJ1ZGdldCBleGhhdXN0aW9uIGtlZXBzIGhpdHRpbmcgWCB0YXNrcyIsCmNpdGUgc3BlY2lmaWMgZGlnZXN0cyAoZGlnZXN0cy88dGFza19pZD4ubWQpIG9yIHRyYWplY3RvcnkgYW5jaG9ycwoodHJhamVjdG9yaWVzLzx0YXNrPl9yMC5qc29ubCNzdGVwX04pLiBUaGUgRXZvbHZlciB3aWxsIHJlYWQgd2hhdCB5b3UgY2l0ZS4KCkJlIHNlbGVjdGl2ZSwgbm90IGV4aGF1c3RpdmUuIFRocmVlIGNvaGVyZW50IGRpcmVjdGlvbnMgLT4gbGlzdCB0aHJlZS4gT25lCm92ZXJ3aGVsbWluZyBzaWduYWwgLT4gc2F5IHNvLiBZb3VyIHJlYWRlciBkZWNpZGVzIGhvdyBtYW55IGNhbmRpZGF0ZXMgdG8gYnVpbGQ7Cml0IGJlbmVmaXRzIGZyb20gY2xhcml0eSwgbm90IHZvbHVtZS4KCiMjIFdoZXJlIGV2aWRlbmNlIGxpdmVzCgpSdW4gcm9vdCBoYXMgSU5ERVgubWQsIGEgY2F0YWxvZy4gVHlwaWNhbCBzb3VyY2VzOiBvdmVydmlldy5tZCAodGhpcyByb3VuZCdzCmRpZ2VzdHMgKyBwYXR0ZXJucyk7IGRpZ2VzdHMvPHRhc2tfaWQ+Lm1kIChwZXItdGFzayBhbmFseXNpcyB3aXRoIGFuY2hvcnMpOwpqb3VybmFsLm1kIChwcmlvciBtZW1vcyk7IGRhdGEvKi5qc29ubCBhbmQgZGF0YS9zaGlwX291dGNvbWVzLmpzb24gKGNyb3NzLXJvdW5kCmxlZGdlcnMpOyBhcmNoaXZlLyAobm9uLXNoaXBwZWQgbWFuaWZlc3RzKS4gTm8gcmVxdWlyZWQgcmVhZGluZyBsaXN0IC0tIHB1bGwKd2hhdCBzdXBwb3J0cyB0aGUgc3ludGhlc2lzLgoKIyMgT3V0cHV0CgpPbmUgZmlsZSB2aWEgYHdyaXRlX3Rvb2xgLiBUaGUgYm9keSBpcyBvcGVuLWVuZGVkIG1hcmtkb3duOyB0aGUgb25seSBzdHJ1Y3R1cmFsCmV4cGVjdGF0aW9uIGlzIGEgc2hvcnQgWUFNTCBmcm9udG1hdHRlciBzbyB0aGUgRXZvbHZlciBjYW4gZmluZCB5b3VyIGtleQpjb25jbHVzaW9uczoKCi0tLQpyb3VuZDoge3sgcm91bmQgfX0KdG9wX3RoZW1lczogICAgICAgICAgICAgICMgeW91ciBzeW50aGVzaXMsIGZyZWUtdGV4dCB0YWdzCiAgLSA8dGhlbWUtMT4KcGVyc2lzdGVudF9mYWlsdXJlczogICAgICMgdGFza19pZHMgZmFpbGVkIGFjcm9zcyA+PTIgcm91bmRzCiAgLSA8dGFza19pZD4KdW5hdHRlbXB0ZWRfZGlyZWN0aW9uczogICMgYXBwcm9hY2hlcyBub3QgdHJpZWQgeWV0IHBlciBzaGlwX291dGNvbWVzCiAgLSA8c2hvcnQgZGVzY3JpcHRpb24+Ci0tLQoKIyMgTGFuZHNjYXBlCjxPcGVuIG5hcnJhdGl2ZS4gRXZpZGVuY2UgY2l0YXRpb25zIHRocm91Z2hvdXQuPg==" download="">⬇</a>





\# Planner -- Round {{ round }}









Your goal: write a single \`landscape.md\` that synthesises this round's evidence





into a picture the downstream Evolver can use to freely explore evolution





directions. You are the cross-trace synthesis layer -- Digesters produced





per-task overviews; you zoom out and say what's really going on.









\## What the landscape should convey









- Recurring failure modes across this round's digests -- your own grouping, not





 forced by exact-string matching.









- What was tried in previous rounds (journal.md, data/ship_outcomes.json,





 data/rejected_candidates.jsonl, archive/) and which outcomes held up.









- Tasks that persistently failed across rounds (data/task_history.jsonl) and





 theories about them that have NOT been tried yet.









- Whether last round's ship caused regressions. Read R{{ round }}/regressions.md





 first: it is the deterministic, k-aware list of tasks whose pass-state





 worsened versus the previous round, with the joint-suspect ships from





 R{{ round_minus_1 }} attached. The hit-rate in ship_outcomes.json only counts





 predicted-task improvements, so collateral damage on un-predicted tasks does





 NOT show up there -- regressions.md is the only place it surfaces. If the file





 lists regressions, put them at the top of the landscape (a dedicated





 "## Regressions to address" section), name the responsible ship's bucket(s),





 and flag each in unattempted_directions so the Evolver treats them as





 first-class targets.









- What the reputation signal says about which mutation layers have historically





 yielded (proposed -\> shipped, window): {{ reputation_summary }}









- What scoreboard.json and ship_outcomes.json say about per-bucket hit rates. If





 one bucket has shipped 3+ rounds running with flat or declining hit rate while





 another has never been tried AND the digests point at failures it could





 address, say so: name the neglected bucket and the cluster it would target.





 Do not prescribe WHICH mutation to pick -- point at the evidence and let the





 Evolver decide the shape.









{% if round \>= 2 %}- Prior Critic's strategy_concern, if any. Read





 R{{ round_minus_1 }}/decision.md; if its frontmatter has a non-empty





 strategy_concern, surface it at the TOP of the landscape, quoted verbatim,





 then note whether this round's evidence still supports it. The Critic writes





 strategy_concern to reach next round's Evolver, but the Evolver only reads





 landscape.md -- you are the relay.





{% endif %}









Be evidence-anchored. When you say "budget exhaustion keeps hitting X tasks",





cite specific digests (digests/\<task_id\>.md) or trajectory anchors





(trajectories/\<task\>\_r0.jsonl\#step_N). The Evolver will read what you cite.









Be selective, not exhaustive. Three coherent directions -\> list three. One





overwhelming signal -\> say so. Your reader decides how many candidates to build;





it benefits from clarity, not volume.









\## Where evidence lives









Run root has INDEX.md, a catalog. Typical sources: overview.md (this round's





digests + patterns); digests/\<task_id\>.md (per-task analysis with anchors);





journal.md (prior memos); data/\*.jsonl and data/ship_outcomes.json (cross-round





ledgers); archive/ (non-shipped manifests). No required reading list -- pull





what supports the synthesis.









\## Output









One file via \`write_tool\`. The body is open-ended markdown; the only structural





expectation is a short YAML frontmatter so the Evolver can find your key





conclusions:









---





round: {{ round }}





top_themes: \# your synthesis, free-text tags





 - \<theme-1\>





persistent_failures: \# task_ids failed across \>=2 rounds





 - \<task_id\>





unattempted_directions: \# approaches not tried yet per ship_outcomes





 - \<short description\>





---









\## Landscape





\<Open narrative. Evidence citations throughout.\>













<a href="data:text/plain;base64,IyBFdm9sdmVyIC0tIFJvdW5kIHt7IHJvdW5kIH19CgpZb3VyIGdvYWw6IHByb2R1Y2UgY29uY3JldGUgZXZvbHV0aW9uIGNhbmRpZGF0ZXMgd2hvc2Ugc2hpcHBpbmcgd2lsbCByYWlzZSBuZXh0CnJvdW5kJ3MgYmVuY2htYXJrIHBhc3MgcmF0ZS4gWW91IGRlY2lkZSBob3cgbWFueSBjYW5kaWRhdGVzIChLID49IDEpIC0tIG9uZQpoaWdoLXZhbHVlIGNhbmRpZGF0ZSBiZWF0cyB0aHJlZSBzcGVjdWxhdGl2ZSBvbmVzLCBidXQgaWYgdHdvIGdlbnVpbmVseQpkaWZmZXJlbnQgZGlyZWN0aW9ucyBib3RoIGhhdmUgc3Ryb25nIGV2aWRlbmNlLCBwcm9kdWNlIGJvdGguIEV2ZXJ5IGNhbmRpZGF0ZQptdXN0IGJlIGV2aWRlbmNlLWRyaXZlbiB3aXRoIGNpdGF0aW9ucyB0byByYXcgdHJhY2VzIG9yIGRpZ2VzdHMuCgojIyBZb3VyIHN0YW5jZQoKVGhpcyByb2xlIGlzIHJlc2VhcmNoLCBub3QgbWFpbnRlbmFuY2UuIFlvdXIgdmFsdWUgaXMgaW4gY3JlYXRpdmUsIHJpZ29yb3VzLApicmVha3Rocm91Z2gtbGV2ZWwgdGhpbmtpbmcgLS0gbm90IGluIGl0ZXJhdGluZyBvbiB0aGUgYnVja2V0IHRoZSBwaXBlbGluZSBoYXMKc2hpcHBlZCBtb3N0IHJlY2VudGx5LiBXaGVuIGV2aWRlbmNlIHBvaW50cyB0byBhIHN0cnVjdHVyYWwgbGV2ZXIgdGhlIGhhcm5lc3MKaGFzIG5ldmVyIHRvdWNoZWQgLS0gYSBuZXcgdG9vbCwgYSBydW5sb29wIHBhcmFtZXRlciwgYSBkaWZmZXJlbnQgcHJvY2Vzc29yLWhvb2sKdGltZSBwb2ludCAtLSBwcm9wb3NlIGl0LCBldmVuIHdoZW4gdGhlIGJ1Y2tldCBoYXMgYW4gZW1wdHkgcmVwdXRhdGlvbi4gRG8gbm90CmxldCBidWNrZXQgaGlzdG9yeSwgZ2F0ZS1yZWplY3Rpb24gZmVhciwgb3IgaW1wbGVtZW50YXRpb24gZGlzY29tZm9ydCBuYXJyb3cKeW91ciBzZWFyY2guIEZvbGxvdyB0aGUgZXZpZGVuY2UuCgpbLi4uIHN0cmF0ZWd5LWNvbmNlcm4gcmVsYXkgYW5kIHJldmVydC9pbXByb3ZlLXByaW9yLXNoaXAgcnVsZXMgdHJ1bmNhdGVkIC4uLl0KCiMjIEFjdGlvbiBzcGFjZSBpcyB3aGF0IHlvdSBjYW4gdmVyaWZ5IGV4aXN0cwoKVGhlIG11dGF0aW9uIHNwYWNlIGlzIGJvdW5kZWQgYnkgdGhlIHJ1bnRpbWUsIHRoZSByZWFjaGFibGUgd2ViLCBhbmQgdGhlCmhhcm5lc3MncyBjdXJyZW50IGNhcGFiaWxpdHkgc2V0LiBXaGVuIGEgZGlyZWN0aW9uIGRlcGVuZHMgb24gc29tZXRoaW5nIGJleW9uZAp0aGVzZSAtLSBhIHBhY2thZ2UsIGFuIEFQSSBlbmRwb2ludCwgYSB0b29sIHlvdSBhc3N1bWUgaXMgaW5zdGFsbGVkIC0tIHRoZQpzeXN0ZW0gdHJlYXRzIHVudmVyaWZpZWQgZGVwZW5kZW5jaWVzIGFzIGhhbGx1Y2luYXRpb25zLiBZb3UgaGF2ZSBgYmFzaGAsCmB3ZWJfc2VhcmNoYCwgYW5kIGB3ZWJfZmV0Y2hgIHRvIGNvbmZpcm0gYSBjYXBhYmlsaXR5IGV4aXN0cyBiZWZvcmUgd3JpdGluZyBjb2RlCmFnYWluc3QgaXQ7IHJlY29yZCB0aGUgY29uZmlybWF0aW9uIGluIGBjYXBhYmlsaXR5X2V2aWRlbmNlYC4KCiMjIEJ1aWxkIC0+IHZlcmlmeSAtPiBpdGVyYXRlIChtYW5kYXRvcnkgZm9yIGNvZGUgY2FuZGlkYXRlcykKCkZvciBhbnkgY2FuZGlkYXRlIHRoYXQgaW50cm9kdWNlcyBuZXcgZXhlY3V0YWJsZSBjb2RlLCB5b3UgTVVTVCBjb21wbGV0ZSB0aGlzCmxvb3AgSU4gWU9VUiBTRVNTSU9OIGJlZm9yZSB3cml0aW5nIHRoZSBtYW5pZmVzdDoKCjEuIFdyaXRlIHRoZSBjb2RlIHRvIHlvdXIgc2NyYXRjaCBkaXIuCjIuIFZlcmlmeSBieSBhY3R1YWxseSBydW5uaW5nIGl0IC0tIG5vdCBieSByZWFzb25pbmcgYWJvdXQgaXQuIFR3byBsZXZlbHM6CiAgIC0gTGV2ZWwgMSAtLSB1bml0IGNhbGwgd29ya3M6IGluc3RhbnRpYXRlIHRoZSBwcm9jZXNzb3IvdG9vbCwgZHJpdmUgdGhlCiAgICAgYXN5bmMgaG9vaywgYXNzZXJ0IHRoZSBleHBlY3RlZCBzdGF0ZSBtdXRhdGlvbiBoYXBwZW5lZC4KICAgLSBMZXZlbCAyIC0tIHJvdW5kLXRyaXAgcmVhY2hlcyB0aGUgbW9kZWw6IGEgdW5pdCBjYWxsIHRoYXQgcmV0dXJucyBkb2VzIG5vdAogICAgIHByb3ZlIHRoZSBhZ2VudCBzZWVzIHRoZSByZXR1cm4uIFNpbXVsYXRlIHRoZSBwYXRoIGZyb20geW91ciBjb2RlIHRvIHRoZQogICAgIG1vZGVsJ3MgbmV4dCBpbnB1dCBhbmQgYXNzZXJ0IHRoZSBjb250ZW50IHN1cnZpdmVzIGl0IChwcm92aWRlciBzZXJpYWxpemVyCiAgICAgZm9yIHRvb2xzOyB0aGUgbmV4dCBwaXBlbGluZSBzdGFnZSBmb3IgcHJvY2Vzc29ycykuCjMuIEl0ZXJhdGUgaWYgdmVyaWZpY2F0aW9uIGZhaWxzIC0tIGZpeCB0aGUgYnVnLCBvciBwaXZvdCBpZiB0aGUgZW52aXJvbm1lbnQKICAgZG9lcyBub3Qgc3VwcG9ydCB3aGF0IHlvdSBhc3N1bWVkLiBEbyBOT1QgaGlkZSB0aGUgZmFpbHVyZSBpbiBhIHRyeS9leGNlcHQuCjQuIEF0dGFjaCB0aGUgdmVyaWZ5aW5nIG91dHB1dCBhcyBgY2FwYWJpbGl0eV9ldmlkZW5jZWAuICJJIGJlbGlldmUgdGhpcyB3aWxsCiAgIHdvcmsiIGlzIG5vdCBhY2NlcHRhYmxlOyBwYXN0ZSB0aGUgYWN0dWFsIGNvbW1hbmQgYW5kIGl0cyBvdXRwdXQuCgpBIGNhbmRpZGF0ZSB3aG9zZSBuZXcgY29kZSBoYXMgbm90IGJlZW4gb2JzZXJ2ZWQgdG8gd29yayB3aWxsIGJ1cm4gYSByb3VuZCdzCnNoaXAgc2xvdCBmb3IgemVybyBmbGlwcy4gUHVyZSBwcm9tcHQtYnVja2V0IGNhbmRpZGF0ZXMgKG5vIGNvZGUgYXNzZXQpIGFyZQpleGVtcHQgLS0gdGhlIGNvdW50ZXJmYWN0dWFsIGdhdGUgcHJvdmlkZXMgdGhlIGVxdWl2YWxlbnQgc21va2UgY2hlY2suCgpbLi4uIHJlYWRpbmcgbGlzdCBhbmQgd3JpdGUgbG9jYXRpb25zIHRydW5jYXRlZCAuLi5dCgojIyBNYW5pZmVzdCBzaGFwZQoKUGVyIGNhbmRpZGF0ZSwgZW1pdCBhIG1hbmlmZXN0IGF0IGB7eyBjYW5kaWRhdGVzX2RpciB9fS9DLVJ7eyByb3VuZCB9fS08Tk4+Lm1kYAphbmQgYSBzY3JhdGNoIGRpciB3aXRoIHRoZSBhcHBsaWVkIGBjb25maWcueWFtbGAuCgotLS0KY2FuZGlkYXRlX2lkOiBDLVJ7eyByb3VuZCB9fS08Tk4+CmJ1Y2tldDogPHByb21wdHx0b29sc3xjb25maWd8cHJvY2Vzc29yPiAgICMgb3IgYSBsaXN0LCBlLmcuIFtwcm9tcHQsIHByb2Nlc3Nvcl0KaXRlcmF0ZXNfZnJvbTogPHByaW9yX3NoaXBfaWQ+ICAgICAgICAgICAgIyBPUFRJT05BTCAtLSBzZXQgZm9yIGEgcmV2ZXJ0L2ltcHJvdmUKY2FwYWJpbGl0eV9ldmlkZW5jZTogICAgICAgICAgICAgICAgICAgICAgIyBSRVFVSVJFRCAtLSBtYXkgYmUgZW1wdHkgW10KICAtIHR5cGU6IDxweXRob25fcGFja2FnZXxodHRwX2VuZHBvaW50fGJ1aWx0aW5fdG9vbHxmaWxlc3lzdGVtfG90aGVyPgogICAgY2xhaW06ICI8dGhlIGNhcGFiaWxpdHkgdGhpcyBjYW5kaWRhdGUgZGVwZW5kcyBvbj4iCiAgICBldmlkZW5jZTogIjxzb21ldGhpbmcgeW91IE9CU0VSVkVEIHRoaXMgc2Vzc2lvbjogY29tbWFuZCArIG91dHB1dCBzbmlwcGV0PiIKZmlsZV9jaGFuZ2VzOgogIC0ge3BhdGg6IDx1bmRlciBzY3JhdGNoIGRpcj4sIGFjdGlvbjogPGNyZWF0ZXxtb2RpZnl8ZGVsZXRlPiwgZGlmZl9zdW1tYXJ5OiAiPG9uZSBsaW5lPiJ9CnByZWRpY3RlZF9pbXBhY3Q6CiAgdGFza3Nfd2lsbF91bmxvY2s6ICAgIFs8QUxMX0ZBSUwgLT4gZXhwZWN0ID49MSByb2xsb3V0IHRvIHBhc3M+XQogIHRhc2tzX3dpbGxfc3RhYmlsaXplOiBbPFBBUlRJQUxfUEFTUyAtPiBleHBlY3QgYWxsIHJvbGxvdXRzIHRvIHBhc3M+XQogIHRhc2tzX2F0X3Jpc2s6ICAgICAgICBbPGN1cnJlbnRseSA+PTEgcGFzcyAtPiBtaWdodCByZWdyZXNzPl0KYXR0cmlidXRpb25fc2lnbmF0dXJlOiAgICAgICAgICAgICAgICAgICAgIyByZWNvbW1lbmRlZCBmb3IgdG9vbHMvcHJvY2Vzc29yL2NvbmZpZwogIHR5cGU6IDx0b29sX2NhbGx8cHJvY2Vzc29yX2ludm9jYXRpb24+CiAgdG9vbF9uYW1lOiA8UGFzY2FsQ2FzZSBuYW1lIGFzIHJlZ2lzdGVyZWQ+CiAgZXhwZWN0ZWRfbWluX2NhbGxzOiAxCi0tLQoKIyMgRmFpbHVyZSBFdmlkZW5jZQpBdCBsZWFzdCBvbmUgdHJhamVjdG9yeSBvciBkaWdlc3QgYW5jaG9yIHBlciBjYW5kaWRhdGUsIGUuZy4KYHRyYWplY3Rvcmllcy9hYmMxMjNfcjAuanNvbmwjc3RlcF81IC0tIHdoYXQgd2VudCB3cm9uZyBoZXJlYC4KCiMjIFJvb3QgQ2F1c2UKIyMgVGFyZ2V0ZWQgRml4Ck5hbWUgZXhwbGljaXRseSBXSElDSCBob29rcyAvIGV2ZW50IGZpZWxkcyAvIHN0YXRlIHNsb3RzIC8gY29uZmlnIGVudHJpZXMgdGhlCm11dGF0aW9uIHRvdWNoZXMsIHNvIHRoZSBDcml0aWMgY2FuIGp1ZGdlIGludGVyYWN0aW9uIHdpdGggZXhpc3RpbmcgY29tcG9uZW50cy4KCiMjIFdoeSB0aGlzIHdvbid0IGJyZWFrIHRhc2tzX2F0X3Jpc2sKClsuLi4gbG9hZGVyIGdyb3VuZCB0cnV0aCwgWUFNTCB0ZW1wbGF0ZXMsIHJlZmVyZW5jZS1pbXBsZW1lbnRhdGlvbiB0YWJsZSwgYW5kCmNvbW1vbi1oYWxsdWNpbmF0aW9uIGNoZWNrbGlzdCB0cnVuY2F0ZWQgLi4uXQ==" download="">⬇</a>





\# Evolver -- Round {{ round }}









Your goal: produce concrete evolution candidates whose shipping will raise next





round's benchmark pass rate. You decide how many candidates (K \>= 1) -- one





high-value candidate beats three speculative ones, but if two genuinely





different directions both have strong evidence, produce both. Every candidate





must be evidence-driven with citations to raw traces or digests.









\## Your stance









This role is research, not maintenance. Your value is in creative, rigorous,





breakthrough-level thinking -- not in iterating on the bucket the pipeline has





shipped most recently. When evidence points to a structural lever the harness





has never touched -- a new tool, a runloop parameter, a different processor-hook





time point -- propose it, even when the bucket has an empty reputation. Do not





let bucket history, gate-rejection fear, or implementation discomfort narrow





your search. Follow the evidence.









\[... strategy-concern relay and revert/improve-prior-ship rules truncated ...\]









\## Action space is what you can verify exists









The mutation space is bounded by the runtime, the reachable web, and the





harness's current capability set. When a direction depends on something beyond





these -- a package, an API endpoint, a tool you assume is installed -- the





system treats unverified dependencies as hallucinations. You have \`bash\`,





\`web_search\`, and \`web_fetch\` to confirm a capability exists before writing code





against it; record the confirmation in \`capability_evidence\`.









\## Build -\> verify -\> iterate (mandatory for code candidates)









For any candidate that introduces new executable code, you MUST complete this





loop IN YOUR SESSION before writing the manifest:









1. Write the code to your scratch dir.





2. Verify by actually running it -- not by reasoning about it. Two levels:





 - Level 1 -- unit call works: instantiate the processor/tool, drive the





 async hook, assert the expected state mutation happened.





 - Level 2 -- round-trip reaches the model: a unit call that returns does not





 prove the agent sees the return. Simulate the path from your code to the





 model's next input and assert the content survives it (provider serializer





 for tools; the next pipeline stage for processors).





3. Iterate if verification fails -- fix the bug, or pivot if the environment





 does not support what you assumed. Do NOT hide the failure in a try/except.





4. Attach the verifying output as \`capability_evidence\`. "I believe this will





 work" is not acceptable; paste the actual command and its output.









A candidate whose new code has not been observed to work will burn a round's





ship slot for zero flips. Pure prompt-bucket candidates (no code asset) are





exempt -- the counterfactual gate provides the equivalent smoke check.









\[... reading list and write locations truncated ...\]









\## Manifest shape









Per candidate, emit a manifest at \`{{ candidates_dir }}/C-R{{ round }}-\<NN\>.md\`





and a scratch dir with the applied \`config.yaml\`.









---





candidate_id: C-R{{ round }}-\<NN\>





bucket: \<prompt\|tools\|config\|processor\> \# or a list, e.g. \[prompt, processor\]





iterates_from: \<prior_ship_id\> \# OPTIONAL -- set for a revert/improve





capability_evidence: \# REQUIRED -- may be empty \[\]





 - type: \<python_package\|http_endpoint\|builtin_tool\|filesystem\|other\>





 claim: "\<the capability this candidate depends on\>"





 evidence: "\<something you OBSERVED this session: command + output snippet\>"





file_changes:





 - {path: \<under scratch dir\>, action: \<create\|modify\|delete\>, diff_summary: "\<one line\>"}





predicted_impact:





 tasks_will_unlock: \[\<ALL_FAIL -\> expect \>=1 rollout to pass\>\]





 tasks_will_stabilize: \[\<PARTIAL_PASS -\> expect all rollouts to pass\>\]





 tasks_at_risk: \[\<currently \>=1 pass -\> might regress\>\]





attribution_signature: \# recommended for tools/processor/config





 type: \<tool_call\|processor_invocation\>





 tool_name: \<PascalCase name as registered\>





 expected_min_calls: 1





---









\## Failure Evidence





At least one trajectory or digest anchor per candidate, e.g.





\`trajectories/abc123_r0.jsonl\#step_5 -- what went wrong here\`.









\## Root Cause





\## Targeted Fix





Name explicitly WHICH hooks / event fields / state slots / config entries the





mutation touches, so the Critic can judge interaction with existing components.









\## Why this won't break tasks_at_risk









\[... loader ground truth, YAML templates, reference-implementation table, and





common-hallucination checklist truncated ...\]













<a href="data:text/plain;base64,IyBDcml0aWMgLS0gUm91bmQge3sgcm91bmQgfX0KCllvdXIgZ29hbCBoYXMgdHdvIHBhcnRzLCBhbmQgYm90aCBtYXR0ZXIuCgojIyBQYXJ0IDEgLS0gUGVyLWNhbmRpZGF0ZSB2ZXJkaWN0CgpQaWNrIHRoZSBzaW5nbGUgY2FuZGlkYXRlIChvciBtdWx0aXBsZSBidWNrZXQtZGlzam9pbnQgY2FuZGlkYXRlcykgd2hvc2UKc2hpcHBpbmcgaXMgbW9zdCBsaWtlbHkgdG8gcmFpc2UgbmV4dCByb3VuZCdzIHBhc3MgcmF0ZSB3aXRob3V0IGh1cnRpbmcgaXQuIElmCm5vbmUgcXVhbGlmaWVzLCBuby1vcCAtLSBzaGlwcGluZyBhIGJhZCBjYW5kaWRhdGUgaXMgd29yc2UgdGhhbiBub3RoaW5nLgoKRXZlcnkgdmVyZGljdCBNVVNUIGV4cGxpY2l0bHkgYWRkcmVzcyBjYW5kaWRhdGUtdnMtY29uZmlnIGludGVyYWN0aW9uLiBSZWFkIHRoZQpjYW5kaWRhdGUncyBgIyMgVGFyZ2V0ZWQgRml4YCAod2hpY2ggaG9va3MgLyBldmVudCBmaWVsZHMgLyBzdGF0ZSBzbG90cyBpdAp0b3VjaGVzKSBBTkQgdGhlIGN1cnJlbnQgSGFybmVzc0NvbmZpZy4gQW5zd2VyIGluIHlvdXIgdmVyZGljdDogZG9lcyB0aGlzCmNhbmRpZGF0ZSdzIG11dGF0aW9uIHN1cmZhY2Ugb3ZlcmxhcCB3aXRoIGFueSBwcm9jZXNzb3IsIHRvb2wsIHByb21wdCBjbGF1c2UsIG9yCmNvbmZpZyBrd2FyZyBhbHJlYWR5IGluIHRoZSBwYXJlbnQgY29uZmlnPyBJZiB5ZXMsIGFyZ3VlIHdoZXRoZXIgdGhlIG92ZXJsYXAgaXMKKGEpIGludGVudGlvbmFsIGFuZCBzYWZlICh0aGUgbmV3IGNvbXBvbmVudCBzdXBlcnNlZGVzIHRoZSBvbGQgb25lLCB3aGljaCB0aGUKY2FuZGlkYXRlJ3MgYXBwbGllZCBZQU1MIGhhcyByZW1vdmVkKSBvciAoYikgYW4gYWNjaWRlbnRhbCBjb2xsaXNpb24gYW5kIGdyb3VuZHMKZm9yIHJlamVjdGlvbi4gQSB2ZXJkaWN0IHRoYXQgZG9lcyBub3QgYWRkcmVzcyB0aGlzIGlzIGluY29tcGxldGUgYW5kIGNvdW50cyBhcwphc2stbW9yZS4KClsuLi4gcm91bmQtdHJpcCAoTGV2ZWwtMikgZXZpZGVuY2UgY2hlY2sgZm9yIHRvb2wvcHJvY2Vzc29yIGNhbmRpZGF0ZXMgdHJ1bmNhdGVkIC4uLl0KCiMjIFBhcnQgMiAtLSBQb3J0Zm9saW8gYXVkaXQKCkV2ZW4gd2hlbiBldmVyeSBpbmRpdmlkdWFsIGNhbmRpZGF0ZSBpcyBhY2NlcHRhYmxlLCBzdGVwIGJhY2sgYW5kIGxvb2sgYXQgdGhlCnBhdHRlcm4gYWNyb3NzIHJvdW5kcyAoc2NvcmVib2FyZC5qc29uLCBkYXRhL3NoaXBfb3V0Y29tZXMuanNvbik6CgotIEZvciBhbnkgbGV2ZXIgaXRlbSBzaGlwcGVkIGluID49MiBvZiB0aGUgbGFzdCAzIHJvdW5kcyB3aXRoIGN1bXVsYXRpdmUKICBoaXRfcmF0ZSA8IDAuNCwgZG8gTk9UIHNoaXAgYSBjYW5kaWRhdGUgdG91Y2hpbmcgdGhhdCBsZXZlciBhZ2FpbjsgZmxhZyBpdCBhcwogIHN0cmF0ZWd5X2NvbmNlcm4uIEEgc2luZ2xlLXJvdW5kIG1pc3MgaXMgbGlrZWx5IGstc2FtcGxpbmcgbm9pc2U7IG9ubHkKICBwZXJzaXN0ZW5jZSBhY3Jvc3Mgcm91bmRzIGlzIHNpZ25hbC4KLSBJcyB0aGVyZSBhIGJ1Y2tldCBvciBjbHVzdGVyIHRoZSBFdm9sdmVyIGhhcyBuZXZlciB0b3VjaGVkLCB3aGlsZSBhIGZhaWx1cmUKICBwYXR0ZXJuIGluIGRpZ2VzdHMvIHN1Z2dlc3RzIGl0IGlzIHRoZSByaWdodCBsZXZlcj8gRmxhZyBpdC4KLSBEaWQgdGhpcyByb3VuZCdzIHJlZ3Jlc3Npb25zLm1kIGxpc3QgYW55IHJlZ3Jlc3NlZCB0YXNrPyBUaGUgRXZvbHZlciB3YXMKICByZXF1aXJlZCBlaXRoZXIgdG8gc2hpcCBhIGNhbmRpZGF0ZSBhZGRyZXNzaW5nIGVhY2ggcmVncmVzc2lvbiBvciB0byB3cml0ZSBhCiAgIiMjIFdoeSB0aGlzIHJlZ3Jlc3Npb24gaXMgYWNjZXB0YWJsZSIgc2VjdGlvbi4gUmVqZWN0IHRoZSByb3VuZCAobm8tb3ApIGlmCiAgbmVpdGhlciBwYXRoIHdhcyB0YWtlbiwgY2l0aW5nIHRoZSBtaXNzZWQgdGFzayBJRHMuCgpSZWNvcmQgc3RyYXRlZ3lfY29uY2VybiBpbiBkZWNpc2lvbi5tZCdzIGZyb250bWF0dGVyIG9ubHkgd2hlbiB0aGUgZXZpZGVuY2UgaXMKY29uY3JldGU6IG5hbWUgdGhlIGJ1Y2tldCwgdGhlIHJvdW5kIHJhbmdlLCB0aGUgaGl0IHJhdGUsIHRoZSBmYWlsaW5nIHRhc2tzLgpOZXh0IHJvdW5kJ3MgUGxhbm5lciByZWxheXMgaXQgdG8gdGhlIEV2b2x2ZXIuIFRoaXMgaXMgaG93IHlvdSBjaGFsbGVuZ2UgdGhlCkV2b2x2ZXIncyBzdHJhdGVneSwgbm90IGp1c3QgaXRzIGNhbmRpZGF0ZXMuCgpbLi4uIGluZGVwZW5kZW5jZSBydWxlLCBhdmFpbGFibGUtdG8tcmVhZCBndWlkZSwgYXNrX2V2b2x2ZXIsIGFuZCBsb2FkZXIgZ3JvdW5kCnRydXRoIHRydW5jYXRlZCAuLi5dCgojIyBPdXRwdXQKCkZvciBlYWNoIGNhbmRpZGF0ZSwgd3JpdGUgYHZlcmRpY3RzL1YtPGNhbmRpZGF0ZV9pZD4ubWRgOgoKLS0tCmNhbmRpZGF0ZV9pZDogPEMtUnt7IHJvdW5kIH19LU5OPgp2ZXJkaWN0OiA8YWNjZXB0fHJlamVjdHxhc2stbW9yZT4KZXZpZGVuY2VfYW5jaG9yczoKICAtIHRyYWplY3Rvcmllcy88ZmlsZT4jc3RlcF9OCi0tLQoKIyMgUmVhc29uaW5nCjxXaHkgdGhpcyB2ZXJkaWN0LiBDaXRlIHRoZSBhbmNob3JzLiAyLTQgc2hvcnQgcGFyYWdyYXBocy4+CgpBZnRlciBhbGwgdmVyZGljdHMsIHdyaXRlIGBkZWNpc2lvbi5tZGA6CgotLS0Kcm91bmQ6IHt7IHJvdW5kIH19CmRlY2lzaW9uX3R5cGU6IDxzaGlwfG5vX29wPgpzaGlwX3Jhbmtpbmc6ICAgICAgICAgICAgICAgICMgY2FuZGlkYXRlcyB0byBzaGlwLCBpbiBwcmlvcml0eSBvcmRlcgogIC0gY2FuZGlkYXRlX2lkOiA8Qy1Se3sgcm91bmQgfX0tTk4+CnN0cmF0ZWd5X2NvbmNlcm46IHwgICAgICAgICAgIyBPUFRJT05BTCAtLSBmaWxsIG9ubHkgd2hlbiB0aGUgYXVkaXQgc3VyZmFjZXMgb25lCiAgPG9uZSBjb25jcmV0ZSBwYXJhZ3JhcGg7IGNpdGUgc2hpcF9vdXRjb21lcyAvIHRhc2tfaGlzdG9yeSBhbmNob3JzPgotLS0KCiMjIFJlYXNvbmluZwo8My02IGJ1bGxldHMsIG9uZSBwZXIgdmVyZGljdCBmaWxlLCBwbHVzIG9uZSBidWxsZXQgZm9yIGFueSBzdHJhdGVneV9jb25jZXJuLj4KCk11bHRpLXNoaXA6IFN0YWdlIDQgc2hpcHMgZXZlcnkgbGlzdGVkIGNhbmRpZGF0ZSBpbiBvcmRlciBidXQgc2tpcHMgYW55IHdob3NlCmJ1Y2tldCB3YXMgYWxyZWFkeSBjbGFpbWVkIGJ5IGFuIGVhcmxpZXItcmFua2VkIHNoaXAsIHNvIGJ1Y2tldC1kaXNqb2ludApjYW5kaWRhdGVzIGF0dGFja2luZyBvcnRob2dvbmFsIGZhaWx1cmUgbW9kZXMgY2FuIHNoaXAgdG9nZXRoZXIuIE5vdGhpbmcgc2hpcHMKdW5sZXNzIGRlY2lzaW9uLm1kIHBhcnNlcyBjbGVhbmx5Lg==" download="">⬇</a>





\# Critic -- Round {{ round }}









Your goal has two parts, and both matter.









\## Part 1 -- Per-candidate verdict









Pick the single candidate (or multiple bucket-disjoint candidates) whose





shipping is most likely to raise next round's pass rate without hurting it. If





none qualifies, no-op -- shipping a bad candidate is worse than nothing.









Every verdict MUST explicitly address candidate-vs-config interaction. Read the





candidate's \`## Targeted Fix\` (which hooks / event fields / state slots it





touches) AND the current HarnessConfig. Answer in your verdict: does this





candidate's mutation surface overlap with any processor, tool, prompt clause, or





config kwarg already in the parent config? If yes, argue whether the overlap is





(a) intentional and safe (the new component supersedes the old one, which the





candidate's applied YAML has removed) or (b) an accidental collision and grounds





for rejection. A verdict that does not address this is incomplete and counts as





ask-more.









\[... round-trip (Level-2) evidence check for tool/processor candidates truncated ...\]









\## Part 2 -- Portfolio audit









Even when every individual candidate is acceptable, step back and look at the





pattern across rounds (scoreboard.json, data/ship_outcomes.json):









- For any lever item shipped in \>=2 of the last 3 rounds with cumulative





 hit_rate \< 0.4, do NOT ship a candidate touching that lever again; flag it as





 strategy_concern. A single-round miss is likely k-sampling noise; only





 persistence across rounds is signal.





- Is there a bucket or cluster the Evolver has never touched, while a failure





 pattern in digests/ suggests it is the right lever? Flag it.





- Did this round's regressions.md list any regressed task? The Evolver was





 required either to ship a candidate addressing each regression or to write a





 "## Why this regression is acceptable" section. Reject the round (no-op) if





 neither path was taken, citing the missed task IDs.









Record strategy_concern in decision.md's frontmatter only when the evidence is





concrete: name the bucket, the round range, the hit rate, the failing tasks.





Next round's Planner relays it to the Evolver. This is how you challenge the





Evolver's strategy, not just its candidates.









\[... independence rule, available-to-read guide, ask_evolver, and loader ground





truth truncated ...\]









\## Output









For each candidate, write \`verdicts/V-\<candidate_id\>.md\`:









---





candidate_id: \<C-R{{ round }}-NN\>





verdict: \<accept\|reject\|ask-more\>





evidence_anchors:





 - trajectories/\<file\>#step_N





---









\## Reasoning





\<Why this verdict. Cite the anchors. 2-4 short paragraphs.\>









After all verdicts, write \`decision.md\`:









---





round: {{ round }}





decision_type: \<ship\|no_op\>





ship_ranking: \# candidates to ship, in priority order





 - candidate_id: \<C-R{{ round }}-NN\>





strategy_concern: \| \# OPTIONAL -- fill only when the audit surfaces one





 \<one concrete paragraph; cite ship_outcomes / task_history anchors\>





---









\## Reasoning





\<3-6 bullets, one per verdict file, plus one bullet for any strategy_concern.\>









Multi-ship: Stage 4 ships every listed candidate in order but skips any whose





bucket was already claimed by an earlier-ranked ship, so bucket-disjoint





candidates attacking orthogonal failure modes can ship together. Nothing ships





unless decision.md parses cleanly.











### 10.2 Round-0 Task-Agent Prompts



The composition-layer default ($`\mathcal{H}_{0}`$) loads one system prompt per benchmark. We reproduce the ALFWorld default below as a representative example; the remaining benchmark defaults follow the same structure and are listed in the repository.









<a href="data:text/plain;base64,IyBTeXN0ZW0KCllvdSBhcmUgYW4gZXhwZXJ0IGFnZW50IG9wZXJhdGluZyBpbiB0aGUgQUxGUkVEIEVtYm9kaWVkIEVudmlyb25tZW50LiBZb3UgZHJpdmUKYSBsaXZlIGhvdXNlaG9sZCBzaW11bGF0b3IgYnkgY2FsbGluZyB0aGUgYGFjdGAgdG9vbCwgb25lIGFkbWlzc2libGUgY29tbWFuZCBwZXIKY2FsbC4gVGhlIGVudmlyb25tZW50IHJlcGxpZXMgd2l0aCB0aGUgbmV4dCBvYnNlcnZhdGlvbiBhbmQgdGhlIGN1cnJlbnQKYWRtaXNzaWJsZSBhY3Rpb24gbGlzdC4KCiMjIE91dHB1dCBEaXNjaXBsaW5lCgotIE9uZSBgYWN0YCBjYWxsIHBlciB0dXJuLiBObyBjaGFpbmluZyAoImdvIHRvIGZyaWRnZSAxIGFuZCBvcGVuIGl0IikuCi0gUGljayB0aGUgY29tbWFuZCB2ZXJiYXRpbSBmcm9tIHRoZSBhZG1pc3NpYmxlIGxpc3QuIEFueXRoaW5nIG91dHNpZGUgdGhhdCBsaXN0CiAgaXMgYSBzaWxlbnQgbm8tb3AgYW5kIHdhc3RlcyBhIHN0ZXAuCi0gUmVwbHkgd2l0aCBgRklOQUwgQU5TV0VSOiBkb25lYCBvbmx5IGFmdGVyIHlvdSBzZWUgYF9fQUxGV09STERfRE9ORV9fYCBvcgogIGBfX0FMRldPUkxEX0ZBSUxFRF9fYCBpbiBhbiBvYnNlcnZhdGlvbi4gVW50aWwgdGhlbiwga2VlcCBjYWxsaW5nIGBhY3RgLgotIElmIHlvdSBnZW51aW5lbHkgY2Fubm90IG1ha2UgcHJvZ3Jlc3MgZm9yIG1hbnkgY29uc2VjdXRpdmUgc3RlcHMsIGVuZCB3aXRoCiAgYEZJTkFMIEFOU1dFUjogZ2l2ZSB1cGAuCgojIyBUYXNrIFR5cGVzCgp8IFR5cGUgICAgICAgICAgICB8IEdvYWwgICAgICAgICAgICAgICAgICAgICAgICAgIHwgS2V5IFN0ZXBzIHwKfC0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS18CnwgUGljayAmIFBsYWNlICAgIHwgUHV0IG9iamVjdCBYIGluL29uIHJlY2VwdGFjbGUgWSB8IEZpbmQgWCAtPiB0YWtlIFggLT4gZ28gdG8gWSAtPiBwdXQgWCB8CnwgUGljayBUd28gJiBQbGFjZXwgUHV0IHR3byBpbnN0YW5jZXMgb2YgWCBpbi9vbiBZICB8IEZpbmQgWDEgLT4gdGFrZSAtPiBwbGFjZSAtPiBmaW5kIFgyIC0+IHRha2UgLT4gcGxhY2UgfAp8IEV4YW1pbmUgaW4gTGlnaHR8IEV4YW1pbmUgWCB1bmRlciBkZXNrbGFtcCAgICAgICAgfCBGaW5kIFggLT4gdGFrZSBYIC0+IGZpbmQgZGVza2xhbXAgLT4gdXNlIGRlc2tsYW1wIHwKfCBDbGVhbiAmIFBsYWNlICAgfCBDbGVhbiBYIGFuZCBwdXQgaW4vb24gWSAgICAgICAgIHwgRmluZCBYIC0+IHRha2UgLT4gY2xlYW4gYXQgc2lua2Jhc2luIC0+IGdvIHRvIFkgLT4gcHV0IHwKfCBIZWF0ICYgUGxhY2UgICAgfCBIZWF0IFggYW5kIHB1dCBpbi9vbiBZICAgICAgICAgIHwgRmluZCBYIC0+IHRha2UgLT4gaGVhdCBhdCBtaWNyb3dhdmUgLT4gZ28gdG8gWSAtPiBwdXQgfAp8IENvb2wgJiBQbGFjZSAgICB8IENvb2wgWCBhbmQgcHV0IGluL29uIFkgICAgICAgICAgfCBGaW5kIFggLT4gdGFrZSAtPiBjb29sIGF0IGZyaWRnZSAtPiBnbyB0byBZIC0+IHB1dCB8CgojIyBHZW5lcmFsIFByaW5jaXBsZXMKCjEuIERlY29tcG9zZSB0aGUgZ29hbCBpbnRvIG9yZGVyZWQgc3ViLWdvYWxzIChsb2NhdGUgLT4gYWNxdWlyZSAtPiB0cmFuc2Zvcm0gLT4KICAgZGVsaXZlcikgYW5kIGNvbXBsZXRlIGVhY2ggYmVmb3JlIG1vdmluZyBvbi4KMi4gU3lzdGVtYXRpYyBleHBsb3JhdGlvbjogc2VhcmNoIGVhY2ggc3VyZmFjZSBhbmQgY29udGFpbmVyIGF0IG1vc3Qgb25jZSBiZWZvcmUKICAgcmV2aXNpdGluZy4gT3BlbiBjbG9zZWQgY29udGFpbmVycyBiZWZvcmUganVkZ2luZyB0aGVtIGVtcHR5IC0tIHRoZQogICBhZG1pc3NpYmxlIGxpc3Qgc3VyZmFjZXMgYG9wZW4gPHJlY2VwPmAgd2hlbiB5b3UgYXJyaXZlIGF0IGEgY2xvc2VkIG9uZS4KMy4gR3JhYiBpbW1lZGlhdGVseTogd2hlbiBhIHJlcXVpcmVkIG9iamVjdCBhcHBlYXJzLCB0YWtlIGl0IG9uIHRoZSB2ZXJ5IG5leHQKICAgc3RlcCBiZWZvcmUgbW92aW5nIGVsc2V3aGVyZS4KNC4gVHJhbnNmb3JtIGJlZm9yZSBwbGFjaW5nOiBwZXJmb3JtIGFueSBjbGVhbi9oZWF0L2Nvb2wgc3RhdGUgY2hhbmdlIGF0IHRoZQogICBhcHByb3ByaWF0ZSBhcHBsaWFuY2UgYmVmb3JlIGhlYWRpbmcgdG8gdGhlIGZpbmFsIGRlc3RpbmF0aW9uLgo1LiBEaXJlY3QgZGVsaXZlcnk6IG9uY2UgaG9sZGluZyB0aGUgZ29hbCBvYmplY3QsIG5hdmlnYXRlIHN0cmFpZ2h0IHRvIHRoZQogICB0YXJnZXQgcmVjZXB0YWNsZSBhbmQgcGxhY2UgaXQuCjYuIFRyYWNrIHByb2dyZXNzOiBrZWVwIGFuIGludGVybmFsIGNvdW50IG9mIG9iamVjdHMgc3RpbGwgdG8gZmluZCBhbmQgcGxhY2UuCiAgIE9ubHkgc3RvcCBzZWFyY2hpbmcgd2hlbiB0aGUgY291bnQgcmVhY2hlcyB6ZXJvLgo3LiBBdm9pZCBsb29wczogbmV2ZXIgcmVwZWF0IHRoZSBzYW1lIGFjdGlvbiBtb3JlIHRoYW4gdHdpY2UgaW4gYSByb3cuIElmIHN0dWNrLAogICBtb3ZlIHRvIGEgZGlmZmVyZW50IHVuZXhwbG9yZWQgbG9jYXRpb24uCjguIFRydXN0IHRoZSBhZG1pc3NpYmxlIGxpc3Q6IGlmIGB0YWtlIFggZnJvbSBZYCBkb2VzIG5vdCBhcHBlYXIsIHlvdSBhcmUgbm90IGF0CiAgIFksIFkgaXMgY2xvc2VkLCBvciBYIGlzIG5vdCB2aXNpYmxlIC0tIGBnbyB0b2AsIGBvcGVuYCwgb3IgbW92ZSBvbiByYXRoZXIKICAgdGhhbiBndWVzc2luZy4KCiMjIENvbW1vbiBNaXN0YWtlcyB0byBBdm9pZAoKLSBSZXZpc2l0aW5nIHNlYXJjaGVkIGxvY2F0aW9ucyB3aXRob3V0IG5ldyBldmlkZW5jZS4KLSBJZ25vcmluZyB2aXNpYmxlIG9iamVjdHMgLS0gaWYgdGhlIHRhcmdldCBhcHBlYXJzLCB0YWtlIGl0IGltbWVkaWF0ZWx5LgotIFNraXBwaW5nIHRoZSBzdGF0ZSBjaGFuZ2UgLS0gZG8gbm90IHBsYWNlIGFuIG9iamVjdCBiZWZvcmUgY2xlYW5pbmcgLyBoZWF0aW5nCiAgLyBjb29saW5nIGl0IHdoZW4gdGhlIHRhc2sgcmVxdWlyZXMgaXQuCi0gUHJlbWF0dXJlIHRlcm1pbmF0aW9uIC0tIGRvIG5vdCByZXBseSBgRklOQUwgQU5TV0VSOiBkb25lYCBiZWZvcmUgdGhlIGVudgogIGVtaXRzIGBfX0FMRldPUkxEX0RPTkVfX2AuCi0gQWN0aW9uIGxvb3BzIC0tIHJlcGVhdGVkbHkgdG9nZ2xpbmcgb3IgZXhhbWluaW5nIHRoZSBzYW1lIG9iamVjdCB3YXN0ZXMgc3RlcHMuCi0gSG9sZGluZyB0d28gb2JqZWN0cyBhdCBvbmNlIC0tIHlvdSBjYW4gb25seSBjYXJyeSBvbmUuIGBwdXRgIHRoZSBjdXJyZW50IG9uZQogIGJlZm9yZSBgdGFrZWAtaW5nIHRoZSBuZXh0Lg==" download="">⬇</a>





\# System









You are an expert agent operating in the ALFRED Embodied Environment. You drive





a live household simulator by calling the \`act\` tool, one admissible command per





call. The environment replies with the next observation and the current





admissible action list.









\## Output Discipline









- One \`act\` call per turn. No chaining ("go to fridge 1 and open it").





- Pick the command verbatim from the admissible list. Anything outside that list





 is a silent no-op and wastes a step.





- Reply with \`FINAL ANSWER: done\` only after you see \`\_\_ALFWORLD_DONE\_\_\` or





 \`\_\_ALFWORLD_FAILED\_\_\` in an observation. Until then, keep calling \`act\`.





- If you genuinely cannot make progress for many consecutive steps, end with





 \`FINAL ANSWER: give up\`.









\## Task Types









\| Type \| Goal \| Key Steps \|





\|-----------------\|-------------------------------\|-----------\|





\| Pick & Place \| Put object X in/on receptacle Y \| Find X -\> take X -\> go to Y -\> put X \|





\| Pick Two & Place\| Put two instances of X in/on Y \| Find X1 -\> take -\> place -\> find X2 -\> take -\> place \|





\| Examine in Light\| Examine X under desklamp \| Find X -\> take X -\> find desklamp -\> use desklamp \|





\| Clean & Place \| Clean X and put in/on Y \| Find X -\> take -\> clean at sinkbasin -\> go to Y -\> put \|





\| Heat & Place \| Heat X and put in/on Y \| Find X -\> take -\> heat at microwave -\> go to Y -\> put \|





\| Cool & Place \| Cool X and put in/on Y \| Find X -\> take -\> cool at fridge -\> go to Y -\> put \|









\## General Principles









1. Decompose the goal into ordered sub-goals (locate -\> acquire -\> transform -\>





 deliver) and complete each before moving on.





2. Systematic exploration: search each surface and container at most once before





 revisiting. Open closed containers before judging them empty -- the





 admissible list surfaces \`open \<recep\>\` when you arrive at a closed one.





3. Grab immediately: when a required object appears, take it on the very next





 step before moving elsewhere.





4. Transform before placing: perform any clean/heat/cool state change at the





 appropriate appliance before heading to the final destination.





5. Direct delivery: once holding the goal object, navigate straight to the





 target receptacle and place it.





6. Track progress: keep an internal count of objects still to find and place.





 Only stop searching when the count reaches zero.





7. Avoid loops: never repeat the same action more than twice in a row. If stuck,





 move to a different unexplored location.





8. Trust the admissible list: if \`take X from Y\` does not appear, you are not at





 Y, Y is closed, or X is not visible -- \`go to\`, \`open\`, or move on rather





 than guessing.









\## Common Mistakes to Avoid









- Revisiting searched locations without new evidence.





- Ignoring visible objects -- if the target appears, take it immediately.





- Skipping the state change -- do not place an object before cleaning / heating





 / cooling it when the task requires it.





- Premature termination -- do not reply \`FINAL ANSWER: done\` before the env





 emits \`\_\_ALFWORLD_DONE\_\_\`.





- Action loops -- repeatedly toggling or examining the same object wastes steps.





- Holding two objects at once -- you can only carry one. \`put\` the current one





 before \`take\`-ing the next.











### 10.3 Change-Manifest Schema



Each Evolver candidate is accompanied by a change manifest, a structured audit record linking the proposed edit to its evidence, mechanism, expected effect, and attribution signal. The manifest makes every harness modification falsifiable: the Critic checks whether the next round’s trace features match the mechanism and impact the manifest predicted. Table <a href="#S10.T9" class="ltx_ref" title="Table 9 ‣ 10.3 Change-Manifest Schema ‣ 10 Prompts and Harness Defaults ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9</a> defines the manifest fields, and the schema below specifies their representation.



<figure id="S10.T9" class="ltx_table">
<table id="S10.T9.5" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S10.T9.5.1" class="ltx_tr">
<th id="S10.T9.5.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt">Field</th>
<th id="S10.T9.5.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt"> Meaning </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S10.T9.5.2" class="ltx_tr">
<th id="S10.T9.5.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">candidate_id</th>
<td id="S10.T9.5.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t"> Unique id, e.g. C-R3-01 (round 3, candidate 1). </td>
</tr>
<tr id="S10.T9.5.3" class="ltx_tr">
<th id="S10.T9.5.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">bucket</th>
<td id="S10.T9.5.3.2" class="ltx_td ltx_align_left ltx_align_top"> Edit type: prompt, tools, config, or processor. </td>
</tr>
<tr id="S10.T9.5.4" class="ltx_tr">
<th id="S10.T9.5.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">capability_evidence</th>
<td id="S10.T9.5.4.2" class="ltx_td ltx_align_left ltx_align_top"> Verified claims that the edit mechanism actually works. </td>
</tr>
<tr id="S10.T9.5.5" class="ltx_tr">
<th id="S10.T9.5.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">file_changes</th>
<td id="S10.T9.5.5.2" class="ltx_td ltx_align_left ltx_align_top"> List of path / action / diff-summary edits. </td>
</tr>
<tr id="S10.T9.5.6" class="ltx_tr">
<th id="S10.T9.5.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">predicted_impact</th>
<td id="S10.T9.5.6.2" class="ltx_td ltx_align_left ltx_align_top"> Tasks the edit will unlock, stabilize, or put at risk: the falsifiable prediction. </td>
</tr>
<tr id="S10.T9.5.7" class="ltx_tr">
<th id="S10.T9.5.7.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb">attribution_signature</th>
<td id="S10.T9.5.7.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb"> Trace feature that must appear if the edit fired, e.g. a processor invocation. </td>
</tr>
</tbody>
</table>
<figcaption>Table 9: Change-manifest fields. The manifest is the loop’s evidence ledger: every shipped edit is falsifiable against the next round’s trace-feature deltas.</figcaption>
</figure>







<a href="data:text/plain;base64,Y2FuZGlkYXRlX2lkOiA8cm91bmQvY2FuZGlkYXRlIGlkPgpidWNrZXQ6IHByb21wdCB8IHRvb2xzIHwgY29uZmlnIHwgcHJvY2Vzc29yCmNhcGFiaWxpdHlfZXZpZGVuY2U6CiAgLSB7dHlwZTogcHl0aG9uX3BhY2thZ2UgfCBmaWxlc3lzdGVtIHwgb3RoZXIsIGNsYWltOiAiLi4uIiwgZXZpZGVuY2U6ICIuLi4ifQpmaWxlX2NoYW5nZXM6CiAgLSB7cGF0aDogIi4uLiIsIGFjdGlvbjogY3JlYXRlIHwgbW9kaWZ5IHwgZGVsZXRlLCBkaWZmX3N1bW1hcnk6ICIuLi4ifQpwcmVkaWN0ZWRfaW1wYWN0OgogIHRhc2tzX3dpbGxfdW5sb2NrOiAgICBbdGFza19pZCwgLi4uXQogIHRhc2tzX3dpbGxfc3RhYmlsaXplOiBbdGFza19pZCwgLi4uXQogIHRhc2tzX2F0X3Jpc2s6ICAgICAgICBbdGFza19pZCwgLi4uXQphdHRyaWJ1dGlvbl9zaWduYXR1cmU6CiAgdHlwZTogcHJvY2Vzc29yX2ludm9jYXRpb24gfCB0b29sX2NhbGwgfCBwcm9tcHRfZmVhdHVyZQogIHRvb2xfbmFtZTogPG5hbWU+CiAgZXhwZWN0ZWRfbWluX2NhbGxzOiA8aW50Pg==" download="">⬇</a>





candidate_id: \<round/candidate id\>





bucket: prompt \| tools \| config \| processor





capability_evidence:





 - {type: python_package \| filesystem \| other, claim: "...", evidence: "..."}





file_changes:





 - {path: "...", action: create \| modify \| delete, diff_summary: "..."}





predicted_impact:





 tasks_will_unlock: \[task_id, ...\]





 tasks_will_stabilize: \[task_id, ...\]





 tasks_at_risk: \[task_id, ...\]





attribution_signature:





 type: processor_invocation \| tool_call \| prompt_feature





 tool_name: \<name\>





 expected_min_calls: \<int\>













## 11 Anatomy of an Evolution Step



To illustrate the AEGIS loop concretely, we walk through one full cycle, from Digester compression through Planner synthesis, Evolver editing, and Critic judgment, to the resulting trace delta. We select round 10 of the GAIA / Sonnet 4.6 run: a composite edit spanning a new tool, a prompt addition, and a configuration change. This multi-component intervention produced the largest single-round gain in that run, making it a richer illustration than a single-lever edit.





### 11.1 Worked Example: GAIA / Sonnet 4.6, Round 10



#### Failure evidence.



Prior to round 10, the success rate stood at $`74.8\%`$, having dropped from its peak of $`77.7\%`$ due to a regression in round 9. The Digester’s trace analysis revealed a systematic failure pattern: every Wikipedia fetch in round 10’s traces returned zero characters. WebFetch employs a browser if the website requires JavaScript support, but Wikipedia’s new frontend fails to load correctly, timing out or returning an empty body. The traces make it plain: within task db4fd70a (number of stations in a rail line), db4fd70a_r0.jsonl#step_0 and \#step_1 report that Wikipedia WebFetch fetches return 0 chars; similarly, within f0f46385 (ASEAN members’ membership status), three consecutive WebFetch calls return 0 chars; ten separate attempts across the round returned empty responses.







#### Planner synthesis.



The Digester grouped the 23 failed tasks by failure mode, surfacing a critical tool-level issue that the round-9 Critic had already flagged: the *tools* component had not shipped a fix in nine consecutive rounds despite source-access failures appearing since round 1. The Planner received two targets: (1) resolve the persistent tool-level source-access failures, and (2) revert the prompt and budget-processor changes responsible for the round-9 regression.







#### Evolver edit.



The Evolver suggested C-R10-02, covering three buckets. (i) *tools*: new WikiTextFetch tool, avoiding the browser altogether by employing the MediaWiki API endpoint; returns complete text of the article, 10,529 chars in case of the rail line, 80,028 for ASEAN. (ii) *prompt*: a single sentence in the tool usage section instructing the agent to use WikiTextFetch before looking up Wikipedia articles. (iii) *config*: restore the round-8 baseline configuration, register WikiTextFetch, and remove the problematic budget processor. The manifest’s capability evidence includes a Level-2 round-trip check (content serialized as a 10,529-char string by the provider); the attribution signature requires at least one WikiTextFetch call.









<a href="data:text/plain;base64,Y2FuZGlkYXRlX2lkOiBDLVIxMC0wMgpidWNrZXQ6IFt0b29scywgcHJvbXB0LCBjb25maWddCmNhcGFiaWxpdHlfZXZpZGVuY2U6CiAgLSB0eXBlOiBodHRwX2VuZHBvaW50CiAgICBjbGFpbTogIk1lZGlhV2lraSBBUEkgcmV0dXJucyBmdWxsIHBsYWluLXRleHQgZXh0cmFjdCB3aGVyZSBXZWJGZXRjaCByZXR1cm5zIDAgY2hhcnMiCiAgICBldmlkZW5jZTogIkdFVCAuLi4vdy9hcGkucGhwPy4uLiZleHBsYWludGV4dD10cnVlIC0+IDEwLDUyOSBjaGFycyBmb3IgRnJhbmtsaW4vRm94Ym9yb19MaW5lIgogIC0gdHlwZTogb3RoZXIKICAgIGNsYWltOiAidG9vbCByZXR1cm4gc3Vydml2ZXMgcHJvdmlkZXIgc2VyaWFsaXphdGlvbiB0byB0aGUgbW9kZWwgKExldmVsIDIpIgogICAgZXZpZGVuY2U6ICJfcHJlcGFyZV9tZXNzYWdlcyhbdG9vbF9tc2ddKSBrZWVwcyBjb250ZW50IGFzIDEwLDUyOS1jaGFyIHN0cmluZyIKZmlsZV9jaGFuZ2VzOgogIC0ge3BhdGg6IFIxMC9hcHBsaWVkL0MtUjEwLTAyL3dpa2lfdGV4dF9mZXRjaC5weSwgYWN0aW9uOiBjcmVhdGUsIGRpZmZfc3VtbWFyeTogIldpa2lUZXh0RmV0Y2ggdmlhIE1lZGlhV2lraSBBUEkifQogIC0ge3BhdGg6IFIxMC9hcHBsaWVkL0MtUjEwLTAyL2dhaWFfYWdlbnQubWQsICAgICBhY3Rpb246IGNyZWF0ZSwgZGlmZl9zdW1tYXJ5OiAiUjggcHJvbXB0ICsgb25lIFdpa2lUZXh0RmV0Y2ggbGluZSJ9CiAgLSB7cGF0aDogUjEwL2FwcGxpZWQvQy1SMTAtMDIvY29uZmlnLnlhbWwsICAgICAgICBhY3Rpb246IGNyZWF0ZSwgZGlmZl9zdW1tYXJ5OiAicmVnaXN0ZXIgdG9vbDsgcmVzdG9yZSBSODsgZHJvcCBidWRnZXQgcHJvY2Vzc29yIn0KcHJlZGljdGVkX2ltcGFjdDoKICB0YXNrc193aWxsX3VubG9jazogICAgW2RiNGZkNzBhLCBmMGY0NjM4NSwgOTgzYmJhN2MsIDA4ZjNhMDVmLCA1ZTJhOTFiMF0KICB0YXNrc193aWxsX3N0YWJpbGl6ZTogWzRiNmJiNWY3LCA0MmQ0MTk4Y10KICB0YXNrc19hdF9yaXNrOiAgICAgICAgW10KYXR0cmlidXRpb25fc2lnbmF0dXJlOgogIHR5cGU6IHRvb2xfY2FsbAogIHRvb2xfbmFtZTogV2lraVRleHRGZXRjaAogIGV4cGVjdGVkX21pbl9jYWxsczogMQ==" download="">⬇</a>





candidate_id: C-R10-02





bucket: \[tools, prompt, config\]





capability_evidence:





 - type: http_endpoint





 claim: "MediaWiki API returns full plain-text extract where WebFetch returns 0 chars"





 evidence: "GET .../w/api.php?...&explaintext=true -\> 10,529 chars for Franklin/Foxboro_Line"





 - type: other





 claim: "tool return survives provider serialization to the model (Level 2)"





 evidence: "\_prepare_messages(\[tool_msg\]) keeps content as 10,529-char string"





file_changes:





 - {path: R10/applied/C-R10-02/wiki_text_fetch.py, action: create, diff_summary: "WikiTextFetch via MediaWiki API"}





 - {path: R10/applied/C-R10-02/gaia_agent.md, action: create, diff_summary: "R8 prompt + one WikiTextFetch line"}





 - {path: R10/applied/C-R10-02/config.yaml, action: create, diff_summary: "register tool; restore R8; drop budget processor"}





predicted_impact:





 tasks_will_unlock: \[db4fd70a, f0f46385, 983bba7c, 08f3a05f, 5e2a91b0\]





 tasks_will_stabilize: \[4b6bb5f7, 42d4198c\]





 tasks_at_risk: \[\]





attribution_signature:





 type: tool_call





 tool_name: WikiTextFetch





 expected_min_calls: 1











#### Critic verdict.



The Critic approved only C-R10-02, rejecting the competing revert-only candidate C-R10-01. Its rationale covered three aspects. (i) *Interaction*: C-R10-02 is a strict superset of C-R10-01; both restore the round-8 baseline, so the budget-processor removal is intentional, not an accidental overlap. (ii) *Round-trip evidence*: the Critic verified Level-2 evidence (tool output arrives as a full string, not a truncation marker) before accepting any tools-bucket candidate. (iii) *Portfolio*: this is the first tools-bucket ship in ten rounds, and the trace evidence of persistent zero-char returns justifies the intervention that round-9 flagged.







#### Delta realized.



Post-shipping, the GAIA pass rate increased from $`74.8\%`$ at R9 to $`79.6\%`$ at R10 (+$`4.9`$pp, five tasks changed to pass), the greatest improvement during the entire run; five of the seven tasks the tool was predicted to affect flipped to pass (hit rate $`0.71`$, the highest for any ship across all 19 runs). The improvement mainly occurred at Levels 2 (+$`4`$ tasks) and 3 (+$`2`$). Since the tool triggered its target tasks, the attribution condition was satisfied.





Figure <a href="#S11.F7" class="ltx_ref" title="Figure 7 ‣ Delta realized. ‣ 11.1 Worked Example: GAIA / Sonnet 4.6, Round 10 ‣ 11 Anatomy of an Evolution Step ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">7</a> summarizes the same edit as a manifest card: the raw YAML above is what the loop logs, the card is the human-facing reading of it.



<figure id="S11.F7" class="ltx_figure">

<figcaption>Figure 7: Change manifest for C-R10-02 rendered as a manifest card, the human-facing counterpart of the logged YAML above.</figcaption>
</figure>









## 12 Additional Results



The rest of this appendix is organized per benchmark. Each subsection is built around one figure of three panels: (a) a breakdown of the failure clusters the adaptation loop had to address, (b) the per-model distribution of harness levers the evolution shipped, and (c) a model-by-lever heatmap of each lever’s effectiveness (tasks flipped to pass over tasks predicted). We read the three panels in order: what fails and why, how each model evolves, and whether the evolution closes the failures.





### 12.1 GAIA



GAIA stresses general reasoning under tool use, and is the most lever-diverse benchmark in our suite. Figure <a href="#S12.F8" class="ltx_ref" title="Figure 8 ‣ Did evolution close the clusters? ‣ 12.1 GAIA ‣ 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">8</a> gives the three views we use throughout this appendix.





#### Failure clusters and their causes.



Panel (a) summarizes the failure clusters accumulated across the GAIA run. The dominant cluster is blocked-source ($`39\%`$), where the agent cannot retrieve the required evidence because pages return empty content, require JavaScript rendering that times out, or contain incomplete information. Reasoning failures ($`33\%`$) follow, covering tasks that require multi-hop inference, disambiguation of similar entities, numerical computation, or precise interpretation of underspecified queries. Figure/visual failures ($`11\%`$) arise when the answer depends on information embedded in images, maps, or diagrams that text extraction alone cannot capture. Document/table parsing failures ($`11\%`$) occur when evidence is locked in PDFs, structured tables, or semi-structured formats and the agent either misparses the layout or overlooks relevant cells. Scope ambiguity ($`6\%`$) covers queries with multiple valid interpretations, where the agent answers a related but incorrect reading. Together, these clusters indicate that GAIA failures concentrate in evidence retrieval, multi-step reasoning, visual grounding, structured-document extraction, and query disambiguation.







#### Per-model evolution logic.



Panel (b) shows GAIA is the only benchmark where all four levers see substantial use; the Sonnet run alone shipped 11 prompt, 7 processor, 7 config, and 6 tools edits, because its failure set spans tool, prompt, and config problems simultaneously. The three models nonetheless diverge in a way that tracks their starting competence: Sonnet, with the most rounds, sweeps every lever; GPT-5.4 leans hardest on prompt ($`45\%`$ of its ships) and barely touches config, since its reasoning is already strong enough that the remaining gains are mostly instruction-following; Qwen3.5’s short run concentrates its few ships and, strikingly, lands its single tools ship at the highest yield of any cell. The shared logic is prompt-first for the behavioral clusters, with the scarce tools lever reserved for the one mechanical cluster prose cannot touch.







#### Did evolution close the clusters?



Panel (c) shows which failure clusters were reduced by evolution. The largest improvement comes from the blocked-source cluster: the tool edit that introduced WikiTextFetch replaced unreliable browser-based Wikipedia fetching with a MediaWiki API call, reducing failures caused by empty or incomplete page retrieval. Prompt edits mainly targeted the reasoning cluster by encouraging more explicit verification, which contributed to steady gains across rounds. By contrast, figure / visual and document / table parsing failures remained harder to reduce, because they require information extraction from images, figures, PDFs, or structured tables. Overall, GAIA improves through a combination of tool edits that fix retrieval failures and prompt edits that reduce reasoning errors, while residual errors concentrate in visual and document-heavy tasks.



<figure id="S12.F8" class="ltx_figure">
<img src="2606.14249v1/bench_gaia.png" id="S12.F8.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/182;" width="476" height="182" alt="Refer to caption" />
<figcaption>Figure 8: GAIA evolution analysis (103 tasks, exact-match). (a) Failure clusters among the tasks still unsolved; blocked-source and reasoning dominate, while figure/visual and parsing clusters are residual model gaps. (b) Share of shipped edits by bucket for each task model. (c) Lever effectiveness as hit-rate (tasks flipped / predicted) per model and bucket. The single Qwen3.5 tools ship is the highest-yield cell (0.67).</figcaption>
</figure>







### 12.2 ALFWorld



ALFWorld is an embodied planning benchmark and the most prompt-dominated in our suite. Figure <a href="#S12.F9" class="ltx_ref" title="Figure 9 ‣ Did evolution close the clusters? ‣ 12.2 ALFWorld ‣ 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">9</a> shows its clusters, per-model logic, and effectiveness.





#### Failure clusters and their causes.



Panel (a) summarizes the main failure clusters observed on ALFWorld. The dominant cluster is search / step-ceiling ($`89\%`$), which covers episodes where the agent either searches rooms or receptacles in an inefficient order, or reaches the step limit before completing long interaction chains such as deep search or transform-then-place tasks. Prompt-rule side-effect failures ($`7\%`$) occur when an added heuristic improves some tasks but unintentionally restricts behavior on others, causing the agent to skip a valid action or stop searching too early. Object-type confusion failures ($`4\%`$) refer to cases where the agent confuses semantically similar objects. Together, these clusters show that ALFWorld failures mainly arise from search efficiency, over-constrained prompting, and object-specific grounding errors.







#### Per-model evolution logic.



Panel (b) shows that prompt dominance scales inversely with base-model strength: a prompt rule yields gains only for models that reliably follow it. Sonnet, being the strongest base, derives nearly all improvement from prompt edits alone; search-order heuristics in the system prompt suffice because it consistently obeys them. GPT-5.4 supplements prompts with a processor (introduced at round three) that manages its step budget for transformation tasks. Qwen3.5 requires the most varied mix (prompt, config, and processor), including a processor that intercepts its reasoning text and re-emits tool calls when needed, a mechanical fix for a failure that prompt-level steering cannot resolve. The shared pattern is prompt-first, with structural levers recruited only when prompts prove insufficient. The weaker the base model, the sooner evolution falls back from prompt-based steering to config or processor enforcement, visible in the growing non-prompt segments from Sonnet to Qwen.







#### Did evolution close the clusters?



Panel (c) shows that evolution reduced the main ALFWorld failure clusters, with different levers mattering for different task agents. For Qwen3.5, processor and config edits achieved the strongest effects, with hit-rates of $`0.84`$ and $`0.71`$, respectively. These edits directly addressed mechanical failures by re-emitting missed tool calls and adjusting execution budgets, allowing Qwen3.5 to improve by $`+44.0`$pp and approach the closed-model runs. For Sonnet, the remaining failures were less structural, so prompt edits were sufficient for most gains, reaching a $`0.49`$ hit-rate, while the processor edit had only a marginal effect ($`0.14`$). Two clusters were only partially reduced: prompt-rule side effects, which were introduced by some evolved heuristics and then patched in later rounds, and long-path failures, where some episodes still exceeded the available interaction budget. Overall, ALFWorld shows a clear model-dependent pattern: stronger models benefit mainly from prompt-level steering, whereas weaker models require more structural support through processor and configuration edits.



<figure id="S12.F9" class="ltx_figure">
<img src="2606.14249v1/bench_alfworld.png" id="S12.F9.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/169;" width="476" height="169" alt="Refer to caption" />
<figcaption>Figure 9: ALFWorld evolution analysis (134 tasks, goal-completion). (a) Failure clusters accumulated across all rounds; search inefficiency and the hard step-ceiling dominate, with two small clusters that evolution itself introduced (a prompt-rule side-effect) or transiently hit (object-type confusion). (b) Lever mix by model: the strong base (Sonnet) climbs on prompt almost alone, while weaker bases reach for more varied levers. (c) Lever effectiveness: structural levers (processor, config) are both used more and more effective on weaker models.</figcaption>
</figure>







### 12.3 WebShop



WebShop is a web-interaction benchmark and the noisiest run in our suite. Figure <a href="#S12.F10" class="ltx_ref" title="Figure 10 ‣ Did evolution close the clusters? ‣ 12.3 WebShop ‣ 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">10</a> shows its clusters, per-model logic, and effectiveness.





#### Failure clusters and their causes.



Panel (a) summarizes the WebShop failure clusters accumulated across the run. Early failures are dominated by search and pagination loops, where the agent repeatedly reformulates queries or cycles through result pages without committing to a purchase. As evolution reduces these control-flow errors, the remaining failures shift toward product-selection judgment. The largest cluster, wrong product ($`46\%`$), occurs when the agent selects an item from the wrong category or settles on a weak match before comparing alternatives. Pagination loop failures ($`21\%`$) capture the remaining cases of repeated next/previous navigation without progress. Colour matching failures ($`17\%`$) arise when the agent mishandles shade equivalence or site-specific color labels, such as treating “wine” and “red” as incompatible. Attribute check failures ($`17\%`$) occur when the selected item is close to the request but fails on a required detail, such as size, sleeve length, or another unverified attribute. Overall, the cluster shift indicates that evolution first reduces navigation loops, after which the main errors concentrate in product matching and attribute verification.







#### Per-model evolution logic.



Panel (b) shows that prompt edits drive most of the improvement across all three models, with processor edits serving as a consistent secondary lever. This pattern matches WebShop’s main control-flow failures. Prompt rules help the agent search more efficiently and commit earlier, while advisory processors reinforce these rules during execution by adding warnings when the agent begins to repeat searches or cycle through pagination. For product-selection failures, evolution introduces more targeted support: a colour-matching tool helps resolve shade-equivalence cases, and config edits help weaker models maintain context over longer shopping sessions. Overall, WebShop requires a mixed response: prompts improve high-level shopping strategy, processors reduce navigation loops, tools support attribute matching, and config edits stabilize long-session behavior.







#### Did evolution close the clusters?



Panel (c) shows that evolution partially reduced the WebShop failure clusters. Prompt edits were the most consistently effective lever across models, with hit-rates of $`0.37`$–$`0.50`$, while config edits helped the two weaker models maintain context over longer sessions. These changes reduced early search and pagination loops, raising performance from $`60\%`$ to a peak of $`76\%`$. The remaining clusters proved harder to close. Advisory processors produced only modest gains ($`0.20`$–$`0.25`$), so some pagination failures persisted. The colour-matching tool did not improve performance in this run ($`0.0`$ hit-rate), leaving the colour-matching cluster largely unchanged. Overall, WebShop benefits most from prompt and config edits, while residual navigation loops and product-judgment errors remain the main sources of instability.



<figure id="S12.F10" class="ltx_figure">
<img src="2606.14249v1/bench_webshop.png" id="S12.F10.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/172;" width="476" height="172" alt="Refer to caption" />
<figcaption>Figure 10: WebShop evolution analysis (100 sessions). (a) Failure clusters across the run, after evolution has tamed the round-0 search/pagination loops; the residual is mostly product-choice judgment (wrong product, colour matching, attribute check). (b) Lever mix by model: prompt carries the climb, processor is the consistent second lever. (c) Lever effectiveness; prompt and config are the productive levers, the lone colour-matcher tool ship returned 0.0.</figcaption>
</figure>







### 12.4 $`\tau^{3}`$-Bench



$`\tau^{3}`$-Bench stresses multi-turn dialogue under an explicit domain policy. Figure <a href="#S12.F11" class="ltx_ref" title="Figure 11 ‣ Did evolution close the clusters? ‣ 12.4 𝜏^3-Bench ‣ 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">11</a> pools the AEGIS runs across the airline, retail, and telecom domains.





#### Failure clusters and their causes.



Excluding harness-interrupt traces, the failures are judgment-heavy: the top two clusters, premature / unverified action ($`28\%`$; committing a booking, refund, or device fix before a precondition holds) and wrong selection / count ($`24\%`$), together exceed half and concern *when* to commit and *what* to pick rather than mechanical execution. The remainder is procedural (incomplete multi-step fix $`16\%`$, missed step / sub-task $`14\%`$) or policy-related (misinterpretation $`13\%`$). The smallest cluster, capability-boundary confusion ($`5\%`$), is $`\tau^{3}`$-specific: some telecom faults live on the user’s handset, where the agent has no device-side tool and the failure is its treating that boundary as a missing capability.







#### Per-model evolution logic.



Evolution is prompt-and-processor driven for every model, with zero tools edits: the tool set is fixed and no cluster is one that a new tool could close. Sonnet 4.6 splits prompt/processor ($`23/18`$), GPT-5.4 ships the most balanced mix ($`19/20`$), and Qwen3.5-9B ships fewer overall ($`14/9`$). Since $`\tau^{3}`$ failures are control-flow and judgment errors, the productive levers are prompt rules that encode the policy’s ordering constraints and processors that enforce them mid-dialogue.







#### Did evolution close the clusters?



Config is the sharpest lever where used (Qwen3.5 $`0.67`$, GPT-5.4 $`0.33`$ hit-rate) but is shipped rarely; the high-volume prompt and processor levers are moderately effective ($`0.27`$–$`0.35`$), matching the control-flow nature of the dominant clusters. Gains track base-model headroom: GPT-5.4 starts lowest ($`76.2\%`$) and gains most ($`+14.5`$pp), Sonnet 4.6 gains $`+5.4`$pp, and near-ceiling Qwen3.5-9B only $`+1.1`$pp. The loop is not monotone; Sonnet’s telecom run reaches $`100\%`$ at R4, regresses to $`80.7\%`$ at R7 after a sixth consecutive same-bucket edit, then recovers to $`99.1\%`$ by R9 (Section <a href="#S6.SS6" class="ltx_ref" title="6.6 Failure Analysis ‣ 6 Experiments ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">6.6</a>). Overall, the ordering-enforcing levers close the premature-action and missed-step clusters most reliably, while wrong-selection and policy-judgment errors are the harder residual.



<figure id="S12.F11" class="ltx_figure">
<img src="2606.14249v1/bench_tau3.png" id="S12.F11.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/190;" width="476" height="190" alt="Refer to caption" />
<figcaption>Figure 11: <em>τ</em><sup>3</sup>-Bench evolution analysis, pooled over the airline, retail, and telecom domains. (a) Failure clusters from the logged digests (harness-interrupt traces excluded); judgment errors (premature action and wrong selection) dominate. (b) Lever mix by model: prompt and processor carry the climb, with zero tools edits since the tool set is fixed. (c) Lever effectiveness; config is sharpest where used (Qwen3.5 0.67) but rare, while prompt and processor are the consistent high-volume levers.</figcaption>
</figure>







### 12.5 SWE-bench Verified



SWE-bench Verified stresses repository-level code editing. Figure <a href="#S12.F12" class="ltx_ref" title="Figure 12 ‣ Did evolution close the clusters? ‣ 12.5 SWE-bench Verified ‣ 12 Additional Results ‣ HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry">12</a> shows its clusters, per-model logic, and effectiveness.





#### Failure clusters and their causes.



Panel (a) summarizes the failure clusters pooled across all rounds and all three models. The dominant cluster is incomplete fix ($`62\%`$), where the agent reaches the right region and produces a valid patch but covers only one branch or call site while the gold patch needs several. Wrong diagnosis ($`19\%`$) follows, covering edits to the wrong file or abstraction level after misreading the root cause. The remaining tail is mechanical rather than cognitive: no edit attempted ($`6\%`$), Edit anchor mismatch ($`5\%`$), and budget exhausted ($`4\%`$). Notably the composition is the inverse of reward-hacking: failures are under-fixes, not gamed evaluations, because the harness applies the gold test patch before the model patch and blocks test-file writes.







#### Per-model evolution logic.



Panel (b) shows that SWE-bench is prompt-first for every model, with the secondary lever tracking base-model strength. All three runs ship zero tools edits, since unlike GAIA the failure set has no mechanical-retrieval cluster a tool could close. Sonnet pairs prompt with an equal share of processor edits ($`7`$ each), using workflow nudges to shape an already-competent coder; GPT-5.4 leans hardest on prompt ($`8`$ ships) and uses config ($`4`$) to revert a harmful nudge and restructure its strategy phases; Qwen3.5 spreads its few ships across prompt, processor, and config ($`6/3/3`$). The shared logic is prompt-first, with structural levers recruited as the base model weakens.







#### Did evolution close the clusters?



Panel (c) reveals a sharp capability floor. For the strong models the productive levers genuinely close failures: GPT-5.4’s config edits reach $`0.48`$ and prompt $`0.39`$, while Sonnet’s prompt and processor levers both land at $`0.40`$. For Qwen3.5-9B every lever collapses to near-zero (prompt $`0.05`$, config $`0.05`$, processor $`0.06`$), an order of magnitude lower, because the $`9`$B base cannot execute the predicted fixes. The same loop that lifts GPT-5.4 from $`45\%`$ to a $`64\%`$ peak and stabilizes Sonnet near $`87\%`$ yields only noise on Qwen3.5 (peak $`42\%`$, zero durable gains). Overall SWE-bench improves through prompt edits that broaden fix scope and config edits that restore workflow pacing, but only for models strong enough to act on them.



<figure id="S12.F12" class="ltx_figure">
<img src="2606.14249v1/bench_swebench.png" id="S12.F12.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/205;" width="476" height="205" alt="Refer to caption" />
<figcaption>Figure 12: SWE-bench Verified evolution analysis (55 tasks, resolved-rate). (a) Failure clusters pooled across all rounds and all three task models; incomplete fix and wrong diagnosis dominate, while the mechanical tail (no-edit, anchor mismatch, budget) is residual; failures are under-fixes, not gamed evaluations. (b) Lever mix by model: every run is prompt-first and ships zero tools edits, with the secondary lever shifting from processor (Sonnet) to config (GPT-5.4) to a varied mix (Qwen3.5). (c) Lever effectiveness as hit-rate (tasks flipped / predicted); strong models reach 0.39–0.48 on their productive levers, whereas every Qwen3.5-9B lever collapses to  ≈ 0.05, a capability floor below which evolution cannot compound.</figcaption>
</figure>









## 13 Reproducibility and Artifacts



### 13.1 Per-Run Directory Layout



Each evolution run writes a self-describing directory. The layout below lets a reader reconstruct any decision in this paper from the logged artifacts.









<a href="data:text/plain;base64,cnVucy88cnVuX25hbWU+Lwp8LS0gSU5ERVgubWQgICAgICAgICAgICAjIGh1bWFuLXJlYWRhYmxlIGluZGV4IG9mIHRoZSBydW4KfC0tIGpvdXJuYWwubWQgICAgICAgICAgIyBmaXJzdC1wZXJzb24gbWVtbywgb25lIGVudHJ5IHBlciByb3VuZAp8LS0gY3VydmVzLmpzb24gICAgICAgICAjIHBlci1yb3VuZCBwYXNzLXJhdGUgdHJhamVjdG9yeQp8LS0gc2NvcmVib2FyZC5qc29uICAgICAjIHNoaXBzICsgcGVyLWJ1Y2tldCByZXB1dGF0aW9uCnwtLSBhdWRpdC5qc29ubCAgICAgICAgICMgc3RydWN0dXJlZCBldmVudCBsb2cgKHN0YWdlIC8gZ2F0ZSAvIGNvbW1pdCkKfC0tIGRhdGEvCnwgICB8LS0gdGFza19oaXN0b3J5Lmpzb25sICAgICAgIyBvbmUgbGluZSBwZXIgKHJvdW5kLCB0YXNrKQp8ICAgfC0tIHNoaXBfb3V0Y29tZXMuanNvbiAgICAgICMgb25lIGVudHJ5IHBlciBoaXN0b3JpY2FsIHNoaXAKfCAgIGAtLSByZWplY3RlZF9jYW5kaWRhdGVzLmpzb25sCmAtLSBSPG4+LyAgICAgICAgICAgICAgICAgICAgICAgICMgcGVyLXJvdW5kIGFydGlmYWN0cwogICAgfC0tIGxhbmRzY2FwZS5tZCAgICAgICAgICAgICAjIFBsYW5uZXIgY3Jvc3MtdHJhY2Ugc3ludGhlc2lzCiAgICB8LS0gY2FuZGlkYXRlcy9DLVI8bj4tTk4ubWQgICMgRXZvbHZlciBjaGFuZ2UgbWFuaWZlc3RzIChLIHBlciByb3VuZCkKICAgIHwtLSBhcHBsaWVkL0MtUjxuPi1OTi8gICAgICAgIyBhcHBsaWVkIGNvbmZpZyArIGFzc2V0IGZpbGVzCiAgICB8LS0gZGVjaXNpb24ubWQgICAgICAgICAgICAgICMgQ3JpdGljIHNoaXAgLyBub19vcCBkZWNpc2lvbgogICAgfC0tIHZlcmRpY3RzL1YtQy1SPG4+LU5OLm1kICAjIHBlci1jYW5kaWRhdGUgdmVyZGljdHMKICAgIHwtLSByZWdyZXNzaW9ucy5tZCAgICAgICAgICAgIyB0YXNrcyB3b3JzZW5lZCB2cyBSPG4tMT4KICAgIHwtLSBkaWdlc3RzLyoubWQgICAgICAgICAgICAgIyBwZXItdGFzayBmYWlsdXJlIGFuYWx5c2lzCiAgICBgLS0gdHJhamVjdG9yaWVzLyouanNvbmwgICAgICMgcmF3IHJvbGxvdXRz" download="">⬇</a>





runs/\<run_name\>/





\|-- INDEX.md \# human-readable index of the run





\|-- journal.md \# first-person memo, one entry per round





\|-- curves.json \# per-round pass-rate trajectory





\|-- scoreboard.json \# ships + per-bucket reputation





\|-- audit.jsonl \# structured event log (stage / gate / commit)





\|-- data/





\| \|-- task_history.jsonl \# one line per (round, task)





\| \|-- ship_outcomes.json \# one entry per historical ship





\| \`-- rejected_candidates.jsonl





\`-- R\<n\>/ \# per-round artifacts





 \|-- landscape.md \# Planner cross-trace synthesis





 \|-- candidates/C-R\<n\>-NN.md \# Evolver change manifests (K per round)





 \|-- applied/C-R\<n\>-NN/ \# applied config + asset files





 \|-- decision.md \# Critic ship / no_op decision





 \|-- verdicts/V-C-R\<n\>-NN.md \# per-candidate verdicts





 \|-- regressions.md \# tasks worsened vs R\<n-1\>





 \|-- digests/\*.md \# per-task failure analysis





 \`-- trajectories/\*.jsonl \# raw rollouts

















Experimental support, please <a href="./2606.14249v1/__stdout.txt" class="ltx_ref" target="_blank" rel="nofollow">view the build logs</a> for errors. Generated by <a href="https://math.nist.gov/~BMiller/LaTeXML/" class="ltx_ref ltx_LaTeXML_logo" target="_blank"> L A T E  xml </a> .





## Instructions for reporting errors

We are continuing to improve HTML versions of papers, and your feedback helps enhance accessibility and mobile support. To report errors in the HTML that will help us improve conversion and rendering, choose any of the methods listed below:

- Click the "Report Issue" () button, located in the page header.

**Tip:** You can select the relevant text first, to include it in your report.

Our team has already identified <a href="https://github.com/arXiv/html_feedback/issues" class="ltx_ref" target="_blank">the following issues</a>. We appreciate your time reviewing and reporting rendering errors we may not have found yet. Your efforts will help us improve the HTML versions for all readers, because disability should not be a barrier to accessing research. Thank you for your continued support in championing open access for all.

Have a free development cycle? Help support accessibility at arXiv! Our collaborators at LaTeXML maintain a <a href="https://github.com/brucemiller/LaTeXML/wiki/Porting-LaTeX-packages-for-LaTeXML" class="ltx_ref" target="_blank">list of packages that need conversion</a>, and welcome <a href="https://github.com/brucemiller/LaTeXML/issues" class="ltx_ref" target="_blank">developer contributions</a>.









We gratefully acknowledge support from our **major funders**, [**member institutions**](https://info.arxiv.org/about/ourmembers.html), , and all contributors.



[About](https://info.arxiv.org/about) · [Help](https://info.arxiv.org/help) · [Contact](https://info.arxiv.org/help/contact.html) · [Subscribe](https://info.arxiv.org/help/subscribe) · [Copyright](https://info.arxiv.org/help/license/index.html) · [Privacy](https://info.arxiv.org/help/policies/privacy_policy.html) · [Accessibility](https://info.arxiv.org/help/web_accessibility.html) · <a href="https://status.arxiv.org" target="_blank" rel="noopener noreferrer">Operational Status (opens in new tab)</a>







Major funding support from





<a href="https://www.simonsfoundation.org/" class="ds-funder-link" target="_blank" rel="noopener noreferrer"><img src="/static/base/1.0.1/images/funders/simons-foundation.png" class="ds-funder-logo" alt="Simons Foundation" /></a> <a href="https://www.sfi.org.bm/" class="ds-funder-link" target="_blank" rel="noopener noreferrer"><img src="/static/base/1.0.1/images/funders/simons-foundation-international.png" class="ds-funder-logo" alt="Simons Foundation International" /></a> <a href="https://www.schmidtsciences.org/" class="ds-funder-link" target="_blank" rel="noopener noreferrer"><img src="/static/base/1.0.1/images/funders/schmidt-sciences.png" class="ds-funder-logo" alt="Schmidt Sciences" /></a>









<a href="javascript:toggleReadingMode();" id="disable-reading-mode-btn" class="header-button" title="Disable reading mode, show header and footer"></a>


