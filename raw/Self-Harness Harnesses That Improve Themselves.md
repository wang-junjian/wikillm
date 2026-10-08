---
title: "Self-Harness: Harnesses That Improve Themselves"
source: "https://arxiv.org/abs/2606.09498"
author: "Hangfan Zhang, Shao Zhang, Kangcong Li, Chen Zhang"
published: 2026-06
created: 2026-10-09
description:
tags:
  - "clippings"
---

# Self-Harness: Harnesses That Improve ThemselvesThanks: Corresponding Authors



 Hangfan Zhang     Shao Zhang     Kangcong Li     Chen Zhang  Affiliation: Yang Chen,  Yiqun Zhang,  Lei Bai,   Shuyue Hu<sup>1</sup><sup>1</sup>footnotemark:  1   Affiliation: Shanghai Artificial Intelligence Laboratory  Email: [{zhanghangfan,zhangshao,hushuyue}@pjlab.org.cn](mailto:) 





###### Abstract

The performance of LLM-based agents is jointly shaped by their base models and the harnesses that mediate their interaction with the environment. Because different models exhibit distinct behaviors, effective harness design is inherently model-specific. Yet agent harnesses are still largely engineered by human experts, a paradigm that scales poorly as modern LLMs become increasingly diverse and rapidly evolving. In this paper, we introduce *Self-Harness*, a new paradigm in which an LLM-based agent improves its own operating harness, without relying on human engineers or stronger external agents. We operationalize Self-Harness as an iterative loop with three stages: Weakness Mining, which identifies model-specific failure patterns from execution traces; Harness Proposal, which generates diverse yet minimal harness modifications tied to these failures; and Proposal Validation, which accepts candidate edits only after regression testing. We instantiate Self-Harness on Terminal-Bench-2.0 using a minimal initial harness and three base models from diverse families: MiniMax M2.5, Qwen3.5-35B-A3B, and GLM-5. Across all three models, Self-Harness consistently improves performance, with held-out pass rates increasing from 40.5% to 61.9%, 23.8% to 38.1%, and 42.9% to 57.1%, respectively. Qualitative analyses further show that Self-Harness does not simply add generic instructions, but effectively turns model-specific weaknesses into concrete, executable harness changes. These results suggest a path toward LLM-based agents that are not merely shaped by their harnesses, but can also participate in reshaping them.





> For a conscious being, to exist is to change, to change is to mature, to mature is to go on creating oneself endlessly.
>
> —Henri Bergson, Creative Evolution





## 1 Introduction



To date, LLM-based agents are not shaped by their base model alone, but also by their *harness*: the surrounding system that situates the model and mediates its interaction with the environment. Although there is no universally accepted definition, a harness may include system prompts, tools, runtime mechanisms, verification rules, orchestration logic, and failure-recovery procedures. The same base model can thus exhibit substantially different performance under different harnesses \[<a href="#bib.bib11" class="ltx_ref">28</a>, <a href="#bib.bib21" class="ltx_ref">5</a>, <a href="#bib.bib32" class="ltx_ref">8</a>\].





From early frameworks such as ReAct \[<a href="#bib.bib8" class="ltx_ref">29</a>\] to product- and platform-level systems such as Claude Code, Codex, and OpenHands, harnesses have largely been engineered by human experts \[<a href="#bib.bib29" class="ltx_ref">9</a>, <a href="#bib.bib26" class="ltx_ref">16</a>, <a href="#bib.bib12" class="ltx_ref">24</a>, <a href="#bib.bib30" class="ltx_ref">36</a>, <a href="#bib.bib33" class="ltx_ref">35</a>\]. While effective, this human-centered paradigm does not scale well with the diversity and rapid evolution of modern LLMs. Different models can exhibit distinct behavioral patterns, tool-use habits, error modes, and sensitivities to prompting \[<a href="#bib.bib3" class="ltx_ref">22</a>, <a href="#bib.bib2" class="ltx_ref">21</a>, <a href="#bib.bib10" class="ltx_ref">18</a>\]; consequently, a harness that works well for one model may be suboptimal for another \[<a href="#bib.bib3" class="ltx_ref">22</a>, <a href="#bib.bib21" class="ltx_ref">5</a>, <a href="#bib.bib32" class="ltx_ref">8</a>\]. As new models continue to be released at a rapid pace, manually redesigning and tuning a model-specific harness for each model becomes increasingly costly and untenable.



<figure id="S1.F1" class="ltx_figure">
<img src="2606.09498v1/figures/sh1.png" id="S1.F1.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/162;" width="476" height="162" alt="Refer to caption" />
<figcaption>Figure 1: Three paradigms of harness improvement. In human harness engineering, human engineers manually revise the agent harness. In Meta-Harness, a stronger external agent guides the improvement of a weaker target agent. In Self-Harness, the agent improves its own operating harness.</figcaption>
</figure>



In this paper, we explore a novel paradigm, *Self-Harness*: enabling an LLM-based agent to improve the very harness through which it operates (Figure <a href="#S1.F1" class="ltx_ref" title="Figure 1 ‣ 1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">1</a>). Unlike recent approaches that use stronger external agents to improve the harnesses of weaker ones \[<a href="#bib.bib21" class="ltx_ref">5</a>, <a href="#bib.bib32" class="ltx_ref">8</a>\], Self-Harness seeks to internalize this improvement loop within the target agent itself. This paradigm reduces dependence on external guidance that may be costly, unavailable for frontier models, or mismatched to the target model’s failure modes. More broadly, in Bergson’s terms, this points toward a technical analogue of self-creation: a system not merely changed from without, but continually “going on creating itself.”





We operationalize Self-Harness as an improvement loop that repeatedly turns behavioral evidence into harness updates (Figure <a href="#S3.F2" class="ltx_ref" title="Figure 2 ‣ 3.1 Preliminary ‣ 3 Self-Harness: An Iterative Loop for Model-Specific Harness Improvement ‣ Self-Harness: Harnesses That Improve Themselves">2</a>). The loop consists of three stages. Weakness Mining: Starting from an initial harness, the agent with a fixed model is run on a set of tasks, producing execution traces with verifiable outcomes. The agent then clusters failed traces, allowing it to reason about model-specific failure patterns rather than isolated mistakes. Harness Proposal: Based on these failure patterns, the agent generates a small set of diverse yet minimal harness modifications, each tied to a specific failure mechanism. This constraint ensures that proposed edits remain targeted rather than overly general. Proposal Validation: Candidate modifications are evaluated through regression tests, and an edit is promoted only if it improves performance without causing measurable degradation on held-out tasks. If multiple candidate modifications pass the regression tests, they are merged into the next version of the harness, which then serves as the starting point for the next iteration.





In our experiments, we instantiate Self-Harness with a minimal initial harness (Figure <a href="#S4.F3" class="ltx_ref" title="Figure 3 ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">3</a>) and three base models from diverse families: MiniMax M2.5, Qwen3.5-35B-A3B, and GLM-5 \[<a href="#bib.bib28" class="ltx_ref">2</a>, <a href="#bib.bib27" class="ltx_ref">20</a>, <a href="#bib.bib25" class="ltx_ref">14</a>\]. On Terminal-Bench-2.0, Self-Harness consistently improves performance across all three models (Figure <a href="#S4.F4" class="ltx_ref" title="Figure 4 ‣ Metrics. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">4</a>). For held-in tasks, which provide execution traces to the evaluation system, the pass rate is increased from 43.0% to 50.0% for MiniMax M2.5, from 15.1% to 36.0% for Qwen3.5-35B-A3B, and from 47.7% to 57.0% for GLM-5. For held-out tasks, whose execution traces are never used as inputs to the evaluation system, the improvements remain substantial. The pass rate is increased from 40.5% to 61.9% for MiniMax M2.5, from 23.8% to 38.1% for Qwen3.5-35B-A3B, and from 42.9% to 57.1% for GLM-5. These results indicate that Self-Harness can evolve an initial harness into model-specific ones better suited to different base models. Moreover, it can discover broadly useful harness modifications that generalize to unseen tasks rather than merely overfitting to observed evaluation failures.





Qualitative analyses further show that Self-Harness does more than simply make the prompt longer or add generic instructions. Instead, it introduces targeted changes that reflect the recurring problems each model encounters during execution, turning model-specific weaknesses into concrete harness-level interventions. For MiniMax M2.5, the changes encourage the agent to create required output files earlier, handle structured tool outputs more carefully, and stop unproductive tool-use loops before they become too long. For Qwen3.5-35B-A3B, the changes focus on checking dependencies in advance, avoiding repeated failed commands, breaking cycles of endless exploration, and reminding the agent to produce the required artifacts after tool errors. For GLM-5, the changes mainly help the agent preserve environment settings across shell commands and move more quickly from exploration to implementation and testing. Notably, Self-Harness can also introduce broader structural mechanisms, such as subagent-based decomposition and middleware creation, that go beyond local failure repair and improve the overall organization of problem solving.





To summarize, our key contributions are as follows:

- •
  

  We propose Self-Harness, a novel paradigm for harness improvement that enables an LLM-based agent to design and refine the harness through which it operates, tailoring it to its own base model without human engineering effort or guidance from a stronger external agent.

  
- •
  

  We operationalize Self-Harness as an iterative loop that turns each model’s behavioral evidence into model-specific harness updates: it evaluates execution traces to identify recurring failure patterns, generates diverse yet minimal candidate edits, and promotes only those that pass regression tests.

  
- •
  

  Experiments on Terminal-Bench-2.0 show that Self-Harness improves performance across 3 models from diverse families, with absolute gains of up to 21.4 percentage points and relative improvements of up to 138%; qualitative analyses further confirm that different models benefit from distinct harness changes, suggesting that Self-Harness can turn model-specific weaknesses into concrete harness changes.

  







## 2 Background and Related Work



#### From prompts to agent harnesses.



Prompt engineering and context engineering show that fixed models can be steered by instructions, demonstrations, retrieved evidence, memory, tool state, and dynamically constructed inputs \[<a href="#bib.bib1" class="ltx_ref">10</a>, <a href="#bib.bib4" class="ltx_ref">25</a>, <a href="#bib.bib2" class="ltx_ref">21</a>, <a href="#bib.bib5" class="ltx_ref">6</a>, <a href="#bib.bib6" class="ltx_ref">17</a>, <a href="#bib.bib7" class="ltx_ref">12</a>, <a href="#bib.bib35" class="ltx_ref">26</a>, <a href="#bib.bib36" class="ltx_ref">7</a>\]. Agentic systems extend this control surface from a single input to an execution environment: the model acts, observes consequences, uses tools, receives feedback, and follows runtime policies. ReAct, SWE-agent, Claude Code, and SemaClaw/OpenClaw illustrate how such surrounding mechanisms shape long-horizon agent behavior and software-engineering performance \[<a href="#bib.bib8" class="ltx_ref">29</a>, <a href="#bib.bib11" class="ltx_ref">28</a>, <a href="#bib.bib29" class="ltx_ref">9</a>, <a href="#bib.bib30" class="ltx_ref">36</a>\].





We use *harness* for this surrounding system layer: prompts, tools, memory, verification rules, permission policies, adapters, and runtime mechanisms that mediate between the model and the environment. Many important agent failures are failures of this layer rather than failures of an isolated model response: an agent may report success without checking an artifact, retry an unproductive action pattern, lose the source of truth in a long context, or lack a recovery action. These behaviors emerge from the interaction between instructions, observations, tools, and runtime control, so improving them requires changing more than prompt text.







#### Self-improving agents and automated agent design.



A growing line of work studies systems that adapt their inputs, memories, contexts, or workflows over time \[<a href="#bib.bib9" class="ltx_ref">23</a>, <a href="#bib.bib37" class="ltx_ref">32</a>, <a href="#bib.bib13" class="ltx_ref">34</a>, <a href="#bib.bib18" class="ltx_ref">31</a>\]. Reflexion stores verbal feedback for later attempts \[<a href="#bib.bib9" class="ltx_ref">23</a>\], agentic context engineering evolves contexts for later model calls \[<a href="#bib.bib13" class="ltx_ref">34</a>\], and STOP studies recursive self-improvement for code generation \[<a href="#bib.bib18" class="ltx_ref">31</a>\]. These methods show that fixed models can benefit from accumulated feedback, but the adapted object is usually a response strategy, memory, context, or generated program rather than a declared agent harness state.





A second line optimizes agent designs from outside the evaluated agent. Automated Design of Agentic Systems searches over agent designs, language agents can be represented as optimizable graphs, and Meta-Harness directly optimizes harness code using source code, scores, and traces from prior candidates \[<a href="#bib.bib19" class="ltx_ref">3</a>, <a href="#bib.bib20" class="ltx_ref">37</a>, <a href="#bib.bib21" class="ltx_ref">5</a>\]. These systems motivate harness-level optimization, but they frame improvement as an external search or optimization process rather than as a bounded edit proposed by the evaluated model under its current harness.





Finally, scientific discovery and self-evolving agent systems such as The AI Scientist, AI Scientist-v2, AlphaEvolve, Alita, Godel Agent, and Darwin Godel Machine automate broader loops of research, algorithm design, or capability expansion \[<a href="#bib.bib16" class="ltx_ref">11</a>, <a href="#bib.bib17" class="ltx_ref">27</a>, <a href="#bib.bib15" class="ltx_ref">15</a>, <a href="#bib.bib14" class="ltx_ref">19</a>, <a href="#bib.bib22" class="ltx_ref">30</a>, <a href="#bib.bib23" class="ltx_ref">33</a>, <a href="#bib.bib34" class="ltx_ref">1</a>\]. Self-Harness is closest in spirit to this self-improvement literature and to automated harness optimization, but it studies a narrower controlled setting: whether the same fixed model, operating under the current harness, can propose a bounded candidate change to the harness that governs its own future behavior.









## 3 Self-Harness: An Iterative Loop for Model-Specific Harness Improvement



Human harness engineering improves agent harnesses through expert inspection and manual revision, while external optimizer approaches treat harness design choices as a searchable space. Self-Harness studies a middle ground in which a fixed model iteratively improves the harness around itself through an explicit self-improvement loop driven by execution evidence. In each iteration, the evaluation system runs the current harness and mines recurring failure patterns from clustered execution traces to produce structured evidence. Given this evidence, the same model is invoked in a proposer role to generate a set of diverse yet minimal candidate harness modifications, each targeting a specific failure mechanism without replacing the overall control architecture. Candidate edits are then validated through regression testing on held-out tasks, and an explicit acceptance rule promotes only those edits that improve performance without introducing unacceptable regressions.





### 3.1 Preliminary



We use *harness* to denote the non-parametric scaffolding that governs how a fixed language model is deployed as an agent. A harness includes the instructions, the available tools, memory and state-management mechanisms, etc. The harness does not modify the model parameters; instead, it specifies the execution protocol through which the model observes a task, takes actions, invokes tools, checks intermediate artifacts, and produces a final answer.





Formally, let $`M`$ be a fixed language model and let $`h`$ denote an agent harness. Given a task instance $`x`$, running $`M`$ under harness $`h`$ produces an execution trace $`\tau`$ and an output $`y`$. The trace records the messages, tool calls, and verifier outcomes. An evaluator then maps the task, trace, and output to a behavioral outcome, such as pass/fail. In this work, the model $`M`$ and evaluator $`\mathcal{E}`$ are held fixed, while the harness is treated as the object of improvement. Self-Harness therefore operates over a lineage of harnesses $`h_{0},h_{1},\ldots`$, where each transition corresponds to a bounded edit to the execution protocol rather than an update to the model weights.



<figure id="S3.F2" class="ltx_figure">

<figcaption>Figure 2:  Overview of one Self-Harness optimization loop. The current harness <em>h</em><sub><em>t</em></sub> with fixed model is evaluated on tasks to collect execution traces, which are clustered into verifier-grounded failure patterns. The same model is then invoked under the current harness as a proposer, using the mined failure patterns to generate bounded candidate harness edits. Candidate edits are evaluated by regression tests on held-in and held-out splits. Accepted candidates are merged to update the harness to <em>h</em><sub><em>t</em> + 1</sub>, while rejected candidates are logged without changing the active harness. Throughout the loop, the model weights and evaluator remain fixed; only the surrounding harness is modified. </figcaption>
</figure>

<figure id="alg1" class="ltx_float ltx_float_algorithm ltx_framed ltx_framed_top">


1: fixed model <em>M</em>, initial harness <em>h</em><sub>0</sub>, held-in split <em>D</em><sub>in</sub>, held-out split <em>D</em><sub>ho</sub>, evaluator ℰ, proposal width <em>K</em>, rounds <em>T</em>


2: final harness <em>h</em><sub><em>T</em></sub>


3: for <em>t</em> = 0, 1, …, <em>T</em> − 1 do


4:   $(P_{\mathrm{in}}(h_{t}),P_{\mathrm{ho}}(h_{t}),R_{t})\leftarrow\textsc{Evaluate}(M,h_{t},D_{\mathrm{in}},D_{\mathrm{ho}},\mathcal{E})$


5:   $B_{t}\leftarrow\textsc{BuildEvidenceBundle}(R_{t})$ ⊳ from held-in verifier-grounded failures 


6:   $\mathcal{P}_{t}\leftarrow\textsc{ParallelPropose}(M,h_{t},B_{t},K)$ ⊳ 𝒫<sub><em>t</em></sub> = {(<em>Δ</em><sub><em>j</em></sub>, <em>a</em><sub><em>j</em></sub>)}<sub><em>j</em> = 1</sub><sup><em>K</em></sup> 


7:   𝒜<sub><em>t</em></sub> ← ⌀


8:   for all (<em>Δ</em><sub><em>j</em></sub>, <em>a</em><sub><em>j</em></sub>) ∈ 𝒫<sub><em>t</em></sub> do


9:    <em>h</em><sub><em>t</em></sub><sup>(<em>j</em>)</sup> ← <em>Δ</em><sub><em>j</em></sub>(<em>h</em><sub><em>t</em></sub>)


10:    $(P_{\mathrm{in}}(h_{t}^{(j)}),P_{\mathrm{ho}}(h_{t}^{(j)}),R_{t}^{(j)})\leftarrow\textsc{Evaluate}(M,h_{t}^{(j)},D_{\mathrm{in}},D_{\mathrm{ho}},\mathcal{E})$


11:    <em>Δ</em><sub>in</sub><sup>(<em>j</em>)</sup> ← <em>P</em><sub>in</sub>(<em>h</em><sub><em>t</em></sub><sup>(<em>j</em>)</sup>) − <em>P</em><sub>in</sub>(<em>h</em><sub><em>t</em></sub>)


12:    <em>Δ</em><sub>ho</sub><sup>(<em>j</em>)</sup> ← <em>P</em><sub>ho</sub>(<em>h</em><sub><em>t</em></sub><sup>(<em>j</em>)</sup>) − <em>P</em><sub>ho</sub>(<em>h</em><sub><em>t</em></sub>)


13:    if <em>Δ</em><sub>in</sub><sup>(<em>j</em>)</sup> ≥ 0 and <em>Δ</em><sub>ho</sub><sup>(<em>j</em>)</sup> ≥ 0 and max (<em>Δ</em><sub>in</sub><sup>(<em>j</em>)</sup>, <em>Δ</em><sub>ho</sub><sup>(<em>j</em>)</sup>) &gt; 0 then


14:      𝒜<sub><em>t</em></sub> ← 𝒜<sub><em>t</em></sub> ∪ {(<em>h</em><sub><em>t</em></sub><sup>(<em>j</em>)</sup>, <em>Δ</em><sub><em>j</em></sub>, <em>a</em><sub><em>j</em></sub>, <em>Δ</em><sub>in</sub><sup>(<em>j</em>)</sup>, <em>Δ</em><sub>ho</sub><sup>(<em>j</em>)</sup>)}


15:      $\textsc{Accept}(\Delta_{j})$ ⊳ passed acceptance rule 


16:    else


17:      $\textsc{Reject}(\Delta_{j})$


18:    end if


19:   end for


20:   if 𝒜<sub><em>t</em></sub> = ⌀ then


21:    <em>h</em><sub><em>t</em> + 1</sub> ← <em>h</em><sub><em>t</em></sub> ⊳ no accepted candidate 


22:   else


23:    $h_{t+1}\leftarrow\textsc{MergeAccepted}(h_{t},\mathcal{A}_{t})$ ⊳ accepted edits are merged 


24:   end if


25: end for


26: return <em>h</em><sub><em>T</em></sub>


<figcaption>Algorithm 1  Self-Harness</figcaption>
</figure>





### 3.2 Weakness Mining: Identifying Failure Patterns from Clustered Execution Traces



The first stage of Self-Harness converts behavioral failures into structured evidence for harness revision. At round $`t`$, we run the fixed model $`M`$ under the current harness $`h_{t}`$ on a held-in split $`D_{\mathrm{in}}`$. For each task instance $`x_{i}\in D_{\mathrm{in}}`$, the run produces an output $`y_{i}`$ and an execution trace $`\tau_{i}`$. The evaluator $`\mathcal{E}`$ then assigns an outcome $`z_{i}=\mathcal{E}(x_{i},\tau_{i},y_{i})`$, such as pass or fail. This yields a trace record

|     |                                     |     |
|-----|-------------------------------------|-----|
|     |                                     
       ``` math                             
       r_{i}=(x_{i},\tau_{i},y_{i},z_{i}),  
       ```                                  |     |





and a round-level record set $`R_{t}=\{r_{i}\}_{i=1}^{|D_{\mathrm{in}}|}`$. Since both $`M`$ and $`\mathcal{E}`$ are fixed, changes in these records across rounds can be attributed to changes in the harness.





A central role of the evaluation system is to avoid treating failures as isolated anecdotes. We therefore focus on the subset of failed records

|     |                                                   |     |
|-----|---------------------------------------------------|-----|
|     |                                                   
       ``` math                                           
       F_{t}=\{r_{i}\in R_{t}\mid z_{i}=\mathrm{fail}\}.  
       ```                                                |     |





and cluster them by verifier-grounded failure signatures. For each failed record $`r_{i}`$, the evaluation system analyzes the trace as evidence for why the evaluator rejected the run. It identifies the terminal failure reason exposed by the verifier, the agent-side behavior connected to that terminal failure, and the causal status of that behavior within the trace. This attribution step prevents the clustering procedure from conflating superficial symptoms with reusable failure mechanisms: two runs may share the same verifier outcome, such as a timeout or missing artifact, while requiring different harness changes because the underlying agent behaviors differ.





We write this attribution as a failure signature

|     |                                  |     |
|-----|----------------------------------|-----|
|     |                                  
       ``` math                          
       \phi(r_{i})=(c_{i},q_{i},m_{i}),  
       ```                               |     |

where $`c_{i}`$ denotes the terminal verifier-level cause, $`q_{i}`$ denotes the causal status of the relevant agent behavior, and $`m_{i}`$ denotes the abstract agent mechanism exposed by the trace. Failures are clustered by exact agreement of this signature:

|     |                                                 |     |
|-----|-------------------------------------------------|-----|
|     |                                                 
       ``` math                                         
       C_{\phi}=\{r_{i}\in F_{t}\mid\phi(r_{i})=\phi\}  
       ```                                              |     |

Thus, the clustering is deterministic and evaluator-grounded: two failed cases are grouped together only when they agree on what the verifier ultimately rejected, how the agent behavior contributed to that rejection, and which reusable behavioral mechanism was involved. The goal is not to discover latent semantic similarity among traces, but to aggregate failures that plausibly admit the same harness-level intervention.





For each cluster $`C_{\phi}`$, the evaluation system constructs a structured failure pattern containing its cluster size, representative task instances, shared trace symptoms, verifier evidence, and the inferred agent mechanism. Clusters are then ordered by their support and estimated actionability, so that the proposer is exposed first to recurring mechanisms that are more likely to map to a high-value harness modification.





The output of this stage is an evidence bundle $`B_{t}`$ summarizing the dominant failure patterns observed under $`h_{t}`$. Importantly, $`B_{t}`$ does not prescribe a harness edit. It separates verifier-level failure from agent-level mechanism, allowing the proposer to target a specific reusable weakness rather than patching a coarse outcome such as timeout, assertion failure, or missing output. This keeps the evaluator distinct from the optimizer while ensuring that subsequent candidate modifications are grounded in explicit cross-case evidence.







### 3.3 Harness Proposal: Exploring Diverse yet Minimal Candidate Modifications



Given the evidence bundle $`B_{t}`$, the proposal stage translates recurring failure patterns into candidate harness edits. The proposer is not an external optimizer with unrestricted access to the search space. Instead, we invoke the same fixed model $`M`$ with current harness $`h_{t}`$ in a proposer role and provide it with a bounded proposal context: the editable surfaces of the current harness, the verifier-grounded failure patterns from the evaluation system, records of passing behaviors that should be preserved, and summaries of previously attempted edits. This context exposes the proposer to structured cross-case evidence rather than raw execution logs, encouraging it to reason about reusable failure mechanisms rather than individual task failures.





Self-Harness uses parallel proposal generation to explore several candidate improvements from the same evidence. The proposer generates $`K`$ mutually distinct proposal bundles,

|     |                                                   |     |
|-----|---------------------------------------------------|-----|
|     |                                                   
       ``` math                                           
       \mathcal{P}_{t}=\{(\Delta_{j},a_{j})\}_{j=1}^{K},  
       ```                                                |     |

where each edit $`\Delta_{j}`$ maps the current harness to a candidate harness

|     |                                |     |
|-----|--------------------------------|-----|
|     |                                
       ``` math                        
       h_{t}^{(j)}=\Delta_{j}(h_{t}).  
       ```                             |     |

and $`a_{j}`$ is an audit record describing the targeted failure pattern, the edited harness surface, the expected behavioral effect, and the regression risks. Each proposal must be grounded in a primary failure mechanism and mapped to a concrete editable surface. The candidates are required to be materially distinct: they should not merely restate the same cluster, surface, or mechanism with different wording. This parallel proposal step broadens exploration while keeping each candidate branch individually interpretable.





The proposer first selects target failure patterns from $`B_{t}`$. A pattern is considered a suitable target only if it is both supported by evidence and plausibly addressable by an editable harness surface. This addressability criterion is important because not every failure cluster implies a useful harness modification: some clusters reflect task-specific difficulty, unstable outcomes, or model capability limits rather than a missing execution rule. When multiple clusters are plausible, the proposer favors mechanisms that are concrete, recurrent, and likely to be mitigated by a narrow change to the execution protocol; weakly supported or non-addressable patterns are excluded rather than forced into a patch.





Diversity is encouraged across proposal branches, while minimality is enforced within each branch. A proposal may target a different failure mechanism, choose a different harness surface, or express a different hypothesis about how to improve execution. However, each individual edit is constrained to modify only the surface needed to address its selected mechanism, preserve unrelated harness behavior, and avoid broad rewrites of the agent control architecture.







### 3.4 Proposal Validation: Ensuring Robust Improvement through Regression Testing



A candidate harness edit is not adopted immediately after it is proposed. Instead, each candidate branch is treated as a new harness variant and evaluated under the same evaluator used to diagnose the current harness. For a proposal $`\Delta_{j}`$, let $`h_{t}^{(j)}=\Delta_{j}(h_{t})`$ denote the resulting candidate harness. We evaluate both the current harness $`h_{t}`$ and the candidate harness $`h_{t}^{(j)}`$ on the held-in split $`D_{\mathrm{in}}`$ and the held-out split $`D_{\mathrm{ho}}`$. The held-in split measures whether the proposal addresses the evidence that motivated it, while the held-out split serves as a regression test for behaviors that were not visible to the proposer.





Let $`P_{\mathrm{in}}(h)`$ and $`P_{\mathrm{ho}}(h)`$ denote the number of passed tasks for harness $`h`$ on $`D_{\mathrm{in}}`$ and $`D_{\mathrm{ho}}`$, respectively. We define the split-wise improvements of candidate $`h_{t}^{(j)}`$ over the current harness as

|  |  |  |
|----|----|----|
|  | 
``` math
\Delta_{\mathrm{in}}^{(j)}=P_{\mathrm{in}}(h_{t}^{(j)})-P_{\mathrm{in}}(h_{t}),
``` |  |

and

|  |  |  |
|----|----|----|
|  | 
``` math
\Delta_{\mathrm{ho}}^{(j)}=P_{\mathrm{ho}}(h_{t}^{(j)})-P_{\mathrm{ho}}(h_{t}).
``` |  |

A candidate is accepted only if it improves at least one split without degrading the other:

|  |  |  |
|----|----|----|
|  | 
``` math
\Delta_{\mathrm{in}}^{(j)}\geq 0,\quad\Delta_{\mathrm{ho}}^{(j)}\geq 0,\quad\max\left(\Delta_{\mathrm{in}}^{(j)},\Delta_{\mathrm{ho}}^{(j)}\right)>0.
``` |  |

This rule implements a conservative promotion criterion. Proposals that only trade off one split against the other are rejected, even if their total pass count increases. When evaluation is stochastic, we repeat candidate evaluation and apply the same rule to aggregate pass counts across repeats. This reduces the chance that a harness edit is promoted due to a single favorable run. If multiple compatible candidates satisfy the rule in the same round, their edits are merged into the next harness; rejected candidates remain logged but do not change the active harness. In addition to the pass-count rule, validation rejects proposals that do not modify any editable surface or fail execution before a valid evaluation result is obtained. For each evaluated candidate, the system records the changed surfaces, split-wise outcomes, evaluation repeats, proposal summary, and accept/reject decision, making each transition in the harness lineage auditable.









## 4 Experiments



We evaluate whether Self-Harness can improve agent performance by modifying only the harness around a fixed language model. Our experiments use Terminal-Bench-2.0, which tests terminal interaction in containerized environments. Across multiple model backends, we start from the same minimal DeepAgent-based harness and let Self-Harness propose, validate, and promote bounded edits using held-in execution evidence and held-out regression gates.



<figure id="S4.F3" class="ltx_figure ltx_lstlisting ltx_align_center">


<a href="data:text/plain;base64,ZGVmIGJ1aWxkX3N5c3RlbV9wcm9tcHQoKSAtPiBzdHI6CiAgICByZXR1cm4gIiIiCllvdSBhcmUgcnVubmluZyBpbnNpZGUgYSBUZXJtaW5hbCBCZW5jaCAyIEhhcmJvciB0YXNrIGVudmlyb25tZW50LgoKVXNlIHRoZSBidWlsdC1pbiBmaWxlc3lzdGVtIGFuZCBzaGVsbCB0b29scyB0byBpbnNwZWN0IHRoZSB3b3Jrc3BhY2UsIG1ha2UKY29uY3JldGUgZWRpdHMsIGFuZCB2ZXJpZnkgb3V0Y29tZXMgYWdhaW5zdCB0aGUgYWN0dWFsIHRhc2sgZW52aXJvbm1lbnQuCgpEbyBub3QgYXNzdW1lIHN5bnRoZXRpYyBkYXRhc2V0cywgZG9tYWluLXNwZWNpZmljIHRvb2xzLCBvciBoaWRkZW4gZml4dHVyZXMKdW5sZXNzIHlvdSBkaXNjb3ZlciB0aGVtIGluIHRoZSByZXBvIG9yIHJ1bnRpbWUuCiIiIi5zdHJpcCgpCgoKQkFTRUxJTkVfU1lTVEVNX1BST01QVCA9IGJ1aWxkX3N5c3RlbV9wcm9tcHQoKQoKCmRlZiBidWlsZF9tZW1vcnlfc291cmNlcygpIC0+IGxpc3Rbc3RyXToKICAgIHJldHVybiBbIi9BR0VOVFMubWQiXQoKCmRlZiBidWlsZF9zdWJhZ2VudHMoKSAtPiBsaXN0W2RpY3Rbc3RyLCBBbnldXToKICAgIHJldHVybiBbXQoKCmRlZiBidWlsZF9za2lsbHMoKSAtPiBsaXN0W3N0cl06CiAgICByZXR1cm4gW10KCgpkZWYgYnVpbGRfYm9vdHN0cmFwX2luc3RydWN0aW9uKCkgLT4gc3RyOgogICAgcmV0dXJuICJTdGFydCBieSBpbnNwZWN0aW5nIHRoZSB3b3Jrc3BhY2UgYW5kIGlkZW50aWZ5aW5nIHRoZSBzbWFsbGVzdCByZWxldmFudCBlZGl0IHN1cmZhY2UuIgoKCmRlZiBidWlsZF9leGVjdXRpb25faW5zdHJ1Y3Rpb24oKSAtPiBzdHI6CiAgICByZXR1cm4gIlByZWZlciBjb25jcmV0ZSByZXBvIGNoYW5nZXMgb3ZlciBnZW5lcmljIGFkdmljZSwgYW5kIGtlZXAgZWRpdHMgdGlnaHRseSBzY29wZWQgdG8gdGhlIHRhc2suIgoKCmRlZiBidWlsZF92ZXJpZmljYXRpb25faW5zdHJ1Y3Rpb24oKSAtPiBzdHI6CiAgICByZXR1cm4gIkJlZm9yZSBjb25jbHVkaW5nLCB2ZXJpZnkgdGhlIHJlc3VsdCB3aXRoIHRoZSBtb3N0IHRhcmdldGVkIGNvbW1hbmQsIGZpbGUgcmVhZCwgb3IgdGVzdCB5b3UgY2FuIHJ1bi4iCgoKZGVmIGJ1aWxkX2ZhaWx1cmVfcmVjb3ZlcnlfaW5zdHJ1Y3Rpb24oKSAtPiBzdHI6CiAgICByZXR1cm4gIklmIGEgdG9vbCBjYWxsIGZhaWxzLCBpbnNwZWN0IHRoZSBlcnJvciBhbmQgYWRhcHQ7IGRvIG5vdCBibGluZGx5IHJldHJ5IHRoZSBzYW1lIGFjdGlvbi4iCgoKZGVmIGJ1aWxkX3J1bnRpbWVfY29udHJvbF9wb2xpY3koKSAtPiBkaWN0W3N0ciwgQW55XToKICAgIHJldHVybiB7CiAgICAgICAgImVuYWJsZWQiOiBGYWxzZSwKICAgICAgICAibWF4X3JlY2VudF90b29sX2Vycm9ycyI6IE5vbmUsCiAgICAgICAgIm1heF90b3RhbF90b29sX21lc3NhZ2VzIjogTm9uZSwKICAgICAgICAiaW5zdHJ1Y3Rpb24iOiBOb25lLAogICAgfQoKCmRlZiBidWlsZF9maXhlZF9oYXJuZXNzX2FnZW50KAogICAgbW9kZWw6ICJCYXNlQ2hhdE1vZGVsIHwgc3RyIiwKICAgICosCiAgICBiYWNrZW5kOiBBbnkgfCBOb25lID0gTm9uZSwKKToKICAgIGlmIGJhY2tlbmQgaXMgbm90IE5vbmU6CiAgICAgICAgcmV0dXJuIGNyZWF0ZV9kZWVwX2FnZW50KG1vZGVsPW1vZGVsLCBzeXN0ZW1fcHJvbXB0PUJBU0VMSU5FX1NZU1RFTV9QUk9NUFQsIGJhY2tlbmQ9YmFja2VuZCkKICAgIHJldHVybiBjcmVhdGVfZGVlcF9hZ2VudChtb2RlbD1tb2RlbCwgc3lzdGVtX3Byb21wdD1CQVNFTElORV9TWVNURU1fUFJPTVBUKQo=" download="sections/baseline_harness.py">⬇</a>


1 def build_system_prompt() -&gt; str:


2  return """


3 You are running inside a Terminal Bench 2 Harbor task environment.


4


5 Use the built-in filesystem and shell tools to inspect the workspace, make


6 concrete edits, and verify outcomes against the actual task environment.


7


8 Do not assume synthetic datasets, domain-specific tools, or hidden fixtures


9 unless you discover them in the repo or runtime.


10 """.strip()


11


12


13 BASELINE_SYSTEM_PROMPT = build_system_prompt()


14


15


16 def build_memory_sources() -&gt; list[str]:


17  return ["/AGENTS.md"]


18


19


20 def build_subagents() -&gt; list[dict[str, Any]]:


21  return []


22


23


24 def build_skills() -&gt; list[str]:


25  return []


26


27


28 def build_bootstrap_instruction() -&gt; str:


29  return "Start by inspecting the workspace and identifying the smallest relevant edit surface."


30


31


32 def build_execution_instruction() -&gt; str:


33  return "Prefer concrete repo changes over generic advice, and keep edits tightly scoped to the task."


34


35


36 def build_verification_instruction() -&gt; str:


37  return "Before concluding, verify the result with the most targeted command, file read, or test you can run."


38


39


40 def build_failure_recovery_instruction() -&gt; str:


41  return "If a tool call fails, inspect the error and adapt; do not blindly retry the same action."


42


43


44 def build_runtime_control_policy() -&gt; dict[str, Any]:


45  return {


46  "enabled": False,


47  "max_recent_tool_errors": None,


48  "max_total_tool_messages": None,


49  "instruction": None,


50  }


51


52


53 def build_fixed_harness_agent(


54  model: "BaseChatModel | str",


55  *,


56  backend: Any | None = None,


57 ):


58  if backend is not None:


59  return create_deep_agent(model=model, system_prompt=BASELINE_SYSTEM_PROMPT, backend=backend)


60  return create_deep_agent(model=model, system_prompt=BASELINE_SYSTEM_PROMPT)


<figcaption>Figure 3: Initial harness and editable interface used as the starting point for Self-Harness. The harness is intentionally kept minimal, consisting only of the Terminal-Bench-2.0 default system prompt, the default DeepAgent tools (basic file reading, file writing, file editing, and shell execution), and the declared interfaces that Self-Harness is allowed to modify.</figcaption>
</figure>



### 4.1 Setup



#### Benchmarks.



We evaluate Self-Harness on Terminal-Bench-2.0 \[<a href="#bib.bib24" class="ltx_ref">13</a>\], a multi-turn agentic benchmark in which agents interact with realistic execution environments and are judged by deterministic verifiers. Terminal-Bench-2.0 contains 89 containerized terminal tasks that test general tool-based execution, including artifact management, command use, verification behavior, and recovery from execution errors. We evaluate on a fixed 64-case subset, excluding tasks that depend on unstable external web resources or require multimodal inputs. This filtering reduces evaluation noise from factors outside the harness. In particular, multimodal tasks require modality-specific input handling that is not exposed by our minimal initial harness; including them would primarily measure unsupported harness functionality rather than the effect of Self-Harness edits.







#### Models.



We evaluate Self-Harness with three models: MiniMax M2.5 \[<a href="#bib.bib25" class="ltx_ref">14</a>\], Qwen3.5-35B-A3B \[<a href="#bib.bib27" class="ltx_ref">20</a>\], and GLM-5 \[<a href="#bib.bib28" class="ltx_ref">2</a>\]. The model is held fixed across all harness variants and is also used in the proposal stage to generate edits from evaluator feedback. All comparisons are therefore within-model comparisons: the decoding configuration, budget, tool set, benchmark environment, and evaluator are kept unchanged while only the harness is allowed to vary. This isolates the effect of Self-Harness from changes in model capability or evaluation protocol.







#### Harness.



The initial harness builds upon the DeepAgent \[<a href="#bib.bib31" class="ltx_ref">4</a>\] SDK but is intentionally kept minimal: a short benchmark-facing system prompt, and the default filesystem and shell tools. Self-Harness can only change the harness definition file that configures how DeepAgent is instantiated and controlled to build a new harness candidate $`h_{t}^{(j)}`$. The editable surfaces correspond to declared configuration points in this harness, such as instruction, tools, verification guidance, etc. Figure <a href="#S4.F3" class="ltx_ref" title="Figure 3 ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">3</a> shows the initial harness implementation.







#### Splits and protocol.



We fix the evaluated task set and partition it into a held-in split and a held-out split before running Self-Harness. The held-in split supplies the trajectories, verifier outcomes, and failure evidence exposed to the proposer, while the held-out split is never shown to the proposer and is used only by the automatic promotion gate. A candidate harness is promoted with the acceptance rule defined in Section <a href="#S3.SS4" class="ltx_ref" title="3.4 Proposal Validation: Ensuring Robust Improvement through Regression Testing ‣ 3 Self-Harness: An Iterative Loop for Model-Specific Harness Improvement ‣ Self-Harness: Harnesses That Improve Themselves">3.4</a>. Task split assignments are fixed across harness variants, and each task starts from a fresh benchmark environment. These controls ensure that measured improvements come from harness changes.







#### Metrics.



Our primary metric is *Pass (%)*, the percentage of evaluated task attempts that pass the benchmark verifier, computed over two repeated attempts for each harness candidate unless otherwise specified. This measures mean single-attempt task success under a fixed harness configuration and evaluation protocol. For Terminal-Bench-2.0, the pass signal is determined by the task verifier over the final container state.



<figure id="S4.F4" class="ltx_figure">
<img src="2606.09498v1/pass_results.png" id="S4.F4.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:390/223;" width="390" height="223" alt="Refer to caption" />
<figcaption>Figure 4: Pass rates (%) on Terminal-Bench-2.0 across MiniMax M2.5, Qwen3.5-35B-A3B, and GLM-5. For each backend, bars compare the initial harness with the final harness produced by Self-Harness on the held-in split, held-out split, and overall set; annotations above the Self-Harness bars show relative gains over the corresponding initial harness.</figcaption>
</figure>







### 4.2 Main Results



Figure <a href="#S4.F4" class="ltx_ref" title="Figure 4 ‣ Metrics. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">4</a> reports Terminal-Bench-2.0 performance before and after Self-Harness promotion. Across all three model backends, the promoted harness improves or preserves Pass (%) on both the held-in split and the held-out split. We report both absolute gains in percentage points and relative gains, where the relative gain is computed as $`(\mathrm{Self\mbox{-}Harness}-\mathrm{Initial})/\mathrm{Initial}`$. For MiniMax M2.5, Self-Harness improves held-in Pass from 43.0 to 50.0, a gain of 16% relative improvement, and improves held-out Pass from 40.5 to 61.9, a gain of 53% relative improvement. For Qwen3.5, Self-Harness improves held-in Pass from 15.1 to 36.0, a gain of 138% relative improvement, and held-out Pass from 23.8 to 38.1, a gain of 60% relative improvement. For GLM-5, Self-Harness improves held-in Pass from 47.7 to 57.0, a gain of 20% relative improvement, and held-out Pass from 42.9 to 57.1, a gain of 33% relative improvement.





These results show that harness-level edits can yield measurable improvements while keeping the model backend, tool set, budget, benchmark environment, and evaluator fixed. The gains are not confined to the held-in failures used to construct proposal evidence: all three backends improve on the held-out split, and no promoted harness degrades either split. This supports the central design goal of Self-Harness: proposed edits should target reusable execution mechanisms rather than case-specific failures, and the regression gate should prevent improvements on one split from being promoted at the cost of another.







### 4.3 Experimental Analysis

<figure id="S4.F5" class="ltx_figure">


<figure id="S4.F5.sf1" class="ltx_figure ltx_figure_panel ltx_align_center">

<figcaption>(a) Self-Harness evolution trajectory. Green markers denote accepted harness candidates and gray crosses denote rejected harness candidates. Step lines connect accepted candidates and keep performance flat across rejected iterations; the two accepted lineages meet at the final success-combined harness.</figcaption>
</figure>





<figure id="S4.F5.sf2" class="ltx_figure ltx_figure_panel ltx_align_center">
<img src="2606.09498v1/evolved_harness_delta.png" id="S4.F5.sf2.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:381/269;" width="381" height="269" alt="Refer to caption" />
<figcaption>(b) Differences for the three harness modifications accepted by Self-Harness and retained in the final harness. Red rows denote code removed from the initial harness, and green rows denote the updated harness behavior.</figcaption>
</figure>


<figcaption>Figure 5: MiniMax M2.5 Self-Harness run. Panel (a) summarizes the Self-Harness evolution trajectory, while panel (b) expands the accepted updates from this trajectory into their retained code-level edits in the final harness.</figcaption>
</figure>



#### Harness evolution and retained edits.



Figures <a href="#S4.F5" class="ltx_ref" title="Figure 5 ‣ 4.3 Experimental Analysis ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">5</a> and <a href="#S4.F6" class="ltx_ref" title="Figure 6 ‣ Harness evolution and retained edits. ‣ 4.3 Experimental Analysis ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">6</a> summarize both the evolution trajectory and the retained code-level edits for MiniMax M2.5 and Qwen3.5, with the corresponding GLM-5 run shown in Appendix Figure <a href="#A1.F10" class="ltx_ref" title="Figure 10 ‣ A.2 Additional GLM-5 analysis ‣ Appendix A Additional Implementation Details ‣ Self-Harness: Harnesses That Improve Themselves">10</a>. In each figure, the evolution plot distinguishes accepted candidates from rejected proposals, while the code diff records the harness interfaces retained in the final promoted variant. Across models, Self-Harness reaches the final harness through a small number of validation-gated edits rather than through a smooth sequence of uniformly successful proposals.





For MiniMax M2.5, the harness improves from 42.2% to 53.9% pass rate. The retained edits address missing required artifacts, schema-invalid tool content, and stalled tool-use loops, yielding a harness that creates required outputs earlier, handles structured tool content more carefully, and redirects execution after prolonged tool interaction.



<figure id="S4.F6" class="ltx_figure">


<figure id="S4.F6.sf1" class="ltx_figure ltx_figure_panel ltx_align_center">

<figcaption>(a) Self-Harness evolution trajectory. Green markers denote accepted harness candidates and gray crosses denote rejected harness candidates. Step lines connect accepted candidates and keep performance flat across rejected iterations. The subagent and skill branches were discarded due to no further improvement. The remaining four accepted edits are merged to form the final harness.</figcaption>
</figure>





<figure id="S4.F6.sf2" class="ltx_figure ltx_figure_panel ltx_align_center">
<img src="2606.09498v1/qwen_harness_delta.png" id="S4.F6.sf2.g1" class="ltx_graphics ltx_centering ltx_img_square" style="aspect-ratio:333/299;" width="333" height="299" alt="Refer to caption" />
<figcaption>(b) Differences for the four harness modifications accepted by Self-Harness and retained in the final harness. Red rows denote code removed from the initial harness, and green rows denote the updated harness behavior.</figcaption>
</figure>


<figcaption>Figure 6: Qwen3.5 Self-Harness run. Panel (a) summarizes the Self-Harness evolution trajectory, while panel (b) expands the accepted updates from this trajectory into their retained code-level edits in the final harness.</figcaption>
</figure>



The Qwen3.5 evolution run shown in Figure <a href="#S4.F6" class="ltx_ref" title="Figure 6 ‣ Harness evolution and retained edits. ‣ 4.3 Experimental Analysis ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">6</a> starts at 20.3% pass rate and reaches 36.7% after merging edits that emphasize artifact checking, missing-artifact recovery, retry discipline, and tool-error-triggered middleware. These changes mainly improve the agent’s ability to recover from file-editing or tool failures and still leave verifier-required artifacts in place.





For GLM-5, the harness improves from 46.1% to 57.0% through edits targeting late artifacts, external computation, session-scoped tools, and implementation-oriented exploration. These edits make environment changes persist across shell commands and encourage the agent to move from prolonged exploration toward implementation and testing.





In summary, the three runs show both a shared pattern and model-specific adaptation. A common theme is artifact reliability: all three promoted harnesses add mechanisms that improve artifact delivery, including "create output early" for M2.5, "artifact middleware" for Qwen3.5, and "transition from exploration" to implementation for GLM-5. The model-specific differences indicate that the same initial harness exposes different execution pathologies for different models, and that Self-Harness adapts by selecting targeted edits grounded in the failure mechanisms observed for each model. For example, M2.5 emphasizes correct formation of content tags and redirection after long tool calls. Qwen3.5 introduces dependency precheck and mitigation of exact command retries. GLM-5 tries to keep command environment persistent across shell sessions. These differences indicate that Self-Harness successfully captures specific failure modes of different models and produces suitable proposals to improve the model-harness behavior.







#### Trace-Level Analysis of Accepted Edits.



To better understand how accepted harness edits change agent behavior, we inspect representative before–after traces from Terminal-Bench-2.0 in Figures <a href="#S4.F7" class="ltx_ref" title="Figure 7 ‣ Trace-Level Analysis of Accepted Edits. ‣ 4.3 Experimental Analysis ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">7</a> and <a href="#S4.F8" class="ltx_ref" title="Figure 8 ‣ Trace-Level Analysis of Accepted Edits. ‣ 4.3 Experimental Analysis ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">8</a>, with the GLM-5 trace shown in Appendix Figure <a href="#A1.F9" class="ltx_ref" title="Figure 9 ‣ A.2 Additional GLM-5 analysis ‣ Appendix A Additional Implementation Details ‣ Self-Harness: Harnesses That Improve Themselves">9</a>. The accepted edits are not a single generic instruction added to all backends. Instead, Self-Harness promotes model-specific changes that target the dominant failure mechanisms observed for each initial harness.



<figure id="S4.F7" class="ltx_figure">
<img src="2606.09498v1/case_m25_count_dataset_tokens.png" id="S4.F7.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:429/293;" width="429" height="293" alt="Refer to caption" />
<figcaption>Figure 7: Case study of a MiniMax M2.5 harness edit on the Terminal-Bench-2.0 count-dataset-tokens task. Left: a failed trace under the initial harness, where the agent continues dataset exploration after finding the relevant metadata configuration and times out without creating the required answer artifact. Right: a successful trace under the edited harness, where the agent identifies the metadata-backed science subset, computes the required token total, writes /app/answer.txt, and reads it back for verification.</figcaption>
</figure>



For MiniMax M2.5, the accepted edits emphasize early artifact creation and bounded execution. The bootstrap instruction is changed from merely identifying the smallest relevant edit surface to identifying the required output artifact and creating an initial version as early as possible. The runtime policy is also enabled with a limit on total tool messages, encouraging the agent to redirect rather than continue open-ended tool use. Figure <a href="#S4.F7" class="ltx_ref" title="Figure 7 ‣ Trace-Level Analysis of Accepted Edits. ‣ 4.3 Experimental Analysis ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">7</a> shows that this changes the agent from prolonged dataset exploration to a concrete workflow: identifying the relevant metadata split, computing the required count, writing the answer file, and reading it back before stopping.



<figure id="S4.F8" class="ltx_figure">
<img src="2606.09498v1/case_qwen_extract_elf.png" id="S4.F8.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:429/300;" width="429" height="300" alt="Refer to caption" />
<figcaption>Figure 8: Case study of a Qwen3.5 harness edit on the Terminal-Bench-2.0 extract-elf task. Left: a failed trace under the initial harness, where the agent creates the required extractor script but then enters repeated overwrite and edit-file failures; before stopping, it deletes /app/extract.js, causing the verifier to fail because the required artifact is missing. Right: a successful trace under the edited harness, where a tool-error-triggered system prompt redirects the agent to recover the missing artifact, recreate the extractor, validate the generated JSON output, and leave the required file present for the verifier.</figcaption>
</figure>



For Qwen3.5, the promoted harness adds constraints for dependency prechecking, loop breaking, command-retry discipline, and artifact-focused recovery after tool errors. Figure <a href="#S4.F8" class="ltx_ref" title="Figure 8 ‣ Trace-Level Analysis of Accepted Edits. ‣ 4.3 Experimental Analysis ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">8</a> illustrates how these edits change failure recovery behavior. Under the initial harness, the agent creates the required extractor script, encounters overwrite and edit failures, repeatedly tries to modify the same artifact, and ultimately deletes /app/extract.js before stopping; the verifier therefore fails because the required file is missing. Under the edited harness, a tool-error-triggered system prompt redirects the agent toward the missing artifact: it recreates the extractor, fixes the parsing logic, writes the output file, performs targeted validation of the JSON result, and leaves the required artifact present for the verifier.





For GLM-5, the accepted edits focus on persistent environment changes and the transition from exploration to implementation. The edited harness instructs the agent to make installed tools or path changes persist across shell sessions and to verify tool accessibility after modifying the environment. It also adds a verification-stage constraint: if the agent has been exploring without producing required artifacts, it should transition to implementing and testing a solution. Figure <a href="#A1.F9" class="ltx_ref" title="Figure 9 ‣ A.2 Additional GLM-5 analysis ‣ Appendix A Additional Implementation Details ‣ Self-Harness: Harnesses That Improve Themselves">9</a> shows this behavior in a build task. The initial harness spends substantial budget on long external downloads and later rationalizes failed sanity checks, whereas the edited harness switches strategy after timeout evidence, validates alternative sources early, repairs the failing render check, and only then finalizes.





Together, these examples support the interpretation of the quantitative gains in Figure <a href="#S4.F4" class="ltx_ref" title="Figure 4 ‣ Metrics. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">4</a>. The promoted edits change observable execution behavior in ways aligned with the diagnosed failure mechanisms: Qwen3.5 reduces repeated ineffective actions, GLM-5 better preserves environment changes and moves from exploration to implementation, and MiniMax M2.5 creates and verifies required artifacts earlier. This suggests that Self-Harness improves performance by inducing targeted workflow changes rather than by relying on unrelated stochastic variation or a uniformly stronger prompt.











## 5 Conclusion



This paper studied whether a fixed language model can improve the harness that governs its own agent behavior. We introduced Self-Harness, a propose–evaluate–accept framework in which the model is evaluated under the current harness, receives structured evidence from its own execution traces, and proposes bounded edits to declared harness surfaces. Candidate harnesses are then re-evaluated under the same benchmark protocol, and only edits that satisfy a non-regressive acceptance rule are promoted into the harness lineage.





The main lesson is that harness improvement should be treated as an empirical state transition. A useful harness edit must specify the behavior it aims to change, the surface it modifies, the evidence that motivates it, and the evaluation result that justifies promotion. By keeping the model, evaluator, and benchmark protocol fixed, Self-Harness isolates whether improved behavior comes from changes to the harness scaffold.





Our experiments on Terminal-Bench-2.0 instantiate this protocol with a minimal DeepAgent-based baseline harness and three model backends. Self-Harness improves Pass (%) across all tested backends while preserving held-in and held-out performance under the acceptance rule. The retained edits are small, auditable changes to configurable harness surfaces, suggesting that even sparse initial harnesses can support useful self-improvement when proposals are constrained by execution evidence and validated by regression testing.





Self-Harness also has important limits. It studies bounded harness edits under fixed benchmarks, not open-ended self-improvement. Accepted edits may still reflect benchmark-specific failure patterns, and the protocol depends on the quality of verifier outcomes and trace records. Higher-stakes harness changes would require stronger acceptance gates than pass-rate non-regression alone.





More broadly, Self-Harness points toward a style of agent engineering in which harnesses evolve through recorded, testable, and reversible changes. Future work can further explore application of self-harness-style self-improvement in broader environments, but the core requirement remains the same: self-improvement should be grounded in behavioral evidence rather than only in the proposer’s rationale for a plausible edit.







## References

- \[1\] L. Fu, X. Ding, L. Pan, Y. Zhu, S. Zhang, L. Qiu, W. Liu, W. Zhang, X. Cao, X. Cai, J. Ding, and Y. Yu (2026)  CATArena: evaluation of llm agents through iterative tournament competitions.  In International Conference on Machine Learning,  Cited by: <a href="#S2.SS0.SSS0.Px2.p3.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[2\] GLM-5 Team (2026)  GLM-5: from vibe coding to agentic engineering.  External Links: 2602.15763, <a href="https://arxiv.org/abs/2602.15763" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p5.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">§4.1</a>. 
- \[3\] S. Hu, C. Lu, and J. Clune (2025)  Automated design of agentic systems.  External Links: 2408.08435, <a href="https://arxiv.org/abs/2408.08435" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p2.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[4\] LangChain (2026)  DeepAgents.  Note: Software framework  External Links: <a href="https://github.com/langchain-ai/deepagents" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS1.SSS0.Px3.p1.1" class="ltx_ref" title="Harness. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">§4.1</a>. 
- \[5\] Y. Lee, R. Nair, Q. Zhang, K. Lee, O. Khattab, and C. Finn (2026)  Meta-harness: end-to-end optimization of model harnesses.  External Links: 2603.28052, <a href="https://arxiv.org/abs/2603.28052" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S2.SS0.SSS0.Px2.p2.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[6\] P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Kuttler, M. Lewis, W. Yih, T. Rocktaschel, S. Riedel, and D. Kiela (2020)  Retrieval-augmented generation for knowledge-intensive nlp tasks.  In Advances in Neural Information Processing Systems,  External Links: 2005.11401, <a href="https://arxiv.org/abs/2005.11401" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[7\] Y. Liang, S. Zhou, Y. Gu, H. Tan, G. Wu, F. Dernoncourt, J. Kil, R. A. Rossi, and R. Zhang (2026)  Anticipatory planning for multimodal ai agents.  In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition,  pp. 5925–5935.  Cited by: <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[8\] J. Lin, S. Liu, C. Pan, L. Lin, S. Dou, Z. Xi, X. Huang, H. Yan, Z. Han, T. Gui, and Y. Jiang (2026)  Agentic harness engineering: observability-driven automatic evolution of coding-agent harnesses.  External Links: 2604.25850, <a href="https://arxiv.org/abs/2604.25850" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>. 
- \[9\] J. Liu, X. Zhao, X. Shang, and Z. Shen (2026)  Dive into claude code: the design space of today’s and future ai agent systems.  External Links: 2604.14228, <a href="https://arxiv.org/abs/2604.14228" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[10\] P. Liu, W. Yuan, J. Fu, Z. Jiang, H. Hayashi, and G. Neubig (2021)  Pre-train, prompt, and predict: a systematic survey of prompting methods in natural language processing.  External Links: 2107.13586, <a href="https://arxiv.org/abs/2107.13586" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[11\] C. Lu, C. Lu, R. T. Lange, J. Foerster, J. Clune, and D. Ha (2024)  The ai scientist: towards fully automated open-ended scientific discovery.  External Links: 2408.06292, <a href="https://arxiv.org/abs/2408.06292" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p3.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[12\] L. Mei, J. Yao, Y. Ge, Y. Wang, B. Bi, Y. Cai, J. Liu, M. Li, Z. Li, D. Zhang, C. Zhou, J. Mao, T. Xia, J. Guo, and S. Liu (2025)  A survey of context engineering for large language models.  External Links: 2507.13334, <a href="https://arxiv.org/abs/2507.13334" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[13\] M. A. Merrill, A. G. Shaw, N. Carlini, B. Li, H. Raj, I. Bercovich, L. Shi, J. Y. Shin, T. Walshe, E. K. Buchanan, J. Shen, G. Ye, H. Lin, J. Poulos, M. Wang, M. Nezhurina, J. Jitsev, D. Lu, O. M. Mastromichalakis, Z. Xu, Z. Chen, Y. Liu, R. Zhang, L. L. Chen, A. Kashyap, J. Uslu, J. Li, J. Wu, M. Yan, S. Bian, V. Sharma, K. Sun, S. Dillmann, A. Anand, A. Lanpouthakoun, B. Koopah, C. Hu, E. Guha, G. H. S. Dreiman, J. Zhu, K. Krauth, L. Zhong, N. Muennighoff, R. Amanfu, S. Tan, S. Pimpalgaonkar, T. Aggarwal, X. Lin, X. Lan, X. Zhao, Y. Liang, Y. Wang, Z. Wang, C. Zhou, D. Heineman, H. Liu, H. Trivedi, J. Yang, J. Lin, M. Shetty, M. Yang, N. Omi, N. Raoof, S. Li, T. Y. Zhuo, W. Lin, Y. Dai, Y. Wang, W. Chai, S. Zhou, D. Wahdany, Z. She, J. Hu, Z. Dong, Y. Zhu, S. Cui, A. Saiyed, A. Kolbeinsson, J. Hu, C. M. Rytting, R. Marten, Y. Wang, A. Dimakis, A. Konwinski, and L. Schmidt (2026)  Terminal-bench: benchmarking agents on hard, realistic tasks in command line interfaces.  External Links: 2601.11868, <a href="https://arxiv.org/abs/2601.11868" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S4.SS1.SSS0.Px1.p1.1" class="ltx_ref" title="Benchmarks. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">§4.1</a>. 
- \[14\] MiniMax (2026)  MiniMax m2.5: built for real-world productivity.  Note: Official model report  External Links: <a href="https://www.minimax.io/news/minimax-m25" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p5.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">§4.1</a>. 
- \[15\] A. Novikov, N. Vu, M. Eisenberger, E. Dupont, P. Huang, A. Z. Wagner, S. Shirobokov, B. Kozlovskii, F. J. R. Ruiz, A. Mehrabian, M. P. Kumar, A. See, S. Chaudhuri, G. Holland, A. Davies, S. Nowozin, P. Kohli, and M. Balog (2025)  AlphaEvolve: a coding agent for scientific and algorithmic discovery.  External Links: 2506.13131, <a href="https://arxiv.org/abs/2506.13131" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p3.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[16\] OpenAI (2026)  Codex.  Note: Product page  External Links: <a href="https://openai.com/codex/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>. 
- \[17\] C. Packer, S. Wooders, K. Lin, V. Fang, S. G. Patil, I. Stoica, and J. E. Gonzalez (2024)  MemGPT: towards llms as operating systems.  External Links: 2310.08560, <a href="https://arxiv.org/abs/2310.08560" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[18\] Y. Qin, S. Liang, Y. Ye, K. Zhu, L. Yan, Y. Lu, Y. Lin, X. Cong, X. Tang, B. Qian, S. Zhao, R. Tian, R. Xie, J. Zhou, M. Gerstein, D. Li, Z. Liu, and M. Sun (2023)  ToolLLM: facilitating large language models to master 16000+ real-world apis.  External Links: 2307.16789, <a href="https://arxiv.org/abs/2307.16789" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>. 
- \[19\] J. Qiu, X. Qi, T. Zhang, X. Juan, J. Guo, Y. Lu, Y. Wang, Z. Yao, Q. Ren, X. Jiang, X. Zhou, D. Liu, L. Yang, Y. Wu, K. Huang, S. Liu, H. Wang, and M. Wang (2025)  Alita: generalist agent enabling scalable agentic reasoning with minimal predefinition and maximal self-evolution.  External Links: 2505.20286, <a href="https://arxiv.org/abs/2505.20286" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p3.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[20\] Qwen Team (2026)  Qwen3.5: towards native multimodal agents.  Note: Official model report and model card for Qwen3.5-35B-A3B  External Links: <a href="https://qwen.ai/blog?id=qwen3.5" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p5.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S4.SS1.SSS0.Px2.p1.1" class="ltx_ref" title="Models. ‣ 4.1 Setup ‣ 4 Experiments ‣ Self-Harness: Harnesses That Improve Themselves">§4.1</a>. 
- \[21\] S. Schulhoff, M. Ilie, N. Balepur, K. Kahadze, A. Liu, C. Si, Y. Li, A. Gupta, H. Han, S. Schulhoff, P. S. Dulepet, S. Vidyadhara, D. Ki, S. Agrawal, C. Pham, G. Kroiz, F. Li, H. Tao, A. Srivastava, H. D. Costa, S. Gupta, M. L. Rogers, I. Goncearenco, G. Sarli, I. Galynker, D. Peskoff, M. Carpuat, J. White, S. Anadkat, A. Hoyle, and P. Resnik (2025)  The prompt report: a systematic survey of prompt engineering techniques.  External Links: 2406.06608, <a href="https://arxiv.org/abs/2406.06608" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[22\] M. Sclar, Y. Choi, Y. Tsvetkov, and A. Suhr (2024)  Quantifying language models’ sensitivity to spurious features in prompt design or: how i learned to start worrying about prompt formatting.  External Links: 2310.11324, <a href="https://arxiv.org/abs/2310.11324" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>. 
- \[23\] N. Shinn, F. Cassano, E. Berman, A. Gopinath, K. Narasimhan, and S. Yao (2023)  Reflexion: language agents with verbal reinforcement learning.  External Links: 2303.11366, <a href="https://arxiv.org/abs/2303.11366" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p1.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[24\] X. Wang, B. Li, Y. Song, F. F. Xu, X. Tang, M. Zhuge, J. Pan, Y. Song, B. Li, J. Singh, et al. (2025)  Openhands: an open platform for ai software developers as generalist agents.  In International Conference on Learning Representations,  Vol. 2025, pp. 65882–65919.  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>. 
- \[25\] J. Wei, X. Wang, D. Schuurmans, M. Bosma, B. Ichter, F. Xia, E. Chi, Q. Le, and D. Zhou (2022)  Chain-of-thought prompting elicits reasoning in large language models.  In Advances in Neural Information Processing Systems,  External Links: 2201.11903, <a href="https://arxiv.org/abs/2201.11903" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[26\] S. Xu, S. Li, X. Liu, T. Liu, Y. Li, Z. Shi, Z. Zhang, Z. Wang, Q. Yin, J. Chen, et al. (2026)  Controllable and verifiable tool-use data synthesis for agentic reinforcement learning.  arXiv preprint arXiv:2604.09813.  Cited by: <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[27\] Y. Yamada, R. T. Lange, C. Lu, S. Hu, C. Lu, J. Foerster, J. Clune, and D. Ha (2025)  The ai scientist-v2: workshop-level automated scientific discovery via agentic tree search.  External Links: 2504.08066, <a href="https://arxiv.org/abs/2504.08066" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p3.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[28\] J. Yang, C. E. Jimenez, A. Wettig, K. Lieret, S. Yao, K. Narasimhan, and O. Press (2024)  SWE-agent: agent-computer interfaces enable automated software engineering.  External Links: 2405.15793, <a href="https://arxiv.org/abs/2405.15793" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[29\] S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao (2023)  ReAct: synergizing reasoning and acting in language models.  External Links: 2210.03629, <a href="https://arxiv.org/abs/2210.03629" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[30\] X. Yin, X. Wang, L. Pan, L. Lin, X. Wan, and W. Y. Wang (2025)  Gödel agent: a self-referential agent framework for recursively self-improvement.  In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers),  pp. 27890–27913.  External Links: <a href="https://dx.doi.org/10.18653/v1/2025.acl-long.1354" class="ltx_ref doi ltx_bib_external">Document</a>, <a href="https://aclanthology.org/2025.acl-long.1354/" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p3.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[31\] E. Zelikman, E. Lorch, L. Mackey, and A. T. Kalai (2024)  Self-taught optimizer (stop): recursively self-improving code generation.  External Links: 2310.02304, <a href="https://arxiv.org/abs/2310.02304" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p1.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[32\] H. Zhang, S. Xu, Z. Guo, H. Zhu, S. Liu, X. Wang, Q. Zhang, Y. Chen, P. Ye, L. Bai, et al. (2025)  The path of self-evolving large language models: achieving data-efficient learning via intrinsic feedback.  arXiv preprint arXiv:2510.02752.  Cited by: <a href="#S2.SS0.SSS0.Px2.p1.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[33\] J. Zhang, S. Hu, C. Lu, R. Lange, and J. Clune (2025)  Darwin gödel machine: open-ended evolution of self-improving agents.  External Links: 2505.22954, <a href="https://arxiv.org/abs/2505.22954" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p3.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[34\] Q. Zhang, C. Hu, S. Upasani, B. Ma, F. Hong, V. Kamanuru, J. Rainton, C. Wu, M. Ji, H. Li, U. Thakker, J. Zou, and K. Olukotun (2026)  Agentic context engineering: evolving contexts for self-improving language models.  Note: ICLR 2026  External Links: 2510.04618, <a href="https://arxiv.org/abs/2510.04618" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p1.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[35\] S. Zhang, X. Wang, W. Zhang, C. Li, J. Song, T. Li, L. Qiu, X. Cao, X. Cai, W. Yao, W. Zhang, X. Wang, and Y. Wen (2025)  Leveraging dual process theory in language agent framework for real-time simultaneous human-AI collaboration.  In Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), W. Che, J. Nabende, E. Shutova, and M. T. Pilehvar (Eds.),  Vienna, Austria, pp. 4081–4108.  External Links: <a href="https://aclanthology.org/2025.acl-long.206/" class="ltx_ref ltx_bib_external">Link</a>, <a href="https://dx.doi.org/10.18653/v1/2025.acl-long.206" class="ltx_ref doi ltx_bib_external">Document</a>, ISBN 979-8-89176-251-0  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>. 
- \[36\] N. Zhu, H. Wang, J. Zhou, F. Chen, S. Zhang, G. Chen, C. Liu, J. Wu, W. Chen, X. Mou, and Y. Xu (2026)  SemaClaw: a step towards general-purpose personal ai agents through harness engineering.  External Links: 2604.11548, <a href="https://arxiv.org/abs/2604.11548" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Self-Harness: Harnesses That Improve Themselves">§1</a>, <a href="#S2.SS0.SSS0.Px1.p1.1" class="ltx_ref" title="From prompts to agent harnesses. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 
- \[37\] M. Zhuge, W. Wang, L. Kirsch, F. Faccio, D. Khizbullin, and J. Schmidhuber (2024)  Language agents as optimizable graphs.  External Links: 2402.16823, <a href="https://arxiv.org/abs/2402.16823" class="ltx_ref ltx_bib_external">Link</a>  Cited by: <a href="#S2.SS0.SSS0.Px2.p2.1" class="ltx_ref" title="Self-improving agents and automated agent design. ‣ 2 Background and Related Work ‣ Self-Harness: Harnesses That Improve Themselves">§2</a>. 









## Appendix A Additional Implementation Details



### A.1 Experimental details



#### Model inference services



MiniMax M2.5 and GLM-5 were accessed through hosted inference services, using MiniMax’s hosted API and OpenRouter, respectively.<sup>1</sup><sup>1</sup> 1 MiniMax token plan: <a href="https://platform.minimax.io/subscribe/token-plan" class="ltx_ref ltx_url ltx_font_typewriter">https://platform.minimax.io/subscribe/token-plan</a>; OpenRouter GLM-5 endpoint: <a href="https://openrouter.ai/z-ai/glm-5" class="ltx_ref ltx_url ltx_font_typewriter">https://openrouter.ai/z-ai/glm-5</a>. Accessed on 2026/05. Qwen3.5-35B-A3B was deployed locally on four NVIDIA H200 GPUs using an internal image derived from the public SGLang Docker image lmsysorg/sglang:v0.5.12-cu129.<sup>2</sup><sup>2</sup> 2 <a href="https://hub.docker.com/r/lmsysorg/sglang/tags?name=v0.5.12-cu129" class="ltx_ref ltx_url ltx_font_typewriter">https://hub.docker.com/r/lmsysorg/sglang/tags?name=v0.5.12-cu129</a>.







#### Terminal-Bench-2.0 configuration.



We use Harbor<sup>3</sup><sup>3</sup> 3 <a href="https://www.harborframework.com/docs/tutorials/running-terminal-bench" class="ltx_ref ltx_url ltx_font_typewriter">https://www.harborframework.com/docs/tutorials/running-terminal-bench</a>. as the execution environment for all Terminal-Bench-2.0 tasks. Evaluations are run on an isolated machine with 64 CPU cores, 256 GB of memory, and a 2 MB/s outbound network bandwidth cap. We use a default concurrency of 32 tasks for MiniMax M2.5 and GLM-5, and a concurrency of 48 tasks for the locally deployed Qwen3.5-35B-A3B backend. To reduce failures caused by incidental network latency rather than agent behavior, we mirror a subset of external resources required by Terminal-Bench-2.0 tasks when the original resources are stable but slow to download. Tasks that depend on external resources that cannot be accessed reliably, as well as tasks requiring multimodal inputs unsupported by the initial harness, are excluded from the main 64-case evaluation set. This configuration keeps the benchmark environment controlled while preserving the core terminal-interaction setting of Terminal-Bench-2.0.









### A.2 Additional GLM-5 analysis

<figure id="A1.F9" class="ltx_figure">
<img src="2606.09498v1/case_glm_build_pov_ray.png" id="A1.F9.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:429/336;" width="429" height="336" alt="Refer to caption" />
<figcaption>Figure 9: Case study of a GLM-5 harness edit on the Terminal-Bench-2.0 build-pov-ray task. Left: a failed trace under the initial harness, where long monolithic external downloads consume large tool budgets and the agent later finalizes despite repeated non-zero sanity checks. Right: a successful trace under the edited harness, where the agent uses bounded staged operations, checks external archive evidence before committing more work, and repairs the failed sanity check before finalizing.</figcaption>
</figure>

<figure id="A1.F10" class="ltx_figure">


<figure id="A1.F10.sf1" class="ltx_figure ltx_figure_panel ltx_align_center">

<figcaption>(a) Self-Harness evolution trajectory. Green markers denote accepted harness candidates and gray crosses denote rejected harness candidates. Step lines connect accepted candidates and keep performance flat across rejected iterations. Two early branches were discarded due to no further improvement. The remaining lane becomes the final accepted harness.</figcaption>
</figure>





<figure id="A1.F10.sf2" class="ltx_figure ltx_figure_panel ltx_align_center">
<img src="2606.09498v1/glm_harness_delta.png" id="A1.F10.sf2.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:400/163;" width="400" height="163" alt="Refer to caption" />
<figcaption>(b) Differences for the four harness modifications accepted by Self-Harness and retained in the final harness. Red rows denote code removed from the initial harness, and green rows denote the updated harness behavior.</figcaption>
</figure>


<figcaption>Figure 10: GLM-5 Self-Harness run. Panel (a) summarizes the Self-Harness evolution trajectory, while panel (b) expands the accepted updates from this trajectory into their retained code-level edits in the final harness.</figcaption>
</figure>











Experimental support, please <a href="./2606.09498v1/__stdout.txt" class="ltx_ref" target="_blank" rel="nofollow">view the build logs</a> for errors. Generated by <a href="https://math.nist.gov/~BMiller/LaTeXML/" class="ltx_ref ltx_LaTeXML_logo" target="_blank"> L A T E  xml </a> .





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


