---
title: "EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents"
source: "https://arxiv.org/abs/2608.05446"
author: "Xuying Ning, Dongqi Fu, Tianxin Wei, Hanqing Zeng, Yuanchen Bei, Bingxuan Li, Zihao Li, Qifan Wang, et al."
published: 2026-08
created: 2026-10-09
description:
tags:
  - "clippings"
---

# EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents



 Xuying Ning  Affiliation: University of Illinois Urbana–Champaign     Dongqi Fu  Affiliation: Meta AI     Tianxin Wei  Affiliation: University of Illinois Urbana–Champaign     Hanqing Zeng  Affiliation: Meta AI     Yuanchen Bei  Affiliation: University of Illinois Urbana–Champaign     Bingxuan Li  Affiliation: University of Illinois Urbana–Champaign     Zihao Li  Affiliation: University of Illinois Urbana–Champaign     Qifan Wang  Affiliation: Meta AI     Xiang Shen  Affiliation: Meta AI     Yifan Wu  Affiliation: Meta AI     Jiayi Liu  Affiliation: Meta AI     Hong Li  Affiliation: Meta AI     Yinglong Xia  Affiliation: Meta AI     Xiangjun Fan  Affiliation: Meta AI     Hanghang Tong  Affiliation: University of Illinois Urbana–Champaign     Jingrui He  Affiliation: University of Illinois Urbana–Champaign 





###### Abstract

Long-horizon LLM agents increasingly rely on external execution support to maintain state, track progress, invoke tools, verify outcomes, and reuse experience across interactions. However, effective harness use raises two coupled challenges: state formation from noisy interaction traces and runtime control over external-state access. Existing agents usually handle both through prompts, heuristics, or domain-specific conventions, leaving the external workspace and its usage policy manually engineered. To address this, we study the problem of *harness policy learning*, where agents learn harness policies offline and deploy them to construct and update external harness state online during runtime task execution. We introduce EvoHarness-RL, which exposes Belief, Progress, and Experience (BPE) as policy-facing harness state. Supervised harness fine-tuning teaches the base agent the harness action space and how to construct useful external state, while cost-aware GRPO explores coordination policies to selectively read, update, and consolidate that state during long-horizon interaction. Instantiated on ALFWorld with a Qwen3-8B LLM, EvoHarness-RL reaches 96.9% success and reveals two key dynamics: *harness annealing*, where training internalizes recurring harness-use patterns into the model policy and shifts the agent from frequent harness calls toward selective external-state access, and *harness evolution*, where progress updates and experience consolidation refine the harness into a compact, task-adaptive state substrate. These results suggest that long-horizon agents benefit from trainable policies for constructing and coordinating with external harness workspaces, beyond simply adding stronger tools or larger memories.





## 1 Introduction



LLM-based agents are increasingly deployed in long-horizon interactive settings, where they need to move beyond one-step problem solving toward reliable task execution over extended interaction. In tasks such as embodied interaction, web navigation, software engineering, and workflow automation (<a href="#bib.bib14" class="ltx_ref">Shridhar et al., 2021</a>; <a href="#bib.bib3" class="ltx_ref">Hong et al., 2026</a>; <a href="#bib.bib22" class="ltx_ref">Yang et al., 2024</a>; <a href="#bib.bib27" class="ltx_ref">Zhou et al., 2024</a>) agents need to maintain beliefs about the environment, track completed and pending subgoals, recover from failed actions, and reuse procedures from prior experience. Long-horizon execution therefore depends on diverse forms of external support, including memory, tools, state trackers, verifiers, and execution logs (<a href="#bib.bib16" class="ltx_ref">Suzgun et al., 2026</a>; <a href="#bib.bib11" class="ltx_ref">Schick et al., 2023</a>; <a href="#bib.bib8" class="ltx_ref">Ning et al., 2026</a>; <a href="#bib.bib20" class="ltx_ref">Wei et al., 2025</a>; <a href="#bib.bib4" class="ltx_ref">Jiang et al., 2026</a>) . As these components become more prevalent and more specialized, a central question arises: *how can agents learn to form useful external state and efficiently leverage such support as part of their own decision process?*





We refer to this runtime layer as the external *harness*: the collection of prompts, tools, retrieval modules, memories, state trackers, execution feedback, and control-flow mechanisms that supports agent execution. Modern agent frameworks and product systems expose increasingly rich harness components (<a href="#bib.bib24" class="ltx_ref">Young, 2025</a>; <a href="#bib.bib8" class="ltx_ref">Ning et al., 2026</a>; <a href="#bib.bib5" class="ltx_ref">Lee et al., 2026</a>), and recent harness-engineering methods further optimize harness state, implementations, or trace-driven adaptations (<a href="#bib.bib7" class="ltx_ref">Lou et al., 2026</a>; <a href="#bib.bib4" class="ltx_ref">Jiang et al., 2026</a>; <a href="#bib.bib5" class="ltx_ref">Lee et al., 2026</a>; <a href="#bib.bib1" class="ltx_ref">Chen et al., 2026</a>). In parallel, self-evolving agents show that past trajectories can be distilled into reusable memories, workflows, or skills (<a href="#bib.bib13" class="ltx_ref">Shinn et al., 2023</a>; <a href="#bib.bib17" class="ltx_ref">Wang et al., 2024</a>; <a href="#bib.bib10" class="ltx_ref">Ouyang et al., 2026</a>). However, a complementary bottleneck remains underexplored: even when external components are carefully designed or adapted, the agent’s runtime policy for using them is often specified through prompts, heuristics, or fixed conventions. As a result, the agent may be surrounded by useful external support, but it is rarely trained to decide when to form, access, update, and consolidate that support as part of its own decision process.





We propose EvoHarness-RL, a trainable coordination layer for learning how agents construct and use external harness state. EvoHarness-RL abstracts heterogeneous harness components into a unified, policy-facing BPE workspace, motivated by three recurring needs in long-horizon interaction: *Belief* for maintaining the current environment state, *Progress* for tracking completed and pending subgoals, and *Experience* for reusing knowledge across episodes (<a href="#bib.bib15" class="ltx_ref">Singh et al., 2026</a>; <a href="#bib.bib19" class="ltx_ref">Wang et al., 2026</a>; <a href="#bib.bib13" class="ltx_ref">Shinn et al., 2023</a>). The agent interacts with this workspace through compact harness meta-actions to query belief, commit progress, recall experience, and write new insights.



<figure id="S1.F1" class="ltx_figure">
<img src="2608.05446v1/harnessrl_figure_1.png" id="S1.F1.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/182;" width="476" height="182" alt="Refer to caption" />
<figcaption>Figure 1:  Overview of EvoHarness-RL. Long-horizon agents rely on complex external execution support, but existing harness designs are often heterogeneous and manually controlled. EvoHarness-RL studies harness policy learning by abstracting this external workspace into three policy-facing states: <em>Belief</em> for environment state, <em>Progress</em> for execution status and subgoal structure, and <em>Experience</em> for reusable cross-episode knowledge. The agent learns to coordinate with this workspace through compact harness actions, deciding when to track, commit, recall, or note external state during runtime interaction.</figcaption>
</figure>



Our training recipe consists of two stages with different purposes. First, supervised harness fine-tuning familiarizes the base model with the semantics of the BPE action protocol, and teaches it to externalize useful belief, progress, and experience state from interaction traces. Second, since harness actions consume the same interaction budget as environment actions, effective agents need to learn not only how to construct external state, but also when external-state access is worth its cost. Cost-aware GRPO (<a href="#bib.bib12" class="ltx_ref">Shao et al., 2024</a>) optimizes the resulting policy with rewards for task success, efficiency, action diversity, repetition avoidance, and valid action formatting. This stage explores when to read, update, or consolidate harness state under an interaction budget, turning harness use from a prompt-time scaffold into a learned runtime policy decision.





We instantiate the general EvoHarness-RL framework in ALFWorld (<a href="#bib.bib14" class="ltx_ref">Shridhar et al., 2021</a>) through a domain-specific environment adapter. The adapter preserves the shared BPE interface while grounding Belief, Progress, and Experience as a world-state tracker, a committed subgoal plan, and a cross-episode skill bank for embodied household tasks. Experiments show that BPE is useful both before and after training: prompt-time BPE already improves stateful long-horizon tasks, while SFT and GRPO further amplify performance, reaching 96.9% success on the ALFWorld seen split and 86.6% on the unseen split. Beyond final success, our analysis reveals two dynamics: *harness annealing*, where training internalizes recurring harness-use patterns into the model policy, shifting the agent from frequent scaffold-like calls toward selective external-state access, and *harness evolution*, where the online progress updates and cross-episode experience consolidation refine the harness into a compact, task-adaptive state substrate.





Our contributions are four-fold:

- •
  

  We introduce EvoHarness-RL, a trainable agent-harness coordination layer based on BPE (Belief, Progress, and Experience) and a compact set of harness meta-actions.

  
- •
  

  We develop a two-stage training recipe that first bootstraps harness use from expert demonstrations and then optimizes cost-aware harness coordination with GRPO.

  
- •
  

  We show that BPE helps at both inference and training time: prompt-time BPE improves stateful tasks, while SFT and GRPO substantially improve seen and unseen ALFWorld success rate.

  
- •
  

  We analyze two co-evolutionary dynamics: harness annealing, where training turns frequent scaffold use into selective state access, and harness evolution, where the experience store is refined through retrieval, consolidation, and forgetting.

  







## 2 Method



We introduce EvoHarness-RL, a trainable coordination layer for harness policy learning. EvoHarness-RL consists of a unified BPE external-state abstraction (Section <a href="#S2.SS1" class="ltx_ref" title="2.1 Unified Harness Abstraction: Belief, Progress, and Experience ‣ 2 Method ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2.1</a>), a compact agent-harness action protocol (Section <a href="#S2.SS2" class="ltx_ref" title="2.2 Agent-Harness Action Protocol ‣ 2 Method ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2.2</a>), its embodied instantiation in ALFWorld (<a href="#bib.bib14" class="ltx_ref">Shridhar et al., 2021</a>) (Section <a href="#S2.SS3" class="ltx_ref" title="2.3 Environment Adapter for BPE Harness Grounding ‣ 2 Method ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2.3</a>), and a two-stage training pipeline for cost-aware agent-harness coordination (Section <a href="#S2.SS4" class="ltx_ref" title="2.4 Cost-Aware Harness Optimization ‣ 2 Method ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2.4</a>).





### 2.1 Unified Harness Abstraction: Belief, Progress, and Experience



A trainable harness interface should expose enough external state to support long-horizon execution, while remaining compact enough for policy learning. Concrete harness implementations may contain many domain-specific components, such as state trackers, execution logs, task plans, verifier feedback, episodic memories, or skill libraries. Despite their diversity, these components address a small set of recurring failure modes in long-horizon interaction: agents may lose track of what is currently true in the environment, forget what has already been done or what should be attempted next, and repeatedly rediscover procedures or mistakes that could have been reused from prior attempts (<a href="#bib.bib13" class="ltx_ref">Shinn et al., 2023</a>; <a href="#bib.bib19" class="ltx_ref">Wang et al., 2026</a>; <a href="#bib.bib15" class="ltx_ref">Singh et al., 2026</a>). Motivated by these three needs, we organize the policy-facing role of external harness state into three compact functional roles: Belief, Progress, and Experience (BPE). Formally, at each step $`t`$, the harness renders

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{H}_{t}=(\hbox{\pagecolor{beliefbg}$B_{t}$},\hbox{\pagecolor{progressbg}$P_{t}$},\hbox{\pagecolor{experiencebg}$E_{t}$}),
``` |  | (1) |

where the components correspond to environment estimate, execution state, and experience.





Belief ($`B_{t}`$)  


stores task-relevant facts inferred from interaction, such as object states, locations, and relations. It provides a persistent estimate of the current environment so the policy does not need to rely only on transient context-window memory.



Progress ($`P_{t}`$)  


records task decomposition and execution status through subgoal-status records $`(g_{i},\sigma_{i})`$. It externalizes what has been attempted, what remains open, and where execution may be blocked, turning implicit reasoning traces into inspectable task state.



Experience ($`E_{t}`$)  


maintains cross-episode knowledge, such as skills, failure modes, search priors, and high-level strategies. It supports reuse across attempts by providing relevant prior experience during execution and storing new insights for later consolidation.









### 2.2 Agent-Harness Action Protocol



Given the BPE state, the policy needs a compact way to read from and write to the external workspace. A fully domain-specific harness API may expose many operations, but it would make the learned behavior difficult to transfer or analyze. Conversely, a single generic memory action would hide the functional structure of the workspace. We therefore define a small set of harness meta-actions that cover the main information flows between the agent and BPE:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{A}_{\mathrm{bpe}}=\{\hbox{\pagecolor{trackbg}{track}},\hbox{\pagecolor{commitbg}{commit}},\hbox{\pagecolor{recallbg}{recall}},\hbox{\pagecolor{notebg}{note}}\}.
``` |  | (2) |





trackreads task-relevant belief from $`B_{t}`$; commit writes a subgoal or execution update into $`P_{t}`$; recall retrieves reusable knowledge from $`E_{t}`$; and note records a new insight for later experience consolidation into $`E_{t}`$.





During interaction, the policy chooses from both environment actions and harness actions:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathcal{A}=\mathcal{A}_{\mathrm{env}}\cup\mathcal{A}_{\mathrm{bpe}}.
``` |  | (3) |

At step $`t`$, the policy receives the environment observation $`o_{t}`$, the rendered harness state $`\mathcal{H}_{t}`$, and task context $`c_{t}`$, then samples

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
a_{t}\sim\pi_{\theta}(\cdot\mid o_{t},\mathcal{H}_{t},c_{t}).
``` |  | (4) |

If $`a_{t}\in\mathcal{A}_{\mathrm{env}}`$, the action advances the task environment and yields a new observation. If $`a_{t}\in\mathcal{A}_{\mathrm{bpe}}`$, the action queries or updates the external workspace and returns a new harness view. Since both action types consume the same interaction budget, the agent needs to learn when harness access is worth its cost; we optimize this coordination in Section <a href="#S2.SS4" class="ltx_ref" title="2.4 Cost-Aware Harness Optimization ‣ 2 Method ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2.4</a>.



<figure id="S2.F2" class="ltx_figure">
<img src="2608.05446v1/harnessrl_figure_2.png" id="S2.F2.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:476/148;" width="476" height="148" alt="Refer to caption" />
<figcaption>Figure 2:  Overview of the training pipeline of EvoHarness-RL. Starting from an SFT checkpoint, the policy generates GRPO rollouts by interleaving environment actions with BPE harness actions. Rewards combine task success, efficiency, diversity, and spam and format penalties to optimize cost-aware harness coordination.</figcaption>
</figure>





### 2.3 Environment Adapter for BPE Harness Grounding



BPE is a functional interface rather than a fixed internal schema. Different tasks may require different harness implementations, but they can expose the same policy-facing roles: Belief, Progress, and Experience. We therefore use an environment adapter to bridge domain-specific signals with the general BPE interface. The adapter processes observations, action results, tool outputs, and verifier feedback, maintains the internal harness stores, and renders selected views as $`(B_{t},P_{t},E_{t})`$ for the policy. It also grounds the four harness actions in the target environment. Thus, the internal implementation remains domain-specific, while the trainable agent-harness coordination layer is shared.





We instantiate this adapter in ALFWorld (<a href="#bib.bib14" class="ltx_ref">Shridhar et al., 2021</a>). The adapter keeps domain-specific internal stores for belief, progress, and experience, and renders them as the policy-facing BPE state $`(B_{t},P_{t},E_{t})`$. Appendix <a href="#A3" class="ltx_ref" title="Appendix C Implementation Details ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">C</a> provides implementation details, and Appendix <a href="#A2" class="ltx_ref" title="Appendix B Qualitative Case Study ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">B</a> gives a concrete trajectory-level example.





#### Belief ($`B_{t}`$) and track instantiation.



For embodied household tasks, Belief is grounded as an internal world-state store that is updated in the background after each environment step. The adapter uses the agent’s actions and environment observations to maintain task-relevant facts such as object states, locations, and spatial relations. This state is not fully exposed to the policy by default. Instead, the policy can issue track\[object\] to inspect a specific object or track\[world\] to obtain a compact global summary. Thus, Belief provides persistent environment state, while access to that state remains a selective harness action.







#### Progress ($`P_{t}`$) and commit instantiation.



Progress is grounded as a committed execution record. In ALFWorld, this is implemented as a bounded list of subgoal-status entries, which is sufficient for mostly sequential household tasks. For example, a clean-and-place task may involve locating the target object, picking it up, cleaning it, and placing it in the target receptacle. The policy uses commit\[subgoal\] to externalize the current execution step, making attempted, pending, or blocked progress visible to later decisions.







#### Experience ($`E_{t}`$), recall, and note instantiation.



Experience is grounded as a cross-episode skill store, organized into general skills, task-specific skills, common mistakes, and object-location search priors. It evolves at two different timescales. During an episode, the policy uses recall\[query\] to retrieve relevant prior knowledge, which also updates the usage counts of retrieved entries. The policy can also issue note\[insight\] to write newly observed lessons into a temporary note buffer, while successful object searches update object-location priors online. During parallel rollout collection, the main skill store is kept fixed within each batch, and all note buffers and completed-trajectory summaries are accumulated in the background. At epoch boundaries, a consolidation model merges this evidence into the skill store through add, update, and remove operations.









### 2.4 Cost-Aware Harness Optimization



#### Supervised harness fine-tuning.



We first bootstrap the policy with supervised fine-tuning on successful teacher trajectories collected using the same BPE interface. At each step, the teacher observes the task objective, current observation, admissible environment actions, recent history, and active harness views, then outputs a single next action in the format \<think\>...\</think\>\<action\>...\</action\>. The action can be either an ALFWorld command or a BPE harness action. We fine-tune Qwen3-8B on these next-action demonstrations, teaching the model both task-solving behavior and the basic semantics of when to track, commit, recall, or note. The experience accumulated during teacher rollouts initializes the skill store used in subsequent GRPO (<a href="#bib.bib12" class="ltx_ref">Shao et al., 2024</a>).







#### Cost-aware GRPO.



We optimize the policy using Group Relative Policy Optimization (GRPO) initialized from a Supervised Fine-Tuning (SFT) checkpoint. The trajectory-level reward $`R(\tau)`$ combines a dominant sparse success signal with dense auxiliary shaping terms designed to cultivate adaptive harness usage:

|  |  |  |  |  |
|----|----|----|----|----|
|  | $`\displaystyle R(\tau)={}`$ | $`\displaystyle\underbrace{R_{\mathrm{succ}}(\tau)}_{\text{task success}}+\underbrace{\lambda_{\mathrm{eff}}R_{\mathrm{eff}}(\tau)}_{\text{efficiency bonus}}+\underbrace{\lambda_{\mathrm{div}}(u)R_{\mathrm{div}}(\tau)}_{\text{action diversity}}-\underbrace{\lambda_{\mathrm{spam}}R_{\mathrm{spam}}(\tau)}_{\text{spam penalty}}-\underbrace{\lambda_{\mathrm{inv}}R_{\mathrm{inv}}(\tau)}_{\text{format penalty}}.`$ |  | (5) |





Task completion acts as the strict gatekeeper: $`R_{\mathrm{succ}}(\tau)=10\cdot\mathbf{1}[\text{solved}]`$, and the efficiency bonus $`R_{\mathrm{eff}}(\tau)=\max(0,1-|\tau|/T_{\max})`$ is only granted upon success, naturally penalizing redundant harness queries.





To prevent policy collapse, where the agent either ignores $`\mathcal{A}_{\mathrm{bpe}}`$ or falls into infinite repetitive loops, we introduce a time-dependent vocabulary diversity bonus:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
R_{\mathrm{div}}(\tau)=\frac{|\{\mathrm{verb}(a_{t}):a_{t}\in\tau\}|}{|\tau|},\quad\lambda_{\mathrm{div}}(u)=\frac{\lambda_{\mathrm{div}}^{\max}}{2}\left(1+\cos\frac{\pi u}{U}\right),
``` |  | (6) |

where $`u`$ is the current RL epoch and $`U`$ is the annealing horizon. This curriculum encourages broad exploration of harness actions early in training, before gracefully decaying to force specialization and efficient task resolution. Finally, $`R_{\mathrm{spam}}`$ and $`R_{\mathrm{inv}}`$ apply fixed penalties for degenerate repetitions or malformed syntax.











## 3 Experiments



We evaluate EvoHarness-RL on ALFWorld to study its effectiveness against frozen and trainable baselines, the contribution of each BPE component, and generalization to unseen environments. We further analyze how harness use changes during training and how the external experience store evolves over time.





### 3.1 Experiment Setup



#### Environments.



We evaluate on ALFWorld (<a href="#bib.bib14" class="ltx_ref">Shridhar et al., 2021</a>), a text-based game aligned with the ALFRED embodied AI benchmark. Agents must complete multi-step household tasks by navigating rooms and manipulating objects through text commands. We focus on six distinct task families requiring varied levels of state tracking: simple pick-and-place (Pick), object inspection under light (Look), cleaning-before-placing (Clean), heating-before-placing (Heat), cooling-before-placing (Cool), and placing two objects (Pick2). We report the success rate on the standard validation set as <a href="#bib.bib10" class="ltx_ref">Ouyang et al. (2026)</a>.







#### Baselines.



We compare EvoHarness-RL against three categories of competitive methods. First, we include frontier models (Claude Opus 4.5, GPT-4.1, GPT-5) evaluated with standard prompting and with our prompt-time harness to measure how strong base policies benefit from explicit BPE structures. Second, we evaluate frozen memory and agentic methods, including ReAct (<a href="#bib.bib23" class="ltx_ref">Yao et al., 2022</a>), ExpeL (<a href="#bib.bib26" class="ltx_ref">Zhao et al., 2024</a>), ReasoningBank (<a href="#bib.bib9" class="ltx_ref">Ouyang et al., 2025</a>), MemP (<a href="#bib.bib2" class="ltx_ref">Fang et al., 2026</a>), Dynamic Cheatsheet (<a href="#bib.bib16" class="ltx_ref">Suzgun et al., 2026</a>), ACE (<a href="#bib.bib25" class="ltx_ref">Zhang et al., 2025</a>), and SkillOS-base (<a href="#bib.bib10" class="ltx_ref">Ouyang et al., 2026</a>), which utilize external memory or experience pools without parameter updates. Third, we consider trainable methods, including standard GRPO (<a href="#bib.bib12" class="ltx_ref">Shao et al., 2024</a>), SkillOS (<a href="#bib.bib10" class="ltx_ref">Ouyang et al., 2026</a>), and SkillRL (<a href="#bib.bib21" class="ltx_ref">Xia et al., 2026</a>), which integrate memory mechanisms or structural optimization directly into training. We compare these against our own variants: EvoHarness-Base (inference-time), EvoHarness-SFT (supervised harness learning), and EvoHarness-RL (cost-aware GRPO). The implementation details are provided in Appendix <a href="#A3" class="ltx_ref" title="Appendix C Implementation Details ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">C</a>.









### 3.2 Main Results

<figure id="S3.T1" class="ltx_table">

 
<table id="S3.T1.13.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<tbody class="ltx_tbody">
<tr id="S3.T1.13.1.1" class="ltx_tr">
<td rowspan="2" id="S3.T1.13.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_tt" style="padding: 0.35pt 4.1pt">Approach</td>
<td rowspan="2" id="S3.T1.13.1.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_tt" style="padding: 0.35pt 4.1pt">Backbone / Variant</td>
<td colspan="8" id="S3.T1.13.1.1.3" class="ltx_td ltx_align_center ltx_border_tt" style="padding: 0.35pt 4.1pt">ALFWorld SR (%)</td>
</tr>
<tr id="S3.T1.13.1.2" class="ltx_tr">
<td id="S3.T1.13.1.2.1" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt">Pick</td>
<td id="S3.T1.13.1.2.2" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt">Look</td>
<td id="S3.T1.13.1.2.3" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt">Clean</td>
<td id="S3.T1.13.1.2.4" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt">Heat</td>
<td id="S3.T1.13.1.2.5" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt">Cool</td>
<td id="S3.T1.13.1.2.6" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt">Pick2</td>
<td id="S3.T1.13.1.2.7" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt">Avg.</td>
<td id="S3.T1.13.1.2.8" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.1pt"><em>Δ</em></td>
</tr>
<tr id="S3.T1.13.1.3" class="ltx_tr" style="--ltx-bg-color:#F0F0F0;">
<td colspan="10" id="S3.T1.13.1.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding: 0.35pt 4.1pt">Frontier models</td>
</tr>
<tr id="S3.T1.13.1.4" class="ltx_tr">
<td id="S3.T1.13.1.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">ReAct</td>
<td id="S3.T1.13.1.4.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Claude Opus 4.5*</td>
<td id="S3.T1.13.1.4.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.4.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">92.3</td>
<td id="S3.T1.13.1.4.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">96.3</td>
<td id="S3.T1.13.1.4.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.4.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">88.0</td>
<td id="S3.T1.13.1.4.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.4.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">96.4</td>
<td id="S3.T1.13.1.4.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">–</td>
</tr>
<tr id="S3.T1.13.1.5" class="ltx_tr">
<td id="S3.T1.13.1.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">+ EvoHarness-Base</td>
<td id="S3.T1.13.1.5.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Claude Opus 4.5*</td>
<td id="S3.T1.13.1.5.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.5.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.5.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.5.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">93.8</td>
<td id="S3.T1.13.1.5.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">96.0</td>
<td id="S3.T1.13.1.5.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.5.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">98.5</td>
<td id="S3.T1.13.1.5.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+2.1</td>
</tr>
<tr id="S3.T1.13.1.6" class="ltx_tr">
<td id="S3.T1.13.1.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">ReAct</td>
<td id="S3.T1.13.1.6.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">GPT-4.1*</td>
<td id="S3.T1.13.1.6.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">82.9</td>
<td id="S3.T1.13.1.6.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">61.5</td>
<td id="S3.T1.13.1.6.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">44.4</td>
<td id="S3.T1.13.1.6.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">43.8</td>
<td id="S3.T1.13.1.6.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">4.0</td>
<td id="S3.T1.13.1.6.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">41.7</td>
<td id="S3.T1.13.1.6.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">47.9</td>
<td id="S3.T1.13.1.6.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">–</td>
</tr>
<tr id="S3.T1.13.1.7" class="ltx_tr">
<td id="S3.T1.13.1.7.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">+ EvoHarness-Base</td>
<td id="S3.T1.13.1.7.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">GPT-4.1*</td>
<td id="S3.T1.13.1.7.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">82.9</td>
<td id="S3.T1.13.1.7.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">61.5</td>
<td id="S3.T1.13.1.7.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">63.0</td>
<td id="S3.T1.13.1.7.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">75.0</td>
<td id="S3.T1.13.1.7.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">72.0</td>
<td id="S3.T1.13.1.7.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">62.5</td>
<td id="S3.T1.13.1.7.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">70.0</td>
<td id="S3.T1.13.1.7.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+22.1</td>
</tr>
<tr id="S3.T1.13.1.8" class="ltx_tr">
<td id="S3.T1.13.1.8.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">ReAct</td>
<td id="S3.T1.13.1.8.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">GPT-5*</td>
<td id="S3.T1.13.1.8.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">74.3</td>
<td id="S3.T1.13.1.8.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">53.8</td>
<td id="S3.T1.13.1.8.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">48.1</td>
<td id="S3.T1.13.1.8.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">62.5</td>
<td id="S3.T1.13.1.8.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">60.0</td>
<td id="S3.T1.13.1.8.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">58.3</td>
<td id="S3.T1.13.1.8.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">60.7</td>
<td id="S3.T1.13.1.8.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">–</td>
</tr>
<tr id="S3.T1.13.1.9" class="ltx_tr">
<td id="S3.T1.13.1.9.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">+ EvoHarness-Base</td>
<td id="S3.T1.13.1.9.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">GPT-5*</td>
<td id="S3.T1.13.1.9.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">97.1</td>
<td id="S3.T1.13.1.9.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">76.9</td>
<td id="S3.T1.13.1.9.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">85.2</td>
<td id="S3.T1.13.1.9.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">93.8</td>
<td id="S3.T1.13.1.9.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">88.0</td>
<td id="S3.T1.13.1.9.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">62.5</td>
<td id="S3.T1.13.1.9.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">85.0</td>
<td id="S3.T1.13.1.9.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+25.7</td>
</tr>
<tr id="S3.T1.13.1.10" class="ltx_tr" style="--ltx-bg-color:#F0F0F0;">
<td colspan="10" id="S3.T1.13.1.10.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding: 0.35pt 4.1pt">Open-source small models</td>
</tr>
<tr id="S3.T1.13.1.11" class="ltx_tr">
<td id="S3.T1.13.1.11.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">ReAct</td>
<td id="S3.T1.13.1.11.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B*</td>
<td id="S3.T1.13.1.11.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">78.1</td>
<td id="S3.T1.13.1.11.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">46.2</td>
<td id="S3.T1.13.1.11.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">33.3</td>
<td id="S3.T1.13.1.11.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">37.5</td>
<td id="S3.T1.13.1.11.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">29.3</td>
<td id="S3.T1.13.1.11.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">47.2</td>
<td id="S3.T1.13.1.11.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">47.9</td>
<td id="S3.T1.13.1.11.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">–</td>
</tr>
<tr id="S3.T1.13.1.12" class="ltx_tr">
<td id="S3.T1.13.1.12.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">ExpeL</td>
<td id="S3.T1.13.1.12.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B*</td>
<td id="S3.T1.13.1.12.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">91.4</td>
<td id="S3.T1.13.1.12.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">76.9</td>
<td id="S3.T1.13.1.12.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">14.8</td>
<td id="S3.T1.13.1.12.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">43.8</td>
<td id="S3.T1.13.1.12.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">28.0</td>
<td id="S3.T1.13.1.12.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">45.8</td>
<td id="S3.T1.13.1.12.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">49.3</td>
<td id="S3.T1.13.1.12.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+1.4</td>
</tr>
<tr id="S3.T1.13.1.13" class="ltx_tr">
<td id="S3.T1.13.1.13.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">ReasoningBank<sup>†</sup></td>
<td id="S3.T1.13.1.13.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B*</td>
<td id="S3.T1.13.1.13.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">83.8</td>
<td id="S3.T1.13.1.13.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">48.7</td>
<td id="S3.T1.13.1.13.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">49.4</td>
<td id="S3.T1.13.1.13.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">39.6</td>
<td id="S3.T1.13.1.13.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">41.3</td>
<td id="S3.T1.13.1.13.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">54.2</td>
<td id="S3.T1.13.1.13.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">55.7</td>
<td id="S3.T1.13.1.13.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+7.8</td>
</tr>
<tr id="S3.T1.13.1.14" class="ltx_tr">
<td id="S3.T1.13.1.14.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">MemP<sup>†</sup></td>
<td id="S3.T1.13.1.14.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B*</td>
<td id="S3.T1.13.1.14.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">80.0</td>
<td id="S3.T1.13.1.14.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">43.6</td>
<td id="S3.T1.13.1.14.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">24.7</td>
<td id="S3.T1.13.1.14.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">33.3</td>
<td id="S3.T1.13.1.14.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">38.7</td>
<td id="S3.T1.13.1.14.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">48.6</td>
<td id="S3.T1.13.1.14.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">49.7</td>
<td id="S3.T1.13.1.14.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+1.8</td>
</tr>
<tr id="S3.T1.13.1.15" class="ltx_tr">
<td id="S3.T1.13.1.15.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Dynamic Cheatsheet</td>
<td id="S3.T1.13.1.15.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B*</td>
<td id="S3.T1.13.1.15.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">88.6</td>
<td id="S3.T1.13.1.15.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">53.8</td>
<td id="S3.T1.13.1.15.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">29.6</td>
<td id="S3.T1.13.1.15.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">37.5</td>
<td id="S3.T1.13.1.15.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">20.0</td>
<td id="S3.T1.13.1.15.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">66.7</td>
<td id="S3.T1.13.1.15.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">52.1</td>
<td id="S3.T1.13.1.15.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+4.2</td>
</tr>
<tr id="S3.T1.13.1.16" class="ltx_tr">
<td id="S3.T1.13.1.16.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">ACE</td>
<td id="S3.T1.13.1.16.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B*</td>
<td id="S3.T1.13.1.16.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">85.7</td>
<td id="S3.T1.13.1.16.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">38.5</td>
<td id="S3.T1.13.1.16.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">29.6</td>
<td id="S3.T1.13.1.16.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">37.5</td>
<td id="S3.T1.13.1.16.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">36.0</td>
<td id="S3.T1.13.1.16.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">58.3</td>
<td id="S3.T1.13.1.16.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">51.4</td>
<td id="S3.T1.13.1.16.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+3.5</td>
</tr>
<tr id="S3.T1.13.1.17" class="ltx_tr">
<td id="S3.T1.13.1.17.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">SkillOS-base<sup>†</sup></td>
<td id="S3.T1.13.1.17.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B*</td>
<td id="S3.T1.13.1.17.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">79.0</td>
<td id="S3.T1.13.1.17.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">41.0</td>
<td id="S3.T1.13.1.17.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">45.7</td>
<td id="S3.T1.13.1.17.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">37.5</td>
<td id="S3.T1.13.1.17.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">38.7</td>
<td id="S3.T1.13.1.17.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">55.6</td>
<td id="S3.T1.13.1.17.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">53.1</td>
<td id="S3.T1.13.1.17.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+5.2</td>
</tr>
<tr id="S3.T1.13.1.18" class="ltx_tr">
<td id="S3.T1.13.1.18.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">GRPO</td>
<td id="S3.T1.13.1.18.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B▴</td>
<td id="S3.T1.13.1.18.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">87.5</td>
<td id="S3.T1.13.1.18.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">71.4</td>
<td id="S3.T1.13.1.18.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">72.7</td>
<td id="S3.T1.13.1.18.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">70.0</td>
<td id="S3.T1.13.1.18.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">48.1</td>
<td id="S3.T1.13.1.18.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">43.5</td>
<td id="S3.T1.13.1.18.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">65.6</td>
<td id="S3.T1.13.1.18.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+17.7</td>
</tr>
<tr id="S3.T1.13.1.19" class="ltx_tr">
<td id="S3.T1.13.1.19.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">SkillOS<sup>†</sup></td>
<td id="S3.T1.13.1.19.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen3-8B▴</td>
<td id="S3.T1.13.1.19.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">95.2</td>
<td id="S3.T1.13.1.19.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">71.8</td>
<td id="S3.T1.13.1.19.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">74.1</td>
<td id="S3.T1.13.1.19.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">72.9</td>
<td id="S3.T1.13.1.19.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">77.3</td>
<td id="S3.T1.13.1.19.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">77.8</td>
<td id="S3.T1.13.1.19.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">80.2</td>
<td id="S3.T1.13.1.19.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+32.3</td>
</tr>
<tr id="S3.T1.13.1.20" class="ltx_tr">
<td id="S3.T1.13.1.20.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">SkillRL<sup>‡</sup></td>
<td id="S3.T1.13.1.20.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Qwen2.5-7B▴</td>
<td id="S3.T1.13.1.20.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">97.9</td>
<td id="S3.T1.13.1.20.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">71.4</td>
<td id="S3.T1.13.1.20.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">90.0</td>
<td id="S3.T1.13.1.20.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">90.0</td>
<td id="S3.T1.13.1.20.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">95.5</td>
<td id="S3.T1.13.1.20.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">87.5</td>
<td id="S3.T1.13.1.20.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">89.9</td>
<td id="S3.T1.13.1.20.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+42.0</td>
</tr>
<tr id="S3.T1.13.1.21" class="ltx_tr" style="--ltx-bg-color:#F0F0F0;">
<td colspan="10" id="S3.T1.13.1.21.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding: 0.35pt 4.1pt">Ours: EvoHarness-RL on Qwen3-8B</td>
</tr>
<tr id="S3.T1.13.1.22" class="ltx_tr" style="--ltx-bg-color:#FFFFF7;">
<td id="S3.T1.13.1.22.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">EvoHarness-Base</td>
<td id="S3.T1.13.1.22.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Inference-time harness*</td>
<td id="S3.T1.13.1.22.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">71.4</td>
<td id="S3.T1.13.1.22.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">53.8</td>
<td id="S3.T1.13.1.22.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">63.0</td>
<td id="S3.T1.13.1.22.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">50.0</td>
<td id="S3.T1.13.1.22.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">48.0</td>
<td id="S3.T1.13.1.22.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">41.7</td>
<td id="S3.T1.13.1.22.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">56.4</td>
<td id="S3.T1.13.1.22.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+8.5</td>
</tr>
<tr id="S3.T1.13.1.23" class="ltx_tr" style="--ltx-bg-color:#FFFFF2;">
<td id="S3.T1.13.1.23.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">EvoHarness-SFT</td>
<td id="S3.T1.13.1.23.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.1pt">Learned harness calls▴</td>
<td id="S3.T1.13.1.23.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">80.0</td>
<td id="S3.T1.13.1.23.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">53.8</td>
<td id="S3.T1.13.1.23.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">88.9</td>
<td id="S3.T1.13.1.23.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">75.0</td>
<td id="S3.T1.13.1.23.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">40.0</td>
<td id="S3.T1.13.1.23.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">62.5</td>
<td id="S3.T1.13.1.23.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">68.6</td>
<td id="S3.T1.13.1.23.10" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.1pt">+20.7</td>
</tr>
<tr id="S3.T1.13.1.24" class="ltx_tr" style="--ltx-bg-color:#FFFFE0;">
<td id="S3.T1.13.1.24.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding: 0.35pt 4.1pt">EvoHarness-RL</td>
<td id="S3.T1.13.1.24.2" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding: 0.35pt 4.1pt">SFT init + GRPO optimization▴</td>
<td id="S3.T1.13.1.24.3" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.24.4" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">92.9</td>
<td id="S3.T1.13.1.24.5" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">95.5</td>
<td id="S3.T1.13.1.24.6" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.24.7" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">92.6</td>
<td id="S3.T1.13.1.24.8" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">100.0</td>
<td id="S3.T1.13.1.24.9" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">96.9</td>
<td id="S3.T1.13.1.24.10" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.1pt">+49.0</td>
</tr>
</tbody>
</table>

<figcaption>Table 1: Main results on ALFWorld. We report success rates on the 140-task seen split. *denotes frozen inference-time methods, and ▴denotes trainable methods. <em>Δ</em> denotes the absolute average-SR gain over the corresponding ReAct baseline. <sup>†</sup>/<sup>‡</sup> indicate results reported by SkillOS/SkillRL, respectively.</figcaption>
</figure>



Table <a href="#S3.T1" class="ltx_ref" title="Table 1 ‣ 3.2 Main Results ‣ 3 Experiments ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">1</a> demonstrates that EvoHarness-RL on Qwen3-8B achieves state of the art performance with a 96.9% average success rate, yielding a +49.0 absolute improvement over the base ReAct model. This optimization allows the 8B model to effectively match top frontier models like Claude Opus 4.5. Our method also decisively outperforms all competitive baselines, including static memory approaches and strong trainable agents like SkillOS (80.2%) and SkillRL (89.9%). The progression from prompt time scaffolding (56.4%) to SFT (68.6%) and finally GRPO (96.9%) clearly validates our two stage training pipeline, showing that optimization transforms the harness from a static tool into a highly effective decision interface. Additionally, the top block of the table shows that the BPE framework provides universal benefits across model scales. Applying the explicit harness significantly elevates struggling frontier policies, boosting GPT-4.1 by +22.1 and GPT-5 by +25.7. Even for Claude Opus 4.5, which is already near the performance ceiling, the harness pushes the success rate to 98.5%. This confirms that externalizing belief, progress, and experience is broadly critical for reliable long horizon task execution regardless of the base model size.







### 3.3 Ablation Results

<figure id="S3.T2" class="ltx_table">

 
<table id="S3.T2.4.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<tbody class="ltx_tbody">
<tr id="S3.T2.4.1.1" class="ltx_tr">
<td rowspan="2" id="S3.T2.4.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_tt" style="padding: 0.35pt 4.5pt">Variant</td>
<td rowspan="2" id="S3.T2.4.1.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_tt" style="padding: 0.35pt 4.5pt">Interface / Policy</td>
<td colspan="7" id="S3.T2.4.1.1.3" class="ltx_td ltx_align_center ltx_border_tt" style="padding: 0.35pt 4.5pt">ALFWorld SR (%)</td>
</tr>
<tr id="S3.T2.4.1.2" class="ltx_tr">
<td id="S3.T2.4.1.2.1" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.5pt">Pick</td>
<td id="S3.T2.4.1.2.2" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.5pt">Look</td>
<td id="S3.T2.4.1.2.3" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.5pt">Clean</td>
<td id="S3.T2.4.1.2.4" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.5pt">Heat</td>
<td id="S3.T2.4.1.2.5" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.5pt">Cool</td>
<td id="S3.T2.4.1.2.6" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.5pt">Pick2</td>
<td id="S3.T2.4.1.2.7" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 4.5pt">Avg.</td>
</tr>
<tr id="S3.T2.4.1.3" class="ltx_tr" style="--ltx-bg-color:#F0F0F0;">
<td colspan="9" id="S3.T2.4.1.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding: 0.35pt 4.5pt">Reference: learned EvoHarness-RL policies</td>
</tr>
<tr id="S3.T2.4.1.4" class="ltx_tr">
<td id="S3.T2.4.1.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">EvoHarness-SFT</td>
<td id="S3.T2.4.1.4.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">Full BPE, supervised harness policy</td>
<td id="S3.T2.4.1.4.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">80.0</td>
<td id="S3.T2.4.1.4.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">53.8</td>
<td id="S3.T2.4.1.4.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">88.9</td>
<td id="S3.T2.4.1.4.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">75.0</td>
<td id="S3.T2.4.1.4.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">40.0</td>
<td id="S3.T2.4.1.4.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">62.5</td>
<td id="S3.T2.4.1.4.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">68.6</td>
</tr>
<tr id="S3.T2.4.1.5" class="ltx_tr">
<td id="S3.T2.4.1.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">EvoHarness-RL</td>
<td id="S3.T2.4.1.5.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">Full BPE, SFT init + GRPO optimization</td>
<td id="S3.T2.4.1.5.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">100.0</td>
<td id="S3.T2.4.1.5.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">92.9</td>
<td id="S3.T2.4.1.5.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">95.5</td>
<td id="S3.T2.4.1.5.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">100.0</td>
<td id="S3.T2.4.1.5.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">92.6</td>
<td id="S3.T2.4.1.5.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">100.0</td>
<td id="S3.T2.4.1.5.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">96.9</td>
</tr>
<tr id="S3.T2.4.1.6" class="ltx_tr" style="--ltx-bg-color:#F0F0F0;">
<td colspan="9" id="S3.T2.4.1.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding: 0.35pt 4.5pt">Inference-time BPE ablation on frozen Qwen3-8B</td>
</tr>
<tr id="S3.T2.4.1.7" class="ltx_tr" style="--ltx-bg-color:#FFFFD9;">
<td id="S3.T2.4.1.7.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">EvoHarness-Base</td>
<td id="S3.T2.4.1.7.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">Belief + Progress + Experience</td>
<td id="S3.T2.4.1.7.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">71.4</td>
<td id="S3.T2.4.1.7.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">53.8</td>
<td id="S3.T2.4.1.7.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">63.0</td>
<td id="S3.T2.4.1.7.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">50.0</td>
<td id="S3.T2.4.1.7.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">48.0</td>
<td id="S3.T2.4.1.7.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">41.7</td>
<td id="S3.T2.4.1.7.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">56.4</td>
</tr>
<tr id="S3.T2.4.1.8" class="ltx_tr">
<td id="S3.T2.4.1.8.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">w/o Belief</td>
<td id="S3.T2.4.1.8.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">Remove object/state tracking</td>
<td id="S3.T2.4.1.8.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">74.3</td>
<td id="S3.T2.4.1.8.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">53.8</td>
<td id="S3.T2.4.1.8.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">40.7</td>
<td id="S3.T2.4.1.8.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">75.0</td>
<td id="S3.T2.4.1.8.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">20.0</td>
<td id="S3.T2.4.1.8.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">37.5</td>
<td id="S3.T2.4.1.8.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">50.0</td>
</tr>
<tr id="S3.T2.4.1.9" class="ltx_tr">
<td id="S3.T2.4.1.9.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">w/o Progress</td>
<td id="S3.T2.4.1.9.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 4.5pt">Remove subgoal/progress tracking</td>
<td id="S3.T2.4.1.9.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">68.6</td>
<td id="S3.T2.4.1.9.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">53.8</td>
<td id="S3.T2.4.1.9.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">44.4</td>
<td id="S3.T2.4.1.9.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">68.8</td>
<td id="S3.T2.4.1.9.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">32.0</td>
<td id="S3.T2.4.1.9.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">37.5</td>
<td id="S3.T2.4.1.9.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 4.5pt">50.7</td>
</tr>
<tr id="S3.T2.4.1.10" class="ltx_tr">
<td id="S3.T2.4.1.10.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding: 0.35pt 4.5pt">w/o Experience</td>
<td id="S3.T2.4.1.10.2" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding: 0.35pt 4.5pt">Remove recall, notes, and skill bank</td>
<td id="S3.T2.4.1.10.3" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.5pt">65.7</td>
<td id="S3.T2.4.1.10.4" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.5pt">53.8</td>
<td id="S3.T2.4.1.10.5" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.5pt">40.7</td>
<td id="S3.T2.4.1.10.6" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.5pt">62.5</td>
<td id="S3.T2.4.1.10.7" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.5pt">28.0</td>
<td id="S3.T2.4.1.10.8" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.5pt">41.7</td>
<td id="S3.T2.4.1.10.9" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 4.5pt">48.6</td>
</tr>
</tbody>
</table>

<figcaption>Table 2: BPE component ablation on ALFWorld. The top block provides learned-policy references, while the bottom block removes one component at a time from the Qwen3-8B inference time harness.</figcaption>
</figure>



To isolate the contribution of each BPE component, we ablate one module at a time from the inference-time harness (Table <a href="#S3.T2" class="ltx_ref" title="Table 2 ‣ 3.3 Ablation Results ‣ 3 Experiments ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2</a>). Removing the environment belief disables explicit object tracking, leading to severe performance drops on tasks requiring localization and state verification, such as Clean and Cool. Ablating task progress prevents subgoal commitment, which disproportionately degrades performance on long-horizon tasks with dependent subgoals like Pick2. Finally, disabling reusable experience removes skill recall and mistake avoidance, yielding the lowest overall average success rate (48.6%) and heavily impacting complex state-change tasks like Heat. Ultimately, the absence of any single component significantly harms execution, confirming that Belief, Progress, and Experience function synergistically as a unified state interface rather than as isolated memory tricks.



<figure id="S3.T3" class="ltx_table">

 
<table id="S3.T3.7.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S3.T3.7.1.1" class="ltx_tr">
<th rowspan="2" id="S3.T3.7.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt" style="padding: 0.35pt 5.0pt">Approach</th>
<th rowspan="2" id="S3.T3.7.1.1.2" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_th_row ltx_border_tt" style="padding: 0.35pt 5.0pt">Backbone / Variant</th>
<th colspan="7" id="S3.T3.7.1.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding: 0.35pt 5.0pt">ALFWorld Unseen SR (%)</th>
</tr>
<tr id="S3.T3.7.1.2" class="ltx_tr">
<th id="S3.T3.7.1.2.1" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_t" style="padding: 0.35pt 5.0pt">Pick</th>
<th id="S3.T3.7.1.2.2" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_t" style="padding: 0.35pt 5.0pt">Look</th>
<th id="S3.T3.7.1.2.3" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_t" style="padding: 0.35pt 5.0pt">Clean</th>
<th id="S3.T3.7.1.2.4" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_t" style="padding: 0.35pt 5.0pt">Heat</th>
<th id="S3.T3.7.1.2.5" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_t" style="padding: 0.35pt 5.0pt">Cool</th>
<th id="S3.T3.7.1.2.6" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_t" style="padding: 0.35pt 5.0pt">Pick2</th>
<th id="S3.T3.7.1.2.7" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_t" style="padding: 0.35pt 5.0pt">Avg.</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S3.T3.7.1.3" class="ltx_tr">
<th id="S3.T3.7.1.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding: 0.35pt 5.0pt">ReAct</th>
<th id="S3.T3.7.1.3.2" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t" style="padding: 0.35pt 5.0pt">Qwen3-8B*</th>
<td id="S3.T3.7.1.3.3" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 5.0pt">66.7</td>
<td id="S3.T3.7.1.3.4" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 5.0pt">50.0</td>
<td id="S3.T3.7.1.3.5" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 5.0pt">48.4</td>
<td id="S3.T3.7.1.3.6" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 5.0pt">47.8</td>
<td id="S3.T3.7.1.3.7" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 5.0pt">52.4</td>
<td id="S3.T3.7.1.3.8" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 5.0pt">29.4</td>
<td id="S3.T3.7.1.3.9" class="ltx_td ltx_align_right ltx_border_t" style="padding: 0.35pt 5.0pt">50.0</td>
</tr>
<tr id="S3.T3.7.1.4" class="ltx_tr">
<th id="S3.T3.7.1.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 5.0pt">EvoHarness-Base</th>
<th id="S3.T3.7.1.4.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 5.0pt">Prompt-time harness*</th>
<td id="S3.T3.7.1.4.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">83.3</td>
<td id="S3.T3.7.1.4.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">38.9</td>
<td id="S3.T3.7.1.4.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">87.1</td>
<td id="S3.T3.7.1.4.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">91.3</td>
<td id="S3.T3.7.1.4.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">90.5</td>
<td id="S3.T3.7.1.4.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">58.8</td>
<td id="S3.T3.7.1.4.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">77.6</td>
</tr>
<tr id="S3.T3.7.1.5" class="ltx_tr">
<th id="S3.T3.7.1.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 5.0pt">EvoHarness-SFT</th>
<th id="S3.T3.7.1.5.2" class="ltx_td ltx_align_left ltx_th ltx_th_row" style="padding: 0.35pt 5.0pt">Learned harness calls▴</th>
<td id="S3.T3.7.1.5.3" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">70.8</td>
<td id="S3.T3.7.1.5.4" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">66.7</td>
<td id="S3.T3.7.1.5.5" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">80.6</td>
<td id="S3.T3.7.1.5.6" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">69.6</td>
<td id="S3.T3.7.1.5.7" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">47.6</td>
<td id="S3.T3.7.1.5.8" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">76.5</td>
<td id="S3.T3.7.1.5.9" class="ltx_td ltx_align_right" style="padding: 0.35pt 5.0pt">69.4</td>
</tr>
<tr id="S3.T3.7.1.6" class="ltx_tr" style="--ltx-bg-color:#FFFFD9;">
<th id="S3.T3.7.1.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding: 0.35pt 5.0pt">EvoHarness-RL</th>
<th id="S3.T3.7.1.6.2" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb" style="padding: 0.35pt 5.0pt">SFT init + GRPO optimization▴</th>
<td id="S3.T3.7.1.6.3" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 5.0pt">70.8</td>
<td id="S3.T3.7.1.6.4" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 5.0pt">94.4</td>
<td id="S3.T3.7.1.6.5" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 5.0pt">87.1</td>
<td id="S3.T3.7.1.6.6" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 5.0pt">87.0</td>
<td id="S3.T3.7.1.6.7" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 5.0pt">95.2</td>
<td id="S3.T3.7.1.6.8" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 5.0pt">88.2</td>
<td id="S3.T3.7.1.6.9" class="ltx_td ltx_align_right ltx_border_bb" style="padding: 0.35pt 5.0pt">86.6</td>
</tr>
</tbody>
</table>

<figcaption>Table 3:  Generalization results on ALFWorld unseen tasks. We compare ReAct with prompt-time, SFT, and GRPO-optimized EvoHarness-RL variants.</figcaption>
</figure>





### 3.4 Generalization Analysis



We test EvoHarness-RL on the ALFWorld unseen split (Table <a href="#S3.T3" class="ltx_ref" title="Table 3 ‣ 3.3 Ablation Results ‣ 3 Experiments ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">3</a>). Qwen3-8B ReAct achieves 50.0% success, while the prompt-time BPE harness improves zero-shot performance to 77.6%, showing the benefit of state externalization. EvoHarness-SFT drops to 69.4%, likely because supervised imitation learns teacher harness-use patterns from seen trajectories without optimizing when access is worthwhile in novel environments. In contrast, the full RL-optimized policy reaches 86.6%, suggesting that cost-aware GRPO recalibrates harness access and learns a broadly useful strategy rather than memorizing training environments.









## 4 Analysis of Agent-Harness Evolution Dynamics



We analyze two training dynamics of EvoHarness-RL: policy-side harness annealing and harness-side experience evolution. More detailed analyses are provided in Appendix <a href="#A1" class="ltx_ref" title="Appendix A Training Dynamics ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">A</a>.





### 4.1 Harness Internalization and Annealing

<figure id="S4.F3" class="ltx_figure ltx_align_floatright" style="width:50%;">
<img src="2608.05446v1/harness_calls_by_phase.png" id="S4.F3.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:203/118;" width="203" height="118" alt="Refer to caption" />
<figcaption>Figure 3:  Harness usage anneals during GRPO. The policy starts with frequent cognitive-tool calls, then stabilizes near one harness call per episode. </figcaption>
</figure>



Figure <a href="#S4.F3" class="ltx_ref" title="Figure 3 ‣ 4.1 Harness Internalization and Annealing ‣ 4 Analysis of Agent-Harness Evolution Dynamics ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">3</a> shows a clear annealing pattern during GRPO. The SFT-initialized agent begins with frequent harness calls, using BPE as an explicit scaffold to track state, recall procedures, and narrow the search space toward better trajectories. As RL progresses, usage drops quickly and stabilizes near one call per episode. This suggests that GRPO gradually internalizes routine scaffolded behaviors into the policy, while preserving harness access only when the expected benefit outweighs its step cost. Thus, EvoHarness-RL shifts from scaffolded exploration to selective, cost-aware coordination.







### 4.2 Harness Evolution

<figure id="S4.F4" class="ltx_figure ltx_align_floatright" style="width:50%;">

<figcaption>Figure 4:  Experience-store evolution. The skill bank expands during exploration, then stabilizes into a compact mixture of general, task-specific, mistake-correction, and search-priority skills. </figcaption>
</figure>



Figure <a href="#S4.F4" class="ltx_ref" title="Figure 4 ‣ 4.2 Harness Evolution ‣ 4 Analysis of Agent-Harness Evolution Dynamics ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">4</a> shows how the runtime harness evolves through its cross-episode Experience store. While belief and progress are updated within episodes, Experience is reshaped across episodes through accumulation, consolidation, and forgetting. The skill bank expands rapidly early in training with general strategies, task-specific procedures, common mistakes, and search priorities; later, growth becomes selective as redundant entries are merged, rarely useful skills are evicted, and frequently recalled knowledge is preserved. The final bank remains compact yet diverse, suggesting that the harness becomes a task-adaptive state substrate rather than passive append-only memory. This complements harness annealing: the policy learns when to use external state, while the harness evolves what reusable experience it can provide.









## 5 Related Work



#### Harness Engineering.



The execution capability of an LLM agent is heavily shaped by its external harness, the surrounding framework that determines how it observes, reasons, and uses tools. Early paradigms introduced explicit reasoning and action loops and basic tool augmentation (<a href="#bib.bib23" class="ltx_ref">Yao et al., 2022</a>; <a href="#bib.bib11" class="ltx_ref">Schick et al., 2023</a>), which have since evolved into more complex execution environments with specialized observation renderers, file system access, and execution feedback (<a href="#bib.bib22" class="ltx_ref">Yang et al., 2024</a>; <a href="#bib.bib27" class="ltx_ref">Zhou et al., 2024</a>; <a href="#bib.bib8" class="ltx_ref">Ning et al., 2026</a>). Because these external components are critical to long horizon task success, recent work has increasingly focused on optimizing the harness itself. Frameworks such as Harness-1 externalize search state into environment side memory (<a href="#bib.bib4" class="ltx_ref">Jiang et al., 2026</a>), while Meta-Harness and HarnessX use offline search and trace driven adaptation to discover effective harness configurations (<a href="#bib.bib5" class="ltx_ref">Lee et al., 2026</a>; <a href="#bib.bib1" class="ltx_ref">Chen et al., 2026</a>). However, these approaches largely treat the harness as an environment side construct or a prompt time convention engineered by human developers or offline search algorithms. In contrast, EvoHarness-RL treats harness access as a first class, learnable policy decision. Rather than simply providing the agent with a better fixed scaffold, we train the underlying policy to actively control, query, and coordinate with the external workspace.







#### Memory and Self-Evolving Agents.



Successfully navigating extended interactions requires agents to maintain both within-episode state and cross-episode knowledge. Prior memory-augmented agents have typically focused on the latter, accumulating past trajectories, reflections, or task summaries to inform future episodes (<a href="#bib.bib13" class="ltx_ref">Shinn et al., 2023</a>; <a href="#bib.bib6" class="ltx_ref">Li et al., 2025</a>). Because raw episodic logs are often noisy, later systems increasingly distill experience into structured procedural memory, such as workflows, code libraries, or reusable skills (<a href="#bib.bib17" class="ltx_ref">Wang et al., 2024</a>; <a href="#bib.bib18" class="ltx_ref">Wang et al., 2025</a>). Recent advances further suggest that these experience repositories must be actively curated, refined, consolidated, or forgotten, rather than treated as append-only logs (<a href="#bib.bib21" class="ltx_ref">Xia et al., 2026</a>; <a href="#bib.bib10" class="ltx_ref">Ouyang et al., 2026</a>). However, existing self-evolving agents generally separate cross-episode skill curation from real-time within-episode state tracking, such as maintaining environmental belief and monitoring subgoal progress. EvoHarness-RL addresses this limitation by abstracting the external workspace into a unified BPE (Belief, Progress, Experience) interface. This design enables the policy to evolve not only how it uses long-term experience, but also how it synchronizes that experience with active environmental belief and execution progress, leading to the dynamic we call harness evolution.









## 6 Conclusion



We introduced We introduced EvoHarness-RL, a trainable coordination layer that teaches long-horizon agents to construct and use external harness states. By organizing the workspace into Belief, Progress, and Experience, and optimizing when to query, update, and consolidate it, EvoHarness-RL turns harness use from a manual prompting convention into a learned runtime policy. Results on ALFWorld show that cost-aware agent-harness coordination improves task success and reveals useful dynamics of harness annealing and evolution.







## References

- Chen et al. (2026)  Tingyang Chen, Shuo Lu, Kang Zhao, Weicheng Meng, Hanlin Teng, Tianhao Li, Chao Li, Xule Liu, Jian Liang, Zhizhong Zhang, et al.  Harnessx: A composable, adaptive, and evolvable agent harness foundry.  *arXiv preprint arXiv:2606.14249*, 2026. 
- Fang et al. (2026)  Runnan Fang, Yuan Liang, Xiaobin Wang, Jialong Wu, Shuofei Qiao, Pengjun Xie, Fei Huang, Huajun Chen, and Ningyu Zhang.  Memp: Exploring agent procedural memory.  In *Findings of the Association for Computational Linguistics: ACL 2026*, pages 17490–17502, 2026. 
- Hong et al. (2026)  Yining Hong, Rui Sun, Bingxuan Li, Xingcheng Yao, Maxine Wu, Alexander Chien, Da Yin, Ying Nian Wu, Zhecan Wang, and Kai-Wei Chang.  Embodied web agents: Bridging physical-digital realms for integrated agent intelligence.  *Advances in Neural Information Processing Systems*, 38, 2026. 
- Jiang et al. (2026)  Pengcheng Jiang, Zhiyi Shi, Kelly Hong, Xueqiang Xu, Jiashuo Sun, Jimeng Sun, Hammad Bashir, and Jiawei Han.  Harness-1: Reinforcement learning for search agents with state-externalizing harnesses.  *arXiv preprint arXiv:2606.02373*, 2026. 
- Lee et al. (2026)  Yoonho Lee, Roshen Nair, Qizheng Zhang, Kangwook Lee, Omar Khattab, and Chelsea Finn.  Meta-harness: End-to-end optimization of model harnesses.  *arXiv preprint arXiv:2603.28052*, 2026. 
- Li et al. (2025)  Yangning Li, Weizhi Zhang, Yuyao Yang, Wei-Chieh Huang, Yaozu Wu, Junyu Luo, Yuanchen Bei, Henry Peng Zou, Xiao Luo, Yusheng Zhao, et al.  A survey of rag-reasoning systems in large language models.  In *Findings of the Association for Computational Linguistics: EMNLP 2025*, pages 12120–12145, 2025. 
- Lou et al. (2026)  Xinghua Lou, Miguel Lázaro-Gredilla, Antoine Dedieu, Carter Wendelken, Wolfgang Lehrach, and Kevin P Murphy.  Autoharness: improving llm agents by automatically synthesizing a code harness.  *arXiv preprint arXiv:2603.03329*, 2026. 
- Ning et al. (2026)  Xuying Ning, Katherine Tieu, Dongqi Fu, Tianxin Wei, Zihao Li, Yuanchen Bei, Jiaru Zou, Mengting Ai, Zhining Liu, Ting-Wei Li, et al.  Code as agent harness.  *arXiv preprint arXiv:2605.18747*, 2026. 
- Ouyang et al. (2025)  Siru Ouyang, Jun Yan, I Hsu, Yanfei Chen, Ke Jiang, Zifeng Wang, Rujun Han, Long T Le, Samira Daruki, Xiangru Tang, et al.  Reasoningbank: Scaling agent self-evolving with reasoning memory.  *arXiv preprint arXiv:2509.25140*, 2025. 
- Ouyang et al. (2026)  Siru Ouyang, Jun Yan, Yanfei Chen, Rujun Han, Zifeng Wang, Bhavana Dalvi Mishra, Rui Meng, Chun-Liang Li, Yizhu Jiao, Kaiwen Zha, et al.  Skillos: Learning skill curation for self-evolving agents.  *arXiv preprint arXiv:2605.06614*, 2026. 
- Schick et al. (2023)  Timo Schick, Jane Dwivedi-Yu, Roberto Dessì, Roberta Raileanu, Maria Lomeli, Eric Hambro, Luke Zettlemoyer, Nicola Cancedda, and Thomas Scialom.  Toolformer: Language models can teach themselves to use tools.  *Advances in neural information processing systems*, 36:68539–68551, 2023. 
- Shao et al. (2024)  Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, YK Li, Yang Wu, et al.  Deepseekmath: Pushing the limits of mathematical reasoning in open language models.  *arXiv preprint arXiv:2402.03300*, 2024. 
- Shinn et al. (2023)  Noah Shinn, Federico Cassano, Ashwin Gopinath, Karthik Narasimhan, and Shunyu Yao.  Reflexion: Language agents with verbal reinforcement learning.  *Advances in neural information processing systems*, 36:8634–8652, 2023. 
- Shridhar et al. (2021)  Mohit Shridhar, Xingdi Yuan, Marc-Alexandre Côté, Yonatan Bisk, Adam Trischler, and Matthew Hausknecht.  ALFWorld: Aligning text and embodied environments for interactive learning.  In *International Conference on Learning Representations*, 2021.  <a href="https://openreview.net/forum?id=0IOX0YcCdTn" class="ltx_ref ltx_url ltx_font_typewriter">https://openreview.net/forum?id=0IOX0YcCdTn</a>. 
- Singh et al. (2026)  Joykirat Singh, Zaid Khan, Archiki Prasad, Justin Chih-Yao Chen, Akshay Nambi, Hyunji Lee, Elias Stengel-Eskin, and Mohit Bansal.  Agent-brace: Decoupling beliefs from actions in long-horizon tasks via verbalized state uncertainty.  *arXiv preprint arXiv:2605.11436*, 2026. 
- Suzgun et al. (2026)  Mirac Suzgun, Mert Yuksekgonul, Federico Bianchi, Dan Jurafsky, and James Zou.  Dynamic cheatsheet: Test-time learning with adaptive memory.  In *Proceedings of the 19th Conference of the European Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)*, pages 7080–7106, 2026. 
- Wang et al. (2024)  Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, and Anima Anandkumar.  Voyager: An open-ended embodied agent with large language models.  *Transactions on Machine Learning Research*, 2024.  ISSN 2835-8856.  <a href="https://openreview.net/forum?id=ehfRiF0R3a" class="ltx_ref ltx_url ltx_font_typewriter">https://openreview.net/forum?id=ehfRiF0R3a</a>. 
- Wang et al. (2025)  Jiayu Wang, Yifei Ming, Riya Dulepet, Qinglin Chen, Austin Xu, Zixuan Ke, Frederic Sala, Aws Albarghouthi, Caiming Xiong, and Shafiq Joty.  Liveresearchbench: A live benchmark for user-centric deep research in the wild.  *arXiv preprint arXiv:2510.14240*, 2025. 
- Wang et al. (2026)  Taiyi Wang, Sian Gooding, Florian Hartmann, Oriana Riva, and Edward Grefenstette.  A subgoal-driven framework for improving long-horizon llm agents.  *arXiv preprint arXiv:2603.19685*, 2026. 
- Wei et al. (2025)  Tianxin Wei, Noveen Sachdeva, Benjamin Coleman, Zhankui He, Yuanchen Bei, Xuying Ning, Mengting Ai, Yunzhe Li, Jingrui He, Ed H Chi, et al.  Evo-memory: Benchmarking llm agent test-time learning with self-evolving memory.  *arXiv preprint arXiv:2511.20857*, 2025. 
- Xia et al. (2026)  Peng Xia, Jianwen Chen, Hanyang Wang, Jiaqi Liu, Kaide Zeng, Yu Wang, Siwei Han, Yiyang Zhou, Xujiang Zhao, Haifeng Chen, et al.  Skillrl: Evolving agents via recursive skill-augmented reinforcement learning.  *arXiv preprint arXiv:2602.08234*, 2026. 
- Yang et al. (2024)  John Yang, Carlos Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, and Ofir Press.  Swe-agent: Agent-computer interfaces enable automated software engineering.  *Advances in Neural Information Processing Systems*, 37:50528–50652, 2024. 
- Yao et al. (2022)  Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, and Yuan Cao.  React: Synergizing reasoning and acting in language models.  *arXiv preprint arXiv:2210.03629*, 2022. 
- Young (2025)  Justin Young.  Effective harnesses for long-running agents.  Anthropic Engineering Blog, November 2025.  <a href="https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents" class="ltx_ref ltx_url ltx_font_typewriter">https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents</a>.  Accessed: 2026-05-11. 
- Zhang et al. (2025)  Qizheng Zhang, Changran Hu, Shubhangi Upasani, Boyuan Ma, Fenglu Hong, Vamsidhar Kamanuru, Jay Rainton, Chen Wu, Mengmeng Ji, Hanchen Li, et al.  Agentic context engineering: Evolving contexts for self-improving language models.  *arXiv preprint arXiv:2510.04618*, 2025. 
- Zhao et al. (2024)  Andrew Zhao, Daniel Huang, Quentin Xu, Matthieu Lin, Yong-Jin Liu, and Gao Huang.  Expel: Llm agents are experiential learners.  In *Proceedings of the AAAI Conference on Artificial Intelligence*, volume 38, pages 19632–19642, 2024. 
- Zhou et al. (2024)  Shuyan Zhou, Frank F Xu, Hao Zhu, Xuhui Zhou, Robert Lo, Abishek Sridhar, Xianyi Cheng, Tianyue Ou, Yonatan Bisk, Daniel Fried, et al.  Webarena: A realistic web environment for building autonomous agents.  In *International Conference on Learning Representations*, volume 2024, pages 15585–15606, 2024. 













## Appendix A Training Dynamics



We provide additional analyses of learned agent–harness coordination by decomposing harness usage by action type and comparing the training reward trajectory against standard GRPO.



<figure id="A1.F5" class="ltx_figure ltx_align_floatright" style="width:42%;">

<figcaption>Figure 5:  Action-specific harness annealing. Different BPE actions decay at different rates, while the success rate is still rising. </figcaption>
</figure>



#### Action-specific harness annealing.



Figure <a href="#A1.F5" class="ltx_ref" title="Figure 5 ‣ Appendix A Training Dynamics ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">5</a> shows that different BPE actions are not pruned uniformly during training. The policy initially uses all harness actions, consistent with the SFT scaffold where the agent frequently queries experience, tracks state, commits progress, and writes notes. During GRPO, however, these actions are selectively retained. Recall remains the most persistent action, indicating that cross-episode experience continues to provide useful search priors even after many routine behaviors are internalized. In contrast, commit and note rapidly decay toward zero, suggesting that the policy no longer needs to externalize every intermediate plan or write frequent new insights once stable task strategies emerge. Track follows an intermediate pattern: it is useful for early state disambiguation, but gradually decreases as the agent learns more direct environment-interaction patterns.





This action-level pattern is environment-dependent. In ALFWorld, tasks share reusable household procedures and object-search priors, making the Experience component especially valuable. In more visually grounded embodied environments, the agent may rely more heavily on Belief to maintain scene graphs, object states, or spatial relations. In software-engineering or workflow environments, Progress may become more important for tracking subtasks, test status, dependency resolution, and unfinished branches. Therefore, EvoHarness-RL should not be interpreted as learning a fixed universal harness-action distribution. Instead, it learns which parts of BPE are worth accessing under the cost structure and state demands of a given environment.



<figure id="A1.F6" class="ltx_figure ltx_align_floatright" style="width:42%;">

<figcaption>Figure 6:  Training reward dynamics. EvoHarness-RL achieves higher reward than standard GRPO throughout training, suggesting more efficient agent–harness coordination. </figcaption>
</figure>





#### Reward improvement during coordination learning.



Figure <a href="#A1.F6" class="ltx_ref" title="Figure 6 ‣ Action-specific harness annealing. ‣ Appendix A Training Dynamics ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">6</a> shows that EvoHarness-RL consistently outperforms standard GRPO during training. Its reward increases faster and reaches a higher plateau, while standard GRPO improves more slowly and remains substantially lower. Together with the action-specific annealing pattern in Figure <a href="#A1.F5" class="ltx_ref" title="Figure 5 ‣ Appendix A Training Dynamics ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">5</a>, this suggests that the reduction in harness calls is not caused by policy collapse or failure to use the harness. Rather, the agent learns to use the harness more selectively: BPE first serves as a scaffold for exploration and state management, and GRPO then encourages the policy to internalize recurring scaffolded behaviors while preserving selective access to the most useful external state.









## Appendix B Qualitative Case Study



We provide a qualitative ALFWorld trajectory to illustrate how the learned policy coordinates with the BPE harness during long-horizon execution. In this task, the agent must clean a kettle and place it on the dining table. The trajectory shows a natural commit $`\rightarrow`$ recall $`\rightarrow`$ act $`\rightarrow`$ note loop: the agent first commits to the subgoal of finding the kettle, recalls task and object-location priors from the skill bank, verifies these priors through environment interaction, and then writes corrective evidence when the recalled hint is stale. Although the skill bank suggests that the kettle is on a countertop, the agent does not blindly follow this prior after repeated failed searches; instead, it explores stoveburners, finds the kettle, and records that the recalled hint was incorrect. The case study shows that the harness is used as a source of reusable but revisable experience rather than as a fixed oracle, enabling the agent to combine cross-episode priors with current-episode grounding and self-correction.













## Appendix C Implementation Details



This section records the concrete implementation choices used in our ALFWorld experiments. We follow the BPE interface and cost-aware optimization objective defined in Section <a href="#S2" class="ltx_ref" title="2 Method ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2</a>, and focus here on details needed to reproduce the system.





#### Model roles.



The trainable policy is Qwen3-8B. It is the only model updated during SFT and GRPO, and the only model executed inside the rollout loop. At each step, the policy emits a response in the form \<think\>...\</think\>\<action\>...\</action\>; the parsed action is then dispatched either to ALFWorld or to the BPE harness. We use Claude Opus as the teacher for SFT trajectory collection and as the consolidation model for the experience store. During GRPO, consolidation is run outside the rollout loop at epoch boundaries, so the policy rollout itself remains a Qwen3-8B interaction with the environment and the current harness state.







#### Action parsing and execution.



The environment wrapper first extracts the content inside the \<action\> tag. If the action matches an admissible ALFWorld command, it is executed in the environment. Otherwise, the wrapper checks whether it matches one of the harness-action patterns, such as track \[object\], commit \[subgoal\], recall \[query\], or note \[insight\]. Malformed outputs, missing action tags, or actions outside both spaces return failure feedback and are counted by the invalid-action penalty. We disable the base trainer’s built-in invalid-action penalty and apply all reward shaping in our own reward function.







#### Harness grounding.



The ALFWorld harness is implemented with lightweight deterministic components whenever possible. The belief tracker is a rule-based parser over action–observation pairs; it updates object state flags and object-location relations without an LLM call. The progress tracker keeps a bounded committed-plan list and updates it only when the policy emits commit. The experience store uses keyword-overlap retrieval for recall, increments usage counts for retrieved entries, and buffers note outputs for later consolidation. Successful object pickup actions also update the object-location priority map. Each skill category is capacity-bounded and uses LFU eviction, so frequently recalled entries are retained while rarely used entries are removed.







#### SFT data construction.



We collect SFT data by running the teacher model with the same BPE action interface on 500 ALFWorld training games and keeping only successful episodes. This yields 87 trajectories and 1,153 next-action conversation pairs, with an average length of 26.5 turns per episode. The data covers all six ALFWorld task families: pick-two (28), pick-place (17), clean (15), heat (11), light (8), and cool (8). Each example contains the task objective, current observation, admissible commands, recent action history, and active harness views, while the target is the teacher’s next \<think\> and \<action\> response. The teacher uses 405 harness calls in total, about 18% of all turns, distributed as commit (202), recall (114), note (55), and track (34). The resulting SFT checkpoint initializes GRPO, and the experience store accumulated during collection is used as the initial skill bank.







#### GRPO training.



GRPO starts from the SFT checkpoint and samples multiple trajectories per prompt. Rewards are normalized within each group, and the policy is optimized with a KL penalty to the SFT reference. During rollout collection, trajectory summaries and note buffers are accumulated but not consolidated immediately. At the end of each epoch, the consolidation model updates the experience store from the buffered evidence. This keeps the skill bank stable within a rollout batch while still allowing cross-episode harness evolution over training. The detailed configuration is provided in the Table <a href="#A3.T4" class="ltx_ref" title="Table 4 ‣ GRPO training. ‣ Appendix C Implementation Details ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">4</a>.



<figure id="A3.T4" class="ltx_table">
<table id="A3.T4.2" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<tbody class="ltx_tbody">
<tr id="A3.T4.2.1" class="ltx_tr">
<th id="A3.T4.2.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_tt">Setting</th>
<td id="A3.T4.2.1.2" class="ltx_td ltx_align_left ltx_border_tt">Value</td>
</tr>
<tr id="A3.T4.2.2" class="ltx_tr">
<th id="A3.T4.2.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">Environment</th>
<td id="A3.T4.2.2.2" class="ltx_td ltx_align_left ltx_border_t">ALFWorld</td>
</tr>
<tr id="A3.T4.2.3" class="ltx_tr">
<th id="A3.T4.2.3.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Task families</th>
<td id="A3.T4.2.3.2" class="ltx_td ltx_align_left">Pick, Look, Clean, Heat, Cool, Pick2</td>
</tr>
<tr id="A3.T4.2.4" class="ltx_tr">
<th id="A3.T4.2.4.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Policy model</th>
<td id="A3.T4.2.4.2" class="ltx_td ltx_align_left">Qwen3-8B</td>
</tr>
<tr id="A3.T4.2.5" class="ltx_tr">
<th id="A3.T4.2.5.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Teacher / consolidation model</th>
<td id="A3.T4.2.5.2" class="ltx_td ltx_align_left">Claude Opus</td>
</tr>
<tr id="A3.T4.2.6" class="ltx_tr">
<th id="A3.T4.2.6.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Policy output format</th>
<td id="A3.T4.2.6.2" class="ltx_td ltx_align_left">&lt;think&gt;...&lt;/think&gt;&lt;action&gt;...&lt;/action&gt;</td>
</tr>
<tr id="A3.T4.2.7" class="ltx_tr">
<th id="A3.T4.2.7.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Max episode steps <em>T</em><sub>max</sub></th>
<td id="A3.T4.2.7.2" class="ltx_td ltx_align_left">70</td>
</tr>
<tr id="A3.T4.2.8" class="ltx_tr">
<th id="A3.T4.2.8.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Belief tracker</th>
<td id="A3.T4.2.8.2" class="ltx_td ltx_align_left">Rule-based action–observation parser</td>
</tr>
<tr id="A3.T4.2.9" class="ltx_tr">
<th id="A3.T4.2.9.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Belief edge capacity</th>
<td id="A3.T4.2.9.2" class="ltx_td ltx_align_left">48</td>
</tr>
<tr id="A3.T4.2.10" class="ltx_tr">
<th id="A3.T4.2.10.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Progress cap |<em>C</em><sub><em>t</em></sub>|</th>
<td id="A3.T4.2.10.2" class="ltx_td ltx_align_left">8 subgoals</td>
</tr>
<tr id="A3.T4.2.11" class="ltx_tr">
<th id="A3.T4.2.11.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Recall top-<em>k</em><sub>rec</sub></th>
<td id="A3.T4.2.11.2" class="ltx_td ltx_align_left">3 per category</td>
</tr>
<tr id="A3.T4.2.12" class="ltx_tr">
<th id="A3.T4.2.12.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Experience categories</th>
<td id="A3.T4.2.12.2" class="ltx_td ltx_align_left">General, task-specific, mistakes, search priors</td>
</tr>
<tr id="A3.T4.2.13" class="ltx_tr">
<th id="A3.T4.2.13.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Experience capacity <em>K</em><sub>max</sub></th>
<td id="A3.T4.2.13.2" class="ltx_td ltx_align_left">80 per category</td>
</tr>
<tr id="A3.T4.2.14" class="ltx_tr">
<th id="A3.T4.2.14.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Skill eviction</th>
<td id="A3.T4.2.14.2" class="ltx_td ltx_align_left">LFU by usage count</td>
</tr>
<tr id="A3.T4.2.15" class="ltx_tr">
<th id="A3.T4.2.15.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Initial skill usage count</th>
<td id="A3.T4.2.15.2" class="ltx_td ltx_align_left">1</td>
</tr>
<tr id="A3.T4.2.16" class="ltx_tr">
<th id="A3.T4.2.16.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">RL algorithm</th>
<td id="A3.T4.2.16.2" class="ltx_td ltx_align_left ltx_border_t">GRPO</td>
</tr>
<tr id="A3.T4.2.17" class="ltx_tr">
<th id="A3.T4.2.17.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Initialization <em>π</em><sub>ref</sub></th>
<td id="A3.T4.2.17.2" class="ltx_td ltx_align_left">SFT checkpoint</td>
</tr>
<tr id="A3.T4.2.18" class="ltx_tr">
<th id="A3.T4.2.18.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Group size <em>G</em></th>
<td id="A3.T4.2.18.2" class="ltx_td ltx_align_left">8</td>
</tr>
<tr id="A3.T4.2.19" class="ltx_tr">
<th id="A3.T4.2.19.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Prompts per step</th>
<td id="A3.T4.2.19.2" class="ltx_td ltx_align_left">16</td>
</tr>
<tr id="A3.T4.2.20" class="ltx_tr">
<th id="A3.T4.2.20.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Trajectories per step</th>
<td id="A3.T4.2.20.2" class="ltx_td ltx_align_left">128</td>
</tr>
<tr id="A3.T4.2.21" class="ltx_tr">
<th id="A3.T4.2.21.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Total epochs / annealing horizon <em>U</em></th>
<td id="A3.T4.2.21.2" class="ltx_td ltx_align_left">150</td>
</tr>
<tr id="A3.T4.2.22" class="ltx_tr">
<th id="A3.T4.2.22.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Optimizer</th>
<td id="A3.T4.2.22.2" class="ltx_td ltx_align_left">AdamW</td>
</tr>
<tr id="A3.T4.2.23" class="ltx_tr">
<th id="A3.T4.2.23.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Learning rate</th>
<td id="A3.T4.2.23.2" class="ltx_td ltx_align_left">1 × 10<sup>−6</sup></td>
</tr>
<tr id="A3.T4.2.24" class="ltx_tr">
<th id="A3.T4.2.24.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">KL coefficient <em>β</em></th>
<td id="A3.T4.2.24.2" class="ltx_td ltx_align_left">0.01</td>
</tr>
<tr id="A3.T4.2.25" class="ltx_tr">
<th id="A3.T4.2.25.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Gradient clipping</th>
<td id="A3.T4.2.25.2" class="ltx_td ltx_align_left">1.0</td>
</tr>
<tr id="A3.T4.2.26" class="ltx_tr">
<th id="A3.T4.2.26.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Max prompt length</th>
<td id="A3.T4.2.26.2" class="ltx_td ltx_align_left">12,288 tokens</td>
</tr>
<tr id="A3.T4.2.27" class="ltx_tr">
<th id="A3.T4.2.27.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Max response length</th>
<td id="A3.T4.2.27.2" class="ltx_td ltx_align_left">512 tokens</td>
</tr>
<tr id="A3.T4.2.28" class="ltx_tr">
<th id="A3.T4.2.28.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Inference engine</th>
<td id="A3.T4.2.28.2" class="ltx_td ltx_align_left">vLLM, TP=4</td>
</tr>
<tr id="A3.T4.2.29" class="ltx_tr">
<th id="A3.T4.2.29.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Hardware</th>
<td id="A3.T4.2.29.2" class="ltx_td ltx_align_left">8 NVIDIA H200 GPUs</td>
</tr>
<tr id="A3.T4.2.30" class="ltx_tr">
<th id="A3.T4.2.30.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_t">Success reward scale</th>
<td id="A3.T4.2.30.2" class="ltx_td ltx_align_left ltx_border_t">10.0</td>
</tr>
<tr id="A3.T4.2.31" class="ltx_tr">
<th id="A3.T4.2.31.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Efficiency weight <em>λ</em><sub>eff</sub></th>
<td id="A3.T4.2.31.2" class="ltx_td ltx_align_left">1.0</td>
</tr>
<tr id="A3.T4.2.32" class="ltx_tr">
<th id="A3.T4.2.32.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Max diversity weight <em>λ</em><sub>div</sub><sup>max</sup></th>
<td id="A3.T4.2.32.2" class="ltx_td ltx_align_left">0.5</td>
</tr>
<tr id="A3.T4.2.33" class="ltx_tr">
<th id="A3.T4.2.33.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Spam penalty weight <em>λ</em><sub>spam</sub></th>
<td id="A3.T4.2.33.2" class="ltx_td ltx_align_left">0.1</td>
</tr>
<tr id="A3.T4.2.34" class="ltx_tr">
<th id="A3.T4.2.34.1" class="ltx_td ltx_align_left ltx_th ltx_th_row">Spam penalty cap</th>
<td id="A3.T4.2.34.2" class="ltx_td ltx_align_left">10</td>
</tr>
<tr id="A3.T4.2.35" class="ltx_tr">
<th id="A3.T4.2.35.1" class="ltx_td ltx_align_left ltx_th ltx_th_row ltx_border_bb">Invalid-action penalty <em>λ</em><sub>inv</sub></th>
<td id="A3.T4.2.35.2" class="ltx_td ltx_align_left ltx_border_bb">0.1</td>
</tr>
</tbody>
</table>
<figcaption>Table 4: Implementation and training hyperparameters for EvoHarness-RL on ALFWorld.</figcaption>
</figure>







## Appendix D Prompts



We reproduce the key prompts that instantiate the BPE harness on ALFWorld. They fall into two families: the runtime harness prompt that the policy $`\pi_{\theta}`$ sees at every step (defining how $`\mathcal{A}_{\mathrm{bpe}}`$ is exposed), and the consolidation prompt that the summarizer LLM uses to evolve the experience store $`E_{t}`$ at epoch boundaries. Both the SFT teacher and the GRPO policy see the same runtime prompt, and both the SFT-time and GRPO-time skill consolidation go through the same experience-store interface, so the two stages are prompt-consistent by construction. We lightly abridge the verbatim text to fit the page.





### D.1 Runtime Harness Prompt



The system prompt below defines both the environment action set $`\mathcal{A}_{\mathrm{env}}`$ and the four harness meta-actions $`\mathcal{A}_{\mathrm{bpe}}=\{{\color[rgb]{0.6484,0.4492,0.0977}\textbf{commit}},{\color[rgb]{0.6484,0.4492,0.0977}\textbf{track}},{\color[rgb]{0.6484,0.4492,0.0977}\textbf{recall}},{\color[rgb]{0.6484,0.4492,0.0977}\textbf{note}}\}`$, grounding commit to Progress $`P_{t}`$, track to Belief $`B_{t}`$, and recall/note to Experience $`E_{t}`$. It also encodes when each action should be used, including the mandatory note conditions that drive experience writing when recalled hints are empty or stale.











At each step the policy additionally receives a per-turn user message carrying the current context $`x_{t}`$ and the rendered harness views $`h_{t}`$ (the committed plan, the last recalled hints, and any track/recall results):













### D.2 Experience-Store Consolidation Prompts



All prompts in this subsection are executed by the external summarizer LLM, not by the policy. The *note-consolidation* prompt is the online path: buffered note insights are not written to $`E_{t}`$ directly; at each consolidation point the summarizer receives the recent notes plus a compact view of the existing skill bank and decides, per note, whether to add, update, remove, or skip a skill. This is the mechanism by which policy-written evidence is turned into structured, deduplicated, and self-correcting skills (including removal of stale priors), realizing the co-adaptive experience loop of Section <a href="#S2" class="ltx_ref" title="2 Method ‣ EvoHarness-RL: Learning Self-Evolving Runtime Harness for Long-Horizon LLM Agents">2</a>. The remaining four *batch-induction* prompts seed the initial skill bank $`E^{\mathrm{SFT}}`$ and periodically rebuild whole categories from accumulated trajectory batches. All five share the JSON-only output convention and populate the four categories of $`S_{t}`$.











































Experimental support, please <a href="./2608.05446v1/__stdout.txt" class="ltx_ref" target="_blank" rel="nofollow">view the build logs</a> for errors. Generated by <a href="https://math.nist.gov/~BMiller/LaTeXML/" class="ltx_ref ltx_LaTeXML_logo" target="_blank"> L A T E  xml </a> .





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


