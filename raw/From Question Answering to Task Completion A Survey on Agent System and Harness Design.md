---
title: "From Question Answering to Task Completion: A Survey on Agent System and Harness Design"
source: "https://arxiv.org/abs/2606.20683"
author: "Jianyuan Guo, Zhiwei Hao, Chengcheng Wang, Cheng Fan, Tingzhang Luo, Hongguang Li, Ying Gao, Hefei Mei, et al."
published: 2026-06
created: 2026-10-09
description:
tags:
  - "clippings"
---

# From Question Answering to Task Completion: A Survey on Agent System and Harness Design



 Jianyuan Guo     Zhiwei Hao     Chengcheng Wang     Cheng Fan     Tingzhang Luo     Hongguang Li     Ying Gao     Hefei Mei     Jiankun Peng     Rongjian Xu     Minjing Dong     Han Wu     Mengyu Zheng     Kai Han     Shiqi Wang     Chang Xu     Yunhe Wang <sup>†</sup><sup>†</sup>thanks:  J. Guo, Z. Hao, C. Fan, T. Luo, H. Li, Y. Gao, H. Mei, J. Peng, R. Xu, M. Dong and S. Wang are with the Department of Computer Science, City University of Hong Kong, HKSAR, China. Email: {jianyguo, zhiwei.hao, minjdong, shiqwang}@cityu.edu.hk. C. Wang and C. Xu are with the School of Computer Science, University of Sydney. Email: cwan0785@uni.sydney.edu.au, c.xu@sydney.edu.au. H. Wu is with the Peking University. Email: han.wu@pku.edu.cn. M. Zheng, K. Han and Y. Wang are with the TokenRhythm Technologies. Email: {mengyu.zheng, kai.han, yunhe.wang}@tokenrhythm.ai. Correspondence author: Chang Xu and Yunhe Wang. 





###### Abstract

LLM-based agents mark a shift from passive question answering to active task completion: they perceive environments, invoke tools, maintain state, and act over extended horizons. As agent systems have evolved from prompt engineering to workflows and context engineering, harness engineering, and agent-native training with co-evolution, a central question has become increasingly important: where does the bottleneck in agent performance reside—in the foundation model, in the execution harness, or in the coupling between them? This survey examines LLM-based agents through a model–harness lens. We first clarify the functional definition of agents and the implementation view of an LLM-based agent as a foundation model coupled with an execution harness. We then analyze the limits of model-centric scaling, trace four paradigms of agent engineering, and decompose the execution harness into six coupled runtime responsibilities: observation, context, control, action, state, and verification/governance. Using this decomposition, we map task properties and domain pressures to harness configurations, review benchmark and evaluation practices, and synthesize model–harness evidence on how runtime design affects long-horizon task completion, efficiency, and reliability. Finally, we identify open challenges in value-aware evaluation, safety, harness generalization, and model–harness co-evolution. Rather than treating agents as models with auxiliary tools, this survey argues that agent quality—including success, efficiency, safety, and generalization—emerges from the interaction between model capability, runtime infrastructure, task structure, and evaluation design. A collection of papers discussed in this survey is provided in <a href="https://github.com/ggjy/Awesome-Agent-Engineering" class="ltx_ref ltx_href">https://github.com/ggjy/Awesome-Agent-Engineering</a>.





###### Index Terms: 

LLM-based Agents, Harness Engineering, Prompt Engineering, Model-Harness Co-Evolution, Evaluation Benchmarks 





## 1 Introduction



> “Nothing is particularly hard if you divide it into small jobs.” — Henry Ford





Large language model (LLM)-based agents—autonomous systems that perceive environments, reason over goals, and execute multi-step actions—mark a transition from passive question answering \[<a href="#bib.bib212" class="ltx_ref">1</a>, <a href="#bib.bib170" class="ltx_ref">2</a>\] to active task completion \[<a href="#bib.bib82" class="ltx_ref">3</a>, <a href="#bib.bib84" class="ltx_ref">4</a>\]. Unlike early chat interfaces that optimized single-turn response quality, modern agent systems operate as closed loops that invoke tools, update state, and verify outcomes over extended horizons. Prominent examples span multiple domains: coding agents such as Devin \[<a href="#bib.bib236" class="ltx_ref">5</a>\], Claude Code \[<a href="#bib.bib241" class="ltx_ref">6</a>\], and Codex \[<a href="#bib.bib239" class="ltx_ref">7</a>\] independently diagnose and resolve software engineering tasks across entire repositories; general-purpose agents like Manus \[<a href="#bib.bib53" class="ltx_ref">8</a>\] orchestrate multi-step workflows from research to data analysis; open-source platforms including AutoGPT \[<a href="#bib.bib237" class="ltx_ref">9</a>\], OpenHands \[<a href="#bib.bib106" class="ltx_ref">10</a>\], and OpenClaw \[<a href="#bib.bib238" class="ltx_ref">11</a>\] provide extensible frameworks for building custom agent pipelines.





This landscape illustrates a broader shift from conversational competence to operational competence, and it changes where the performance bottleneck lies. For question answering (QA), incremental improvements in model capability—*i.e*., larger parameters, more training data, or better alignment—often yield direct and predictable gains. Yet traditional benchmarks that measure such capability, including MMLU \[<a href="#bib.bib50" class="ltx_ref">12</a>\], GPQA \[<a href="#bib.bib27" class="ltx_ref">13</a>\], and HumanEval \[<a href="#bib.bib51" class="ltx_ref">14</a>\], have become increasingly saturated at the frontier, with contamination risks further complicating interpretation; harder evaluations such as Humanity’s Last Exam \[<a href="#bib.bib23" class="ltx_ref">15</a>\] have been proposed to restore discriminative power. More critically, when evaluation shifts from closed-form QA to interactive, multi-step task completion, even frontier models reveal substantial reliability gaps—SWE-bench \[<a href="#bib.bib93" class="ltx_ref">16</a>\], WebArena \[<a href="#bib.bib113" class="ltx_ref">17</a>\], OSWorld \[<a href="#bib.bib85" class="ltx_ref">18</a>\], TheAgentCompany \[<a href="#bib.bib147" class="ltx_ref">19</a>\], and Terminal-Bench \[<a href="#bib.bib61" class="ltx_ref">20</a>\] all demonstrate that agentic tasks retain significant headroom. This divergence between static benchmarks (nearing saturation) and agentic benchmarks (far from solved) raises a natural question: if model scaling alone does not close the gap on agentic tasks, what does?





### 1.1 Harness Design as a Performance Lever



A growing body of work suggests that agent performance is increasingly limited not only by the model’s raw reasoning power, but also by the design of its *execution harness*: the runtime infrastructure that shapes what the model perceives, how it acts, and whether its errors are detected and recovered. The idea that interface design matters was first demonstrated empirically by SWE-agent \[<a href="#bib.bib107" class="ltx_ref">21</a>\], which showed that redesigning the agent–computer interface (ACI) can substantially improve SWE-bench performance under a fixed base model. The broader concept was subsequently crystallized under the term *harness engineering* by Hashimoto \[<a href="#bib.bib235" class="ltx_ref">22</a>\] and OpenAI \[<a href="#bib.bib239" class="ltx_ref">7</a>\], who framed an agent as *model plus harness* and identified observation shaping, action-space design, execution sandboxing, context management, and verification loops as its core components. More recently, NLAH \[<a href="#bib.bib63" class="ltx_ref">23</a>\] formalizes harness logic as an editable, portable natural-language artifact, and Meta-Harness \[<a href="#bib.bib54" class="ltx_ref">24</a>\] treats harness configuration as an optimizable search space.





Following this line of work, we adopt the harness-centric perspective as a unifying lens: we systematically examine how the design of the runtime infrastructure, rather than model capability alone, determines agent reliability, efficiency, and generalization across diverse tasks. We further argue that this perspective is now extending beyond single-model scaffolds: recent systems \[<a href="#bib.bib218" class="ltx_ref">25</a>\] treat the harness as a compositional runtime over multiple models, and increasingly as a learnable object whose routing, orchestration, and verification policies can themselves be optimized.



<figure id="S1.F1" class="ltx_figure">

<figcaption>Fig. 1: A diagram that summarizes the structure of this survey.</figcaption>
</figure>





### 1.2 Four Paradigms of Agent Engineering



We organize the recent literature through an evolutionary lens of four paradigms. Each emerged to address limitations exposed by its predecessor; each foregrounds a different performance lever.





Phase 1: Prompt Engineering optimizes the single-turn instruction sent to the model. Techniques such as few-shot exemplars \[<a href="#bib.bib212" class="ltx_ref">1</a>\], chain-of-thought reasoning \[<a href="#bib.bib127" class="ltx_ref">26</a>\], self-consistency \[<a href="#bib.bib126" class="ltx_ref">27</a>\], and tree-of-thought search \[<a href="#bib.bib125" class="ltx_ref">28</a>\] can clarify tasks, constrain output format, and elicit the model’s latent capabilities. Yet prompting fundamentally addresses an *expression* problem: how to ask. It does not solve the *information* problem: prompting alone cannot supply missing knowledge, manage dynamically evolving state, or maintain coherence across long action sequences.





Phase 2: Workflows and Context Engineering shifts the unit of optimization from a single prompt to the information lifecycle surrounding multi-step execution. Its core discipline is curating *what* information enters the model’s context window, *when*, and *in what form* \[<a href="#bib.bib234" class="ltx_ref">29</a>\], encompassing retrieval-augmented generation \[<a href="#bib.bib144" class="ltx_ref">30</a>\], long-term memory management \[<a href="#bib.bib118" class="ltx_ref">31</a>\], tool and API definitions \[<a href="#bib.bib120" class="ltx_ref">32</a>, <a href="#bib.bib119" class="ltx_ref">33</a>\], and progressive skill disclosure \[<a href="#bib.bib122" class="ltx_ref">34</a>, <a href="#bib.bib49" class="ltx_ref">35</a>\]. The evaluation criterion changes accordingly: the question is no longer only whether a single answer is correct, but whether the assembled context enables the model to complete multi-step tasks. However, context engineering remains fundamentally feedforward: it optimizes the input to each reasoning step but provides no structural mechanism to detect drift, verify intermediate outcomes, or recover from errors.





Phase 3: Harness Engineering closes the loop. Beyond assembling the right context, the harness introduces feedback-driven execution: the model acts, observes environment responses, and reasons over observations to decide its next step \[<a href="#bib.bib124" class="ltx_ref">36</a>\]. More broadly, harness engineering treats the entire runtime infrastructure as the primary design object \[<a href="#bib.bib235" class="ltx_ref">22</a>, <a href="#bib.bib239" class="ltx_ref">7</a>\], governing execution sandboxing, state checkpointing, verification loops, error recovery, and sub-agent coordination \[<a href="#bib.bib63" class="ltx_ref">23</a>, <a href="#bib.bib54" class="ltx_ref">24</a>\]. The governing question shifts from *what to show the model* to *how to keep the whole system on track*: prevent drift, maintain stable execution, and recover from errors.





Within this phase, a further shift is already visible. Early harness design typically wraps a *fixed* foundation model with hand-crafted or searched runtime policies. More recent systems move toward a *multi-model harness*: the runtime routes, delegates, and composes heterogeneous models for planning, tool use, verification, coding, and domain-specific subtasks \[<a href="#bib.bib90" class="ltx_ref">37</a>, <a href="#bib.bib78" class="ltx_ref">38</a>, <a href="#bib.bib245" class="ltx_ref">39</a>\]. At the same time, the harness itself is becoming *learnable*: harness modules, orchestration logic, and runtime policies can be edited, searched, or optimized as first-class artifacts \[<a href="#bib.bib63" class="ltx_ref">23</a>, <a href="#bib.bib54" class="ltx_ref">24</a>, <a href="#bib.bib42" class="ltx_ref">40</a>\]. This changes what counts as an agent system. A single prompt wrapped around one model can still function as a lightweight agent, but reliable long-horizon task completion increasingly depends on a compositional, optimizable runtime over multiple models, not on prompt craft alone.





Phase 4: Agent-Native Training and Co-Evolution builds on the learnable multi-model harness view above. Its first direction is *internalization*: agentic behaviors such as planning, tool use, verification, and recovery are increasingly trained into model parameters through interactive environments \[<a href="#bib.bib99" class="ltx_ref">41</a>, <a href="#bib.bib155" class="ltx_ref">42</a>, <a href="#bib.bib65" class="ltx_ref">43</a>, <a href="#bib.bib38" class="ltx_ref">44</a>\]. Its second direction is *co-evolution*: over deployment, the model, harness, and improvement loop may all be updated from execution traces that indicate what to keep, change, or undo \[<a href="#bib.bib38" class="ltx_ref">44</a>, <a href="#bib.bib41" class="ltx_ref">45</a>, <a href="#bib.bib58" class="ltx_ref">46</a>, <a href="#bib.bib42" class="ltx_ref">40</a>\]. This does not eliminate the harness; it shifts the design question toward how much of agent behavior is learned in models, how much stays in the runtime, and how the full stack improves safely over time, opening a path toward self-evolving agent systems.





These four phases form a conceptual evolutionary lens rather than a strict temporal partition; all four coexist in practice today. Our goal is not to introduce another component taxonomy, but to use this progression and benchmark evidence (Sec. <a href="#S7" class="ltx_ref" title="7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">7</a>) to analyze how the dominant performance bottleneck moves across stages, and why harness design has become a central object of agent engineering.



<figure id="S1.T1" class="ltx_table">
<table id="S1.T1.4" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S1.T1.4.1" class="ltx_tr">
<td id="S1.T1.4.1.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Survey </td>
<td id="S1.T1.4.1.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Time </td>
<td id="S1.T1.4.1.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Organizing lens </td>
<td id="S1.T1.4.1.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Primary focus </td>
<td id="S1.T1.4.1.5" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Broad </td>
<td id="S1.T1.4.1.6" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Eval. </td>
<td id="S1.T1.4.1.7" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> App. </td>
<td id="S1.T1.4.1.8" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Industry </td>
</tr>
<tr id="S1.T1.4.2" class="ltx_tr">
<td id="S1.T1.4.2.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Wang <em>et al</em>. [<a href="#bib.bib102" class="ltx_ref">47</a>] </td>
<td id="S1.T1.4.2.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> 2023.08 </td>
<td id="S1.T1.4.2.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Module-based agent construction </td>
<td id="S1.T1.4.2.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> How to construct an autonomous LLM agent through core modules, <em>e.g</em>., profile, memory, planning, and action. </td>
<td id="S1.T1.4.2.5" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✓ </td>
<td id="S1.T1.4.2.6" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.2.7" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✓ </td>
<td id="S1.T1.4.2.8" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> No </td>
</tr>
<tr id="S1.T1.4.3" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S1.T1.4.3.1" class="ltx_td ltx_align_left ltx_align_middle"> Xi <em>et al</em>. [<a href="#bib.bib84" class="ltx_ref">4</a>] </td>
<td id="S1.T1.4.3.2" class="ltx_td ltx_align_left ltx_align_middle"> 2023.09 </td>
<td id="S1.T1.4.3.3" class="ltx_td ltx_align_left ltx_align_middle"> Brain–perception–action framework </td>
<td id="S1.T1.4.3.4" class="ltx_td ltx_align_left ltx_align_middle"> Agents as intelligent systems, from single-agent arch. to multi-agent society and human–agent interaction. </td>
<td id="S1.T1.4.3.5" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.3.6" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.3.7" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.3.8" class="ltx_td ltx_align_left ltx_align_middle"> No </td>
</tr>
<tr id="S1.T1.4.4" class="ltx_tr">
<td id="S1.T1.4.4.1" class="ltx_td ltx_align_left ltx_align_middle"> Luo <em>et al</em>. [<a href="#bib.bib82" class="ltx_ref">3</a>] </td>
<td id="S1.T1.4.4.2" class="ltx_td ltx_align_left ltx_align_middle"> 2025.03 </td>
<td id="S1.T1.4.4.3" class="ltx_td ltx_align_left ltx_align_middle"> Build–collaborate–evolve taxonomy </td>
<td id="S1.T1.4.4.4" class="ltx_td ltx_align_left ltx_align_middle"> Taxonomy of agents spanning methodological foundations, collaboration, applications, and evaluation. </td>
<td id="S1.T1.4.4.5" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.4.6" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.4.7" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.4.8" class="ltx_td ltx_align_left ltx_align_middle"> Limited </td>
</tr>
<tr id="S1.T1.4.5" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S1.T1.4.5.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Guo <em>et al</em>. [<a href="#bib.bib91" class="ltx_ref">48</a>] </td>
<td id="S1.T1.4.5.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> 2024.02 </td>
<td id="S1.T1.4.5.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Communication and collaboration </td>
<td id="S1.T1.4.5.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Overall progress, communication patterns, and open challenges in LLM-based multi-agent systems. </td>
<td id="S1.T1.4.5.5" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.5.6" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.5.7" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✓ </td>
<td id="S1.T1.4.5.8" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> No </td>
</tr>
<tr id="S1.T1.4.6" class="ltx_tr">
<td id="S1.T1.4.6.1" class="ltx_td ltx_align_left ltx_align_middle"> Li <em>et al</em>. [<a href="#bib.bib96" class="ltx_ref">49</a>] </td>
<td id="S1.T1.4.6.2" class="ltx_td ltx_align_left ltx_align_middle"> 2024.10 </td>
<td id="S1.T1.4.6.3" class="ltx_td ltx_align_left ltx_align_middle"> Workflow-based taxonomy </td>
<td id="S1.T1.4.6.4" class="ltx_td ltx_align_left ltx_align_middle"> How multi-agent systems are structured through workflow, infrastructure, core functional modules. </td>
<td id="S1.T1.4.6.5" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.6.6" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.6.7" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.6.8" class="ltx_td ltx_align_left ltx_align_middle"> Limited </td>
</tr>
<tr id="S1.T1.4.7" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S1.T1.4.7.1" class="ltx_td ltx_align_left ltx_align_middle"> Li <em>et al</em>. [<a href="#bib.bib71" class="ltx_ref">50</a>] </td>
<td id="S1.T1.4.7.2" class="ltx_td ltx_align_left ltx_align_middle"> 2025.01 </td>
<td id="S1.T1.4.7.3" class="ltx_td ltx_align_left ltx_align_middle"> Collaboration mechanism </td>
<td id="S1.T1.4.7.4" class="ltx_td ltx_align_left ltx_align_middle"> Collaboration in multi-agent systems, categorized by actors, structures, strategies and coordination protocols. </td>
<td id="S1.T1.4.7.5" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.7.6" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.7.7" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.7.8" class="ltx_td ltx_align_left ltx_align_middle"> No </td>
</tr>
<tr id="S1.T1.4.8" class="ltx_tr">
<td id="S1.T1.4.8.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Shen <em>et al</em>. [<a href="#bib.bib83" class="ltx_ref">51</a>] </td>
<td id="S1.T1.4.8.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> 2025.03 </td>
<td id="S1.T1.4.8.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Evaluation-based taxonomy </td>
<td id="S1.T1.4.8.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Benchmarks, metrics, and methodological issues in evaluating LLM-agents. </td>
<td id="S1.T1.4.8.5" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.8.6" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✓ </td>
<td id="S1.T1.4.8.7" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.8.8" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Limited </td>
</tr>
<tr id="S1.T1.4.9" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S1.T1.4.9.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Gu <em>et al</em>. [<a href="#bib.bib66" class="ltx_ref">52</a>] </td>
<td id="S1.T1.4.9.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> 2025.07 </td>
<td id="S1.T1.4.9.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Domain-focused taxonomy </td>
<td id="S1.T1.4.9.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> GUI/computer-use agents: benchmarks, architectures, and training methods. </td>
<td id="S1.T1.4.9.5" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.9.6" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✓ </td>
<td id="S1.T1.4.9.7" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✓ </td>
<td id="S1.T1.4.9.8" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Limited </td>
</tr>
<tr id="S1.T1.4.10" class="ltx_tr">
<td id="S1.T1.4.10.1" class="ltx_td ltx_align_left ltx_align_middle"> Ma <em>et al</em>. [<a href="#bib.bib97" class="ltx_ref">53</a>] </td>
<td id="S1.T1.4.10.2" class="ltx_td ltx_align_left ltx_align_middle"> 2024.05 </td>
<td id="S1.T1.4.10.3" class="ltx_td ltx_align_left ltx_align_middle"> Embodied-agent taxonomy </td>
<td id="S1.T1.4.10.4" class="ltx_td ltx_align_left ltx_align_middle"> Vision-language-action models for embodied AI. </td>
<td id="S1.T1.4.10.5" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.10.6" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.10.7" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.10.8" class="ltx_td ltx_align_left ltx_align_middle"> No </td>
</tr>
<tr id="S1.T1.4.11" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S1.T1.4.11.1" class="ltx_td ltx_align_left ltx_align_middle"> Zhang <em>et al</em>. [<a href="#bib.bib88" class="ltx_ref">54</a>] </td>
<td id="S1.T1.4.11.2" class="ltx_td ltx_align_left ltx_align_middle"> 2025.03 </td>
<td id="S1.T1.4.11.3" class="ltx_td ltx_align_left ltx_align_middle"> Safety-oriented taxonomy </td>
<td id="S1.T1.4.11.4" class="ltx_td ltx_align_left ltx_align_middle"> Threats, safety risks, evaluation, and countermeasures for trustworthy LLM-based agents. </td>
<td id="S1.T1.4.11.5" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.11.6" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.11.7" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.11.8" class="ltx_td ltx_align_left ltx_align_middle"> Limited </td>
</tr>
<tr id="S1.T1.4.12" class="ltx_tr">
<td id="S1.T1.4.12.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Meng <em>et al</em>. [<a href="#bib.bib262" class="ltx_ref">55</a>] </td>
<td id="S1.T1.4.12.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> 2026.04 </td>
<td id="S1.T1.4.12.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Execution harness taxonomy </td>
<td id="S1.T1.4.12.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Six-component tuple for harness definition, historical tracing, and cross-cutting harness challenges. </td>
<td id="S1.T1.4.12.5" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✓ </td>
<td id="S1.T1.4.12.6" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.12.7" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> ✗ </td>
<td id="S1.T1.4.12.8" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Strong </td>
</tr>
<tr id="S1.T1.4.13" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S1.T1.4.13.1" class="ltx_td ltx_align_left ltx_align_middle"> Li <em>et al</em>. [<a href="#bib.bib261" class="ltx_ref">56</a>] </td>
<td id="S1.T1.4.13.2" class="ltx_td ltx_align_left ltx_align_middle"> 2026.04 </td>
<td id="S1.T1.4.13.3" class="ltx_td ltx_align_left ltx_align_middle"> Seven-layer harness taxonomy </td>
<td id="S1.T1.4.13.4" class="ltx_td ltx_align_left ltx_align_middle"> ETCLOVG, a seven-layer taxonomy and practitioner principles from deployed agent stacks. </td>
<td id="S1.T1.4.13.5" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.13.6" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.13.7" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.13.8" class="ltx_td ltx_align_left ltx_align_middle"> Strong </td>
</tr>
<tr id="S1.T1.4.14" class="ltx_tr">
<td id="S1.T1.4.14.1" class="ltx_td ltx_align_left ltx_align_middle"> Ning <em>et al</em>. [<a href="#bib.bib260" class="ltx_ref">57</a>] </td>
<td id="S1.T1.4.14.2" class="ltx_td ltx_align_left ltx_align_middle"> 2026.05 </td>
<td id="S1.T1.4.14.3" class="ltx_td ltx_align_left ltx_align_middle"> Code-as-harness layers </td>
<td id="S1.T1.4.14.4" class="ltx_td ltx_align_left ltx_align_middle"> Code as executable harness substrate: interface and multi-agent scaling across application domains. </td>
<td id="S1.T1.4.14.5" class="ltx_td ltx_align_left ltx_align_middle"> ✗ </td>
<td id="S1.T1.4.14.6" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.14.7" class="ltx_td ltx_align_left ltx_align_middle"> ✓ </td>
<td id="S1.T1.4.14.8" class="ltx_td ltx_align_left ltx_align_middle"> Limited </td>
</tr>
<tr id="S1.T1.4.15" class="ltx_tr" style="--ltx-bg-color:#F0F0F0;">
<td id="S1.T1.4.15.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> Ours </td>
<td id="S1.T1.4.15.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> 2026.06 </td>
<td id="S1.T1.4.15.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> Engineering paradigm shifts </td>
<td id="S1.T1.4.15.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> How agent engineering evolved from prompt optimization to runtime system design and future directions. </td>
<td id="S1.T1.4.15.5" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> ✓ </td>
<td id="S1.T1.4.15.6" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> ✓ </td>
<td id="S1.T1.4.15.7" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> ✓ </td>
<td id="S1.T1.4.15.8" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> Strong </td>
</tr>
</tbody>
</table>
<figcaption>TABLE I: Comparison between our work and representative prior surveys. “Broad” denotes coverage of the general LLM-based agent landscape rather than a specific subfield; “Eval.” denotes explicit coverage of benchmarks and the evaluation of methods; “App.” denotes substantial discussion of application domains and use cases; and “Industry” denotes the extent to which a survey incorporates practitioner reports, production systems, or industrial engineering evidence as part of its main analysis. </figcaption>
</figure>





### 1.3 Relation to Prior Surveys



Recent surveys have documented the rapid rise of LLM-based agents, but most organize the field through taxonomy-oriented lenses. Tab. <a href="#S1.T1" class="ltx_ref" title="TABLE I ‣ 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">I</a> compares our survey with representative prior work. General-purpose surveys summarize agent architectures and components such as memory, planning, action, perception, applications, safety, and evaluation \[<a href="#bib.bib102" class="ltx_ref">47</a>, <a href="#bib.bib84" class="ltx_ref">4</a>, <a href="#bib.bib82" class="ltx_ref">3</a>\]. Multi-agent surveys focus on communication, coordination, collaboration structures, and workflow organization \[<a href="#bib.bib91" class="ltx_ref">48</a>, <a href="#bib.bib96" class="ltx_ref">49</a>, <a href="#bib.bib71" class="ltx_ref">50</a>\]. Other surveys examine narrower but important slices, including evaluation methodology \[<a href="#bib.bib83" class="ltx_ref">51</a>\], GUI/computer-use agents \[<a href="#bib.bib66" class="ltx_ref">52</a>\], embodied systems \[<a href="#bib.bib97" class="ltx_ref">53</a>\], and trustworthy agents \[<a href="#bib.bib88" class="ltx_ref">54</a>\]. Since early 2026, several works have narrowed the lens specifically to agent harnesses. Meng *et al*. \[<a href="#bib.bib262" class="ltx_ref">55</a>\] formalize the harness as a six-component tuple. Li *et al*. \[<a href="#bib.bib261" class="ltx_ref">56</a>\] further propose the seven-layer ETCLOVG taxonomy and map a large open-source corpus onto it to expose ecosystem coverage and production design principles. Ning *et al*. \[ning2026codeasharness\] organize the field from a code-centric perspective, treating executable programs as the substrate for reasoning, action, state, and verification. These surveys provide valuable harness taxonomies, catalogs, or substrate-specific roadmaps.





Relative to recent harness-focused surveys, our contribution is not primarily another layer taxonomy or project catalog. We instead ask how the dominant engineering bottleneck migrates across prompt optimization, context/workflow organization, compositional and learnable runtimes, and agent-native co-evolution, and how that migration should be evaluated empirically. Accordingly, we connect harness anatomy to task pressure profiles (Sec. <a href="#S6" class="ltx_ref" title="6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">6</a>), benchmark evidence (Sec. <a href="#S7" class="ltx_ref" title="7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">7</a>), and value-aware deployment objectives (Sec. <a href="#S8" class="ltx_ref" title="8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">8</a>), rather than centering the analysis on taxonomy completeness or repository coding alone.





Our survey makes three distinctions explicit. First, it is *evolution-first*: we organize the literature around engineering paradigm shifts rather than a static component taxonomy. Second, it is *harness-centric*: we treat the execution harness as a first-class technical object that governs observation, context, control, action, state, verification, recovery, and efficiency. Third, it connects *academic evidence with industrial practice*, using benchmark results, open-source systems, engineering reports, and controlled model–harness analyses to examine how runtime design choices affect agent reliability, cost, and latency.





In short, our goal is not only to catalog LLM-based agents, but to explain why harness engineering emerged as a central systems concern and how it may extend toward future agent-native training and co-evolution.







### 1.4 Scope Boundaries



This survey covers LLM-based agent systems from 2020 to 2026, including prompting methods, workflow frameworks, harness and runtime design, multi-model orchestration, agent-native training, model–harness co-evolution, domain deployments, and evaluation methodology. We focus on systems in which one or more LLMs serve as cognitive engines within an execution harness, and synthesize published papers, public engineering reports, benchmarks, and controlled model–harness comparisons. We prioritize high-impact and verifiable sources that directly inform agent system design, efficiency, or evaluation. Adjacent traditions such as neuro-symbolic planning, classical embodied control, and non-LLM systems are treated as complementary work rather than surveyed in depth, because they rely on different assumptions, architectures, and evaluation criteria.







### 1.5 Contributions and Survey Structure



The main contributions of this survey are:





- •
  

  We provide an evolution-first synthesis of agent engineering, tracing shifts from prompt engineering to context engineering, harness engineering, and agent-native training.

  
- •
  

  We analyze the limits of model-centric scaling for long-horizon task completion and argue that agent performance is a property of the model–harness pairing.

  
- •
  

  We formalize the execution harness as a runtime design object and decompose it into six coupled responsibilities.

  
- •
  

  We map task properties, domain adaptations, and evaluation practices to harness pressure profiles rather than treating agent components as an independent checklist.

  
- •
  

  We synthesize benchmark and empirical evidence to motivate value-aware evaluation beyond task success.

  





The remainder of this survey is organized as follows. Sec. <a href="#S2" class="ltx_ref" title="2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">2</a> defines agents and harnesses and reviews core infrastructure. Sec. <a href="#S3" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">3</a> analyzes the limits of model-centric scaling. Sec. <a href="#S4" class="ltx_ref" title="4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">4</a> presents the four-paradigm evolution of agent engineering. Sec. <a href="#S5" class="ltx_ref" title="5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">5</a> decomposes the execution harness into six runtime components. Sec. <a href="#S6" class="ltx_ref" title="6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">6</a> maps task pressures and domain adaptations to harness configurations. Sec. <a href="#S7" class="ltx_ref" title="7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">7</a> reviews benchmarks, evaluation methodology, and model–harness evidence. Sec. <a href="#S8" class="ltx_ref" title="8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">8</a> discusses open challenges and future directions, and Sec. <a href="#S9" class="ltx_ref" title="9 Conclusion ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">9</a> concludes. Fig. <a href="#S1.F1" class="ltx_ref" title="Fig. 1 ‣ 1.1 Harness Design as a Performance Lever ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">1</a> summarizes the overall structure of this survey.









## 2 Background and Definitions



Two abstraction levels are often conflated in the agent literature. At the functional level, an agent is a goal-directed closed-loop system: it perceives an external environment, maintains task state, reasons and decides, executes actions, and adapts from feedback. At the implementation level, an LLM-based agent is not the foundation model alone, but a coupled system consisting of a foundation model and an execution harness. The model supplies flexible language understanding, reasoning, planning, and action proposal; the harness supplies the runtime machinery that exposes observations, constructs context, executes actions, persists state, and verifies or recovers from failures. This distinction reconciles classical agent definitions with recent harness-centered accounts of LLM agents: the former define *what* an agent must do, whereas the latter specify *how* those functions are realized in deployed systems.



<figure id="S2.F2" class="ltx_figure">
<img src="2606.20683v1/fig2-agent-concept.png" id="S2.F2.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/191;" width="476" height="191" alt="Refer to caption" />
<figcaption>Fig. 2: Functional view of an agent: a goal-directed closed-loop system that receives observations from external environments, maintains state, reasons and acts on the environment, and adapts from feedback or outcomes. This view defines <em>what</em> an agent must do, independent of any particular implementation.</figcaption>
</figure>



### 2.1 Functional View: What Is an Agent?



The notion of an agent predates LLMs. Wooldridge and Jennings \[<a href="#bib.bib18" class="ltx_ref">58</a>\] characterize an intelligent agent as a system situated in an environment, able to perceive that environment and act upon it in pursuit of goals \[<a href="#bib.bib17" class="ltx_ref">59</a>, <a href="#bib.bib123" class="ltx_ref">60</a>, <a href="#bib.bib92" class="ltx_ref">61</a>\]. For this survey, the defining property is not whether the system is implemented by symbolic rules, reinforcement learning, or a language model, but whether it sustains a goal-conditioned loop with its environment. We therefore use a functional definition: an agent is a system that organizes five operations around a task objective: perception, state maintenance, reasoning and decision-making, action, and feedback adaptation. The goal and environment condition a particular run, but they are not themselves internal components of the agent. As illustrated in Fig. <a href="#S2.F2" class="ltx_ref" title="Fig. 2 ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">2</a>, the agent receives observations, updates internal or external state, chooses the next action through reasoning and decision-making, acts on the environment, and incorporates feedback or outcomes into subsequent behavior. This closed-loop property separates agents from single-shot model calls, static retrieval systems, and fixed automation scripts that do not revise behavior as observations change.



<figure id="S2.F3" class="ltx_figure">

<figcaption>Fig. 3: Implementation view of an LLM-based agent as a foundation model coupled with an execution harness. The harness mediates closed-loop interaction between the model and the external world through six runtime components: observation interface, context manager, control loop, action interface, state and artifact store, and verification and governance layer. The section labels inside the figure indicate where each component is analyzed in detail.</figcaption>
</figure>





### 2.2 Implementation View: Model Plus Harness



In LLM-based agents, the functional loop is implemented by more than an inference call to a model. The foundation model is necessary because it provides the general-purpose cognitive capabilities that make open-ended task completion possible. It is not sufficient, however, because the model does not by itself define what observations are available, which actions are permitted, where long-term state is stored, how execution is validated, or how failures are recovered. Following recent industrial and academic discussions of harness engineering \[<a href="#bib.bib235" class="ltx_ref">22</a>, <a href="#bib.bib239" class="ltx_ref">7</a>\], we write LLM-based agent as:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{A}_{\mathrm{LLM}}=\langle\mathcal{M},\mathcal{H}\rangle=\langle\mathcal{M},\mathcal{I}_{\mathrm{obs}},\mathcal{C},\mathcal{L},\mathcal{I}_{\mathrm{act}},\mathcal{S},\mathcal{V}\rangle,
``` |  | (1) |





where $`\mathcal{M}`$ denotes the model layer of the agent. In the simplest case, $`\mathcal{M}`$ is a single foundation model. In deployed multi-model systems, $`\mathcal{M}=\{\mathcal{M}_{1},\ldots,\mathcal{M}_{k}\}`$ denotes a set of backbone models with heterogeneous capabilities, costs, and context limits \[<a href="#bib.bib90" class="ltx_ref">37</a>, <a href="#bib.bib78" class="ltx_ref">38</a>, <a href="#bib.bib245" class="ltx_ref">39</a>\]. $`\mathcal{H}`$ denotes the execution harness surrounding $`\mathcal{M}`$. The second equality expands the harness into six runtime components used throughout this survey. This expression is an implementation-oriented decomposition, not a replacement for the functional definition above. When $`|\mathcal{M}|=1`$, the agent reduces to the familiar single-backbone setting; when $`|\mathcal{M}|>1`$, the harness must additionally decide *which* model acts at each step \[<a href="#bib.bib218" class="ltx_ref">25</a>\]. The model layer and harness jointly instantiate the functional loop: the active model reasons over a supplied context and proposes next steps, while the harness determines what it sees, what it can do, how execution state persists, and how errors are detected, constrained, or repaired.







### 2.3 LLM as the Cognitive Engine



LLMs became viable cognitive engines for agents because they combine capabilities that previously required separate modules or task-specific policies.





Reasoning and planning. Prompting methods such as chain-of-thought \[<a href="#bib.bib127" class="ltx_ref">26</a>\], Tree of Thoughts \[<a href="#bib.bib125" class="ltx_ref">28</a>, <a href="#bib.bib117" class="ltx_ref">62</a>\], self-consistency \[<a href="#bib.bib126" class="ltx_ref">27</a>\], and Reflexion \[<a href="#bib.bib121" class="ltx_ref">63</a>\] show that sufficiently capable models can support task decomposition, branching search, self-critique, and multi-step inference. These abilities make the model a plausible decision engine for tasks whose solution cannot be enumerated in advance.





In-context adaptation. The same frozen model can adapt its behavior through instructions, examples, retrieved documents, tool descriptions, and intermediate artifacts. This reduces the need to train a separate policy for each environment, while making the quality, ordering, and compression of the supplied context a primary determinant of behavior.





Action proposal and tool use. When models can emit structured tool calls \[<a href="#bib.bib120" class="ltx_ref">32</a>, <a href="#bib.bib119" class="ltx_ref">33</a>\], they are no longer limited to internal text generation. They can propose calls to code execution, retrieval systems, browsers, APIs, and external software. Yet a proposal is not an executed action: reliability depends on the harness to validate, dispatch, observe, and, when necessary, reject or repair the proposed action.





These strengths also expose the model’s limitations. LLMs remain vulnerable to hallucination, finite context windows, weak persistent memory, prompt sensitivity, and limited intrinsic ability to verify long-horizon outcomes. The harness is therefore not an optional engineering wrapper; it is the runtime layer that turns model capability into sustained, inspectable interaction with an environment.







### 2.4 Harness as the Runtime Substrate



Following \[<a href="#bib.bib235" class="ltx_ref">22</a>, <a href="#bib.bib239" class="ltx_ref">7</a>, <a href="#bib.bib240" class="ltx_ref">64</a>\], we use *harness* to denote the runtime infrastructure that surrounds the model and realizes closed-loop agent execution. The harness is broader than an individual tool, memory module, prompt template, or workflow script. It is the coordinating layer that decides which observations reach the model, how context is assembled, how the agent loop advances, how actions are executed, how state and artifacts persist, and how failures are detected, governed, and recovered. This runtime substrate can be formalized as:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{H}=\langle\mathcal{I}_{\mathrm{obs}},\mathcal{C},\mathcal{L},\mathcal{I}_{\mathrm{act}},\mathcal{S},\mathcal{V}\rangle.
``` |  | (2) |





The six components are:





- •
  

  Observation interface $`\mathcal{I}_{\mathrm{obs}}`$: transforms raw environment signals into model-usable observations, including terminal output, file diffs, screenshots, DOM states, API responses, logs, retrieved passages, and event streams.

  
- •
  

  Context manager $`\mathcal{C}`$: determines what information enters the model context, when it enters, and in what form, covering prompt construction, system instructions, retrieval, memory selection, compression, summarization, tool descriptions, and current task state.

  
- •
  

  Control loop $`\mathcal{L}`$: orchestrates the observe-reason-act-feedback cycle, including step scheduling, stopping criteria, retries, reflection, delegation, handoffs, and multi-agent coordination. In multi-model settings, $`\mathcal{L}`$ additionally implements model routing and role assignment.

  
- •
  

  Action interface $`\mathcal{I}_{\mathrm{act}}`$: maps model outputs to executable operations, such as function calls, MCP tools, shell or code execution, browser actions, file operations, API calls, and sub-agent invocations.

  
- •
  

  State and artifact store $`\mathcal{S}`$: persists execution state and products, including conversation history, plans, scratchpads, checkpoints, logs, traces, diffs, memory records, generated files, and task artifacts.

  
- •
  

  Verification and governance layer $`\mathcal{V}`$: checks, constrains, and repairs execution through tests, assertions, verifier models, sandbox policies, permission gates, rollback, retry, budget control, safety constraints, and audit traces.

  





Fig. <a href="#S2.F3" class="ltx_ref" title="Fig. 3 ‣ 2.1 Functional View: What Is an Agent? ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">3</a> visualizes this implementation view. The figure should be read as an execution architecture rather than a static checklist: observations, context, control, actions, state, and verification form a coupled runtime around the model, and their interaction determines whether model capability becomes reliable task completion.





This decomposition differs from earlier component taxonomies because it is operational rather than purely functional. For example, memory appears in the functional loop as state, but in a deployed system it may be realized through context selection, artifact storage, retrieval indices, session managers, or checkpointing policies. Similarly, action is not merely an abstract action space; it is mediated by schemas, permissions, sandboxes, execution APIs, and side-effect controls. By separating these runtime responsibilities from the model itself, the decomposition explains why harness changes can improve agent performance even when the underlying model is unchanged \[<a href="#bib.bib107" class="ltx_ref">21</a>, <a href="#bib.bib63" class="ltx_ref">23</a>, <a href="#bib.bib54" class="ltx_ref">24</a>\].







### 2.5 Key Infrastructure Primitives



Several infrastructure primitives recur across modern LLM-based agents. They should not be treated as concepts parallel to the harness. Rather, they instantiate specific harness responsibilities in deployed systems and make perception, action, communication, and governance concrete.





Tool and function calling. Structured tool invocation converts model outputs from free-form suggestions into machine-executable calls \[<a href="#bib.bib120" class="ltx_ref">32</a>, <a href="#bib.bib119" class="ltx_ref">33</a>\]. Tool schemas are primarily part of the action interface $`\mathcal{I}_{\mathrm{act}}`$, while tool descriptions, arguments, and returned results also shape the context manager $`\mathcal{C}`$ and observation interface $`\mathcal{I}_{\mathrm{obs}}`$.





Model Context Protocol (MCP). MCP \[<a href="#bib.bib243" class="ltx_ref">65</a>\] standardizes how LLM applications expose tools, data sources, and contextual resources to agents. In our notation, MCP primarily strengthens the boundary between the context manager and action interface by reducing connector fragmentation and making tool and data access more modular.





Agent-to-Agent communication. The Agent2Agent (A2A) protocol \[<a href="#bib.bib242" class="ltx_ref">66</a>\] targets interoperability among agents built by different vendors or frameworks. It is most relevant to the control loop $`\mathcal{L}`$ and action interface $`\mathcal{I}_{\mathrm{act}}`$, especially when delegation, negotiation, debate, or multi-agent collaboration becomes part of the execution process.





Sandboxed execution and approval. When agents can write files, execute code, browse the web, or call APIs, isolation becomes both a safety mechanism and a reproducibility primitive. Sandboxes constrain filesystem access, network egress, process execution, and resource usage, while approval policies determine when human authorization is required before an action is dispatched. These mechanisms belong primarily to the verification and governance layer $`\mathcal{V}`$.





Agent SDKs and tracing. Frameworks such as the OpenAI Agents SDK \[<a href="#bib.bib245" class="ltx_ref">39</a>\] expose reusable abstractions for tools, handoffs, tracing, and loops. They package common harness patterns into developer-facing interfaces, making runtime behavior more reusable, inspectable, and debuggable.





Tab. <a href="#S2.T2" class="ltx_ref" title="TABLE II ‣ 2.5 Key Infrastructure Primitives ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">II</a> summarizes how the conceptual operations in the functional agent loop are realized by the implementation components defined above. The mapping is many-to-many rather than one-to-one: perception depends not only on the observation interface, but also on the context manager that selects and formats observations for the model; feedback involves verification, control-loop decisions, and state updates. This many-to-many mapping bridges the conceptual view in Fig. <a href="#S2.F2" class="ltx_ref" title="Fig. 2 ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">2</a> and the implementation view in Fig. <a href="#S2.F3" class="ltx_ref" title="Fig. 3 ‣ 2.1 Functional View: What Is an Agent? ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">3</a>.



<figure id="S2.T2" class="ltx_table">
<table id="S2.T2.4" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S2.T2.4.1" class="ltx_tr">
<td id="S2.T2.4.1.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"> Functional operation </td>
<td id="S2.T2.4.1.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"> Harness components </td>
<td id="S2.T2.4.1.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"> Typical mechanisms </td>
</tr>
<tr id="S2.T2.4.2" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S2.T2.4.2.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt"> Perception </td>
<td id="S2.T2.4.2.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt"> ℐ<sub>obs</sub>, 𝒞 </td>
<td id="S2.T2.4.2.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt"> Logs, DOMs, screenshots, retrieval, summaries </td>
</tr>
<tr id="S2.T2.4.3" class="ltx_tr">
<td id="S2.T2.4.3.1" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> State Maintenance </td>
<td id="S2.T2.4.3.2" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> 𝒮, 𝒞 </td>
<td id="S2.T2.4.3.3" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> Memory, checkpoints, artifacts, conversation history </td>
</tr>
<tr id="S2.T2.4.4" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S2.T2.4.4.1" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> Reasoning, Decision </td>
<td id="S2.T2.4.4.2" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> ℳ, 𝒞, ℒ </td>
<td id="S2.T2.4.4.3" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> Prompted reasoning, plans, tool-choice context </td>
</tr>
<tr id="S2.T2.4.5" class="ltx_tr">
<td id="S2.T2.4.5.1" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> Action </td>
<td id="S2.T2.4.5.2" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> ℐ<sub>act</sub>, 𝒱 </td>
<td id="S2.T2.4.5.3" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 4.0pt; padding-right: 4.0pt"> Function calls, shell commands, APIs, approval gates </td>
</tr>
<tr id="S2.T2.4.6" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S2.T2.4.6.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt"> Feedback Adaptation </td>
<td id="S2.T2.4.6.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt"> 𝒱, ℒ, 𝒮 </td>
<td id="S2.T2.4.6.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt"> Tests, reflection, retries, rollback, trace updates </td>
</tr>
</tbody>
</table>
<figcaption>TABLE II: Mapping from conceptual agent operations to harness realizations.</figcaption>
</figure>



With these definitions in place, common application labels can be read as specializations of the same model-harness architecture. Coding, web/GUI, research, embodied, and domain-specific agents all rely on the same six runtime components, but they stress different parts of the harness because their observation channels, action spaces, feedback signals, and safety constraints differ. Representative examples are summarized in Tab. <a href="#S2.T3" class="ltx_ref" title="TABLE III ‣ 2.5 Key Infrastructure Primitives ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">III</a>.



<figure id="S2.T3" class="ltx_table">
<table id="S2.T3.4" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S2.T3.4.1" class="ltx_tr">
<td id="S2.T3.4.1.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt" style="padding-left: 2.5pt; padding-right: 2.5pt"> Type </td>
<td id="S2.T3.4.1.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt" style="padding-left: 2.5pt; padding-right: 2.5pt"> Examples </td>
<td id="S2.T3.4.1.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt" style="padding-left: 2.5pt; padding-right: 2.5pt"> Environment </td>
<td id="S2.T3.4.1.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt" style="padding-left: 2.5pt; padding-right: 2.5pt"> Challenge </td>
</tr>
<tr id="S2.T3.4.2" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S2.T3.4.2.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t" style="padding-left: 2.5pt; padding-right: 2.5pt"> Coding </td>
<td id="S2.T3.4.2.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t" style="padding-left: 2.5pt; padding-right: 2.5pt"> Claude Code, Codex </td>
<td id="S2.T3.4.2.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t" style="padding-left: 2.5pt; padding-right: 2.5pt"> Repository, terminal </td>
<td id="S2.T3.4.2.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t" style="padding-left: 2.5pt; padding-right: 2.5pt"> Long-horizon reliability </td>
</tr>
<tr id="S2.T3.4.3" class="ltx_tr">
<td id="S2.T3.4.3.1" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Web / GUI </td>
<td id="S2.T3.4.3.2" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Operator, VisualWebArena </td>
<td id="S2.T3.4.3.3" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Browser, desktop </td>
<td id="S2.T3.4.3.4" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Grounding, safe interaction </td>
</tr>
<tr id="S2.T3.4.4" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S2.T3.4.4.1" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Research </td>
<td id="S2.T3.4.4.2" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Deep Research, Elicit </td>
<td id="S2.T3.4.4.3" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Web, literature </td>
<td id="S2.T3.4.4.4" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Synthesis, citation fidelity </td>
</tr>
<tr id="S2.T3.4.5" class="ltx_tr">
<td id="S2.T3.4.5.1" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Embodied </td>
<td id="S2.T3.4.5.2" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Voyager </td>
<td id="S2.T3.4.5.3" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Real world </td>
<td id="S2.T3.4.5.4" class="ltx_td ltx_align_left ltx_align_middle" style="padding-left: 2.5pt; padding-right: 2.5pt"> Sim-to-real transfer, safety </td>
</tr>
<tr id="S2.T3.4.6" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S2.T3.4.6.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb" style="padding-left: 2.5pt; padding-right: 2.5pt"> Domain-specific </td>
<td id="S2.T3.4.6.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb" style="padding-left: 2.5pt; padding-right: 2.5pt"> ChemCrow, Agent Hospital </td>
<td id="S2.T3.4.6.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb" style="padding-left: 2.5pt; padding-right: 2.5pt"> Specialized tools </td>
<td id="S2.T3.4.6.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb" style="padding-left: 2.5pt; padding-right: 2.5pt"> Compliance, domain expertise </td>
</tr>
</tbody>
</table>
<figcaption>TABLE III: Representative types of LLM-based agents.</figcaption>
</figure>







## 3 The Limits of Model-Centric Scaling



Once an LLM-based agent is viewed as a model coupled with an execution harness, the role of foundation-model scaling can be stated more precisely. Scaling remains one of the main reasons why LLMs can serve as the cognitive engine of modern agents. Scaling laws first showed that language-modeling loss improves predictably with model size, data, and compute \[<a href="#bib.bib37" class="ltx_ref">67</a>\], while Chinchilla-style results refined this picture by emphasizing compute-optimal allocation between model parameters and training tokens \[<a href="#bib.bib36" class="ltx_ref">68</a>\]. The empirical impact is broad: larger and better-trained models have improved reasoning and problem solving \[<a href="#bib.bib43" class="ltx_ref">69</a>\], code generation \[<a href="#bib.bib45" class="ltx_ref">70</a>, <a href="#bib.bib46" class="ltx_ref">71</a>\], mathematical reasoning \[<a href="#bib.bib35" class="ltx_ref">72</a>, <a href="#bib.bib34" class="ltx_ref">73</a>\], and multimodal understanding \[<a href="#bib.bib47" class="ltx_ref">74</a>, <a href="#bib.bib48" class="ltx_ref">75</a>\]. These gains make stronger foundation models indispensable to agent systems, but they don’t make model size a complete account of agent performance. Long-horizon task completion is a trajectory-level property: an agent must repeatedly observe, construct context, choose actions, preserve state, interpret feedback, and recover from errors. The relevant question is therefore where model-centric explanation stops and runtime design begins. Two boundaries are especially important: a *resource-performance boundary* and a *measurement boundary*.





### 3.1 Resource-Performance Boundary



The first limit concerns how much additional capability is obtained for additional resources. Increasing model capacity continues to improve frontier performance, but the gains are increasingly costly, uneven across capabilities, and constrained by inference latency and deployment complexity. LLaMA3.1 \[<a href="#bib.bib30" class="ltx_ref">76</a>\] provides a representative example: moving from the 70B model to the 405B model increased training compute from 7.0M to 30.84M H100 GPU hours, but yielded modest gains on several representative benchmarks, including 2.6 points on MMLU \[<a href="#bib.bib50" class="ltx_ref">12</a>\], 2.6 points on MBPP EvalPlus \[<a href="#bib.bib33" class="ltx_ref">77</a>\], and 1.7 points on GSM8K \[<a href="#bib.bib52" class="ltx_ref">78</a>\]. The larger model also remained far from near-perfect performance on harder reasoning benchmarks such as MATH \[<a href="#bib.bib32" class="ltx_ref">79</a>\] and MMLU-Pro \[<a href="#bib.bib22" class="ltx_ref">80</a>\]. Similar uneven returns are also visible in Qwen3 \[<a href="#bib.bib29" class="ltx_ref">81</a>\], where gains from a much larger base model vary substantially across benchmarks.



<figure id="S3.F4" class="ltx_figure">

<figcaption>Fig. 4:  Evolution of frontier-model performance on MMLU-Pro and GPQA Diamond. Recent GPT, Claude, and Gemini releases increasingly occupy a narrow high-score range on both benchmarks, making later improvements less discriminative than earlier model-generation jumps. </figcaption>
</figure>



Closed-source frontier models show the same pattern at the high-performance end. MMLU-Pro \[<a href="#bib.bib22" class="ltx_ref">80</a>, <a href="#bib.bib223" class="ltx_ref">82</a>\] and GPQA Diamond \[<a href="#bib.bib27" class="ltx_ref">13</a>, <a href="#bib.bib233" class="ltx_ref">83</a>\] remain challenging, but recent GPT, Claude, and Gemini releases increasingly cluster within a narrow score range, as shown in Fig. <a href="#S3.F4" class="ltx_ref" title="Fig. 4 ‣ 3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">4</a>. This does not mean that scaling has stopped working. Rather, once models enter a high-accuracy regime on common evaluations, additional scale often yields smaller and more capability-specific improvements while imposing higher cost, latency, and operational burden. For agents, this trade-off is amplified: a deployed agent invokes the model repeatedly across an execution trajectory, so per-call cost and latency accumulate, and small errors can compound over many steps.







### 3.2 Measurement Boundary



The second limit concerns how scaling-driven progress is measured. Model-centric progress has often been validated through aggregate gains on static benchmarks. This was informative when benchmarks clearly separated model generations, but it becomes less discriminative when frontier systems cluster near the upper range of same metrics. The compression in Fig. <a href="#S3.F4" class="ltx_ref" title="Fig. 4 ‣ 3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">4</a> illustrates the problem: small score differences on saturated benchmarks are difficult to interpret as meaningful differences in real-world agent capability.





The deeper issue is structural. Many traditional benchmarks are static, short-horizon, and self-contained: the input is fixed, the output is evaluated once, and the environment does not change in response to the model’s actions. Agent tasks have a different form, they require long-context understanding, multi-step reasoning, environment interaction, tool use, adaptation to underspecified goals, and robustness to intermediate errors \[<a href="#bib.bib171" class="ltx_ref">84</a>, <a href="#bib.bib157" class="ltx_ref">85</a>, <a href="#bib.bib172" class="ltx_ref">86</a>, <a href="#bib.bib174" class="ltx_ref">87</a>, <a href="#bib.bib173" class="ltx_ref">88</a>, <a href="#bib.bib175" class="ltx_ref">89</a>, <a href="#bib.bib176" class="ltx_ref">90</a>, <a href="#bib.bib166" class="ltx_ref">91</a>\]. Recent evaluations make this mismatch explicit. For example, SWE-bench \[<a href="#bib.bib93" class="ltx_ref">16</a>\], BigCodeBench \[<a href="#bib.bib19" class="ltx_ref">92</a>\] and LiveClowBench \[<a href="#bib.bib14" class="ltx_ref">93</a>\] show that coding capability depends on repository-level context, executable environments, and realistic modification constraints, while MultiChallenge \[<a href="#bib.bib20" class="ltx_ref">94</a>\] shows that dialogue evaluation must capture inferential memory, revision, and consistency across turns. Together, these limits shift the central question from whether stronger models matter to how model competence is converted into dependable execution. Agent evaluation must therefore consider task duration, step count, environmental uncertainty, tool-use complexity, state persistence, and recovery demand. For example, a recent time-horizon study \[<a href="#bib.bib21" class="ltx_ref">95</a>\] evaluates agents by the duration of human tasks they can complete at a fixed success probability, rather than by single-shot accuracy alone. This framing makes long-horizon reliability central: progress depends not only on model competence, but also on the runtime that turns competence into sustained action, including what the model observes, how context is constructed, which actions are available, where state is preserved, and how errors are detected or repaired. This helps explain why agent engineering has moved from eliciting isolated model responses toward designing the surrounding execution environment.









## 4 Paradigm Shifts in Agent Engineering



The limits of model-centric scaling in Sec. <a href="#S3" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">3</a> raise a more precise question for agent systems: where is reliable agentic behavior actually produced? Early LLM-based systems placed much of this burden on prompting, assuming that latent model capabilities could be elicited by effective instructions. As tasks required external knowledge, tool use, memory, and intermediate artifacts, the focus shifted to agentic workflows and context engineering. When these workflows became longer, more stateful, and more failure-prone, the bottleneck moved from organizing information for the model to controlling execution around the model, elevating the harness from an implementation detail to a first-class design object. More recently, verification and recovery have also become training targets, suggesting that some agentic behaviors may be internalized rather than externally scaffolded. These phases coexist in present systems, but together they reveal a migration of bottlenecks from prompt elicitation, to context and workflow organization, to harness-level execution control, to compositional and learnable multi-model runtimes, and finally toward agent-native training and model–harness co-evolution. Fig. <a href="#S4.F5" class="ltx_ref" title="Fig. 5 ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">5</a> summarizes this migration as a change in the locus of engineering effort, not as a claim that later paradigms replace earlier ones.



<figure id="S4.F5" class="ltx_figure">
<img src="2606.20683v1/fig1_v2.png" id="S4.F5.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/148;" width="476" height="148" alt="Refer to caption" />
<figcaption>Fig. 5: Four paradigms of agent engineering. The main locus of effort shifts from eliciting model behavior, to organizing context, stabilizing execution, composing and learning multi-model runtimes, and training or co-evolving agentic behavior.</figcaption>
</figure>



### 4.1 Phase 1: Prompt Engineering



Phase 1 treated the prompt as the main interface through which latent model capabilities could be elicited and controlled. This view was established by in-context learning and then extended through zero-shot and few-shot prompting, chain-of-thought prompting, self-consistency, tree-style reasoning, self-refinement, ReAct-style reasoning-action traces, and automatic prompt optimization \[<a href="#bib.bib212" class="ltx_ref">1</a>, <a href="#bib.bib142" class="ltx_ref">96</a>, <a href="#bib.bib127" class="ltx_ref">26</a>, <a href="#bib.bib126" class="ltx_ref">27</a>, <a href="#bib.bib125" class="ltx_ref">28</a>, <a href="#bib.bib143" class="ltx_ref">97</a>, <a href="#bib.bib124" class="ltx_ref">36</a>, <a href="#bib.bib140" class="ltx_ref">98</a>\]. These methods made prompting a practical mechanism for task specification, reasoning elicitation, output-format control, and behavioral steering. More recent agent-oriented reasoning work broadens this phase from single-chain elicitation toward structured reasoning and planning. In software tasks, multi-agent optimization and question-driven self-QA extend prompting toward collaborative design reasoning \[<a href="#bib.bib70" class="ltx_ref">99</a>\], \[<a href="#bib.bib72" class="ltx_ref">100</a>\]. Self-evolving and graph-structured multi-agent methods further explore reasoning as an adaptive collaboration process rather than a linear trace alone \[<a href="#bib.bib73" class="ltx_ref">101</a>\], \[<a href="#bib.bib74" class="ltx_ref">102</a>\]. Other work makes reasoning traces operational for failure management \[<a href="#bib.bib75" class="ltx_ref">103</a>\], introduces reflection, branching, and rollback into web-agent reasoning\[<a href="#bib.bib76" class="ltx_ref">104</a>\], and uses reasoning gates to decide when web agents should continue or be constrained \[<a href="#bib.bib77" class="ltx_ref">105</a>\]. Heterogeneous-model assembly and intent-level skill abstraction also connect prompt-level reasoning with planning and computer-use skill organization \[<a href="#bib.bib78" class="ltx_ref">38</a>\], \[<a href="#bib.bib80" class="ltx_ref">106</a>\], while agentic software-architecture studies frame this progression as a shift from prompt-response interaction to goal-directed systems \[<a href="#bib.bib79" class="ltx_ref">107</a>\]. They are therefore essential to early agent systems, but their limitation is equally important for this survey’s argument. Prompt engineering primarily addresses an *expression and elicitation* problem: it improves how a task is posed to the model and how the model’s existing capabilities are invoked. It does not reliably provide knowledge absent from the model, maintain dynamically changing task state, validate external actions, or recover from failures over long execution trajectories. This motivates the next shift, from asking how to phrase the instruction to asking what information environment should surround each model call.







### 4.2 Phase 2: Workflows and Context Engineering



Phase 2 shifted the engineering focus from prompt design to agentic workflow orchestration and context management. This shift addressed two limitations left by prompting: the model may lack task-relevant knowledge, and the information needed during execution may change as the environment responds. Agentic workflows respond by sequencing model calls, retrieval, tool use, memory access, intermediate artifacts, and branching logic around the model \[<a href="#bib.bib148" class="ltx_ref">108</a>, <a href="#bib.bib149" class="ltx_ref">109</a>, <a href="#bib.bib150" class="ltx_ref">110</a>, <a href="#bib.bib151" class="ltx_ref">111</a>, <a href="#bib.bib152" class="ltx_ref">112</a>\]. Recent systems make this workflow view concrete in software and tool-use settings. SGAgent decomposes repository-level repair into suggestion-guided multi-agent collaboration \[<a href="#bib.bib108" class="ltx_ref">113</a>\], while studies of agentic coding-tool configuration show that performance depends not only on the base model, but also on workflow and tool settings \[<a href="#bib.bib110" class="ltx_ref">114</a>\]. Tool-use-oriented work further synthesizes tool-use trajectories through multi-agent role-playing \[<a href="#bib.bib109" class="ltx_ref">115</a>\] and studies extended tool-integrated reasoning as a way to scale agentic workflows beyond isolated tool calls \[<a href="#bib.bib44" class="ltx_ref">116</a>\]. Within these workflows, context engineering provides the central technical perspective: context is no longer a static prompt string, but a dynamically assembled runtime object. Formally, instead of assuming $`C`$=$`\mathrm{prompt}`$, context is treated as:





|  |  |  |  |
|----|----|----|----|
|  | 
``` math
C=A(c_{1},c_{2},\dots,c_{n}),
``` |  | (3) |

where $`A`$ denotes a high-level assembly function that combines contextual components $`c_{i}`$, including instructions, retrieved knowledge, tool descriptions and outputs, memory records, task state, intermediate artifacts, and the current query, into the final context $`C`$. Under this view \[<a href="#bib.bib141" class="ltx_ref">117</a>\], the engineering problem changes from optimizing the wording of a prompt to optimizing the functions that retrieve, select, compress, format, and refresh information during execution:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
F^{*}=\arg\max_{F}\mathbb{E}_{\tau\sim T}\left[\mathrm{Reward}\!\left(P_{\theta}\!\left(Y\mid C_{F}(\tau)\right),\,Y_{\tau}^{*}\right)\right],
``` |  | (4) |

where $`F`$ denotes the set of context-construction functions, $`C_{F}(\tau)`$ is the context produced for task instance $`\tau`$, and $`Y_{\tau}^{*}`$ denotes the desired or reference outcome. The objective is to maximize expected task quality under the constructed context, rather than to optimize a single instruction in isolation.





Agentic workflows therefore reframed the core engineering question from how to write better instructions to how to construct, organize, and update the information and tool-use environment available during execution. This development can be read through three closely related directions. The first focused on external information access. Retrieval-based methods such as RAG \[<a href="#bib.bib144" class="ltx_ref">30</a>, <a href="#bib.bib128" class="ltx_ref">118</a>\] introduced a practical mechanism for exposing non-parametric knowledge to the model, while retrieval-augmented architectures such as Fusion-in-Decoder \[<a href="#bib.bib130" class="ltx_ref">119</a>\], RETRO \[<a href="#bib.bib129" class="ltx_ref">120</a>\], and Atlas \[<a href="#bib.bib139" class="ltx_ref">121</a>\] further strengthened this paradigm. Later systems such as RAPTOR \[<a href="#bib.bib137" class="ltx_ref">122</a>\], GraphRAG \[<a href="#bib.bib31" class="ltx_ref">123</a>\], and HippoRAG \[<a href="#bib.bib138" class="ltx_ref">124</a>\] extended retrieval from flat passage lookup to richer pipelines based on hierarchical summarization, graph construction, and relation-aware memory organization.





The second direction focused on systematic context management. Here the question is not only what to retrieve, but also when to inject information, how to compress it, how to refresh it, and how to preserve task-relevant state over long-horizon execution. This shift is reflected in methods such as ACON \[<a href="#bib.bib131" class="ltx_ref">125</a>\], which formulates context compression as an optimization problem, ARC \[<a href="#bib.bib136" class="ltx_ref">126</a>\], which treats context as a dynamically managed internal state updated through reflection, and ContextBudget \[<a href="#bib.bib132" class="ltx_ref">127</a>\], which makes compression decisions under explicit context-window constraints. Related work further examines context maintenance in software and long-horizon settings, including CAT \[<a href="#bib.bib133" class="ltx_ref">128</a>\], which elevates context maintenance into a callable tool within the agent loop, and Compressing Code Context for LLM-based Issue Resolution \[<a href="#bib.bib135" class="ltx_ref">129</a>\], which studies how to distill and preserve task-relevant code context under limited budgets.





The third direction treated context itself as an explicit object of evaluation and optimization. Benchmarks such as ContextBench \[<a href="#bib.bib134" class="ltx_ref">130</a>\], SWE Context Bench \[<a href="#bib.bib103" class="ltx_ref">131</a>\], LoCoBench-Agent \[<a href="#bib.bib101" class="ltx_ref">132</a>\], and AgentLongBench \[<a href="#bib.bib105" class="ltx_ref">133</a>\] made context retrieval, retention, and utilization measurable research targets. More recent work such as ACE \[<a href="#bib.bib111" class="ltx_ref">134</a>\] and MCE \[<a href="#bib.bib104" class="ltx_ref">135</a>\] further treats contexts, and even context-engineering strategies, as adaptive optimization targets. Accordingly, Phase 2 can be read as a progression from external information access, to systematic context management, and finally to explicit context evaluation and adaptive context optimization.





Yet even well-engineered workflows and context do not by themselves guarantee reliable agency. They arrange information, tools, and intermediate steps around the model, but they do not fully specify how the overall process should remain stable, verifiable, and recoverable. As tasks became increasingly tool-augmented, stateful, and failure-prone, the bottleneck shifted from managing the information and workflow environment to designing the execution environment itself. Context did not disappear; it became one core component within a broader execution layer that must also manage action, state persistence, and verification.







### 4.3 Phase 3: Harness Engineering



This phase begins when the central bottleneck is no longer only how a workflow assembles information and tool calls, but how the agent is controlled across a multi-step execution trajectory. Agentic workflows improve what enters the context window and which tools are invoked, but many long-horizon failures are not caused by missing information alone. They are execution failures: the agent loses track of progress, misuses tools, drifts from the original objective, repeats unproductive steps, or fails to recover after an error.





Harness engineering emerges from this execution-level bottleneck. As defined in Sec. <a href="#S2.SS4" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">2.4</a>, the harness is the structured runtime layer that organizes and stabilizes agent execution. It determines what the agent observes, what actions it may take, what state is carried forward, how control advances, and how failures are detected, constrained, or repaired. Workflow and context design remain important, but they become components within a broader execution layer that also manages observation, action, persistent state, verification, and governance.





Evidence that harness design matters. The case for harness design is no longer based only on engineering intuition or isolated examples. SWE-agent \[<a href="#bib.bib107" class="ltx_ref">21</a>\] showed that redesigning the agent-computer interface alone can substantially improve coding-agent performance under a fixed model. NLAH framed harness modules as portable and inspectable artifacts, and reported controlled ablations indicating that their contributions are measurable and additive \[<a href="#bib.bib63" class="ltx_ref">23</a>\]. Meta-Harness went one step further by treating harness optimization itself as a search problem, showing that automatically improved harnesses can outperform hand-designed baselines on Terminal-Bench \[<a href="#bib.bib54" class="ltx_ref">24</a>, <a href="#bib.bib61" class="ltx_ref">20</a>\]. Recent works extend this evidence from coding-agent interfaces to runtime orchestration and formal control mechanisms \[<a href="#bib.bib153" class="ltx_ref">136</a>, <a href="#bib.bib177" class="ltx_ref">137</a>, <a href="#bib.bib154" class="ltx_ref">138</a>\]. Other systems treat memory, protocol interoperability, contextual problem enhancement, and enterprise context lifecycles as harness-level design objects \[<a href="#bib.bib178" class="ltx_ref">139</a>, <a href="#bib.bib179" class="ltx_ref">140</a>, <a href="#bib.bib180" class="ltx_ref">141</a>, <a href="#bib.bib167" class="ltx_ref">142</a>, <a href="#bib.bib181" class="ltx_ref">143</a>, <a href="#bib.bib168" class="ltx_ref">144</a>\]. These results suggest that harness design has become a first-class optimization surface rather than a secondary implementation detail. More experimental results can be found in Sec. <a href="#S7" class="ltx_ref" title="7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">7</a>.





Industrial and ecosystem perspectives. The same transition is visible in industrial systems. Anthropic’s public guidance emphasizes minimal, legible tools and disciplined runtime behavior \[<a href="#bib.bib241" class="ltx_ref">6</a>, <a href="#bib.bib246" class="ltx_ref">145</a>, <a href="#bib.bib240" class="ltx_ref">64</a>\]. OpenAI’s guidance emphasizes environment design, structured artifacts, and reusable agent infrastructure \[<a href="#bib.bib239" class="ltx_ref">7</a>, <a href="#bib.bib244" class="ltx_ref">146</a>, <a href="#bib.bib245" class="ltx_ref">39</a>\]. Microsoft’s Magentic-One highlights multi-agent orchestration for complex web and file tasks \[<a href="#bib.bib90" class="ltx_ref">37</a>\], while open-source systems \[<a href="#bib.bib106" class="ltx_ref">10</a>, <a href="#bib.bib218" class="ltx_ref">25</a>\], *e.g*., OpenHands, expose harness itself as inspectable code.





At the ecosystem level, recent protocol-centered benchmarks reinforce the same shift by evaluating whether agents can invoke real services under realistic tool-routing conditions. MCPWorld \[<a href="#bib.bib86" class="ltx_ref">147</a>\], MCP-Atlas \[<a href="#bib.bib16" class="ltx_ref">148</a>\], MCPAgentBench \[<a href="#bib.bib81" class="ltx_ref">149</a>\], and OSWorld-MCP \[<a href="#bib.bib67" class="ltx_ref">150</a>\] move the discussion from abstract protocol design to measurable runtime behavior. Together, these systems and benchmarks suggest that harness engineering is becoming not only an engineering practice, but also a shared layer of infrastructure, evaluation, and design philosophy.





Design principles. Across papers and systems, several high-level principles recur:





- •
  

  Legibility: the runtime should expose the right state at the right level of abstraction.

  
- •
  

  Mechanical enforcement: constraints that matter for safety, correctness, or reproducibility should be enforced by the runtime when possible, rather than delegated entirely to prompt obedience.

  
- •
  

  Verification in the loop: long-horizon autonomy without intermediate checks is structurally brittle.

  
- •
  

  Explicit artifacts: plans, logs, diffs, summaries, and other intermediate products should exist as inspectable objects that can be reused, audited, or handed off.

  





These principles make the harness concrete rather than metaphorical. It must expose observations, assemble context, organize control, mediate actions, persist state, and enforce verification and governance as a coupled runtime system. Sec. <a href="#S5" class="ltx_ref" title="5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">5</a> therefore turns the phase-level argument into an anatomy of the six harness components.





Multi-model harnesses. Many recent systems no longer treat one model as the sole cognitive engine for every step. Instead, the harness composes heterogeneous models for planning, coding, tool use, verification, retrieval, and domain-specific subtasks \[<a href="#bib.bib90" class="ltx_ref">37</a>, <a href="#bib.bib78" class="ltx_ref">38</a>, <a href="#bib.bib245" class="ltx_ref">39</a>, <a href="#bib.bib106" class="ltx_ref">10</a>, <a href="#bib.bib148" class="ltx_ref">108</a>\]. This changes the control loop from “one model iterates until done” to “the runtime decides which model acts next, with what context, and under what constraints.” Representative patterns include planner–executor–verifier decomposition, specialist routing, debate or committee-style validation, and handoffs among sub-agents \[<a href="#bib.bib90" class="ltx_ref">37</a>, <a href="#bib.bib108" class="ltx_ref">113</a>, <a href="#bib.bib109" class="ltx_ref">115</a>, <a href="#bib.bib145" class="ltx_ref">151</a>\]. From the harness-anatomy view in Sec. <a href="#S5" class="ltx_ref" title="5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">5</a>, multi-model design \[<a href="#bib.bib243" class="ltx_ref">65</a>, <a href="#bib.bib242" class="ltx_ref">66</a>, <a href="#bib.bib86" class="ltx_ref">147</a>, <a href="#bib.bib67" class="ltx_ref">150</a>\]. primarily stresses the control loop $`\mathcal{L}`$, but it also reshapes the context manager $`\mathcal{C}`$, action interface $`\mathcal{I}_{\mathrm{act}}`$, and verification layer $`\mathcal{V}`$ because different models may observe, act, and judge under different scopes and permissions.





Learnable harnesses. In parallel, the harness itself is becoming an optimizable object. NLAH \[<a href="#bib.bib63" class="ltx_ref">23</a>\] treats harness logic as editable and portable runtime artifacts; Meta-Harness \[<a href="#bib.bib54" class="ltx_ref">24</a>\] searches over harness configurations; and Agentic Harness Engineering (AHE) \[<a href="#bib.bib42" class="ltx_ref">40</a>\] evolves harness components from observability-driven feedback while holding the base model fixed. These systems differ in mechanism—manual editing, search, or trace-driven adaptation—but they share one implication: runtime policies for routing, tool exposure, memory use, and verification can be improved as directly as prompts once were.





Together, multi-model composition and learnable runtime policies mark a qualitative shift in what counts as an agent system. A lightweight prompt-driven loop can still behave like an agent on short horizons, but dependable long-horizon task completion increasingly requires designing a compositional runtime over multiple models, with explicit orchestration, verification, and adaptation policies.







### 4.4 Phase 4: Agent-Native Training and Co-Evolution



Phase 4 begins once the harness is viewed not only as a hand-stabilized runtime, but as a compositional and increasingly learnable system over one or more models (Sec. <a href="#S4.SS3" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">4.3</a>). The central question is therefore twofold: which agentic behaviors should be *internalized* into model parameters, and how should the model and harness *co-evolve* over deployment without sacrificing safety or inspectability.





Internalization through Interactive Training. The first direction internalizes agentic behavior into the model itself. Rather than relying solely on prompts, workflows, or runtime orchestration, models are increasingly trained to plan, use tools, verify intermediate states, and recover from errors in interactive environments \[<a href="#bib.bib184" class="ltx_ref">152</a>, <a href="#bib.bib185" class="ltx_ref">153</a>, <a href="#bib.bib155" class="ltx_ref">42</a>, <a href="#bib.bib186" class="ltx_ref">154</a>, <a href="#bib.bib69" class="ltx_ref">155</a>, <a href="#bib.bib64" class="ltx_ref">156</a>\].





Recent work reflects two closely related tendencies. The first strengthens reasoning-to-action behavior through reinforcement learning. Examples include DeepSeekMath \[<a href="#bib.bib34" class="ltx_ref">73</a>\], DeepSeek-R1 \[<a href="#bib.bib65" class="ltx_ref">43</a>\], and DAPO \[<a href="#bib.bib87" class="ltx_ref">157</a>\], which treat multi-step reasoning, action selection, and verification as trainable behaviors rather than purely prompt-induced ones. The second reduces train-test mismatch by training agents in environments closer to deployment. Examples include ProRL \[<a href="#bib.bib62" class="ltx_ref">158</a>\], WebRL \[<a href="#bib.bib99" class="ltx_ref">41</a>\], ComputerRL \[<a href="#bib.bib155" class="ltx_ref">42</a>\], Environment Tuning \[<a href="#bib.bib55" class="ltx_ref">159</a>\], daVinci-Dev \[<a href="#bib.bib56" class="ltx_ref">160</a>\], and Kimi-Dev \[<a href="#bib.bib60" class="ltx_ref">161</a>\]. Together, these lines suggest that behaviors first implemented externally—planning, tool invocation, reflection, and recovery—may gradually become partially learned inside the model. Internalization shifts the division of labor rather than removing the harness: more short-horizon behavior may move into model parameters, while the runtime still supplies environment access, state, and safety control.





Co-Evolution and Self-Improvement. The second direction extends agent engineering from one-time training to ongoing improvement of the full stack. Here the model, harness, and update policy may all change over deployment, using execution feedback to decide which changes to keep, revise, or roll back \[<a href="#bib.bib38" class="ltx_ref">44</a>, <a href="#bib.bib41" class="ltx_ref">45</a>, <a href="#bib.bib58" class="ltx_ref">46</a>, <a href="#bib.bib42" class="ltx_ref">40</a>, <a href="#bib.bib40" class="ltx_ref">162</a>\]. The goal is not only to move behavior into parameters, but to improve *how* the combined system learns from experience.





Several recent lines make this distinction concrete. Experience-driven systems such as EvolveR \[<a href="#bib.bib38" class="ltx_ref">44</a>\] and AgentEvolver \[<a href="#bib.bib41" class="ltx_ref">45</a>\] treat interaction trajectories as reusable learning signals through self-questioning, navigation, and attribution. Continual Harness \[<a href="#bib.bib40" class="ltx_ref">162</a>\] and reward-free self-evolution \[<a href="#bib.bib39" class="ltx_ref">163</a>\] explore online adaptation without relying on dense external rewards at inference time. Harness-side adaptation, exemplified by AHE \[<a href="#bib.bib42" class="ltx_ref">40</a>\], shows that runtime components can evolve even when the base model remains fixed. More ambitiously, recursive self-improvement systems such as SICA \[<a href="#bib.bib59" class="ltx_ref">164</a>\], Darwin Gödel Machine \[<a href="#bib.bib58" class="ltx_ref">46</a>\], and Hyperagents \[<a href="#bib.bib57" class="ltx_ref">165</a>\] suggest that the improvement mechanism itself may become modifiable over time.





We separate three layers that are often conflated under “self-evolve”. *Multi-model harnesses* define *who* performs each runtime role. *Learnable harnesses* define *how* runtime policies are optimized. *Co-evolution* defines *when and how* the model, harness, and improvement loop are jointly updated from deployment experience. These layers are complementary rather than interchangeable: compositional runtimes create the structure in which specialization and delegation become possible; learnable harnesses make runtime adaptation explicit; co-evolution governs long-horizon improvement under verification, safety and cost constraints.









## 5 Anatomy of the Execution Harness



Harness engineering shifts the optimization target from isolated prompts or workflows to the runtime that stabilizes agent execution. Following the formalization in Sec. <a href="#S2.SS4" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">2.4</a>, this runtime can be decomposed into six components: $`\mathcal{H}=\langle\mathcal{I}_{\mathrm{obs}},\mathcal{C},\mathcal{L},\mathcal{I}_{\mathrm{act}},\mathcal{S},\mathcal{V}\rangle`$. The decomposition is not intended as a software package diagram. Rather, it identifies the runtime responsibilities that repeatedly determine whether model capability becomes reliable task completion: what the model observes, what enters context, how execution advances, which actions are available, what state persists, and how the run is checked or constrained.





### 5.1 Observation Interface



The observation interface $`\mathcal{I}_{\mathrm{obs}}`$ determines which environment signals are exposed to the model and how those signals are rendered. It converts external state, such as terminal output, file diffs, screenshots, web DOMs, API responses, event streams, and logs, into observations that can be consumed by the current model call. Its design space includes three recurring questions: which state is relevant, at what abstraction level it should be represented, and when the observation should be refreshed. These choices matter because many long-horizon failures are not failures of reasoning alone. They are also failures of legibility: the needed state is absent, buried in noise, stale, or represented at a level that does not support the next decision.





Representative systems make this point concrete. SWE-agent showed that redesigning the agent-computer interface can substantially improve coding-agent performance under a fixed base model \[<a href="#bib.bib107" class="ltx_ref">21</a>\]. In web and desktop settings, benchmarks such as WebArena and OSWorld likewise reveal that success depends on whether visually and structurally complex interface state is converted into a form the model can actually use \[<a href="#bib.bib113" class="ltx_ref">17</a>, <a href="#bib.bib85" class="ltx_ref">18</a>\]. The general principle is therefore not to expose all available state, but to expose decision-relevant state in a faithful and usable representation. The dominant trade-off is richness versus tractability: rich observations improve grounding, but increase context cost and distractors; compressed observations are easier to process, but may discard task-critical evidence. An open problem is to design observation interfaces that remain faithful and decision-useful under partial observability, multimodal state, and long trajectories.







### 5.2 Context Manager



Context management first emerged as a central concern in agentic workflows. Within the harness, it becomes one runtime component among observation, control, action, persistence, and verification. The context manager $`\mathcal{C}`$ determines which available information enters the current model call and in what form. It selects, compresses, orders, and refreshes observations, tool outputs, retrieved evidence, memory records, summaries, instructions, and task artifacts before they become the working context for the next step \[<a href="#bib.bib167" class="ltx_ref">142</a>, <a href="#bib.bib187" class="ltx_ref">166</a>, <a href="#bib.bib188" class="ltx_ref">167</a>, <a href="#bib.bib189" class="ltx_ref">168</a>\]. Its main design choices concern inclusion, representation, refresh policy, and the amount of shared state exposed to active agents or sub-agents. As context engineering suggests, long-horizon performance depends less on simply increasing prompt length than on maintaining coherent task state over time \[<a href="#bib.bib234" class="ltx_ref">29</a>, <a href="#bib.bib168" class="ltx_ref">144</a>, <a href="#bib.bib190" class="ltx_ref">169</a>, <a href="#bib.bib191" class="ltx_ref">170</a>, <a href="#bib.bib194" class="ltx_ref">171</a>\].





Several implementation patterns recur. Retrieval-based systems bring in external documents or stored state on demand. Memory-oriented systems such as MemGPT separate the active context from a larger external memory \[<a href="#bib.bib118" class="ltx_ref">31</a>\]. Industrial harnesses increasingly externalize task state into explicit artifacts and selectively resurface those artifacts, rather than relying on a single ever-growing dialogue trace \[<a href="#bib.bib244" class="ltx_ref">146</a>\]. The dominant trade-off is fidelity versus manageability: raw histories preserve detail but scale poorly, whereas summaries and retrieved context are cheaper but can omit or distort important state. Thus, the crucial distinction is not between long and short prompts, but between monolithic and managed context. A key open problem is how to preserve summary faithfulness and state integrity while keeping context cost bounded, especially when context repair must interact with verification and recovery in long-horizon settings \[<a href="#bib.bib98" class="ltx_ref">172</a>\].







### 5.3 Control Loop



The control loop $`\mathcal{L}`$ organizes execution across steps, tools, and possible handoffs. It turns observation, reasoning, action, and feedback into a runnable process. This component determines whether the agent follows a simple perceive-act cycle, a ReAct-style loop, a plan-execute-verify routine, or a hierarchical and multi-agent workflow \[<a href="#bib.bib153" class="ltx_ref">136</a>, <a href="#bib.bib177" class="ltx_ref">137</a>, <a href="#bib.bib154" class="ltx_ref">138</a>, <a href="#bib.bib78" class="ltx_ref">38</a>, <a href="#bib.bib148" class="ltx_ref">108</a>\]. The main design questions are how control is divided between the model and the runtime, when plans are created or revised, when delegation is introduced, whether coordination is sequential or parallel, and when execution should stop. Long-horizon success depends not only on the model’s reasoning quality, but also on whether the runtime keeps execution stable under uncertainty.





Existing systems occupy different points in this space. Some retain lightweight iterative loops, while others impose explicit planner-executor-verifier decomposition or multi-agent coordination. Recent harness-oriented work makes orchestration itself an optimization target: NLAH treats harness logic as an editable artifact, and Meta-Harness treats harness configuration as a searchable design space \[<a href="#bib.bib63" class="ltx_ref">23</a>, <a href="#bib.bib54" class="ltx_ref">24</a>\]. This layer is therefore not merely about adding steps. It is about choosing how much structure to impose on the trajectory. The dominant trade-off is adaptability versus stability: freer loops can respond to unexpected states, but are more prone to drift, repeated failure, and coordination overhead; stronger orchestration improves reliability, but can reduce efficiency or overconstrain exploration. A standing challenge is to design control policies that remain robust across horizons and domains without making delegation, verification, and recovery prohibitively expensive.







### 5.4 Action Interface



The action interface $`\mathcal{I}_{\mathrm{act}}`$ maps model outputs to executable operations. It defines what the agent can do, how actions are specified, which permissions apply, and how action results are returned as subsequent observations. Recent tool-use studies further show that action-interface quality is a major source of agent reliability. Diagnostic work on tool invocation failures identifies cases where agents fail not because a tool is absent, but because the tool is poorly selected, invoked, or integrated into the execution trajectory \[<a href="#bib.bib25" class="ltx_ref">173</a>\]. ET-Agent studies behavior calibration for tool-integrated reasoning \[<a href="#bib.bib26" class="ltx_ref">174</a>\], and ToolTok represents tools as tokens to improve efficiency and generalization in GUI agents \[<a href="#bib.bib28" class="ltx_ref">175</a>\]. From a harness perspective, this layer shapes the agent’s effective action space. Its design space spans tool granularity (low-level environments versus high-level APIs), tool specification (free-form commands versus structured schemas), routing and interoperability (local tools versus protocol-based ecosystems such as MCP), and governance (permissions, side-effect control, and invocation constraints). Existing work shows that performance depends not only on whether tools exist, but on how the action interface makes them usable, composable, and governable.





Representative implementations range from terminals and browsers to structured callable APIs. SWE-agent is a canonical example of observation-action co-design: redesigning the agent-computer interface changes both what the model sees and how it acts, producing gains under a fixed base model \[<a href="#bib.bib107" class="ltx_ref">21</a>\]. Protocol-oriented infrastructures such as MCP move tool access toward a standardized interface layer across heterogeneous services \[<a href="#bib.bib243" class="ltx_ref">65</a>\], while benchmarks such as MCPWorld and OSWorld-MCP test whether agents can invoke such services reliably in realistic environments \[<a href="#bib.bib86" class="ltx_ref">147</a>, <a href="#bib.bib67" class="ltx_ref">150</a>\]. The dominant trade-off is flexibility versus controllability: low-level tools are general but difficult to use robustly, whereas high-level tools improve reliability but may narrow behavior too aggressively. An open question is how to design action abstractions that remain expressive and governable when tool use is coupled with verification, sandboxing, and recovery over long horizons.







### 5.5 State and Artifact Store



The state and artifact store $`\mathcal{S}`$ persists execution state across steps, sessions, and subtasks. It provides continuity beyond the active context window by storing task progress, traces, plans, checkpoints, diffs, generated files, memory records, and other reusable artifacts. Its design space includes the granularity of stored state, the scope of persistence, the storage form, and the update policy. Long-horizon agents often fail not because no state is stored, but because the wrong state is preserved, the right state cannot be retrieved, or stale state is treated as current.





Several strategies recur in the literature. Some systems rely on session-level histories and checkpoint stores. Memory-oriented approaches, such as MemGPT, introduce explicit long-term memory beyond the current context \[<a href="#bib.bib118" class="ltx_ref">31</a>\]. Artifact-centered harnesses track state through logs, diffs, checkpoints, and inspectable runtime objects \[<a href="#bib.bib244" class="ltx_ref">146</a>\]. What these approaches share is a move from transient interaction traces toward reusable system state. The dominant trade-off is completeness versus usability: richer state improves continuity, auditability, and handoff, but increases retrieval burden, noise, and the risk of stale memory. The practical challenge is not to store more, but to decide what deserves persistence, what should be compressed, and what should be discarded. An important open problem is how to maintain state fidelity while supporting rollback, delegation, and memory reuse without accumulating drift or obsolete information \[<a href="#bib.bib98" class="ltx_ref">172</a>\].







### 5.6 Verification and Governance



The verification and governance layer $`\mathcal{V}`$ checks, constrains, and repairs execution during runtime. Verification includes tests, assertions, verifier models, judge signals, and other mechanisms for estimating whether execution is progressing correctly. Governance includes approval gates, sandboxing, budget control, rollback, retry, escalation, and safe termination. This view is reflected in recent multi-agent governance works. For example, AI Committee uses multiple agents for validation and remediation of web-sourced data \[<a href="#bib.bib145" class="ltx_ref">151</a>\], while act-or-refuse learning studies when agents should proceed, abstain, or stop during safe multi-step tool use \[<a href="#bib.bib146" class="ltx_ref">176</a>\]. These examples show that governance is not only a deployment constraint, but also an explicit decision layer within agent execution. These two roles are tightly coupled: verification produces evidence about the run, while governance determines what the harness is allowed or required to do with that evidence. Reliable agents therefore depend not only on strong reasoning and rich tools, but also on whether checks and constraints are mechanically enforced rather than left entirely to prompt obedience.





Representative systems make this dual role clear. In coding agents, tests, linters, and assertions provide relatively strong verification signals, while rollback and sandboxed execution contain side effects \[<a href="#bib.bib93" class="ltx_ref">16</a>, <a href="#bib.bib61" class="ltx_ref">20</a>\]. In web, desktop, and other open-ended environments, governance becomes more central because actions may be partially irreversible and clean oracles are often unavailable \[<a href="#bib.bib113" class="ltx_ref">17</a>, <a href="#bib.bib85" class="ltx_ref">18</a>\]. The dominant trade-off is autonomy versus robustness: looser constraints permit broader exploration, but increase the risk of harmful actions and unrecoverable drift; tighter governance improves safety and recoverability, but can slow execution or block useful behavior. An open problem is to design verification and governance mechanisms that are selective and cost-aware, so the harness can distinguish recoverable local errors from deeper task-level collapse without over-triggering interruption or rollback.







### 5.7 Cross-Layer Interactions in the Harness



Although the six components are analytically separable, they do not operate independently. Design choices in one component often reshape the burden on others. The observation interface $`\mathcal{I}_{\mathrm{obs}}`$ and context manager $`\mathcal{C}`$ are tightly coupled: richer observations can improve grounding, but they also increase the cost of selection, compression, and formatting before information enters the active context \[<a href="#bib.bib131" class="ltx_ref">125</a>\]. The action interface $`\mathcal{I}_{\mathrm{act}}`$ interacts directly with verification and governance $`\mathcal{V}`$: more expressive actions expand capability, but require stronger permission control, sandboxing, rollback, and auditing. The state and artifact store $`\mathcal{S}`$ feeds back into context and verification because persistent plans, logs, checkpoints, and artifacts determine both what can be resurfaced to the model and what evidence is available for judging progress \[<a href="#bib.bib118" class="ltx_ref">31</a>, <a href="#bib.bib98" class="ltx_ref">172</a>\].





Harness design is therefore a coupled systems problem rather than the independent optimization of six modules. Improving one layer can shift risk elsewhere: stronger compression can reduce cost while weakening downstream verification; richer actions can improve task coverage while increasing governance pressure; more persistent state can improve continuity while also introducing stale or conflicting evidence. This coupling makes task structure part of harness design itself. Different domains, horizons, oracle strengths, and autonomy requirements place different pressure profiles over $`\mathcal{I}_{\mathrm{obs}}`$, $`\mathcal{C}`$, $`\mathcal{L}`$, $`\mathcal{I}_{\mathrm{act}}`$, $`\mathcal{S}`$, and $`\mathcal{V}`$. The same anatomy therefore becomes a way to read the task landscape: tasks differ by which runtime responsibilities they stress and which configuration choices become decisive.









## 6 Task Landscape and Harness Configuration



Task structure determines which parts of the execution harness become performance-critical. Seen through the harness anatomy, a task is not merely an application label but a pressure profile over observation, context, control, action, state, and governance. Long horizons, partial observability, weak feedback, irreversible actions, and autonomy requirements shift pressure toward different configuration choices, including context selections, action abstractions, verifier loops, checkpoints, permission gates, and escalation rules. The central question is therefore which runtime responsibility becomes the limiting factor under a given task condition.





### 6.1 A Harness-Aware Task Taxonomy



Agent tasks differ not only by application label, but by structural properties that determine which harness components limit performance, reliability, cost, or safety. We use three dimensions to characterize these pressures: task horizon, environment type, and autonomy level. Together, they identify the primary bottleneck: the component or small set of components where failures most often concentrate.





Complexity and task horizon. Tab. <a href="#S6.T4" class="ltx_ref" title="TABLE IV ‣ 6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">IV</a> summarizes four coarse levels. The most consequential transition is usually from L2 to L3. Single-step and short multi-step tasks can often be handled with local reasoning, lightweight action access, and local checks. Long-horizon tasks create sustained pressure on the Context Manager, State and Artifact Store, and Control Loop because plans, intermediate artifacts, failed attempts, and partial results must survive beyond one prompt window. At L4, open-ended monitoring or exploration additionally requires budget control, stopping criteria, and escalation policies, shifting the bottleneck toward explicit Verification and Governance rather than generation quality alone.



<figure id="S6.T4" class="ltx_table">
<table id="S6.T4.4" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S6.T4.4.1" class="ltx_tr">
<td id="S6.T4.4.1.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Level </td>
<td id="S6.T4.4.1.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Description </td>
<td id="S6.T4.4.1.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Examples </td>
<td id="S6.T4.4.1.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_tt"> Bottleneck </td>
</tr>
<tr id="S6.T4.4.2" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S6.T4.4.2.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> L1 </td>
<td id="S6.T4.4.2.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Single-step </td>
<td id="S6.T4.4.2.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Search, translate, calculate </td>
<td id="S6.T4.4.2.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_t"> Context Mgr.; Verif. &amp; Gov. </td>
</tr>
<tr id="S6.T4.4.3" class="ltx_tr">
<td id="S6.T4.4.3.1" class="ltx_td ltx_align_left ltx_align_middle"> L2 </td>
<td id="S6.T4.4.3.2" class="ltx_td ltx_align_left ltx_align_middle"> Multi-step </td>
<td id="S6.T4.4.3.3" class="ltx_td ltx_align_left ltx_align_middle"> Form filling, code generation </td>
<td id="S6.T4.4.3.4" class="ltx_td ltx_align_left ltx_align_middle"> Act. Interface; State Store; Verif. &amp; Gov. </td>
</tr>
<tr id="S6.T4.4.4" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S6.T4.4.4.1" class="ltx_td ltx_align_left ltx_align_middle"> L3 </td>
<td id="S6.T4.4.4.2" class="ltx_td ltx_align_left ltx_align_middle"> Long-horizon </td>
<td id="S6.T4.4.4.3" class="ltx_td ltx_align_left ltx_align_middle"> Repo-scale coding, research </td>
<td id="S6.T4.4.4.4" class="ltx_td ltx_align_left ltx_align_middle"> Context Mgr.; State Store; Ctrl. Loop </td>
</tr>
<tr id="S6.T4.4.5" class="ltx_tr">
<td id="S6.T4.4.5.1" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> L4 </td>
<td id="S6.T4.4.5.2" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> Open-ended </td>
<td id="S6.T4.4.5.3" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> Monitoring, auto exploration </td>
<td id="S6.T4.4.5.4" class="ltx_td ltx_align_left ltx_align_middle ltx_border_bb"> Verif. &amp; Gov.; Ctrl. Loop </td>
</tr>
</tbody>
</table>
<figcaption>TABLE IV: Harness-aware task complexity levels and their primary bottlenecks.</figcaption>
</figure>



Environment type. Environment type determines what the harness must observe and which actions it can expose \[<a href="#bib.bib192" class="ltx_ref">177</a>, <a href="#bib.bib159" class="ltx_ref">178</a>, <a href="#bib.bib164" class="ltx_ref">179</a>, <a href="#bib.bib193" class="ltx_ref">180</a>, <a href="#bib.bib156" class="ltx_ref">181</a>, <a href="#bib.bib183" class="ltx_ref">182</a>, <a href="#bib.bib195" class="ltx_ref">183</a>\]. Terminals and repositories stress the Action Interface, Observation Interface, and Verification and Governance components because commands, diffs, logs, and tests can often be wrapped as structured actions, observations, and verifier signals. Browser and desktop environments add visual or DOM grounding, session state, and persistent side effects, increasing pressure on observation construction, action abstraction, and permission boundaries. Knowledge environments, including web search, literature retrieval, and structured databases, shift the bottleneck toward the Context Manager and State and Artifact Store because the main challenge is managing evidence quality, provenance, and synthesis. Physical environments introduce real-time constraints and irreversibility, making the Control Loop and Verification and Governance more central than in purely digital settings. Social environments add norms, negotiation, and strategic responses, which raises the value of richer observation design and conservative escalation.





Autonomy level. Autonomy cuts across domains. Human-in-the-loop settings can route high-risk decisions through approval gates. Semi-autonomous systems delegate routine actions but escalate when uncertainty rises. Fully autonomous systems must absorb more of that burden inside the harness through verification, rollback, logging, and fail-safe termination. Autonomy is best understood as a multiplier on harness requirements: the more independently the system is expected to act, the more the Observation Interface and Verification and Governance move from optional guardrails to primary bottlenecks.





Taken together, these dimensions define a pressure profile over the six harness components. Task horizon mostly stresses context, state, and control; environment type mostly stresses observation, action, and safety boundaries; autonomy mostly stresses verification, logging, and recovery. This view turns task taxonomy into harness configuration: the key question is not simply which application domain a task belongs to, but which runtime responsibilities become bottlenecks under its structural pressures. The next subsection uses representative domains as case studies to illustrate this bottleneck migration in concrete settings.







### 6.2 Harness Adaptation by Domain



The following domains should be read as *instantiations* of the pressure-profile view above, not as a separate domain-only taxonomy. Each domain combines horizon, environment, oracle strength, irreversibility, and autonomy in a different way, thereby shifting the primary harness bottleneck. Software engineering is verification-dominant; web and GUI interaction is grounding-dominant; scientific discovery is synthesis-dominant; medical assistance is safety-dominant; and embodied agents are control-dominant. These cases show how the same harness anatomy leads to different configuration priorities once task pressures change. Tab. <a href="#S6.T5" class="ltx_ref" title="TABLE V ‣ 6.3 From Task Properties to Harness Configurations ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">V</a> later abstracts these examples into reusable configuration rules.





Software engineering (verification-dominant). Software engineering places the primary bottleneck on Verification and Governance \[<a href="#bib.bib182" class="ltx_ref">184</a>, <a href="#bib.bib161" class="ltx_ref">185</a>, <a href="#bib.bib196" class="ltx_ref">186</a>, <a href="#bib.bib198" class="ltx_ref">187</a>\]. Builds, unit tests, linters, and execution logs provide mechanical feedback signals that most other domains lack \[<a href="#bib.bib93" class="ltx_ref">16</a>\]. These strong oracles enable closed-loop generate-test-repair cycles, where verifier output becomes the next iteration’s evidence. Systems such as Claude Code, SWE-agent, and OpenHands further show that redesigning the Action Interface, including file and command interfaces, diff views, and patch inspection, can yield measurable gains at fixed model capability \[<a href="#bib.bib241" class="ltx_ref">6</a>, <a href="#bib.bib107" class="ltx_ref">21</a>, <a href="#bib.bib106" class="ltx_ref">10</a>\]. The State and Artifact Store is equally consequential: expressive action access must be paired with checkpoints, patch artifacts, safe rollback, and bounded side effects. As tasks scale from snippet-level generation (L2) to repo-scale issue resolution (L3-L4), the Context Manager and State and Artifact Store join the bottleneck set for tracking plans, failed hypotheses, and intermediate artifacts across long trajectories \[<a href="#bib.bib197" class="ltx_ref">188</a>, <a href="#bib.bib160" class="ltx_ref">189</a>, <a href="#bib.bib211" class="ltx_ref">190</a>, <a href="#bib.bib201" class="ltx_ref">191</a>\].





- •
  

  Configuration implication. Verification-dominant settings turn runtime quality into a closed-loop optimization problem; the harness response is verifier loops, generate-test-repair cycles, and reversible execution.

  





Web and GUI interaction (grounding-dominant). Web and GUI agents shift the primary bottleneck from verification to grounding: the core difficulty is constructing observations the model can use and actions it can execute safely \[<a href="#bib.bib113" class="ltx_ref">17</a>, <a href="#bib.bib94" class="ltx_ref">192</a>, <a href="#bib.bib85" class="ltx_ref">18</a>, <a href="#bib.bib67" class="ltx_ref">150</a>, <a href="#bib.bib206" class="ltx_ref">193</a>, <a href="#bib.bib207" class="ltx_ref">194</a>, <a href="#bib.bib209" class="ltx_ref">195</a>, <a href="#bib.bib210" class="ltx_ref">196</a>\]. The Observation Interface must render screenshots, DOM state, interaction history, and session information into usable signals. The Action Interface must decide whether actions are exposed as brittle low-level selectors or as structured browser and desktop operations. The Context Manager then selects and compresses these signals for the current step. Because many web goals lack a single mechanical oracle, verification is structurally weaker than in coding. Navigation mistakes, form submissions, and account actions can produce persistent side effects, so Verification and Governance remains part of the bottleneck rather than a secondary concern. As tasks move from short form filling (L2) through multi-page workflows (L3) to long-lived monitoring (L4), the grounding burden compounds.





- •
  

  Configuration implication. Grounding-dominant settings require co-design of observation and action interfaces; performance hinges on whether the harness exposes the right state in a form that also supports safe, robust action.

  





Scientific discovery and research (synthesis-dominant). Scientific agents shift the primary bottleneck to synthesis: the central runtime problem is trustworthy integration of evidence over long horizons \[<a href="#bib.bib115" class="ltx_ref">197</a>, <a href="#bib.bib100" class="ltx_ref">198</a>, <a href="#bib.bib208" class="ltx_ref">199</a>, <a href="#bib.bib158" class="ltx_ref">200</a>, <a href="#bib.bib205" class="ltx_ref">201</a>, <a href="#bib.bib204" class="ltx_ref">202</a>\]. The most stressed components are the Context Manager, State and Artifact Store, and Verification and Governance. Verification serves a different function here than in coding: rather than closing a test-based repair loop, it must assess provenance, source quality, and reasoning coherence. Tool-rich systems such as ChemCrow and BioDiscoveryAgent show that the Action Interface can expand capability, but without provenance tracking long-horizon reasoning can degrade into plausible but unsupported narrative. Research tasks are predominantly L3-L4: literature surveys, hypothesis generation, and experimental design require the harness to externalize evidence, intermediate claims, and artifacts more aggressively than in coding or web settings.





- •
  

  Configuration implication. Synthesis-dominant settings lack closed-loop verification; provenance tracking, intermediate review stages, and artifact-centered memory must substitute for end-state oracles.

  





Medical applications (safety-dominant). Medical agents inherit the synthesis demands of research settings but add a qualitatively different constraint: the primary bottleneck shifts to safety \[<a href="#bib.bib203" class="ltx_ref">203</a>, <a href="#bib.bib165" class="ltx_ref">204</a>, <a href="#bib.bib169" class="ltx_ref">205</a>, <a href="#bib.bib199" class="ltx_ref">206</a>\]. Verification and Governance moves to the top of the harness stack, with the Observation Interface and Context Manager close behind \[<a href="#bib.bib95" class="ltx_ref">207</a>\]. Patient history, guidelines, and recent findings must be surfaced accurately; consequential actions must be permission-gated; and uncertainty must trigger conservative escalation rather than confident continuation. The objective is not maximal autonomy, but bounded and inspectable assistance. In this regime, Verification and Governance is a performance-critical harness component rather than a compliance add-on.





- •
  

  Configuration implication. Safety-dominant settings optimize controlled delegation: approval gates, auditability, and conservative recovery are core harness components, not external overhead.

  





Embodied settings (control-dominant). Embodied agents shift the primary bottleneck to real-time control, elevating the Control Loop above other harness components \[<a href="#bib.bib122" class="ltx_ref">34</a>, <a href="#bib.bib163" class="ltx_ref">208</a>, <a href="#bib.bib202" class="ltx_ref">209</a>, <a href="#bib.bib200" class="ltx_ref">210</a>, <a href="#bib.bib162" class="ltx_ref">211</a>\]. High-level language reasoning is too slow for continuous interaction, so the harness typically becomes layered: deliberative planning at the top, reactive control below, and persistent skill or state representations connecting the two. The State and Artifact Store maintains goals, subgoals, maps, or reusable behaviors. Verification and Governance is critical because physical actions are often irreversible. The Action Interface exposes actuators, simulators, or perception modules rather than conventional software APIs. Embodied tasks span L3-L4 almost exclusively, making long-horizon state externalization a baseline requirement.





- •
  

  Configuration implication. Control-dominant settings push part of the stack below the language loop, motivating tighter integration between harness design, lower-level controllers, and training-time adaptation.

  





Cross-domain synthesis. The five domains trace a single analytic thread: the primary bottleneck migrates across harness components as domain constraints change. It moves from Verification and Governance in coding, through Observation Interface and Action Interface in web/GUI, to Context Manager and State and Artifact Store in research, Verification and Governance in medicine, and Control Loop in embodied settings. This migration pattern shows that domain labels alone are insufficient descriptors. What matters for harness configuration is which component absorbs the failure budget.







### 6.3 From Task Properties to Harness Configurations



The domain case studies above illustrate bottleneck migration, but the reusable lesson lies below the domain level. Across domains, similar task properties induce similar harness responses: long horizons require externalized state, partial observability requires structured observation, strong oracles enable verifier loops, weak or delayed oracles require provenance and review, irreversible actions require governance, and high autonomy requires logging, budgets, and recovery. Tab. <a href="#S6.T5" class="ltx_ref" title="TABLE V ‣ 6.3 From Task Properties to Harness Configurations ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">V</a> summarizes these domain-independent configuration rules.



<figure id="S6.T5" class="ltx_table">
<table id="S6.T5.4" class="ltx_tabular ltx_centering ltx_align_middle">
<tbody>
<tr id="S6.T5.4.1" class="ltx_tr">
<td id="S6.T5.4.1.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_tt" style="padding: 0.35pt 1.5pt">Task property</td>
<td id="S6.T5.4.1.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_tt" style="padding: 0.35pt 1.5pt">Failure pressure</td>
<td id="S6.T5.4.1.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_tt" style="padding: 0.35pt 1.5pt">Harness response</td>
<td id="S6.T5.4.1.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_tt" style="padding: 0.35pt 1.5pt">Critical components</td>
</tr>
<tr id="S6.T5.4.2" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S6.T5.4.2.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_t" style="padding: 0.35pt 1.5pt">Long horizon</td>
<td id="S6.T5.4.2.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_t" style="padding: 0.35pt 1.5pt">State drift</td>
<td id="S6.T5.4.2.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_t" style="padding: 0.35pt 1.5pt">Checkpoints, summaries, artifacts</td>
<td id="S6.T5.4.2.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_t" style="padding: 0.35pt 1.5pt">𝒞, 𝒮, ℒ</td>
</tr>
<tr id="S6.T5.4.3" class="ltx_tr">
<td id="S6.T5.4.3.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Partial observability</td>
<td id="S6.T5.4.3.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Indirect state</td>
<td id="S6.T5.4.3.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Structured observations, grounding, abstraction</td>
<td id="S6.T5.4.3.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">ℐ<sub>obs</sub>, 𝒞, ℐ<sub>act</sub></td>
</tr>
<tr id="S6.T5.4.4" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S6.T5.4.4.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Strong oracle</td>
<td id="S6.T5.4.4.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Checkable outcomes</td>
<td id="S6.T5.4.4.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Verifier loops, repair cycles</td>
<td id="S6.T5.4.4.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">𝒱, ℒ</td>
</tr>
<tr id="S6.T5.4.5" class="ltx_tr">
<td id="S6.T5.4.5.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Weak or delayed oracle</td>
<td id="S6.T5.4.5.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Uncertain success</td>
<td id="S6.T5.4.5.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Provenance tracking, review, approval</td>
<td id="S6.T5.4.5.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">𝒱, 𝒞, 𝒮</td>
</tr>
<tr id="S6.T5.4.6" class="ltx_tr" style="--ltx-bg-color:#ECECEC;">
<td id="S6.T5.4.6.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Irreversible actions</td>
<td id="S6.T5.4.6.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Persistent side effects</td>
<td id="S6.T5.4.6.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">Sandbox, gates, rollback</td>
<td id="S6.T5.4.6.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center" style="padding: 0.35pt 1.5pt">𝒱, ℐ<sub>act</sub></td>
</tr>
<tr id="S6.T5.4.7" class="ltx_tr">
<td id="S6.T5.4.7.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_bb" style="padding: 0.35pt 1.5pt">High autonomy or low latency</td>
<td id="S6.T5.4.7.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_bb" style="padding: 0.35pt 1.5pt">Limited human correction</td>
<td id="S6.T5.4.7.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_bb" style="padding: 0.35pt 1.5pt">Logging, budgets, controllers</td>
<td id="S6.T5.4.7.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_center ltx_border_bb" style="padding: 0.35pt 1.5pt">𝒱, ℒ, ℐ<sub>obs</sub></td>
</tr>
</tbody>
</table>
<figcaption>TABLE V: Mapping task properties to harness failure pressures and configuration responses.</figcaption>
</figure>



Verifier strength determines where configuration effort concentrates. Where strong automatic oracles exist, as in verification-dominant software engineering, the harness can invest heavily in closed-loop optimization through verifier loops and repair cycles. Where oracles are weak or delayed, as in synthesis-dominant research and safety-dominant medicine, the bottleneck migrates upstream toward provenance management, intermediate review, and conservative stopping criteria. Domains should therefore not be compared only by task success rates; they should also be compared by the quality and latency of feedback signals available to the harness.





Irreversibility and autonomy make constraints central. In read-mostly or reversible digital settings, recovery can often be handled through retries and checkpoints. In grounding-dominant web interaction, safety-dominant medical assistance, and control-dominant physical settings, actions can have persistent side effects. Verification and Governance therefore becomes part of the primary bottleneck rather than a peripheral add-on. Higher autonomy magnifies this pattern because the harness must absorb responsibilities that a human operator would otherwise carry.





Long-horizon performance depends on externalized state across all domains. Whether the task is repo-scale coding (L3), literature synthesis (L3-L4), or embodied exploration (L4), one prompt window is rarely the right unit of memory. Durable artifacts, summaries, checkpoints, plans, and logs keep trajectories coherent over time. The configuration consequence is that the Context Manager and State and Artifact Store must be designed jointly: summaries decide what is visible now, whereas artifacts and checkpoints decide what remains recoverable later.





Task pressure should be reported together with evaluation results. The mapping in Tab. <a href="#S6.T5" class="ltx_ref" title="TABLE V ‣ 6.3 From Task Properties to Harness Configurations ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">V</a> also constrains benchmark interpretation. Benchmarks are most informative when they stress the harness components that match the primary bottleneck of a target deployment setting. Benchmark reports should therefore describe not only the model, but also the task pressures and harness configuration under which results are obtained.









## 7 Evaluation and Empirical Analysis



Evaluation makes the model–harness interaction directly observable. Benchmark scores should therefore be interpreted as outcomes of a *model–harness pairing*: the same model may behave differently under different context policies, tool interfaces, control loops, verification procedures, and retry budgets. This section uses representative benchmarks to test this view across three interaction regimes: software-engineering tasks with strong test oracles, terminal tasks with command-line execution and environment manipulation, and web tasks with browser grounding and stateful interaction. Across these regimes, we try to answer three questions: *how much performance is explained by stronger backbone models, how much variation remains after conditioning on the model, and how runtime cost, latency, timeout behavior, and trace availability change the interpretation of task success*.





### 7.1 Benchmark Landscape and Evaluation Work



Existing evaluation work can be organized as a pipeline that turns an agent run into interpretable evidence: benchmarks specify the task, execution infrastructures standardize the run, judgment methods score and diagnose the outcome, and continuous evaluation practices feed these signals back into system improvement.





Benchmarks as task specifications. Tab. <a href="#S7.T6" class="ltx_ref" title="TABLE VI ‣ 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">VI</a> summarizes representative benchmarks for LLM-based agents. Beyond application domains, these benchmarks stress different harness capabilities: SWE-bench \[<a href="#bib.bib93" class="ltx_ref">16</a>\] tests repository navigation, code editing, and hidden-test verification; WebArena \[<a href="#bib.bib113" class="ltx_ref">17</a>\], VisualWebArena \[<a href="#bib.bib94" class="ltx_ref">192</a>\], and OSWorld \[<a href="#bib.bib85" class="ltx_ref">18</a>\] test web/GUI grounding, state tracking, multimodal perception, and safe interface control; Terminal-Bench \[<a href="#bib.bib61" class="ltx_ref">20</a>\] tests command-line execution and environment manipulation; and LoCoMo \[<a href="#bib.bib98" class="ltx_ref">172</a>\] and OS-Harm \[<a href="#bib.bib68" class="ltx_ref">212</a>\] test memory persistence and harmful-action control. Together, they mark a shift toward ecologically realistic evaluation, where browsers, terminals, and operating systems reveal long-horizon failures that closed-form datasets often miss.





Execution and trace infrastructure. For coding and terminal agents, systems such as SWE-agent \[<a href="#bib.bib107" class="ltx_ref">21</a>\], OpenHands \[<a href="#bib.bib106" class="ltx_ref">10</a>\], Repo2Run \[<a href="#bib.bib3" class="ltx_ref">213</a>\], R2E-Gym \[<a href="#bib.bib4" class="ltx_ref">214</a>\], and HAL \[<a href="#bib.bib2" class="ltx_ref">215</a>\] use controlled environments, sandboxed execution, standardized rollouts, and trace collection to make evaluation reproducible and diagnosable. This infra helps distinguish harness behavior from artifacts of dependency drift, invalid graders, changed tool interfaces, or inconsistent resets. Representative harness designs are summarized in Tab. <a href="#S8.T10" class="ltx_ref" title="TABLE X ‣ 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">X</a>.





Judgment and attribution methods. Executable tests and state-based checkers provide strong oracles for coding and terminal tasks, whereas open-ended outputs often require LLM-as-judge or human-audit protocols. G-Eval \[<a href="#bib.bib5" class="ltx_ref">216</a>\], MT-Bench \[<a href="#bib.bib6" class="ltx_ref">217</a>\], and surveys of LLM-as-a-judge \[<a href="#bib.bib7" class="ltx_ref">218</a>\] show the promise and risks of model-based evaluators, including bias, inconsistency, and evaluator drift. For harness engineering, judgment matters most when it attributes failures to model reasoning, context construction, tool exposure, execution control, safety constraints, or the evaluator itself.





Continuous evaluation practices. Frameworks such as LangChain’s agent evaluation tooling \[<a href="#bib.bib219" class="ltx_ref">219</a>\], DeepEval \[<a href="#bib.bib220" class="ltx_ref">220</a>\], RAGAS \[<a href="#bib.bib8" class="ltx_ref">221</a>\], and lm-evaluation-harness \[<a href="#bib.bib9" class="ltx_ref">222</a>\] support recurring tests, trace inspection, judge-based metrics, and monitoring-style evaluation. Their role is not merely to report a leaderboard score, but to make evaluation reusable during prompt changes, tool updates, context-policy revisions, and deployment monitoring.



<figure id="S7.T6" class="ltx_table">

 
<table id="S7.T6.4.1" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S7.T6.4.1.1" class="ltx_tr">
<td id="S7.T6.4.1.1.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_tt" style="padding-left: 2.0pt; padding-right: 2.0pt"> Benchmark </td>
<td id="S7.T6.4.1.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_tt" style="padding-left: 2.0pt; padding-right: 2.0pt"> Focus </td>
<td id="S7.T6.4.1.1.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_tt" style="padding-left: 2.0pt; padding-right: 2.0pt"> Environment </td>
<td id="S7.T6.4.1.1.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top ltx_border_tt" style="padding-left: 2.0pt; padding-right: 2.0pt"> Primary metric </td>
</tr>
<tr id="S7.T6.4.1.2" class="ltx_tr">
<td id="S7.T6.4.1.2.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 2.0pt; padding-right: 2.0pt"> AgentBench [<a href="#bib.bib116" class="ltx_ref">223</a>] </td>
<td id="S7.T6.4.1.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 2.0pt; padding-right: 2.0pt"> General </td>
<td id="S7.T6.4.1.2.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 2.0pt; padding-right: 2.0pt"> Interactive envs </td>
<td id="S7.T6.4.1.2.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 2.0pt; padding-right: 2.0pt"> Task completion </td>
</tr>
<tr id="S7.T6.4.1.3" class="ltx_tr">
<td id="S7.T6.4.1.3.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> SWE-bench [<a href="#bib.bib93" class="ltx_ref">16</a>] </td>
<td id="S7.T6.4.1.3.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Coding </td>
<td id="S7.T6.4.1.3.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Real GitHub issues </td>
<td id="S7.T6.4.1.3.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Resolution rate </td>
</tr>
<tr id="S7.T6.4.1.4" class="ltx_tr">
<td id="S7.T6.4.1.4.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> WebArena [<a href="#bib.bib113" class="ltx_ref">17</a>] </td>
<td id="S7.T6.4.1.4.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Web </td>
<td id="S7.T6.4.1.4.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Realistic websites </td>
<td id="S7.T6.4.1.4.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Task success </td>
</tr>
<tr id="S7.T6.4.1.5" class="ltx_tr">
<td id="S7.T6.4.1.5.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> VisualWebArena [<a href="#bib.bib94" class="ltx_ref">192</a>] </td>
<td id="S7.T6.4.1.5.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Multimodal web </td>
<td id="S7.T6.4.1.5.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Visual web tasks </td>
<td id="S7.T6.4.1.5.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Task success </td>
</tr>
<tr id="S7.T6.4.1.6" class="ltx_tr">
<td id="S7.T6.4.1.6.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> OSWorld [<a href="#bib.bib85" class="ltx_ref">18</a>] </td>
<td id="S7.T6.4.1.6.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Desktop </td>
<td id="S7.T6.4.1.6.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Real OS </td>
<td id="S7.T6.4.1.6.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Multi-app success </td>
</tr>
<tr id="S7.T6.4.1.7" class="ltx_tr">
<td id="S7.T6.4.1.7.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Terminal-Bench [<a href="#bib.bib61" class="ltx_ref">20</a>] </td>
<td id="S7.T6.4.1.7.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Terminal/Coding </td>
<td id="S7.T6.4.1.7.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Command-line </td>
<td id="S7.T6.4.1.7.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Task success </td>
</tr>
<tr id="S7.T6.4.1.8" class="ltx_tr">
<td id="S7.T6.4.1.8.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MCPWorld [<a href="#bib.bib86" class="ltx_ref">147</a>] </td>
<td id="S7.T6.4.1.8.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> API+GUI </td>
<td id="S7.T6.4.1.8.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Hybrid tool envs </td>
<td id="S7.T6.4.1.8.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Task success/tool use </td>
</tr>
<tr id="S7.T6.4.1.9" class="ltx_tr">
<td id="S7.T6.4.1.9.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> OS-Harm [<a href="#bib.bib68" class="ltx_ref">212</a>] </td>
<td id="S7.T6.4.1.9.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Safety </td>
<td id="S7.T6.4.1.9.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Desktop computer </td>
<td id="S7.T6.4.1.9.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Harmful action rate </td>
</tr>
<tr id="S7.T6.4.1.10" class="ltx_tr">
<td id="S7.T6.4.1.10.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> LoCoMo [<a href="#bib.bib98" class="ltx_ref">172</a>] </td>
<td id="S7.T6.4.1.10.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Long-term mem. </td>
<td id="S7.T6.4.1.10.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Multi-session chat </td>
<td id="S7.T6.4.1.10.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> QA/consistency </td>
</tr>
<tr id="S7.T6.4.1.11" class="ltx_tr">
<td id="S7.T6.4.1.11.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MMAU [<a href="#bib.bib112" class="ltx_ref">224</a>] </td>
<td id="S7.T6.4.1.11.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> General </td>
<td id="S7.T6.4.1.11.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Cross-domain </td>
<td id="S7.T6.4.1.11.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Capability scores </td>
</tr>
<tr id="S7.T6.4.1.12" class="ltx_tr">
<td id="S7.T6.4.1.12.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MLE-Bench [<a href="#bib.bib89" class="ltx_ref">225</a>] </td>
<td id="S7.T6.4.1.12.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> ML engineering </td>
<td id="S7.T6.4.1.12.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Kaggle-like tasks </td>
<td id="S7.T6.4.1.12.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Performance tier </td>
</tr>
<tr id="S7.T6.4.1.13" class="ltx_tr">
<td id="S7.T6.4.1.13.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MCPAgentBench [<a href="#bib.bib81" class="ltx_ref">149</a>] </td>
<td id="S7.T6.4.1.13.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MCP tool use </td>
<td id="S7.T6.4.1.13.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MCP sandbox </td>
<td id="S7.T6.4.1.13.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Task Compl./eff. </td>
</tr>
<tr id="S7.T6.4.1.14" class="ltx_tr">
<td id="S7.T6.4.1.14.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MCP-Atlas [<a href="#bib.bib16" class="ltx_ref">148</a>] </td>
<td id="S7.T6.4.1.14.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> MCP tool use </td>
<td id="S7.T6.4.1.14.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Real MCP servers </td>
<td id="S7.T6.4.1.14.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Pass rate </td>
</tr>
<tr id="S7.T6.4.1.15" class="ltx_tr">
<td id="S7.T6.4.1.15.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> GAIA [<a href="#bib.bib1" class="ltx_ref">226</a>] </td>
<td id="S7.T6.4.1.15.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> General assistant </td>
<td id="S7.T6.4.1.15.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Web/files/tools </td>
<td id="S7.T6.4.1.15.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Answer accuracy </td>
</tr>
<tr id="S7.T6.4.1.16" class="ltx_tr">
<td id="S7.T6.4.1.16.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Claw-SWE-Bench [<a href="#bib.bib24" class="ltx_ref">227</a>] </td>
<td id="S7.T6.4.1.16.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Agent harnesses </td>
<td id="S7.T6.4.1.16.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Real GitHub issues </td>
<td id="S7.T6.4.1.16.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top" style="padding-left: 2.0pt; padding-right: 2.0pt"> Resolution rate/cost </td>
</tr>
<tr id="S7.T6.4.1.17" class="ltx_tr">
<td id="S7.T6.4.1.17.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 2.0pt; padding-right: 2.0pt"> TheAgentCompany [<a href="#bib.bib147" class="ltx_ref">19</a>] </td>
<td id="S7.T6.4.1.17.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 2.0pt; padding-right: 2.0pt"> Enterprise-style </td>
<td id="S7.T6.4.1.17.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 2.0pt; padding-right: 2.0pt"> Simulated company </td>
<td id="S7.T6.4.1.17.4" class="ltx_td ltx_nopad_r ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 2.0pt; padding-right: 2.0pt"> Task success </td>
</tr>
</tbody>
</table>

<figcaption>TABLE VI: Representative benchmarks for LLM-based agents.</figcaption>
</figure>





### 7.2 Evaluation Dimensions Beyond Task Success



Most public agent leaderboards still rank systems by a single outcome-centric score. SWE-bench \[<a href="#bib.bib93" class="ltx_ref">16</a>\] reports the percentage of resolved issues \[<a href="#bib.bib221" class="ltx_ref">228</a>\], while Terminal-Bench \[<a href="#bib.bib61" class="ltx_ref">20</a>\] primarily report task-level completion scores \[<a href="#bib.bib222" class="ltx_ref">229</a>\]. However, recent evaluation studies \[<a href="#bib.bib107" class="ltx_ref">21</a>, <a href="#bib.bib63" class="ltx_ref">23</a>, <a href="#bib.bib54" class="ltx_ref">24</a>\] increasingly argue that accuracy alone is insufficient for agent assessment. For example, Sayas *et al*. \[<a href="#bib.bib10" class="ltx_ref">230</a>\] calls for cost-controlled and reproducible evaluation. CLEAR \[<a href="#bib.bib12" class="ltx_ref">231</a>\] explicitly evaluates cost, latency, efficacy and assurance. ReliabilityBench \[<a href="#bib.bib13" class="ltx_ref">232</a>\] studies consistency, robustness, and fault tolerance under production-like stress. Procedure-aware evaluation \[<a href="#bib.bib15" class="ltx_ref">233</a>\] shows that apparent task completion can hide unsafe or invalid trajectories. Because an agent run couples model reasoning, harness design, environment setup, tool interfaces, and evaluator logic, a failure may originate from any part of this chain. Task success remains the primary outcome metric, but meaningful harness comparison requires a richer reading of results along several additional dimensions:

- •
  

  Task success: whether the final objective is completed.

  
- •
  

  Reliability: whether performance remains stable across stochastic runs, retries, and environment variations.

  
- •
  

  Efficiency: token usage, API cost, and compute cost.

  
- •
  

  Latency: wall-clock time or number of interactions.

  
- •
  

  Safety: whether actions remain within allowed boundaries and avoid harmful side effects.

  
- •
  

  Process quality: whether the trajectory is inspectable, recoverable, and evidence-backed.

  





These dimensions explain why similar final scores can hide substantial harness differences. One harness may trade long trajectories, repeated retries, and heavy context accumulation for higher success, while another may deliver slightly lower success at much lower cost and latency. From a deployment perspective, the key is not raw success alone, but useful task completion under resource constraints.





In the following empirical analyses, we focus on the dimensions that are most consistently available across public reports and leaderboard logs: task success, runtime, timeout behavior, and token usage when available. Monetary cost is discussed only cautiously because public cost fields are sparse and often depend on harness-specific accounting, cache handling, and model-price assumptions.







### 7.3 Harness Effects on SWE-bench Verified



SWE-bench Verified \[<a href="#bib.bib93" class="ltx_ref">16</a>\] comprises 500 human-validated GitHub issues drawn from twelve Python repositories, each paired with a hidden test suite that provides a deterministic pass/fail oracle. Evaluations run inside sandboxed Docker containers with pinned dependencies, so observed differences reflect system capabilities rather than environmental artifacts. By filtering out ambiguous specifications and broken tests from the original 2,294-instance SWE-bench, the Verified split offers a cleaner signal for cross-system comparison. Solving an instance requires localizing the defect, editing source files, and passing hidden regression tests; because different harnesses partition these stages in distinct ways, the benchmark is well suited for studying how scaffold design affects measured performance.



<figure id="S7.T7" class="ltx_table">



 
<table id="S7.T7.4.1" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S7.T7.4.1.1" class="ltx_tr">
<td id="S7.T7.4.1.1.1" class="ltx_td ltx_align_left ltx_border_tt" style="padding: -0.75pt 3.0pt">Primary model</td>
<td id="S7.T7.4.1.1.2" class="ltx_td ltx_align_left ltx_border_tt" style="padding: -0.75pt 3.0pt">Harness / scaffold</td>
<td id="S7.T7.4.1.1.3" class="ltx_td ltx_align_center ltx_border_tt" style="padding: -0.75pt 3.0pt">    Res. (%)  / solved </td>
<td id="S7.T7.4.1.1.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_tt" style="padding: -0.75pt 3.0pt">    Cost  ($) </td>
</tr>
<tr id="S7.T7.4.1.2" class="ltx_tr">
<td rowspan="3" id="S7.T7.4.1.2.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">GPT-4o</td>
<td id="S7.T7.4.1.2.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">SWE-agent</td>
<td id="S7.T7.4.1.2.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">23.2 / 116</td>
<td id="S7.T7.4.1.2.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.3" class="ltx_tr">
<td id="S7.T7.4.1.3.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">AutoCodeRover-v2</td>
<td id="S7.T7.4.1.3.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">38.4 / 192</td>
<td id="S7.T7.4.1.3.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.4" class="ltx_tr">
<td id="S7.T7.4.1.4.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Agentless</td>
<td id="S7.T7.4.1.4.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">38.8 / 194</td>
<td id="S7.T7.4.1.4.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.5" class="ltx_tr">
<td rowspan="6" id="S7.T7.4.1.5.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">Claude 3.5 Sonnet</td>
<td id="S7.T7.4.1.5.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">SWE-agent (20240620)</td>
<td id="S7.T7.4.1.5.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">33.6 / 168</td>
<td id="S7.T7.4.1.5.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.6" class="ltx_tr">
<td id="S7.T7.4.1.6.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">SWE-agent + tools</td>
<td id="S7.T7.4.1.6.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">49.0 / 245</td>
<td id="S7.T7.4.1.6.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.7" class="ltx_tr">
<td id="S7.T7.4.1.7.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Agentless</td>
<td id="S7.T7.4.1.7.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">50.8 / 254</td>
<td id="S7.T7.4.1.7.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">1.19</td>
</tr>
<tr id="S7.T7.4.1.8" class="ltx_tr">
<td id="S7.T7.4.1.8.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">AutoCodeRover</td>
<td id="S7.T7.4.1.8.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">51.8 / 259</td>
<td id="S7.T7.4.1.8.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">4.50</td>
</tr>
<tr id="S7.T7.4.1.9" class="ltx_tr">
<td id="S7.T7.4.1.9.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">OpenHands + CodeAct 2.1</td>
<td id="S7.T7.4.1.9.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">53.0 / 265</td>
<td id="S7.T7.4.1.9.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">0.78</td>
</tr>
<tr id="S7.T7.4.1.10" class="ltx_tr">
<td id="S7.T7.4.1.10.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">PatchPilot</td>
<td id="S7.T7.4.1.10.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">53.6 / 268</td>
<td id="S7.T7.4.1.10.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">0.99</td>
</tr>
<tr id="S7.T7.4.1.11" class="ltx_tr">
<td rowspan="3" id="S7.T7.4.1.11.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">Claude 3.7 Sonnet</td>
<td id="S7.T7.4.1.11.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.11.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">52.8 / 264</td>
<td id="S7.T7.4.1.11.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.12" class="ltx_tr">
<td id="S7.T7.4.1.12.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">SWE-agent + tools</td>
<td id="S7.T7.4.1.12.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">63.2 / 316</td>
<td id="S7.T7.4.1.12.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.13" class="ltx_tr">
<td id="S7.T7.4.1.13.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Vendor scaffold</td>
<td id="S7.T7.4.1.13.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt"><em>63.7</em> / -</td>
<td id="S7.T7.4.1.13.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.14" class="ltx_tr">
<td rowspan="4" id="S7.T7.4.1.14.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">Claude Sonnet 4</td>
<td id="S7.T7.4.1.14.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.14.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">64.9 / 325</td>
<td id="S7.T7.4.1.14.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.15" class="ltx_tr">
<td id="S7.T7.4.1.15.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">OpenHands + CodeAct 2.1</td>
<td id="S7.T7.4.1.15.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">70.4 / 352</td>
<td id="S7.T7.4.1.15.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.16" class="ltx_tr">
<td id="S7.T7.4.1.16.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">SWE-agent + tools</td>
<td id="S7.T7.4.1.16.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">72.4 / 362</td>
<td id="S7.T7.4.1.16.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.17" class="ltx_tr">
<td id="S7.T7.4.1.17.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Vendor scaffold</td>
<td id="S7.T7.4.1.17.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt"><em>72.7</em> / -</td>
<td id="S7.T7.4.1.17.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.18" class="ltx_tr">
<td rowspan="4" id="S7.T7.4.1.18.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">Claude Opus 4 / 4.5</td>
<td id="S7.T7.4.1.18.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">SWE-agent + tools</td>
<td id="S7.T7.4.1.18.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">73.2 / 366</td>
<td id="S7.T7.4.1.18.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.19" class="ltx_tr">
<td id="S7.T7.4.1.19.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.19.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">76.8 / 384</td>
<td id="S7.T7.4.1.19.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.20" class="ltx_tr">
<td id="S7.T7.4.1.20.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">OpenHands + CodeAct 2.1</td>
<td id="S7.T7.4.1.20.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">77.6 / 388</td>
<td id="S7.T7.4.1.20.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.21" class="ltx_tr">
<td id="S7.T7.4.1.21.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Vendor scaffold</td>
<td id="S7.T7.4.1.21.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt"><em>80.9</em> / -</td>
<td id="S7.T7.4.1.21.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.22" class="ltx_tr">
<td id="S7.T7.4.1.22.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">o3 / o4-mini</td>
<td id="S7.T7.4.1.22.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">PatchPilot v1.1</td>
<td id="S7.T7.4.1.22.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">64.6 / 323</td>
<td id="S7.T7.4.1.22.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.23" class="ltx_tr">
<td rowspan="3" id="S7.T7.4.1.23.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">OpenAI GPT-5 family</td>
<td id="S7.T7.4.1.23.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">OpenHands + CodeAct 2.1</td>
<td id="S7.T7.4.1.23.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">71.8 / 359</td>
<td id="S7.T7.4.1.23.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.24" class="ltx_tr">
<td id="S7.T7.4.1.24.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.24.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">72.8 / 364</td>
<td id="S7.T7.4.1.24.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.25" class="ltx_tr">
<td id="S7.T7.4.1.25.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Vendor scaffold</td>
<td id="S7.T7.4.1.25.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt"><em>80.0</em> / -</td>
<td id="S7.T7.4.1.25.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.26" class="ltx_tr">
<td id="S7.T7.4.1.26.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">GPT-5.3 Codex</td>
<td id="S7.T7.4.1.26.2" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.26.3" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">78.0 / 390</td>
<td id="S7.T7.4.1.26.4" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.27" class="ltx_tr">
<td id="S7.T7.4.1.27.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">GPT-5.4</td>
<td id="S7.T7.4.1.27.2" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.27.3" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">78.2 / 391</td>
<td id="S7.T7.4.1.27.4" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.28" class="ltx_tr">
<td id="S7.T7.4.1.28.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">GPT-5.5</td>
<td id="S7.T7.4.1.28.2" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.28.3" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">82.6 / 413</td>
<td id="S7.T7.4.1.28.4" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.29" class="ltx_tr">
<td rowspan="2" id="S7.T7.4.1.29.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">Gemini 3 Pro</td>
<td id="S7.T7.4.1.29.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.29.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">74.2 / 371</td>
<td id="S7.T7.4.1.29.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.30" class="ltx_tr">
<td id="S7.T7.4.1.30.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Vendor scaffold</td>
<td id="S7.T7.4.1.30.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt"><em>76.2</em> / -</td>
<td id="S7.T7.4.1.30.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.31" class="ltx_tr">
<td id="S7.T7.4.1.31.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Gemini 3.1 Pro Preview</td>
<td id="S7.T7.4.1.31.2" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.31.3" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">78.8 / 394</td>
<td id="S7.T7.4.1.31.4" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.32" class="ltx_tr">
<td rowspan="2" id="S7.T7.4.1.32.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">DeepSeek V3 / V3.2</td>
<td id="S7.T7.4.1.32.2" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.75pt 3.0pt">Agentless</td>
<td id="S7.T7.4.1.32.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">42.0 / 210</td>
<td id="S7.T7.4.1.32.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.33" class="ltx_tr">
<td id="S7.T7.4.1.33.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.33.2" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">70.0 / 350</td>
<td id="S7.T7.4.1.33.3" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.34" class="ltx_tr">
<td id="S7.T7.4.1.34.1" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">Claude Opus 4.6 Thinking</td>
<td id="S7.T7.4.1.34.2" class="ltx_td ltx_align_left" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.34.3" class="ltx_td ltx_align_center" style="padding: -0.75pt 3.0pt">78.2 / 391</td>
<td id="S7.T7.4.1.34.4" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.75pt 3.0pt">-</td>
</tr>
<tr id="S7.T7.4.1.35" class="ltx_tr">
<td id="S7.T7.4.1.35.1" class="ltx_td ltx_align_left ltx_border_bb" style="padding: -0.75pt 3.0pt">Claude Opus 4.7</td>
<td id="S7.T7.4.1.35.2" class="ltx_td ltx_align_left ltx_border_bb" style="padding: -0.75pt 3.0pt">mini-SWE-agent</td>
<td id="S7.T7.4.1.35.3" class="ltx_td ltx_align_center ltx_border_bb" style="padding: -0.75pt 3.0pt">82.0 / 410</td>
<td id="S7.T7.4.1.35.4" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_bb" style="padding: -0.75pt 3.0pt">-</td>
</tr>
</tbody>
</table>






<p>Notes. Claude 3.5 Sonnet entries refer to the 2024-10-22 snapshot where specified; Claude Sonnet 4 and Opus 4 source-card entries use the 2025-05-14 generation. Some rows differ in inference policy, including extended-thinking or high-reasoning settings. Vendor rows use closed-source scaffolds.</p>


<figcaption>TABLE VII: Model–harness results on SWE-bench Verified. Resolved rates are percentages, resolved counts are out of 500 instances; cost is USD per instance when reported; vendor rows are proprietary references.</figcaption>
</figure>



Tab. <a href="#S7.T7" class="ltx_ref" title="TABLE VII ‣ 7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">VII</a> compares SWE-bench Verified results across several model–harness pairings, including open-source scaffolds, source-reported agent harnesses, lightweight mini-SWE-agent runs, and closed-source vendor reports. The table should be read as a compact synthesis of public evidence rather than a fully controlled factorial experiment. Model snapshots, reasoning settings, retry budgets, and proprietary scaffold details are not always aligned across sources, so the strongest comparisons are those within the same row family or under the same reported evaluation setting. Vendor-reported scores are included as upper-envelope references, but they should not be interpreted as controlled ablations against open-source harnesses. For example, Opus 4.5 with mini-SWE-agent is reported with extended thinking, whereas the same source reports 74.4% under medium reasoning and 67.6% for Opus 4; the OpenAI mini-SWE-agent row follows a GPT-5-2 extended-thinking style leaderboard setting, whereas GPT-5 (2025-08-07) under medium reasoning is reported at 65.0%, and the vendor 80.0% reference is a GPT-5.2 result reported in a Claude system card \[<a href="#bib.bib221" class="ltx_ref">228</a>, <a href="#bib.bib229" class="ltx_ref">234</a>\]. Similarly, DeepSeek rows distinguish V3 from V3.2 high-reasoning settings, and Gemini rows distinguish Gemini 3 Pro from later Gemini 3.1 Pro reports, including an 80.6% Gemini 3.1 Pro result under its own reported configuration \[<a href="#bib.bib232" class="ltx_ref">235</a>\]. These boundaries do not invalidate the table, but they mean the strongest claims should use within-row-family comparisons and treat vendor or reasoning-policy changes as upper-envelope evidence rather than controlled ablations.





The compared harnesses span a broad spectrum of scaffold complexity. Agentless \[<a href="#bib.bib217" class="ltx_ref">236</a>\] removes the interactive agent loop and uses a fixed localize–repair–validate pipeline. SWE-agent + tools \[<a href="#bib.bib224" class="ltx_ref">237</a>, <a href="#bib.bib107" class="ltx_ref">21</a>\] exposes shell and editing tools through a bash-oriented repair loop, while mini-SWE-agent \[<a href="#bib.bib226" class="ltx_ref">238</a>\] reduces this design to a minimal scaffold that leaves most orchestration to the model. OpenHands + CodeAct 2.1 \[<a href="#bib.bib106" class="ltx_ref">10</a>\] provides a richer software-engineering runtime with file editing, web browsing, and IPython execution. AutoCodeRover \[<a href="#bib.bib214" class="ltx_ref">239</a>\] and PatchPilot \[<a href="#bib.bib213" class="ltx_ref">240</a>\] represent more structured repair workflows, using repository search, localization, reproduction, validation, and refinement to constrain the repair process. Vendor scaffold lists the best vendor-reported scores on proprietary scaffolds \[<a href="#bib.bib227" class="ltx_ref">241</a>, <a href="#bib.bib228" class="ltx_ref">242</a>, <a href="#bib.bib229" class="ltx_ref">234</a>, <a href="#bib.bib230" class="ltx_ref">243</a>, <a href="#bib.bib231" class="ltx_ref">244</a>\] as an upper-envelope reference. Together, these systems provide a useful, though not perfectly controlled, view of how scaffold design interacts with backbone model capability on repository-level coding tasks.





Specifically, model capability and harness design both contribute to measured performance. Within a single harness, backbone upgrades drive large gains: SWE-agent + tools improves from 49.0% with Claude 3.5 Sonnet to 73.2% with Opus 4, a 24% increase \[<a href="#bib.bib224" class="ltx_ref">237</a>, <a href="#bib.bib225" class="ltx_ref">245</a>\]; mini-SWE-agent shows a comparable trajectory from 52.8% (Claude 3.7 Sonnet) to 76.8% (Opus 4.5) \[<a href="#bib.bib221" class="ltx_ref">228</a>\]. Within a single model, harness choice also produces a consistent effect. For GPT-4o, source-reported harnesses range from 23.2% with SWE-agent to 38.8% with Agentless. For Claude 3.5 Sonnet, they range from 33.6% with SWE-agent to 53.6% with PatchPilot, with SWE-agent + tools, Agentless, AutoCodeRover, and OpenHands + CodeAct 2.1 occupying the middle of the range. For Claude Opus 4/4.5, the spread is narrower but still visible: 73.2% with SWE-agent + tools, 76.8% with mini-SWE-agent, and 77.6% with OpenHands + CodeAct 2.1. These ranges show that the same backbone can gain or lose tens of resolved instances depending on the scaffold.





Scaffold complexity does not predict effectiveness. Under Opus 4.5, mini-SWE-agent (roughly 100 lines of Python) reaches 76.8%, only slightly below the far richer OpenHands + CodeAct 2.1 sandbox at 77.6% \[<a href="#bib.bib221" class="ltx_ref">228</a>, <a href="#bib.bib225" class="ltx_ref">245</a>\]. These results suggest that scaffold effectiveness depends more on interface design than on feature count: a minimal scaffold with well-chosen primitives can extract nearly the same performance as a full-featured agent framework.





Vendor-reported scores, which reflect proprietary scaffold optimization, consistently exceed the best open-source results. OpenHands with Opus 4.5 at 77.6% \[<a href="#bib.bib225" class="ltx_ref">245</a>\] trails the corresponding vendor score of 80.9% \[<a href="#bib.bib229" class="ltx_ref">234</a>\] by about 3%; for Gemini 3 Pro, the gap narrows to 2% (74.2% *vs*.76.2%) \[<a href="#bib.bib231" class="ltx_ref">244</a>, <a href="#bib.bib226" class="ltx_ref">238</a>\]. For GPT-5 variants the margin is larger (72.8% *vs*.80.0%), though differences in model version and inference configuration complicate this comparison \[<a href="#bib.bib229" class="ltx_ref">234</a>, <a href="#bib.bib221" class="ltx_ref">228</a>\]. Across same-generation Claude and Gemini models, this 2-4% advantage is attributable to scaffold-level decisions such as prompt design, candidate selection, and compute scaling, not to differences in model capability.







### 7.4 Harness Effects on Terminal-Bench 2.0



Terminal-Bench provides a complementary perspective to SWE-bench because the agent must operate through an interactive command-line environment rather than only submit a final patch \[<a href="#bib.bib61" class="ltx_ref">20</a>\]. Each task specifies a natural-language instruction, a sandboxed terminal workspace, an executable test script, and a reference solution, so success is defined by whether the agent transforms the environment into a passing state. Tasks commonly require file inspection, tool installation or invocation, command execution, log interpretation, artifact editing, and explicit termination decisions. The benchmark is therefore well suited for studying execution harnesses, since terminal interaction jointly exercises observation design, context management, control-loop policy, action exposure, state persistence, and verification.





Our analysis uses the official Terminal-Bench 2.0 leaderboard and public submission logs as data sources \[<a href="#bib.bib222" class="ltx_ref">229</a>, <a href="#bib.bib247" class="ltx_ref">246</a>\]. Official submissions evaluate terminal-bench@2.0 with five trials per task (-k 5), use each task’s benchmark environment and default constraints, and must not override timeouts or CPU, memory, and storage limits \[<a href="#bib.bib247" class="ltx_ref">246</a>\]. Leaderboard-integrity rules further penalize reward-hacking trajectories, such as retrieving task solutions from the internet, which reduces the risk that reported scores reflect benchmark leakage rather than terminal task completion \[<a href="#bib.bib248" class="ltx_ref">247</a>\]. For the performance analysis, we use entries for which the backbone model and harness are identifiable, excluding entries whose model field is a mixture or “Multiple” so that each plotted point has a clear model identity. The resulting evidence is not a randomized ablation, since public submissions may differ in prompts, versions, budgets, and implementation details. It is nevertheless informative as an observational comparison: the same model appears under several harnesses, and the same harness often appears with several models. For resource analysis, we use the official HuggingFace public-submission repository as the primary source and align submissions to the currently visible leaderboard by strict metadata matching. The public repository contains 75 submissions with metadata and logs, covering 32,604 trial records. Among these, 48 submissions strictly match a currently visible leaderboard entry. Reward, agent-runtime, and full-runtime fields have high coverage (97.2%, 98.1%, and 100.0%, respectively), whereas input/output token fields cover 45.0% of trial records and dollar-cost fields cover only 15.2%. Accordingly, runtime and timeout statistics are the main resource-efficiency evidence, while token statistics are used as supplementary evidence and monetary cost is not used for cross-harness claims. These counts define the evidence boundary rather than a separate result table: 27 public submissions are excluded from the complete resource table because 24 are not visible or name-mismatched on the current leaderboard and 3 are ambiguous matches. A looser visible-entry check finds 55 matches among 142 visible leaderboard entries (38.7%) across 51 unique submissions, but it is used only as a coverage sanity check. The row-level comparisons below use the strict 48-row subset. Tab. <a href="#S7.T8" class="ltx_ref" title="TABLE VIII ‣ 7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">VIII</a> extracts representative same-model rows from this subset for the main-text comparison.



<figure id="S7.T8" class="ltx_table">

 
<table id="S7.T8.4.1" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S7.T8.4.1.1" class="ltx_tr">
<td id="S7.T8.4.1.1.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_tt" style="padding: -0.25pt 1.8pt">Model</td>
<td id="S7.T8.4.1.1.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_tt" style="padding: -0.25pt 1.8pt">Harness</td>
<td id="S7.T8.4.1.1.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_tt" style="padding: -0.25pt 1.8pt">    Score  (%) </td>
<td id="S7.T8.4.1.1.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_tt" style="padding: -0.25pt 1.8pt">Trials</td>
<td id="S7.T8.4.1.1.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_tt" style="padding: -0.25pt 1.8pt">    Input  (K) </td>
<td id="S7.T8.4.1.1.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_tt" style="padding: -0.25pt 1.8pt">    Output  (K) </td>
<td id="S7.T8.4.1.1.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_tt" style="padding: -0.25pt 1.8pt">    Agent  (min) </td>
<td id="S7.T8.4.1.1.8" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_tt" style="padding: -0.25pt 1.8pt">    TO  (%) </td>
</tr>
<tr id="S7.T8.4.1.2" class="ltx_tr">
<td rowspan="3" id="S7.T8.4.1.2.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_t" style="padding: -0.25pt 1.8pt">GPT-5.3 Codex</td>
<td id="S7.T8.4.1.2.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_t" style="padding: -0.25pt 1.8pt">SageAgent</td>
<td id="S7.T8.4.1.2.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">78.4</td>
<td id="S7.T8.4.1.2.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.2.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">-</td>
<td id="S7.T8.4.1.2.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">-</td>
<td id="S7.T8.4.1.2.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">5.7</td>
<td id="S7.T8.4.1.2.8" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">12.1</td>
</tr>
<tr id="S7.T8.4.1.3" class="ltx_tr">
<td id="S7.T8.4.1.3.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left" style="padding: -0.25pt 1.8pt">Mux</td>
<td id="S7.T8.4.1.3.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">74.6</td>
<td id="S7.T8.4.1.3.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.3.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">238.7</td>
<td id="S7.T8.4.1.3.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">5.7</td>
<td id="S7.T8.4.1.3.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">5.5</td>
<td id="S7.T8.4.1.3.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">8.1</td>
</tr>
<tr id="S7.T8.4.1.4" class="ltx_tr">
<td id="S7.T8.4.1.4.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left" style="padding: -0.25pt 1.8pt">Terminus 2</td>
<td id="S7.T8.4.1.4.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">64.7</td>
<td id="S7.T8.4.1.4.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.4.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">58.4</td>
<td id="S7.T8.4.1.4.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">20.5</td>
<td id="S7.T8.4.1.4.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">8.9</td>
<td id="S7.T8.4.1.4.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">20.7</td>
</tr>
<tr id="S7.T8.4.1.5" class="ltx_tr">
<td rowspan="4" id="S7.T8.4.1.5.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_t" style="padding: -0.25pt 1.8pt">Claude Opus 4.6</td>
<td id="S7.T8.4.1.5.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_t" style="padding: -0.25pt 1.8pt">Meta-Harness</td>
<td id="S7.T8.4.1.5.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">76.4</td>
<td id="S7.T8.4.1.5.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.5.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">755.0</td>
<td id="S7.T8.4.1.5.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">15.8</td>
<td id="S7.T8.4.1.5.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">6.3</td>
<td id="S7.T8.4.1.5.8" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">7.9</td>
</tr>
<tr id="S7.T8.4.1.6" class="ltx_tr">
<td id="S7.T8.4.1.6.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left" style="padding: -0.25pt 1.8pt">Terminus-KIRA</td>
<td id="S7.T8.4.1.6.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">74.7</td>
<td id="S7.T8.4.1.6.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.6.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">618.6</td>
<td id="S7.T8.4.1.6.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">16.9</td>
<td id="S7.T8.4.1.6.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">9.6</td>
<td id="S7.T8.4.1.6.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">18.2</td>
</tr>
<tr id="S7.T8.4.1.7" class="ltx_tr">
<td id="S7.T8.4.1.7.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left" style="padding: -0.25pt 1.8pt">Mux</td>
<td id="S7.T8.4.1.7.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">66.5</td>
<td id="S7.T8.4.1.7.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.7.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">213.0</td>
<td id="S7.T8.4.1.7.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">10.1</td>
<td id="S7.T8.4.1.7.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">5.9</td>
<td id="S7.T8.4.1.7.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">10.3</td>
</tr>
<tr id="S7.T8.4.1.8" class="ltx_tr">
<td id="S7.T8.4.1.8.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left" style="padding: -0.25pt 1.8pt">Terminus 2</td>
<td id="S7.T8.4.1.8.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">62.9</td>
<td id="S7.T8.4.1.8.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.8.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">79.4</td>
<td id="S7.T8.4.1.8.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">8.4</td>
<td id="S7.T8.4.1.8.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">5.3</td>
<td id="S7.T8.4.1.8.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right" style="padding: -0.25pt 1.8pt">18.2</td>
</tr>
<tr id="S7.T8.4.1.9" class="ltx_tr">
<td rowspan="2" id="S7.T8.4.1.9.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_bb ltx_border_t" style="padding: -0.25pt 1.8pt">Gemini 3.1 Pro</td>
<td id="S7.T8.4.1.9.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_t" style="padding: -0.25pt 1.8pt">TongAgents</td>
<td id="S7.T8.4.1.9.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">80.2</td>
<td id="S7.T8.4.1.9.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.9.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">-</td>
<td id="S7.T8.4.1.9.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">-</td>
<td id="S7.T8.4.1.9.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">11.1</td>
<td id="S7.T8.4.1.9.8" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_t" style="padding: -0.25pt 1.8pt">21.1</td>
</tr>
<tr id="S7.T8.4.1.10" class="ltx_tr">
<td id="S7.T8.4.1.10.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_border_bb" style="padding: -0.25pt 1.8pt">Terminus-KIRA</td>
<td id="S7.T8.4.1.10.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_bb" style="padding: -0.25pt 1.8pt">74.8</td>
<td id="S7.T8.4.1.10.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_bb" style="padding: -0.25pt 1.8pt">445</td>
<td id="S7.T8.4.1.10.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_bb" style="padding: -0.25pt 1.8pt">257.5</td>
<td id="S7.T8.4.1.10.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_bb" style="padding: -0.25pt 1.8pt">22.1</td>
<td id="S7.T8.4.1.10.6" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_bb" style="padding: -0.25pt 1.8pt">6.5</td>
<td id="S7.T8.4.1.10.7" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_right ltx_border_bb" style="padding: -0.25pt 1.8pt">9.7</td>
</tr>
</tbody>
</table>

<figcaption>TABLE VIII: Terminal-Bench 2.0 representative resource statistics for leaderboard-visible submissions. Input/Output report median token counts in thousands per trial, Agent reports median runtime in minutes, and TO reports timeout rate.</figcaption>
</figure>

<figure id="S7.F6" class="ltx_figure">

<figcaption>Fig. 6: Terminal-Bench 2.0 accuracy across model–harness pairings. Each point is a single-backbone leaderboard entry, and dashed lines connect results that use the same model under different harnesses.</figcaption>
</figure>

<figure id="S7.F7" class="ltx_figure">

<figcaption>Fig. 7: Within-model variation on Terminal-Bench 2.0. For each model with at least three observed harness results, the box and points summarize accuracy across harnesses.</figcaption>
</figure>



Fig. <a href="#S7.F6" class="ltx_ref" title="Fig. 6 ‣ 7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">6</a> first indicates that backbone capability remains a major determinant of success. Within a fixed harness, stronger model generations often improve resolved rates by more than 10%. For example, under Terminus 2, GPT-5 improves from 35.2% to 54.0% with GPT-5.2 and to 64.7% with GPT-5.3-Codex. Under Codex CLI, the sequence from GPT-5 to GPT-5.2 and GPT-5.5 rises from 49.6% to 62.9% and 82.2%. The same pattern appears for Anthropic and Google models: newer Opus, Gemini, and Codex-specialized models generally occupy higher regions of the plot than earlier or smaller models. Thus, the benchmark does not support a harness-only interpretation; terminal agents still need strong planning, coding, debugging, and tool-use priors from the foundation model.





At the same time, conditioning on the model reveals large harness-induced spreads. GPT-5.3-Codex ranges from 64.7% with Terminus 2 to 78.4% with SageAgent, a 13.7% difference. Claude Opus 4.6 ranges from 58.0% with Claude Code to 76.4% with Meta-Harness, an 18.4% difference. Gemini 3.1 Pro ranges from 59.4% with Gemini CLI to 80.2% with TongAgents, a 20.8% difference. Even GPT-5, before the later Codex-specialized variants, ranges from 33.9% with Mini-SWE-Agent to 49.6% with Codex CLI. These gaps are substantially larger than the standard errors reported for most relevant leaderboard entries, and they correspond to different harness choices around terminal affordances, context packaging, command execution, stopping criteria, and recovery.





Fig. <a href="#S7.F7" class="ltx_ref" title="Fig. 7 ‣ 7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">7</a> aggregates this fixed-model view. Among the 20 models that have at least three observed harness results, the median within-model range is 13.6% and 14 of the 20 models vary by at least 10% across harnesses. The largest spreads exceed 20%, as seen for Claude Haiku 4.5, GPT-5.1-Codex, and Gemini 3.1 Pro. This distribution shows that leaderboard accuracy cannot be attributed to the model alone. A model’s measured terminal competence also depends on whether the harness exposes an effective command interface, preserves relevant execution state, routes observations back into context at an appropriate granularity, and uses verification signals for termination, retry, or repair.





Tab. <a href="#S7.T8" class="ltx_ref" title="TABLE VIII ‣ 7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">VIII</a> shows that accuracy differences are accompanied by distinct operational profiles. For GPT-5.3-Codex, SageAgent reaches the highest single-backbone score in Fig. <a href="#S7.F6" class="ltx_ref" title="Fig. 6 ‣ 7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">6</a> with a median agent time of 5.7 minutes and a 12.1% timeout rate, whereas Terminus 2 takes 8.9 minutes and times out on 20.7% of trials. Mux uses a heavier median input context than Terminus 2 (238.7K versus 58.4K tokens) but reports shorter median agent time (5.5 versus 8.9 minutes) and a lower timeout rate (8.1% versus 20.7%). For Claude Opus 4.6, Meta-Harness uses a much larger median input context than Terminus 2 (755.0K versus 79.4K tokens) while reducing timeout rate from 18.2% to 7.9%. These examples show that the measured system behavior includes not only whether a task is solved, but also how much context is consumed, how long execution takes, and how often the harness fails to terminate successfully.





Taken together, Terminal-Bench results separate two effects without treating either as sufficient on its own. Model upgrades lift whole harness families, but harness choices can still shift the same model’s score by more than 10% through terminal-state presentation, context management, command execution, and verifier feedback. Resource statistics add a deployment-facing caveat: higher accuracy may require longer trajectories, heavier context, or more robust timeout handling, and these costs are part of the practical capability being measured. On Terminal-Bench, reliable terminal task completion therefore depends on the fit between the model’s interactive skills and the harness’s runtime design under fixed benchmark constraints.







### 7.5 Harness Effects on WebArena



WebArena \[<a href="#bib.bib113" class="ltx_ref">17</a>\] is one of the most widely used reproducible benchmarks for web agents. It evaluates agents in self-hosted websites that cover realistic domains such as shopping, discussion forums, GitLab-style software collaboration, content management, maps, and knowledge resources. Unlike open-ended browsing benchmarks that often require human or LLM-based judgement, WebArena uses programmatic success checks over website state and task-specific answers. This makes it useful for studying what a web-agent harness contributes beyond a model-only baseline: browser agents must convert textual goals and visual or DOM observations into navigation, search, form filling, state tracking, and recovery actions, while the evaluator supplies a relatively concrete task-success signal.



<figure id="S7.T9" class="ltx_table">

 
<table id="S7.T9.4.1" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S7.T9.4.1.1" class="ltx_tr">
<td id="S7.T9.4.1.1.1" class="ltx_td ltx_align_left ltx_border_tt" style="padding: -0.6pt 3.0pt">Backbone</td>
<td id="S7.T9.4.1.1.2" class="ltx_td ltx_align_center ltx_border_tt" style="padding: -0.6pt 3.0pt">Model only</td>
<td id="S7.T9.4.1.1.3" class="ltx_td ltx_align_center ltx_border_tt" style="padding: -0.6pt 3.0pt">Harness low</td>
<td id="S7.T9.4.1.1.4" class="ltx_td ltx_align_center ltx_border_tt" style="padding: -0.6pt 3.0pt">Harness high</td>
<td id="S7.T9.4.1.1.5" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_tt" style="padding: -0.6pt 3.0pt">Span</td>
</tr>
<tr id="S7.T9.4.1.2" class="ltx_tr">
<td id="S7.T9.4.1.2.1" class="ltx_td ltx_align_left ltx_border_t" style="padding: -0.6pt 3.0pt">GPT-3.5</td>
<td id="S7.T9.4.1.2.2" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.6pt 3.0pt">8.9</td>
<td id="S7.T9.4.1.2.3" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.6pt 3.0pt">22.0</td>
<td id="S7.T9.4.1.2.4" class="ltx_td ltx_align_center ltx_border_t" style="padding: -0.6pt 3.0pt">29.1</td>
<td id="S7.T9.4.1.2.5" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_t" style="padding: -0.6pt 3.0pt">20.2</td>
</tr>
<tr id="S7.T9.4.1.3" class="ltx_tr">
<td id="S7.T9.4.1.3.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">GPT-4</td>
<td id="S7.T9.4.1.3.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">14.9</td>
<td id="S7.T9.4.1.3.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">20.2</td>
<td id="S7.T9.4.1.3.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">33.0</td>
<td id="S7.T9.4.1.3.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">18.1</td>
</tr>
<tr id="S7.T9.4.1.4" class="ltx_tr">
<td id="S7.T9.4.1.4.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">GPT-4o</td>
<td id="S7.T9.4.1.4.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">13.1</td>
<td id="S7.T9.4.1.4.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">19.2</td>
<td id="S7.T9.4.1.4.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">54.6</td>
<td id="S7.T9.4.1.4.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">41.5</td>
</tr>
<tr id="S7.T9.4.1.5" class="ltx_tr">
<td id="S7.T9.4.1.5.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">GPT-4 Turbo</td>
<td id="S7.T9.4.1.5.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">16.5</td>
<td id="S7.T9.4.1.5.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">33.3</td>
<td id="S7.T9.4.1.5.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">45.7</td>
<td id="S7.T9.4.1.5.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">29.2</td>
</tr>
<tr id="S7.T9.4.1.6" class="ltx_tr">
<td id="S7.T9.4.1.6.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">GPT-4o-mini</td>
<td id="S7.T9.4.1.6.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.6.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">13.6</td>
<td id="S7.T9.4.1.6.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">13.6</td>
<td id="S7.T9.4.1.6.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
</tr>
<tr id="S7.T9.4.1.7" class="ltx_tr">
<td id="S7.T9.4.1.7.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">GPT-5</td>
<td id="S7.T9.4.1.7.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.7.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">71.2</td>
<td id="S7.T9.4.1.7.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">71.2</td>
<td id="S7.T9.4.1.7.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
</tr>
<tr id="S7.T9.4.1.8" class="ltx_tr">
<td id="S7.T9.4.1.8.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">DeepSeek R1-Llama 8B</td>
<td id="S7.T9.4.1.8.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">8.5</td>
<td id="S7.T9.4.1.8.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">43.6</td>
<td id="S7.T9.4.1.8.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">43.6</td>
<td id="S7.T9.4.1.8.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">35.1</td>
</tr>
<tr id="S7.T9.4.1.9" class="ltx_tr">
<td id="S7.T9.4.1.9.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">DeepSeek V3.2</td>
<td id="S7.T9.4.1.9.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.9.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">74.3</td>
<td id="S7.T9.4.1.9.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">74.3</td>
<td id="S7.T9.4.1.9.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
</tr>
<tr id="S7.T9.4.1.10" class="ltx_tr">
<td id="S7.T9.4.1.10.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">Gemini 3 Pro</td>
<td id="S7.T9.4.1.10.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.10.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">51.2</td>
<td id="S7.T9.4.1.10.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">71.6</td>
<td id="S7.T9.4.1.10.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">20.4</td>
</tr>
<tr id="S7.T9.4.1.11" class="ltx_tr">
<td id="S7.T9.4.1.11.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">Gemini 3.1 Flash-L</td>
<td id="S7.T9.4.1.11.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.11.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">42.3</td>
<td id="S7.T9.4.1.11.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">42.3</td>
<td id="S7.T9.4.1.11.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
</tr>
<tr id="S7.T9.4.1.12" class="ltx_tr">
<td id="S7.T9.4.1.12.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">Claude Sonnet 3.5</td>
<td id="S7.T9.4.1.12.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.12.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">36.2</td>
<td id="S7.T9.4.1.12.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">52.1</td>
<td id="S7.T9.4.1.12.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">15.9</td>
</tr>
<tr id="S7.T9.4.1.13" class="ltx_tr">
<td id="S7.T9.4.1.13.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">Qwen3.5 family</td>
<td id="S7.T9.4.1.13.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.13.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">3.1</td>
<td id="S7.T9.4.1.13.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">41.5</td>
<td id="S7.T9.4.1.13.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">38.4</td>
</tr>
<tr id="S7.T9.4.1.14" class="ltx_tr">
<td id="S7.T9.4.1.14.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">Llama 3-70B</td>
<td id="S7.T9.4.1.14.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">7.6</td>
<td id="S7.T9.4.1.14.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">10.1</td>
<td id="S7.T9.4.1.14.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">10.1</td>
<td id="S7.T9.4.1.14.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">2.5</td>
</tr>
<tr id="S7.T9.4.1.15" class="ltx_tr">
<td id="S7.T9.4.1.15.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">Llama 3.1-70B</td>
<td id="S7.T9.4.1.15.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
<td id="S7.T9.4.1.15.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">18.4</td>
<td id="S7.T9.4.1.15.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">18.4</td>
<td id="S7.T9.4.1.15.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">-</td>
</tr>
<tr id="S7.T9.4.1.16" class="ltx_tr">
<td id="S7.T9.4.1.16.1" class="ltx_td ltx_align_left" style="padding: -0.6pt 3.0pt">Llama 3.2-1B</td>
<td id="S7.T9.4.1.16.2" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">2.4</td>
<td id="S7.T9.4.1.16.3" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">24.1</td>
<td id="S7.T9.4.1.16.4" class="ltx_td ltx_align_center" style="padding: -0.6pt 3.0pt">24.1</td>
<td id="S7.T9.4.1.16.5" class="ltx_td ltx_nopad_r ltx_align_center" style="padding: -0.6pt 3.0pt">21.7</td>
</tr>
<tr id="S7.T9.4.1.17" class="ltx_tr">
<td id="S7.T9.4.1.17.1" class="ltx_td ltx_align_left ltx_border_bb" style="padding: -0.6pt 3.0pt">Llama 3.1-8B</td>
<td id="S7.T9.4.1.17.2" class="ltx_td ltx_align_center ltx_border_bb" style="padding: -0.6pt 3.0pt">5.6</td>
<td id="S7.T9.4.1.17.3" class="ltx_td ltx_align_center ltx_border_bb" style="padding: -0.6pt 3.0pt">48.5</td>
<td id="S7.T9.4.1.17.4" class="ltx_td ltx_align_center ltx_border_bb" style="padding: -0.6pt 3.0pt">48.5</td>
<td id="S7.T9.4.1.17.5" class="ltx_td ltx_nopad_r ltx_align_center ltx_border_bb" style="padding: -0.6pt 3.0pt">42.9</td>
</tr>
</tbody>
</table>

<figcaption>TABLE IX: WebArena task-success evidence by backbone. Scores are percentages; Span reports the high–low difference in percentage points for each backbone.</figcaption>
</figure>



Tab. <a href="#S7.T9" class="ltx_ref" title="TABLE IX ‣ 7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">IX</a> summarizes sparse WebArena results as backbone-level evidence slices, including both model-only references and harnessed agent systems. Rows containing the same backbone under multiple settings provide the strongest evidence for harness effects. Because most public WebArena reports describe complete agent systems rather than controlled factorial ablations, differences in prompts, browser actions, observation formats, retry policies, search budgets, training data, and implementation details should be treated as part of the reported system configuration \[<a href="#bib.bib113" class="ltx_ref">17</a>, <a href="#bib.bib249" class="ltx_ref">248</a>, <a href="#bib.bib250" class="ltx_ref">249</a>\].





The clearest harness effects come from backbones that have both model-only and harnessed results. GPT-4o ranges from 13.1% in the model-only baseline to 54.6% with WebOperator, a 41.5% span; even among named harnesses alone, it ranges from 19.2% with LM-TS to 54.6% with WebOperator \[<a href="#bib.bib254" class="ltx_ref">250</a>, <a href="#bib.bib251" class="ltx_ref">251</a>\]. GPT-4 improves from 14.9% to 33.0% with SteP, GPT-4-Turbo from 16.5% to 45.7% with AgentOccam, and GPT-3.5 from 8.9% to 29.1% under the stronger WebPilot entry \[<a href="#bib.bib255" class="ltx_ref">252</a>, <a href="#bib.bib257" class="ltx_ref">253</a>, <a href="#bib.bib252" class="ltx_ref">254</a>\]. The same phenomenon appears for open-weight or distilled models: DeepSeek-R1-Distill-Llama-8B moves from 8.5% to 43.6% with AgentSymbiotic, Llama-3.2-1B from 2.4% to 24.1%, and Llama-3.1-8B from 5.6% to 48.5% \[<a href="#bib.bib253" class="ltx_ref">255</a>\]. These gaps are too large to be explained by task noise alone; they reflect how observation design, search, workflow memory, action grounding, and stopping policies transform a language model into an effective web actor. Futhermore, WebTactix with DeepSeek V3.2 reaches 74.3%, corresponding to 594 solved tasks out of 812 in its public report \[<a href="#bib.bib256" class="ltx_ref">256</a>\]. OpAgent reaches 71.6% with Gemini 3 Pro, and ColorBrowserAgent reaches 71.2% with GPT-5 \[<a href="#bib.bib259" class="ltx_ref">257</a>, <a href="#bib.bib258" class="ltx_ref">258</a>\], showing that recent web-agent systems can exceed the 70% level on WebArena, but they combine strong backbones with specialized runtime structure, grounding, search, and adaptive memory; they should therefore be treated as model–harness system results.





Fixed-harness comparisons show the complementary role of model capability. BrowserGym \[<a href="#bib.bib250" class="ltx_ref">249</a>\] provides the broadest same-harness slice: scores range from 51.2% for Gemini 3 Pro to 42.3% for Gemini 3.1 Flash-L, 41.5% for Qwen3.5-27B, 36.2% for Claude 3.5 Sonnet, 31.4% for GPT-4o, 23.5% for GPT-4, 18.4% for Llama-3.1-70B, and 13.6% for GPT-4o-mini \[<a href="#bib.bib250" class="ltx_ref">249</a>\]. Within Qwen3.5, performance falls monotonically from 27B to 9B, 4B, and 2B, indicating that stronger backbones generally improve planning, instruction following, and state tracking under a common browser interface. Yet model size does not fully determine outcomes: GPT-4o under BrowserGym trails Gemini 3.1 Flash-L and Qwen3.5-27B, while AgentSymbiotic with Llama-3.1-8B exceeds several larger-model BrowserGym results. The same backbone can be under-expressed by one harness and amplified by another.





Overall, WebArena reinforces the model–harness view from a web-interaction setting. In coding benchmarks, the harness shapes how tests, edits, and repository context are exposed; in WebArena, it shapes how a model sees the page, chooses browser actions, recovers from navigation errors, and verifies that a website state has changed as intended. Programmatic scoring reduces evaluator drift compared with LLM-as-judge protocols, but it does not remove all measurement risk: brittle checkers, ambiguous instructions, and environment leakage can still distort results. For high-confidence claims, audited variants such as WebArena Verified \[<a href="#bib.bib114" class="ltx_ref">259</a>\] are preferable when available because they retain the reproducible WebArena environment while repairing evaluator and instruction artifacts. Consequently, browser-agent success is best reported as a conditional property of a complete model–harness system, together with its observation mode, action interface, search or retry budget, memory policy, and source artifacts.







### 7.6 Benchmark Insights



Several lessons emerge from comparing harness behavior across benchmarks.





Harness design should match the benchmark oracle. When benchmark provides strong automatic feedback, as in coding tasks with tests, effective harnesses exploit verifier loops, patch refinement, and rollback. Terminal-Bench reinforces the same principle in command-line environments: useful harnesses turn command output, files, and completion checks into actionable feedback for termination, retry, and repair. When the oracle is weak or delayed, as in research or workplace tasks, the harness must rely more on provenance tracking, intermediate review, and conservative stopping.





Autonomy and complexity are not monotonic goods. Fully open-ended loops explore broadly but can accumulate context, drift, and cost. When objectives are narrow and success is mechanically checkable, structured pipelines such as localization–repair–validation can outperform more agentic loops, and compact scaffolds can match richer runtimes. The key design question is not how much autonomy the harness exposes, but which degrees of freedom help the model exploit the benchmark’s feedback structure.





Model–harness compatibility matters. A strong model may perform poorly under a harness that exposes the wrong action space or overloads the context window. Conversely, a lightweight scaffold can be effective when it matches the model’s preferred interaction pattern and the benchmark’s feedback structure. On Terminal-Bench 2.0, the same model can vary by double-digit accuracy across harnesses; on WebArena, the gap between model-only baselines and browser-agent scaffolds can exceed 40% for GPT-4o. These differences make compatibility an empirical property of the model–harness pair rather than an implementation detail.





Scores are conditional on runtime configuration. Tool privileges, context policy, retry budget, sandbox restrictions, and completion criteria all shape measured performance. The Terminal-Bench public logs further show that runtime and timeout profiles vary substantially even among leaderboard-visible submissions. Thus, a benchmark score is interpretable only together with the runtime configuration that produced it. Reports should include at least model version, harness identity, tool privileges, retry and timeout policy, execution environment, token or API usage when available, and trace or verifier metadata.





Toward value-aware evaluation. The empirical results support a shift from score-centric ranking to value-aware agent evaluation. Stronger models raise the ceiling, but harness design determines how much of that capability becomes reliable, efficient, and auditable task completion. Future evaluation should therefore measure not only task success, but also resource use, latency, timeout behavior, recovery quality, safety constraints, and trace auditability. This observation motivates the value-aware objectives in Sec. <a href="#S8" class="ltx_ref" title="8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">8</a>, where success is evaluated jointly with cost, latency, risk, reliability, and process quality.









## 8 Outlook and Future Directions



Future agent progress will require more than stronger foundation models or richer benchmarks. We highlight three coupled directions: value-aware evaluation that accounts for success, cost, latency and safety; agent-native training that moves beyond planning and tool use toward verification and recovery; and harness design that adapts foundation models to task-specific tools, contexts, and constraints. Together, they connect near-term harness engineering with longer-term efforts to internalize reliable interaction, adaptation, and self-improvement into agent models.





### 8.1 From Score to Value-Aware Agent Optimization



Current agent leaderboards \[<a href="#bib.bib221" class="ltx_ref">228</a>, <a href="#bib.bib222" class="ltx_ref">229</a>\] are largely score-centric: systems are ranked by task success, while API cost, latency, safety, and trace quality are secondary or missing. This is useful for frontier comparison but incomplete for deployment, where cost-controlled, reliability-oriented, procedure-aware, and enterprise evaluation all point toward multi-dimensional agent quality \[<a href="#bib.bib10" class="ltx_ref">230</a>, <a href="#bib.bib11" class="ltx_ref">260</a>, <a href="#bib.bib13" class="ltx_ref">232</a>, <a href="#bib.bib15" class="ltx_ref">233</a>, <a href="#bib.bib12" class="ltx_ref">231</a>, <a href="#bib.bib218" class="ltx_ref">25</a>\].





A natural way to express this shift is to move from raw task success to value-aware agent optimization. Let $`\tau\sim\mathcal{D}`$ denote a task instance, and let $`z=\mathrm{Run}(\tau;\mathcal{M},\mathcal{H},\omega)`$ denote the execution trace produced by model $`\mathcal{M}`$ and harness $`\mathcal{H}`$ under stochasticity $`\omega`$. For a trace $`z`$, let $`S(z)\in\{0,1\}`$ indicate task success, $`C(z)`$ execution cost, $`L(z)`$ latency, and $`R(z)`$ safety or compliance risk. Cost may include token/API usage, tool calls, compute, or infrastructure; latency may be wall-clock time or interaction steps; risk may come from policy violations, safety checkers, or human audits. Let $`V(\tau)\geq 0`$ denote task utility, such as user value, scientific value, priority, or risk-adjusted importance. The success probability of a model–harness pair can then be estimated from repeated runs as

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
P_{\mathrm{succ}}(\tau;\mathcal{M},\mathcal{H})=\mathbb{E}_{\omega}\!\left[S\!\left(\mathrm{Run}(\tau;\mathcal{M},\mathcal{H},\omega)\right)\right].
``` |  | (5) |

Let $`Q_{\mathrm{proc}}(z)\in[0,1]`$ summarize process quality, including trace inspectability, verifier use, recovery behavior, provenance quality, and policy compliance. Let $`\mathrm{Rel}_{k}(\tau;\mathcal{M},\mathcal{H})`$ denote repeated-run reliability estimated from $`k`$ runs, for example through consistency, pass@$`k`$, or stress-test reliability. Instead of maximizing success alone, value-aware optimization can be written as

<table id="S8.E6" class="ltx_equationgroup ltx_eqn_table">
<tbody>
<tr id="S8.E6X" class="ltx_equation ltx_eqn_row ltx_align_baseline">
<td class="ltx_eqn_cell ltx_eqn_center_padleft"></td>
<td class="ltx_td ltx_align_right ltx_eqn_cell">max<sub>ℳ, ℋ</sub></td>
<td class="ltx_td ltx_align_left ltx_eqn_cell">𝔼<sub><em>τ</em> ∼ 𝒟</sub>[<em>V</em>(<em>τ</em>) <em>P</em><sub>succ</sub>(<em>τ</em>; ℳ, ℋ) <em>Q̄</em><sub>proc</sub>(<em>τ</em>; ℳ, ℋ)]</td>
<td class="ltx_eqn_cell ltx_eqn_center_padright"></td>
<td rowspan="3" class="ltx_eqn_cell ltx_eqn_eqno ltx_align_middle ltx_align_right">(6)</td>
</tr>
<tr id="S8.E6Xa" class="ltx_equation ltx_eqn_row ltx_align_baseline">
<td class="ltx_eqn_cell ltx_eqn_center_padleft"></td>
<td class="ltx_td ltx_align_right ltx_eqn_cell">s.t.</td>
<td class="ltx_td ltx_align_left ltx_eqn_cell">𝔼<sub><em>τ</em>, <em>ω</em></sub> [<em>C</em>(<em>z</em>)] ≤ <em>B</em><sub><em>C</em></sub>, Quantile<sub><em>p</em></sub> (<em>L</em>(<em>z</em>)) ≤ <em>B</em><sub><em>L</em></sub>,</td>
<td class="ltx_eqn_cell ltx_eqn_center_padright"></td>
</tr>
<tr id="S8.E6Xb" class="ltx_equation ltx_eqn_row ltx_align_baseline">
<td class="ltx_eqn_cell ltx_eqn_center_padleft"></td>
<td class="ltx_td ltx_eqn_cell"></td>
<td class="ltx_td ltx_align_left ltx_eqn_cell">𝔼<sub><em>τ</em>, <em>ω</em></sub> [<em>R</em>(<em>z</em>)] ≤ <em>ϵ</em>, 𝔼<sub><em>τ</em></sub> [Rel<sub><em>k</em></sub>(<em>τ</em>; ℳ, ℋ)] ≥ <em>ρ</em>.</td>
<td class="ltx_eqn_cell ltx_eqn_center_padright"></td>
</tr>
</tbody>
</table>

where $`\bar{Q}_{\mathrm{proc}}(\tau;\mathcal{M},\mathcal{H})=\mathbb{E}_{\omega}[Q_{\mathrm{proc}}(z)]`$. This is not a universal leaderboard score; it makes the deployment target explicit by coupling task value with cost, latency, risk, and reliability constraints. The trade-off is task-dependent: high-value or high-risk tasks may justify stronger verification, while routine high-frequency tasks favor cheaper models, shorter trajectories, and stricter stopping policies.





Let $`\tilde{C}(z)=C(z)/B_{C}`$, $`\tilde{L}(z)=L(z)/B_{L}`$, and $`\tilde{R}(z)=R(z)/\epsilon`$ be normalized cost, latency, and risk. A complementary value-density objective is

<table id="S8.E7" class="ltx_equationgroup ltx_eqn_table">
<tbody>
<tr id="S8.E7X" class="ltx_equation ltx_eqn_row ltx_align_baseline">
<td class="ltx_eqn_cell ltx_eqn_center_padleft"></td>
<td class="ltx_td ltx_align_right ltx_eqn_cell">VD<sub><em>α</em>, <em>β</em>, <em>γ</em></sub></td>
<td class="ltx_td ltx_align_left ltx_eqn_cell"> = 𝔼<sub><em>τ</em>, <em>ω</em></sub>[<em>V</em>(<em>τ</em>)<em>S</em>(<em>z</em>)<em>Q</em><sub>proc</sub>(<em>z</em>)<em>D</em>(<em>z</em>)<sup>−1</sup>],</td>
<td class="ltx_eqn_cell ltx_eqn_center_padright"></td>
<td rowspan="2" class="ltx_eqn_cell ltx_eqn_eqno ltx_align_middle ltx_align_right">(7)</td>
</tr>
<tr id="S8.E7Xa" class="ltx_equation ltx_eqn_row ltx_align_baseline">
<td class="ltx_eqn_cell ltx_eqn_center_padleft"></td>
<td class="ltx_td ltx_align_right ltx_eqn_cell"><em>D</em>(<em>z</em>)</td>
<td class="ltx_td ltx_align_left ltx_eqn_cell"> = (1 + <em>C̃</em>(<em>z</em>))<sup><em>α</em></sup>(1 + <em>L̃</em>(<em>z</em>))<sup><em>β</em></sup>(1 + <em>R̃</em>(<em>z</em>))<sup><em>γ</em></sup>.</td>
<td class="ltx_eqn_cell ltx_eqn_center_padright"></td>
</tr>
</tbody>
</table>

where $`\alpha`$, $`\beta`$, and $`\gamma`$ control the penalties on cost, latency, and risk. This is a family of deployment-specific utilities rather than a fixed metric. Different deployments can instantiate it differently: high-value tasks may tolerate stronger verification, high-frequency workflows may penalize latency and cost, and safety-critical settings may replace soft risk penalties with hard constraints. The same traces also support simpler reports, such as cost per effective success or latency per successful task, which distinguish systems with similar success rates but different runtime profiles.





From this perspective, harness engineering is a resource-allocation problem. The harness chooses models, context, memory access, tools, retries, verifiers, stopping rules, and human escalation. Model routing, context compression, cache reuse, verifier selection, recovery policy, and early stopping determine useful progress per unit cost, rather than being mere implementation details. Future benchmarks should therefore report success together with token/API cost, tool calls, retries, 95th-percentile (P95) latency, recovery behavior, policy violations, and trace auditability.







### 8.2 Learning to Verify, Recover, and Adapt



The value-aware view also suggests a path for agent learning. Execution traces are not only evaluation records; they contain outcomes, cost, tool calls, verifier signals, recovery attempts, policy violations, and feedback. Future agents should learn not only to plan and act, but also to verify intermediate states, diagnose failures, recover from local errors, and adapt across tasks.





A useful abstraction is a constrained self-evolution loop. Let $`\theta_{t}`$ denote the model parameters and $`\phi_{t}`$ denote the harness configuration at iteration $`t`$. Running the agent on tasks from $`\mathcal{D}`$ produces traces $`\mathcal{Z}_{t}`$, from which the system extracts an evidence set $`\mathcal{E}_{t}`$ containing outcomes, failure modes, verifier results, cost profiles, and safety events. An update operator $`U`$ may then change the model, the harness, or both:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
(\theta_{t+1},\phi_{t+1})=\mathrm{VerifyRetain}\!\left(U(\theta_{t},\phi_{t},\mathcal{E}_{t})\right).
``` |  | (8) |

Here $`\mathrm{VerifyRetain}`$ keeps an update only if it passes held-out tasks, regression tests, process checks, and safety constraints; otherwise it is rejected or rolled back. The expression is not a fixed algorithm; it makes the control structure explicit: reliable self-evolution must couple experience extraction, credit assignment, modification, and validation.





Existing agent-native training mostly advances the model side of this loop. Interactive RL and environment-based training reduce train–test mismatch in web, computer-use, and software-engineering agents \[<a href="#bib.bib99" class="ltx_ref">41</a>, <a href="#bib.bib155" class="ltx_ref">42</a>, <a href="#bib.bib56" class="ltx_ref">160</a>, <a href="#bib.bib60" class="ltx_ref">161</a>\]. Self-evolving systems further treat interaction experience as a reusable learning signal for self-questioning, attribution, online adaptation, and reward-free exploration \[<a href="#bib.bib38" class="ltx_ref">44</a>, <a href="#bib.bib41" class="ltx_ref">45</a>, <a href="#bib.bib40" class="ltx_ref">162</a>, <a href="#bib.bib39" class="ltx_ref">163</a>\]. Together, these works suggest that verification, recovery, and adaptation should become trainable behaviors, not only prompt-induced routines.





Parameter updates alone cannot absorb all runtime bottlenecks. Many failures arise from harness choices: observation format, action granularity, memory retrieval, or verifier timing. Agentic Harness Engineering (AHE) makes this harness-side path concrete by freezing the base model and evolving coding-agent harness components through observability-driven feedback \[<a href="#bib.bib42" class="ltx_ref">40</a>\]. Its key lesson is that self-evolution must be observable and falsifiable: components should be explicit and revertible, traces should be distilled into evidence, and proposed changes should make predictions that later outcomes can check.





The long-term direction is co-evolution of models and harnesses. Optimized harnesses produce better traces for training; trained models internalize recurring verification and recovery patterns; the resulting model changes which harness structure is optimal. This introduces risks such as benchmark overfitting, incorrect failure attribution, stale memory, and unsafe runtime modification. Agent-native training therefore does not eliminate the harness; it turns the harness into a training environment, evidence pipeline, verifier, and governance layer, with held-out evaluation, ablations, audit logs, rollback, and human approval for high-impact changes.



<figure id="S8.T10" class="ltx_table">

 
<table id="S8.T10.4.1" class="ltx_tabular ltx_align_middle">
<tbody>
<tr id="S8.T10.4.1.1" class="ltx_tr">
<td id="S8.T10.4.1.1.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle ltx_border_tt" style="padding: -1.1pt 1.6pt"> Harness </td>
<td id="S8.T10.4.1.1.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle ltx_border_tt" style="padding: -1.1pt 1.6pt"> Control style </td>
<td id="S8.T10.4.1.1.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_tt" style="padding: -1.1pt 1.6pt"> Key design </td>
<td id="S8.T10.4.1.1.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_tt" style="padding: -1.1pt 1.6pt"> Strength </td>
<td id="S8.T10.4.1.1.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_tt" style="padding: -1.1pt 1.6pt"> Typical limitation </td>
</tr>
<tr id="S8.T10.4.1.2" class="ltx_tr" style="--ltx-bg-color:#F2F2F2;">
<td id="S8.T10.4.1.2.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle ltx_border_t" style="padding: -1.1pt 1.6pt"> SWE-agent [<a href="#bib.bib107" class="ltx_ref">21</a>] </td>
<td id="S8.T10.4.1.2.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle ltx_border_t" style="padding: -1.1pt 1.6pt"> ReAct-style loop </td>
<td id="S8.T10.4.1.2.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_t" style="padding: -1.1pt 1.6pt"> LM interacts with shell/editor tools and iteratively inspects, edits, and tests code. </td>
<td id="S8.T10.4.1.2.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_t" style="padding: -1.1pt 1.6pt"> Simple and general; strong baseline for real GitHub issues. </td>
<td id="S8.T10.4.1.2.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_t" style="padding: -1.1pt 1.6pt"> Can be unstable and token-expensive on long debugging trajectories. </td>
</tr>
<tr id="S8.T10.4.1.3" class="ltx_tr">
<td id="S8.T10.4.1.3.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> mini-SWE-agent [<a href="#bib.bib226" class="ltx_ref">238</a>] </td>
<td id="S8.T10.4.1.3.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Minimal tool loop </td>
<td id="S8.T10.4.1.3.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Roughly 100-line scaffold exposing compact shell/edit actions and leaving most orchestration to the model. </td>
<td id="S8.T10.4.1.3.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> High transparency; strong controlled comparisons across frontier backbones. </td>
<td id="S8.T10.4.1.3.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Relies on the model to manage planning, context, and recovery. </td>
</tr>
<tr id="S8.T10.4.1.4" class="ltx_tr" style="--ltx-bg-color:#F2F2F2;">
<td id="S8.T10.4.1.4.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Agentless [<a href="#bib.bib217" class="ltx_ref">236</a>] </td>
<td id="S8.T10.4.1.4.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Fixed pipeline </td>
<td id="S8.T10.4.1.4.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Staged localization, repair generation, and patch selection without a fully autonomous interaction loop. </td>
<td id="S8.T10.4.1.4.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Stable, cheaper, and easier to reproduce. </td>
<td id="S8.T10.4.1.4.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Less adaptive when the issue requires exploratory debugging. </td>
</tr>
<tr id="S8.T10.4.1.5" class="ltx_tr">
<td id="S8.T10.4.1.5.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> AutoCodeRover [<a href="#bib.bib214" class="ltx_ref">239</a>] </td>
<td id="S8.T10.4.1.5.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Search-guided repair </td>
<td id="S8.T10.4.1.5.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Repository-aware code search, AST-level localization, patch generation, and validation. </td>
<td id="S8.T10.4.1.5.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Strong at locating relevant files/functions before editing. </td>
<td id="S8.T10.4.1.5.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Depends heavily on localization quality and repo search signals. </td>
</tr>
<tr id="S8.T10.4.1.6" class="ltx_tr" style="--ltx-bg-color:#F2F2F2;">
<td id="S8.T10.4.1.6.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> OpenHands + CodeAct 2.1 [<a href="#bib.bib106" class="ltx_ref">10</a>] </td>
<td id="S8.T10.4.1.6.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> General runtime agent </td>
<td id="S8.T10.4.1.6.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Full software-engineering runtime with shell, file editing, browser/tools, and iterative execution. </td>
<td id="S8.T10.4.1.6.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Flexible for broad coding tasks and long interactions. </td>
<td id="S8.T10.4.1.6.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Higher orchestration cost and larger action space. </td>
</tr>
<tr id="S8.T10.4.1.7" class="ltx_tr">
<td id="S8.T10.4.1.7.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> PatchPilot [<a href="#bib.bib213" class="ltx_ref">240</a>] </td>
<td id="S8.T10.4.1.7.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Structured repair workflow </td>
<td id="S8.T10.4.1.7.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Reproduction, localization, generation, validation, and refinement are organized as a controlled pipeline. </td>
<td id="S8.T10.4.1.7.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Good cost-performance trade-off; validation-focused. </td>
<td id="S8.T10.4.1.7.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Less open-ended than fully interactive agents. </td>
</tr>
<tr id="S8.T10.4.1.8" class="ltx_tr" style="--ltx-bg-color:#F2F2F2;">
<td id="S8.T10.4.1.8.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Codex / Claude Code [<a href="#bib.bib239" class="ltx_ref">7</a>, <a href="#bib.bib241" class="ltx_ref">6</a>] </td>
<td id="S8.T10.4.1.8.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Managed coding agent </td>
<td id="S8.T10.4.1.8.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Proprietary coding runtime tightly couples model, code execution, editing, and task management. </td>
<td id="S8.T10.4.1.8.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> High end-to-end coding performance with productized recovery and state management. </td>
<td id="S8.T10.4.1.8.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> System details are less transparent than open-source harnesses. </td>
</tr>
<tr id="S8.T10.4.1.9" class="ltx_tr">
<td id="S8.T10.4.1.9.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Meta-Harness [<a href="#bib.bib54" class="ltx_ref">24</a>] </td>
<td id="S8.T10.4.1.9.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Search-optimized harness </td>
<td id="S8.T10.4.1.9.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Treats prompts, tools, and runtime policies as a searchable harness design space. </td>
<td id="S8.T10.4.1.9.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Directly optimizes the harness rather than only the model. </td>
<td id="S8.T10.4.1.9.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Adds search cost and can overfit to benchmark-specific feedback. </td>
</tr>
<tr id="S8.T10.4.1.10" class="ltx_tr" style="--ltx-bg-color:#F2F2F2;">
<td id="S8.T10.4.1.10.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> SageAgent / OpenSage [<a href="#bib.bib215" class="ltx_ref">261</a>, <a href="#bib.bib222" class="ltx_ref">229</a>] </td>
<td id="S8.T10.4.1.10.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Generated agent scaffold </td>
<td id="S8.T10.4.1.10.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Uses a self-programming agent-generation engine to produce and refine executable agent scaffolds. </td>
<td id="S8.T10.4.1.10.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Strong Terminal-Bench results with relatively low observed runtime. </td>
<td id="S8.T10.4.1.10.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Public leaderboard evidence is observational rather than a controlled ablation. </td>
</tr>
<tr id="S8.T10.4.1.11" class="ltx_tr">
<td id="S8.T10.4.1.11.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Terminus 2 [<a href="#bib.bib222" class="ltx_ref">229</a>, <a href="#bib.bib247" class="ltx_ref">246</a>] </td>
<td id="S8.T10.4.1.11.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Reference terminal harness </td>
<td id="S8.T10.4.1.11.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Terminal-Bench native scaffold with shell execution, task state, verifier feedback, and benchmark constraints. </td>
<td id="S8.T10.4.1.11.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Useful anchor for cross-model and cross-harness terminal comparisons. </td>
<td id="S8.T10.4.1.11.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Can expose high timeout rates on difficult interactive tasks. </td>
</tr>
<tr id="S8.T10.4.1.12" class="ltx_tr" style="--ltx-bg-color:#F2F2F2;">
<td id="S8.T10.4.1.12.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Terminus-KIRA [<a href="#bib.bib216" class="ltx_ref">262</a>, <a href="#bib.bib222" class="ltx_ref">229</a>] </td>
<td id="S8.T10.4.1.12.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Terminal-native agent </td>
<td id="S8.T10.4.1.12.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Tool-calling, terminal interaction, completion checks, and verification-oriented execution. </td>
<td id="S8.T10.4.1.12.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Strong for terminal-bench style tasks requiring environment manipulation. </td>
<td id="S8.T10.4.1.12.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Performance depends on robust task completion detection. </td>
</tr>
<tr id="S8.T10.4.1.13" class="ltx_tr">
<td id="S8.T10.4.1.13.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Mux [<a href="#bib.bib222" class="ltx_ref">229</a>, <a href="#bib.bib247" class="ltx_ref">246</a>] </td>
<td id="S8.T10.4.1.13.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle" style="padding: -1.1pt 1.6pt"> Lightweight terminal harness </td>
<td id="S8.T10.4.1.13.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Minimal terminal-oriented scaffold for executing and verifying tasks. </td>
<td id="S8.T10.4.1.13.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Simple and relatively transparent. </td>
<td id="S8.T10.4.1.13.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top" style="padding: -1.1pt 1.6pt"> Weaker planning and recovery compared with richer runtimes. </td>
</tr>
<tr id="S8.T10.4.1.14" class="ltx_tr" style="--ltx-bg-color:#F2F2F2;">
<td id="S8.T10.4.1.14.1" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle ltx_border_bb" style="padding: -1.1pt 1.6pt"> TongAgents [<a href="#bib.bib222" class="ltx_ref">229</a>, <a href="#bib.bib247" class="ltx_ref">246</a>] </td>
<td id="S8.T10.4.1.14.2" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_middle ltx_border_bb" style="padding: -1.1pt 1.6pt"> Terminal agent system </td>
<td id="S8.T10.4.1.14.3" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_bb" style="padding: -1.1pt 1.6pt"> Submission-level terminal harness combining command execution, state tracking, and completion control. </td>
<td id="S8.T10.4.1.14.4" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_bb" style="padding: -1.1pt 1.6pt"> Strong observed Gemini 3.1 Pro Terminal-Bench result. </td>
<td id="S8.T10.4.1.14.5" class="ltx_td ltx_nopad_l ltx_nopad_r ltx_align_left ltx_align_top ltx_border_bb" style="padding: -1.1pt 1.6pt"> Design details are less documented than paper-backed harnesses. </td>
</tr>
</tbody>
</table>

<figcaption>TABLE X: Representative harness designs behind agent benchmark performance. The table is not exhaustive; it highlights harness families that explain the empirical patterns in Sec. <a href="#S7" class="ltx_ref" title="7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">7</a>.</figcaption>
</figure>





### 8.3 Harness Generalization Versus Specialization



The previous two directions raise a systems question: should a harness be reusable across tasks or specialized for one environment? The answer depends on which harness layer is being considered. Tracing, sandboxing, permission control, artifact storage, budget management, model routing, and basic tool protocols can form a reusable substrate. Observation shaping, action abstraction, memory policy, verifier design, and recovery strategy are more often tied to the task pressure profile.





This distinction explains why realistic benchmarks are both specialized and compositional. Software-engineering benchmarks stress verification and reversible execution \[<a href="#bib.bib93" class="ltx_ref">16</a>\]; web and GUI benchmarks stress grounding, session state, and safe action selection \[<a href="#bib.bib113" class="ltx_ref">17</a>, <a href="#bib.bib85" class="ltx_ref">18</a>\]; workplace and cross-service benchmarks stress coordination across heterogeneous tools and failure modes \[<a href="#bib.bib147" class="ltx_ref">19</a>, <a href="#bib.bib14" class="ltx_ref">93</a>\]. These settings place their primary bottlenecks on different harness layers, as discussed in Sec. <a href="#S6" class="ltx_ref" title="6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">6</a>. A generic harness improves reuse and lowers engineering cost, but may provide weak inductive bias for the target bottleneck; a specialized harness can improve peak performance, but may reduce transferability and overfit to a benchmark-specific surface.





A practical direction is layered design: a general substrate plus domain-specific adapters. The substrate provides logging, isolation, permission control, persistence, cost accounting, standardized tool access, and auditability. Adapters define observations, actions, verifiers, memory policies, and retry, rollback, stopping, or escalation rules. Protocols such as MCP and A2A reduce connector fragmentation and improve interoperability \[<a href="#bib.bib243" class="ltx_ref">65</a>, <a href="#bib.bib242" class="ltx_ref">66</a>\], but protocol standardization is not the same as harness generalization. The harness must still decide what to expose, which actions to allow, how to verify outcomes and recover from failure.





Future evaluations should test whether harness improvements transfer across task distributions, model families, and adapter choices, not only whether they raise one benchmark score. Useful evidence includes same-model different-harness comparisons, component ablations, adapter replacement tests, held-out tasks, cross-domain transfer, and runtime profiles. For self-evolving harnesses, this separates benchmark-specific tuning from reusable gains in tracing, memory compression, tool abstraction, verifier selection, or recovery policy \[<a href="#bib.bib42" class="ltx_ref">40</a>\]. The long-term goal is modular and pressure-aware harness design: reusable substrates provide stability, observability, and governance, while domain adapters inject task-specific observation, action, verification, and recovery biases.









## 9 Conclusion



This survey argued that the development of LLM-based agents is best understood as an evolution across four paradigms: prompt engineering, agentic workflows, harness engineering, and agent-native training. The key systems insight is that agent performance is increasingly governed by the interaction between model and runtime rather than by model capability in isolation. The harness perspective helps explain why similar base models can behave so differently once deployed in different environments. It also clarifies why recent progress has depended so heavily on context management, verification, tool design, orchestration, and recovery. At the same time, the rise of RL for agentic behavior suggests that some of this external scaffolding will gradually be internalized into model parameters.





The field is still early. Reliability remains below deployment needs in many realistic settings, evaluation is still only partially aligned with real use, and the boundary between model design and system design is still being renegotiated. But the direction is clear: agent engineering has moved beyond prompt craft and into the study of full systems. Understanding that shift is essential for both building better agents and evaluating their progress responsibly.







## References

- \[1\] T. B. Brown, B. Mann, N. Ryder, M. Subbiah, J. Kaplan, P. Dhariwal, and et al. (2020)  Language models are few-shot learners.  In Advances in Neural Information Processing Systems,  Cited by: <a href="#S1.SS2.p2.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[2\] L. Ouyang, J. Wu, X. Jiang, D. Almeida, C. Wainwright, et al. (2022)  Training language models to follow instructions with human feedback.  Advances in neural information processing systems.  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[3\] J. Luo, W. Zhang, Y. Yuan, Y. Zhao, J. Yang, Y. Gu, B. Wu, et al. (2025)  Large language model agent: a survey on methodology, applications and challenges.  arXiv preprint arXiv:2503.21460.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.4.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[4\] Z. Xi, W. Chen, X. Guo, W. He, Y. Ding, B. Hong, M. Zhang, J. Wang, et al. (2025)  The rise and potential of large language model based agents: a survey.  Science China Information Sciences.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.3.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[5\] Cognition Labs (2024)  Introducing devin, the first AI software engineer.  Note: <a href="https://www.cognition.ai/blog/introducing-devin" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.cognition.ai/blog/introducing-devin</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[6\] Anthropic (2025)  How claude code works.  Note: https://docs.claude.com/en/docs/claude-code/how-claude-code-works  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>, <a href="#S8.T10.4.1.8.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[7\] OpenAI (2026)  Harness engineering: leveraging codex in an agent-first world.  Note: https://openai.com/index/harness-engineering/  Cited by: <a href="#S1.SS1.p1.1" class="ltx_ref" title="1.1 Harness Design as a Performance Lever ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.1</a>, <a href="#S1.SS2.p4.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Implementation View: Model Plus Harness ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.2</a>, <a href="#S2.SS4.p1.1" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.4</a>, <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S8.T10.4.1.8.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[8\] M. Shen, Y. Li, L. Chen, Z. Fan, Y. Li, and Q. Yang (2025)  From mind to machine: the rise of manus ai as a fully autonomous digital agent.  arXiv preprint arXiv:2505.02024.  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[9\] T. B. Richards (2023)  AutoGPT.  Note: <a href="https://github.com/Significant-Gravitas/AutoGPT" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/Significant-Gravitas/AutoGPT</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[10\] X. Wang, B. Li, Y. Song, F. F. Xu, X. Tang, M. Zhuge, J. Pan, Y. Song, B. Li, J. Singh, et al. (2025)  Openhands: an open platform for ai software developers as generalist agents.  In International Conference on Learning Representations,  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>, <a href="#S7.SS1.p3.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S8.T10.4.1.6.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[11\] OpenClaw Team (2025)  OpenClaw: personal AI assistant.  Note: <a href="https://github.com/openclaw/openclaw" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/openclaw/openclaw</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[12\] D. Hendrycks, C. Burns, S. Basart, A. Zou, M. Mazeika, D. Song, and J. Steinhardt (2020)  Measuring massive multitask language understanding.  arXiv preprint arXiv:2009.03300.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[13\] D. Rein, B. L. Hou, A. C. Stickland, J. Petty, R. Y. Pang, J. Dirani, et al. (2024)  Gpqa: a graduate-level google-proof q&a benchmark.  In First conference on language modeling,  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S3.SS1.p2.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[14\] M. Chen, J. Tworek, H. Jun, Q. Yuan, H. P. D. O. Pinto, J. Kaplan, H. Edwards, Y. Burda, et al. (2021)  Evaluating large language models trained on code.  arXiv preprint arXiv:2107.03374.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[15\] L. Phan, A. Gatti, Z. Han, N. Li, J. Hu, H. Zhang, et al. (2025)  Humanity’s last exam.  arXiv preprint arXiv:2501.14249.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>. 
- \[16\] C. E. Jimenez, J. Yang, A. Wettig, S. Yao, K. Pei, O. Press, and K. Narasimhan (2024)  Swe-bench: can language models resolve real-world github issues?.  In International Conference on Learning Representations,  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>, <a href="#S5.SS6.p2.1" class="ltx_ref" title="5.6 Verification and Governance ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.6</a>, <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>, <a href="#S7.SS1.p2.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S7.SS3.p1.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.T6.4.1.3.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>, <a href="#S8.SS3.p2.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[17\] S. Zhou, F. F. Xu, H. Zhu, X. Zhou, R. Lo, A. Sridhar, X. Cheng, T. Ou, Y. Bisk, D. Fried, et al. (2024)  Webarena: a realistic web environment for building autonomous agents.  In International Conference on Learning Representations,  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S5.SS1.p2.1" class="ltx_ref" title="5.1 Observation Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.1</a>, <a href="#S5.SS6.p2.1" class="ltx_ref" title="5.6 Verification and Governance ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.6</a>, <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>, <a href="#S7.SS1.p2.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.SS5.p1.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>, <a href="#S7.SS5.p2.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>, <a href="#S7.T6.4.1.4.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>, <a href="#S8.SS3.p2.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[18\] T. Xie, D. Zhang, J. Chen, X. Li, S. Zhao, R. Cao, T. J. Hua, Z. Cheng, D. Shin, F. Lei, et al. (2024)  Osworld: benchmarking multimodal agents for open-ended tasks in real computer environments.  Advances in Neural Information Processing Systems.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S5.SS1.p2.1" class="ltx_ref" title="5.1 Observation Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.1</a>, <a href="#S5.SS6.p2.1" class="ltx_ref" title="5.6 Verification and Governance ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.6</a>, <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>, <a href="#S7.SS1.p2.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.T6.4.1.6.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>, <a href="#S8.SS3.p2.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[19\] F. F. Xu, Y. Song, B. Li, Y. Tang, K. Jain, M. Bao, et al. (2026)  Theagentcompany: benchmarking llm agents on consequential real world tasks.  Advances in Neural Information Processing Systems.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S7.T6.4.1.17.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>, <a href="#S8.SS3.p2.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[20\] M. A. Merrill, A. G. Shaw, N. Carlini, B. Li, H. Raj, I. Bercovich, L. Shi, J. Y. Shin, T. Walshe, E. K. Buchanan, et al. (2026)  Terminal-bench: benchmarking agents on hard, realistic tasks in command line interfaces.  arXiv preprint arXiv:2601.11868.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1</a>, <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS6.p2.1" class="ltx_ref" title="5.6 Verification and Governance ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.6</a>, <a href="#S7.SS1.p2.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S7.SS4.p1.1" class="ltx_ref" title="7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.4</a>, <a href="#S7.T6.4.1.7.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[21\] J. Yang, C. E. Jimenez, A. Wettig, K. Lieret, S. Yao, K. Narasimhan, and O. Press (2024)  Swe-agent: agent-computer interfaces enable automated software engineering.  Advances in Neural Information Processing Systems.  Cited by: <a href="#S1.SS1.p1.1" class="ltx_ref" title="1.1 Harness Design as a Performance Lever ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.1</a>, <a href="#S2.SS4.p5.1" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.4</a>, <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS1.p2.1" class="ltx_ref" title="5.1 Observation Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.1</a>, <a href="#S5.SS4.p2.1" class="ltx_ref" title="5.4 Action Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.4</a>, <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>, <a href="#S7.SS1.p3.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S8.T10.4.1.2.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[22\] M. Hashimoto (2026)  My AI adoption journey.  Note: <a href="https://mitchellh.com/writing/my-ai-adoption-journey" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://mitchellh.com/writing/my-ai-adoption-journey</a>  Cited by: <a href="#S1.SS1.p1.1" class="ltx_ref" title="1.1 Harness Design as a Performance Lever ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.1</a>, <a href="#S1.SS2.p4.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Implementation View: Model Plus Harness ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.2</a>, <a href="#S2.SS4.p1.1" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.4</a>. 
- \[23\] L. Pan, L. Zou, S. Guo, J. Ni, and H. Zheng (2026)  Natural-language agent harnesses.  arXiv preprint arXiv:2603.25723.  Cited by: <a href="#S1.SS1.p1.1" class="ltx_ref" title="1.1 Harness Design as a Performance Lever ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.1</a>, <a href="#S1.SS2.p4.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S1.SS2.p5.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS4.p5.1" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.4</a>, <a href="#S4.SS3.p10.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS3.p2.1" class="ltx_ref" title="5.3 Control Loop ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.3</a>, <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>. 
- \[24\] Y. Lee, R. Nair, Q. Zhang, K. Lee, O. Khattab, and C. Finn (2026)  Meta-harness: end-to-end optimization of model harnesses.  arXiv preprint arXiv:2603.28052.  Cited by: <a href="#S1.SS1.p1.1" class="ltx_ref" title="1.1 Harness Design as a Performance Lever ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.1</a>, <a href="#S1.SS2.p4.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S1.SS2.p5.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS4.p5.1" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.4</a>, <a href="#S4.SS3.p10.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS3.p2.1" class="ltx_ref" title="5.3 Control Loop ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.3</a>, <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S8.T10.4.1.9.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[25\] OpenSquilla Team (2026)  OpenSquilla: token-efficient ai agent with same budget, higher intelligence density.   GitHub.  Note: <a href="https://github.com/opensquilla/opensquilla" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/opensquilla/opensquilla</a>Apache-2.0 License  Cited by: <a href="#S1.SS1.p2.1" class="ltx_ref" title="1.1 Harness Design as a Performance Lever ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.1</a>, <a href="#S2.SS2.p2.1" class="ltx_ref" title="2.2 Implementation View: Model Plus Harness ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.2</a>, <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>. 
- \[26\] J. Wei, X. Wang, D. Schuurmans, M. Bosma, F. Xia, E. Chi, Q. V. Le, D. Zhou, et al. (2022)  Chain-of-thought prompting elicits reasoning in large language models.  Advances in neural information processing systems.  Cited by: <a href="#S1.SS2.p2.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS3.p2.1" class="ltx_ref" title="2.3 LLM as the Cognitive Engine ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.3</a>, <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[27\] X. Wang, J. Wei, D. Schuurmans, Q. Le, E. Chi, S. Narang, A. Chowdhery, and D. Zhou (2022)  Self-consistency improves chain of thought reasoning in language models.  arXiv preprint arXiv:2203.11171.  Cited by: <a href="#S1.SS2.p2.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS3.p2.1" class="ltx_ref" title="2.3 LLM as the Cognitive Engine ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.3</a>, <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[28\] S. Yao, D. Yu, J. Zhao, I. Shafran, T. Griffiths, Y. Cao, and K. Narasimhan (2023)  Tree of thoughts: deliberate problem solving with large language models.  Advances in neural information processing systems.  Cited by: <a href="#S1.SS2.p2.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS3.p2.1" class="ltx_ref" title="2.3 LLM as the Cognitive Engine ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.3</a>, <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[29\] Anthropic (2025)  Effective context engineering for AI agents.  Note: <a href="https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents</a>  Cited by: <a href="#S1.SS2.p3.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[30\] P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Küttler, M. Lewis, W. Yih, T. Rocktäschel, et al. (2020)  Retrieval-augmented generation for knowledge-intensive nlp tasks.  Advances in neural information processing systems.  Cited by: <a href="#S1.SS2.p3.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[31\] C. Packer, V. Fang, S. Patil, K. Lin, S. Wooders, and J. Gonzalez (2023)  MemGPT: towards llms as operating systems..  Cited by: <a href="#S1.SS2.p3.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S5.SS2.p2.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>, <a href="#S5.SS5.p2.1" class="ltx_ref" title="5.5 State and Artifact Store ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.5</a>, <a href="#S5.SS7.p1.1" class="ltx_ref" title="5.7 Cross-Layer Interactions in the Harness ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.7</a>. 
- \[32\] T. Schick, J. Dwivedi-Yu, R. Dessì, R. Raileanu, M. Lomeli, E. Hambro, L. Zettlemoyer, N. Cancedda, and T. Scialom (2023)  Toolformer: language models can teach themselves to use tools.  Advances in neural information processing systems.  Cited by: <a href="#S1.SS2.p3.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS3.p4.1" class="ltx_ref" title="2.3 LLM as the Cognitive Engine ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.3</a>, <a href="#S2.SS5.p2.1" class="ltx_ref" title="2.5 Key Infrastructure Primitives ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.5</a>. 
- \[33\] S. G. Patil, T. Zhang, X. Wang, and J. E. Gonzalez (2024)  Gorilla: large language model connected with massive apis.  Advances in Neural Information Processing Systems.  Cited by: <a href="#S1.SS2.p3.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS3.p4.1" class="ltx_ref" title="2.3 LLM as the Cognitive Engine ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.3</a>, <a href="#S2.SS5.p2.1" class="ltx_ref" title="2.5 Key Infrastructure Primitives ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.5</a>. 
- \[34\] G. Wang, Y. Xie, Y. Jiang, A. Mandlekar, C. Xiao, Y. Zhu, L. Fan, and A. Anandkumar (2023)  Voyager: an open-ended embodied agent with large language models.  arXiv preprint arXiv:2305.16291.  Cited by: <a href="#S1.SS2.p3.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S6.SS2.p10.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[35\] R. Xu and Y. Yan (2026)  Agent skills for large language models: architecture, acquisition, security, and the path forward.  arXiv preprint arXiv:2602.12430.  Cited by: <a href="#S1.SS2.p3.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>. 
- \[36\] S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao (2022)  React: synergizing reasoning and acting in language models.  arXiv preprint arXiv:2210.03629.  Cited by: <a href="#S1.SS2.p4.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[37\] A. Fourney, G. Bansal, H. Mozannar, C. Tan, E. Salinas, F. Niedtner, G. Proebsting, G. Bassman, J. Gerrits, J. Alber, et al. (2024)  Magentic-one: a generalist multi-agent system for solving complex tasks.  arXiv preprint arXiv:2411.04468.  Cited by: <a href="#S1.SS2.p5.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS2.p2.1" class="ltx_ref" title="2.2 Implementation View: Model Plus Harness ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.2</a>, <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[38\] W. Zhu, Z. Tang, and K. Yue (2026)  SYMPHONY: synergistic multi-agent planning with heterogeneous language model assembly.  arXiv preprint arXiv:2601.22623.  Cited by: <a href="#S1.SS2.p5.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS2.p2.1" class="ltx_ref" title="2.2 Implementation View: Model Plus Harness ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.2</a>, <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS3.p1.1" class="ltx_ref" title="5.3 Control Loop ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.3</a>. 
- \[39\] OpenAI (2025)  OpenAI agents sdk.  Note: <a href="https://github.com/openai/openai-agents-python" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/openai/openai-agents-python</a>  Cited by: <a href="#S1.SS2.p5.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S2.SS2.p2.1" class="ltx_ref" title="2.2 Implementation View: Model Plus Harness ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.2</a>, <a href="#S2.SS5.p6.1" class="ltx_ref" title="2.5 Key Infrastructure Primitives ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.5</a>, <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[40\] J. Lin, S. Liu, C. Pan, L. Lin, S. Dou, X. Huang, H. Yan, Z. Han, and T. Gui (2026)  Agentic harness engineering: observability-driven automatic evolution of coding-agent harnesses.  arXiv preprint arXiv:2604.25850.  Cited by: <a href="#S1.SS2.p5.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S1.SS2.p6.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS3.p10.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS4.p4.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p4.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>, <a href="#S8.SS3.p4.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[41\] Z. Qi, X. Liu, I. L. Iong, H. Lai, X. Sun, J. Sun, X. Yang, Y. Yang, S. Yao, W. Xu, et al. (2025)  Webrl: training llm web agents via self-evolving online curriculum reinforcement learning.  In International Conference on Learning Representations,  Vol. 2025.  Cited by: <a href="#S1.SS2.p6.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[42\] H. Lai, X. Liu, Y. Zhao, H. Xu, H. Zhang, B. Jing, Y. Ren, S. Yao, Y. Dong, and J. Tang (2025)  Computerrl: scaling end-to-end online reinforcement learning for computer use agents.  arXiv preprint arXiv:2508.14040.  Cited by: <a href="#S1.SS2.p6.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS4.p2.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[43\] D. Guo, D. Yang, H. Zhang, J. Song, P. Wang, Q. Zhu, et al. (2025)  Deepseek-r1: incentivizing reasoning capability in llms via reinforcement learning.  arXiv preprint arXiv:2501.12948.  Cited by: <a href="#S1.SS2.p6.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[44\] R. Wu, X. Wang, J. Mei, P. Cai, D. Fu, et al. (2025)  Evolver: self-evolving llm agents through an experience-driven lifecycle.  arXiv preprint arXiv:2510.16079.  Cited by: <a href="#S1.SS2.p6.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS4.p4.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[45\] Y. Zhai, S. Tao, C. Chen, A. Zou, Z. Chen, Q. Fu, S. Mai, L. Yu, J. Deng, Z. Cao, et al. (2025)  Agentevolver: towards efficient self-evolving agent system.  arXiv preprint arXiv:2511.10395.  Cited by: <a href="#S1.SS2.p6.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS4.p4.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[46\] J. Zhang, S. Hu, C. Lu, R. Lange, and J. Clune (2025)  Darwin godel machine: open-ended evolution of self-improving agents.  arXiv preprint arXiv:2505.22954.  Cited by: <a href="#S1.SS2.p6.1" class="ltx_ref" title="1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.2</a>, <a href="#S4.SS4.p4.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[47\] L. Wang, C. Ma, X. Feng, Z. Zhang, H. Yang, J. Zhang, Z. Chen, J. Tang, X. Chen, Y. Lin, et al. (2024)  A survey on large language model based autonomous agents.  Frontiers of Computer Science.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.2.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[48\] T. Guo, X. Chen, Y. Wang, R. Chang, S. Pei, N. V. Chawla, O. Wiest, and X. Zhang (2024)  Large language model based multi-agents: a survey of progress and challenges.  arXiv preprint arXiv:2402.01680.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.5.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[49\] X. Li, S. Wang, S. Zeng, Y. Wu, and Y. Yang (2024)  A survey on llm-based multi-agent systems: workflow, infrastructure, and challenges.  Vicinagearth.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.6.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[50\] K. Tran, D. Dao, M. Nguyen, Q. Pham, B. O’Sullivan, and H. D. Nguyen (2025)  Multi-agent collaboration mechanisms: a survey of llms.  arXiv preprint arXiv:2501.06322.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.7.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[51\] A. Yehudai, L. Eden, A. Li, G. Uziel, Y. Zhao, R. Bar-Haim, A. Cohan, and M. Shmueli-Scheuer (2025)  Survey on evaluation of llm-based agents.  arXiv preprint arXiv:2503.16416.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.8.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[52\] D. Nguyen, J. Chen, Y. Wang, G. Wu, N. Park, Z. Hu, H. Lyu, J. Wu, R. Aponte, Y. Xia, et al. (2025)  Gui agents: a survey.  In Findings of the Association for Computational Linguistics: ACL 2025,  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.9.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[53\] Y. Ma, Z. Song, Y. Zhuang, J. Hao, and I. King (2026)  A survey on vision–language–action models for embodied ai.  IEEE Transactions on Neural Networks and Learning Systems.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.10.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[54\] M. Yu, F. Meng, X. Zhou, S. Wang, J. Mao, L. Pan, T. Chen, K. Wang, et al. (2025)  A survey on trustworthy llm agents: threats and countermeasures.  In Proceedings of the 31st ACM SIGKDD Conference on Knowledge Discovery and Data Mining V. 2,  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.11.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[55\] Q. Meng, Y. Wang, L. Chen, Q. Wang, C. Lu, W. Wu, Y. Gao, Y. Wu, and Y. Hu (2026)  Agent harness for large language model agents: a survey.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.12.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[56\] J. Li, X. Xiao, Y. Zhang, C. Liu, L. Zhao, X. Liao, Y. Ji, J. Wang, J. Gu, Y. Ge, et al. (2026)  Agent harness engineering: a survey.  OpenReview preprint.  Cited by: <a href="#S1.SS3.p1.1" class="ltx_ref" title="1.3 Relation to Prior Surveys ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§1.3</a>, <a href="#S1.T1.4.13.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[57\] X. Ning, K. Tieu, D. Fu, T. Wei, Z. Li, Y. Bei, J. Zou, M. Ai, Z. Liu, T. Li, et al. (2026)  Code as agent harness.  arXiv preprint arXiv:2605.18747.  Cited by: <a href="#S1.T1.4.14.1.1.1" class="ltx_ref" title="In 1.2 Four Paradigms of Agent Engineering ‣ 1 Introduction ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE I</a>. 
- \[58\] M. Wooldridge and N. R. Jennings (1995)  Intelligent agents: theory and practice.  The knowledge engineering review.  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Functional View: What Is an Agent? ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.1</a>. 
- \[59\] J. S. Park, J. O’Brien, C. J. Cai, M. R. Morris, P. Liang, and M. S. Bernstein (2023)  Generative agents: interactive simulacra of human behavior.  In Proceedings of the 36th annual acm symposium on user interface software and technology,  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Functional View: What Is an Agent? ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.1</a>. 
- \[60\] Q. Wu, G. Bansal, J. Zhang, Y. Wu, B. Li, E. Zhu, L. Jiang, X. Zhang, S. Zhang, J. Liu, et al. (2024)  Autogen: enabling next-gen llm applications via multi-agent conversations.  In First conference on language modeling,  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Functional View: What Is an Agent? ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.1</a>. 
- \[61\] S. Hong, M. Zhuge, J. Chen, X. Zheng, Y. Cheng, J. Wang, C. Zhang, S. Yau, Z. Lin, L. Zhou, et al. (2024)  MetaGPT: meta programming for a multi-agent collaborative framework.  In International Conference on Learning Representations,  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Functional View: What Is an Agent? ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.1</a>. 
- \[62\] J. Long (2023)  Large language model guided tree-of-thought.  arXiv preprint arXiv:2305.08291.  Cited by: <a href="#S2.SS3.p2.1" class="ltx_ref" title="2.3 LLM as the Cognitive Engine ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.3</a>. 
- \[63\] N. Shinn, F. Cassano, A. Gopinath, K. Narasimhan, and S. Yao (2023)  Reflexion: language agents with verbal reinforcement learning.  Advances in neural information processing systems.  Cited by: <a href="#S2.SS3.p2.1" class="ltx_ref" title="2.3 LLM as the Cognitive Engine ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.3</a>. 
- \[64\] Anthropic (2025)  Effective harnesses for long-running agents.  Note: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents  Cited by: <a href="#S2.SS4.p1.1" class="ltx_ref" title="2.4 Harness as the Runtime Substrate ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.4</a>, <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[65\] Anthropic (2025)  Model context protocol.  Note: <a href="https://modelcontextprotocol.io/introduction" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://modelcontextprotocol.io/introduction</a>  Cited by: <a href="#S2.SS5.p3.1" class="ltx_ref" title="2.5 Key Infrastructure Primitives ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.5</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS4.p2.1" class="ltx_ref" title="5.4 Action Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.4</a>, <a href="#S8.SS3.p3.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[66\] G. Cloud (2025)  Agent2Agent (a2a.  Note: <a href="https://github.com/a2aproject/A2A" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/a2aproject/A2A</a>  Cited by: <a href="#S2.SS5.p4.1" class="ltx_ref" title="2.5 Key Infrastructure Primitives ‣ 2 Background and Definitions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§2.5</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S8.SS3.p3.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[67\] J. Kaplan, S. McCandlish, T. Henighan, T. B. Brown, B. Chess, R. Child, S. Gray, A. Radford, J. Wu, and D. Amodei (2020)  Scaling laws for neural language models.  arXiv preprint arXiv:2001.08361.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[68\] J. Hoffmann, S. Borgeaud, A. Mensch, E. Buchatskaya, et al. (2022)  Training compute-optimal large language models.  arXiv preprint arXiv:2203.15556.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[69\] A. Chowdhery, S. Narang, J. Devlin, M. Bosma, G. Mishra, A. Roberts, P. Barham, et al. (2023)  Palm: scaling language modeling with pathways.  Journal of machine learning research.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[70\] E. Nijkamp, B. Pang, H. Hayashi, L. Tu, H. Wang, Y. Zhou, S. Savarese, and C. Xiong (2022)  Codegen: an open large language model for code with multi-turn program synthesis.  arXiv preprint arXiv:2203.13474.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[71\] Y. Li, D. Choi, J. Chung, N. Kushman, J. Schrittwieser, R. Leblond, T. Eccles, J. Keeling, F. Gimeno, A. Dal Lago, et al. (2022)  Competition-level code generation with alphacode.  Science.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[72\] A. Lewkowycz, A. Andreassen, D. Dohan, E. Dyer, H. Michalewski, V. Ramasesh, A. Slone, C. Anil, I. Schlag, et al. (2022)  Solving quantitative reasoning problems with language models.  Advances in neural information processing systems.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[73\] Z. Shao, P. Wang, Q. Zhu, R. Xu, J. Song, X. Bi, H. Zhang, M. Zhang, Y. Li, Y. Wu, et al. (2024)  Deepseekmath: pushing the limits of mathematical reasoning in open language models.  arXiv preprint arXiv:2402.03300.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>, <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[74\] J. Alayrac, J. Donahue, P. Luc, A. Miech, I. Barr, Y. Hasson, K. Lenc, A. Mensch, K. Millican, M. Reynolds, et al. (2022)  Flamingo: a visual language model for few-shot learning.  Advances in neural information processing systems.  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[75\] X. Chen, J. Djolonga, P. Padlewski, B. Mustafa, S. Changpinyo, J. Wu, C. R. Ruiz, S. Goodman, et al. (2024)  On scaling up a multilingual vision and language model.  In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition,  Cited by: <a href="#S3.p1.1" class="ltx_ref" title="3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3</a>. 
- \[76\] A. Grattafiori, A. Dubey, A. Jauhri, A. Pandey, et al. (2024)  The llama 3 herd of models.  arXiv preprint arXiv:2407.21783.  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[77\] J. Liu, C. S. Xia, Y. Wang, and L. Zhang (2023)  Is your code generated by chatgpt really correct? rigorous evaluation of large language models for code generation.  Advances in neural information processing systems 36, pp. 21558–21572.  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[78\] K. Cobbe, V. Kosaraju, M. Bavarian, M. Chen, H. Jun, L. Kaiser, M. Plappert, J. Tworek, J. Hilton, R. Nakano, et al. (2021)  Training verifiers to solve math word problems.  arXiv preprint arXiv:2110.14168.  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[79\] D. Hendrycks, C. Burns, S. Kadavath, A. Arora, S. Basart, E. Tang, D. Song, and J. Steinhardt (2021)  Measuring mathematical problem solving with the math dataset.  arXiv preprint arXiv:2103.03874.  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[80\] Y. Wang, X. Ma, G. Zhang, Y. Ni, A. Chandra, et al. (2024)  Mmlu-pro: a more robust and challenging multi-task language understanding benchmark.  Advances in Neural Information Processing Systems.  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>, <a href="#S3.SS1.p2.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[81\] A. Yang, A. Li, B. Yang, B. Zhang, B. Hui, B. Zheng, et al. (2025)  Qwen3 technical report.  arXiv preprint arXiv:2505.09388.  Cited by: <a href="#S3.SS1.p1.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[82\] TIGER-Lab (2026)  MMLU-pro leaderboard.  Note: <a href="https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro</a>  Cited by: <a href="#S3.SS1.p2.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[83\] Epoch AI (2026)  GPQA diamond.  Note: <a href="https://epoch.ai/benchmarks/gpqa-diamond?view=graph&amp;tab=leaderboard" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://epoch.ai/benchmarks/gpqa-diamond?view=graph&amp;tab=leaderboard</a>  Cited by: <a href="#S3.SS1.p2.1" class="ltx_ref" title="3.1 Resource-Performance Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.1</a>. 
- \[84\] Z. Zhang, H. Zhang, H. Fei, Z. Bao, Y. Chen, Z. Lei, Z. Liu, Y. Sun, M. Xiao, Z. Ye, et al. (2026)  SWE-agi: benchmarking specification-driven software construction with moonbit in the era of autonomous agents.  arXiv preprint arXiv:2602.09447.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[85\] S. Tang, R. Chen, and T. Lan (2026)  Agent alpha: tree search unifying generation, exploration and evaluation for computer-use agents.  arXiv preprint arXiv:2602.02995.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[86\] Q. Zhou, J. Zhang, H. Wang, R. Hao, J. Wang, M. Han, Y. Yang, S. Wu, F. Pan, L. Fan, et al. (2026)  Featurebench: benchmarking agentic coding for complex feature development.  arXiv preprint arXiv:2602.10975.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[87\] K. Xu, Y. Kordi, T. Nayak, A. Asija, Y. Wang, K. Sanders, A. Byerly, J. Zhang, B. Van Durme, and D. Khashabi (2025)  TurkingBench: a challenge benchmark for web agents.  In Proceedings of the 2025 Conference of the Nations of the Americas Chapter of the Association for Computational Linguistics: Human Language Technologies,  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[88\] Y. Song, K. Thai, C. M. Pham, Y. Chang, M. Nadaf, and M. Iyyer (2025)  Bearcubs: a benchmark for computer-using web agents.  arXiv preprint arXiv:2503.07919.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[89\] H. Jia, Y. Qian, H. Tong, X. Wu, L. Chen, and F. Wei (2025)  Towards adaptive ml benchmarks: web-agent-driven construction, domain expansion, and metric optimization.  arXiv preprint arXiv:2509.09321.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[90\] S. Yoa, S. Yoon, S. Yoon, D. Kim, Y. S. Sim, J. Lee, and W. Lim (2026)  From static benchmarks to dynamic protocol: agent-centric text anomaly detection for evaluating llm reasoning.  arXiv preprint arXiv:2602.23729.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[91\] Y. Wang, G. Yu, H. Huang, Z. Wang, Y. Huang, P. Chen, and M. R. Lyu (2026)  Cloud-opsbench: a reproducible benchmark for agentic root cause analysis in cloud systems.  arXiv preprint arXiv:2603.00468.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[92\] T. Y. Zhuo, M. C. Vu, J. Chim, H. Hu, et al. (2025)  Bigcodebench: benchmarking code generation with diverse function calls and complex instructions.  In International Conference on Learning Representations,  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[93\] X. Long, L. Du, Y. Xu, F. Liu, H. Wang, N. Ding, Z. Li, J. Guo, and Y. Tang (2026)  LiveClawBench: benchmarking llm agents on complex, real-world assistant tasks.  arXiv preprint arXiv:2604.13072.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>, <a href="#S8.SS3.p2.1" class="ltx_ref" title="8.3 Harness Generalization Versus Specialization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.3</a>. 
- \[94\] K. Deshpande, V. Sirdeshmukh, J. B. Mols, L. Jin, E. Hernandez-Cardona, D. Lee, J. Kritz, W. E. Primack, S. Yue, and C. Xing (2025)  Multichallenge: a realistic multi-turn conversation evaluation benchmark challenging to frontier llms.  In Findings of the Association for Computational Linguistics: ACL 2025,  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[95\] T. Kwa, B. West, J. Becker, A. Deng, K. Garcia, M. Hasin, S. Jawhar, M. Kinniment, N. Rush, S. Von Arx, et al. (2025)  Measuring ai ability to complete long tasks.  arXiv preprint arXiv:2503.14499.  Cited by: <a href="#S3.SS2.p2.1" class="ltx_ref" title="3.2 Measurement Boundary ‣ 3 The Limits of Model-Centric Scaling ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§3.2</a>. 
- \[96\] T. Kojima, S. S. Gu, M. Reid, Y. Matsuo, and Y. Iwasawa (2022)  Large language models are zero-shot reasoners.  Advances in neural information processing systems.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[97\] A. Madaan, N. Tandon, P. Gupta, S. Hallinan, L. Gao, S. Wiegreffe, et al. (2023)  Self-refine: iterative refinement with self-feedback.  Advances in neural information processing systems.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[98\] P. Sahoo, A. K. Singh, S. Saha, V. Jain, S. Mondal, and A. Chadha (2024)  A systematic survey of prompt engineering in large language models: techniques and applications.  arXiv preprint arXiv:2402.07927.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[99\] H. Peng, P. V. Patil, A. Z. Qiu, G. K. Thiruvathukal, and J. C. Davis (2026)  Beyond local code optimization: multi-agent reasoning for software system optimization.  arXiv preprint arXiv:2603.14703.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[100\] Y. Liu and Y. Tsai (2026)  Quality-driven agentic reasoning for llm-assisted software design: questions-of-thoughts (qot) as a time-series self-qa chain.  arXiv preprint arXiv:2603.11082.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[101\] Y. Peng, X. Zhu, C. Wei, N. Zeng, L. Wang, Y. T. He, and F. R. Yu (2026)  Sage: multi-agent self-evolution for llm reasoning.  arXiv preprint arXiv:2603.15255.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[102\] G. Hao, Y. Dai, X. Qin, and S. Yu (2026)  Brain-inspired graph multi-agent systems for llm reasoning.  arXiv preprint arXiv:2603.15371.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[103\] L. Zhang, T. Jia, M. Wang, W. Hong, C. Duan, M. He, R. Wang, X. Peng, M. Wang, G. Zhang, et al. (2026)  Efficient failure management for multi-agent systems with reasoning trace representation.  arXiv preprint arXiv:2603.21522.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[104\] M. Hu, T. Fang, J. Zhang, J. Ma, Z. Zhang, J. Zhou, H. Zhang, H. Mi, D. Yu, and I. King (2025)  Webcot: enhancing web agent reasoning by reconstructing chain-of-thought in reflection, branching, and rollback.  arXiv preprint arXiv:2505.20013.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[105\] A. Kumar, J. Roh, A. Naseh, A. Houmansadr, and E. Bagdasarian (2025)  Throttling web agents using reasoning gates.  arXiv preprint arXiv:2509.01619.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[106\] S. Lee, S. Yoon, S. Lee, Y. Chun, D. Park, D. Kim, and J. Y. Sim (2026)  IntentCUA: learning intent-level representations for skill abstraction and multi-agent planning in computer-use agents.  arXiv preprint arXiv:2602.17049.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[107\] M. Alenezi (2026)  From prompt-response to goal-directed systems: the evolution of agentic ai software architecture.  arXiv preprint arXiv:2602.10479.  Cited by: <a href="#S4.SS1.p1.1" class="ltx_ref" title="4.1 Phase 1: Prompt Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.1</a>. 
- \[108\] S. Agashe, K. Wong, V. Tu, J. Yang, A. Li, and X. E. Wang (2025)  Agent s2: a compositional generalist-specialist framework for computer use agents.  arXiv preprint arXiv:2504.00906.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS3.p1.1" class="ltx_ref" title="5.3 Control Loop ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.3</a>. 
- \[109\] Y. Chen, L. Yan, Z. Yang, E. Zhang, J. Zhao, S. Wang, D. Yin, and J. Mao (2026)  Beyond monolithic architectures: a multi-agent search and knowledge optimization framework for agentic search.  arXiv preprint arXiv:2601.04703.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[110\] W. Chen, Z. Peng, X. Yin, C. Ni, C. Ying, B. Xie, and Y. Luo (2026)  SolAgent: a specialized multi-agent framework for solidity code generation.  arXiv preprint arXiv:2601.23009.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[111\] J. Huang, W. Ye, W. Sun, J. Zhang, M. Zhang, and Y. Liu (2026)  TraceCoder: a trace-driven multi-agent framework for automated debugging of llm-generated code.  arXiv preprint arXiv:2602.06875.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[112\] M. Chen, Y. Kao, P. Huang, S. Ho, H. Tsou, I. Wu, E. Huang, Y. Hung, W. Hsin, C. Liang, et al. (2026)  SiliconMind-v1: multi-agent distillation and debug-reasoning workflows for verilog code generation.  arXiv preprint arXiv:2603.08719.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[113\] Q. Zhang, C. Gao, Y. Han, Y. Shang, C. Fang, Z. Chen, and L. Xiao (2026)  SGAgent: suggestion-guided llm-based multi-agent framework for repository-level software repair.  ACM Transactions on Software Engineering and Methodology.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[114\] M. Galster, S. Mohsenimofidi, J. L. Lulla, M. A. Abubakar, C. Treude, and S. Baltes (2026)  Configuring agentic ai coding tools: an exploratory study.  arXiv preprint arXiv:2602.14690.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[115\] Y. Li, W. Zhang, Z. Huang, M. Yang, J. Wu, S. Guo, H. Hu, L. Sun, J. Yang, M. Tang, et al. (2025)  Close the loop: synthesizing infinite tool-use data via multi-agent role-playing.  arXiv preprint arXiv:2512.23611.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[116\] X. Zhang, Q. He, Z. Zheng, Z. Zhang, X. He, and D. Li (2026)  ASTER: agentic scaling with tool-integrated extended reasoning.  arXiv preprint arXiv:2602.01204.  Cited by: <a href="#S4.SS2.p1.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[117\] L. Mei, J. Yao, Y. Ge, Y. Wang, B. Bi, Y. Cai, J. Liu, M. Li, Z. Li, D. Zhang, et al. (2025)  A survey of context engineering for large language models.  arXiv preprint arXiv:2507.13334.  Cited by: <a href="#S4.SS2.p2.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[118\] Y. Gao, Y. Xiong, X. Gao, K. Jia, J. Pan, Y. Bi, Y. Dai, J. Sun, H. Wang, H. Wang, et al. (2023)  Retrieval-augmented generation for large language models: a survey.  arXiv preprint arXiv:2312.10997.  Cited by: <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[119\] G. Izacard and E. Grave (2021)  Leveraging passage retrieval with generative models for open domain question answering.  In Proceedings of the 16th conference of the european chapter of the association for computational linguistics: main volume,  Cited by: <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[120\] S. Borgeaud, A. Mensch, J. Hoffmann, T. Cai, E. Rutherford, K. Millican, G. B. Van Den Driessche, J. Lespiau, et al. (2022)  Improving language models by retrieving from trillions of tokens.  In International conference on machine learning,  Cited by: <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[121\] G. Izacard, P. Lewis, M. Lomeli, L. Hosseini, F. Petroni, T. Schick, et al. (2023)  Atlas: few-shot learning with retrieval augmented language models.  Journal of Machine Learning Research.  Cited by: <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[122\] P. Sarthi, S. Abdullah, A. Tuli, S. Khanna, A. Goldie, and C. Manning (2024)  Raptor: recursive abstractive processing for tree-organized retrieval.  In International Conference on Learning Representations,  Cited by: <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[123\] D. Edge, H. Trinh, N. Cheng, J. Bradley, A. Chao, A. Mody, S. Truitt, D. Metropolitansky, R. O. Ness, and J. Larson (2024)  From local to global: a graph rag approach to query-focused summarization.  arXiv preprint arXiv:2404.16130.  Cited by: <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[124\] B. J. Gutiérrez, Y. Shu, Y. Gu, M. Yasunaga, and Y. Su (2024)  Hipporag: neurobiologically inspired long-term memory for large language models.  Advances in neural information processing systems.  Cited by: <a href="#S4.SS2.p3.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[125\] M. Kang, W. Chen, D. Han, H. A. Inan, L. Wutschitz, and Y. o. Chen (2025)  Acon: optimizing context compression for long-horizon llm agents.  arXiv preprint arXiv:2510.00615.  Cited by: <a href="#S4.SS2.p4.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>, <a href="#S5.SS7.p1.1" class="ltx_ref" title="5.7 Cross-Layer Interactions in the Harness ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.7</a>. 
- \[126\] Y. Yao, S. Huang, E. Dai, Z. Tan, Z. Duan, S. Jia, Y. Jiang, and T. Yang (2026)  ARC: active and reflection-driven context management for long-horizon information seeking agents.  arXiv preprint arXiv:2601.12030.  Cited by: <a href="#S4.SS2.p4.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[127\] Y. Wu, Y. Zheng, T. Xu, Z. Zhang, Y. Yu, J. Zhu, C. Ma, B. Lin, B. Dong, H. Zhu, et al. (2026)  ContextBudget: budget-aware context management for long-horizon search agents.  arXiv preprint arXiv:2604.01664.  Cited by: <a href="#S4.SS2.p4.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[128\] S. Liu, J. Yang, B. Jiang, Y. Li, J. Guo, X. Liu, and B. Dai (2025)  Context as a tool: context management for long-horizon swe-agents.  arXiv preprint arXiv:2512.22087.  Cited by: <a href="#S4.SS2.p4.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[129\] H. Jia, E. T. Barr, and S. Mechtaev (2026)  Compressing code context for llm-based issue resolution.  arXiv preprint arXiv:2603.28119.  Cited by: <a href="#S4.SS2.p4.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[130\] H. Li, L. Zhu, B. Zhang, R. Feng, J. Wang, Y. Pan, E. T. Barr, F. Sarro, et al. (2026)  ContextBench: a benchmark for context retrieval in coding agents.  arXiv preprint arXiv:2602.05892.  Cited by: <a href="#S4.SS2.p5.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[131\] J. Zhu, J. Wu, M. Hu, S. Zhu, J. Pan, W. Shen, Y. Yang, F. Liu, J. Hao, Y. Jin, et al. (2026)  Swe context bench: a benchmark for context learning in coding.  arXiv preprint arXiv:2602.08316.  Cited by: <a href="#S4.SS2.p5.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[132\] J. Qiu, Z. Liu, Z. Liu, R. Murthy, J. Zhang, H. Chen, S. Wang, M. Zhu, L. Yang, J. Tan, et al. (2025)  LoCoBench-agent: an interactive benchmark for llm agents in long-context software engineering.  arXiv preprint arXiv:2511.13998.  Cited by: <a href="#S4.SS2.p5.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[133\] S. Fang, Y. Wang, X. Liu, J. Lu, C. Tan, X. Chen, Y. Zheng, X. Huang, and X. Qiu (2026)  Agentlongbench: a controllable long benchmark for long-contexts agents via environment rollouts.  arXiv preprint arXiv:2601.20730.  Cited by: <a href="#S4.SS2.p5.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[134\] Q. Zhang, C. Hu, S. Upasani, B. Ma, F. Hong, V. Kamanuru, J. Rainton, C. Wu, M. Ji, H. Li, et al. (2025)  Agentic context engineering: evolving contexts for self-improving language models.  arXiv preprint arXiv:2510.04618.  Cited by: <a href="#S4.SS2.p5.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[135\] H. Ye, X. He, V. Arak, H. Dong, and G. Song (2026)  Meta context engineering via agentic skill evolution.  arXiv preprint arXiv:2601.21557.  Cited by: <a href="#S4.SS2.p5.1" class="ltx_ref" title="4.2 Phase 2: Workflows and Context Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.2</a>. 
- \[136\] A. Shen and A. Shen (2026)  DOVA: deliberation-first multi-agent orchestration for autonomous research automation.  arXiv preprint arXiv:2603.13327.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS3.p1.1" class="ltx_ref" title="5.3 Control Loop ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.3</a>. 
- \[137\] B. Liu, G. Zhao, and H. Xu (2026)  Utility-guided agent orchestration for efficient llm tool use.  arXiv preprint arXiv:2603.19896.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS3.p1.1" class="ltx_ref" title="5.3 Control Loop ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.3</a>. 
- \[138\] A. Sulc (2026)  Differentiable modal logic for multi-agent diagnosis, orchestration and communication.  arXiv preprint arXiv:2602.12083.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS3.p1.1" class="ltx_ref" title="5.3 Control Loop ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.3</a>. 
- \[139\] M. Lin, Z. Zhang, H. Lu, H. Liu, X. Tang, Q. He, X. Zhang, and S. Wang (2026)  MemMA: coordinating the memory cycle through multi-agent reasoning and in-situ self-evolution.  arXiv preprint arXiv:2603.18718.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[140\] K. Shen, J. Zhang, C. Sun, W. Zeng, and Y. Yue (2026)  Structurally aligned subtask-level memory for software engineering agents.  arXiv preprint arXiv:2602.21611.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[141\] A. Steiner, R. Peeters, and C. Bizer (2026)  MCP vs rag vs nlweb vs html: a comparison of the effectiveness and efficiency of different agent interfaces to the web.  In Proceedings of the ACM Web Conference 2026,  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[142\] M. Suri, X. Li, M. Shojaie, S. Han, C. Hsu, S. Garg, A. A. Deshmukh, and V. Kumar (2026)  CodeScout: contextual problem statement enhancement for software agents.  arXiv preprint arXiv:2603.05744.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[143\] S. Prakash (2026)  LDP: an identity-aware protocol for multi-agent llm systems.  arXiv preprint arXiv:2603.08852.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[144\] V. V. Vishnyakova (2026)  Context engineering: from prompts to corporate multi-agent architecture.  arXiv preprint arXiv:2603.09619.  Cited by: <a href="#S4.SS3.p3.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[145\] Anthropic (2024)  Building effective agents.  Note: https://www.anthropic.com/engineering/building-effective-agents  Cited by: <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>. 
- \[146\] OpenAI (2025)  A practical guide to building agents.  Note: <a href="https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents</a>  Cited by: <a href="#S4.SS3.p4.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS2.p2.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>, <a href="#S5.SS5.p2.1" class="ltx_ref" title="5.5 State and Artifact Store ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.5</a>. 
- \[147\] Y. Yan, S. Wang, J. Du, Y. Yang, Y. Shan, Q. Qiu, X. Jia, X. Wang, X. Yuan, X. Han, et al. (2025)  Mcpworld: a unified benchmarking testbed for api, gui, and hybrid computer use agents.  arXiv preprint arXiv:2506.07672.  Cited by: <a href="#S4.SS3.p5.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS4.p2.1" class="ltx_ref" title="5.4 Action Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.4</a>, <a href="#S7.T6.4.1.8.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[148\] C. Bandi, B. Hertzberg, G. Boo, et al. (2026)  MCP-atlas: a large-scale benchmark for tool-use competency with real mcp servers.  arXiv preprint arXiv:2602.00933.  Cited by: <a href="#S4.SS3.p5.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S7.T6.4.1.14.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[149\] W. Liu, Z. Liu, E. Dai, W. Yu, L. Yu, T. Yang, J. Han, and H. Gao (2025)  Mcpagentbench: a real-world task benchmark for evaluating llm agent mcp tool use.  arXiv preprint arXiv:2512.24565.  Cited by: <a href="#S4.SS3.p5.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S7.T6.4.1.13.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[150\] H. Jia, J. Liao, X. Zhang, H. Xu, T. Xie, C. Jiang, M. Yan, S. Liu, W. Ye, and F. Huang (2025)  Osworld-mcp: benchmarking mcp tool invocation in computer-use agents.  arXiv preprint arXiv:2510.24563.  Cited by: <a href="#S4.SS3.p5.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS4.p2.1" class="ltx_ref" title="5.4 Action Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.4</a>, <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[151\] S. Vallabhaneni, T. Berkane, and M. S. Majumder (2026)  The ai committee: a multi-agent framework for automated validation and remediation of web-sourced data.  In Proceedings of the 19th Conference of the European Chapter of the Association for Computational Linguistics (Volume 3: System Demonstrations),  Cited by: <a href="#S4.SS3.p9.1" class="ltx_ref" title="4.3 Phase 3: Harness Engineering ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.3</a>, <a href="#S5.SS6.p1.1" class="ltx_ref" title="5.6 Verification and Governance ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.6</a>. 
- \[152\] Z. Wei, W. Yao, Y. Liu, W. Zhang, Q. Lu, L. Qiu, C. Yu, P. Xu, et al. (2025)  Webagent-r1: training web agents via end-to-end multi-turn reinforcement learning.  In Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing,  Cited by: <a href="#S4.SS4.p2.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[153\] Y. Zhuang, D. Jin, J. Chen, W. Shi, H. Wang, and C. Zhang (2026)  WorkForceAgent-r1: incentivizing reasoning capability in llm-based web agents via reinforcement learning.  In Findings of the Association for Computational Linguistics: EACL 2026,  Cited by: <a href="#S4.SS4.p2.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[154\] Z. Chen, Z. Zhao, Z. Han, M. Liu, X. Ye, Y. Li, H. Min, J. Ren, X. Zhang, and G. Cao (2026)  TGPO: tree-guided preference optimization for robust web agent reinforcement learning.  In ICASSP 2026-2026 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP),  pp. 2476–2480.  Cited by: <a href="#S4.SS4.p2.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[155\] W. Zhou, X. Xiong, Y. Tian, L. Yue, X. Wu, W. Li, C. Zhao, H. Dong, M. Tang, J. Wang, et al. (2025)  ESearch-r1: learning cost-aware mllm agents for interactive embodied search via reinforcement learning.  arXiv preprint arXiv:2512.18571.  Cited by: <a href="#S4.SS4.p2.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[156\] H. Ding, P. Liu, J. Wang, Z. Ji, M. Cao, R. Zhang, L. Ai, E. Yang, T. Shi, and L. Yu (2026)  DynaWeb: model-based reinforcement learning of web agents.  arXiv preprint arXiv:2601.22149.  Cited by: <a href="#S4.SS4.p2.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[157\] Q. Yu, Z. Zhang, R. Zhu, Y. Yuan, X. Zuo, Y. Yue, W. Dai, T. Fan, et al. (2026)  Dapo: an open-source llm reinforcement learning system at scale.  Advances in Neural Information Processing Systems.  Cited by: <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[158\] H. Zhang, M. Liu, S. Zhang, S. Han, J. Hu, Z. Jin, Y. Zhang, S. Diao, et al. (2026)  Prorl agent: rollout-as-a-service for rl training of multi-turn llm agents.  arXiv preprint arXiv:2603.18815.  Cited by: <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[159\] S. Lu, Z. Wang, H. Zhang, Q. Wu, L. Gan, C. Zhuang, J. Gu, and T. Lin (2025)  Don’t just fine-tune the agent, tune the environment.  arXiv preprint arXiv:2510.10197.  Cited by: <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[160\] J. Zeng, D. Fu, T. Mi, Y. Zhuang, Y. Huang, X. Li, L. Ye, M. Xie, Q. Hua, Z. Huang, et al. (2026)  Davinci-dev: agent-native mid-training for software engineering.  arXiv preprint arXiv:2601.18418.  Cited by: <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[161\] Z. Yang, S. Wang, K. Fu, W. He, W. Xiong, Y. Liu, Y. Miao, B. Gao, Y. Wang, Y. Ma, et al. (2025)  Kimi-dev: agentless training as skill prior for swe-agents.  arXiv preprint arXiv:2509.23045.  Cited by: <a href="#S4.SS4.p3.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[162\] S. Karten, J. Zhang, T. Upaa Jr, R. Feng, W. Li, et al. (2026)  Continual harness: online adaptation for self-improving foundation agents.  arXiv preprint arXiv:2605.09998.  Cited by: <a href="#S4.SS4.p4.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[163\] Q. Zhang, D. Ma, T. Fang, J. Li, J. Tang, N. Chen, H. Mi, and Y. Wang (2026)  Training llm agents for spontaneous, reward-free self-evolution via world knowledge exploration.  arXiv preprint arXiv:2604.18131.  Cited by: <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>, <a href="#S8.SS2.p3.1" class="ltx_ref" title="8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.2</a>. 
- \[164\] M. Robeyns, M. Szummer, and L. Aitchison (2025)  A self-improving coding agent.  arXiv preprint arXiv:2504.15228.  Cited by: <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[165\] J. Zhang, B. Zhao, W. Yang, J. Foerster, J. Clune, M. Jiang, S. Devlin, and T. Shavrina (2026)  Hyperagents.  arXiv preprint arXiv:2603.19461.  Cited by: <a href="#S4.SS4.p5.1" class="ltx_ref" title="4.4 Phase 4: Agent-Native Training and Co-Evolution ‣ 4 Paradigm Shifts in Agent Engineering ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§4.4</a>. 
- \[166\] P. A. F. Enabe (2026)  Profile-then-reason: bounded semantic complexity for tool-augmented language agents.  arXiv preprint arXiv:2604.04131.  Cited by: <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[167\] Y. Shen, K. Li, W. Zhou, and S. Hu (2026)  Mem2ActBench: a benchmark for evaluating long-term memory utilization in task-oriented autonomous agents.  arXiv preprint arXiv:2601.19935.  Cited by: <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[168\] P. Du (2026)  Memory for autonomous llm agents: mechanisms, evaluation, and emerging frontiers.  arXiv preprint arXiv:2603.07670.  Cited by: <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[169\] S. Wang, B. Liu, Z. Gao, L. Ma, X. Wang, Y. Xie, and X. Tan (2026)  Explore with long-term memory: a benchmark and multimodal llm-based reinforcement learning framework for embodied exploration.  arXiv preprint arXiv:2601.10744.  Cited by: <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[170\] W. Zhang, X. Wei, W. Huang, Z. Hui, C. Wang, M. Gong, and P. S. Yu (2026)  Memorycd: benchmarking long-context user memory of llm agents for lifelong cross-domain personalization.  arXiv preprint arXiv:2603.25973.  Cited by: <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[171\] Z. Yang, S. Tian, K. Hu, S. Liu, H. Nguyen, Y. Zhang, Z. Guo, M. Yu, et al. (2026)  HippoCamp: benchmarking contextual agents on personal computers.  arXiv preprint arXiv:2604.01221.  Cited by: <a href="#S5.SS2.p1.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>. 
- \[172\] A. Maharana, D. Lee, S. Tulyakov, M. Bansal, F. Barbieri, and Y. Fang (2024)  Evaluating very long-term conversational memory of llm agents.  In Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics,  Cited by: <a href="#S5.SS2.p2.1" class="ltx_ref" title="5.2 Context Manager ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.2</a>, <a href="#S5.SS5.p2.1" class="ltx_ref" title="5.5 State and Artifact Store ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.5</a>, <a href="#S5.SS7.p1.1" class="ltx_ref" title="5.7 Cross-Layer Interactions in the Harness ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.7</a>, <a href="#S7.SS1.p2.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.T6.4.1.10.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[173\] D. Huang, G. Malwe, and Z. Wang (2026)  When agents fail to act: a diagnostic framework for tool invocation reliability in multi-agent llm systems.  arXiv preprint arXiv:2601.16280.  Cited by: <a href="#S5.SS4.p1.1" class="ltx_ref" title="5.4 Action Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.4</a>. 
- \[174\] Y. Chen, G. Dong, and Z. Dou (2026)  ET-agent: incentivizing effective tool-integrated reasoning agent via behavior calibration.  arXiv preprint arXiv:2601.06860.  Cited by: <a href="#S5.SS4.p1.1" class="ltx_ref" title="5.4 Action Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.4</a>. 
- \[175\] X. Wang, G. Zhang, J. Li, J. Tu, C. Li, and M. Li (2026)  ToolTok: tool tokenization for efficient and generalizable gui agents.  arXiv preprint arXiv:2602.02548.  Cited by: <a href="#S5.SS4.p1.1" class="ltx_ref" title="5.4 Action Interface ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.4</a>. 
- \[176\] A. Agarwal, G. Siyan, Y. Pandya, J. Singh, A. Nambi, and A. Awadallah (2026)  Learning when to act or refuse: guarding agentic reasoning models for safe multi-step tool use.  arXiv preprint arXiv:2603.03205.  Cited by: <a href="#S5.SS6.p1.1" class="ltx_ref" title="5.6 Verification and Governance ‣ 5 Anatomy of the Execution Harness ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§5.6</a>. 
- \[177\] J. Zhu, Y. Tian, B. Li, K. Wu, Z. Liang, J. Li, X. Zhang, L. Guo, F. Chen, Y. Liu, et al. (2026)  FinMCP-bench: benchmarking llm agents for real-world financial tool use under the model context protocol.  In ICASSP 2026-2026 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP),  Cited by: <a href="#S6.SS1.p3.1" class="ltx_ref" title="6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.1</a>. 
- \[178\] M. A. Ferrag, A. Lakas, and M. Debbah (2026)  AgentDrive: an open benchmark dataset for agentic ai reasoning with llm-generated scenarios in autonomous systems.  arXiv preprint arXiv:2601.16964.  Cited by: <a href="#S6.SS1.p3.1" class="ltx_ref" title="6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.1</a>. 
- \[179\] M. Fu, J. Yu, K. El-Refai, E. Kou, H. Xue, H. Huang, W. Xiao, G. Wang, F. Li, G. Shi, et al. (2026)  CaP-x: a framework for benchmarking and improving coding agents for robot manipulation.  arXiv preprint arXiv:2603.22435.  Cited by: <a href="#S6.SS1.p3.1" class="ltx_ref" title="6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.1</a>. 
- \[180\] J. Ai, Y. Feng, F. Zhang, J. Sun, Z. Li, et al. (2026)  ProSoftArena: benchmarking hierarchical capabilities of multi-modal agents in professional software environments.  In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition,  Cited by: <a href="#S6.SS1.p3.1" class="ltx_ref" title="6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.1</a>. 
- \[181\] J. Yang, H. Guo, L. Ji, J. Zhou, R. Zheng, Z. Lei, S. Zhang, Z. Xi, et al. (2026)  ABC-bench: benchmarking agentic backend coding in real-world development.  arXiv preprint arXiv:2601.11077.  Cited by: <a href="#S6.SS1.p3.1" class="ltx_ref" title="6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.1</a>. 
- \[182\] S. K. R. Malay, S. Nayak, J. S. Nair, S. Davasam, A. Tiwari, S. T. Madhusudhan, S. K. Nemala, S. Sunkara, and S. Rajeswar (2026)  Enterpriseops-gym: environments and evaluations for stateful agentic planning and tool use in enterprise settings.  arXiv preprint arXiv:2603.13594.  Cited by: <a href="#S6.SS1.p3.1" class="ltx_ref" title="6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.1</a>. 
- \[183\] A. Das and D. Patel (2026)  PHMForge: a scenario-driven agentic benchmark for industrial asset lifecycle maintenance.  arXiv e-prints, pp. arXiv–2604.  Cited by: <a href="#S6.SS1.p3.1" class="ltx_ref" title="6.1 A Harness-Aware Task Taxonomy ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.1</a>. 
- \[184\] Y. Ding and L. Zhang (2026)  SWE-replay: efficient test-time scaling for software engineering agents.  arXiv preprint arXiv:2601.22129.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[185\] R. Hutter and M. Pradel (2026)  AgentStepper: interactive debugging of software development agents.  arXiv preprint arXiv:2602.06593.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[186\] R. Nanda, C. Maddila, S. Jha, E. M. Khan, M. Paltenghi, and S. Chandra (2026)  Wink: recovering from misbehaviors in coding agents.  arXiv preprint arXiv:2602.17037.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[187\] A. Joshi (2026)  XAI for coding agent failures: transforming raw execution traces into actionable insights.  arXiv preprint arXiv:2603.05941.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[188\] C. Guo, J. Wu, S. He, Y. Chen, Z. Kuang, S. Fan, B. Chen, S. Bao, J. Liu, H. Wu, et al. (2026)  MEnvAgent: scalable polyglot environment construction for verifiable software engineering.  arXiv preprint arXiv:2601.22859.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[189\] C. Pohle (2026)  AgenticTyper: automated typing of legacy software projects using agentic ai.  arXiv preprint arXiv:2602.21251.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[190\] P. T. J. Kon, A. Pradeep, A. Chen, A. P. Ellis, W. Hunt, Z. Wang, et al. (2026)  SWE-protégé: learning to selectively collaborate with an expert unlocks small language models as software engineering agents.  arXiv preprint arXiv:2602.22124.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[191\] S. Shaji, F. Huppertz, A. Mitrevski, and S. Houben (2026)  From language to action: can llm-based agents be used for embodied robot cognition?.  arXiv preprint arXiv:2603.03148.  Cited by: <a href="#S6.SS2.p2.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[192\] J. Y. Koh, R. Lo, L. Jang, V. Duvvur, M. Lim, P. Huang, G. Neubig, S. Zhou, R. Salakhutdinov, and D. Fried (2024)  Visualwebarena: evaluating multimodal agents on realistic visual web tasks.  In Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers),  Cited by: <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>, <a href="#S7.SS1.p2.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.T6.4.1.5.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[193\] L. Song, Y. Dai, V. Prabhu, J. Zhang, T. Shi, L. Li, et al.  CoAct-1: computer-using multi-agent system with coding actions.  In The Fourteenth International Conference on Learning Representations,  Cited by: <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[194\] S. Hu, M. Ouyang, D. Gao, and M. Z. Shou (2024)  The dawn of gui agent: a preliminary case study with claude 3.5 computer use.  arXiv preprint arXiv:2411.10323.  Cited by: <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[195\] Y. Xu, D. Lu, Z. Shen, J. Wang, Z. Wang, Y. Mao, C. Xiong, and T. Yu (2025)  Agenttrek: agent trajectory synthesis via guiding replay with web tutorials.  In International Conference on Learning Representations,  Cited by: <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[196\] Y. He, J. Jin, and P. Liu (2025)  Efficient agent training for computer use.  arXiv preprint arXiv:2505.13909.  Cited by: <a href="#S6.SS2.p4.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[197\] A. M. Bran, S. Cox, O. Schilter, C. Baldassari, A. D. White, and P. Schwaller (2023)  Chemcrow: augmenting large-language models with chemistry tools.  arXiv preprint arXiv:2304.05376.  Cited by: <a href="#S6.SS2.p6.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[198\] Y. Roohani, A. Lee, Q. Huang, J. Vora, Z. Steinhart, K. Huang, A. Marson, P. Liang, and J. Leskovec (2025)  Biodiscoveryagent: an ai agent for designing genetic perturbation experiments.  In International Conference on Learning Representations,  Cited by: <a href="#S6.SS2.p6.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[199\] F. Liu, J. Xu, X. Cui, X. Wang, Z. Guo, J. Wang, S. M. Mousavi, X. Gu, H. Chen, B. Fei, et al. (2026)  TRACE: a multi-agent system for autonomous physical reasoning for seismology.  arXiv preprint arXiv:2603.21152.  Cited by: <a href="#S6.SS2.p6.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[200\] J. Yu, W. Yu, P. Xiao, and F. Xing (2026)  Agent-driven corpus linguistics: a framework for autonomous linguistic discovery.  arXiv preprint arXiv:2604.07189.  Cited by: <a href="#S6.SS2.p6.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[201\] K. Ai, H. Miao, K. Tang, N. Gorski, J. Sun, G. Liu, H. I. Ingolfsson, D. Lenz, H. Guo, H. Yu, et al. (2026)  SciVisAgentBench: a benchmark for evaluating scientific data analysis and visualization agents.  arXiv preprint arXiv:2603.29139.  Cited by: <a href="#S6.SS2.p6.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[202\] Y. Lyu, X. Zhang, X. Yi, Y. Zhao, S. Guo, W. Hu, J. Piotrowski, J. Kaliski, J. Urbani, Z. Meng, et al. (2026)  Evoscientist: towards multi-agent evolving ai scientists for end-to-end scientific discovery.  arXiv preprint arXiv:2603.08127.  Cited by: <a href="#S6.SS2.p6.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[203\] Z. You, X. Chen, A. Vashishtha, S. Du, G. Erion-Barner, H. Mei, H. Peng, and Y. Guo (2026)  Improving clinical diagnosis with counterfactual multi-agent reasoning.  arXiv preprint arXiv:2603.27820.  Cited by: <a href="#S6.SS2.p8.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[204\] C. Liu, C. Ma, Y. Tao, B. Hu, and M. Yang (2026)  CCD-cbt: multi-agent therapeutic interaction for cbt guided by cognitive conceptualization diagram.  arXiv preprint arXiv:2604.06551.  Cited by: <a href="#S6.SS2.p8.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[205\] L. Du, Y. Li, Y. Long, and S. Chen (2026)  EFT-cot: a multi-agent chain-of-thought framework for emotion-focused therapy.  arXiv preprint arXiv:2601.17842.  Cited by: <a href="#S6.SS2.p8.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[206\] S. Chen, P. Moreira, Y. Xiao, S. Schmidgall, J. Warner, H. Aerts, T. Hartvigsen, J. Gallifant, and D. S. Bitterman (2025)  Medbrowsecomp: benchmarking medical deep research and computer use.  arXiv preprint arXiv:2505.14963.  Cited by: <a href="#S6.SS2.p8.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[207\] J. Li, Y. Lai, W. Li, J. Ren, M. Zhang, X. Kang, S. Wang, P. Li, et al. (2024)  Agent hospital: a simulacrum of hospital with evolvable medical agents.  arXiv preprint arXiv:2405.02957.  Cited by: <a href="#S6.SS2.p8.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[208\] Y. Wang, Y. Xiang, K. Li, X. Zhang, B. Ye, Z. Fan, F. Wei, and T. Yang (2026)  Can a robot walk the robotic dog: triple-zero collaborative navigation for heterogeneous multi-agent systems.  arXiv preprint arXiv:2603.21723.  Cited by: <a href="#S6.SS2.p10.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[209\] L. Wang, Z. Ying, X. Yang, Q. Zou, Z. Yin, T. Li, J. Yang, Y. Yang, A. Liu, and X. Liu (2025)  RoboSafe: safeguarding embodied agents via executable safety logic.  arXiv preprint arXiv:2512.21220.  Cited by: <a href="#S6.SS2.p10.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[210\] J. Liu, P. Zhao, Z. Kong, X. Shen, P. Dong, F. Yang, L. Cui, H. Tang, G. Yuan, W. Niu, et al. (2026)  When should a robot think? resource-aware reasoning via reinforcement learning for embodied robotic decision-making.  arXiv preprint arXiv:2603.16673.  Cited by: <a href="#S6.SS2.p10.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[211\] Z. Zhang, J. Zhang, H. Liu, Q. Lv, J. Yang, K. Cai, and K. Wang (2026)  AgriWorld: a world tools protocol framework for verifiable agricultural reasoning with code-executing llm agents.  arXiv preprint arXiv:2602.15325.  Cited by: <a href="#S6.SS2.p10.1" class="ltx_ref" title="6.2 Harness Adaptation by Domain ‣ 6 Task Landscape and Harness Configuration ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§6.2</a>. 
- \[212\] T. Kuntz, A. Duzan, H. Zhao, F. Croce, Z. Kolter, N. Flammarion, and M. Andriushchenko (2026)  Os-harm: a benchmark for measuring safety of computer use agents.  Advances in Neural Information Processing Systems 38.  Cited by: <a href="#S7.SS1.p2.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>, <a href="#S7.T6.4.1.9.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[213\] R. Hu, C. Peng, J. Xu, and C. Gao (2026)  Repo2run: automated building executable environment for code repository at scale.  Advances in Neural Information Processing Systems.  Cited by: <a href="#S7.SS1.p3.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[214\] N. Jain, J. Singh, M. Shetty, L. Zheng, K. Sen, and I. Stoica (2025)  R2e-gym: procedural environments and hybrid verifiers for scaling open-weights swe agents.  arXiv preprint arXiv:2504.07164.  Cited by: <a href="#S7.SS1.p3.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[215\] S. Kapoor, B. Stroebl, P. Kirgis, et al. (2025)  Holistic agent leaderboard: the missing infrastructure for ai agent evaluation.  arXiv preprint arXiv:2510.11977.  Cited by: <a href="#S7.SS1.p3.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[216\] Y. Liu, D. Iter, Y. Xu, S. Wang, R. Xu, and C. Zhu (2023)  G-eval: nlg evaluation using gpt-4 with better human alignment.  In Proceedings of the 2023 conference on empirical methods in natural language processing,  Cited by: <a href="#S7.SS1.p4.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[217\] L. Zheng, W. Chiang, Y. Sheng, S. Zhuang, Z. Wu, Y. Zhuang, Z. Lin, Z. Li, D. Li, E. Xing, et al. (2023)  Judging llm-as-a-judge with mt-bench and chatbot arena.  Advances in neural information processing systems.  Cited by: <a href="#S7.SS1.p4.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[218\] J. Gu, X. Jiang, Z. Shi, H. Tan, et al. (2024)  A survey on llm-as-a-judge.  The Innovation.  Cited by: <a href="#S7.SS1.p4.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[219\] V. Trivedy, M. Daugherty, E. Yurtsev, and H. Chase (2026)  How we build evals for deep agents.  Note: <a href="https://www.langchain.com/blog/how-we-build-evals-for-deep-agents" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.langchain.com/blog/how-we-build-evals-for-deep-agents</a>  Cited by: <a href="#S7.SS1.p5.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[220\] Confident AI (2025)  DeepEval: the LLM evaluation framework.  Note: <a href="https://github.com/confident-ai/deepeval" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/confident-ai/deepeval</a>  Cited by: <a href="#S7.SS1.p5.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[221\] S. Es, J. James, L. E. Anke, and S. Schockaert (2024)  Ragas: automated evaluation of retrieval augmented generation.  In Proceedings of the 18th conference of the european chapter of the association for computational linguistics: system demonstrations,  Cited by: <a href="#S7.SS1.p5.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[222\] L. Gao, J. Tow, S. Biderman, S. Black, et al. (2021)  A framework for few-shot language model evaluation.  Zenodo.  Cited by: <a href="#S7.SS1.p5.1" class="ltx_ref" title="7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.1</a>. 
- \[223\] X. Liu, H. Yu, H. Zhang, Y. Xu, X. Lei, H. Lai, Y. Gu, H. Ding, K. Men, K. Yang, et al. (2024)  Agentbench: evaluating llms as agents.  In International Conference on Learning Representations,  Cited by: <a href="#S7.T6.4.1.2.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[224\] G. Yin, H. Bai, S. Ma, F. Nan, Y. Sun, Z. Xu, S. Ma, J. Lu, X. Kong, A. Zhang, et al. (2025)  Mmau: a holistic benchmark of agent capabilities across diverse domains.  In Findings of the Association for Computational Linguistics: NAACL 2025,  Cited by: <a href="#S7.T6.4.1.11.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[225\] J. S. Chan, N. Chowdhury, O. Jaffe, J. Aung, D. Sherburn, E. Mays, G. Starace, K. Liu, et al. (2025)  Mle-bench: evaluating machine learning agents on machine learning engineering.  In International Conference on Learning Representations,  Cited by: <a href="#S7.T6.4.1.12.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[226\] G. Mialon, C. Fourrier, T. Wolf, Y. LeCun, and T. Scialom (2024)  Gaia: a benchmark for general ai assistants.  In International Conference on Learning Representations,  Cited by: <a href="#S7.T6.4.1.15.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[227\] M. Zheng, K. Han, B. Li, H. Xu, Y. Tian, W. He, et al. (2026)  Claw-swe-bench: a benchmark for evaluating openclaw-style agent harnesses on coding tasks.  arXiv preprint arXiv:2606.12344.  Cited by: <a href="#S7.T6.4.1.16.1.1.1" class="ltx_ref" title="In 7.1 Benchmark Landscape and Evaluation Work ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE VI</a>. 
- \[228\] SWE-bench Team (2026)  SWE-bench leaderboards.  Note: <a href="https://www.swebench.com/" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.swebench.com/</a>  Cited by: <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S7.SS3.p2.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p4.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p5.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p6.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>. 
- \[229\] Terminal-Bench Team (2026)  Terminal-Bench leaderboard.  Note: <a href="https://www.tbench.ai/leaderboard/terminal-bench/2.0" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.tbench.ai/leaderboard/terminal-bench/2.0</a>  Cited by: <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S7.SS4.p2.1" class="ltx_ref" title="7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.4</a>, <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>, <a href="#S8.T10.4.1.10.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>, <a href="#S8.T10.4.1.11.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>, <a href="#S8.T10.4.1.12.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>, <a href="#S8.T10.4.1.13.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>, <a href="#S8.T10.4.1.14.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[230\] S. Kapoor, B. Stroebl, Z. S. Siegel, N. Nadgir, and A. Narayanan (2024)  AI agents that matter.  arXiv preprint arXiv:2407.01502.  Cited by: <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>. 
- \[231\] S. Mehta (2025)  Beyond accuracy: a multi-dimensional framework for evaluating enterprise agentic ai systems.  arXiv preprint arXiv:2511.14136.  Cited by: <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>. 
- \[232\] A. Gupta (2026)  ReliabilityBench: evaluating llm agent reliability under production-like stress conditions.  arXiv preprint arXiv:2601.06112.  Cited by: <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>. 
- \[233\] H. Cao, I. Driouich, and E. Thomas (2026)  Beyond task completion: revealing corrupt success in llm agents through procedure-aware evaluation.  arXiv preprint arXiv:2603.03116.  Cited by: <a href="#S7.SS2.p1.1" class="ltx_ref" title="7.2 Evaluation Dimensions Beyond Task Success ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.2</a>, <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>. 
- \[234\] Anthropic (2026)  Claude Sonnet 4.6 system card.  Note: <a href="https://www.anthropic.com/claude-sonnet-4-6-system-card" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.anthropic.com/claude-sonnet-4-6-system-card</a>  Cited by: <a href="#S7.SS3.p2.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p6.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[235\] Google DeepMind (2026)  Gemini 3.1 Pro model card.  Note: <a href="https://deepmind.google/models/model-cards/gemini-3-1-pro/" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://deepmind.google/models/model-cards/gemini-3-1-pro/</a>  Cited by: <a href="#S7.SS3.p2.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[236\] C. S. Xia, Y. Deng, S. Dunn, and L. Zhang (2025)  Demystifying llm-based software engineering agents.  Proceedings of the ACM on Software Engineering.  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S8.T10.4.1.4.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[237\] A. Engineering (2025)  Raising the bar on SWE-bench verified with claude 3.5 sonnet.  Note: <a href="https://www.anthropic.com/engineering/swe-bench-sonnet" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.anthropic.com/engineering/swe-bench-sonnet</a>  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p4.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[238\] J. Yang, C. E. Jimenez, O. Press, and K. Narasimhan (2025)  Mini-SWE-agent.  Note: <a href="https://github.com/SWE-agent/mini-swe-agent" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/SWE-agent/mini-swe-agent</a>  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p6.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S8.T10.4.1.3.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[239\] Y. Zhang, H. Ruan, Z. Fan, and A. Roychoudhury (2024)  AutoCodeRover: autonomous program improvement.  In Proceedings of the 33rd ACM SIGSOFT International Symposium on Software Testing and Analysis,  External Links: <a href="https://dx.doi.org/10.1145/3650212.3680384" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S8.T10.4.1.5.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[240\] H. Li, Y. Tang, S. Wang, and W. Guo (2025)  Patchpilot: a stable and cost-efficient agentic patching framework.  arXiv e-prints, pp. arXiv–2502.  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S8.T10.4.1.7.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[241\] Anthropic (2025)  Claude 3.7 Sonnet.  Note: <a href="https://www.anthropic.com/news/claude-3-7-sonnet" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.anthropic.com/news/claude-3-7-sonnet</a>  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[242\] Anthropic (2025)  Introducing Claude 4.  Note: <a href="https://www.anthropic.com/news/claude-4" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.anthropic.com/news/claude-4</a>  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[243\] OpenAI (2025)  Introducing GPT-5.  Note: <a href="https://openai.com/index/introducing-gpt-5/" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://openai.com/index/introducing-gpt-5/</a>  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[244\] Google DeepMind (2025)  Gemini 3: our most capable model.  Note: <a href="https://blog.google/products/gemini/gemini-3" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://blog.google/products/gemini/gemini-3</a>  Cited by: <a href="#S7.SS3.p3.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p6.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[245\] SWE-bench Team (2024)  SWE-bench experiments repository.  Note: <a href="https://github.com/swe-bench/experiments" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/swe-bench/experiments</a>  Cited by: <a href="#S7.SS3.p4.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p5.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>, <a href="#S7.SS3.p6.1" class="ltx_ref" title="7.3 Harness Effects on SWE-bench Verified ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.3</a>. 
- \[246\] Terminal-Bench Team (2026)  Terminal-Bench 2.0 leaderboard submissions.  Note: <a href="https://huggingface.co/datasets/harborframework/terminal-bench-2-leaderboard" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://huggingface.co/datasets/harborframework/terminal-bench-2-leaderboard</a>  Cited by: <a href="#S7.SS4.p2.1" class="ltx_ref" title="7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.4</a>, <a href="#S8.T10.4.1.11.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>, <a href="#S8.T10.4.1.13.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>, <a href="#S8.T10.4.1.14.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[247\] Terminal-Bench Team (2026)  Terminal-Bench leaderboard integrity update.  Note: <a href="https://www.tbench.ai/news/leaderboard-integrity-update" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://www.tbench.ai/news/leaderboard-integrity-update</a>  Cited by: <a href="#S7.SS4.p2.1" class="ltx_ref" title="7.4 Harness Effects on Terminal-Bench 2.0 ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.4</a>. 
- \[248\] Steel.dev (2026)  WebArena Leaderboard 2026: Latest Browser Agent Scores.  Note: <a href="https://leaderboard.steel.dev/leaderboards/webarena/" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://leaderboard.steel.dev/leaderboards/webarena/</a>  Cited by: <a href="#S7.SS5.p2.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[249\] T. Le Sellier De Chezelles, M. Gasse, A. Drouin, M. Caccia, L. Boisvert, M. Thakkar, et al. (2025)  The browsergym ecosystem for web agent research.  arXiv preprint arXiv:2412.05467.  Cited by: <a href="#S7.SS5.p2.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>, <a href="#S7.SS5.p4.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[250\] J. Y. Koh, S. McAleer, D. Fried, and R. Salakhutdinov (2024)  Tree search for language model agents.  arXiv preprint arXiv:2407.01476.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[251\] M. L. Dihan, T. Hashem, M. E. Ali, and M. R. Parvez (2025)  WebOperator: action-aware tree search for autonomous agents in web environment.  arXiv preprint arXiv:2512.12692.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[252\] P. Sodhi, S. R. K. Branavan, Y. Artzi, and R. McDonald (2023)  SteP: stacked llm policies for web actions.  arXiv preprint arXiv:2310.03720.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[253\] K. Yang, Y. Liu, S. Chaudhary, R. Fakoor, P. Chaudhari, G. Karypis, and H. Rangwala (2024)  AgentOccam: a simple yet strong baseline for llm-based web agents.  arXiv preprint arXiv:2410.13825.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[254\] Y. Zhang, Z. Ma, Y. Ma, Z. Han, Y. Wu, and V. Tresp (2024)  WebPilot: a versatile and autonomous multi-agent system for web task execution with strategic exploration.  arXiv preprint arXiv:2408.15978.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[255\] R. Zhang, M. Qiu, Z. Tan, M. Zhang, V. Lu, J. Peng, K. Xu, L. Z. Agudelo, P. Qian, and T. Chen (2025)  Symbiotic cooperation for web agents: harnessing complementary strengths of large and small llms.  arXiv preprint arXiv:2502.07942.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[256\] WebTactix (2026)  WebTactix: semantic tree-guided parallel multi-agent planning for web task.  Note: Project page<a href="https://paper-submission-anoymous.github.io/webtactix_introduction/" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://paper-submission-anoymous.github.io/webtactix_introduction/</a>  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[257\] Y. Guo, W. Yang, S. Yang, Z. Liu, C. Chen, Y. Wei, Y. Hu, Y. Huang, G. Hao, D. Yuan, J. Wang, X. Chen, H. Yu, L. Lei, and P. Di (2026)  OpAgent: operator agent for web navigation.  arXiv preprint arXiv:2602.13559.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[258\] J. Wang, J. Zhou, W. Zhang, T. Wang, W. Liu, Z. Zhang, X. Lou, W. Zhang, H. Deng, and J. Wang (2026)  ColorBrowserAgent: complex long-horizon browser agent with adaptive knowledge evolution.  arXiv preprint arXiv:2601.07262.  Cited by: <a href="#S7.SS5.p3.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[259\] M. Thakkar, N. Chapados, C. Pal, et al.  WebArena verified: reliable evaluation for web agents.  In Workshop on Scaling Environments for Agents,  Cited by: <a href="#S7.SS5.p5.1" class="ltx_ref" title="7.5 Harness Effects on WebArena ‣ 7 Evaluation and Empirical Analysis ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§7.5</a>. 
- \[260\] J. Liu, C. Qian, Z. Su, Q. Zong, S. Huang, B. He, and Y. R. Fung (2025)  CostBench: evaluating multi-turn cost-optimal planning and adaptation in dynamic environments for llm tool-use agents.  arXiv preprint arXiv:2511.02734.  Cited by: <a href="#S8.SS1.p1.1" class="ltx_ref" title="8.1 From Score to Value-Aware Agent Optimization ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">§8.1</a>. 
- \[261\] H. Li, Z. Wang, Q. Dai, Y. Nie, J. Peng, R. Liu, J. Zhang, K. Zhu, J. He, L. Wang, et al. (2026)  OpenSage: self-programming agent generation engine.  arXiv preprint arXiv:2602.16891.  Cited by: <a href="#S8.T10.4.1.10.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 
- \[262\] KRAFTON AI and Ludo Robotics (2026)  Terminus-KIRA: boosting frontier model performance on Terminal-Bench with minimal harness.  Note: <a href="https://github.com/krafton-ai/kira" class="ltx_ref ltx_url ltx_font_typewriter" style="font-size:90%;">https://github.com/krafton-ai/kira</a>  Cited by: <a href="#S8.T10.4.1.12.1.1.1" class="ltx_ref" title="In 8.2 Learning to Verify, Recover, and Adapt ‣ 8 Outlook and Future Directions ‣ From Question Answering to Task Completion: A Survey on Agent System and Harness Design">TABLE X</a>. 









Experimental support, please <a href="./2606.20683v1/__stdout.txt" class="ltx_ref" target="_blank" rel="nofollow">view the build logs</a> for errors. Generated by <a href="https://math.nist.gov/~BMiller/LaTeXML/" class="ltx_ref ltx_LaTeXML_logo" target="_blank"> L A T E  xml </a> .





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


