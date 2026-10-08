---
title: "Harness Continual Learning: Continual Adaptation Beyond Model Parameters"
source: "https://arxiv.org/abs/2608.19013"
author: "Borui Kang, Jinrui Gu, Junhan Lv, Wenbin Li, Lei Wang, Yang Gao"
published: 2026-08
created: 2026-10-09
description:
tags:
  - "clippings"
---

<img src="2608.19013v1/logo.png" id="g1" class="ltx_graphics ltx_img_square" style="aspect-ratio:16/17;" width="16" height="17" alt="[Uncaptioned image]" /> Harness Continual Learning: Continual\
Adaptation Beyond Model Parameters
======================================================================================================================================================================================================================================================================================================================================================================================



 Borui Kang  Affiliation: State Key Laboratory for Novel Software Technology, Nanjing University, China     Jinrui Gu  Affiliation: State Key Laboratory for Novel Software Technology, Nanjing University, China     Junhan Lv  Affiliation: State Key Laboratory for Novel Software Technology, Nanjing University, China     Wenbin Li <sup>†</sup><sup>†</sup>thanks: Corresponding author Affiliation: State Key Laboratory for Novel Software Technology, Nanjing University, China     Lei Wang  Affiliation: University of Wollongong, Australia     Yang Gao  Affiliation: State Key Laboratory for Novel Software Technology, Nanjing University, China 





###### Abstract

Continual learning has largely been model-centric, treating model parameters as the state that changes with sequential experience. Modern agents can also adapt through a harness of prompts, memories, tools, skills, and routing rules. Because these contents jointly shape later execution, a harness update can disrupt previously reliable behavior even when the model is frozen. This raises a new question: how can an agent continually improve its state outside the model while retaining behavior acquired earlier? We formulate *Harness Continual Learning* (HCL), a new continual learning paradigm in which the harness evolves around a frozen foundation model, and define the resulting loss of earlier behavior as *harness-level forgetting*. We instantiate HCL with four execution-facing components: the Task Interface, Experience Memory, Capability Map, and Adaptive Router. We further introduce *guarded harness evolution* to separate update generation from state commitment. A Continual Optimizer proposes candidate harnesses from post-execution feedback, and a Continual Evaluator commits the resulting candidate harness only after checking current improvement, historical retention, and validity. Experiments on textual reasoning, multimodal perception, and open-world interaction demonstrate capability accumulation and failure recovery, with relative gains exceeding 10% over corresponding baselines in multiple settings. Component ablations assess the contribution of each harness component, while controlled retention sweeps reveal measurable harness-level forgetting and show that the stability–plasticity trade-off can be explicitly adjusted.





|  |
|----|
|  |





## 1 Introduction



Continual learning studies how a system acquires capabilities from sequential experience while retaining previously learned behavior (<a href="#bib.bib19" class="ltx_ref">Delange et al., 2022</a>; <a href="#bib.bib17" class="ltx_ref">Wang et al., 2024b</a>; <a href="#bib.bib18" class="ltx_ref">Shi et al., 2025</a>). Existing formulations realize this process mainly by changing model parameters, representations, or architectural components. We refer to this established view as *model-centric continual learning*.





The rise of agentic AI introduces another source of adaptation: an external *harness* that determines how a foundation model receives information, retrieves experience, and acts (<a href="#bib.bib6" class="ltx_ref">Jimenez et al., 2024</a>; <a href="#bib.bib12" class="ltx_ref">Xie et al., 2024</a>; <a href="#bib.bib20" class="ltx_ref">Xu et al., 2025</a>; <a href="#bib.bib1" class="ltx_ref">Chen et al., 2025</a>; <a href="#bib.bib13" class="ltx_ref">Li et al., 2026a</a>; <a href="#bib.bib16" class="ltx_ref">Meng et al., 2026</a>). Prompts, memories, tool and skill specifications, and routing policies can persist and evolve across interactions even when the foundation model remains frozen. Agent adaptation is therefore no longer confined to model state: harness state can also accumulate experience and reshape future behavior. *This makes the harness a new object of continual learning research, extending the study of continual adaptation beyond model parameters*, as illustrated in Figure <a href="#S1.F1" class="ltx_ref" title="Figure 1 ‣ 1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">1</a>.



<figure id="S1.F1" class="ltx_figure">
<img src="2608.19013v1/intro.png" id="S1.F1.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:548/221;" width="548" height="221" alt="Refer to caption" />
<figcaption>Figure 1:  The shift in the object of continual learning. Model-centric methods update model parameters <em>θ</em> over sequential experience. HCL instead updates harness state around a frozen foundation model. In both settings, adaptation can improve new behavior while interfering with behavior acquired earlier.</figcaption>
</figure>



We formalize this new direction as *Harness Continual Learning* (HCL), a continual learning paradigm that acquires and retains capabilities by sequentially updating harness state around a frozen foundation model. Conventional harness optimization typically searches for prompts, functions, or workflows that improve a current objective (<a href="#bib.bib41" class="ltx_ref">Zhang et al., 2024</a>; <a href="#bib.bib42" class="ltx_ref">Zhang et al., 2025</a>). HCL instead studies a sequence of updates. Its concern is not only whether the next update helps the current interaction, but also whether the evolving harness retains behavior that earlier updates made reliable. This setting introduces a distinct retention problem. Harness components are coupled in execution: a memory update can change the evidence retrieved for an earlier query; a skill revision can alter tool use; and a routing edit can break a previously successful workflow. An update that helps recent cases can therefore turn an earlier correct answer, valid tool call, or successful action trajectory into a failure without changing the foundation model. We call this phenomenon *harness-level forgetting*. It extends the classical stability–plasticity problem from model state to harness state.





To study continual adaptation under this retention requirement, we develop an HCL framework with two parts. First, we define the Task Interface, Experience Memory, Capability Map, and Adaptive Router as the harness state and learning object of HCL. These components are jointly versioned and determine how the agent processes information, reuses experience and capabilities, and organizes execution. Second, guarded harness evolution governs state transitions through two modules: a Continual Optimizer that proposes candidate harnesses from post-execution feedback, and a Continual Evaluator that determines whether those candidates can be committed. The two parts jointly operationalize HCL: the former defines what is learned, while the latter controls how the harness is updated over time. Only a candidate harness that improves current validation performance while satisfying the historical-retention budget and validity constraints is committed as the deployed state. This proposal–evaluation–commitment process makes retention an explicit condition of harness adaptation, mitigating harness-level forgetting while controlling the stability–plasticity trade-off.





We evaluate HCL across textual reasoning, multimodal perception, and open-world interaction. The results show that harness evolution can accumulate capabilities and support failure recovery, while also producing measurable harness-level forgetting. Historical-retention budgets shift the operating point between adaptation and retention, and more permissive updates do not necessarily produce a stronger final harness. In this work, our contributions are as follows:

- •
  

  We propose and formalize *Harness Continual Learning* as a new continual learning paradigm, shifting the learning object from model state to harness state around a frozen foundation model.

  
- •
  

  We identify *harness-level forgetting* and develop *guarded harness evolution*, in which a Continual Optimizer proposes candidate harnesses and a Continual Evaluator controls commitment through current, historical, and validity checks.

  
- •
  

  We show across textual reasoning, multimodal perception, and open-world interaction that harness evolution supports capability accumulation and failure recovery while exhibiting measurable forgetting and a controllable stability–plasticity trade-off.

  







## 2 Related Work



### 2.1 Harness Engineering



Contemporary agent systems place a runtime harness around a foundation model to turn inference into task-directed execution (<a href="#bib.bib13" class="ltx_ref">Li et al., 2026a</a>; <a href="#bib.bib16" class="ltx_ref">Meng et al., 2026</a>; <a href="#bib.bib15" class="ltx_ref">He et al., 2026</a>; <a href="#bib.bib14" class="ltx_ref">Zhou et al., 2026</a>). Across implementations, persistent runtime contents commonly serve four functions. An *interface* converts raw instructions, observations, documents, or multimodal inputs into a form the agent can use. *Memory* stores interaction records, summaries, and reusable guidance. A *capability registry* describes tools, APIs, environment actions, and learned skills together with their invocation conditions. A *router or workflow controller* selects relevant memories and capabilities, orders their use, and assembles the execution context. Environment adapters execute actions, and task-specific validators check outcomes at the boundary of the pipeline (<a href="#bib.bib51" class="ltx_ref">Gu, 2026</a>; <a href="#bib.bib45" class="ltx_ref">Chen et al., 2026b</a>).





Existing systems develop different parts of this structure. ReAct couples reasoning with environment interaction (<a href="#bib.bib36" class="ltx_ref">Yao et al., 2023</a>). Toolformer, MRKL, and HuggingGPT expose and coordinate external capabilities (<a href="#bib.bib4" class="ltx_ref">Schick et al., 2023</a>; <a href="#bib.bib37" class="ltx_ref">Karpas et al., 2022</a>; <a href="#bib.bib38" class="ltx_ref">Shen et al., 2023</a>). MemGPT, Reflexion, and Voyager retain experience as memory, feedback, or executable skills (<a href="#bib.bib24" class="ltx_ref">Packer et al., 2023</a>; <a href="#bib.bib26" class="ltx_ref">Shinn et al., 2023</a>; <a href="#bib.bib28" class="ltx_ref">Wang et al., 2024a</a>). Together, these components form a coupled execution pipeline. The interface shapes what the router sees. Memory and capability descriptions determine what it can select. The resulting workflow determines how the model acts.





Harness engineering also uses execution feedback to revise prompts, declarative programs, memories, tool-use policies, skills, and workflows (<a href="#bib.bib2" class="ltx_ref">Zhou et al., 2023</a>; <a href="#bib.bib3" class="ltx_ref">Khattab et al., 2024</a>; <a href="#bib.bib5" class="ltx_ref">Abuzakuk et al., 2026</a>; <a href="#bib.bib4" class="ltx_ref">Schick et al., 2023</a>; <a href="#bib.bib26" class="ltx_ref">Shinn et al., 2023</a>; <a href="#bib.bib28" class="ltx_ref">Wang et al., 2024a</a>; <a href="#bib.bib39" class="ltx_ref">Zhong et al., 2026</a>; <a href="#bib.bib40" class="ltx_ref">Zhang et al., 2026d</a>). Recent work broadens this process to configuration search, cross-layer failure diagnosis, and sustained agent improvement (<a href="#bib.bib46" class="ltx_ref">Zhang et al., 2026a</a>; <a href="#bib.bib47" class="ltx_ref">Chen et al., 2026a</a>; <a href="#bib.bib50" class="ltx_ref">Yao et al., 2026</a>; <a href="#bib.bib48" class="ltx_ref">Liu et al., 2026b</a>). These systems show that a harness is editable and can improve with experience. Their main objective, however, is usually the quality of a component or the next configuration on a current task or target distribution. Repeated improvement alone does not provide a general retention criterion for the full harness state (<a href="#bib.bib49" class="ltx_ref">Lin et al., 2026</a>). Our work differs by treating the entire mutable harness as a unified continual learning state and by making retention across committed updates an explicit objective.







### 2.2 Model-Centric Continual Learning



Model-centric continual learning adapts a model to a non-stationary stream of tasks or data while seeking to retain capabilities acquired from earlier experience. Its central challenge is catastrophic forgetting, which arises when learning new knowledge disrupts knowledge encoded by the model (<a href="#bib.bib43" class="ltx_ref">Kirkpatrick et al., 2017</a>; <a href="#bib.bib19" class="ltx_ref">Delange et al., 2022</a>; <a href="#bib.bib17" class="ltx_ref">Wang et al., 2024b</a>; <a href="#bib.bib34" class="ltx_ref">Kang et al., 2026</a>). Representation-based approaches learn features or prompts that remain useful across tasks (<a href="#bib.bib21" class="ltx_ref">Wang et al., 2022b</a>; <a href="#bib.bib22" class="ltx_ref">Wang et al., 2022a</a>). Recent analysis also examines how these internal representations shift across a learning sequence (<a href="#bib.bib7" class="ltx_ref">Kim et al., 2025</a>). Architecture-based approaches isolate, expand, or select model components to reduce interference between tasks (<a href="#bib.bib53" class="ltx_ref">Liu et al., 2026a</a>; <a href="#bib.bib8" class="ltx_ref">Lu et al., 2024</a>). Optimization-based approaches alter the update trajectory or constrain gradients using information from earlier tasks (<a href="#bib.bib32" class="ltx_ref">Lopez-Paz and Ranzato, 2017</a>; <a href="#bib.bib59" class="ltx_ref">Abbes et al., 2026</a>; <a href="#bib.bib9" class="ltx_ref">Shang et al., 2025</a>). Regularization-based approaches penalize changes to parameters or functions that support old behavior (<a href="#bib.bib43" class="ltx_ref">Kirkpatrick et al., 2017</a>; <a href="#bib.bib10" class="ltx_ref">Lewandowski et al., 2025</a>). Replay-based approaches retain or reconstruct earlier examples and mix them with new data (<a href="#bib.bib60" class="ltx_ref">Urettini and Carta, 2025</a>; <a href="#bib.bib61" class="ltx_ref">Wang et al., 2025a</a>; <a href="#bib.bib62" class="ltx_ref">Yue et al., 2025</a>; <a href="#bib.bib11" class="ltx_ref">Bellitto et al., 2024</a>). Recent work extends these families to large language models and broader knowledge streams, but the state being learned remains model knowledge, representations, architectures, or parameters (<a href="#bib.bib55" class="ltx_ref">Liang et al., 2025</a>; <a href="#bib.bib54" class="ltx_ref">Zhang et al., 2026b</a>). Our work moves the continual learning object outside the model. The foundation model parameters remain frozen, while the harness state evolves under explicit acquisition and retention constraints.









## 3 Harness Continual Learning

<figure id="S3.T1" class="ltx_table">
<table id="S3.T1.2" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S3.T1.2.1" class="ltx_tr">
<th id="S3.T1.2.1.1" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding: -0.1pt 3.0pt"> Component </th>
<th id="S3.T1.2.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding: -0.1pt 3.0pt"> Function during execution </th>
<th id="S3.T1.2.1.3" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding: -0.1pt 3.0pt"> Contents updated in HCL </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S3.T1.2.2" class="ltx_tr">
<td id="S3.T1.2.2.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding: -0.1pt 3.0pt"> Task Interface <em>I</em><sub><em>n</em></sub> </td>
<td id="S3.T1.2.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding: -0.1pt 3.0pt"> Transforms raw interactions into structured representations. </td>
<td id="S3.T1.2.2.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding: -0.1pt 3.0pt"> Prompts, task templates, and parsing and normalization rules. </td>
</tr>
<tr id="S3.T1.2.3" class="ltx_tr">
<td id="S3.T1.2.3.1" class="ltx_td ltx_align_left ltx_align_top" style="padding: -0.1pt 3.0pt"> Experience Memory <em>M</em><sub><em>n</em></sub> </td>
<td id="S3.T1.2.3.2" class="ltx_td ltx_align_left ltx_align_top" style="padding: -0.1pt 3.0pt"> Provides concrete interactions and abstract guidance for reuse. </td>
<td id="S3.T1.2.3.3" class="ltx_td ltx_align_left ltx_align_top" style="padding: -0.1pt 3.0pt"> Raw interaction records and LLM-generated Abstract Memory entries. </td>
</tr>
<tr id="S3.T1.2.4" class="ltx_tr">
<td id="S3.T1.2.4.1" class="ltx_td ltx_align_left ltx_align_top" style="padding: -0.1pt 3.0pt"> Capability Map <em>C</em><sub><em>n</em></sub> </td>
<td id="S3.T1.2.4.2" class="ltx_td ltx_align_left ltx_align_top" style="padding: -0.1pt 3.0pt"> Provides external operations and reusable inner skills. </td>
<td id="S3.T1.2.4.3" class="ltx_td ltx_align_left ltx_align_top" style="padding: -0.1pt 3.0pt"> Inner skills extracted from Abstract Memory. </td>
</tr>
<tr id="S3.T1.2.5" class="ltx_tr">
<td id="S3.T1.2.5.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding: -0.1pt 3.0pt"> Adaptive Router <em>R</em><sub><em>n</em></sub> </td>
<td id="S3.T1.2.5.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding: -0.1pt 3.0pt"> Selects and organizes memory and capabilities. </td>
<td id="S3.T1.2.5.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding: -0.1pt 3.0pt"> Routing prompts, selection criteria, and workflow templates. </td>
</tr>
</tbody>
</table>
<figcaption>Table 1:  Execution functions and updatable contents of the four jointly versioned components in the deployed harness <em>H</em><sub><em>n</em></sub>.</figcaption>
</figure>



### 3.1 Definition and Problem Setting



Consider a fixed foundation model $`F_{\theta}`$ and a harness $`H_{n}`$ deployed at interaction step $`n`$. The model parameters $`\theta`$ remain unchanged, whereas a committed harness update affects subsequent interactions. We define *Harness Continual Learning* as the problem of sequentially updating the deployed harness to acquire new behavior while retaining behavior that was reliable before the update. Previously reliable behavior may be a correct response, a valid tool call, or an action trajectory that satisfies an environment goal. Retention requires such behavior to remain successful after later harness updates when evaluated under the same input and execution conditions. This setting differs from conventional harness engineering, which typically optimizes a prompt, tool configuration, or workflow for a current objective. HCL instead studies a sequence of deployed harnesses.





At interaction step $`n`$, $`\mathbf{u}_{n}`$ denotes the raw interaction, such as an instruction, an observation, or a multimodal input. The harness transforms $`\mathbf{u}_{n}`$ into the structured interaction $`\mathbf{i}_{n}`$. Guided by the frozen foundation model, it then combines $`\mathbf{i}_{n}`$ with selected memory and capabilities to assemble the execution context $`\mathbf{z}_{n}`$. The model and external runtime execute $`\mathbf{z}_{n}`$ to produce the outcome $`\mathbf{y}_{n}`$. Post-execution feedback is denoted by $`\mathbf{f}_{n}`$. We collect these interaction-level objects as

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathbf{e}_{n}=\left(\mathbf{u}_{n},\mathbf{i}_{n},\mathbf{z}_{n},\mathbf{y}_{n},\mathbf{f}_{n}\right).
``` |  | (1) |

The Optimizer provides the foundation model $`F_{\theta}`$ with an update rule, the deployed harness, and the available interaction evidence as context for generating a candidate harness::

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\widetilde{H}_{n+1}=\mathcal{O}_{F_{\theta}}\left(H_{n},\mathbf{e}_{n}\right).
``` |  | (2) |

The candidate remains separate from the deployed harness until a commitment decision is made. Let $`G_{n}\in\{0,1\}`$ denote this decision. The deployed harness evolves as

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
H_{n+1}=\begin{cases}\widetilde{H}_{n+1},&G_{n}=1,\\
H_{n},&G_{n}=0.\end{cases}
``` |  | (3) |

Therefore, a candidate affects later interactions only when it is committed. Our framework realizes HCL in two parts. First, it defines the deployed harness state $`H_{n}`$ by specifying its mutable contents and versioning them jointly. Second, it controls the update from $`H_{n}`$ to $`{H}_{n+1}`$ by checking current improvement, historical retention, and validity before commitment.







### 3.2 Harness State for Continual Learning



The design of the HCL state builds on established mechanisms from prior harness and agent systems, including prompt-based task interfaces, persistent memory, tool and skill registries, and routing or workflow controllers (<a href="#bib.bib13" class="ltx_ref">Li et al., 2026a</a>; <a href="#bib.bib15" class="ltx_ref">He et al., 2026</a>). Rather than inheriting the architecture of any single system, HCL organizes these recurring execution functions into four jointly versioned components, whose mutable contents evolve from sequential experience under explicit acquisition and retention constraints.





Accordingly, HCL organizes the mutable harness state as

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
H_{n}=\left(I_{n},M_{n},C_{n},R_{n}\right),
``` |  | (4) |

where $`I_{n}`$, $`M_{n}`$, $`C_{n}`$, and $`R_{n}`$ denote the Task Interface, Experience Memory, Capability Map, and Adaptive Router, respectively. At interaction step $`n`$, $`H_{n}`$ represents the complete harness currently deployed. Its prompts and processing rules, stored experience, reusable skills, and routing specifications persist across interactions and jointly determine how the agent handles future tasks.





Although these four execution functions are common in agent harnesses, HCL differs in how their mutable contents are learned and deployed. Because a change to one component may interact with the others and affect both new and previously learned behavior, HCL treats all proposed changes as one complete candidate harness. The candidate replaces $`H_{n}`$ only after it satisfies current improvement, historical retention, and validity requirements. Otherwise, none of its changes enters the deployed harness. HCL therefore turns harness contents into a coordinated mechanism for continual learning rather than a collection of independently edited artifacts.





Table <a href="#S3.T1" class="ltx_ref" title="Table 1 ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">1</a> summarizes the execution function of each component and the contents that can be updated through continual interaction. Figure <a href="#S3.F2" class="ltx_ref" title="Figure 2 ‣ 3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">2</a> shows how these components support execution and how post-execution feedback initiates a candidate harness.



<figure id="S3.F2" class="ltx_figure">
<img src="2608.19013v1/framework.png" id="S3.F2.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:548/320;" width="548" height="320" alt="Refer to caption" />
<figcaption>Figure 2:  Overview of the HCL framework. The deployed harness <em>H</em><sub><em>n</em></sub> supports the execution path from raw interaction <strong>u</strong><sub><em>n</em></sub> to outcome <strong>y</strong><sub><em>n</em></sub>. When post-execution feedback is available, the Continual Optimizer proposes a candidate harness <em>H̃</em><sub><em>n</em> + 1</sub>, and the Continual Evaluator accepts or rejects it based on current improvement, historical retention, and validity.</figcaption>
</figure>



#### 3.2.1 Task Interface



The Task Interface is the input-processing layer of the harness. It transforms a raw task interaction $`\mathbf{u}_{n}`$ into a structured representation of the available input, task objective, and execution constraints:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathbf{i}_{n}=I_{n}\left(\mathbf{u}_{n}\right)=\left(\mathbf{x}_{n},\mathbf{g}_{n},\mathbf{k}_{n}\right),
``` |  | (5) |

where $`\mathbf{x}_{n}`$ contains the available input, $`\mathbf{g}_{n}`$ specifies what the task aims to accomplish, and $`\mathbf{k}_{n}`$ records constraints such as output format, legal tool use, and environment restrictions. Internally, $`I_{n}`$ specifies the prompts, task templates, and parsing and normalization rules used by an LLM-based parser to perform this transformation.





In HCL, the Task Interface maps heterogeneous task data into a unified representation, making the relevant input, objective, and constraints explicit. This helps the agent focus on task requirements and process different task forms within the same continual learning pipeline. Since interface updates may change how tasks are interpreted, $`I_{n}`$ is versioned with the harness.







#### 3.2.2 Experience Memory



Agent memory can take many forms, including episodic records, summaries, and reflections (<a href="#bib.bib23" class="ltx_ref">Park et al., 2023</a>; <a href="#bib.bib24" class="ltx_ref">Packer et al., 2023</a>; <a href="#bib.bib25" class="ltx_ref">Zhong et al., 2024</a>; <a href="#bib.bib26" class="ltx_ref">Shinn et al., 2023</a>; <a href="#bib.bib30" class="ltx_ref">Wang et al., 2025b</a>). From a continual learning perspective, HCL organizes accumulated experience into two complementary forms:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
M_{n}=\left(M_{n}^{\mathrm{raw}},M_{n}^{\mathrm{abs}}\right),
``` |  | (6) |

where $`M_{n}^{\mathrm{raw}}`$ and $`M_{n}^{\mathrm{abs}}`$ denote Raw Memory and Abstract Memory, respectively. Raw Memory preserves concrete interactions, whereas Abstract Memory extracts reusable knowledge from them.





Raw Memory $`M_{n}^{\mathrm{raw}}`$ stores the raw task input $`\mathbf{u}_{n}`$, the resulting response or action trajectory $`\mathbf{y}_{n}`$, and the subsequent environment or verifier feedback $`\mathbf{f}_{n}`$. To keep memory collection simple and storage bounded, it retains a fixed number of interactions from each task in arrival order. These records preserve task-specific evidence about successful behavior and encountered failures, helping the agent reuse earlier solutions and avoid repeating previous errors.





Abstract Memory $`M_{n}^{\mathrm{abs}}`$ is produced by using an LLM to summarize the contents of Raw Memory. The LLM consolidates recurring patterns into scoped guidance, such as output conventions, reliable reasoning patterns, and common errors to avoid. As new raw interactions are stored, the summarization process can produce new or updated abstract entries for related future tasks.





Raw Memory retains concrete experience for replay and behavioral recovery, while Abstract Memory generalizes that experience for transfer across tasks. Together, they support adaptation to new tasks while preserving useful knowledge acquired earlier.







#### 3.2.3 Capability Map



The Capability Map defines the operations and skills that the agent can invoke during execution. HCL organizes these capabilities by their origin:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
C_{n}=\left(C_{n}^{\mathrm{outer}},C_{n}^{\mathrm{inner}}\right),
``` |  | (7) |

where $`C_{n}^{\mathrm{outer}}`$ contains capabilities provided by the external runtime, and $`C_{n}^{\mathrm{inner}}`$ contains skills acquired through continual interaction.





Outer capabilities connect the frozen model to external resources, such as APIs, retrieval services, perception models, calculators, and environment actions. Each entry specifies its function, expected inputs and outputs, invocation protocol, availability conditions, and known limitations. These capabilities provide the basic operations needed to access information and act in different environments.





Inner capabilities are reusable skills further abstracted from $`M_{n}^{\mathrm{abs}}`$. An LLM can consolidate related abstract memories into more general skills with explicit inputs, outputs, execution steps, and applicable scopes. This turns knowledge accumulated from earlier interactions into procedures that can be directly invoked across tasks. As Abstract Memory evolves, new inner skills can be added and existing skills can be revised.





Unlike a static capability map limited to a predefined library of external operations, $`C_{n}`$ can expand its executable skill set through experience. This dynamic connection between accumulated knowledge and inner capabilities allows the frozen-model agent to continually acquire, refine, and transfer skills across tasks.







#### 3.2.4 Adaptive Router



The Adaptive Router connects the Task Interface, Experience Memory, and Capability Map to task execution. Given the structured interaction $`\mathbf{i}_{n}`$, it retrieves relevant experience from $`M_{n}`$, selects capabilities from $`C_{n}`$, and organizes them into an execution context:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\mathbf{z}_{n}=R_{n}\left(\mathbf{i}_{n},M_{n},C_{n}\right).
``` |  | (8) |

The resulting $`\mathbf{z}_{n}`$ contains the structured task representation, selected experience and capabilities, and the workflow used for execution.





As $`M_{n}`$ and $`C_{n}`$ evolve, which experience and capabilities are useful for a task and how they should be organized may also change. At each interaction, $`R_{n}`$ uses an LLM together with its routing prompts, selection criteria, and workflow templates to adapt the execution strategy to the current task and available contents. These routing specifications can also be revised across interactions, allowing the Router to evolve alongside Memory and the Capability Map. The frozen model and external runtime then use $`\mathbf{z}_{n}`$ to produce the response or action $`\mathbf{y}_{n}`$.









### 3.3 Guarded Harness Evolution



A harness update may improve current behavior while degrading previously reliable behavior on earlier tasks. We therefore introduce *guarded harness evolution*, which separates update generation from deployment through a proposal–evaluation–commitment process. Given feedback, the Continual Optimizer produces an isolated candidate harness. The Continual Evaluator commits it only if it satisfies current-improvement, historical-retention, and validity requirements. Otherwise, $`H_{n}`$ remains deployed. This process makes retention an explicit condition for harness evolution rather than assuming that a useful update on the current task is safe for earlier tasks.





#### 3.3.1 Continual Optimizer: Candidate Generation



Interaction feedback indicates whether the current execution is successful, but does not specify how the harness should change. The Continual Optimizer implements the update operator $`\mathcal{O}`$ in Eq. (<a href="#S3.E2" class="ltx_ref" title="In 3.1 Definition and Problem Setting ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">2</a>) using a prompt template for the foundation model $`F_{\theta}`$. It provides the deployed harness $`H_{n}`$ and the interaction evidence $`\mathbf{e}_{n}`$ to the model and asks it to propose a candidate harness $`\widetilde{H}_{n+1}`$. $`F_{\theta}`$ analyzes the execution outcome in light of the feedback and examines the execution context to identify which harness components require revision. It may modify prompts or parsing rules in the Task Interface, record or summarize experience in Memory, add or revise skills in the Capability Map, or adjust selection and workflow rules in the Adaptive Router.





To provide alternative update directions while limiting repeated LLM calls, we use a simple sequential strategy when multiple components require revision. The selected components are considered in a predefined order. For each component, the Optimizer generates up to $`K`$ alternatives one at a time. Each alternative is evaluated by replacing only the selected component in the current candidate harness while keeping all other components fixed. For each selected component, the Continual Optimizer generates up to K alternatives, each of which is evaluated while all other components remain fixed. The highest-scoring admissible alternative is retained as the basis for revising the next component. If no alternative passes the gate, that component remains unchanged. The deployed harness $`H_{n}`$ remains unchanged until the resulting candidate completes evaluation and is committed.







#### 3.3.2 Continual Evaluator: Historical Evaluation and Commitment



To align harness updates with the objective of continual learning, we introduce a retention-aware evaluation standard rather than judging candidates only by current-task gains. The Continual Evaluator $`E`$ examines three complementary aspects: *current improvement* measures whether the candidate better solves the current task, *historical retention* checks whether previously reliable behavior is preserved, and *validity* ensures that the updated harness and its outputs remain usable. The deployed harness $`H_{n}`$ and candidate $`\widetilde{H}_{n+1}`$ are evaluated under the same model, decoding, tool, environment, and seed conditions to provide a controlled comparison. A candidate can replace $`H_{n}`$ only when all three requirements are satisfied, allowing the harness to acquire new behavior without ignoring what it has already learned.





##### Current Improvement.



Let $`V_{n}`$ denote the validation cases for the current task, and let $`P(H,V_{n})`$ denote the performance of harness $`H`$ on these cases. The improvement produced by the candidate is

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\Delta_{n}=P\left(\widetilde{H}_{n+1},V_{n}\right)-P\left(H_{n},V_{n}\right).
``` |  | (9) |

The candidate satisfies this criterion when $`\Delta_{n}\geq\delta_{n}`$, where $`\delta_{n}`$ is the predefined minimum improvement. Depending on the task, $`P`$ may measure answer accuracy, tool-use success, or environment completion.







##### Historical Retention.



Current-task improvement does not indicate whether a candidate preserves behavior acquired earlier. The Evaluator therefore maintains a compact anchor set $`A_{n}`$ for historical evaluation. Each anchor contains the raw input and success criterion of a previously observed case, allowing that case to be rerun under both the deployed and candidate harnesses. At the end of each task, anchors are selected using a predefined ratio of previously successful and failed cases. If either group contains too few cases to meet its target, the remaining slots are filled from the other group. The anchors are used only for evaluation and are unavailable during candidate generation. For each anchor $`a\in A_{n}`$, define the binary success indicator

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
q(H,a)\in\{0,1\},
``` |  | (10) |

where $`q(H,a)=1`$ if harness $`H`$ satisfies the corresponding success criterion and 0 otherwise. The historical loss introduced by the candidate is

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
D_{n}=\sum_{a\in A_{n}}\mathbf{1}\left[q(H_{n},a)=1\land q\left(\widetilde{H}_{n+1},a\right)=0\right],
``` |  | (11) |





where $`\mathbf{1}[\cdot]`$ is the indicator function, equal to 1 when the enclosed condition holds and 0 otherwise.





Therefore, $`D_{n}`$ counts previously solved anchors that fail under the candidate. The candidate satisfies the historical-retention criterion when $`D_{n}\leq B_{n}`$, where $`B_{n}`$ is the predefined tolerance for historical loss. Setting $`B_{n}=0`$ requires the candidate to preserve every anchor currently solved by $`H_{n}`$. Appendix <a href="#A3" class="ltx_ref" title="Appendix C Anchor Success Criteria ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">C</a> specifies the success criterion $`q(H,a)`$ used for each experimental task.







##### Validity Check.



The candidate must also be executable and comply with the task and runtime requirements. Let $`\mathcal{L}_{n}`$ denote the set of validity checks applied at interaction step $`n`$. For each $`\ell\in\mathcal{L}_{n}`$, define

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
v_{n,\ell}\left(\widetilde{H}_{n+1}\right)\in\{0,1\},
``` |  | (12) |

where $`v_{n,\ell}\left(\widetilde{H}_{n+1}\right)=1`$ indicates that the candidate satisfies validity check $`\ell`$, and $`0`$ otherwise. These checks may cover artifact syntax, output-schema compliance, legal tool use, task constraints, and environment consistency.





The three criteria are combined into a candidate-specific commitment decision:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
G_{n}^{(k)}=\mathbf{1}\left[(\Delta_{n}^{(k)}\geq\delta_{n})\land(D_{n}^{(k)}\leq B_{n})\land\left(\forall\ell,\;v_{n,\ell}\left(\widetilde{H}_{n+1}^{(k)}\right)=1\right)\right].
``` |  | (13) |

The decision rule in Eq. (<a href="#S3.E13" class="ltx_ref" title="In Validity Check. ‣ 3.3.2 Continual Evaluator: Historical Evaluation and Commitment ‣ 3.3 Guarded Harness Evolution ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">13</a>) serves as a hard admissibility gate. When multiple candidates pass the gate, the Continual Evaluator ranks them using a composite score that aggregates their current-performance, validity, and historical-retention scores. The highest-scoring candidate is committed as $`H_{n+1}`$, with ties broken randomly. If no candidate passes the gate, $`H_{n}`$ remains deployed.





By making historical retention a necessary condition for commitment, the admissibility gate supports the acquisition of new behavior while explicitly controlling the loss of previously reliable behavior. The tolerance $`B_{n}`$ further adjusts the balance between stability and plasticity.











### 3.4 Connections to Model-Centric Continual Learning



HCL draws on several complementary principles from model-centric continual learning, but realizes them through harness mechanisms rather than model-parameter updates (<a href="#bib.bib19" class="ltx_ref">Delange et al., 2022</a>; <a href="#bib.bib17" class="ltx_ref">Wang et al., 2024b</a>). Replay-based methods retain earlier examples to preserve acquired knowledge. Experience Memory follows this principle by storing concrete interactions for later reuse. Representation-based methods learn abstractions that support transfer across tasks. The Capability Map similarly transforms accumulated experience into reusable skills and combines them with external capabilities. Architecture-based methods organize reusable modules and routines to reduce interference. HCL represents these routines as invocable capabilities and uses the Adaptive Router to select and compose them for each interaction. Optimization- and regularization-based methods control parameter updates using information from earlier tasks, allowing new knowledge to be acquired while limiting interference with previous knowledge. HCL applies the same principle to harness updates through the Continual Optimizer and Continual Evaluator. The Optimizer proposes candidate changes from current feedback, while the Evaluator tests them on current validation cases and historical anchors. Only candidates that improve current performance while satisfying historical retention and validity requirements are committed. This proposal–evaluation–commitment process integrates adaptation and protection into continual harness evolution.





These relationships are conceptual rather than one-to-one implementations. More importantly, HCL brings the complementary principles of model-centric continual learning into a unified system-level formulation. Traditional approaches (<a href="#bib.bib35" class="ltx_ref">Kang et al., 2025</a>; <a href="#bib.bib33" class="ltx_ref">Liu et al., 2026c</a>) often treat replay, representation, architecture, optimization, and regularization as separate solution families for adapting model parameters. HCL coordinates their functions within a single evolving harness under the same acquisition–retention objective. It therefore extends continual learning from parameter adaptation to the coordinated evolution of agent infrastructure, providing a unified framework for continual learning beyond the model itself.









## 4 Experiments



We evaluate HCL in two regimes. ALFWorld (<a href="#bib.bib29" class="ltx_ref">Shridhar et al., 2021</a>) and Minecraft (<a href="#bib.bib28" class="ltx_ref">Wang et al., 2024a</a>) examine capability accumulation, reuse, and failure recovery during open-world interaction. Textual reasoning and multimodal perception use controlled task streams with repeated evaluation of previously observed tasks, making harness-level forgetting and the stability–plasticity trade-off directly measurable. We also evaluate the control of this trade-off and ablate the four editable harness components. We use different foundation models across the experimental settings to examine whether HCL generalizes across model families and scales rather than depending on a particular model. ALFWorld uses Qwen3.5-9B; Minecraft and the main multimodal experiments use Qwen3.6-27B; textual reasoning uses DeepSeek-V4-Flash; and the component ablation uses Qwen3.5-4B. Within each setting, the same foundation model is used for all comparisons and remains frozen throughout the continual-learning stream. Any adaptation therefore comes from harness updates rather than model training.





### 4.1 Evaluation Protocol



For each task stream, a single harness evolves sequentially around the same foundation model. Let $`H^{(s)}`$ denote the deployed harness after learning task $`\mathcal{D}_{s}`$, where $`s`$ indexes the evaluation stage. At the end of each stage, we evaluate $`H^{(s)}`$ on the current task and every previously observed task:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
R_{s,j}=\operatorname{Eval}\left(H^{(s)},\mathcal{D}^{\mathrm{test}}_{j}\right),\qquad j\leq s,
``` |  | (14) |

where $`R_{s,j}`$ is the benchmark score or episode success rate on task $`j`$. Current-task validation cases and historical anchors are used only by the Continual Evaluator to determine whether a candidate can be committed. The final test sets are disjoint from both and are used only for reporting.





For task streams with metrics on a common scale, we report final average performance and average old-task forgetting:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\operatorname{Avg}_{T}=\frac{1}{T}\sum_{j=1}^{T}R_{T,j},\qquad\operatorname{Fgt}_{T}=\frac{1}{T-1}\sum_{j=1}^{T-1}\left(\max_{r\in\{j,\ldots,T\}}R_{r,j}-R_{T,j}\right).
``` |  | (15) |

$`\operatorname{Avg}_{T}`$ measures final performance across the complete stream, while $`\operatorname{Fgt}_{T}`$ measures the average decline of earlier tasks from their best observed performance. Forgetting is marked as “–” for Zero-shot and Static Harness because they make no sequential updates.





Stability-HCL and Plasticity-HCL are two configurations of the framework, differing only in the historical-loss tolerance $`B_{n}`$. Stability-HCL sets $`B_{n}=0`$ and rejects any candidate that causes a currently solved anchor to fail. Plasticity-HCL sets $`B_{n}=\infty`$, so historical anchor losses do not block a candidate as long as it satisfies the current-improvement and validity requirements. We evaluate both configurations in ALFWorld and the controlled streams, while Minecraft uses the retention-oriented configuration. Detailed settings are provided in Appendix <a href="#A1" class="ltx_ref" title="Appendix A Implementation and Experimental Settings ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">A</a>.







### 4.2 Open-World Capability Accumulation



We study long-horizon harness evolution in ALFWorld and Minecraft. ALFWorld supports stage-wise evaluation across previously observed task categories, while Minecraft provides a longer interaction curriculum for examining capability accumulation, failure recovery, and skill revision.





#### 4.2.1 ALFWorld



We use the text-based ALFWorld environment with a maximum of 50 interaction steps per episode. The continual stream contains six task categories in the order of Pick-and-Place, Look-in-Light, Clean, Heat, Cool, and Two-object manipulation. For each category, 10 training episodes are used for sequential adaptation. After each stage, the harness is evaluated on all observed categories, with final performance reported on the 134 official evaluation episodes.



<figure id="S4.T2" class="ltx_table">

 
<table id="S4.T2.2.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S4.T2.2.1.1" class="ltx_tr">
<th id="S4.T2.2.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Method</th>
<th id="S4.T2.2.1.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Pick</th>
<th id="S4.T2.2.1.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Look</th>
<th id="S4.T2.2.1.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Clean</th>
<th id="S4.T2.2.1.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Heat</th>
<th id="S4.T2.2.1.1.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Cool</th>
<th id="S4.T2.2.1.1.7" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_r ltx_border_tt">Two-object</th>
<th id="S4.T2.2.1.1.8" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Final Avg. ↑</th>
<th id="S4.T2.2.1.1.9" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Avg. Fgt. ↓</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S4.T2.2.1.2" class="ltx_tr">
<td id="S4.T2.2.1.2.1" class="ltx_td ltx_align_left ltx_border_t">Static Harness</td>
<td id="S4.T2.2.1.2.2" class="ltx_td ltx_align_center ltx_border_t">95.80</td>
<td id="S4.T2.2.1.2.3" class="ltx_td ltx_align_center ltx_border_t">66.70</td>
<td id="S4.T2.2.1.2.4" class="ltx_td ltx_align_center ltx_border_t">25.80</td>
<td id="S4.T2.2.1.2.5" class="ltx_td ltx_align_center ltx_border_t">26.10</td>
<td id="S4.T2.2.1.2.6" class="ltx_td ltx_align_center ltx_border_t">9.50</td>
<td id="S4.T2.2.1.2.7" class="ltx_td ltx_align_center ltx_border_r ltx_border_t">58.80</td>
<td id="S4.T2.2.1.2.8" class="ltx_td ltx_align_center ltx_border_t">47.12</td>
<td id="S4.T2.2.1.2.9" class="ltx_td ltx_align_center ltx_border_t">–</td>
</tr>
<tr id="S4.T2.2.1.3" class="ltx_tr">
<td id="S4.T2.2.1.3.1" class="ltx_td ltx_align_left">RAG Baseline</td>
<td id="S4.T2.2.1.3.2" class="ltx_td ltx_align_center">95.80</td>
<td id="S4.T2.2.1.3.3" class="ltx_td ltx_align_center">83.30</td>
<td id="S4.T2.2.1.3.4" class="ltx_td ltx_align_center">41.90</td>
<td id="S4.T2.2.1.3.5" class="ltx_td ltx_align_center">39.10</td>
<td id="S4.T2.2.1.3.6" class="ltx_td ltx_align_center">14.30</td>
<td id="S4.T2.2.1.3.7" class="ltx_td ltx_align_center ltx_border_r">58.80</td>
<td id="S4.T2.2.1.3.8" class="ltx_td ltx_align_center">55.56</td>
<td id="S4.T2.2.1.3.9" class="ltx_td ltx_align_center">1.74</td>
</tr>
<tr id="S4.T2.2.1.4" class="ltx_tr">
<td id="S4.T2.2.1.4.1" class="ltx_td ltx_align_left">MemP (<a href="#bib.bib31" class="ltx_ref">Fang et al., 2026</a>)</td>
<td id="S4.T2.2.1.4.2" class="ltx_td ltx_align_center">95.80</td>
<td id="S4.T2.2.1.4.3" class="ltx_td ltx_align_center">83.30</td>
<td id="S4.T2.2.1.4.4" class="ltx_td ltx_align_center">48.40</td>
<td id="S4.T2.2.1.4.5" class="ltx_td ltx_align_center">34.80</td>
<td id="S4.T2.2.1.4.6" class="ltx_td ltx_align_center">9.50</td>
<td id="S4.T2.2.1.4.7" class="ltx_td ltx_align_center ltx_border_r">47.10</td>
<td id="S4.T2.2.1.4.8" class="ltx_td ltx_align_center">53.15</td>
<td id="S4.T2.2.1.4.9" class="ltx_td ltx_align_center">5.18</td>
</tr>
<tr id="S4.T2.2.1.5" class="ltx_tr">
<td id="S4.T2.2.1.5.1" class="ltx_td ltx_align_left">MemRL (<a href="#bib.bib27" class="ltx_ref">Zhang et al., 2026c</a>)</td>
<td id="S4.T2.2.1.5.2" class="ltx_td ltx_align_center">87.50</td>
<td id="S4.T2.2.1.5.3" class="ltx_td ltx_align_center">66.70</td>
<td id="S4.T2.2.1.5.4" class="ltx_td ltx_align_center">29.00</td>
<td id="S4.T2.2.1.5.5" class="ltx_td ltx_align_center">60.90</td>
<td id="S4.T2.2.1.5.6" class="ltx_td ltx_align_center">23.80</td>
<td id="S4.T2.2.1.5.7" class="ltx_td ltx_align_center ltx_border_r">41.20</td>
<td id="S4.T2.2.1.5.8" class="ltx_td ltx_align_center">51.51</td>
<td id="S4.T2.2.1.5.9" class="ltx_td ltx_align_center">5.64</td>
</tr>
<tr id="S4.T2.2.1.6" class="ltx_tr">
<td id="S4.T2.2.1.6.1" class="ltx_td ltx_align_left">Stability-HCL (Ours)</td>
<td id="S4.T2.2.1.6.2" class="ltx_td ltx_align_center">100.00</td>
<td id="S4.T2.2.1.6.3" class="ltx_td ltx_align_center">83.30</td>
<td id="S4.T2.2.1.6.4" class="ltx_td ltx_align_center">51.60</td>
<td id="S4.T2.2.1.6.5" class="ltx_td ltx_align_center">30.40</td>
<td id="S4.T2.2.1.6.6" class="ltx_td ltx_align_center">28.60</td>
<td id="S4.T2.2.1.6.7" class="ltx_td ltx_align_center ltx_border_r">76.50</td>
<td id="S4.T2.2.1.6.8" class="ltx_td ltx_align_center">61.74</td>
<td id="S4.T2.2.1.6.9" class="ltx_td ltx_align_center">2.64</td>
</tr>
<tr id="S4.T2.2.1.7" class="ltx_tr">
<td id="S4.T2.2.1.7.1" class="ltx_td ltx_align_left ltx_border_bb">Plasticity-HCL (Ours)</td>
<td id="S4.T2.2.1.7.2" class="ltx_td ltx_align_center ltx_border_bb">100.00</td>
<td id="S4.T2.2.1.7.3" class="ltx_td ltx_align_center ltx_border_bb">77.80</td>
<td id="S4.T2.2.1.7.4" class="ltx_td ltx_align_center ltx_border_bb">41.90</td>
<td id="S4.T2.2.1.7.5" class="ltx_td ltx_align_center ltx_border_bb">39.10</td>
<td id="S4.T2.2.1.7.6" class="ltx_td ltx_align_center ltx_border_bb">19.00</td>
<td id="S4.T2.2.1.7.7" class="ltx_td ltx_align_center ltx_border_bb ltx_border_r">100.00</td>
<td id="S4.T2.2.1.7.8" class="ltx_td ltx_align_center ltx_border_bb">62.98</td>
<td id="S4.T2.2.1.7.9" class="ltx_td ltx_align_center ltx_border_bb">10.94</td>
</tr>
</tbody>
</table>

<figcaption>Table 2:  Final performance and harness-level forgetting on ALFWorld with Qwen3.5-9B as the frozen foundation model. The best and second-best results in each metric column are marked in bold and underlined, respectively.</figcaption>
</figure>



We compare HCL with a Static Harness, a RAG baseline, MemP (<a href="#bib.bib31" class="ltx_ref">Fang et al., 2026</a>), and MemRL (<a href="#bib.bib27" class="ltx_ref">Zhang et al., 2026c</a>). For fairness, MemP and MemRL are reimplemented within our framework with unified data processing and action selection, while their algorithms remain unchanged. Table <a href="#S4.T2" class="ltx_ref" title="Table 2 ‣ 4.2.1 ALFWorld ‣ 4.2 Open-World Capability Accumulation ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">2</a> shows that reusing past experience improves the Static Harness but is insufficient for broad continual adaptation. RAG increases the final average from 47.12% to 55.56% and achieves the lowest average forgetting among the adaptive baselines. However, retrieval alone cannot revise reusable procedures or routing rules. MemP and MemRL also improve individual categories, but their performance varies considerably across the stream. These results show that memory-based adaptation supports experience reuse, but does not consistently balance capability acquisition and retention.





Both HCL profiles achieve stronger overall performance by evolving the complete harness. Plasticity-HCL obtains the highest final average of 62.98% and solves all Two-object episodes, showing the strongest adaptation to the latest task but also greater forgetting. Stability-HCL reaches a comparable 61.74% and performs best on four of the six categories while substantially reducing average forgetting. Plasticity-HCL therefore favors capability acquisition, whereas Stability-HCL provides a better balance between adaptation and retention. Since the foundation model is frozen and the two profiles differ only in $`B_{n}`$, this comparison shows that the Continual Evaluator can explicitly control the stability–plasticity trade-off.







#### 4.2.2 Minecraft



We evaluate HCL with Qwen3.6-27B on a 50-task Minecraft curriculum that spans resource collection, crafting, mining, tool use, object placement, smelting, and tasks with multiple dependent operations. After each interaction, environment feedback is stored in Experience Memory and can be used to refine reusable capabilities and execution workflows. Previously validated skill tests are retained as historical anchors. A capability addition or revision is committed only when it improves the current objective and continues to pass all applicable retained tests. For comparison, the Static Harness follows the same curriculum without evolution. MemRL and MemP are reproduced within our harness as memory-management baselines, rather than run from their official repositories.



<figure id="S4.F3" class="ltx_figure">
<img src="2608.19013v1/curriculum_comparison.png" id="S4.F3.g1" class="ltx_graphics ltx_centering ltx_img_landscape" style="aspect-ratio:548/210;" width="548" height="210" alt="Refer to caption" />
<figcaption>Figure 3:  Curriculum progression and execution efficiency. (a) HCL completes all 50 tasks, while the Static Harness plateaus at 15. (b) Cumulative environment actions over the 50-task curriculum: HCL uses 83, versus 88 for MemRL and 91 for MemP; lower is more efficient.</figcaption>
</figure>



Figure <a href="#S4.F3" class="ltx_ref" title="Figure 3 ‣ 4.2.2 Minecraft ‣ 4.2 Open-World Capability Accumulation ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">3</a> shows differences in progression and execution efficiency. The Static Harness follows HCL for 15 tasks and then plateaus; HCL completes all 50, progressing from collection and crafting to persistent assets and coordinated multi-step execution. HCL uses 83 environment actions, compared with 88 for MemRL and 91 for MemP, indicating less redundant execution. Across later multi-step tasks, HCL avoids repeated diagnosis, crafting, and recovery actions, so its lower curve reflects more efficient reuse of accumulated experience while retaining progression across the full curriculum. Reproducing both baselines in our harness keeps the task interface, capability library, and environment stack common while varying memory management. These results show that HCL supports efficient continual adaptation without updating the foundation model.









### 4.3 Controlled Harness Continual Learning



We next evaluate HCL on task sequences. Within each stream, all HCL profiles share the same foundation model, task order, data allocation, editable artifacts, and candidate generator.





#### 4.3.1 Textual Reasoning



The textual stream follows the order MuSiQue (<a href="#bib.bib52" class="ltx_ref">Trivedi et al., 2022</a>), ProofWriter (<a href="#bib.bib56" class="ltx_ref">Tafjord et al., 2021</a>), GSM8K (<a href="#bib.bib57" class="ltx_ref">Cobbe et al., 2021</a>), and HotpotQA (<a href="#bib.bib58" class="ltx_ref">Yang et al., 2018</a>). These tasks cover multi-hop question answering, logical deduction, mathematical reasoning, and knowledge-intensive question answering. For each task, we use 250 examples for adaptation, 50 for validation, and 500 for testing. The foundation model remains frozen throughout the stream. HCL updates only the Task Interface, Experience Memory, Capability Map, and Adaptive Router.



<figure id="S4.T3" class="ltx_table">

 
<table id="S4.T3.2.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S4.T3.2.1.1" class="ltx_tr">
<th id="S4.T3.2.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Method</th>
<th id="S4.T3.2.1.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">MuSiQue</th>
<th id="S4.T3.2.1.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">ProofWriter</th>
<th id="S4.T3.2.1.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">GSM8K</th>
<th id="S4.T3.2.1.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_r ltx_border_tt">HotpotQA</th>
<th id="S4.T3.2.1.1.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Final Avg. ↑</th>
<th id="S4.T3.2.1.1.7" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Avg. Fgt. ↓</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S4.T3.2.1.2" class="ltx_tr">
<td id="S4.T3.2.1.2.1" class="ltx_td ltx_align_left ltx_border_t">DeepSeek-V4-Flash Zero-shot</td>
<td id="S4.T3.2.1.2.2" class="ltx_td ltx_align_center ltx_border_t">35.00</td>
<td id="S4.T3.2.1.2.3" class="ltx_td ltx_align_center ltx_border_t">42.80</td>
<td id="S4.T3.2.1.2.4" class="ltx_td ltx_align_center ltx_border_t">49.40</td>
<td id="S4.T3.2.1.2.5" class="ltx_td ltx_align_center ltx_border_r ltx_border_t">54.80</td>
<td id="S4.T3.2.1.2.6" class="ltx_td ltx_align_center ltx_border_t">45.50</td>
<td id="S4.T3.2.1.2.7" class="ltx_td ltx_align_center ltx_border_t">–</td>
</tr>
<tr id="S4.T3.2.1.3" class="ltx_tr">
<td id="S4.T3.2.1.3.1" class="ltx_td ltx_align_left">Stability-HCL (Ours)</td>
<td id="S4.T3.2.1.3.2" class="ltx_td ltx_align_center">27.60</td>
<td id="S4.T3.2.1.3.3" class="ltx_td ltx_align_center">73.00</td>
<td id="S4.T3.2.1.3.4" class="ltx_td ltx_align_center">50.40</td>
<td id="S4.T3.2.1.3.5" class="ltx_td ltx_align_center ltx_border_r">57.80</td>
<td id="S4.T3.2.1.3.6" class="ltx_td ltx_align_center">52.20</td>
<td id="S4.T3.2.1.3.7" class="ltx_td ltx_align_center">0.00</td>
</tr>
<tr id="S4.T3.2.1.4" class="ltx_tr">
<td id="S4.T3.2.1.4.1" class="ltx_td ltx_align_left ltx_border_bb">Plasticity-HCL (Ours)</td>
<td id="S4.T3.2.1.4.2" class="ltx_td ltx_align_center ltx_border_bb">29.00</td>
<td id="S4.T3.2.1.4.3" class="ltx_td ltx_align_center ltx_border_bb">77.00</td>
<td id="S4.T3.2.1.4.4" class="ltx_td ltx_align_center ltx_border_bb">92.00</td>
<td id="S4.T3.2.1.4.5" class="ltx_td ltx_align_center ltx_border_bb ltx_border_r">60.80</td>
<td id="S4.T3.2.1.4.6" class="ltx_td ltx_align_center ltx_border_bb">64.70</td>
<td id="S4.T3.2.1.4.7" class="ltx_td ltx_align_center ltx_border_bb">0.07</td>
</tr>
</tbody>
</table>

<figcaption>Table 3:  Final performance after the four-task textual-reasoning stream with DeepSeek-V4-Flash as the frozen foundation model. The Zero-shot baseline evaluates each task independently without sequential harness updates. The best and second-best results in each metric column are marked in bold and underlined, respectively.</figcaption>
</figure>



Table <a href="#S4.T3" class="ltx_ref" title="Table 3 ‣ 4.3.1 Textual Reasoning ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">3</a> shows how different historical-loss tolerances shift HCL between stronger retention and stronger adaptation. Stability-HCL requires accepted updates to preserve performance on the historical anchor set, reducing average forgetting to zero. This strict constraint substantially limits adaptation, resulting in a final average of 52.20%, compared with 64.70% for Plasticity-HCL. Nevertheless, Stability-HCL still outperforms the 45.50% zero-shot baseline, showing that it can acquire new behavior while fully retaining the previously measured behavior.





Plasticity-HCL relaxes the historical-retention requirement and therefore permits more aggressive harness updates. This increases the final average from 52.20% to 64.70%, while introducing only 0.07 average forgetting. With DeepSeek-V4-Flash frozen throughout the stream, these results show that the Continual Evaluator can shift HCL between stronger retention and stronger adaptation solely through the historical-loss tolerance.







#### 4.3.2 Multimodal Perception



The multimodal stream follows the order of COCO object detection, COCO image captioning, RefCOCO visual grounding, and VQAv2. Qwen3.6-27B remains frozen throughout the stream. For each task, we use 250 examples for adaptation, 50 for validation, and 500 for testing. We additionally compare with DGG (<a href="#bib.bib44" class="ltx_ref">Li et al., 2026b</a>), a recent adaptive method for sequential multi-task continual learning whose setting aligns with this controlled multimodal stream.



<figure id="S4.T4" class="ltx_table">

 
<table id="S4.T4.2.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S4.T4.2.1.1" class="ltx_tr">
<th id="S4.T4.2.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Method</th>
<th id="S4.T4.2.1.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Detection</th>
<th id="S4.T4.2.1.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Caption</th>
<th id="S4.T4.2.1.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Grounding</th>
<th id="S4.T4.2.1.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_r ltx_border_tt">VQAv2</th>
<th id="S4.T4.2.1.1.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Final Avg. ↑</th>
<th id="S4.T4.2.1.1.7" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Avg. Fgt. ↓</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S4.T4.2.1.2" class="ltx_tr">
<td id="S4.T4.2.1.2.1" class="ltx_td ltx_align_left ltx_border_t">Qwen3.6-27B Zero-shot</td>
<td id="S4.T4.2.1.2.2" class="ltx_td ltx_align_center ltx_border_t">4.27</td>
<td id="S4.T4.2.1.2.3" class="ltx_td ltx_align_center ltx_border_t">25.47</td>
<td id="S4.T4.2.1.2.4" class="ltx_td ltx_align_center ltx_border_t">43.00</td>
<td id="S4.T4.2.1.2.5" class="ltx_td ltx_align_center ltx_border_r ltx_border_t">84.87</td>
<td id="S4.T4.2.1.2.6" class="ltx_td ltx_align_center ltx_border_t">39.40</td>
<td id="S4.T4.2.1.2.7" class="ltx_td ltx_align_center ltx_border_t">–</td>
</tr>
<tr id="S4.T4.2.1.3" class="ltx_tr">
<td id="S4.T4.2.1.3.1" class="ltx_td ltx_align_left">DGG (<a href="#bib.bib44" class="ltx_ref">Li et al., 2026b</a>)</td>
<td id="S4.T4.2.1.3.2" class="ltx_td ltx_align_center">29.58</td>
<td id="S4.T4.2.1.3.3" class="ltx_td ltx_align_center">29.77</td>
<td id="S4.T4.2.1.3.4" class="ltx_td ltx_align_center">48.96</td>
<td id="S4.T4.2.1.3.5" class="ltx_td ltx_align_center ltx_border_r">62.60</td>
<td id="S4.T4.2.1.3.6" class="ltx_td ltx_align_center">42.73</td>
<td id="S4.T4.2.1.3.7" class="ltx_td ltx_align_center">0.26</td>
</tr>
<tr id="S4.T4.2.1.4" class="ltx_tr">
<td id="S4.T4.2.1.4.1" class="ltx_td ltx_align_left">Plasticity-HCL (Ours)</td>
<td id="S4.T4.2.1.4.2" class="ltx_td ltx_align_center">64.14</td>
<td id="S4.T4.2.1.4.3" class="ltx_td ltx_align_center">37.31</td>
<td id="S4.T4.2.1.4.4" class="ltx_td ltx_align_center">90.60</td>
<td id="S4.T4.2.1.4.5" class="ltx_td ltx_align_center ltx_border_r">79.80</td>
<td id="S4.T4.2.1.4.6" class="ltx_td ltx_align_center">67.96</td>
<td id="S4.T4.2.1.4.7" class="ltx_td ltx_align_center">0.81</td>
</tr>
<tr id="S4.T4.2.1.5" class="ltx_tr">
<td id="S4.T4.2.1.5.1" class="ltx_td ltx_align_left ltx_border_bb">Stability-HCL (Ours)</td>
<td id="S4.T4.2.1.5.2" class="ltx_td ltx_align_center ltx_border_bb">65.34</td>
<td id="S4.T4.2.1.5.3" class="ltx_td ltx_align_center ltx_border_bb">39.41</td>
<td id="S4.T4.2.1.5.4" class="ltx_td ltx_align_center ltx_border_bb">91.60</td>
<td id="S4.T4.2.1.5.5" class="ltx_td ltx_align_center ltx_border_bb ltx_border_r">79.33</td>
<td id="S4.T4.2.1.5.6" class="ltx_td ltx_align_center ltx_border_bb">68.92</td>
<td id="S4.T4.2.1.5.7" class="ltx_td ltx_align_center ltx_border_bb">0.22</td>
</tr>
</tbody>
</table>

<figcaption>Table 4:  Final performance after the four-task multimodal-perception stream with Qwen3.6-27B as the frozen foundation model. The Zero-shot baseline evaluates each task independently without sequential harness updates. The best and second-best results in each metric column are marked in bold and underlined, respectively.</figcaption>
</figure>



Table <a href="#S4.T4" class="ltx_ref" title="Table 4 ‣ 4.3.2 Multimodal Perception ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">4</a> shows that both HCL profiles substantially outperform Zero-shot and DGG in final average. The largest gains occur in detection and grounding, where the harness must organize spatial information into task-specific outputs. HCL also improves captioning, indicating that its evolving components can support different multimodal objectives and output formats within one task stream.





VQAv2 is the only task on which Zero-shot remains stronger, as the frozen model already performs well on direct image–question answering. Nevertheless, both HCL profiles retain substantially higher VQAv2 performance than DGG. Stability-HCL achieves the highest final average of 68.92% and the lowest forgetting of 0.22, while Plasticity-HCL reaches a similar final average of 67.96%. Overall, HCL enables a single frozen model to continually handle heterogeneous multimodal tasks while maintaining a stronger stability–plasticity balance.









### 4.4 Stability–Plasticity Trade-off



Following Eq. (<a href="#S3.E13" class="ltx_ref" title="In Validity Check. ‣ 3.3.2 Continual Evaluator: Historical Evaluation and Commitment ‣ 3.3 Guarded Harness Evolution ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">13</a>), we vary only the historical-loss tolerance $`B_{n}`$ in $`D_{n}\leq B_{n}`$, while holding the current-improvement and validity criteria fixed. Specifically, $`\delta_{n}`$ in Eq. (<a href="#S3.E9" class="ltx_ref" title="In Current Improvement. ‣ 3.3.2 Continual Evaluator: Historical Evaluation and Commitment ‣ 3.3 Guarded Harness Evolution ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">9</a>) requires an improvement of at least two correct validation cases. Under the validity criterion in Eq. (<a href="#S3.E12" class="ltx_ref" title="In Validity Check. ‣ 3.3.2 Continual Evaluator: Historical Evaluation and Commitment ‣ 3.3 Guarded Harness Evolution ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">12</a>), each candidate must achieve at least 90.00% output-format compliance and introduce no syntax, tool-use, or environment violations. These thresholds are chosen heuristically to balance current-task improvement with candidate reliability and remain identical across all settings.





The historical loss $`D_{n}`$ in Eq. (<a href="#S3.E11" class="ltx_ref" title="In Historical Retention. ‣ 3.3.2 Continual Evaluator: Historical Evaluation and Commitment ‣ 3.3 Guarded Harness Evolution ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">11</a>) counts anchors that are solved by $`H_{n}`$ but fail under $`\widetilde{H}_{n+1}`$. Within each run, we fix $`B_{n}\equiv b`$ for all candidate decisions and compare $`b\in\{0,1,3,\infty\}`$. The settings $`b=0`$ and $`b=\infty`$ correspond to Stability-HCL and Plasticity-HCL, respectively. The intermediate settings $`b=1`$ and $`b=3`$ allow each candidate to introduce at most one and three newly failed anchors across $`A_{n}`$. Each run uses 300 adaptation, 80 validation, and 600 test examples per task, with 80 anchors for every earlier task. A predefined parameter controls the composition of previously successful and failed examples in each anchor set. If either group contains too few examples to meet its target, the remaining slots are filled from the other group. All other experimental conditions remain fixed.



<figure id="S4.T5" class="ltx_table">

 
<table id="S4.T5.2.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S4.T5.2.1.1" class="ltx_tr">
<th id="S4.T5.2.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Historical-loss tolerance <em>b</em></th>
<th id="S4.T5.2.1.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">MuSiQue</th>
<th id="S4.T5.2.1.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">ProofWriter</th>
<th id="S4.T5.2.1.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">GSM8K</th>
<th id="S4.T5.2.1.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_r ltx_border_tt">HotpotQA</th>
<th id="S4.T5.2.1.1.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Final Avg. ↑</th>
<th id="S4.T5.2.1.1.7" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Avg. Fgt. ↓</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S4.T5.2.1.2" class="ltx_tr">
<td id="S4.T5.2.1.2.1" class="ltx_td ltx_align_left ltx_border_t"><em>b</em> = 0</td>
<td id="S4.T5.2.1.2.2" class="ltx_td ltx_align_center ltx_border_t">27.83</td>
<td id="S4.T5.2.1.2.3" class="ltx_td ltx_align_center ltx_border_t">73.33</td>
<td id="S4.T5.2.1.2.4" class="ltx_td ltx_align_center ltx_border_t">84.33</td>
<td id="S4.T5.2.1.2.5" class="ltx_td ltx_align_center ltx_border_r ltx_border_t">59.50</td>
<td id="S4.T5.2.1.2.6" class="ltx_td ltx_align_center ltx_border_t">61.25</td>
<td id="S4.T5.2.1.2.7" class="ltx_td ltx_align_center ltx_border_t">0.39</td>
</tr>
<tr id="S4.T5.2.1.3" class="ltx_tr">
<td id="S4.T5.2.1.3.1" class="ltx_td ltx_align_left"><em>b</em> = 1</td>
<td id="S4.T5.2.1.3.2" class="ltx_td ltx_align_center">24.83</td>
<td id="S4.T5.2.1.3.3" class="ltx_td ltx_align_center">77.50</td>
<td id="S4.T5.2.1.3.4" class="ltx_td ltx_align_center">92.33</td>
<td id="S4.T5.2.1.3.5" class="ltx_td ltx_align_center ltx_border_r">59.17</td>
<td id="S4.T5.2.1.3.6" class="ltx_td ltx_align_center">63.46</td>
<td id="S4.T5.2.1.3.7" class="ltx_td ltx_align_center">1.22</td>
</tr>
<tr id="S4.T5.2.1.4" class="ltx_tr">
<td id="S4.T5.2.1.4.1" class="ltx_td ltx_align_left"><em>b</em> = 3</td>
<td id="S4.T5.2.1.4.2" class="ltx_td ltx_align_center">26.83</td>
<td id="S4.T5.2.1.4.3" class="ltx_td ltx_align_center">79.83</td>
<td id="S4.T5.2.1.4.4" class="ltx_td ltx_align_center">83.00</td>
<td id="S4.T5.2.1.4.5" class="ltx_td ltx_align_center ltx_border_r">58.50</td>
<td id="S4.T5.2.1.4.6" class="ltx_td ltx_align_center">62.04</td>
<td id="S4.T5.2.1.4.7" class="ltx_td ltx_align_center">2.00</td>
</tr>
<tr id="S4.T5.2.1.5" class="ltx_tr">
<td id="S4.T5.2.1.5.1" class="ltx_td ltx_align_left ltx_border_bb"><em>b</em> = ∞</td>
<td id="S4.T5.2.1.5.2" class="ltx_td ltx_align_center ltx_border_bb">28.33</td>
<td id="S4.T5.2.1.5.3" class="ltx_td ltx_align_center ltx_border_bb">71.00</td>
<td id="S4.T5.2.1.5.4" class="ltx_td ltx_align_center ltx_border_bb">82.00</td>
<td id="S4.T5.2.1.5.5" class="ltx_td ltx_align_center ltx_border_bb ltx_border_r">59.17</td>
<td id="S4.T5.2.1.5.6" class="ltx_td ltx_align_center ltx_border_bb">60.13</td>
<td id="S4.T5.2.1.5.7" class="ltx_td ltx_align_center ltx_border_bb">3.45</td>
</tr>
</tbody>
</table>

<figcaption>Table 5:  Performance under different fixed values of <em>b</em>, where <em>B</em><sub><em>n</em></sub> ≡ <em>b</em> within each run. All other experimental conditions are held constant. The best and second-best results in each metric column are marked in bold and underlined, respectively.</figcaption>
</figure>

<figure id="S4.F4" class="ltx_figure">


<figure id="S4.F4.sf1" class="ltx_figure ltx_figure_panel ltx_align_center">

<figcaption>(a)  Textual reasoning under different fixed values of <em>b</em>.</figcaption>
</figure>


<figure id="S4.F4.sf2" class="ltx_figure ltx_figure_panel ltx_align_center">

<figcaption>(b)  Multimodal perception under <em>b</em> = 0 and <em>b</em> = ∞.</figcaption>
</figure>


<figcaption>Figure 4:  Stage-wise forgetting under different fixed historical-loss tolerances.</figcaption>
</figure>



Table <a href="#S4.T5" class="ltx_ref" title="Table 5 ‣ 4.4 Stability–Plasticity Trade-off ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">5</a> shows that increasing $`b`$ weakens retention. Average forgetting rises from 0.39 at $`b=0`$ to 3.45 at $`b=\infty`$. Final performance does not increase accordingly: the highest final average of 63.46% occurs at $`b=1`$, while the unrestricted setting reaches 60.13%. One possible explanation is that each committed update changes the subsequent evolution trajectory: without historical constraints, locally beneficial updates may overwrite reusable harness contents, weakening both retention and the experience or capabilities available for later tasks. A moderate value of $`b`$ therefore provides additional flexibility for adaptation without allowing excessive historical loss. The remaining forgetting at $`b=0`$ occurs because the constraint covers a finite anchor set, whereas forgetting is evaluated on separate historical test cases. Preserving all anchors currently solved by $`H_{n}`$ cannot guarantee unchanged behavior on historical cases not represented by $`A_{n}`$.





Figure <a href="#S4.F4" class="ltx_ref" title="Figure 4 ‣ 4.4 Stability–Plasticity Trade-off ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">4</a> complements these final results by showing how forgetting develops across the task sequence. In the textual stream shown in Figure <a href="#S4.F4" class="ltx_ref" title="Figure 4 ‣ 4.4 Stability–Plasticity Trade-off ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">4</a>(a), smaller values of $`b`$ generally maintain lower forgetting, with final forgetting increasing consistently from 0.39 at $`b=0`$ to 3.45 at $`b=\infty`$. In the multimodal stream shown in Figure <a href="#S4.F4" class="ltx_ref" title="Figure 4 ‣ 4.4 Stability–Plasticity Trade-off ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">4</a>(b), Stability-HCL remains below Plasticity-HCL at every stage after $`T_{1}`$ and finishes with forgetting of 0.22 rather than 0.81. This pattern reflects the role of $`b`$ in the commitment gate: smaller values reject more candidates that improve the current task at the expense of historical behavior, thereby constraining the harness to more retention-preserving update trajectories. Larger values permit greater adaptation flexibility but expose earlier tasks to more regression. Together, the two trajectories illustrate that a stricter historical-loss tolerance suppresses forgetting throughout harness evolution.







### 4.5 Ablation Study



We conduct component ablations on the controlled multimodal stream using Qwen3.5-4B with the balanced HCL configuration. The stream follows COCO object detection $`\rightarrow`$ COCO image captioning $`\rightarrow`$ RefCOCO visual grounding $`\rightarrow`$ VQAv2, with 250 adaptation, 50 validation, and 500 test examples for each task. Starting from Full HCL, we disable updates to one harness component at a time while keeping the other three components adaptive. All variants use the same foundation model, task order, evaluation criteria, and update schedule. Table <a href="#S4.T6" class="ltx_ref" title="Table 6 ‣ 4.5 Ablation Study ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">6</a> summarizes the resulting component-wise ablation results.



<figure id="S4.T6" class="ltx_table">
<table id="S4.T6.2" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="S4.T6.2.1" class="ltx_tr">
<th id="S4.T6.2.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Component</th>
<th id="S4.T6.2.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt"><em>I</em></th>
<th id="S4.T6.2.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt"><em>M</em></th>
<th id="S4.T6.2.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt"><em>C</em></th>
<th id="S4.T6.2.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_r ltx_border_tt"><em>R</em></th>
<th id="S4.T6.2.1.6" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Final Avg. ↑</th>
<th id="S4.T6.2.1.7" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt">Avg. Fgt. ↓</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="S4.T6.2.2" class="ltx_tr">
<td id="S4.T6.2.2.1" class="ltx_td ltx_align_left ltx_border_t">Zero-shot</td>
<td id="S4.T6.2.2.2" class="ltx_td ltx_align_center ltx_border_t">–</td>
<td id="S4.T6.2.2.3" class="ltx_td ltx_align_center ltx_border_t">–</td>
<td id="S4.T6.2.2.4" class="ltx_td ltx_align_center ltx_border_t">–</td>
<td id="S4.T6.2.2.5" class="ltx_td ltx_align_center ltx_border_r ltx_border_t">–</td>
<td id="S4.T6.2.2.6" class="ltx_td ltx_align_center ltx_border_t">34.84</td>
<td id="S4.T6.2.2.7" class="ltx_td ltx_align_center ltx_border_t">–</td>
</tr>
<tr id="S4.T6.2.3" class="ltx_tr">
<td id="S4.T6.2.3.1" class="ltx_td ltx_align_left">w/o Interface update</td>
<td id="S4.T6.2.3.2" class="ltx_td ltx_align_center">×</td>
<td id="S4.T6.2.3.3" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.3.4" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.3.5" class="ltx_td ltx_align_center ltx_border_r">✓</td>
<td id="S4.T6.2.3.6" class="ltx_td ltx_align_center">62.37</td>
<td id="S4.T6.2.3.7" class="ltx_td ltx_align_center">0.11</td>
</tr>
<tr id="S4.T6.2.4" class="ltx_tr">
<td id="S4.T6.2.4.1" class="ltx_td ltx_align_left">w/o Memory update</td>
<td id="S4.T6.2.4.2" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.4.3" class="ltx_td ltx_align_center">×</td>
<td id="S4.T6.2.4.4" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.4.5" class="ltx_td ltx_align_center ltx_border_r">✓</td>
<td id="S4.T6.2.4.6" class="ltx_td ltx_align_center">62.28</td>
<td id="S4.T6.2.4.7" class="ltx_td ltx_align_center">0.83</td>
</tr>
<tr id="S4.T6.2.5" class="ltx_tr">
<td id="S4.T6.2.5.1" class="ltx_td ltx_align_left">w/o Capability update</td>
<td id="S4.T6.2.5.2" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.5.3" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.5.4" class="ltx_td ltx_align_center">×</td>
<td id="S4.T6.2.5.5" class="ltx_td ltx_align_center ltx_border_r">✓</td>
<td id="S4.T6.2.5.6" class="ltx_td ltx_align_center">63.12</td>
<td id="S4.T6.2.5.7" class="ltx_td ltx_align_center">0.06</td>
</tr>
<tr id="S4.T6.2.6" class="ltx_tr">
<td id="S4.T6.2.6.1" class="ltx_td ltx_align_left">w/o Router update</td>
<td id="S4.T6.2.6.2" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.6.3" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.6.4" class="ltx_td ltx_align_center">✓</td>
<td id="S4.T6.2.6.5" class="ltx_td ltx_align_center ltx_border_r">×</td>
<td id="S4.T6.2.6.6" class="ltx_td ltx_align_center">62.77</td>
<td id="S4.T6.2.6.7" class="ltx_td ltx_align_center">0.14</td>
</tr>
<tr id="S4.T6.2.7" class="ltx_tr">
<td id="S4.T6.2.7.1" class="ltx_td ltx_align_left ltx_border_bb">Full HCL</td>
<td id="S4.T6.2.7.2" class="ltx_td ltx_align_center ltx_border_bb">✓</td>
<td id="S4.T6.2.7.3" class="ltx_td ltx_align_center ltx_border_bb">✓</td>
<td id="S4.T6.2.7.4" class="ltx_td ltx_align_center ltx_border_bb">✓</td>
<td id="S4.T6.2.7.5" class="ltx_td ltx_align_center ltx_border_bb ltx_border_r">✓</td>
<td id="S4.T6.2.7.6" class="ltx_td ltx_align_center ltx_border_bb">63.41</td>
<td id="S4.T6.2.7.7" class="ltx_td ltx_align_center ltx_border_bb">0.45</td>
</tr>
</tbody>
</table>
<figcaption>Table 6:  Component ablation on the controlled multimodal stream. <em>I</em>, <em>M</em>, <em>C</em>, and <em>R</em> denote the Task Interface, Experience Memory, Capability Map, and Adaptive Router. A check mark indicates that the component is updated, while a cross indicates that its update is disabled. The best and second-best results in each metric column are marked in bold and underlined, respectively.</figcaption>
</figure>



Full HCL achieves the highest final average of 63.41%, showing that the four components contribute complementarily to continual adaptation. Disabling Experience Memory or the Task Interface produces the largest decrease in final performance. In particular, removing Memory updates also increases forgetting to 0.83, indicating that evolving memory supports both the acquisition and retention of behavior. Disabling Capability Map or Adaptive Router updates causes smaller but consistent performance reductions. The small effect of Capability updates may reflect that this multimodal stream relies less on reusable executable procedures than the Minecraft curriculum.





Several ablations show lower forgetting than Full HCL because restricting the editable components also limits the extent of adaptation. Lower forgetting alone therefore does not necessarily indicate a better evolving harness and should be considered together with final performance. Exact interventions and full per-task results are reported in Appendix <a href="#A2" class="ltx_ref" title="Appendix B Component Ablation Details ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">B</a>.









## 5 Conclusion



We formulate Harness Continual Learning (HCL) as a new continual learning paradigm in which the agent harness, rather than model parameters, evolves through sequential experience. Our framework treats the mutable harness components as a unified evolving state and separates candidate generation from evaluation and commitment, making historical retention an explicit condition for deployment. Experiments show that harness evolution can accumulate capabilities and recover from failures, while also causing measurable forgetting under a frozen foundation model. Explicitly controlling historical loss enables HCL to balance stability and plasticity. These findings demonstrate the potential of continual learning at the harness level, while highlighting unresolved challenges in efficient retention evaluation, harness-content consolidation, and evaluation over longer interaction streams. We hope HCL provides a foundation for addressing these challenges and encourages broader research on reliable agent continual learning.







## References

- Abbes et al. (2026) I. Abbes, G. Subbaraj, M. Riemer, N. Islah, T. Tabaru, H. Kingetsu, S. Chandar, and I. Rish  Revisiting replay and gradient alignment for continual pre-training of large language models.  In Proceedings of the 4th Conference on Lifelong Learning Agents,  pp. 465–486.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Abuzakuk et al. (2026) S. Abuzakuk, A. Kermarrec, R. Sharma, R. M. Veski, and M. de Vos  Optimizing Agentic Workflows using Meta-tools.  External Links: 2601.22037  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Bellitto et al. (2024) G. Bellitto, F. P. Salanitri, M. Pennisi, M. Boschini, L. Bonicelli, A. Porrello, S. Calderara, S. Palazzo, and C. Spampinato  Saliency-driven Experience Replay for Continual Learning.  In Advances in Neural Information Processing Systems,  Vol. 37.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Chen et al. (2025) J. Chen, J. Ye, and G. Wang  From Standalone LLMs to Integrated Intelligence: A Survey of Compound AI Systems.  External Links: 2506.04565  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>. 
- Chen et al. (2026a) M. Chen, J. Wang, Z. Liu, Y. Wang, and Q. Wang  From Failed Trajectories to Reliable LLM Agents: Diagnosing and Repairing Harness Flaws.  External Links: 2606.06324  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Chen et al. (2026b) T. Chen, S. Lu, K. Zhao, W. Meng, H. Teng, T. Li, C. Li, X. Liu, J. Liang, Z. Zhang, Y. Xie, H. Qu, K. Shao, and J. Luan  HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry.  External Links: 2606.14249  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Cobbe et al. (2021) K. Cobbe, V. Kosaraju, M. Bavarian, M. Chen, H. Jun, L. Kaiser, M. Plappert, J. Tworek, J. Hilton, R. Nakano, C. Hesse, and J. Schulman  Training Verifiers to Solve Math Word Problems.  External Links: 2110.14168  Cited by: <a href="#S4.SS3.SSS1.p1.1" class="ltx_ref" title="4.3.1 Textual Reasoning ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4.3.1</a>. 
- Delange et al. (2022) M. Delange, R. Aljundi, M. Masana, S. Parisot, X. Jia, A. Leonardis, G. Slabaugh, and T. Tuytelaars  A Continual Learning Survey: Defying Forgetting in Classification Tasks.  IEEE Transactions on Pattern Analysis and Machine Intelligence 44 (7), pp. 3366–3385.  External Links: <a href="https://dx.doi.org/10.1109/TPAMI.2021.3057446" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>, <a href="#S3.SS4.p1.1" class="ltx_ref" title="3.4 Connections to Model-Centric Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.4</a>. 
- Fang et al. (2026) R. Fang, Y. Liang, X. Wang, J. Wu, S. Qiao, P. Xie, F. Huang, H. Chen, and N. Zhang  MemP: Exploring Agent Procedural Memory.  In Findings of the Association for Computational Linguistics: ACL 2026,  pp. 17490–17502.  External Links: <a href="https://dx.doi.org/10.18653/v1/2026.findings-acl.866" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S4.SS2.SSS1.p2.1" class="ltx_ref" title="4.2.1 ALFWorld ‣ 4.2 Open-World Capability Accumulation ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4.2.1</a>, <a href="#S4.T2.2.1.4.1" class="ltx_ref" title="In 4.2.1 ALFWorld ‣ 4.2 Open-World Capability Accumulation ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">Table 2</a>. 
- Gu (2026) S. Gu  From Model Scaling to System Scaling: Scaling the Harness in Agentic AI.  External Links: 2605.26112  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- He et al. (2026) C. He, X. Zhou, D. Wang, H. Xu, W. Liu, and C. Miao  Harness Engineering for Language Agents: The Harness Layer as Control, Agency, and Runtime.  Preprints.  External Links: <a href="https://dx.doi.org/10.20944/preprints202603.1756.v2" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S3.SS2.p1.1" class="ltx_ref" title="3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.2</a>. 
- Jimenez et al. (2024) C. E. Jimenez, J. Yang, A. Wettig, S. Yao, K. Pei, O. Press, and K. Narasimhan  SWE-bench: Can Language Models Resolve Real-World GitHub Issues?.  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>. 
- Kang et al. (2026) B. Kang, J. Gu, T. Feng, Q. Fan, Y. Shi, L. Wang, W. Li, and Y. Gao  Don’t forget why you started: tackling dual forgetting in vision-language continual learning.  In Forty-third International Conference on Machine Learning,  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Kang et al. (2025) B. Kang, L. Wang, Z. Wu, T. Feng, Y. Li, Y. Gao, and W. Li  Dynamic multi-layer null space projection for vision-language continual learning.  In 2025 IEEE/CVF International Conference on Computer Vision (ICCV),  pp. 2077–2086.  Cited by: <a href="#S3.SS4.p2.1" class="ltx_ref" title="3.4 Connections to Model-Centric Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.4</a>. 
- Karpas et al. (2022) E. Karpas, O. Abend, Y. Belinkov, B. Lenz, O. Lieber, N. Ratner, Y. Shoham, H. Bata, Y. Levine, K. Leyton-Brown, D. Muhlgay, N. Rozen, E. Schwartz, G. Shachaf, S. Shalev-Shwartz, A. Shashua, and M. Tenenholtz  MRKL Systems: A modular, neuro-symbolic architecture that combines large language models, external knowledge sources and discrete reasoning.  External Links: 2205.00445  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Khattab et al. (2024) O. Khattab, A. Singhvi, P. Maheshwari, Z. Zhang, K. Santhanam, S. Vardhamanan, S. Haq, A. Sharma, T. T. Joshi, H. Moazam, H. Miller, M. Zaharia, and C. Potts  DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines.  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Kim et al. (2025) J. Kim, Y. Kim, and J. Sohn  Measuring Representational Shifts in Continual Learning: A Linear Transformation Perspective.  In Proceedings of the 42nd International Conference on Machine Learning,  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Kirkpatrick et al. (2017) J. Kirkpatrick, R. Pascanu, N. Rabinowitz, J. Veness, G. Desjardins, A. A. Rusu, K. Milan, J. Quan, T. Ramalho, A. Grabska-Barwinska, et al.  Overcoming catastrophic forgetting in neural networks.  Proceedings of the national academy of sciences 114 (13), pp. 3521–3526.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Lewandowski et al. (2025) A. Lewandowski, M. Bortkiewicz, S. Kumar, A. György, D. Schuurmans, M. Ostaszewski, and M. C. Machado  Learning Continually by Spectral Regularization.  In The Thirteenth International Conference on Learning Representations,  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Li et al. (2026a) J. Li, X. Xiao, Y. Zhang, C. Liu, L. Zhao, X. Liao, Y. Ji, J. Wang, J. Gu, Y. Ge, W. Xu, X. Fang, X. Xu, T. Zhao, Y. Kim, T. Wang, J. Hamm, S. Krishnaswamy, J. Huan, and C. Reddy  Agent Harness Engineering: A Survey.  Note: Withdrawn TMLR submission  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S3.SS2.p1.1" class="ltx_ref" title="3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.2</a>. 
- Li et al. (2026b) S. Li, M. Gao, T. Su, X. Zhang, and Z. Wang  Multimodal continual instruction tuning with dynamic gradient guidance.  External Links: 2511.15164  Cited by: <a href="#S4.SS3.SSS2.p1.1" class="ltx_ref" title="4.3.2 Multimodal Perception ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4.3.2</a>, <a href="#S4.T4.2.1.3.1" class="ltx_ref" title="In 4.3.2 Multimodal Perception ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">Table 4</a>. 
- Liang et al. (2025) Y. Liang, J. Chen, and W. Li  Gated Integration of Low-Rank Adaptation for Continual Learning of Large Language Models.  Advances in Neural Information Processing Systems 38, pp. 76577–76607.  External Links: <a href="https://dx.doi.org/10.52202/085713-2310" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Lin et al. (2026) M. Lin, J. Wu, Z. Wang, Z. Shi, Y. Sang, B. He, Z. Liu, T. Wei, Z. Wu, Z. Zhang, D. Wang, X. Zhang, B. Dumoulin, C. Xie, Y. Zhou, S. Wang, and H. Lu  Harness Updating Is Not Harness Benefit: Disentangling Evolution Capabilities in Self-Evolving LLM Agents.  External Links: 2605.30621  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Liu et al. (2026a) Y. Liu, T. Nguyen, and F. D. Salim  CP-moe: consistency-preserving mixture-of-experts for continual learning.  arXiv preprint arXiv:2605.20247.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Liu et al. (2026b) Z. Liu, Z. Shi, Y. Sang, B. He, M. Lin, T. Wei, D. Wang, B. Dumoulin, W. Jin, and H. Lu  Adaptive Auto-Harness: Sustained Self-Improvement for Agentic System Deployment on Open-Ended Task Streams.  External Links: 2606.01770  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Liu et al. (2026c) Z. Liu, B. Kang, W. Li, H. Yuan, Y. Yang, W. Li, Y. Zhu, T. Feng, and J. Luo  Branch, or layer? zeroth-order optimization for continual learning of vision-language models.  In Proceedings of the AAAI Conference on Artificial Intelligence,  pp. 24026–24034.  Cited by: <a href="#S3.SS4.p2.1" class="ltx_ref" title="3.4 Connections to Model-Centric Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.4</a>. 
- Lopez-Paz and Ranzato (2017) D. Lopez-Paz and M. Ranzato  Gradient Episodic Memory for Continual Learning.  In Advances in Neural Information Processing Systems, I. Guyon, U. V. Luxburg, S. Bengio, H. Wallach, R. Fergus, S. Vishwanathan, and R. Garnett (Eds.),  Vol. 30.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Lu et al. (2024) A. Lu, T. Feng, H. Yuan, X. Song, and Y. Sun  Revisiting Neural Networks for Continual Learning: An Architectural Perspective.  External Links: 2404.14829, <a href="https://dx.doi.org/10.24963/ijcai.2024/514" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Meng et al. (2026) Q. Meng, Y. Wang, L. Chen, Y. Li, W. Wu, W. Jiang, Q. Wang, C. Lu, Y. Gao, Y. Wu, and Y. Hu  Agent Harness for Large Language Model Agents: A Survey.  Preprints.  External Links: <a href="https://dx.doi.org/10.20944/preprints202604.0428.v3" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>, <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Packer et al. (2023) C. Packer, S. Wooders, K. Lin, V. Fang, S. G. Patil, I. Stoica, and J. E. Gonzalez  MemGPT: Towards LLMs as Operating Systems.  External Links: 2310.08560  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S3.SS2.SSS2.p1.1" class="ltx_ref" title="3.2.2 Experience Memory ‣ 3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.2.2</a>. 
- Park et al. (2023) J. S. Park, J. C. O’Brien, C. J. Cai, M. R. Morris, P. Liang, and M. S. Bernstein  Generative Agents: Interactive Simulacra of Human Behavior.  External Links: <a href="https://dx.doi.org/10.1145/3586183.3606763" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S3.SS2.SSS2.p1.1" class="ltx_ref" title="3.2.2 Experience Memory ‣ 3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.2.2</a>. 
- Schick et al. (2023) T. Schick, J. Dwivedi-Yu, R. Dessì, R. Raileanu, M. Lomeli, E. Hambro, L. Zettlemoyer, N. Cancedda, and T. Scialom  Toolformer: Language Models Can Teach Themselves to Use Tools.  Vol. 36.  External Links: <a href="https://dx.doi.org/10.52202/075280-2997" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Shang et al. (2025) J. Shang, S. Shao, T. Tong, F. Yang, Y. Chen, Y. Jiao, J. Liu, and Y. Gao  Divide and Orthogonalize: Efficient Continual Learning with Local Model Space Projection.  In Proceedings of the Forty-First Conference on Uncertainty in Artificial Intelligence,  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Shen et al. (2023) Y. Shen, K. Song, X. Tan, D. Li, W. Lu, and Y. Zhuang  HuggingGPT: Solving AI Tasks with ChatGPT and its Friends in Hugging Face.  Vol. 36.  External Links: <a href="https://dx.doi.org/10.52202/075280-1657" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Shi et al. (2025) H. Shi, Z. Xu, H. Wang, W. Qin, W. Wang, Y. Wang, Z. Wang, S. Ebrahimi, and H. Wang  Continual Learning of Large Language Models: A Comprehensive Survey.  Vol. 58.  External Links: <a href="https://dx.doi.org/10.1145/3735633" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>. 
- Shinn et al. (2023) N. Shinn, F. Cassano, A. Gopinath, K. Narasimhan, and S. Yao  Reflexion: Language Agents with Verbal Reinforcement Learning.  In Advances in Neural Information Processing Systems, A. Oh, T. Naumann, A. Globerson, K. Saenko, M. Hardt, and S. Levine (Eds.),  Vol. 36, pp. 8634–8652.  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S3.SS2.SSS2.p1.1" class="ltx_ref" title="3.2.2 Experience Memory ‣ 3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.2.2</a>. 
- Shridhar et al. (2021) M. Shridhar, X. Yuan, M. Côté, Y. Bisk, A. Trischler, and M. Hausknecht  ALFWorld: Aligning Text and Embodied Environments for Interactive Learning.  International Conference on Learning Representations.  External Links: 2010.03768  Cited by: <a href="#S4.p1.1" class="ltx_ref" title="4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4</a>. 
- Tafjord et al. (2021) O. Tafjord, B. Dalvi, and P. Clark  ProofWriter: Generating Implications, Proofs, and Abductive Statements over Natural Language.  In Findings of the Association for Computational Linguistics: ACL-IJCNLP 2021, C. Zong, F. Xia, W. Li, and R. Navigli (Eds.),  Online, pp. 3621–3634.  Cited by: <a href="#S4.SS3.SSS1.p1.1" class="ltx_ref" title="4.3.1 Textual Reasoning ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4.3.1</a>. 
- Trivedi et al. (2022) H. Trivedi, N. Balasubramanian, T. Khot, and A. Sabharwal  MuSiQue: Multihop Questions via Single-hop Question Composition.  Transactions of the Association for Computational Linguistics 10, pp. 539–554.  Cited by: <a href="#S4.SS3.SSS1.p1.1" class="ltx_ref" title="4.3.1 Textual Reasoning ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4.3.1</a>. 
- Urettini and Carta (2025) E. Urettini and A. Carta  Online curvature-aware replay: leveraging second-order information for online continual learning.  In Proceedings of the 42nd International Conference on Machine Learning,  pp. 60590–60609.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Wang et al. (2024a) G. Wang, Y. Xie, Y. Jiang, A. Mandlekar, C. Xiao, Y. Zhu, L. Fan, and A. Anandkumar  Voyager: An Open-Ended Embodied Agent with Large Language Models.  Transactions on Machine Learning Research.  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>, <a href="#S4.p1.1" class="ltx_ref" title="4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4</a>. 
- Wang et al. (2024b) L. Wang, X. Zhang, H. Su, and J. Zhu  A comprehensive survey of continual learning: Theory, method and application.  IEEE transactions on pattern analysis and machine intelligence 46 (8), pp. 5362–5383.  Cited by: <a href="#S1.p1.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>, <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>, <a href="#S3.SS4.p1.1" class="ltx_ref" title="3.4 Connections to Model-Centric Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.4</a>. 
- Wang et al. (2025a) X. Wang, S. Li, J. Zhang, and S. Chen  Cut out and replay: a simple yet versatile strategy for multi-label online continual learning.  In Proceedings of the 42nd International Conference on Machine Learning,  pp. 63530–63548.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Wang et al. (2022a) Z. Wang, Z. Zhang, S. Ebrahimi, R. Sun, H. Zhang, C. Lee, X. Ren, G. Su, V. Perot, J. Dy, and T. Pfister  DualPrompt: Complementary Prompting for Rehearsal-free Continual Learning.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Wang et al. (2022b) Z. Wang, Z. Zhang, C. Lee, H. Zhang, R. Sun, X. Ren, G. Su, V. Perot, J. Dy, and T. Pfister  Learning to prompt for continual learning.  In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition,  pp. 139–149.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Wang et al. (2025b) Z. Z. Wang, J. Mao, D. Fried, and G. Neubig  Agent Workflow Memory.  Proceedings of Machine Learning Research, Vol. 267, PMLR.  Cited by: <a href="#S3.SS2.SSS2.p1.1" class="ltx_ref" title="3.2.2 Experience Memory ‣ 3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.2.2</a>. 
- Xie et al. (2024) T. Xie, D. Zhang, J. Chen, X. Li, S. Zhao, R. Cao, T. J. Hua, Z. Cheng, D. Shin, F. Lei, Y. Liu, Y. Xu, S. Zhou, S. Savarese, C. Xiong, V. Zhong, and T. Yu  OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments.  Vol. 37.  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>. 
- Xu et al. (2025) F. F. Xu, Y. Song, B. Li, Y. Tang, K. Jain, M. Bao, Z. Z. Wang, X. Zhou, Z. Guo, M. Cao, M. Yang, H. Y. Lu, A. Martin, Z. Su, L. Maben, R. Mehta, W. Chi, L. Jang, Y. Xie, S. Zhou, and G. Neubig  TheAgentCompany: Benchmarking LLM Agents on Consequential Real World Tasks.  Vol. 38.  Cited by: <a href="#S1.p2.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>. 
- Yang et al. (2018) Z. Yang, P. Qi, S. Zhang, Y. Bengio, W. Cohen, R. Salakhutdinov, and C. D. Manning  HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering.  In Proceedings of the 2018 Conference on Empirical Methods in Natural Language Processing, E. Riloff, D. Chiang, J. Hockenmaier, and J. Tsujii (Eds.),  Brussels, Belgium, pp. 2369–2380.  Cited by: <a href="#S4.SS3.SSS1.p1.1" class="ltx_ref" title="4.3.1 Textual Reasoning ‣ 4.3 Controlled Harness Continual Learning ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4.3.1</a>. 
- Yao et al. (2023) S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao  ReAct: Synergizing Reasoning and Acting in Language Models.  Cited by: <a href="#S2.SS1.p2.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Yao et al. (2026) Y. Yao, X. Tan, C. Liu, Y. Li, Z. Wang, W. Yu, Z. Tan, Y. Tian, G. Zhao, L. Sun, X. Zhang, and T. Yang  Harness-Bench: Measuring Harness Effects across Models in Realistic Agent Workflows.  External Links: 2605.27922  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Yue et al. (2025) W. Yue, B. Liu, and P. Stone  T-dgr: a trajectory-based deep generative replay method for continual learning in decision making.  In Proceedings of the 3rd Conference on Lifelong Learning Agents,  pp. 481–497.  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Zhang et al. (2026a) H. Zhang, S. Zhang, K. Li, C. Zhang, Y. Chen, Y. Zhang, L. Bai, and S. Hu  Self-Harness: Harnesses That Improve Themselves.  External Links: 2606.09498  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Zhang et al. (2026b) H. Zhang, Z. Ji, J. Liu, Y. Pang, and J. Han  Multi-stage knowledge integration of vision-language models for continual learning.  IEEE Transactions on Image Processing 35, pp. 615–628.  External Links: 2411.06764, <a href="https://dx.doi.org/10.1109/TIP.2026.3652014" class="ltx_ref doi ltx_bib_external">Document</a>  Cited by: <a href="#S2.SS2.p1.1" class="ltx_ref" title="2.2 Model-Centric Continual Learning ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.2</a>. 
- Zhang et al. (2025) J. Zhang, J. Xiang, Z. Yu, F. Teng, X. Chen, J. Chen, M. Zhuge, X. Cheng, S. Hong, J. Wang, B. Zheng, B. Liu, Y. Luo, and C. Wu  AFlow: Automating Agentic Workflow Generation.  In International Conference on Learning Representations,  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>. 
- Zhang et al. (2024) S. Zhang, J. Zhang, J. Liu, L. Song, C. Wang, R. Krishna, and Q. Wu  Offline Training of Language Model Agents with Functions as Learnable Weights.  In Proceedings of the 41st International Conference on Machine Learning, R. Salakhutdinov, Z. Kolter, K. Heller, A. Weller, N. Oliver, J. Scarlett, and F. Berkenkamp (Eds.),  Proceedings of Machine Learning Research, Vol. 235, pp. 60315–60335.  Cited by: <a href="#S1.p3.1" class="ltx_ref" title="1 Introduction ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§1</a>. 
- Zhang et al. (2026c) S. Zhang, J. Wang, R. Zhou, J. Liao, Y. Feng, Z. Li, Y. Zheng, W. Zhang, Y. Wen, Z. Li, et al.  Memrl: self-evolving agents via runtime reinforcement learning on episodic memory.  arXiv preprint arXiv:2601.03192.  Cited by: <a href="#S4.SS2.SSS1.p2.1" class="ltx_ref" title="4.2.1 ALFWorld ‣ 4.2 Open-World Capability Accumulation ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§4.2.1</a>, <a href="#S4.T2.2.1.5.1" class="ltx_ref" title="In 4.2.1 ALFWorld ‣ 4.2 Open-World Capability Accumulation ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">Table 2</a>. 
- Zhang et al. (2026d) Z. Zhang, K. Shi, S. Huang, A. Nie, Y. Zeng, Y. Zhao, Z. Fang, Q. Su, H. Qiu, W. Yang, Q. Ren, S. Zou, W. Huang, L. Chen, Z. Chen, and F. Zhao  SkillFlow: Benchmarking Lifelong Skill Discovery and Evolution for Autonomous Agents.  External Links: 2604.17308  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Zhong et al. (2026) S. Zhong, Y. Lu, J. Ning, Y. Wan, L. Feng, Y. Ao, L. F. R. Ribeiro, M. Dreyer, S. Ammirati, and C. Xiong  SkillLearnBench: Benchmarking Continual Learning Methods for Agent Skill Generation on Real-World Tasks.  External Links: 2604.20087  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Zhong et al. (2024) W. Zhong, L. Guo, Q. Gao, H. Ye, and Y. Wang  MemoryBank: Enhancing Large Language Models with Long-Term Memory.  Proceedings of the AAAI Conference on Artificial Intelligence 38, pp. 19724–19731.  Cited by: <a href="#S3.SS2.SSS2.p1.1" class="ltx_ref" title="3.2.2 Experience Memory ‣ 3.2 Harness State for Continual Learning ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§3.2.2</a>. 
- Zhou et al. (2026) C. Zhou, H. Chai, W. Chen, Z. Guo, R. Shan, Y. Song, T. Xu, Y. Yang, A. Yu, W. Zhang, C. Zheng, J. Zhu, Z. Zheng, Z. Zhang, X. Lou, C. Zhang, Z. Fu, J. Wang, W. Liu, J. Lin, and W. Zhang  Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering.  External Links: 2604.08224  Cited by: <a href="#S2.SS1.p1.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 
- Zhou et al. (2023) Y. Zhou, A. I. Muresanu, Z. Han, K. Paster, S. Pitis, H. Chan, and J. Ba  Large Language Models Are Human-Level Prompt Engineers.  Cited by: <a href="#S2.SS1.p3.1" class="ltx_ref" title="2.1 Harness Engineering ‣ 2 Related Work ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">§2.1</a>. 





## Supplementary Material



The supplementary material provides implementation details, full ablation results, and task-specific anchor criteria.







## Appendix A Implementation and Experimental Settings



### A.1 Harness and Evaluator Boundaries



Table <a href="#A1.T7" class="ltx_ref" title="Table 7 ‣ A.1 Harness and Evaluator Boundaries ‣ Appendix A Implementation and Experimental Settings ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">7</a> summarizes the access and update boundaries of the harness components and the evaluation-only anchor set.



<figure id="A1.T7" class="ltx_table">
<table id="A1.T7.2" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A1.T7.2.1" class="ltx_tr">
<th id="A1.T7.2.1.1" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"> Artifact </th>
<th id="A1.T7.2.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"> Execution and candidate-generation access </th>
<th id="A1.T7.2.1.3" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"> Update boundary </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A1.T7.2.2" class="ltx_tr">
<td id="A1.T7.2.2.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt"> Task Interface <em>I</em><sub><em>n</em></sub> </td>
<td id="A1.T7.2.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt"> Constructs <strong>i</strong><sub><em>n</em></sub>; the Optimizer may revise prompts, templates, and parsing or normalization rules. </td>
<td id="A1.T7.2.2.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt"> Changes enter <em>H</em><sub><em>n</em></sub> only with a committed candidate. </td>
</tr>
<tr id="A1.T7.2.3" class="ltx_tr">
<td id="A1.T7.2.3.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Raw and Abstract Memory <em>M</em><sub><em>n</em></sub><sup>raw</sup>, <em>M</em><sub><em>n</em></sub><sup>abs</sup> </td>
<td id="A1.T7.2.3.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Supplies records and guidance to the Router; the Optimizer may add raw records or revise abstract entries. </td>
<td id="A1.T7.2.3.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Changes enter <em>H</em><sub><em>n</em></sub> only with a committed candidate. </td>
</tr>
<tr id="A1.T7.2.4" class="ltx_tr">
<td id="A1.T7.2.4.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Capability Map <em>C</em><sub><em>n</em></sub> </td>
<td id="A1.T7.2.4.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Supplies capabilities to the Router; the Optimizer may add or revise internal skills. </td>
<td id="A1.T7.2.4.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Changes enter <em>H</em><sub><em>n</em></sub> only with a committed candidate. </td>
</tr>
<tr id="A1.T7.2.5" class="ltx_tr">
<td id="A1.T7.2.5.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Adaptive Router <em>R</em><sub><em>n</em></sub> </td>
<td id="A1.T7.2.5.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Constructs <strong>z</strong><sub><em>n</em></sub>; the Optimizer may revise routing prompts, selection criteria, or workflow templates. </td>
<td id="A1.T7.2.5.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Changes enter <em>H</em><sub><em>n</em></sub> only with a committed candidate. </td>
</tr>
<tr id="A1.T7.2.6" class="ltx_tr">
<td id="A1.T7.2.6.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt"> Anchor Set <em>A</em><sub><em>n</em></sub> </td>
<td id="A1.T7.2.6.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt"> Used only by the Evaluator; unavailable to execution and candidate generation. </td>
<td id="A1.T7.2.6.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt"> Updated at the end of each task and then fixed during candidate generation and evaluation for the next task. </td>
</tr>
</tbody>
</table>
<figcaption>Table 7: Access and update boundaries of the deployed harness and anchor set.</figcaption>
</figure>



Thus, $`H_{n}`$ contains only persistent execution-time contents; $`\mathbf{i}_{n}`$, $`\mathbf{z}_{n}`$, and $`\mathbf{y}_{n}`$ are transient, and $`A_{n}`$ remains evaluation-only. Component-level alternatives are evaluated sequentially, and only committed changes enter the deployed harness.







### A.2 Experimental Settings



Table <a href="#A1.T8" class="ltx_ref" title="Table 8 ‣ A.2 Experimental Settings ‣ Appendix A Implementation and Experimental Settings ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">8</a> summarizes the experimental settings.



<figure id="A1.T8" class="ltx_table">
<table id="A1.T8.2" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A1.T8.2.1" class="ltx_tr">
<th id="A1.T8.2.1.1" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 3.0pt; padding-right: 3.0pt"> Experiment </th>
<th id="A1.T8.2.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 3.0pt; padding-right: 3.0pt"> Stream and frozen model </th>
<th id="A1.T8.2.1.3" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 3.0pt; padding-right: 3.0pt"> Adaptation/evaluator data </th>
<th id="A1.T8.2.1.4" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 3.0pt; padding-right: 3.0pt"> Final reporting </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A1.T8.2.2" class="ltx_tr">
<td id="A1.T8.2.2.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 3.0pt; padding-right: 3.0pt"> ALFWorld main </td>
<td id="A1.T8.2.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 3.0pt; padding-right: 3.0pt"> Six categories in the order Pick-and-Place, Look-in-Light, Clean, Heat, Cool, and Two-object; frozen Qwen3.5-9B. </td>
<td id="A1.T8.2.2.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 3.0pt; padding-right: 3.0pt"> 10 training episodes per category, with at most 50 interaction steps per episode. Evaluation on all observed categories after each stage. </td>
<td id="A1.T8.2.2.4" class="ltx_td ltx_align_left ltx_align_top ltx_border_t" style="padding-left: 3.0pt; padding-right: 3.0pt"> Final success on 134 official evaluation episodes, category macro-average, and average forgetting over the first five categories. </td>
</tr>
<tr id="A1.T8.2.3" class="ltx_tr">
<td id="A1.T8.2.3.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> Minecraft main </td>
<td id="A1.T8.2.3.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> 50 tasks covering collection, crafting, mining, tool use, placement, smelting, and multi-step dependencies; frozen Qwen3.6-27B. </td>
<td id="A1.T8.2.3.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> Sequential environment feedback, with retained skill tests as historical anchors. </td>
<td id="A1.T8.2.3.4" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> Cumulative task completion, recovery events, and validated skill changes. Completed tasks are not systematically replayed after every update. </td>
</tr>
<tr id="A1.T8.2.4" class="ltx_tr">
<td id="A1.T8.2.4.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> Textual main </td>
<td id="A1.T8.2.4.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> MuSiQue → ProofWriter → GSM8K → HotpotQA; frozen DeepSeek-V4-Flash. </td>
<td id="A1.T8.2.4.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> 250 adaptation and 50 validation examples per task. </td>
<td id="A1.T8.2.4.4" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> 500 test examples per task. Final task scores, average performance, and forgetting. </td>
</tr>
<tr id="A1.T8.2.5" class="ltx_tr">
<td id="A1.T8.2.5.1" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> Multimodal main </td>
<td id="A1.T8.2.5.2" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> COCO detection → COCO captioning → RefCOCO grounding → VQAv2; frozen Qwen3.6-27B. </td>
<td id="A1.T8.2.5.3" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> 250 adaptation and 50 validation examples per task. </td>
<td id="A1.T8.2.5.4" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 3.0pt; padding-right: 3.0pt"> 500 test examples per task. Final task scores, average performance, and forgetting. </td>
</tr>
<tr id="A1.T8.2.6" class="ltx_tr">
<td id="A1.T8.2.6.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 3.0pt; padding-right: 3.0pt"> Textual budget sweep </td>
<td id="A1.T8.2.6.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 3.0pt; padding-right: 3.0pt"> The same textual order; frozen DeepSeek-V4-Flash. </td>
<td id="A1.T8.2.6.3" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 3.0pt; padding-right: 3.0pt"> 300 adaptation and 80 validation examples per task, with 80 anchors retained for each earlier task. </td>
<td id="A1.T8.2.6.4" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 3.0pt; padding-right: 3.0pt"> 600 test examples per task. Each profile receives 40 proposals, with ten at each task stage. </td>
</tr>
</tbody>
</table>
<figcaption>Table 8: Experimental settings. Counts are per task or category unless a stream total is stated.</figcaption>
</figure>



Across all experiments, validation cases and historical anchors are restricted to the Evaluator, and final test cases are used only for reporting. The main Stability-HCL and Plasticity-HCL profiles use $`B_{n}=0`$ and $`B_{n}=\infty`$, respectively. A main-profile candidate must improve by at least one validation case for discrete metrics or strictly improve the designated continuous score, without introducing an invalid outcome.





Minecraft applies $`B_{n}=0`$ to retained skill tests and therefore evaluates skill-level rather than full task-level retention. The independent textual sweep uses 40 proposal opportunities, requires two additional correct predictions among 80 validation cases and at least 90% format compliance, and varies only $`B_{n}\equiv b`$ for $`b\in\{0,1,3,\infty\}`$.









## Appendix B Component Ablation Details



All ablation variants use frozen Qwen3.5-4B and share the task order, data allocation, evaluation criteria, and update schedule in Section <a href="#S4.SS5" class="ltx_ref" title="4.5 Ablation Study ‣ 4 Experiments ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">4.5</a>. Table <a href="#A2.T9" class="ltx_ref" title="Table 9 ‣ B.1 Ablation Configurations ‣ Appendix B Component Ablation Details ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">9</a> specifies their permitted persistent updates. A disabled component remains available during execution but retains its initialized contents throughout the stream. Zero-shot evaluates the frozen model without the structured HCL harness or sequential updates.





### B.1 Ablation Configurations

<figure id="A2.T9" class="ltx_table">

 
<table id="A2.T9.2.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A2.T9.2.1.1" class="ltx_tr">
<th id="A2.T9.2.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt">Method</th>
<th id="A2.T9.2.1.1.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"><em>I</em></th>
<th id="A2.T9.2.1.1.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"><em>M</em></th>
<th id="A2.T9.2.1.1.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"><em>C</em></th>
<th id="A2.T9.2.1.1.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"><em>R</em></th>
<th id="A2.T9.2.1.1.6" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt" style="padding-left: 4.0pt; padding-right: 4.0pt"> Fixed contents </th>
</tr>
<tr id="A2.T9.2.1.2" class="ltx_tr">
<th id="A2.T9.2.1.2.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt">Zero-shot</th>
<th id="A2.T9.2.1.2.2" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt">–</th>
<th id="A2.T9.2.1.2.3" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt">–</th>
<th id="A2.T9.2.1.2.4" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt">–</th>
<th id="A2.T9.2.1.2.5" class="ltx_td ltx_align_center ltx_th ltx_th_column ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt">–</th>
<th id="A2.T9.2.1.2.6" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_t" style="padding-left: 4.0pt; padding-right: 4.0pt"> No structured HCL harness or persistent updates. </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A2.T9.2.1.3" class="ltx_tr">
<td id="A2.T9.2.1.3.1" class="ltx_td ltx_align_left" style="padding-left: 4.0pt; padding-right: 4.0pt">Full HCL</td>
<td id="A2.T9.2.1.3.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.3.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.3.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.3.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.3.6" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> None. </td>
</tr>
<tr id="A2.T9.2.1.4" class="ltx_tr">
<td id="A2.T9.2.1.4.1" class="ltx_td ltx_align_left" style="padding-left: 4.0pt; padding-right: 4.0pt">w/o Interface update</td>
<td id="A2.T9.2.1.4.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">×</td>
<td id="A2.T9.2.1.4.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.4.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.4.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.4.6" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Prompts, templates, parsing, and normalization rules. </td>
</tr>
<tr id="A2.T9.2.1.5" class="ltx_tr">
<td id="A2.T9.2.1.5.1" class="ltx_td ltx_align_left" style="padding-left: 4.0pt; padding-right: 4.0pt">w/o Memory update</td>
<td id="A2.T9.2.1.5.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.5.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">×</td>
<td id="A2.T9.2.1.5.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.5.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.5.6" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Raw and Abstract Memory entries. </td>
</tr>
<tr id="A2.T9.2.1.6" class="ltx_tr">
<td id="A2.T9.2.1.6.1" class="ltx_td ltx_align_left" style="padding-left: 4.0pt; padding-right: 4.0pt">w/o Capability update</td>
<td id="A2.T9.2.1.6.2" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.6.3" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.6.4" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">×</td>
<td id="A2.T9.2.1.6.5" class="ltx_td ltx_align_center" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.6.6" class="ltx_td ltx_align_left ltx_align_top" style="padding-left: 4.0pt; padding-right: 4.0pt"> Reusable skills. </td>
</tr>
<tr id="A2.T9.2.1.7" class="ltx_tr">
<td id="A2.T9.2.1.7.1" class="ltx_td ltx_align_left ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">w/o Router update</td>
<td id="A2.T9.2.1.7.2" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.7.3" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.7.4" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">✓</td>
<td id="A2.T9.2.1.7.5" class="ltx_td ltx_align_center ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt">×</td>
<td id="A2.T9.2.1.7.6" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb" style="padding-left: 4.0pt; padding-right: 4.0pt"> Routing prompts, selection criteria, and workflow templates. </td>
</tr>
</tbody>
</table>

<figcaption>Table 9:  Update scope of the component-ablation variants. A ✓ permits persistent updates, while × keeps the component fixed.</figcaption>
</figure>



Because reusable skills may be distilled from Abstract Memory, disabling Memory updates also removes this source of new skills. This variant therefore measures both direct memory adaptation and its downstream effects.







### B.2 Full Per-Task Results

<figure id="A2.T10" class="ltx_table">

 
<table id="A2.T10.2.1" class="ltx_tabular ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A2.T10.2.1.1" class="ltx_tr">
<th id="A2.T10.2.1.1.1" class="ltx_td ltx_align_left ltx_th ltx_th_column ltx_border_tt">Method</th>
<th id="A2.T10.2.1.1.2" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_tt">Detection</th>
<th id="A2.T10.2.1.1.3" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_tt">Caption</th>
<th id="A2.T10.2.1.1.4" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_tt">Grounding</th>
<th id="A2.T10.2.1.1.5" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_tt">VQAv2</th>
<th id="A2.T10.2.1.1.6" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_tt">Final Avg. ↑</th>
<th id="A2.T10.2.1.1.7" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_tt">Avg. Fgt. ↓</th>
<th id="A2.T10.2.1.1.8" class="ltx_td ltx_align_right ltx_th ltx_th_column ltx_border_tt">Committed</th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A2.T10.2.1.2" class="ltx_tr">
<td id="A2.T10.2.1.2.1" class="ltx_td ltx_align_left ltx_border_t">Zero-shot</td>
<td id="A2.T10.2.1.2.2" class="ltx_td ltx_align_right ltx_border_t">35.11</td>
<td id="A2.T10.2.1.2.3" class="ltx_td ltx_align_right ltx_border_t">22.98</td>
<td id="A2.T10.2.1.2.4" class="ltx_td ltx_align_right ltx_border_t">0.00</td>
<td id="A2.T10.2.1.2.5" class="ltx_td ltx_align_right ltx_border_t">81.27</td>
<td id="A2.T10.2.1.2.6" class="ltx_td ltx_align_right ltx_border_t">34.84</td>
<td id="A2.T10.2.1.2.7" class="ltx_td ltx_align_right ltx_border_t">–</td>
<td id="A2.T10.2.1.2.8" class="ltx_td ltx_align_right ltx_border_t">–</td>
</tr>
<tr id="A2.T10.2.1.3" class="ltx_tr">
<td id="A2.T10.2.1.3.1" class="ltx_td ltx_align_left">Full HCL</td>
<td id="A2.T10.2.1.3.2" class="ltx_td ltx_align_right">53.07</td>
<td id="A2.T10.2.1.3.3" class="ltx_td ltx_align_right">36.09</td>
<td id="A2.T10.2.1.3.4" class="ltx_td ltx_align_right">87.60</td>
<td id="A2.T10.2.1.3.5" class="ltx_td ltx_align_right">76.87</td>
<td id="A2.T10.2.1.3.6" class="ltx_td ltx_align_right">63.41</td>
<td id="A2.T10.2.1.3.7" class="ltx_td ltx_align_right">0.45</td>
<td id="A2.T10.2.1.3.8" class="ltx_td ltx_align_right">18</td>
</tr>
<tr id="A2.T10.2.1.4" class="ltx_tr">
<td id="A2.T10.2.1.4.1" class="ltx_td ltx_align_left">w/o Interface update</td>
<td id="A2.T10.2.1.4.2" class="ltx_td ltx_align_right">53.45</td>
<td id="A2.T10.2.1.4.3" class="ltx_td ltx_align_right">33.56</td>
<td id="A2.T10.2.1.4.4" class="ltx_td ltx_align_right">87.80</td>
<td id="A2.T10.2.1.4.5" class="ltx_td ltx_align_right">74.67</td>
<td id="A2.T10.2.1.4.6" class="ltx_td ltx_align_right">62.37</td>
<td id="A2.T10.2.1.4.7" class="ltx_td ltx_align_right">0.11</td>
<td id="A2.T10.2.1.4.8" class="ltx_td ltx_align_right">24</td>
</tr>
<tr id="A2.T10.2.1.5" class="ltx_tr">
<td id="A2.T10.2.1.5.1" class="ltx_td ltx_align_left">w/o Memory update</td>
<td id="A2.T10.2.1.5.2" class="ltx_td ltx_align_right">55.50</td>
<td id="A2.T10.2.1.5.3" class="ltx_td ltx_align_right">28.95</td>
<td id="A2.T10.2.1.5.4" class="ltx_td ltx_align_right">88.00</td>
<td id="A2.T10.2.1.5.5" class="ltx_td ltx_align_right">76.67</td>
<td id="A2.T10.2.1.5.6" class="ltx_td ltx_align_right">62.28</td>
<td id="A2.T10.2.1.5.7" class="ltx_td ltx_align_right">0.83</td>
<td id="A2.T10.2.1.5.8" class="ltx_td ltx_align_right">46</td>
</tr>
<tr id="A2.T10.2.1.6" class="ltx_tr">
<td id="A2.T10.2.1.6.1" class="ltx_td ltx_align_left">w/o Capability update</td>
<td id="A2.T10.2.1.6.2" class="ltx_td ltx_align_right">55.11</td>
<td id="A2.T10.2.1.6.3" class="ltx_td ltx_align_right">34.16</td>
<td id="A2.T10.2.1.6.4" class="ltx_td ltx_align_right">86.40</td>
<td id="A2.T10.2.1.6.5" class="ltx_td ltx_align_right">76.80</td>
<td id="A2.T10.2.1.6.6" class="ltx_td ltx_align_right">63.12</td>
<td id="A2.T10.2.1.6.7" class="ltx_td ltx_align_right">0.06</td>
<td id="A2.T10.2.1.6.8" class="ltx_td ltx_align_right">16</td>
</tr>
<tr id="A2.T10.2.1.7" class="ltx_tr">
<td id="A2.T10.2.1.7.1" class="ltx_td ltx_align_left ltx_border_bb">w/o Router update</td>
<td id="A2.T10.2.1.7.2" class="ltx_td ltx_align_right ltx_border_bb">53.59</td>
<td id="A2.T10.2.1.7.3" class="ltx_td ltx_align_right ltx_border_bb">36.68</td>
<td id="A2.T10.2.1.7.4" class="ltx_td ltx_align_right ltx_border_bb">87.40</td>
<td id="A2.T10.2.1.7.5" class="ltx_td ltx_align_right ltx_border_bb">73.40</td>
<td id="A2.T10.2.1.7.6" class="ltx_td ltx_align_right ltx_border_bb">62.77</td>
<td id="A2.T10.2.1.7.7" class="ltx_td ltx_align_right ltx_border_bb">0.14</td>
<td id="A2.T10.2.1.7.8" class="ltx_td ltx_align_right ltx_border_bb">4</td>
</tr>
</tbody>
</table>

<figcaption>Table 10:  Full component-ablation results on the controlled multimodal stream. “Committed” counts candidate updates entering the persistent harness.</figcaption>
</figure>



Interface updates contribute most visibly to Caption and VQAv2, while disabling Memory updates primarily degrades Caption. Fixing the Router causes its largest decline on VQAv2. Capability updates have a smaller effect in this multimodal stream, whose tasks rely less on long-horizon executable skills than the Minecraft curriculum.





Commit counts are trajectory-specific: each commitment changes the deployed harness and may affect subsequent feedback and proposals. Because variants do not necessarily share a proposal sequence, these counts are not directly comparable acceptance rates or measures of update efficiency.









## Appendix C Anchor Success Criteria



Tables <a href="#A3.T11" class="ltx_ref" title="Table 11 ‣ C.1 Textual Reasoning ‣ Appendix C Anchor Success Criteria ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">11</a>–<a href="#A3.T13" class="ltx_ref" title="Table 13 ‣ C.3 Interactive Environments ‣ Appendix C Anchor Success Criteria ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">13</a> define the fixed task-specific criterion $`q(H,a)`$ in Eq. (<a href="#S3.E10" class="ltx_ref" title="In Historical Retention. ‣ 3.3.2 Continual Evaluator: Historical Evaluation and Commitment ‣ 3.3 Guarded Harness Evolution ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">10</a>), applied to the same raw input under $`H_{n}`$ and $`\widetilde{H}_{n+1}`$.





### C.1 Textual Reasoning

<figure id="A3.T11" class="ltx_table">
<table id="A3.T11.2" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A3.T11.2.1" class="ltx_tr">
<th id="A3.T11.2.1.1" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt"> Task </th>
<th id="A3.T11.2.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt"> <em>q</em>(<em>H</em>, <em>a</em>) = 1 when </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A3.T11.2.2" class="ltx_tr">
<td id="A3.T11.2.2.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_t"> MuSiQue / HotpotQA </td>
<td id="A3.T11.2.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t"> The normalized predicted short answer exactly matches an accepted reference answer. </td>
</tr>
<tr id="A3.T11.2.3" class="ltx_tr">
<td id="A3.T11.2.3.1" class="ltx_td ltx_align_left ltx_align_top"> ProofWriter </td>
<td id="A3.T11.2.3.2" class="ltx_td ltx_align_left ltx_align_top"> The parsed entailment label exactly matches the gold label and the output schema is valid. </td>
</tr>
<tr id="A3.T11.2.4" class="ltx_tr">
<td id="A3.T11.2.4.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb"> GSM8K </td>
<td id="A3.T11.2.4.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb"> The parsed final numeric value equals the gold value after comma and unit normalization. </td>
</tr>
</tbody>
</table>
<figcaption>Table 11: Anchor success criteria for textual reasoning.</figcaption>
</figure>





### C.2 Multimodal Perception

<figure id="A3.T12" class="ltx_table">
<table id="A3.T12.2" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A3.T12.2.1" class="ltx_tr">
<th id="A3.T12.2.1.1" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt"> Task </th>
<th id="A3.T12.2.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt"> <em>q</em>(<em>H</em>, <em>a</em>) = 1 when </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A3.T12.2.2" class="ltx_tr">
<td id="A3.T12.2.2.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_t"> COCO detection </td>
<td id="A3.T12.2.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t"> For the queried annotated instance, the predicted category is correct, the matched bounding box has IoU  ≥ 0.5, and the box schema is valid. </td>
</tr>
<tr id="A3.T12.2.3" class="ltx_tr">
<td id="A3.T12.2.3.1" class="ltx_td ltx_align_left ltx_align_top"> COCO captioning </td>
<td id="A3.T12.2.3.2" class="ltx_td ltx_align_left ltx_align_top"> Sentence-level CIDEr against the reference captions is at least 0.5 on the normalized [0, 1] scale, and the caption schema is valid. </td>
</tr>
<tr id="A3.T12.2.4" class="ltx_tr">
<td id="A3.T12.2.4.1" class="ltx_td ltx_align_left ltx_align_top"> RefCOCO grounding </td>
<td id="A3.T12.2.4.2" class="ltx_td ltx_align_left ltx_align_top"> The predicted box is valid and has IoU  ≥ 0.5 with the referred-object box. </td>
</tr>
<tr id="A3.T12.2.5" class="ltx_tr">
<td id="A3.T12.2.5.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb"> VQAv2 </td>
<td id="A3.T12.2.5.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb"> The standard VQA consensus score is 1.0 after answer normalization. </td>
</tr>
</tbody>
</table>
<figcaption>Table 12: Anchor success criteria for multimodal perception.</figcaption>
</figure>





### C.3 Interactive Environments

<figure id="A3.T13" class="ltx_table">
<table id="A3.T13.2" class="ltx_tabular ltx_centering ltx_guessed_headers ltx_align_middle">
<thead class="ltx_thead">
<tr id="A3.T13.2.1" class="ltx_tr">
<th id="A3.T13.2.1.1" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt"> Environment </th>
<th id="A3.T13.2.1.2" class="ltx_td ltx_align_left ltx_align_top ltx_th ltx_th_column ltx_border_tt"> <em>q</em>(<em>H</em>, <em>a</em>) = 1 when </th>
</tr>
</thead>
<tbody class="ltx_tbody">
<tr id="A3.T13.2.2" class="ltx_tr">
<td id="A3.T13.2.2.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_t"> ALFWorld </td>
<td id="A3.T13.2.2.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_t"> The environment’s specified goal predicate is true within the 50-step limit under a valid action sequence. </td>
</tr>
<tr id="A3.T13.2.3" class="ltx_tr">
<td id="A3.T13.2.3.1" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb"> Minecraft </td>
<td id="A3.T13.2.3.2" class="ltx_td ltx_align_left ltx_align_top ltx_border_bb"> The retained test for the corresponding skill reaches its predefined inventory or world-state predicate through a valid action sequence. </td>
</tr>
</tbody>
</table>
<figcaption>Table 13: Anchor success criteria for interactive environments.</figcaption>
</figure>



##### Historical-loss counting.



Eq. (<a href="#S3.E11" class="ltx_ref" title="In Historical Retention. ‣ 3.3.2 Continual Evaluator: Historical Evaluation and Commitment ‣ 3.3 Guarded Harness Evolution ‣ 3 Harness Continual Learning ‣ Harness Continual Learning: Continual Adaptation Beyond Model Parameters">11</a>) counts an anchor only when it succeeds under $`H_{n}`$ but fails under $`\widetilde{H}_{n+1}`$. For example, a RefCOCO IoU drop from 0.68 to 0.41 contributes one loss by crossing the 0.5 threshold; improvement on another anchor does not offset it.















Experimental support, please <a href="./2608.19013v1/__stdout.txt" class="ltx_ref" target="_blank" rel="nofollow">view the build logs</a> for errors. Generated by <a href="https://math.nist.gov/~BMiller/LaTeXML/" class="ltx_ref ltx_LaTeXML_logo" target="_blank"> L A T E  xml </a> .





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


