---
title: "Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses"
source: "https://arxiv.org/abs/2604.25850"
author: "Jiahang Lin, Shichun Liu, Chengjun Pan, Lizhi Lin, Shihan Dou, Xuanjing Huang, Hang Yan, Zhenhua Han"
published: 2026-04
created: 2026-10-09
description:
tags:
  - "clippings"
---

# Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses



 Jiahang Lin<sup>\*‡</sup>  Affiliation: Fudan University     Shichun Liu<sup>\*‡</sup>  Affiliation: Fudan University     Chengjun Pan<sup>\*‡</sup>  Affiliation: Peking University     Lizhi Lin  Affiliation: Shanghai Qiji Zhifeng Co., Ltd     Shihan Dou  Affiliation: Fudan University     Xuanjing Huang  Affiliation: Fudan University     Hang Yan  Affiliation: Shanghai Qiji Zhifeng Co., Ltd     Zhenhua Han<sup>†</sup>  Affiliation: Shanghai Qiji Zhifeng Co., Ltd     Tao Gui<sup>†</sup>  Affiliation: Fudan University 





###### Abstract

Harnesses have become a central determinant of coding-agent performance, shaping how models interact with repositories, tools, and execution environments. Yet automating harness engineering is hard: a heterogeneous action space, sparse and noisy evaluation signal, multi-million-token trajectories, and edits whose effect is hard to attribute to the next round’s outcomes. We introduce Agentic Harness Engineering (AHE), a framework that automates harness-level evolution by instrumenting the three stages of any engineering loop (component editing, trajectory inspection, and decision making) with matched observability pillars: ❶ *component observability* gives every editable harness component a file-level representation so the action space is explicit and revertible; ❷ *experience observability* distills millions of raw trajectory tokens into a layered, drill-down evidence corpus that an evolving agent can actually consume; and ❸ *decision observability* pairs every edit with a self-declared prediction, later verified against the next round’s task-level outcomes. Together, these pillars turn every edit into a falsifiable contract, so harness evolution proceeds autonomously without collapsing into trial-and-error. Empirically, ten AHE iterations lift pass@1 on Terminal-Bench 2 from 69.7% to 77.0%, surpassing the human-designed harness Codex-CLI (71.9%) and the self-evolving baselines ACE and TF-GRPO. The frozen harness transfers without re-evolution: on SWE-bench-verified it tops aggregate success at $`12\%`$ fewer tokens than the seed, and on Terminal-Bench 2 it yields $`+5.1`$ to $`+10.1`$ pp cross-family gains across three alternate model families, indicating the evolved components encode general engineering experience rather than benchmark-specific tuning. These results position observability-driven evolution as a practical pathway to keep coding-agent harnesses continually improving.



<sup>†</sup><sup>†</sup>footnotetext: <sup>∗</sup>Equal contributions. <sup>†</sup>Corresponding authors. <sup>‡</sup>Work done during an internship at Shanghai Qiji Zhifeng Co., Ltd. Code: <a href="https://github.com/china-qijizhifeng/agentic-harness-engineering" class="ltx_ref ltx_url ltx_font_typewriter">https://github.com/china-qijizhifeng/agentic-harness-engineering</a>

<figure id="S0.F1" class="ltx_figure">

<figcaption>Figure 1: AHE evolves a bash-only seed past every human-designed and self-evolving baseline on Terminal-Bench 2. All three role agents share one base model, isolating the gain to harness edits rather than analyzer or editor capability.</figcaption>
</figure>



## 1 Introduction



Coding agents are now widely used for long-horizon software-engineering tasks, with measurable progress on real GitHub issue resolution \[<a href="#bib.bib15" class="ltx_ref">13</a>, <a href="#bib.bib40" class="ltx_ref">40</a>, <a href="#bib.bib7" class="ltx_ref">7</a>\] and multi-step terminal workflows \[<a href="#bib.bib21" class="ltx_ref">19</a>\]. This progress is driven not only by the underlying language model but also by a substantial surrounding *harness* \[<a href="#bib.bib29" class="ltx_ref">28</a>, <a href="#bib.bib19" class="ltx_ref">17</a>, <a href="#bib.bib36" class="ltx_ref">37</a>, <a href="#bib.bib39" class="ltx_ref">39</a>, <a href="#bib.bib31" class="ltx_ref">31</a>, <a href="#bib.bib11" class="ltx_ref">29</a>\], which includes components such as the system prompt, tools, and middleware that mediate the model’s interaction with the file system, shell, and external services.





Harness design materially shifts task completion on long-horizon coding benchmarks, even with the base model held fixed \[<a href="#bib.bib35" class="ltx_ref">35</a>, <a href="#bib.bib36" class="ltx_ref">37</a>\]. In current practice, human harness developers inspect trajectories, identify recurring failure patterns, and revise prompts, tools, or middleware accordingly. Yet this manual loop has not kept pace with advancing base-model capability: it is expensive, hard to scale, and difficult to study scientifically, with improvements distributed across design decisions \[<a href="#bib.bib31" class="ltx_ref">31</a>\].





An intuitive direction is to introduce a separate evolution agent that optimizes harness components based on experience \[<a href="#bib.bib1" class="ltx_ref">1</a>, <a href="#bib.bib43" class="ltx_ref">43</a>, <a href="#bib.bib4" class="ltx_ref">4</a>\]. Existing approaches mostly optimize individual harness components, typically the prompt \[<a href="#bib.bib30" class="ltx_ref">30</a>, <a href="#bib.bib44" class="ltx_ref">44</a>, <a href="#bib.bib20" class="ltx_ref">18</a>\] or an in-context playbook \[<a href="#bib.bib43" class="ltx_ref">43</a>\], with few jointly evolving the full set of editable components \[<a href="#bib.bib17" class="ltx_ref">15</a>\]. In practice, long and unstructured rollout trajectories offer the evolution agent little machine-consumable signal, and tightly coupled harness frameworks make edits beyond the prompt error-prone. This leaves the central question of agent-driven harness evolution open:





How can an evolution agent stably evolve all components of a coding agent’s harness?





Our central insight is that this question is bottlenecked by *observability*, not by agent capability: once the evolution agent receives structured context over a clear action space, it can reliably converge on better harness designs \[<a href="#bib.bib32" class="ltx_ref">32</a>, <a href="#bib.bib47" class="ltx_ref">47</a>\]. We implement this in Agentic Harness Engineering (AHE), a closed loop driven by three observability pillars: ❶ *component observability* via a decoupled harness that exposes seven editable component types as files, so each failure pattern maps cleanly to a single component class; ❷ *experience observability* via a layered, drill-down evidence corpus distilled from millions of raw trajectory tokens, so the evolver consumes structured root causes rather than raw logs; and ❸ *decision observability* via a change manifest that pairs every edit with a self-declared prediction, later verified against the next round’s task-level outcomes, so each edit becomes a falsifiable contract and ineffective ones are reverted at file granularity.





We empirically validate AHE on Terminal-Bench 2 \[<a href="#bib.bib21" class="ltx_ref">19</a>\]: ten iterations lift pass@1 from 69.7% to 77.0%, surpassing the human-designed Codex \[<a href="#bib.bib25" class="ltx_ref">23</a>\] and the self-evolving baselines ACE \[<a href="#bib.bib43" class="ltx_ref">43</a>\] and TF-GRPO \[<a href="#bib.bib4" class="ltx_ref">4</a>\]. Without further evolution, the frozen harness transfers to SWE-bench-verified \[<a href="#bib.bib15" class="ltx_ref">13</a>\] and to four alternate base models, with the largest gains on weaker bases, suggesting that AHE encodes coordination patterns that less capable models lean on more heavily. A component ablation pinpoints where this gain lives: tools, middleware, and long-term memory each carry the improvement on their own, while the system prompt alone regresses, indicating that factual harness structure transfers across tasks and models whereas prose-level strategy does not.





This paper makes three contributions:

- •
  

  We formulate *agent-driven harness evolution* for coding agents and identify *observability across components, trajectories, and decisions* as the design pivot that enables joint evolution of the full harness rather than prompt-only edits.

  
- •
  

  We propose AHE, which turns every harness edit into a falsifiable, file-level contract through three observability pillars: a decoupled component substrate, a layered trajectory-distillation pipeline, and a change manifest whose self-declared predictions are verified by next-round task deltas.

  
- •
  

  We empirically show that AHE lifts pass@1 on Terminal-Bench 2 from 69.7% to 77.0%, surpasses hand-written and automated baselines, and produces a frozen harness that transfers across benchmarks and base-model families, with the gain concentrated in tools, middleware, and long-term memory rather than the prompt.

  







## 2 Related Work



### 2.1 Harness Engineering and Evaluation for Coding Agents



Harness engineering refers to the practice of designing the system surrounding the model, including its tools, interfaces, memory, execution constraints, and feedback loops, which together shape what an agent can do on long-horizon tasks \[<a href="#bib.bib29" class="ltx_ref">28</a>, <a href="#bib.bib19" class="ltx_ref">17</a>, <a href="#bib.bib35" class="ltx_ref">35</a>, <a href="#bib.bib3" class="ltx_ref">3</a>, <a href="#bib.bib31" class="ltx_ref">31</a>, <a href="#bib.bib11" class="ltx_ref">29</a>\]. Concretely, the harness mediates how the model perceives and acts on its environment: it exposes the action and observation interfaces over which tool-augmented reasoning unfolds \[<a href="#bib.bib3" class="ltx_ref">3</a>\], custom agent-computer interfaces for repository navigation, file editing, and command execution \[<a href="#bib.bib39" class="ltx_ref">39</a>\], as well as sandboxed execution and orchestration support that keep long-horizon runs reproducible \[<a href="#bib.bib36" class="ltx_ref">37</a>\].





Verifying that such systems actually help has driven the parallel maturation of coding-agent evaluation along two axes: task horizon and environmental realism. Coverage extends from short-horizon function-level benchmarks focused on contamination and freshness control \[<a href="#bib.bib46" class="ltx_ref">46</a>, <a href="#bib.bib13" class="ltx_ref">11</a>\], through repository-scale executable patch resolution \[<a href="#bib.bib15" class="ltx_ref">13</a>, <a href="#bib.bib40" class="ltx_ref">40</a>, <a href="#bib.bib7" class="ltx_ref">7</a>\], to multi-hour, terminal-driven workflows that exercise long-horizon, realistic execution \[<a href="#bib.bib22" class="ltx_ref">20</a>, <a href="#bib.bib5" class="ltx_ref">5</a>, <a href="#bib.bib21" class="ltx_ref">19</a>\]. A parallel infrastructure track packages executable runtimes and verifiers around these benchmarks \[<a href="#bib.bib28" class="ltx_ref">26</a>, <a href="#bib.bib14" class="ltx_ref">12</a>, <a href="#bib.bib41" class="ltx_ref">41</a>\], whose attention to reproducible, traceable, and verifiable execution directly motivates the observation system AHE builds on.







### 2.2 Automated Optimization of LLM Agents



Approaches to automated agent optimization differ in what evidence the optimizer observes and what it can edit. Some revise the agent’s own outputs through episodic critique and reflection \[<a href="#bib.bib20" class="ltx_ref">18</a>, <a href="#bib.bib30" class="ltx_ref">30</a>\]. Others target prompts and instructions \[<a href="#bib.bib16" class="ltx_ref">14</a>\]: structured playbooks \[<a href="#bib.bib43" class="ltx_ref">43</a>\], semantic-advantage priors \[<a href="#bib.bib4" class="ltx_ref">4</a>\], jointly optimized instruction-demonstration pipelines for multi-stage programs \[<a href="#bib.bib27" class="ltx_ref">25</a>\], and reflective updates driven by Pareto-frontier traces \[<a href="#bib.bib1" class="ltx_ref">1</a>\]. A separate line edits program structure itself, in the form of skill libraries \[<a href="#bib.bib37" class="ltx_ref">36</a>\], scored program and agent archives evolved through mutation \[<a href="#bib.bib24" class="ltx_ref">22</a>, <a href="#bib.bib12" class="ltx_ref">10</a>\], and graph-structured workflows searched or learned from rollouts \[<a href="#bib.bib42" class="ltx_ref">42</a>, <a href="#bib.bib45" class="ltx_ref">45</a>\].





AHE tunes the full harness as a combinatorial whole rather than a single editable surface, so cross-component trade-offs become legible to the optimizer. It also keeps the human prior minimal, leaving methodology for the optimizer to discover from rollouts rather than fixing it by hand. We describe the substrate, trajectory analysis, and iteration that realize these choices in Section <a href="#S3" class="ltx_ref" title="3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3</a>.









## 3 Method



AHE turns harness optimization into a closed loop driven by another agent, with the base model held fixed and only the explicit harness edited. Our design principle is that every phase of this loop must be *observable*: AHE faithfully records the artifacts each phase produces (the harness components an iteration writes, the rollout trajectories it generates, the edit decisions it commits) and represents them in structured, layered forms that another agent can read and act on.





Three observability layers implement this principle. Component observability (§<a href="#S3.SS1" class="ltx_ref" title="3.1 NexAU: an editable, decoupled harness substrate ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3.1</a>) is realized by a decoupled, file-level harness substrate that maps each failure pattern to a single component class. Experience observability (§<a href="#S3.SS2" class="ltx_ref" title="3.2 Agent Debugger: layered trajectory evidence ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3.2</a>) is realized by a layered evidence corpus distilled from raw rollouts and indexed for drill-down access. Decision observability (§<a href="#S3.SS3" class="ltx_ref" title="3.3 Evolve Agent: evidence-driven, auditable edits ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3.3</a>) is realized by a change manifest that pairs every edit with a self-declared prediction the next round verifies. The three layers compose into the iteration of Algorithm <a href="#alg1" class="ltx_ref" title="Algorithm 1 ‣ 3.3 Evolve Agent: evidence-driven, auditable edits ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">1</a>, which runs unattended round after round.





### 3.1 NexAU: an editable, decoupled harness substrate



We instantiate the harness $`H`$ on the NexAU framework \[<a href="#bib.bib23" class="ltx_ref">21</a>, <a href="#bib.bib33" class="ltx_ref">33</a>\], which exposes seven orthogonal component types as explicit files at fixed mount points in a single workspace: system prompt, tool description, tool implementation, middleware, skill, sub-agent configuration, and long-term memory. The component types are loosely coupled, so adding a middleware does not require editing the system prompt, and adding a skill does not require touching any tool.





This decoupling is what realizes component observability: each failure pattern maps to a single component class, giving the evolve agent a clean action space and localizing every pass-rate change to one file rather than scattering it across hundreds of lines of unstructured prompt prose. Each logical edit becomes one commit on the workspace’s git history, which yields file-level diffs and rollback granularity for free.





Our seed harness $`H_{0}`$ is deliberately minimal: a single shell-execution tool, no middleware, no skills, no sub-agents. A seed already fitted to the target benchmark would contaminate every subsequent edit’s attribution, since we could not tell whether a gain came from the loop or from the seed. The minimal seed forces every component AHE adds to earn its place against measured rollouts.







### 3.2 Agent Debugger: layered trajectory evidence



We generate $`k`$ traces for each task in a benchmark using a harness $`H`$, which may contain errors resulting from the deficiencies of the harness that can be acted on, but scattered across millions of tokens of raw messages. To extract insights from agent trajectories and enable experience observability, we apply Agent Debugger \[<a href="#bib.bib18" class="ltx_ref">16</a>\] framework to use an agent to explore trajectories framed as a navigable, file-based environment where each trajectory message lives in its own file and is reached through generic shell and scripting tools. Traces with the same query are placed in one environment, and the debugger is required to analyze the root cause of the failure or the success pattern, which is stored in *per-task analysis* report for each task. The analysis also includes pass/fail status of the task to ground the Evolve Agent. Finally, a *benchmark-level overview* is aggregated from every report into a single document as an entry point for every iteration.





In addition to these reports, we also provide *original* traces in case the agents need to verify the claims in the reports. The traces are provided both in raw form and lightly processed to remove unnecessary content. All of these content is provided as files allowing progressive disclosure \[<a href="#bib.bib8" class="ltx_ref">27</a>\] which saves on tokens and enable better agent decisions.



<figure id="S3.F2" class="ltx_figure">
<img src="2604.25850v1/method.png" id="S3.F2.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:381/244;" width="381" height="244" alt="Refer to caption" />
<figcaption>Figure 2: The AHE pipeline links three observable surfaces into one closed loop. Components, rollout experience, and edit decisions each surface as structured artifacts another agent reads, and every edit becomes a falsifiable prediction the next round verifies.</figcaption>
</figure>





### 3.3 Evolve Agent: evidence-driven, auditable edits



The Evolve Agent closes the AHE loop. In each round it reads the layered evidence corpus produced by the Agent Debugger, decides which harness components to add, modify, or remove, applies those edits to the workspace, and records the reasoning behind every edit. Two constraints govern these edits, and together they realize decision observability: every edit becomes a falsifiable, file-level claim recorded in a versioned manifest, and the next round’s verdict either confirms or reverts it.





The first constraint is controllability: the Evolve Agent writes only inside the harness workspace, while the runs directory, tracer, verifier, and LLM configuration are read-only, and the seed system prompt (Appendix <a href="#A2.SS1" class="ltx_ref" title="B.1 Code Agent Seed System Prompt ‣ Appendix B Prompts and Configurations ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">B.1</a>) is marked non-deletable. These restrictions block the shortcuts an unconstrained self-modifier would take, such as disabling the verifier, swapping the model, or raising the reasoning budget, and keep every recorded gain attributable to harness edits.





The second constraint is that every change is evidence-driven and ships with a recorded prediction. Each edit attaches a manifest entry that names the failure evidence, the inferred root cause, the targeted fix, and a predicted impact comprising both expected fixes and at-risk regressions; this manifest is the loop’s evidence ledger (see Appendix <a href="#A2.SS2" class="ltx_ref" title="B.2 Evolve Agent Prompt ‣ Appendix B Prompts and Configurations ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">B.2</a>). In the next round, the loop intersects the predicted-fix and predicted-regression sets with the observed task-level deltas to produce a per-edit verdict. Each edit thereby becomes falsifiable by the next evaluation, which replaces rationale-driven self-justification with a measurable contract between rounds.



<figure id="alg1" class="ltx_float ltx_float_algorithm ltx_framed ltx_framed_top">


1: seed harness <em>H</em><sub>0</sub>, base model <em>M</em>, benchmark <em>D</em>, rollouts per task <em>k</em>, max iterations <em>N</em>


2: <em>H</em><sub>best</sub> ← <em>H</em><sub>0</sub>


3: for <em>t</em> = 1 to <em>N</em> do


4:   $T_{t}\leftarrow\textsc{Rollout}(M,H_{t-1},D,k)$ ⊳ phase 1: <em>k</em> rollouts per task 


5:   $\widetilde{T}_{t}\leftarrow\textsc{Clean}(T_{t})$ ⊳ phase 2: drop base64, dedup tool output 


6:   if <em>t</em> ≥ 2 then ⊳ phase 3: attribute prior manifest, then rollback 


7:    $V_{t}\leftarrow\textsc{Attribute}(C_{t-1},T_{t-1},T_{t})$


8:    $H_{t-1}\leftarrow\textsc{Rollback}(H_{t-1},V_{t})$


9:   else


10:    <em>V</em><sub><em>t</em></sub> ← ∅


11:   end if


12:   $R_{t}\leftarrow\textsc{AgentDebugger}(\widetilde{T}_{t})$ ⊳ phase 4: layered distillation 


13:   $(H_{t},C_{t})\leftarrow\textsc{Evolve}(H_{t-1},R_{t},V_{t})$ ⊳ phase 5: workspace edits + new manifest 


14:   $\textsc{Commit}(H_{t},C_{t},t)$ ⊳ phase 6: tag iteration in git 


15:   if $\textsc{Pass@1}(T_{t})&gt;\textsc{Pass@1}(H_{\text{best}})$ then <em>H</em><sub>best</sub> ← <em>H</em><sub><em>t</em></sub>


16:   end if


17: end for


18: return <em>H</em><sub>best</sub>


<figcaption>Algorithm 1  AHE outer loop.</figcaption>
</figure>



Algorithm <a href="#alg1" class="ltx_ref" title="Algorithm 1 ‣ 3.3 Evolve Agent: evidence-driven, auditable edits ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">1</a> composes the three substrates into one iteration: rollout, clean, attribute the prior manifest and revert rejected edits, distill, edit, commit. We run $`k\geq 2`$ rollouts per task so each task carries a pass-rate signal, which stabilizes pass@1 and lets partial-pass tasks anchor comparative diagnosis. Attribution runs *before* distillation, so its verdict lands inside the evidence corpus and binds each prior manifest entry as a contract rather than a rationale. A one-shot explore agent (Appendix <a href="#A2.SS3" class="ltx_ref" title="B.3 Explore Agent Prompts ‣ Appendix B Prompts and Configurations ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">B.3</a>) runs in parallel with iteration $`1`$ to seed a small number of reusable skills from the NexAU source and public coding-agent references. These skills receive no special protection: from iteration $`2`$ onward the Evolve Agent may keep, refine, or remove them based on observed rollouts.









## 4 Experiments



We organize our empirical study around three questions: where AHE sits on the map of existing approaches to harness design, whether what it produces is portable beyond its optimization target, and what inside the loop drives the gain.











### 4.1 Setup



##### Evaluation.



We drive evolution on the full 89 tasks of Terminal-Bench 2 \[<a href="#bib.bib21" class="ltx_ref">19</a>\], split as 4 easy, 55 medium, and 30 hard, with per-task timeout extended to 1 hour. For cross-benchmark transfer we evaluate the AHE harness on SWE-bench-verified \[<a href="#bib.bib15" class="ltx_ref">13</a>\], 500 tasks across seven repositories. We report two metrics per configuration: pass@1, the mean binary success rate over $`k`$ rollouts per task; and tokens/trial, the mean per-trial total of prompt plus completion tokens across all LLM calls, in thousands. Infrastructure-aborted or timed-out trials count as failures under pass@1 (matching the official terminal-bench leaderboard) and are excluded from token means to avoid truncated figures. Runtime infrastructure (framework, dispatcher, sandbox, tracer, and concurrency) is detailed in Appendix <a href="#A1" class="ltx_ref" title="Appendix A Experimental Setup: Full Details ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">A</a>.







##### Models.



For both the evolution loop and the main experiment of §<a href="#S4.SS2" class="ltx_ref" title="4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.2</a>, all three role agents (the Code Agent, the Agent Debugger, and the Evolve Agent) share one base model, GPT-5.4 \[<a href="#bib.bib26" class="ltx_ref">24</a>\] at the high reasoning setting. For cross-model transfer (§<a href="#S4.SS3" class="ltx_ref" title="4.3 RQ2: Generalization to Unseen Tasks and Base Models ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.3</a>), we re-evaluate the Code Agent on five alternate bases: GPT-5.4 at medium and xhigh reasoning, qwen-3.6-plus \[<a href="#bib.bib34" class="ltx_ref">34</a>, <a href="#bib.bib38" class="ltx_ref">38</a>\], gemini-3.1-flash-lite-preview \[<a href="#bib.bib9" class="ltx_ref">8</a>\], and deepseek-v4-flash \[<a href="#bib.bib6" class="ltx_ref">6</a>\].









### 4.2 RQ1: Main Results

<figure id="S4.T1" class="ltx_table ltx_align_floatright" style="width:50%;">
<table id="S4.T1.10" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<tbody class="ltx_tbody">
<tr id="S4.T1.10.1" class="ltx_tr">
<td id="S4.T1.10.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt">Method</td>
<td id="S4.T1.10.1.2" class="ltx_td ltx_align_center ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt">All</td>
<td id="S4.T1.10.1.3" class="ltx_td ltx_align_center ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt">Easy</td>
<td id="S4.T1.10.1.4" class="ltx_td ltx_align_center ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt">Med.</td>
<td id="S4.T1.10.1.5" class="ltx_td ltx_align_center ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt">Hard</td>
</tr>
<tr id="S4.T1.10.2" class="ltx_tr">
<td id="S4.T1.10.2.1" class="ltx_td ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt"></td>
<td id="S4.T1.10.2.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">89</td>
<td id="S4.T1.10.2.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">4</td>
<td id="S4.T1.10.2.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">55</td>
<td id="S4.T1.10.2.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">30</td>
</tr>
<tr id="S4.T1.10.3" class="ltx_tr" style="--ltx-bg-color:#E6E6E6;">
<td colspan="5" id="S4.T1.10.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt">Human-designed harness</td>
</tr>
<tr id="S4.T1.10.4" class="ltx_tr">
<td id="S4.T1.10.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt">opencode</td>
<td id="S4.T1.10.4.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">47.2%</td>
<td id="S4.T1.10.4.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">75.0%</td>
<td id="S4.T1.10.4.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">52.7%</td>
<td id="S4.T1.10.4.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">33.3%</td>
</tr>
<tr id="S4.T1.10.5" class="ltx_tr">
<td id="S4.T1.10.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt">terminus-2</td>
<td id="S4.T1.10.5.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">62.9%</td>
<td id="S4.T1.10.5.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">75.0%</td>
<td id="S4.T1.10.5.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">74.5%</td>
<td id="S4.T1.10.5.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">40.0%</td>
</tr>
<tr id="S4.T1.10.6" class="ltx_tr">
<td id="S4.T1.10.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt">Codex</td>
<td id="S4.T1.10.6.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">71.9%</td>
<td id="S4.T1.10.6.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">75.0%</td>
<td id="S4.T1.10.6.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">80.0%</td>
<td id="S4.T1.10.6.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">56.7%</td>
</tr>
<tr id="S4.T1.10.7" class="ltx_tr" style="--ltx-bg-color:#E6E6E6;">
<td colspan="5" id="S4.T1.10.7.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt">Self-evolved from NexAU<sub>0</sub></td>
</tr>
<tr id="S4.T1.10.8" class="ltx_tr">
<td id="S4.T1.10.8.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt">NexAU<sub>0</sub></td>
<td id="S4.T1.10.8.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">69.7%</td>
<td id="S4.T1.10.8.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">87.5%</td>
<td id="S4.T1.10.8.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">78.2%</td>
<td id="S4.T1.10.8.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">51.7%</td>
</tr>
<tr id="S4.T1.10.9" class="ltx_tr">
<td id="S4.T1.10.9.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt">ACE</td>
<td id="S4.T1.10.9.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">68.9%</td>
<td id="S4.T1.10.9.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">91.7%</td>
<td id="S4.T1.10.9.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">78.2%</td>
<td id="S4.T1.10.9.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">48.9%</td>
</tr>
<tr id="S4.T1.10.10" class="ltx_tr">
<td id="S4.T1.10.10.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-left: 4.0pt; padding-right: 4.0pt">TF-GRPO</td>
<td id="S4.T1.10.10.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">72.3%</td>
<td id="S4.T1.10.10.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">100.0%</td>
<td id="S4.T1.10.10.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">79.4%</td>
<td id="S4.T1.10.10.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">55.6%</td>
</tr>
<tr id="S4.T1.10.11" class="ltx_tr">
<td id="S4.T1.10.11.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">AHE</td>
<td id="S4.T1.10.11.2" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">77.0%</td>
<td id="S4.T1.10.11.3" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">100.0%</td>
<td id="S4.T1.10.11.4" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">88.2%</td>
<td id="S4.T1.10.11.5" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">53.3%</td>
</tr>
</tbody>
</table>
<figcaption>Table 1: Pass@1 on Terminal-Bench 2 across 89 tasks, by official difficulty. NexAU<sub>0</sub> is the shared seed; ACE, TF-GRPO, and AHE are three self-evolution loops layered on top of it. Bold marks the best per column; ties are all bold.</figcaption>
</figure>



We run a single AHE campaign of ten iterations from the bash-only NexAU<sub>0</sub> seed (§<a href="#S3.SS1" class="ltx_ref" title="3.1 NexAU: an editable, decoupled harness substrate ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3.1</a>), with $`k{=}2`$ rollouts per task per iteration on Terminal-Bench 2, finishing in roughly 32 hours; the best resulting configuration is reported as AHE. The two self-evolve baselines ACE \[<a href="#bib.bib43" class="ltx_ref">43</a>\] and TF-GRPO \[<a href="#bib.bib4" class="ltx_ref">4</a>\] start from the same NexAU<sub>0</sub> seed.





##### AHE outperforms both human-designed and self-evolve baselines.



AHE outperforms every baseline on our panel: three human-designed harnesses, opencode \[<a href="#bib.bib2" class="ltx_ref">2</a>\], terminus-2 \[<a href="#bib.bib10" class="ltx_ref">9</a>\], and Codex \[<a href="#bib.bib25" class="ltx_ref">23</a>\], and the two self-evolve baselines ACE and TF-GRPO. Figure <a href="#S0.F1" class="ltx_ref" title="Figure 1 ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">1</a> shows the gain accumulates across iterations, with continued evolution pushing pass@1 further above the NexAU<sub>0</sub> seed. By difficulty, the only exception is the Hard tier, where AHE marginally trails Codex. We trace this gap to interference between AHE’s components on long-horizon tasks rather than to a missing capability: swapping AHE’s long-term memory alone into the NexAU<sub>0</sub> seed, without the other AHE components, already surpasses Codex on Hard (§<a href="#S4.SS4.SSS1" class="ltx_ref" title="4.4.1 RQ3a: where value accumulates across components ‣ 4.4 RQ3: Analysis ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.4.1</a>).







##### Prompt-only self-evolution misses the components that carry AHE’s gain.



The gaps to ACE and TF-GRPO trace to a layer mismatch. ACE distills natural-language playbooks the agent reads in-context, and TF-GRPO is a trajectory-feedback variant of GRPO that reinforces successful tool sequences; starting from the same NexAU<sub>0</sub> seed as AHE, neither method opens the surrounding scaffolding to edits. AHE jointly evolves system prompt, tools, middleware, and long-term memory across iterations, and §<a href="#S4.SS4.SSS1" class="ltx_ref" title="4.4.1 RQ3a: where value accumulates across components ‣ 4.4 RQ3: Analysis ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.4.1</a> quantifies which of these layers carries the improvement: swapping in AHE’s tools, middleware, or long-term memory alone yields $`+3.3`$, $`+2.2`$, and $`+5.6`$ pp, while the system prompt alone is $`-2.3`$ pp. The harness components ACE and TF-GRPO never edit are exactly where the gain lives.









### 4.3 RQ2: Generalization to Unseen Tasks and Base Models



AHE’s harness is evolved on Terminal-Bench 2 with GPT-5.4 high. We probe whether it encodes general coding-agent experience or overfits to that target by re-using the workspace as-is, without further evolution, in two off-target settings: a different task surface (SWE-bench-verified) and four alternate base models.



<figure id="S4.T2" class="ltx_table">
<table id="S4.T2.10" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<tbody class="ltx_tbody">
<tr id="S4.T2.10.1" class="ltx_tr">
<td id="S4.T2.10.1.1" class="ltx_td ltx_border_tt" style="padding: 0.25pt 5.0pt"></td>
<td id="S4.T2.10.1.2" class="ltx_td ltx_th ltx_th_column ltx_border_tt" style="padding: 0.25pt 5.0pt"></td>
<td colspan="4" id="S4.T2.10.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding: 0.25pt 5.0pt">Success rate ↑</td>
<td colspan="4" id="S4.T2.10.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding: 0.25pt 5.0pt">Tokens k ↓</td>
</tr>
<tr id="S4.T2.10.2" class="ltx_tr">
<td id="S4.T2.10.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_column" style="padding: 0.25pt 5.0pt">Repo</td>
<td id="S4.T2.10.2.2" class="ltx_td ltx_align_center ltx_th ltx_th_column" style="padding: 0.25pt 5.0pt"><em>N</em></td>
<td id="S4.T2.10.2.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">ACE</td>
<td id="S4.T2.10.2.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">TF-GRPO</td>
<td id="S4.T2.10.2.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">NexAU<sub>0</sub></td>
<td id="S4.T2.10.2.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">AHE</td>
<td id="S4.T2.10.2.7" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">ACE</td>
<td id="S4.T2.10.2.8" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">TF-GRPO</td>
<td id="S4.T2.10.2.9" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">NexAU<sub>0</sub></td>
<td id="S4.T2.10.2.10" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">AHE</td>
</tr>
<tr id="S4.T2.10.3" class="ltx_tr">
<td id="S4.T2.10.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">All</td>
<td id="S4.T2.10.3.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">500</td>
<td id="S4.T2.10.3.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">74.6%</td>
<td id="S4.T2.10.3.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">74.2%</td>
<td id="S4.T2.10.3.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">75.2%</td>
<td id="S4.T2.10.3.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">75.6%</td>
<td id="S4.T2.10.3.7" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">679</td>
<td id="S4.T2.10.3.8" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">582</td>
<td id="S4.T2.10.3.9" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">526</td>
<td id="S4.T2.10.3.10" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding: 0.25pt 5.0pt">461</td>
</tr>
<tr id="S4.T2.10.4" class="ltx_tr">
<td id="S4.T2.10.4.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: 0.25pt 5.0pt">django</td>
<td id="S4.T2.10.4.2" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">231</td>
<td id="S4.T2.10.4.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">79.2%</td>
<td id="S4.T2.10.4.4" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">78.8%</td>
<td id="S4.T2.10.4.5" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">79.2%</td>
<td id="S4.T2.10.4.6" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">81.0%</td>
<td id="S4.T2.10.4.7" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">707</td>
<td id="S4.T2.10.4.8" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">583</td>
<td id="S4.T2.10.4.9" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">527</td>
<td id="S4.T2.10.4.10" class="ltx_td ltx_align_center ltx_border_t" style="padding: 0.25pt 5.0pt">484</td>
</tr>
<tr id="S4.T2.10.5" class="ltx_tr">
<td id="S4.T2.10.5.1" class="ltx_td ltx_align_left" style="padding: 0.25pt 5.0pt">sympy</td>
<td id="S4.T2.10.5.2" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">75</td>
<td id="S4.T2.10.5.3" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">69.3%</td>
<td id="S4.T2.10.5.4" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">68.0%</td>
<td id="S4.T2.10.5.5" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">70.7%</td>
<td id="S4.T2.10.5.6" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">70.7%</td>
<td id="S4.T2.10.5.7" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">602</td>
<td id="S4.T2.10.5.8" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">572</td>
<td id="S4.T2.10.5.9" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">494</td>
<td id="S4.T2.10.5.10" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">479</td>
</tr>
<tr id="S4.T2.10.6" class="ltx_tr">
<td id="S4.T2.10.6.1" class="ltx_td ltx_align_left" style="padding: 0.25pt 5.0pt">sphinx-doc</td>
<td id="S4.T2.10.6.2" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">44</td>
<td id="S4.T2.10.6.3" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">61.4%</td>
<td id="S4.T2.10.6.4" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">65.9%</td>
<td id="S4.T2.10.6.5" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">68.2%</td>
<td id="S4.T2.10.6.6" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">70.5%</td>
<td id="S4.T2.10.6.7" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">990</td>
<td id="S4.T2.10.6.8" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">848</td>
<td id="S4.T2.10.6.9" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">731</td>
<td id="S4.T2.10.6.10" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">656</td>
</tr>
<tr id="S4.T2.10.7" class="ltx_tr">
<td id="S4.T2.10.7.1" class="ltx_td ltx_align_left" style="padding: 0.25pt 5.0pt">matplotlib</td>
<td id="S4.T2.10.7.2" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">34</td>
<td id="S4.T2.10.7.3" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">70.6%</td>
<td id="S4.T2.10.7.4" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">70.6%</td>
<td id="S4.T2.10.7.5" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">73.5%</td>
<td id="S4.T2.10.7.6" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">73.5%</td>
<td id="S4.T2.10.7.7" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">622</td>
<td id="S4.T2.10.7.8" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">530</td>
<td id="S4.T2.10.7.9" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">486</td>
<td id="S4.T2.10.7.10" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">391</td>
</tr>
<tr id="S4.T2.10.8" class="ltx_tr">
<td id="S4.T2.10.8.1" class="ltx_td ltx_align_left" style="padding: 0.25pt 5.0pt">scikit-learn</td>
<td id="S4.T2.10.8.2" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">32</td>
<td id="S4.T2.10.8.3" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">93.8%</td>
<td id="S4.T2.10.8.4" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">93.8%</td>
<td id="S4.T2.10.8.5" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">93.8%</td>
<td id="S4.T2.10.8.6" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">87.5%</td>
<td id="S4.T2.10.8.7" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">451</td>
<td id="S4.T2.10.8.8" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">378</td>
<td id="S4.T2.10.8.9" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">307</td>
<td id="S4.T2.10.8.10" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">257</td>
</tr>
<tr id="S4.T2.10.9" class="ltx_tr">
<td id="S4.T2.10.9.1" class="ltx_td ltx_align_left" style="padding: 0.25pt 5.0pt">pydata</td>
<td id="S4.T2.10.9.2" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">22</td>
<td id="S4.T2.10.9.3" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">77.3%</td>
<td id="S4.T2.10.9.4" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">77.3%</td>
<td id="S4.T2.10.9.5" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">77.3%</td>
<td id="S4.T2.10.9.6" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">72.7%</td>
<td id="S4.T2.10.9.7" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">563</td>
<td id="S4.T2.10.9.8" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">516</td>
<td id="S4.T2.10.9.9" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">386</td>
<td id="S4.T2.10.9.10" class="ltx_td ltx_align_center" style="padding: 0.25pt 5.0pt">338</td>
</tr>
<tr id="S4.T2.10.10" class="ltx_tr">
<td id="S4.T2.10.10.1" class="ltx_td ltx_align_left ltx_border_bb" style="padding: 0.25pt 5.0pt">astropy</td>
<td id="S4.T2.10.10.2" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">22</td>
<td id="S4.T2.10.10.3" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">59.1%</td>
<td id="S4.T2.10.10.4" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">59.1%</td>
<td id="S4.T2.10.10.5" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">54.5%</td>
<td id="S4.T2.10.10.6" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">50.0%</td>
<td id="S4.T2.10.10.7" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">546</td>
<td id="S4.T2.10.10.8" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">470</td>
<td id="S4.T2.10.10.9" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">667</td>
<td id="S4.T2.10.10.10" class="ltx_td ltx_align_center ltx_border_bb" style="padding: 0.25pt 5.0pt">277</td>
</tr>
</tbody>
</table>
<figcaption>Table 2: Cross-benchmark transfer on SWE-bench-verified. ACE, TF-GRPO, and AHE share the NexAU<sub>0</sub> seed and differ only in their self-evolution loop; all four columns run on GPT-5.4. AHE and the two self-evolve baselines are evolved on terminal-bench-long-time and evaluated without in-domain re-evolution. Per-column bold marks the best; ties are all bold.</figcaption>
</figure>



##### Cross-benchmark generalization.



We re-point the AHE harness at SWE-bench-verified against the seed and the two self-evolve baselines (NexAU<sub>0</sub>, ACE, TF-GRPO) under identical infrastructure (Table <a href="#S4.T2" class="ltx_ref" title="Table 2 ‣ 4.3 RQ2: Generalization to Unseen Tasks and Base Models ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">2</a>).





ACE and TF-GRPO both regress below the untouched NexAU<sub>0</sub> seed in aggregate success while spending $`11\%`$ to $`29\%`$ more tokens than the seed: the playbook ACE injects and the trajectory distribution TF-GRPO reinforces were distilled on terminal-bench traces and ride the prompt at every model call, so on a different task surface that text adds cost without reshaping the underlying policy.





AHE instead achieves the highest aggregate, with the seed-relative gain concentrating on django and sphinx-doc, the two largest and most token-expensive repositories whose multi-step edit-and-verify loop matches the structure AHE’s tools, middleware, and long-term memory compress on Terminal-Bench 2. Marginal regressions appear only on the three smallest repositories, consistent with pass@1 variance on small repos exceeding the per-repo gain. AHE also cuts aggregate tokens by $`32\%`$ against ACE, $`21\%`$ against TF-GRPO, and $`12\%`$ against the seed: encoding behavior in tools, middleware, and memory rather than in the prompt avoids the per-call re-derivation cost that prompt-only baselines pay.



<figure id="S4.F3" class="ltx_figure">

<figcaption>Figure 3: Cross-model transfer on terminal-bench-long-time, 89 tasks. The AHE workspace evolved on GPT-5.4 high is re-evaluated on each base without further evolution, paired against the NexAU<sub>0</sub> seed on the same base.</figcaption>
</figure>





##### Cross-model generalization.



We re-evaluate both the NexAU<sub>0</sub> seed and AHE on the five alternate bases listed in §<a href="#S4.SS1" class="ltx_ref" title="4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.1</a>. Figure <a href="#S4.F3" class="ltx_ref" title="Figure 3 ‣ Cross-benchmark generalization. ‣ 4.3 RQ2: Generalization to Unseen Tasks and Base Models ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3</a> reports five positive pass@1 gains from $`+2.3`$ to $`+10.1`$ pp.





Cross-family gains dominate within-family ones: deepseek-v4-flash moves $`+10.1`$ pp from $`51.7\%`$ to $`61.8\%`$, qwen-3.6-plus $`+6.3`$ pp from $`56.2\%`$ to $`62.5\%`$, and gemini-3.1-flash-lite-preview $`+5.1`$ pp from $`36.5\%`$ to $`41.6\%`$, all above the $`+2.3`$ pp on GPT-5.4 medium and xhigh. We read this as bases further from saturation leaning more on the coordination patterns AHE has fixed inside tools, middleware, and long-term memory, while a stronger base re-derives the same coordination from its prompt at low marginal cost.





Within one family the profile is non-monotone: $`+2.3`$ pp on medium, $`+7.3`$ pp on high from §<a href="#S4.SS2" class="ltx_ref" title="4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.2</a>, and $`+2.3`$ pp on xhigh. AHE’s step budget and per-task timeout were fitted to GPT-5.4 high during evolution; medium has more time-per-step slack but loses a reasoning tier of raw capability, while xhigh pushes more trials past the per-task timeout, which our pass@1 convention (§<a href="#S4.SS1.SSS0.Px1" class="ltx_ref" title="Evaluation. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.1</a>) counts as failures. Either direction discounts the gain.





The load-bearing finding is that all five gains land positive: the AHE workspace is not specific to one provider’s idioms or one reasoning depth. Their magnitude tracks the evolution operating point rather than raw base capability, so we treat the timeout-budget coupling as a generalization hazard discussed in our <a href="#Sx1" class="ltx_ref ltx_refmacro_nameref" title="In Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">Limitations</a> section.









### 4.4 RQ3: Analysis



We analyze the loop along two architectural choices that §<a href="#S3" class="ltx_ref" title="3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3</a> places weight on: decomposed components (§<a href="#S4.SS4.SSS1" class="ltx_ref" title="4.4.1 RQ3a: where value accumulates across components ‣ 4.4 RQ3: Analysis ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.4.1</a>) and self-declared attribution (§<a href="#S4.SS4.SSS2" class="ltx_ref" title="4.4.2 RQ3b: how reliably the loop’s self-attribution tracks reality ‣ 4.4 RQ3: Analysis ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.4.2</a>).





#### 4.4.1 RQ3a: where value accumulates across components

<figure id="S4.T3" class="ltx_table">
<table id="S4.T3.7" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S4.T3.7.1" class="ltx_tr">
<th id="S4.T3.7.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt">Variant</th>
<th id="S4.T3.7.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">All</th>
<th id="S4.T3.7.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Easy</th>
<th id="S4.T3.7.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Medium</th>
<th id="S4.T3.7.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Hard</th>
</tr>
<tr id="S4.T3.7.2" class="ltx_tr">
<th id="S4.T3.7.2.1" class="ltx_td ltx_th ltx_th_row"></th>
<th id="S4.T3.7.2.2" class="ltx_td ltx_align_center ltx_th ltx_th_column">89 tasks</th>
<th id="S4.T3.7.2.3" class="ltx_td ltx_align_center ltx_th ltx_th_column">4 tasks</th>
<th id="S4.T3.7.2.4" class="ltx_td ltx_align_center ltx_th ltx_th_column">55 tasks</th>
<th id="S4.T3.7.2.5" class="ltx_td ltx_align_center ltx_th ltx_th_column">30 tasks</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S4.T3.7.3" class="ltx_tr">
<th id="S4.T3.7.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">NexAU<sub>0</sub></th>
<td id="S4.T3.7.3.2" class="ltx_td ltx_align_center ltx_border_t">69.7%</td>
<td id="S4.T3.7.3.3" class="ltx_td ltx_align_center ltx_border_t">87.5%</td>
<td id="S4.T3.7.3.4" class="ltx_td ltx_align_center ltx_border_t">78.2%</td>
<td id="S4.T3.7.3.5" class="ltx_td ltx_align_center ltx_border_t">51.7%</td>
</tr>
<tr id="S4.T3.7.4" class="ltx_tr">
<th id="S4.T3.7.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">+ memory only</th>
<td id="S4.T3.7.4.2" class="ltx_td ltx_align_center">75.3%</td>
<td id="S4.T3.7.4.3" class="ltx_td ltx_align_center">50.0%</td>
<td id="S4.T3.7.4.4" class="ltx_td ltx_align_center">83.6%</td>
<td id="S4.T3.7.4.5" class="ltx_td ltx_align_center">63.3%</td>
</tr>
<tr id="S4.T3.7.5" class="ltx_tr">
<th id="S4.T3.7.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">+ tool only</th>
<td id="S4.T3.7.5.2" class="ltx_td ltx_align_center">73.0%</td>
<td id="S4.T3.7.5.3" class="ltx_td ltx_align_center">75.0%</td>
<td id="S4.T3.7.5.4" class="ltx_td ltx_align_center">87.3%</td>
<td id="S4.T3.7.5.5" class="ltx_td ltx_align_center">46.7%</td>
</tr>
<tr id="S4.T3.7.6" class="ltx_tr">
<th id="S4.T3.7.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">+ middleware only</th>
<td id="S4.T3.7.6.2" class="ltx_td ltx_align_center">71.9%</td>
<td id="S4.T3.7.6.3" class="ltx_td ltx_align_center">100.0%</td>
<td id="S4.T3.7.6.4" class="ltx_td ltx_align_center">81.8%</td>
<td id="S4.T3.7.6.5" class="ltx_td ltx_align_center">50.0%</td>
</tr>
<tr id="S4.T3.7.7" class="ltx_tr">
<th id="S4.T3.7.7.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">+ system_prompt only</th>
<td id="S4.T3.7.7.2" class="ltx_td ltx_align_center">67.4%</td>
<td id="S4.T3.7.7.3" class="ltx_td ltx_align_center">75.0%</td>
<td id="S4.T3.7.7.4" class="ltx_td ltx_align_center">78.2%</td>
<td id="S4.T3.7.7.5" class="ltx_td ltx_align_center">46.7%</td>
</tr>
<tr id="S4.T3.7.8" class="ltx_tr">
<th id="S4.T3.7.8.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb">AHE full</th>
<td id="S4.T3.7.8.2" class="ltx_td ltx_align_center ltx_border_bb">77.0%</td>
<td id="S4.T3.7.8.3" class="ltx_td ltx_align_center ltx_border_bb">100.0%</td>
<td id="S4.T3.7.8.4" class="ltx_td ltx_align_center ltx_border_bb">88.2%</td>
<td id="S4.T3.7.8.5" class="ltx_td ltx_align_center ltx_border_bb">53.3%</td>
</tr>
</tbody>
</table>
<figcaption>Table 3: Component-level ablations on terminal-bench-long-time. Each “+ X only” row swaps a single AHE component into the NexAU<sub>0</sub> seed: long-term memory, tool set, middleware, or system prompt. Per-column best is bolded.</figcaption>
</figure>



Table <a href="#S4.T3" class="ltx_ref" title="Table 3 ‣ 4.4.1 RQ3a: where value accumulates across components ‣ 4.4 RQ3: Analysis ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3</a> decomposes the AHE gain at the component level. Each “+ X only” row takes the NexAU<sub>0</sub> seed and swaps in one component from the fully evolved AHE configuration, namely long-term memory, tools, middleware, or system prompt, leaving the other three at their seed defaults. Three of the four single-component variants outperform the seed; the system-prompt swap is the only regression.





##### Each component owns a different failure surface.



Memory adds 12 boundary-case lessons (performance margin, queued-over-limit cancellation, evaluator-style closure, source-packaging layout); on Hard the lessons lift it above full AHE, while on Easy they reduce to superfluous re-verification. Tools become a 1364-line shell that auto-surfaces contract hints from files near each command; on Medium it lands within $`0.9`$ pp of full AHE, while on Hard a built-in publish guard closes the loop too early. Middleware adds a finish-hook that forces one evaluator-isomorphic closure check; on Easy it clears every task, while on Hard it inflates turn count. The system prompt encodes 79 lines of universal discipline whose executability depends on the other three; inserted alone it scores $`-2.3`$ pp aggregate.







##### Components interact non-additively, capping the aggregate gain.



The three positive single-component gains sum to $`+11.1`$ pp against full AHE’s $`+7.3`$ pp, and on Hard the memory-only variant exceeds full AHE: memory, middleware, and the system prompt all push toward the same closure-style verification, so stacking them spends turns on redundant re-checks within the long-horizon budget. Since the evolve agent optimises an aggregate dominated by 55 Medium tasks, it converges to a Medium-heavy trade-off that returns part of the Hard memory effect, and we leave interaction-aware evolution to future work.









#### 4.4.2 RQ3b: how reliably the loop’s self-attribution tracks reality



Each evolution round, our evolve model produces a change manifest naming which Terminal-Bench 2 tasks it expects to fix in the next round and which it flags at risk of regression. We compare the round-$`N{-}1`$ prediction against the round-$`N`$ ground truth, computing standard precision and recall over the 89 tasks separately for fixes and regressions.





##### Evidence-driven targeting.



The fix panel of <a href="#S4.F4" class="ltx_ref" title="In Evidence-driven targeting. ‣ 4.4.2 RQ3b: how reliably the loop’s self-attribution tracks reality ‣ 4.4 RQ3: Analysis ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">Figure 4</a> shows the evolve model’s targeting is evidence-driven rather than guesswork. Cross-iteration fix-precision of 33.7% and fix-recall of 51.4% sit roughly 5x above the random-prediction baselines of 6.5% and 10.6%, so each harness edit lands on a real, agent-anticipated target rather than on an arbitrary subset of the panel.



<figure id="S4.F4" class="ltx_figure">












<figcaption>Figure 4: Cross-iteration mean precision and recall of the evolve model’s self-predictions across 9 evaluation rounds of the GPT-5.4 AHE loop on Terminal-Bench 2, alongside the random-prediction baseline. Left: fix predictions. Right: regression predictions.</figcaption>
</figure>





##### Regression blindness.



The regression panel tells the opposite story: cross-iteration regression-precision of 11.8% and regression-recall of 11.1% sit only about 2x above their random baselines of 5.6% and 5.4%, so most upcoming regressions go unforeseen. The agent can justify why an edit should help, but it cannot reliably name the tasks the same edit is about to break, which is what produces the non-monotone steps in the evolution curve of §<a href="#S4.SS2" class="ltx_ref" title="4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.2</a>. Closing this gap is the clearest direction for future self-evolution loops. <a href="#A4" class="ltx_ref" title="Appendix D Per-round Self-attribution Breakdown ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">Appendix D</a> gives the per-round breakdown.













## 5 Conclusion



We introduced Agentic Harness Engineering, a framework for studying harness-level test-time self-evolution in coding agents. Our central claim is that explicit harness components, including prompts, tools, middleware, skills, and configuration, can serve as a learnable adaptation surface even when the underlying model remains fixed. To make this setting operational, we presented a three-agent architecture together with an evidence-driven evolution loop that constrains self-modification through recorded change manifests, next-round attribution, and per-edit rollback.





The broader motivation of this work is methodological. If harness edits can be accumulated, inspected, and transferred across tasks, then a coding agent may externalize experience into explicit artifacts rather than relying solely on hidden parameter updates. This would make test-time learning more auditable and easier to study scientifically. Our ongoing experiments are designed to test exactly this point through task improvement, transfer, and robustness evaluations on terminal-bench-long-time.





At the same time, AHE should be understood as an initial framework rather than a finished answer. Its value depends on whether evidence-driven harness evolution produces robust gains without collapsing into benchmark-specific tuning. We therefore view the final empirical analysis, especially baselines, transfer results, and failure cases, as essential to establishing the scope of the claims made in this paper.







## Limitations



This paper studies a promising but high-variance setting, and the scope of our claims should be interpreted accordingly. First, the current evaluation centers on terminal-bench-long-time. Even if AHE improves performance on this benchmark, such gains do not by themselves establish broad generalization to other coding-agent environments, programming languages, or deployment settings.





Second, AHE increases the adaptation surface of the agent by allowing edits to multiple harness components. This flexibility is useful, but it also creates additional opportunities for benchmark-specific tuning. Our transfer and OOD experiments are designed to measure this risk directly, but negative results remain possible and should be taken seriously.





Third, the current system includes governance mechanisms such as bounded edits, attribution, and rollback, yet it does not provide a complete guardrail stack. In particular, long-horizon harness cleanup and stronger misuse prevention remain incomplete. As a result, AHE should be viewed as a controlled research prototype rather than a fully mature autonomous self-improvement system.





Finally, the method introduces additional engineering and compute overhead. Each iteration requires benchmark execution, trajectory analysis, and workspace management, which may be costly compared with one-shot prompting or manual harness edits. The final paper will report these costs explicitly.







## References

- \[1\] L. A. Agrawal, S. Tan, D. Soylu, N. Ziems, R. Khare, K. Opsahl-Ong, A. Singhvi, H. Shandilya, M. J. Ryan, M. Jiang, C. Potts, K. Sen, A. Dimakis, I. Stoica, D. Klein, M. Zaharia, and O. Khattab (2025)  GEPA: reflective prompt evolution can outperform reinforcement learning.  In The Fourteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=RQm2KQTM5r" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[2\] Anomaly (2025)  Opencode: the open source coding agent..  External Links: <a href="https://github.com/anomalyco/opencode" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS2.SSS0.Px1.p1.1" class="ltx_ref" title="AHE outperforms both human-designed and self-evolve baselines. ‣ 4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.2</a>. 
- \[3\] Anthropic (2025)  Claude-code.  External Links: <a href="https://github.com/anthropics/claude-code" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[4\] Y. Cai, S. Cai, Y. Shi, Z. Xu, L. Chen, Y. Qin, X. Tan, G. Li, Z. Li, H. Lin, Y. Mao, K. Li, and X. Sun (2025)  Training-free group relative policy optimization.   arXiv.  External Links: 2510.08191, <a href="https://dx.doi.org/10.48550/arXiv.2510.08191" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2510.08191" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S1.p6.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>, <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.2</a>. 
- \[5\] J. S. Chan, N. Chowdhury, O. Jaffe, J. Aung, D. Sherburn, E. Mays, G. Starace, K. Liu, L. Maksin, T. Patwardhan, A. Madry, and L. Weng (2024)  MLE-bench: evaluating machine learning agents on machine learning engineering.  In The Thirteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=6s5uXNWGIh" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[6\] DeepSeek-AI (2026)  DeepSeek-v4: towards highly efficient million-token context intelligence.  External Links: <a href="https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.1</a>. 
- \[7\] X. Deng, J. Da, E. Pan, Y. Y. He, C. Ide, K. Garg, N. Lauffer, A. Park, C. Rane, K. Sampath, M. Krishnan, S. R. Kundurthy, S. M. Hendryx, Z. Wang, C. B. C. Zhang, N. Jacobson, B. Liu, and B. Kenstler (2025)  SWE-bench pro: can ai agents solve long-horizon software engineering tasks?.  External Links: <a href="https://openreview.net/forum?id=9R2iUHhVfr" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[8\] Google (2026)  Gemini-3-1-flash-lite-model-card.  External Links: <a href="https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-1-Flash-Lite-Model-Card.pdf" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.1</a>. 
- \[9\] Harbor (2026)  Terminus-2.  External Links: <a href="https://www.harborframework.com/docs/agents/terminus-2" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS2.SSS0.Px1.p1.1" class="ltx_ref" title="AHE outperforms both human-designed and self-evolve baselines. ‣ 4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.2</a>. 
- \[10\] S. Hu, C. Lu, and J. Clune (2024)  Automated design of agentic systems.  In The Thirteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=t9U3LW7JVX" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[11\] N. Jain, K. Han, A. Gu, W. Li, F. Yan, T. Zhang, S. Wang, A. Solar-Lezama, K. Sen, and I. Stoica (2024)  LiveCodeBench: holistic and contamination free evaluation of large language models for code.  In The Thirteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=chfJJYC3iL" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[12\] N. Jain, J. Singh, M. Shetty, T. Zhang, L. Zheng, K. Sen, and I. Stoica (2025)  R2E-gym: procedural environment generation and hybrid verifiers for scaling open-weights swe agents.  In Second Conference on Language Modeling,  External Links: <a href="https://openreview.net/forum?id=7evvwwdo3z#discussion" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[13\] C. E. Jimenez, J. Yang, A. Wettig, S. Yao, K. Pei, O. Press, and K. R. Narasimhan (2023)  SWE-bench: can language models resolve real-world github issues?.  In The Twelfth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=VTF8yNQM66" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S1.p6.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>, <a href="#S4.SS1.SSS0.Px1.p1.1" class="ltx_ref" title="Evaluation. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.1</a>. 
- \[14\] O. Khattab, A. Singhvi, P. Maheshwari, Z. Zhang, K. Santhanam, S. Vardhamanan, S. Haq, A. Sharma, T. T. Joshi, H. Moazam, H. Miller, M. Zaharia, and C. Potts (2023)  DSPy: compiling declarative language model calls into self-improving pipelines.   arXiv.  External Links: 2310.03714, <a href="https://dx.doi.org/10.48550/arXiv.2310.03714" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2310.03714" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[15\] Y. Lee, R. Nair, Q. Zhang, K. Lee, O. Khattab, and C. Finn (2026)  Meta-harness: end-to-end optimization of model harnesses.   arXiv.  External Links: 2603.28052, <a href="https://dx.doi.org/10.48550/arXiv.2603.28052" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2603.28052" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>. 
- \[16\] L. Lin (2026)  Agent debugger: understanding agent trajectory with agentic workflows - dawning road.  External Links: <a href="https://dawning-road.github.io/blog/agent-debugger" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S3.SS2.p1.1" class="ltx_ref" title="3.2 Agent Debugger: layered trajectory evidence ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§3.2</a>. 
- \[17\] R. Lopopolo (2026)  Harness engineering: leveraging codex in an agent-first world.  External Links: <a href="https://openai.com/zh-Hans-CN/index/harness-engineering/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[18\] A. Madaan, N. Tandon, P. Gupta, S. Hallinan, L. Gao, S. Wiegreffe, U. Alon, N. Dziri, S. Prabhumoye, Y. Yang, S. Gupta, B. P. Majumder, K. Hermann, S. Welleck, A. Yazdanbakhsh, and P. Clark (2023)  Self-refine: iterative refinement with self-feedback.  In Thirty-Seventh Conference on Neural Information Processing Systems,  External Links: <a href="https://openreview.net/forum?id=S37hOerQLB" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[19\] M. A. Merrill, A. G. Shaw, N. Carlini, B. Li, H. Raj, I. Bercovich, L. Shi, J. Y. Shin, T. Walshe, E. K. Buchanan, J. Shen, G. Ye, H. Lin, J. Poulos, M. Wang, M. Nezhurina, J. Jitsev, D. Lu, O. M. Mastromichalakis, Z. Xu, Z. Chen, Y. Liu, R. Zhang, L. L. Chen, A. Kashyap, J. Uslu, J. Li, J. Wu, M. Yan, S. Bian, V. Sharma, K. Sun, S. Dillmann, A. Anand, A. Lanpouthakoun, B. Koopah, C. Hu, E. Guha, G. H. S. Dreiman, J. Zhu, K. Krauth, L. Zhong, N. Muennighoff, R. Amanfu, S. Tan, S. Pimpalgaonkar, T. Aggarwal, X. Lin, X. Lan, X. Zhao, Y. Liang, Y. Wang, Z. Wang, C. Zhou, D. Heineman, H. Liu, H. Trivedi, J. Yang, J. Lin, M. Shetty, M. Yang, N. Omi, N. Raoof, S. Li, T. Y. Zhuo, W. Lin, Y. Dai, Y. Wang, W. Chai, S. Zhou, D. Wahdany, Z. She, J. Hu, Z. Dong, Y. Zhu, S. Cui, A. Saiyed, A. Kolbeinsson, J. Hu, C. M. Rytting, R. Marten, Y. Wang, A. Dimakis, A. Konwinski, and L. Schmidt (2026)  Terminal-bench: benchmarking agents on hard, realistic tasks in command line interfaces.   arXiv.  External Links: 2601.11868, <a href="https://dx.doi.org/10.48550/arXiv.2601.11868" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2601.11868" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S1.p6.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>, <a href="#S4.SS1.SSS0.Px1.p1.1" class="ltx_ref" title="Evaluation. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.1</a>. 
- \[20\] S. Miserendino, M. Wang, T. Patwardhan, and J. Heidecke (2025)  SWE-lancer: can frontier llms earn \$1 million from real-world freelance software engineering?.  In Forty-Second International Conference on Machine Learning,  External Links: <a href="https://openreview.net/forum?id=xZXhFg43EI" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[21\] Nex-AGI (2025)  NexAU (au for agent universe), a general-purpose agent framework for building intelligent agents with tool capabilities..  External Links: <a href="https://github.com/nex-agi/NexAU" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 NexAU: an editable, decoupled harness substrate ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§3.1</a>. 
- \[22\] A. Novikov, N. Vũ, M. Eisenberger, E. Dupont, P. Huang, A. Z. Wagner, S. Shirobokov, B. Kozlovskii, F. J. R. Ruiz, A. Mehrabian, M. P. Kumar, A. See, S. Chaudhuri, G. Holland, A. Davies, S. Nowozin, P. Kohli, and M. Balog (2025)  AlphaEvolve: a coding agent for scientific and algorithmic discovery.   arXiv.  External Links: 2506.13131, <a href="https://dx.doi.org/10.48550/arXiv.2506.13131" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2506.13131" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[23\] OpenAI (2025)  Codex cli.  External Links: <a href="https://developers.openai.com/codex/cli" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p6.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S4.SS2.SSS0.Px1.p1.1" class="ltx_ref" title="AHE outperforms both human-designed and self-evolve baselines. ‣ 4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.2</a>. 
- \[24\] OpenAI (2026)  Introducing gpt-5.4.  External Links: <a href="https://openai.com/index/introducing-gpt-5-4/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.1</a>. 
- \[25\] K. Opsahl-Ong, M. J. Ryan, J. Purtell, D. Broman, C. Potts, M. Zaharia, and O. Khattab (2024)  Optimizing instructions and demonstrations for multi-stage language model programs.  In Proceedings of the 2024 Conference on Empirical Methods in Natural Language Processing, Y. Al-Onaizan, M. Bansal, and Y. Chen (Eds.),  Miami, Florida, USA, pp. 9340–9366.  External Links: <a href="https://dx.doi.org/10.18653/v1/2024.emnlp-main.525" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="https://aclanthology.org/2024.emnlp-main.525/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[26\] J. Pan, X. Wang, G. Neubig, N. Jaitly, H. Ji, A. Suhr, and Y. Zhang (2025)  Training software engineering agents and verifiers with swe-gym.  In Forty-Second International Conference on Machine Learning,  External Links: <a href="https://openreview.net/forum?id=Cq1BNvHx74" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[27\] P. Rajasekaran, E. Dixon, C. Ryan, J. Hadfield, R. Ayub, H. Moran, C. Rueb, C. Jennings, M. Vorwerck, S. Ritchie, and M. Vo (2025)  Effective context engineering for ai agents.  External Links: <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Agent Debugger: layered trajectory evidence ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§3.2</a>. 
- \[28\] P. Rajasekaran (2026)  Harness design for long-running application development.  External Links: <a href="https://www.anthropic.com/engineering/harness-design-long-running-apps" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[29\] N. Research (2026)  Hermes agent — the agent that grows with you.  External Links: <a href="https://hermes-agent.nousresearch.com/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[30\] N. Shinn, F. Cassano, A. Gopinath, K. R. Narasimhan, and S. Yao (2023)  Reflexion: language agents with verbal reinforcement learning.  In Thirty-Seventh Conference on Neural Information Processing Systems,  External Links: <a href="https://openreview.net/forum?id=vAElhFcKW6" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[31\] P. Steinberger (2026)  OpenClaw — personal ai assistant.  External Links: <a href="https://openclaw.ai/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[32\] R. Sutton (2019)  The bitter lesson.  External Links: <a href="https://www.cs.utexas.edu/~eunsol/courses/data/bitter_lesson.pdf" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p5.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>. 
- \[33\] N. Team, Y. Cai, L. Chen, Q. Chen, Y. Ding, L. Fan, W. Fu, Y. Gao, H. Guo, P. Guo, Z. Han, Z. He, H. Hu, K. Hu, S. Hua, T. Huai, B. Huang, L. Ji, Z. Jiang, Z. Lei, B. Li, J. Lin, L. Lin, J. Liu, S. Liu, Z. Liu, Y. Ni, P. Qian, Y. Shen, Q. Shi, W. Shu, P. Sun, Y. Suo, T. Tang, B. Tian, G. Wang, J. Wang, P. Wang, Z. Xi, H. Yan, J. Yang, Z. Yang, T. Yao, G. Ye, Q. Yu, S. Zhang, X. Zhang, Y. Zhang, J. Zhao, M. Zheng, R. Zheng, E. Zhou, J. Zhou, M. Zhou, Y. Zhou, T. Gui, Y. Zheng, X. Chen, J. Zhou, S. Feng, Q. Chen, L. He, Q. Zhang, X. Huang, and X. Qiu (2025)  Nex-n1: agentic models trained via a unified ecosystem for large-scale environment construction.   arXiv.  External Links: 2512.04987, <a href="https://dx.doi.org/10.48550/arXiv.2512.04987" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2512.04987" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 NexAU: an editable, decoupled harness substrate ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§3.1</a>. 
- \[34\] Q. Team (2026)  Qwen3.6-plus: towards real world agents.  External Links: <a href="https://qwenlm.github.io/blog/qwen3.6/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.1</a>. 
- \[35\] V. Trivedy (2026)  Improving deep agents with harness engineering.  External Links: <a href="https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[36\] G. Wang, Y. Xie, Y. Jiang, A. Mandlekar, C. Xiao, Y. Zhu, L. Fan, and A. Anandkumar (2023)  Voyager: an open-ended embodied agent with large language models.   arXiv.  External Links: 2305.16291, <a href="https://dx.doi.org/10.48550/arXiv.2305.16291" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2305.16291" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[37\] X. Wang, B. Li, Y. Song, F. F. Xu, X. Tang, M. Zhuge, J. Pan, Y. Song, B. Li, J. Singh, H. H. Tran, F. Li, R. Ma, M. Zheng, B. Qian, Y. Shao, N. Muennighoff, Y. Zhang, B. Hui, J. Lin, R. Brennan, H. Peng, H. Ji, and G. Neubig (2025)  OpenHands: an open platform for ai software developers as generalist agents.   arXiv.  External Links: 2407.16741, <a href="https://dx.doi.org/10.48550/arXiv.2407.16741" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2407.16741" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[38\] A. Yang, A. Li, B. Yang, B. Zhang, B. Hui, B. Zheng, B. Yu, C. Gao, C. Huang, C. Lv, C. Zheng, D. Liu, F. Zhou, F. Huang, F. Hu, H. Ge, H. Wei, H. Lin, J. Tang, J. Yang, J. Tu, J. Zhang, J. Yang, J. Yang, J. Zhou, J. Zhou, J. Lin, K. Dang, K. Bao, K. Yang, L. Yu, L. Deng, M. Li, M. Xue, M. Li, P. Zhang, P. Wang, Q. Zhu, R. Men, R. Gao, S. Liu, S. Luo, T. Li, T. Tang, W. Yin, X. Ren, X. Wang, X. Zhang, X. Ren, Y. Fan, Y. Su, Y. Zhang, Y. Zhang, Y. Wan, Y. Liu, Z. Wang, Z. Cui, Z. Zhang, Z. Zhou, and Z. Qiu (2025)  Qwen3 technical report.   arXiv.  External Links: 2505.09388, <a href="https://dx.doi.org/10.48550/arXiv.2505.09388" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2505.09388" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.1</a>. 
- \[39\] J. Yang, C. E. Jimenez, A. Wettig, K. Lieret, S. Yao, K. R. Narasimhan, and O. Press (2024)  SWE-agent: agent-computer interfaces enable automated software engineering.  In The Thirty-Eighth Annual Conference on Neural Information Processing Systems,  External Links: <a href="https://openreview.net/forum?id=mXpq6ut8J3&amp;referrer=%5Bthe%20profile%20of%20Shunyu%20Yao%5D(%2Fprofile%3Fid%3D~Shunyu_Yao1)" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[40\] J. Yang, C. E. Jimenez, A. L. Zhang, K. Lieret, J. Yang, X. Wu, O. Press, N. Muennighoff, G. Synnaeve, K. R. Narasimhan, D. Yang, S. Wang, and O. Press (2024)  SWE-bench multimodal: do ai systems generalize to visual software domains?.  In The Thirteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=riTiq3i21b" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[41\] Y. Zeng, S. Li, D. Dong, R. Xu, Z. Chen, L. Zheng, Y. Li, Z. Zhou, H. Zhao, L. Tian, H. Xiao, T. Zhu, L. Hao, and J. Wu (2026)  SWE-hub: a unified production system for scalable, executable software engineering tasks.   arXiv.  External Links: 2603.00575, <a href="https://dx.doi.org/10.48550/arXiv.2603.00575" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2603.00575" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[42\] J. Zhang, J. Xiang, Z. Yu, F. Teng, X. Chen, J. Chen, M. Zhuge, X. Cheng, S. Hong, J. Wang, B. Zheng, B. Liu, Y. Luo, and C. Wu (2024)  AFlow: automating agentic workflow generation.  In The Thirteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=z5uVAKwmjf" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[43\] Q. Zhang, C. Hu, S. Upasani, B. Ma, F. Hong, V. Kamanuru, J. Rainton, C. Wu, M. Ji, H. Li, U. Thakker, J. Zou, and K. Olukotun (2025)  Agentic context engineering: evolving contexts for self-improving language models.  In The Fourteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=eC4ygDs02R" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S1.p6.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>, <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 RQ1: Main Results ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§4.2</a>. 
- \[44\] A. Zhao, D. Huang, Q. Xu, M. Lin, Y. Liu, and G. Huang (2024)  ExpeL: llm agents are experiential learners.   arXiv.  External Links: 2308.10144, <a href="https://dx.doi.org/10.48550/arXiv.2308.10144" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2308.10144" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>. 
- \[45\] W. Zhou, Y. Ou, S. Ding, L. Li, J. Wu, T. Wang, J. Chen, S. Wang, X. Xu, N. Zhang, H. Chen, and Y. E. Jiang (2024)  Symbolic learning enables self-evolving agents.   arXiv.  External Links: 2406.18532, <a href="https://dx.doi.org/10.48550/arXiv.2406.18532" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="http://arxiv.org/abs/2406.18532" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Automated Optimization of LLM Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.2</a>. 
- \[46\] T. Y. Zhuo, V. M. Chien, J. Chim, H. Hu, W. Yu, R. Widyasari, I. N. B. Yusuf, H. Zhan, J. He, I. Paul, S. Brunner, C. Gong, J. Hoang, A. R. Zebaze, X. Hong, W. Li, J. Kaddour, M. Xu, Z. Zhang, P. Yadav, N. Jain, A. Gu, Z. Cheng, J. Liu, Q. Liu, Z. Wang, B. Hui, N. Muennighoff, D. Lo, D. Fried, X. Du, H. de Vries, and L. V. Werra (2024)  BigCodeBench: benchmarking code generation with diverse function calls and complex instructions.  In The Thirteenth International Conference on Learning Representations,  External Links: <a href="https://openreview.net/forum?id=YrycTjllL0" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering and Evaluation for Coding Agents ‣ 2 Related Work ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§2.1</a>. 
- \[47\] G. Zunic (2026)  The bitter lesson of agent harnesses.  External Links: <a href="https://browser-use.com/posts/bitter-lesson-agent-harnesses" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p5.1" class="ltx_ref" title="1 Introduction ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">§1</a>. 





## Appendix A Experimental Setup: Full Details



This appendix expands the condensed Setup in §<a href="#S4.SS1" class="ltx_ref" title="4.1 Setup ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.1</a> with the formal metric definitions and the runtime infrastructure.





##### Seed agent.



The seed configuration, denoted NexAU<sub>0</sub>, is a simple code agent built on the NexAU framework of §<a href="#S3.SS1" class="ltx_ref" title="3.1 NexAU: an editable, decoupled harness substrate ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3.1</a> that exposes only the bash tool to the model, with no skills, no middleware, and no long-term memory. Every iteration of the AHE outer loop edits this workspace, so all reported gains are measured against NexAU<sub>0</sub> as the common starting point.







##### Runtime infrastructure.



All runs use the NexAU framework of §<a href="#S3.SS1" class="ltx_ref" title="3.1 NexAU: an editable, decoupled harness substrate ‣ 3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3.1</a> to instantiate the coding agent. Harbor dispatches tasks, isolates each rollout, and verifies pass/fail. Every rollout runs inside a fresh E2B remote sandbox, so shell side-effects cannot leak between tasks. InMemoryTracer records trajectories and mirrors them to Langfuse. The Agent Debugger executes at concurrency 16 with a 600-second per-task timeout.







##### Terminal-bench difficulty labels.



The official terminal-bench-2 leaderboard<sup>0</sup><sup>0</sup> 0 <a href="https://www.tbench.ai/benchmarks/terminal-bench-2" class="ltx_ref ltx_url ltx_font_typewriter">https://www.tbench.ai/benchmarks/terminal-bench-2</a> partitions the 89-task subset into 4 easy, 55 medium, and 30 hard tasks.







##### pass@1.



For a configuration on a task set $`D`$ with $`k`$ rollouts per task, let $`r_{i,j}\in\{0,1\}`$ denote the binary reward of rollout $`j`$ on task $`i`$. The pass@1 score is the mean

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{pass@1}=\frac{1}{k|D|}\sum_{i=1}^{|D|}\sum_{j=1}^{k}r_{i,j}.
``` |  | (1) |

Trials that terminate on an infrastructure exception, such as a sandbox crash or API timeout, contribute $`r=0`$ rather than being dropped, a strictly harsher convention than discarding failures that keeps our numbers comparable to the official terminal-bench leaderboard. The rollout count $`k`$ varies across experiments; each table states it explicitly.







##### Token cost and Succ/Mtok.



For token cost we count every LLM call as prompt plus completion across the rollout and report the mean over completed trials in thousands, denoted Tokens k; infrastructure-aborted trials are excluded to avoid truncated figures. To compare configurations that trade accuracy for cost we combine the two via

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathrm{Succ/Mtok}=\frac{\mathrm{pass@1}\times 10^{6}}{\mathrm{mean\ tokens\ per\ trial}},
``` |  | (2) |

the expected number of successes per million tokens. The main paper reports pass@1 and Tokens k separately so each axis stays legible; Table <a href="#A1.T4" class="ltx_ref" title="Table 4 ‣ Token cost and Succ/Mtok. ‣ Appendix A Experimental Setup: Full Details ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4</a> folds them into Succ/Mtok per repository on SWE-bench-verified, derived from the pass@1 and Tokens k columns of Table <a href="#S4.T2" class="ltx_ref" title="Table 2 ‣ 4.3 RQ2: Generalization to Unseen Tasks and Base Models ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">2</a>.



<figure id="A1.T4" class="ltx_table">
<table id="A1.T4.6" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A1.T4.6.1" class="ltx_tr">
<th id="A1.T4.6.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt" style="padding-top: 0.25pt; padding-bottom: 0.25pt">Repo</th>
<th id="A1.T4.6.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_th_row ltx_border_tt" style="padding-top: 0.25pt; padding-bottom: 0.25pt"><em>N</em></th>
<th id="A1.T4.6.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-top: 0.25pt; padding-bottom: 0.25pt">ACE</th>
<th id="A1.T4.6.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-top: 0.25pt; padding-bottom: 0.25pt">TF-GRPO</th>
<th id="A1.T4.6.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-top: 0.25pt; padding-bottom: 0.25pt">NexAU<sub>0</sub></th>
<th id="A1.T4.6.1.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-top: 0.25pt; padding-bottom: 0.25pt">AHE</th>
</tr>
<tr id="A1.T4.6.2" class="ltx_tr">
<th id="A1.T4.6.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">All</th>
<th id="A1.T4.6.2.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_th_row ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">500</th>
<th id="A1.T4.6.2.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.10</th>
<th id="A1.T4.6.2.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.27</th>
<th id="A1.T4.6.2.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.43</th>
<th id="A1.T4.6.2.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.64</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A1.T4.6.3" class="ltx_tr">
<th id="A1.T4.6.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">django</th>
<th id="A1.T4.6.3.2" class="ltx_td ltx_align_center ltx_th ltx_th_row ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">231</th>
<td id="A1.T4.6.3.3" class="ltx_td ltx_align_center ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.12</td>
<td id="A1.T4.6.3.4" class="ltx_td ltx_align_center ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.35</td>
<td id="A1.T4.6.3.5" class="ltx_td ltx_align_center ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.50</td>
<td id="A1.T4.6.3.6" class="ltx_td ltx_align_center ltx_border_t" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.67</td>
</tr>
<tr id="A1.T4.6.4" class="ltx_tr">
<th id="A1.T4.6.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">sympy</th>
<th id="A1.T4.6.4.2" class="ltx_td ltx_align_center ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">75</th>
<td id="A1.T4.6.4.3" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.15</td>
<td id="A1.T4.6.4.4" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.19</td>
<td id="A1.T4.6.4.5" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.43</td>
<td id="A1.T4.6.4.6" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.48</td>
</tr>
<tr id="A1.T4.6.5" class="ltx_tr">
<th id="A1.T4.6.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">sphinx-doc</th>
<th id="A1.T4.6.5.2" class="ltx_td ltx_align_center ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">44</th>
<td id="A1.T4.6.5.3" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">0.62</td>
<td id="A1.T4.6.5.4" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">0.78</td>
<td id="A1.T4.6.5.5" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">0.93</td>
<td id="A1.T4.6.5.6" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.07</td>
</tr>
<tr id="A1.T4.6.6" class="ltx_tr">
<th id="A1.T4.6.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">matplotlib</th>
<th id="A1.T4.6.6.2" class="ltx_td ltx_align_center ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">34</th>
<td id="A1.T4.6.6.3" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.14</td>
<td id="A1.T4.6.6.4" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.33</td>
<td id="A1.T4.6.6.5" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.51</td>
<td id="A1.T4.6.6.6" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.88</td>
</tr>
<tr id="A1.T4.6.7" class="ltx_tr">
<th id="A1.T4.6.7.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">scikit-learn</th>
<th id="A1.T4.6.7.2" class="ltx_td ltx_align_center ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">32</th>
<td id="A1.T4.6.7.3" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">2.08</td>
<td id="A1.T4.6.7.4" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">2.48</td>
<td id="A1.T4.6.7.5" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">3.06</td>
<td id="A1.T4.6.7.6" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">3.40</td>
</tr>
<tr id="A1.T4.6.8" class="ltx_tr">
<th id="A1.T4.6.8.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">pydata</th>
<th id="A1.T4.6.8.2" class="ltx_td ltx_align_center ltx_th ltx_th_row" style="padding-top: 0.25pt; padding-bottom: 0.25pt">22</th>
<td id="A1.T4.6.8.3" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.37</td>
<td id="A1.T4.6.8.4" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.50</td>
<td id="A1.T4.6.8.5" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">2.00</td>
<td id="A1.T4.6.8.6" class="ltx_td ltx_align_center" style="padding-top: 0.25pt; padding-bottom: 0.25pt">2.15</td>
</tr>
<tr id="A1.T4.6.9" class="ltx_tr">
<th id="A1.T4.6.9.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding-top: 0.25pt; padding-bottom: 0.25pt">astropy</th>
<th id="A1.T4.6.9.2" class="ltx_td ltx_align_center ltx_th ltx_th_row ltx_border_bb" style="padding-top: 0.25pt; padding-bottom: 0.25pt">22</th>
<td id="A1.T4.6.9.3" class="ltx_td ltx_align_center ltx_border_bb" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.08</td>
<td id="A1.T4.6.9.4" class="ltx_td ltx_align_center ltx_border_bb" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.26</td>
<td id="A1.T4.6.9.5" class="ltx_td ltx_align_center ltx_border_bb" style="padding-top: 0.25pt; padding-bottom: 0.25pt">0.82</td>
<td id="A1.T4.6.9.6" class="ltx_td ltx_align_center ltx_border_bb" style="padding-top: 0.25pt; padding-bottom: 0.25pt">1.81</td>
</tr>
</tbody>
</table>
<figcaption>Table 4: Cost-efficiency on SWE-bench-verified, reported as Succ/Mtok, the expected successes per million tokens. Values are derived from Table <a href="#S4.T2" class="ltx_ref" title="Table 2 ‣ 4.3 RQ2: Generalization to Unseen Tasks and Base Models ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">2</a> as pass@1 × 10<sup>3</sup>/Tokens k. Higher is better. Per-row bold marks the best.</figcaption>
</figure>







## Appendix B Prompts and Configurations



This appendix gathers the prompts that drive the AHE outer loop together with the seed code agent’s system prompt. The five blocks below reproduce the literal contents of the corresponding files in the public repository at <a href="https://github.com/china-qijizhifeng/agentic-harness-engineering" class="ltx_ref ltx_url ltx_font_typewriter">https://github.com/china-qijizhifeng/agentic-harness-engineering</a> as of the commit that produced the experiments in Section <a href="#S4" class="ltx_ref" title="4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4</a>. Jinja-style {{ var }} placeholders are filled in by the harness at runtime.





### B.1 Code Agent Seed System Prompt



The seed system prompt loaded into NexAU<sub>0</sub> at iteration 1. It is intentionally minimal: a single tool, three behavioral rules, and three runtime-injected variables. Every iteration after iteration 1 may append rules to this file, and the case study in Appendix <a href="#A3" class="ltx_ref" title="Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">C</a> traces the first such append.













### B.2 Evolve Agent Prompt



The Evolve Agent’s system prompt encodes the three hard contracts described in Section <a href="#S3" class="ltx_ref" title="3 Method ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">3</a>: workspace-only controllability, evidence-driven changes, and the change-manifest deliverable. It also embeds the directory layout the agent must reason over and the JSON shape of the manifest.













### B.3 Explore Agent Prompts



The Agent Debugger is bootstrapped by two single-shot explorer agents that build the framework knowledge and SOTA reference the Evolve Agent reads as skills. Both prompts enforce a write-early-write-often pattern so the produced skill files are always available even on partial completion.





#### B.3.1 Source-code Exploration Agent











#### B.3.2 Web-research Agent















## Appendix C Qualitative Case Study



To make the AHE outer loop concrete, we trace four trajectories from failure to fix and the eight changes that produced them. The four trajectories correspond to the four peaks in the best-so-far curve of Figure : trajectory 1 to peak 1 at iteration 2, trajectory 2 to peak 2 at iteration 5, trajectory 3 to peak 3 at iteration 6, and trajectory 4 to peak 4 at iteration 8. We split the case study into two parts. Section <a href="#A3.SS1" class="ltx_ref" title="C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">C.1</a> narrates the failing-versus-passing rollouts for each of the four trajectories. Section <a href="#A3.SS2" class="ltx_ref" title="C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">C.2</a> documents the chg-\* manifest entries shipped by the Evolve Agent on each of the four winning rounds. Trajectory visualizations for trajectories 1 and 3 appear in Figures <a href="#A3.F5" class="ltx_ref" title="Figure 5 ‣ Trajectory before and after the iteration-2 changes. ‣ C.1.1 Trajectory 1: db-wal-recovery ‣ C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">5</a> and <a href="#A3.F6" class="ltx_ref" title="Figure 6 ‣ Trajectory before and after the iteration-6 changes. ‣ C.1.3 Trajectory 3: mcmc-sampling-stan ‣ C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">6</a>; the four manifest figures appear in Figures <a href="#A3.F7" class="ltx_ref" title="Figure 7 ‣ C.2.1 Iteration 2: prompt rules and shell-timeout argument ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">7</a>, <a href="#A3.F8" class="ltx_ref" title="Figure 8 ‣ C.2.2 Iteration 5: publish-state mechanism (prompt rules + shell-tool guard) ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">8</a>, <a href="#A3.F9" class="ltx_ref" title="Figure 9 ‣ C.2.3 Iteration 6: protected entrypoints and execution-risk middleware ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">9</a>, and <a href="#A3.F10" class="ltx_ref" title="Figure 10 ‣ C.2.4 Iteration 8: hard blocks and FRAMEWORK reminders ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">10</a>. Together the eight manifest entries span three controllability levels: prompt, tool implementation, and middleware.





### C.1 Trajectories: failing versus passing rollouts



#### C.1.1 Trajectory 1: db-wal-recovery



##### The task.



db-wal-recovery asks the agent to reconstruct a SQLite database from a corrupted write-ahead log file, abbreviated WAL, by applying both new-row inserts and value updates encoded in the WAL, and to emit the reconstructed table as /app/recovered.json. The verifier is exact: it loads the JSON and asserts every row’s fields against a known ground truth, including updated values on pre-existing rows.







##### Trajectory before and after the iteration-2 changes.



On the NexAU<sub>0</sub> seed the task passed 1 of 2 rollouts. The failing rollout, summarized in the left column of Figure <a href="#A3.F5" class="ltx_ref" title="Figure 5 ‣ Trajectory before and after the iteration-2 changes. ‣ C.1.1 Trajectory 1: db-wal-recovery ‣ C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">5</a>, recovered the WAL bytes from a stale shell buffer, invented the missing rows from a guessed pattern, missed that the WAL also encoded mutations to pre-existing rows, and submitted on a self-check that only counted entries. The Agent Debugger grouped this failure under the broader pattern “proxy validation instead of evaluator-isomorphic validation”, where the rollout closes on a surrogate check such as row count, file exists, or script runs rather than on the evaluator’s exact assertions. After the iteration-2 changes are installed, four of the eight new rules fire on this trajectory and are listed in the middle column of Figure <a href="#A3.F5" class="ltx_ref" title="Figure 5 ‣ Trajectory before and after the iteration-2 changes. ‣ C.1.1 Trajectory 1: db-wal-recovery ‣ C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">5</a>, each mapped left to the failure step it catches and right to the corresponding step in the passing rollout. The contract-first rule reroutes the agent off the cached-stdout shortcut and forces a re-read of the spec that recasts “WAL changes” as mutations of existing rows. The no-overfit rule blocks the value = id times 100 extrapolation from 5 visible samples. The mirror-the-evaluator rule replaces the json length == 11 self-check with an end-state sweep that asserts the same fields the hidden verifier asserts. db-wal-recovery then passes 2/2 on the next evaluation and remains 2/2 across every subsequent iteration of the run. The Evolve Agent’s predicted_fixes field for chg-1 did not list db-wal-recovery; the edit was proposed for a different cluster of partial-pass tasks, yet its general phrasing carried it across, illustrating how AHE converts a single-task symptom into a reusable harness rule.



<figure id="A3.F5" class="ltx_figure">

















<figcaption>Figure 5: Three-column trajectory comparison for db-wal-recovery before and after chg-1. Both rollouts share the same random seed and the same first three steps S1 to S3, summarized in the banner above the columns. The left column lists the four divergence steps F1 to F4 of the failing rollout. The middle column lists the four chg-1 rules out of eight that fire on this trajectory, each annotated with the failure step it catches. The right column lists the corresponding steps P1 to P5 of the passing rollout. Each F to R to P chain reads across one row of the figure: a failure mode, the rule that names and forbids that failure mode, and the step the rule produces in the passing rollout. chg-1 is a 68-line append to workspace/systemprompt.md with no mention of SQLite, WAL, or db-wal-recovery; the full manifest entry appears in Figure <a href="#A3.F7" class="ltx_ref" title="Figure 7 ‣ C.2.1 Iteration 2: prompt rules and shell-timeout argument ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">7</a>.</figcaption>
</figure>







#### C.1.2 Trajectory 2: path-tracing



The first trajectory shows a single round of evolution flipping one task. The second shows how the iteration-5 round, which targeted a cross-task “post-validation state destruction” regression, raised the score on tasks the evolve agent had not necessarily named, including path-tracing.





##### The task.



path-tracing asks the agent to implement a path tracer that renders a scene description into /app/reconstructed.ppm. The verifier reads that single output file and compares it pixel-for-pixel against a reference image; nothing else in the working tree is read.







##### Trajectory before and after the iteration-5 changes.



At iteration 4 the task scored 0/2. The shared failure mode in both rollouts was a four-step sequence: the agent rendered a correct /app/reconstructed.ppm, ran a self-check that confirmed the image matched a structural acceptance criterion, then issued a sweeping cleanup command of the form rm -rf /app/image /app/reconstructed.ppm /app/scratch as a final tidy-up step, and submitted on the shell exit code of that cleanup. The verifier subsequently found no reconstructed.ppm on disk and rejected the rollout. The seed harness’s prompt advice against “destroying verified state” was already present, but no execution-time mechanism enforced it. At iteration 5 path-tracing flips from 0/2 to 2/2. In both passing rollouts the agent reaches the same render-and-self-check state as before, then issues the cleanup; the shell guard intercepts it with a message naming /app/reconstructed.ppm as protected, the agent acknowledges the message and finishes without rerunning the cleanup, and the verifier finds the correct file on disk. The same iteration-5 round also recovers polyglot-rust-c and large-scale-text-editing, both listed in the change-manifest’s predicted_fixes. configure-git-webserver, also predicted, recovers only partially at iteration 5 because its failure mode involves a state reset path that the iteration-5 guard still treats as overrideable; that gap is closed by the iteration-8 changes described in trajectory 4.









#### C.1.3 Trajectory 3: mcmc-sampling-stan



The first two trajectories each used a prompt-and-tool pair. The third shows two harness components from different controllability levels, a tool-level publish-state guard and a step-spanning middleware, working together to flip a task that had been failing for five iterations. Figure <a href="#A3.F6" class="ltx_ref" title="Figure 6 ‣ Trajectory before and after the iteration-6 changes. ‣ C.1.3 Trajectory 3: mcmc-sampling-stan ‣ C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">6</a> summarizes the before-and-after rollouts.





##### The task.



mcmc-sampling-stan asks the agent to install rstan 2.32.7, fit a hierarchical beta-binomial model to 30 observations, and write the posterior means of alpha and beta to two text files. The verifier installs the package itself and reruns the agent’s analysis.R end-to-end, then asserts alpha lies in \[2.84, 2.91\] and beta lies in \[16.1, 16.7\].







##### Trajectory before and after the iteration-6 changes.



The task scored 0/2 from iteration 1 through iteration 5. The shared failure mode, summarized in the left column of Figure <a href="#A3.F6" class="ltx_ref" title="Figure 6 ‣ Trajectory before and after the iteration-6 changes. ‣ C.1.3 Trajectory 3: mcmc-sampling-stan ‣ C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">6</a>, is a proxy-then-skip pattern in five steps: the agent computes an independent grid-integration estimate of the posterior, writes those numbers as the deliverable, fires the real MCMC sampling as a background job, kills it before completion to “preserve the already-created deliverables”, and submits on a final sweep that only checks the files exist and parse as numbers. The verifier then reruns analysis.R from scratch; the unconverged sampler produces values around 1e19, far outside the expected range. None of the prior rounds catches this trajectory: the iteration-2 prompt edit names a contract-first principle but the agent already believes the grid integration is a faithful contract; the iteration-5 publish-state guard protects the deliverable files but treats analysis.R itself as an unprotected scratch artifact. After the iteration-6 changes are installed, both rollouts run analysis.R at the full iter = 100000 to completion, cross-check against an independent scratch full run in /tmp, and publish the converged values via the new override token; the right column of Figure <a href="#A3.F6" class="ltx_ref" title="Figure 6 ‣ Trajectory before and after the iteration-6 changes. ‣ C.1.3 Trajectory 3: mcmc-sampling-stan ‣ C.1 Trajectories: failing versus passing rollouts ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">6</a> traces the passing rollout. The task passes 6/6 verifier tests in both rollouts and stays 2/2 for the next four iterations. The converged values land at alpha approximately 2.872, beta approximately 16.43, near the centers of the expected ranges. The same iteration-6 round also benefits sam-cell-seg, query-optimize, caffe-cifar-10, dna-assembly, and train-fasttext, all of which match one or more of the seven middleware patterns.



<figure id="A3.F6" class="ltx_figure">

















<figcaption>Figure 6: Three-column trajectory comparison for mcmc-sampling-stan before and after the two harness changes shipped at the start of iteration 6: the tool-level publish-state guard chg-1 at commit ff0cf3d and the middleware-level execution-risk hints chg-2 at commit 9651986, whose full manifest entry appears in Figure <a href="#A3.F9" class="ltx_ref" title="Figure 9 ‣ C.2.3 Iteration 6: protected entrypoints and execution-risk middleware ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">9</a>. The banner shows the shared prefix S1 to S3. The left column lists the five divergence steps F1 to F5 of the failing rollout at iteration 5. The middle column lists the iteration-6 components that fire on this trajectory, each annotated with the failure steps it catches. The right column lists the corresponding steps P1 to P5 of the passing rollout at iteration 6. The task stays 2/2 for the next four evaluation rounds.</figcaption>
</figure>







#### C.1.4 Trajectory 4: configure-git-webserver



The fourth trajectory shows the evolve agent doubling back on its own prior decisions. By iteration 7 the publish-state guard had been carried over for three rounds, the middleware for two, and the score had regressed from 75.8 to 73.0. Rather than roll either back, the iteration-7 round patched a loophole in the guard and a salience gap in the middleware; both patches turn out to be load-bearing for configure-git-webserver.





##### The task.



configure-git-webserver asks the agent to set up a git repository under /git/server, configure a webserver that serves the working tree under /git/www, deploy a hello-world page, and produce a configuration in which the externally observable URL returns the expected content. The verifier issues an HTTP request from outside the agent’s shell and reads the response body.







##### Trajectory before and after the iteration-8 changes.



At iteration 7 the task scored 0/2. The failing rollout reached a fully working deployment, ran a curl-against-localhost self-check that returned the right body, and then issued two cleanup commands prefixed with ALLOW_POST_SUCCESS_RESET: one deletion of /git/www/hello.html and one reset of /git/server/refs/heads/master to an empty state, both rationalized as “leaving a clean repo for grading”. The shell tool’s iteration-5 guard caught these as overrideable resets and let them through once the override token was attached. The external verifier then received a 404 and rejected the rollout. git-multibranch failed in iteration 7 for the same structural reason. In parallel, polyglot-c-py and pytorch-model-recovery failed at iteration 7 with a different but related symptom: the iteration-6 middleware had already emitted the right warnings about clean-layout violation and inline-helper validation, but the warnings were appended only to the tool output, and on the very next model turn the agent ignored them and published. After the iteration-8 changes are installed, configure-git-webserver flips from 0/2 to 2/2. Both rollouts reach the same successful deployment as before, attempt the same overrideable cleanup commands, and have them refused at the shell layer with hard-block messages naming the protected web root and protected ref; the agent acknowledges the messages, drops the cleanup, and submits the live state. git-multibranch flips along the same path. polyglot-c-py, polyglot-rust-c, pytorch-model-recovery, and mteb-retrieve flip via the middleware path: in each, the FRAMEWORK reminder injected before the next model turn carries enough salience for the agent to fix the violation rather than publish over it. Iteration 8’s overall score lands at 76.97, the run’s high-water mark on Figure , and the single biggest jump of the run.











### C.2 Changes shipped on the four winning rounds



#### C.2.1 Iteration 2: prompt rules and shell-timeout argument



The Evolve Agent’s response after iteration 1 was two changes. Change chg-1 at commit c0b8a05 is a 68-line append to workspace/systemprompt.md with no mention of SQLite, WAL, or db-wal-recovery; the appended block contains eight numbered rules covering acceptance-contract extraction, evaluator mirroring, minimal-edit semantics, candidate scoring, generalization, time budgeting, end-state readiness, and a stop rule. Change chg-2 at commit 169c34c is a tool-implementation edit that exposes the shell timeout as a per-call argument with a higher ceiling, addressing a class of failures in which the seed harness silently truncated long-running setup commands. Both manifest entries appear in Figure <a href="#A3.F7" class="ltx_ref" title="Figure 7 ‣ C.2.1 Iteration 2: prompt rules and shell-timeout argument ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">7</a>.



<figure id="A3.F7" class="ltx_figure">








<figcaption>Figure 7: Two change-manifest entries written in iteration 1, one editing the system prompt and one editing the shell tool. Both appear in the same change_manifest.json produced by the evolve agent, then enter Phase 3 of the next round as binding contracts that the attribution check rolls back if their predicted fixes do not materialize.</figcaption>
</figure>





#### C.2.2 Iteration 5: publish-state mechanism (prompt rules + shell-tool guard)



The Evolve Agent shipped two complementary changes at the iteration-4 boundary, both written for iteration 5. Change chg-7 at commit 3ba3a90 edits workspace/systemprompt.md together with the descriptor of run_shell_command; it adds three rules to the harness’s working memory: a publish-state rule that names the post-acceptance filesystem state as the deliverable surface, a scratch-directory rule for tasks with constrained delivery layouts, and a literal-output rule for DSL, config, and script outputs in which equivalence is judged at the byte level. Change chg-8 at commit 4e0aab9 edits workspace/tools/shell_tools/run_shell_command.py; it installs a stateful publish-state guard inside the shell tool with three behaviors. First, when the shell observes a successful evaluator-style final check, it parses the acceptance command for explicit file paths and roots and records them as protected. Second, when a later command would delete a protected output or reset a protected root, the guard intercepts the command before execution and returns a targeted error explaining which protected target is at risk. Third, the guard accepts an explicit ALLOW_POST_SUCCESS_RESET token from the agent that downgrades the block to a warning and forces the agent to revalidate before submitting. The two changes are paired by design: chg-7 tells the model what publish state is, chg-8 stops the agent from destroying it even when the model forgets the rule. Both manifest entries appear in Figure <a href="#A3.F8" class="ltx_ref" title="Figure 8 ‣ C.2.2 Iteration 5: publish-state mechanism (prompt rules + shell-tool guard) ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">8</a>.



<figure id="A3.F8" class="ltx_figure">








<figcaption>Figure 8: The two change-manifest entries written together at the iteration-4 boundary and shipped as the iteration-5 harness. chg-7 names the publish-state rule in the system prompt and tool descriptor; chg-8 installs the execution-time interlock inside the shell tool. The pair flips path-tracing on the next round.</figcaption>
</figure>





#### C.2.3 Iteration 6: protected entrypoints and execution-risk middleware



The Evolve Agent shipped two complementary changes for iteration 6. Change chg-1 at commit ff0cf3d extends the publish-state guard so that script entrypoints tied to the named evaluator become protected after a passing check, with an explicit ALLOW_POST_SUCCESS_RESET token required to override; the token at every successful submit in the passing rollout is the externally visible evidence that the guard is engaged, not silently bypassed. Change chg-2 at commit 9651986 introduces the ExecutionRiskHintsMiddleware; the middleware watches the live sequence of shell commands and tool outputs and emits a targeted note when it detects any of seven cross-step risk patterns: shallow validation that relies on -h, py_compile, or pure existence checks; localhost-only service validation when the contract names an external endpoint; inline or self-written proxy validators replacing a named evaluator; lower-level model or internal API access when the contract names a specific wrapper; benchmark checks with no explicit golden or threshold comparator; repeated long runs that have already exhausted budget for a known failure mode; and repeated retries against the same error. The two patterns relevant to trajectory 3 are inline-proxy validation and shallow validation, which together cover the F1 to F5 sequence: the grid-integration proxy and the kill of analysis.R are the proxy-validator pattern, and the file-existence sweep without a tolerance comparator is the shallow-validation pattern. The shell tool change covers F4 specifically: with analysis.R now protected, the kill becomes a guarded action that requires the override token and forces a revalidation pass before submit. Both manifest entries appear in Figure <a href="#A3.F9" class="ltx_ref" title="Figure 9 ‣ C.2.3 Iteration 6: protected entrypoints and execution-risk middleware ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">9</a>.



<figure id="A3.F9" class="ltx_figure">








<figcaption>Figure 9: The two change-manifest entries shipped as the iteration-6 harness. chg-1 extends the iteration-5 publish-state guard from deliverable files to script entrypoints, the missing piece that protects analysis.R in mcmc-sampling-stan. chg-2 introduces the first cross-step component in this run, namely the ExecutionRiskHintsMiddleware watching the live command history for seven risk patterns.</figcaption>
</figure>





#### C.2.4 Iteration 8: hard blocks and FRAMEWORK reminders



The Evolve Agent shipped two changes for iteration 8 that explicitly keep the prior architecture and patch its weak points. Change chg-1 at commit ca35f53 edits workspace/tools/shell_tools/run_shell_command.py and upgrades two soft reasons to hard blocks: deletion of any non-/tmp protected output is now a hard block, and reset of any non-/tmp protected root is now a hard block. The ALLOW_POST_SUCCESS_RESET token can still downgrade other classes of post-success interlocks but can no longer wipe verified live deliverables or empty live roots. Change chg-2 at commit a4a4a29 edits workspace/middleware/execution_risk_hints.py and adds three behaviors. First, a new before_model hook promotes any execution-risk note emitted on the previous step into a FRAMEWORK reminder visible in the next model turn, so the warning becomes part of the reasoning context rather than text appended after the tool output. Second, the middleware infers two contract types once per task from the user request: clean-layout or single-file delivery contracts, and official-wrapper or named-revision contracts. Third, the middleware adds two contract-aware after-tool heuristics: a warning when the agent compiles or builds inside a clean-layout live tree, and a warning when the contract names an official wrapper or revision but the command uses a raw SentenceTransformer or AutoModel style API instead. Both changes are deliberately scoped: chg-1 prevents the destructive shell command itself, chg-2 makes the right warning impossible to overlook on the very next model turn. Both manifest entries appear in Figure <a href="#A3.F10" class="ltx_ref" title="Figure 10 ‣ C.2.4 Iteration 8: hard blocks and FRAMEWORK reminders ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">10</a>.



<figure id="A3.F10" class="ltx_figure">








<figcaption>Figure 10: Two change-manifest entries written together at the iteration-7 boundary and shipped as the iteration-8 harness. chg-1 hardens the existing publish-state shell guard so that the override token can no longer wipe verified live deliverables. chg-2 makes execution-risk warnings impossible to overlook at the next model turn and adds two contract-aware heuristics. Both are deliberately scoped: chg-1 prevents the destructive command itself, chg-2 fixes the salience gap of the iteration-6 middleware.</figcaption>
</figure>







### C.3 Reading the change-manifest figures



The trajectories above track individual edits through individual tasks. The change-manifest carries each edit along with its predicted fixes, predicted regressions, and constraint level into Phase 3 of the next iteration, where the attribution check decides whether to keep or roll it back. One manifest figure is attached to each of the four winning rounds, all in the same Files / What changed / Failure pattern fixed / Predicted fixes layout. Figure <a href="#A3.F7" class="ltx_ref" title="Figure 7 ‣ C.2.1 Iteration 2: prompt rules and shell-timeout argument ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">7</a> shows iteration 2’s prompt edit and shell-tool edit written together in the seed round. Figure <a href="#A3.F8" class="ltx_ref" title="Figure 8 ‣ C.2.2 Iteration 5: publish-state mechanism (prompt rules + shell-tool guard) ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">8</a> shows iteration 5’s prompt-and-descriptor rule and shell-guard installation that introduce the publish-state mechanism. Figure <a href="#A3.F9" class="ltx_ref" title="Figure 9 ‣ C.2.3 Iteration 6: protected entrypoints and execution-risk middleware ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">9</a> shows iteration 6’s extension of the publish-state guard to script entrypoints and the introduction of the cross-step ExecutionRiskHintsMiddleware. Figure <a href="#A3.F10" class="ltx_ref" title="Figure 10 ‣ C.2.4 Iteration 8: hard blocks and FRAMEWORK reminders ‣ C.2 Changes shipped on the four winning rounds ‣ Appendix C Qualitative Case Study ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">10</a> shows iteration 8’s keep-and-improve patches that close the override-token loophole on the guard and promote middleware reminders into a FRAMEWORK note visible at the next model turn. Together the four figures cover three of the four constraint levels the evolve agent uses, namely prompt, tool implementation, and middleware, all written in the same JSON shape and all subject to the same automatic rollback if their predicted fixes do not appear.









## Appendix D Per-round Self-attribution Breakdown



This appendix expands the aggregate self-attribution result of §<a href="#S4.SS4.SSS2" class="ltx_ref" title="4.4.2 RQ3b: how reliably the loop’s self-attribution tracks reality ‣ 4.4 RQ3: Analysis ‣ 4 Experiments ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">4.4.2</a> with a per-round breakdown across the four fix/regression by precision/recall panels.





<a href="#A4.F11" class="ltx_ref" title="In Appendix D Per-round Self-attribution Breakdown ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">Figures 11</a> and <a href="#A4.F12" class="ltx_ref" title="Figure 12 ‣ Appendix D Per-round Self-attribution Breakdown ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">12</a> show the per-round breakdown across the four fix/regression by precision/recall panels. Bars decompose each denominator, predicted for precision and actual for recall, into deep-blue TP versus pale FP or FN; the dashed line traces the metric on the right-hand $`0`$ to $`100\%`$ axis, and the solid line shows contemporaneous pass@1. Fix-precision and fix-recall both swing from near-zero to near-saturation across rounds, so the evolve model’s causal attribution for its own improvements is informative if noisy. Regression predictions instead stay near the floor, below $`25\%`$ on most rounds: across the 9 rounds the agent issued 43 unique regression predictions and only 5 landed, giving cumulative $`P=11.6\%`$, while 40 regressions the agent did not foresee actually occurred, giving cumulative $`R=11.1\%`$.



<figure id="A4.F11" class="ltx_figure">












<figcaption>Figure 11: Per-round fix predictions. Left: precision. Right: recall. Bars decompose each denominator into TP versus FP or FN; lines overlay the metric and contemporaneous pass@1.</figcaption>
</figure>

<figure id="A4.F12" class="ltx_figure">












<figcaption>Figure 12: Per-round regression predictions. Left: precision. Right: recall. Same encoding as Fig. <a href="#A4.F11" class="ltx_ref" title="Figure 11 ‣ Appendix D Per-round Self-attribution Breakdown ‣ Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses">11</a>.</figcaption>
</figure>





## Appendix E Technical Appendices and Supplementary Material



Technical appendices with additional results, figures, graphs and proofs may be submitted with the paper submission before the full submission deadline (see above), or as a separate PDF in the ZIP file below before the supplementary material deadline. There is no page limit for the technical appendices.











## NeurIPS Paper Checklist



The checklist is designed to encourage best practices for responsible machine learning research, addressing issues of reproducibility, transparency, research ethics, and societal impact. Do not remove the checklist: The papers not including the checklist will be desk rejected. The checklist should follow the references and follow the (optional) supplemental material. The checklist does NOT count towards the page limit.





Please read the checklist guidelines carefully for information on how to answer these questions. For each question in the checklist:

- •
  

  You should answer \[Yes\] , \[No\] , or \[N/A\] .

  
- •
  

  \[N/A\]  means either that the question is Not Applicable for that particular paper or the relevant information is Not Available.

  
- •
  

  Please provide a short justification of one or two sentences right after your answer, also for NA.

  





The checklist answers are an integral part of your paper submission. They are visible to the reviewers, area chairs, senior area chairs, and ethics reviewers. You will be asked to also include it (after eventual revisions) with the final version of your paper, and its final version will be published with the paper.





The reviewers of your paper will be asked to use the checklist as one of the factors in their evaluation. While "\[Yes\] " is generally preferable to "\[No\] ", it is perfectly acceptable to answer "\[No\] " provided a proper justification is given (e.g., "error bars are not reported because it would be too computationally expensive" or "we were unable to find the license for the dataset we used"). In general, answering "\[No\] " or "\[N/A\] " is not grounds for rejection. While the questions are phrased in a binary way, we acknowledge that the true answer is often more nuanced, so please just use your best judgment and write a justification to elaborate. All supporting evidence can appear either in the main paper or the supplemental material, provided in appendix. If you answer \[Yes\]  to a question, in the justification please point to the section(s) where related material for the question can be found.





IMPORTANT, please:

- •
  

  Delete this instruction block, but keep the section heading “NeurIPS Paper Checklist",

  
- •
  

  Keep the checklist subsection headings, questions/answers and guidelines below.

  
- •
  

  Do not modify the questions and only use the provided macros for your answers.

  





1.  1.
    

    Claims

    
2.  
    

    Question: Do the main claims made in the abstract and introduction accurately reflect the paper’s contributions and scope?

    
3.  
    

    Answer: \[TODO\]

    
4.  
    

    Justification: \justificationTODO

    
5.  
    

    Guidelines:

    - •
      

      The answer NA means that the abstract and introduction do not include the claims made in the paper.

      
    - •
      

      The abstract and/or introduction should clearly state the claims made, including the contributions made in the paper and important assumptions and limitations. A No or NA answer to this question will not be perceived well by the reviewers.

      
    - •
      

      The claims made should match theoretical and experimental results, and reflect how much the results can be expected to generalize to other settings.

      
    - •
      

      It is fine to include aspirational goals as motivation as long as it is clear that these goals are not attained by the paper.

      

    
6.  2.
    

    Limitations

    
7.  
    

    Question: Does the paper discuss the limitations of the work performed by the authors?

    
8.  
    

    Answer: \[TODO\]

    
9.  
    

    Justification: \justificationTODO

    
10. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper has no limitation while the answer No means that the paper has limitations, but those are not discussed in the paper.

      
    - •
      

      The authors are encouraged to create a separate "Limitations" section in their paper.

      
    - •
      

      The paper should point out any strong assumptions and how robust the results are to violations of these assumptions (e.g., independence assumptions, noiseless settings, model well-specification, asymptotic approximations only holding locally). The authors should reflect on how these assumptions might be violated in practice and what the implications would be.

      
    - •
      

      The authors should reflect on the scope of the claims made, e.g., if the approach was only tested on a few datasets or with a few runs. In general, empirical results often depend on implicit assumptions, which should be articulated.

      
    - •
      

      The authors should reflect on the factors that influence the performance of the approach. For example, a facial recognition algorithm may perform poorly when image resolution is low or images are taken in low lighting. Or a speech-to-text system might not be used reliably to provide closed captions for online lectures because it fails to handle technical jargon.

      
    - •
      

      The authors should discuss the computational efficiency of the proposed algorithms and how they scale with dataset size.

      
    - •
      

      If applicable, the authors should discuss possible limitations of their approach to address problems of privacy and fairness.

      
    - •
      

      While the authors might fear that complete honesty about limitations might be used by reviewers as grounds for rejection, a worse outcome might be that reviewers discover limitations that aren’t acknowledged in the paper. The authors should use their best judgment and recognize that individual actions in favor of transparency play an important role in developing norms that preserve the integrity of the community. Reviewers will be specifically instructed to not penalize honesty concerning limitations.

      

    
11. 3.
    

    Theory assumptions and proofs

    
12. 
    

    Question: For each theoretical result, does the paper provide the full set of assumptions and a complete (and correct) proof?

    
13. 
    

    Answer: \[TODO\]

    
14. 
    

    Justification: \justificationTODO

    
15. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not include theoretical results.

      
    - •
      

      All the theorems, formulas, and proofs in the paper should be numbered and cross-referenced.

      
    - •
      

      All assumptions should be clearly stated or referenced in the statement of any theorems.

      
    - •
      

      The proofs can either appear in the main paper or the supplemental material, but if they appear in the supplemental material, the authors are encouraged to provide a short proof sketch to provide intuition.

      
    - •
      

      Inversely, any informal proof provided in the core of the paper should be complemented by formal proofs provided in appendix or supplemental material.

      
    - •
      

      Theorems and Lemmas that the proof relies upon should be properly referenced.

      

    
16. 4.
    

    Experimental result reproducibility

    
17. 
    

    Question: Does the paper fully disclose all the information needed to reproduce the main experimental results of the paper to the extent that it affects the main claims and/or conclusions of the paper (regardless of whether the code and data are provided or not)?

    
18. 
    

    Answer: \[TODO\]

    
19. 
    

    Justification: \justificationTODO

    
20. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not include experiments.

      
    - •
      

      If the paper includes experiments, a No answer to this question will not be perceived well by the reviewers: Making the paper reproducible is important, regardless of whether the code and data are provided or not.

      
    - •
      

      If the contribution is a dataset and/or model, the authors should describe the steps taken to make their results reproducible or verifiable.

      
    - •
      

      Depending on the contribution, reproducibility can be accomplished in various ways. For example, if the contribution is a novel architecture, describing the architecture fully might suffice, or if the contribution is a specific model and empirical evaluation, it may be necessary to either make it possible for others to replicate the model with the same dataset, or provide access to the model. In general. releasing code and data is often one good way to accomplish this, but reproducibility can also be provided via detailed instructions for how to replicate the results, access to a hosted model (e.g., in the case of a large language model), releasing of a model checkpoint, or other means that are appropriate to the research performed.

      
    - •
      

      While NeurIPS does not require releasing code, the conference does require all submissions to provide some reasonable avenue for reproducibility, which may depend on the nature of the contribution. For example

      1.  (a)
          

          If the contribution is primarily a new algorithm, the paper should make it clear how to reproduce that algorithm.

          
      2.  (b)
          

          If the contribution is primarily a new model architecture, the paper should describe the architecture clearly and fully.

          
      3.  (c)
          

          If the contribution is a new model (e.g., a large language model), then there should either be a way to access this model for reproducing the results or a way to reproduce the model (e.g., with an open-source dataset or instructions for how to construct the dataset).

          
      4.  (d)
          

          We recognize that reproducibility may be tricky in some cases, in which case authors are welcome to describe the particular way they provide for reproducibility. In the case of closed-source models, it may be that access to the model is limited in some way (e.g., to registered users), but it should be possible for other researchers to have some path to reproducing or verifying the results.

          

      

    
21. 5.
    

    Open access to data and code

    
22. 
    

    Question: Does the paper provide open access to the data and code, with sufficient instructions to faithfully reproduce the main experimental results, as described in supplemental material?

    
23. 
    

    Answer: \[TODO\]

    
24. 
    

    Justification: \justificationTODO

    
25. 
    

    Guidelines:

    - •
      

      The answer NA means that paper does not include experiments requiring code.

      
    - •
      

      Please see the NeurIPS code and data submission guidelines (<a href="https://nips.cc/public/guides/CodeSubmissionPolicy" class="ltx_ref ltx_url ltx_font_typewriter">https://nips.cc/public/guides/CodeSubmissionPolicy</a>) for more details.

      
    - •
      

      While we encourage the release of code and data, we understand that this might not be possible, so “No” is an acceptable answer. Papers cannot be rejected simply for not including code, unless this is central to the contribution (e.g., for a new open-source benchmark).

      
    - •
      

      The instructions should contain the exact command and environment needed to run to reproduce the results. See the NeurIPS code and data submission guidelines (<a href="https://nips.cc/public/guides/CodeSubmissionPolicy" class="ltx_ref ltx_url ltx_font_typewriter">https://nips.cc/public/guides/CodeSubmissionPolicy</a>) for more details.

      
    - •
      

      The authors should provide instructions on data access and preparation, including how to access the raw data, preprocessed data, intermediate data, and generated data, etc.

      
    - •
      

      The authors should provide scripts to reproduce all experimental results for the new proposed method and baselines. If only a subset of experiments are reproducible, they should state which ones are omitted from the script and why.

      
    - •
      

      At submission time, to preserve anonymity, the authors should release anonymized versions (if applicable).

      
    - •
      

      Providing as much information as possible in supplemental material (appended to the paper) is recommended, but including URLs to data and code is permitted.

      

    
26. 6.
    

    Experimental setting/details

    
27. 
    

    Question: Does the paper specify all the training and test details (e.g., data splits, hyperparameters, how they were chosen, type of optimizer, etc.) necessary to understand the results?

    
28. 
    

    Answer: \[TODO\]

    
29. 
    

    Justification: \justificationTODO

    
30. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not include experiments.

      
    - •
      

      The experimental setting should be presented in the core of the paper to a level of detail that is necessary to appreciate the results and make sense of them.

      
    - •
      

      The full details can be provided either with the code, in appendix, or as supplemental material.

      

    
31. 7.
    

    Experiment statistical significance

    
32. 
    

    Question: Does the paper report error bars suitably and correctly defined or other appropriate information about the statistical significance of the experiments?

    
33. 
    

    Answer: \[TODO\]

    
34. 
    

    Justification: \justificationTODO

    
35. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not include experiments.

      
    - •
      

      The authors should answer "Yes" if the results are accompanied by error bars, confidence intervals, or statistical significance tests, at least for the experiments that support the main claims of the paper.

      
    - •
      

      The factors of variability that the error bars are capturing should be clearly stated (for example, train/test split, initialization, random drawing of some parameter, or overall run with given experimental conditions).

      
    - •
      

      The method for calculating the error bars should be explained (closed form formula, call to a library function, bootstrap, etc.)

      
    - •
      

      The assumptions made should be given (e.g., Normally distributed errors).

      
    - •
      

      It should be clear whether the error bar is the standard deviation or the standard error of the mean.

      
    - •
      

      It is OK to report 1-sigma error bars, but one should state it. The authors should preferably report a 2-sigma error bar than state that they have a 96% CI, if the hypothesis of Normality of errors is not verified.

      
    - •
      

      For asymmetric distributions, the authors should be careful not to show in tables or figures symmetric error bars that would yield results that are out of range (e.g. negative error rates).

      
    - •
      

      If error bars are reported in tables or plots, The authors should explain in the text how they were calculated and reference the corresponding figures or tables in the text.

      

    
36. 8.
    

    Experiments compute resources

    
37. 
    

    Question: For each experiment, does the paper provide sufficient information on the computer resources (type of compute workers, memory, time of execution) needed to reproduce the experiments?

    
38. 
    

    Answer: \[TODO\]

    
39. 
    

    Justification: \justificationTODO

    
40. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not include experiments.

      
    - •
      

      The paper should indicate the type of compute workers CPU or GPU, internal cluster, or cloud provider, including relevant memory and storage.

      
    - •
      

      The paper should provide the amount of compute required for each of the individual experimental runs as well as estimate the total compute.

      
    - •
      

      The paper should disclose whether the full research project required more compute than the experiments reported in the paper (e.g., preliminary or failed experiments that didn’t make it into the paper).

      

    
41. 9.
    

    Code of ethics

    
42. 
    

    Question: Does the research conducted in the paper conform, in every respect, with the NeurIPS Code of Ethics <a href="https://neurips.cc/public/EthicsGuidelines" class="ltx_ref ltx_url ltx_font_typewriter">https://neurips.cc/public/EthicsGuidelines</a>?

    
43. 
    

    Answer: \[TODO\]

    
44. 
    

    Justification: \justificationTODO

    
45. 
    

    Guidelines:

    - •
      

      The answer NA means that the authors have not reviewed the NeurIPS Code of Ethics.

      
    - •
      

      If the authors answer No, they should explain the special circumstances that require a deviation from the Code of Ethics.

      
    - •
      

      The authors should make sure to preserve anonymity (e.g., if there is a special consideration due to laws or regulations in their jurisdiction).

      

    
46. 10.
    

    Broader impacts

    
47. 
    

    Question: Does the paper discuss both potential positive societal impacts and negative societal impacts of the work performed?

    
48. 
    

    Answer: \[TODO\]

    
49. 
    

    Justification: \justificationTODO

    
50. 
    

    Guidelines:

    - •
      

      The answer NA means that there is no societal impact of the work performed.

      
    - •
      

      If the authors answer NA or No, they should explain why their work has no societal impact or why the paper does not address societal impact.

      
    - •
      

      Examples of negative societal impacts include potential malicious or unintended uses (e.g., disinformation, generating fake profiles, surveillance), fairness considerations (e.g., deployment of technologies that could make decisions that unfairly impact specific groups), privacy considerations, and security considerations.

      
    - •
      

      The conference expects that many papers will be foundational research and not tied to particular applications, let alone deployments. However, if there is a direct path to any negative applications, the authors should point it out. For example, it is legitimate to point out that an improvement in the quality of generative models could be used to generate deepfakes for disinformation. On the other hand, it is not needed to point out that a generic algorithm for optimizing neural networks could enable people to train models that generate Deepfakes faster.

      
    - •
      

      The authors should consider possible harms that could arise when the technology is being used as intended and functioning correctly, harms that could arise when the technology is being used as intended but gives incorrect results, and harms following from (intentional or unintentional) misuse of the technology.

      
    - •
      

      If there are negative societal impacts, the authors could also discuss possible mitigation strategies (e.g., gated release of models, providing defenses in addition to attacks, mechanisms for monitoring misuse, mechanisms to monitor how a system learns from feedback over time, improving the efficiency and accessibility of ML).

      

    
51. 11.
    

    Safeguards

    
52. 
    

    Question: Does the paper describe safeguards that have been put in place for responsible release of data or models that have a high risk for misuse (e.g., pretrained language models, image generators, or scraped datasets)?

    
53. 
    

    Answer: \[TODO\]

    
54. 
    

    Justification: \justificationTODO

    
55. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper poses no such risks.

      
    - •
      

      Released models that have a high risk for misuse or dual-use should be released with necessary safeguards to allow for controlled use of the model, for example by requiring that users adhere to usage guidelines or restrictions to access the model or implementing safety filters.

      
    - •
      

      Datasets that have been scraped from the Internet could pose safety risks. The authors should describe how they avoided releasing unsafe images.

      
    - •
      

      We recognize that providing effective safeguards is challenging, and many papers do not require this, but we encourage authors to take this into account and make a best faith effort.

      

    
56. 12.
    

    Licenses for existing assets

    
57. 
    

    Question: Are the creators or original owners of assets (e.g., code, data, models), used in the paper, properly credited and are the license and terms of use explicitly mentioned and properly respected?

    
58. 
    

    Answer: \[TODO\]

    
59. 
    

    Justification: \justificationTODO

    
60. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not use existing assets.

      
    - •
      

      The authors should cite the original paper that produced the code package or dataset.

      
    - •
      

      The authors should state which version of the asset is used and, if possible, include a URL.

      
    - •
      

      The name of the license (e.g., CC-BY 4.0) should be included for each asset.

      
    - •
      

      For scraped data from a particular source (e.g., website), the copyright and terms of service of that source should be provided.

      
    - •
      

      If assets are released, the license, copyright information, and terms of use in the package should be provided. For popular datasets, <a href="https://paperswithcode.com/datasets" class="ltx_ref ltx_url ltx_font_typewriter">paperswithcode.com/datasets</a> has curated licenses for some datasets. Their licensing guide can help determine the license of a dataset.

      
    - •
      

      For existing datasets that are re-packaged, both the original license and the license of the derived asset (if it has changed) should be provided.

      
    - •
      

      If this information is not available online, the authors are encouraged to reach out to the asset’s creators.

      

    
61. 13.
    

    New assets

    
62. 
    

    Question: Are new assets introduced in the paper well documented and is the documentation provided alongside the assets?

    
63. 
    

    Answer: \[TODO\]

    
64. 
    

    Justification: \justificationTODO

    
65. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not release new assets.

      
    - •
      

      Researchers should communicate the details of the dataset/code/model as part of their submissions via structured templates. This includes details about training, license, limitations, etc.

      
    - •
      

      The paper should discuss whether and how consent was obtained from people whose asset is used.

      
    - •
      

      At submission time, remember to anonymize your assets (if applicable). You can either create an anonymized URL or include an anonymized zip file.

      

    
66. 14.
    

    Crowdsourcing and research with human subjects

    
67. 
    

    Question: For crowdsourcing experiments and research with human subjects, does the paper include the full text of instructions given to participants and screenshots, if applicable, as well as details about compensation (if any)?

    
68. 
    

    Answer: \[TODO\]

    
69. 
    

    Justification: \justificationTODO

    
70. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not involve crowdsourcing nor research with human subjects.

      
    - •
      

      Including this information in the supplemental material is fine, but if the main contribution of the paper involves human subjects, then as much detail as possible should be included in the main paper.

      
    - •
      

      According to the NeurIPS Code of Ethics, workers involved in data collection, curation, or other labor should be paid at least the minimum wage in the country of the data collector.

      

    
71. 15.
    

    Institutional review board (IRB) approvals or equivalent for research with human subjects

    
72. 
    

    Question: Does the paper describe potential risks incurred by study participants, whether such risks were disclosed to the subjects, and whether Institutional Review Board (IRB) approvals (or an equivalent approval/review based on the requirements of your country or institution) were obtained?

    
73. 
    

    Answer: \[TODO\]

    
74. 
    

    Justification: \justificationTODO

    
75. 
    

    Guidelines:

    - •
      

      The answer NA means that the paper does not involve crowdsourcing nor research with human subjects.

      
    - •
      

      Depending on the country in which research is conducted, IRB approval (or equivalent) may be required for any human subjects research. If you obtained IRB approval, you should clearly state this in the paper.

      
    - •
      

      We recognize that the procedures for this may vary significantly between institutions and locations, and we expect authors to adhere to the NeurIPS Code of Ethics and the guidelines for their institution.

      
    - •
      

      For initial submissions, do not include any information that would break anonymity (if applicable), such as the institution conducting the review.

      

    
76. 16.
    

    Declaration of LLM usage

    
77. 
    

    Question: Does the paper describe the usage of LLMs if it is an important, original, or non-standard component of the core methods in this research? Note that if the LLM is used only for writing, editing, or formatting purposes and does not impact the core methodology, scientific rigorousness, or originality of the research, declaration is not required.

    
78. 
    

    Answer: \[TODO\]

    
79. 
    

    Justification: \justificationTODO

    
80. 
    

    Guidelines:

    - •
      

      The answer NA means that the core method development in this research does not involve LLMs as any important, original, or non-standard components.

      
    - •
      

      Please refer to our LLM policy (<a href="https://neurips.cc/Conferences/2025/LLM" class="ltx_ref ltx_url ltx_font_typewriter">https://neurips.cc/Conferences/2025/LLM</a>) for what should or should not be described.

      

    











Experimental support, please <a href="./2604.25850v1/__stdout.txt" class="ltx_ref" target="_blank" rel="nofollow">view the build logs</a> for errors. Generated by <a href="https://math.nist.gov/~BMiller/LaTeXML/" class="ltx_ref ltx_LaTeXML_logo" target="_blank"> L A T E  xml </a> .





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


