---
title: "The Last Harness You'll Ever Build"
source: "https://arxiv.org/html/2604.21003v1"
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

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html) [![[The Last Harness Youll Ever Build-9460bfd162f6dd2b64933716701d8b45644b7907.svg]] Report Issue](# "Report an Issue") [![[The Last Harness Youll Ever Build-f4ed920725e9b5296c72053a104d078507650738.svg]] Back to Abstract](/abs/2604.21003v1 "Back to abstract page") [![[The Last Harness Youll Ever Build-4bbb243fc6a5e4dd4d39aba2869aefc67b826b09.svg]] Download PDF](/pdf/2604.21003v1 "Download PDF") [![[The Last Harness Youll Ever Build-0dba01bd0011e6490f7c1a4e47e93ab96d726eeb.svg]]](javascript:toggleNavTOC(); "Toggle navigation") [![[The Last Harness Youll Ever Build-98a8199842c1940bd0868e386354f161924d800b.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")

![[The Last Harness Youll Ever Build-80caa2dcce69c296ad0598f894738eb7727e6bba.svg]] ![[The Last Harness Youll Ever Build-b2ea290a36a1f7fb9e144d575314ef3789ddadf3.svg]] ![[The Last Harness Youll Ever Build-1aaf13981d449dba7bb168c83f444fcbda5674e4.svg]]

1.  [Abstract](#abstract1 "In The Last Harness You’ll Ever Build")
2.  [1 Introduction](#S1 "In The Last Harness You’ll Ever Build")
3.  [2 The Harness Evolution Loop](#S2 "In The Last Harness You’ll Ever Build")
    1.  [2.1 Defining the Agent Harness](#S2.SS1 "In 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build")
    2.  [2.2 Task Definitions](#S2.SS2 "In 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build")
    3.  [2.3 Worker Agent](#S2.SS3 "In 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build")
    4.  [2.4 Evaluator Agent](#S2.SS4 "In 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build")
    5.  [2.5 Evolution Agent](#S2.SS5 "In 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build")
4.  [3 Meta-Evolution: Learning to Evolve Harnesses](#S3 "In The Last Harness You’ll Ever Build")
    1.  [3.1 The Harness Evolution Loop as a Harness](#S3.SS1 "In 3 Meta-Evolution: Learning to Evolve Harnesses ‣ The Last Harness You’ll Ever Build")
    2.  [3.2 A Meta-Learning Formulation](#S3.SS2 "In 3 Meta-Evolution: Learning to Evolve Harnesses ‣ The Last Harness You’ll Ever Build")
    3.  [3.3 Evaluation Protocol](#S3.SS3 "In 3 Meta-Evolution: Learning to Evolve Harnesses ‣ The Last Harness You’ll Ever Build")
5.  [4 Conclusion](#S4 "In The Last Harness You’ll Ever Build")
6.  [References](#bib "In The Last Harness You’ll Ever Build")

[License: CC BY 4.0](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2604.21003v1 \[cs.AI\] 22 Apr 2026

# The Last Harness You’ll Ever Build

Haebin Seong Affiliation: Sylph.AI    Li Yin Affiliation: Sylph.AI    Haoran Zhang Affiliation: Sylph.AI

###### Abstract

AI agents are increasingly deployed on complex, domain-specific workflows—navigating enterprise web applications that require dozens of clicks and form fills, orchestrating multi-step research pipelines that span search, extraction, and synthesis, automating code review across unfamiliar repositories, and handling customer escalations that demand nuanced domain knowledge. Each new task domain requires painstaking, expert-driven harness engineering: designing the prompts, tools, orchestration logic, and evaluation criteria that make a foundation model effective. We present a two-level framework that automates this process. At the first level, the Harness Evolution Loop optimizes a worker agent’s harness $`\mathcal{H}`$ for a single task: a Worker Agent $`W_{\mathcal{H}}`$ executes the task, an Evaluator Agent $`V`$ adversarially diagnoses failures and scores performance, and an Evolution Agent $`E`$ modifies the harness based on the full history of prior attempts. At the second level, the Meta-Evolution Loop optimizes the evolution protocol $`\Lambda=(W_{\mathcal{H}},\mathcal{H}^{(0)},V,E)`$ itself across diverse tasks, learning a protocol $`\Lambda^{(\text{best})}`$ that enables rapid harness convergence on any new task—so that adapting an agent to a novel domain requires no human harness engineering at all. We formalize the correspondence to meta-learning and present both algorithms. The framework shifts manual harness engineering into automated harness engineering, and takes one step further—automating the design of the automation itself.

|     |
|-----|
|     |

## 1 Introduction

Recent work on *harness engineering* has demonstrated that carefully designed scaffolding—execution environments, feedback loops, evaluation criteria, and context management—can dramatically amplify what agents achieve ([Lopopolo, 2026](#bib.bib1); [Rajasekaran, 2026](#bib.bib2)). However, these harnesses are themselves products of highly intensive, specialized human engineering. [Lopopolo (2026)](#bib.bib1) describe building custom linters, repository-local observability stacks (logs, metrics, traces), Chrome DevTools integration, and structured documentation hierarchies—all *hand-crafted* to make the codebase legible to the agent. [Rajasekaran (2026)](#bib.bib2) report iterating through multiple rounds of evaluator prompt calibration with few-shot examples, designing four grading criteria for subjective design quality, and building a three-agent planner-generator-evaluator architecture with sprint contracts negotiated between agents. In both cases, the harness required *deep domain expertise* to construct and *significant iteration* to tune. The harness improves the agent, but improving the harness still requires substantial human expertise applied to each specific task domain. While automated prompt optimization methods such as LLM-AutoDiff ([Yin and Wang, 2025](#bib.bib8)) can tune individual components, they do not address the full harness—the tools, orchestration logic, infrastructure, and their interactions.

We propose a two-level framework that automates this improvement cycle. At the first level, the Harness Evolution Loop optimizes a worker agent’s harness $`\mathcal{H}`$ for a single task through a closed-loop cycle of three agents:

1.  1.
    A Worker Agent $`W_{\mathcal{H}}`$—the agent under optimization—parameterized by its harness $`\mathcal{H}`$, which executes a task and produces an execution trace.
2.  2.
    An Evaluator Agent $`V`$ that adversarially verifies task outcomes, diagnoses failure modes, and scores performance.
3.  3.
    An Evolution Agent $`E`$ that analyzes the full evolution history and modifies the harness—prompts, tools, orchestration logic, observations, and model configuration—to address diagnosed failure patterns.

Starting from an initial harness $`\mathcal{H}^{(0)}`$—which may be a generic, untuned agent scaffold—the loop iterates for $`K`$ steps: at each step, the worker executes the task, the evaluator diagnoses and scores the result, and the evolution agent produces an improved harness based on the full history of prior attempts, ultimately returning the best-performing harness $`\mathcal{H}^{(\text{best})}`$. Together, these components form an evolution protocol $`\Lambda=(W_{\mathcal{H}},\mathcal{H}^{(0)},V,E)`$ that fully specifies how the harness is evolved.

At the second level, a Meta-Evolution Loop optimizes $`\Lambda`$ itself across diverse tasks, learning an evolution protocol $`\Lambda^{(\text{best})}`$ that enables rapid harness convergence on any new task—transforming not just harness engineering, but the design of the harness engineering process itself, into an automated optimization problem.

Refer to caption

Figure 1: System architecture. The Meta-Evolution Loop (green, outer) optimizes the evolution protocol $`\Lambda`$ by running the Harness Evolution Loop (blue, inner) across diverse training tasks $`t_{1},t_{2},\dots,t_{n}`$. Each inner loop instance optimizes a worker harness $`\mathcal{H}`$ for a single task through iterative cycles of execution (Worker), evaluation (Evaluator), and code modification (Evolution Agent). The meta-evolution agent aggregates scores across all tasks and modifies the evolution protocol, feeding the updated protocol back for the next round. The output is the best-performing evolution protocol $`\Lambda^{(\text{best})}`$.

## 2 The Harness Evolution Loop

We first formally define the notion of an agent harness, then describe the system’s components—task definition, task execution, evaluation, and evolution—and how they are orchestrated in the harness evolution loop. The four components are orchestrated by a continuous automation loop, shown in Algorithm [1](#alg1 "Algorithm 1 ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build").

0:  Task $`t`$, Worker Agent $`W_{\mathcal{H}}`$, initial worker harness $`\mathcal{H}^{(0)}`$, Evaluator Agent $`V`$, Evolution Agent $`E`$, iterations $`K`$

1:  $`\mathcal{H}^{(\text{best})}\leftarrow\mathcal{H}^{(0)}`$;  $`\text{best\_score}\leftarrow-\infty`$

2:  $`\text{history}\leftarrow[\,]`$ {Log of ($`\mathcal{H}^{(k)}`$, report, score, verdict) per iteration}

3:  for $`k=1,2,\dots,K`$ do

4:   Rebuild $`W_{\mathcal{H}^{(k-1)}}`$ from $`\mathcal{H}^{(k-1)}`$

5:   Prepare target environment; reset to clean state

6:   $`\text{trace}\leftarrow W_{\mathcal{H}^{(k-1)}}.\text{execute}(t)`$ {Worker runs task}

7:   $`(\text{report},\text{score})\leftarrow V.\text{evaluate}(\text{trace},t)`$ {Evaluator diagnoses and scores}

8:   if $`\text{score}>\text{best\_score}`$ then

9:    $`\text{verdict}\leftarrow\textsc{improved}`$;  $`\mathcal{H}^{(\text{best})}\leftarrow\mathcal{H}^{(k-1)}`$;  $`\text{best\_score}\leftarrow\text{score}`$

10:   else

11:    $`\text{verdict}\leftarrow\textsc{regressed}`$

12:   end if

13:   $`\text{history}\leftarrow\text{history}\cup\{(\mathcal{H}^{(k-1)},\text{report},\text{score},\text{verdict})\}`$

14:   $`\mathcal{H}^{(k)}\leftarrow E.\text{evolve}(\text{history},\mathcal{H}^{(\text{best})})`$ {Evolve from best harness}

15:  end for

16:  return $`\mathcal{H}^{(\text{best})},\text{best\_score},\text{history}`$

Algorithm 1 The Harness Evolution Loop

0:  Meta-train tasks $`\mathcal{T}_{\text{train}}`$, Meta-Evolution Agent $`E_{\text{meta}}`$, initial evolution protocol $`\Lambda^{(0)}`$, inner-loop budget $`K`$

1:  $`\Lambda^{(\text{best})}\leftarrow\Lambda^{(0)}`$;  $`\text{best\_meta\_score}\leftarrow-\infty`$

2:  $`\text{meta\_history}\leftarrow[\,]`$

3:  for $`j=0,1,2,\dots`$ do

4:   $`\text{task\_results}\leftarrow[\,]`$

5:   for each task $`t_{i}\in\mathcal{T}_{\text{train}}`$ do

6:    $`\mathcal{H}^{(\text{best})}_{i},\text{best\_score}_{i},\text{history}_{i}\leftarrow\textsc{HarnessEvolutionLoop}(t_{i},\Lambda^{(j)},K)`$ {Alg. [1](#alg1 "Algorithm 1 ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build")}

7:    $`\text{task\_results}\leftarrow\text{task\_results}\cup\{(t_{i},\text{best\_score}_{i},\text{history}_{i})\}`$

8:   end for

9:   $`\text{meta\_score}\leftarrow\text{Aggregate}(\text{task\_results})`$ {Mean score across tasks}

10:   if $`\text{meta\_score}>\text{best\_meta\_score}`$ then

11:    $`\text{verdict}\leftarrow\textsc{improved}`$;  $`\Lambda^{(\text{best})}\leftarrow\Lambda^{(j)}`$;  $`\text{best\_meta\_score}\leftarrow\text{meta\_score}`$

12:   else

13:    $`\text{verdict}\leftarrow\textsc{regressed}`$

14:   end if

15:   $`\text{meta\_history}\leftarrow\text{meta\_history}\cup\{(\Lambda^{(j)},\text{task\_results},\text{meta\_score},\text{verdict})\}`$

16:   $`\Lambda^{(j+1)}\leftarrow E_{\text{meta}}.\text{evolve}(\text{meta\_history},\Lambda^{(\text{best})})`$ {Evolve from best protocol}

17:  end for

18:  return $`\Lambda^{(\text{best})},\text{best\_meta\_score},\text{meta\_history}`$

Algorithm 2 The Meta-Evolution Loop

### 2.1 Defining the Agent Harness

A raw model is not an agent. Following [Trivedy (2026)](#bib.bib3), we adopt the formulation: $`\mathbf{Agent=Model+Harness}`$. A harness is every piece of code, configuration, and execution logic that is not the model itself—it is the system that makes the model’s intelligence useful. A harness can take many forms; popular categories of harness components include:

- •
  System prompts and task prompts: system-level instructions that define the agent’s identity and constraints, and task-level prompts that specify goals, success criteria, and in-context examples.
- •
  Tools, skills, and their descriptions: the capabilities the agent can invoke to act on its environment (e.g., file editing, shell execution, UI interaction, web search, MCP servers).
- •
  Bundled infrastructure: the execution environment provided to the agent (filesystem, sandboxes, browsers, observability stacks).
- •
  Orchestration logic: the control flow that structures the agent’s interaction loop (subagent spawning, handoffs, model routing, feedback loops, and continuation patterns such as the Ralph Loop).
- •
  Hooks and middleware: deterministic execution guarantees injected around the model (compaction, continuation, lint checks, verification loops).
- •
  Model configurations: the choice of underlying model, inference parameters (temperature, sampling strategy, token limits), and model routing rules that determine which model handles which subtask.

Harnesses appear throughout the agent ecosystem. AdaL ([SylphAI, 2026](#bib.bib6)), Claude Code ([Anthropic, 2025](#bib.bib4)), and Codex ([OpenAI, 2025](#bib.bib5)) are harnesses for general-purpose software engineering—they wrap LLMs with filesystem access, shell execution, web search, and multi-file editing. OpAgent ([Guo et al., 2026](#bib.bib10)) is a harness for autonomous web navigation, combining a Planner, Grounder, Reflector, and Summarizer into a multi-agent pipeline that achieved state-of-the-art results on WebArena ([Zhou et al., 2024](#bib.bib7)). In every case, the harness—not the model—determines what the agent can perceive, how it acts, and how its work is orchestrated and verified.

### 2.2 Task Definitions

A task $`t=(I,S)`$ consists of:

- •
  Instructions $`I`$: a concrete goal for the worker agent.
- •
  Success criteria $`S=\{s_{1},s_{2},\dots,s_{m}\}`$: a checklist of verifiable conditions the evaluator uses to judge completion.

### 2.3 Worker Agent

The Worker Agent $`W_{\mathcal{H}}`$ is the agent under optimization—parameterized by its harness $`\mathcal{H}`$. It exposes a single interface $`W_{\mathcal{H}}.\text{execute}(t)`$: given a task $`t`$, the worker receives the instructions $`I`$, interacts with the target environment through a tool interface, and produces an execution trace $`\tau`$ containing environment observations, action logs, and timing information for each step.

The harness-based agents described in Section [2.1](#S2.SS1 "2.1 Defining the Agent Harness ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build")—AdaL, Claude Code, Codex, and OpAgent—can all be set as worker agents $`W_{\mathcal{H}}`$, each attempting to solve a task using a specific harness configuration.

### 2.4 Evaluator Agent

The Evaluator Agent $`V`$ is a separate, adversarial reviewer. It exposes the interface $`V.\text{evaluate}(\tau,t)\rightarrow(\text{report},\text{score})`$: given an execution trace $`\tau`$ and the original task $`t=(I,S)`$, it produces a structured diagnostic report and a numerical score. The evaluator performs four functions:

1.  1.
    State verification: Cross-references the worker’s observations in $`\tau`$ with ground-truth environment state to confirm the agent actually perceived what it claims, detecting hallucinated or misinterpreted states.
2.  2.
    Criteria checking: Evaluates the worker’s final state against each success criterion $`s_{i}\in S`$, producing a pass/fail verdict per criterion.
3.  3.
    Performance auditing: Decomposes total execution time into *LLM time* (model inference latency) versus *tool time* (environment interaction latency), identifying whether bottlenecks are computational or behavioral.
4.  4.
    Scoring: Computes a two-tier metric—first by *pass/fail* (whether the task was completed successfully), then by *execution time* as a tiebreaker. This ranking determines whether a code change represents a net improvement or a regression.

### 2.5 Evolution Agent

The Evolution Agent $`E`$ is the evolutionary driver of the system. It exposes the interface $`E.\text{evolve}(\text{history},\mathcal{H}^{(\text{best})})\rightarrow\mathcal{H}^{\prime}`$: given the full evolution history and the best-performing harness, it produces a modified harness $`\mathcal{H}^{\prime}`$. It operates as a senior engineer that:

1.  1.
    Aggregates diagnostics: Reads the full evolution history—including what harness variants were tried, their evaluator reports, scores, and whether each change improved or regressed performance. This historical context prevents the evolution agent from repeating unsuccessful strategies and enables it to build on prior insights.
2.  2.
    Identifies failure patterns: Classifies failures into recurring categories (e.g., incorrect tool usage, reasoning loops, misinterpreted environment state, excessive latency).
3.  3.
    Modifies the harness: Based on the diagnosed failure patterns, the evolution agent edits the worker’s harness $`\mathcal{H}`$—every piece of code and configuration that constitutes the agent except the model’s parameters—including tool implementations, system prompts, orchestration logic, observation structure, or model configuration to address root causes.

## 3 Meta-Evolution: Learning to Evolve Harnesses

The Harness Evolution Loop as described optimizes the worker harness $`\mathcal{H}`$ for a single fixed task. But the harness evolution loop itself—the evaluator prompt, the evolution agent’s diagnostic strategy, the scoring function, the observation structure, and the orchestration logic—is also a harness, which we denote $`\Lambda`$. Formally:

|     |                                                       |     |     |
|-----|-------------------------------------------------------|-----|-----|
|     |                                                       
       ``` math                                               
       \Lambda=(W_{\mathcal{H}},\;\mathcal{H}^{(0)},\;V,\;E)  
       ```                                                    |     | (1) |

where $`W_{\mathcal{H}}`$ is the worker agent, $`\mathcal{H}^{(0)}`$ is the initial worker harness, $`V`$ is the evaluator agent, and $`E`$ is the evolution agent. Together, these components define how the loop operates. In the current system, $`\Lambda`$ is designed by human engineers and remains fixed throughout the evolution process. We now describe a natural generalization: a Meta-Evolution Agent that optimizes $`\Lambda`$ itself, so that the inner harness evolution loop converges faster and more reliably to high-performing worker harnesses across diverse tasks.

### 3.1 The Harness Evolution Loop as a Harness

Observe that $`\Lambda`$ has exactly the same structure as any other harness: it consists of prompts (the evaluator and evolution agent instructions), tools (the scoring function, version control operations, code editing capabilities), observations (what telemetry and traces are surfaced from the worker, evaluator, and evolution agent), and orchestration logic (how many iterations to run, when to commit or revert, how tasks are selected and ordered). Optimizing $`\Lambda`$ is therefore harness optimization at a higher level of abstraction.

The components of $`\Lambda`$ that the Meta-Evolution Agent can modify include:

- •
  *Evaluator agent prompt*—what failure modes to look for, how to grade, what evidence to require.
- •
  *Evolution agent prompt*—how to diagnose failure patterns, what code changes to prioritize, how aggressively to modify the worker.
- •
  *Worker observation structure*—what telemetry, traces, and intermediate state to surface from the worker’s execution.
- •
  *Evaluator and evolution agent observations*—what information flows between agents at each step.
- •
  *Scoring function design*—the metric structure (e.g., two-tier vs. multi-dimensional), thresholds, and tiebreakers.
- •
  *Loop hyperparameters*—number of iterations, parallelism, revert thresholds, and stopping criteria.

### 3.2 A Meta-Learning Formulation

This two-level optimization maps directly onto the meta-learning framework ([Thrun and Pratt, 1998](#bib.bib9)). Let $`\mathcal{T}_{\text{train}}=\{t_{1},t_{2},\dots,t_{n}\}`$ be a set of *meta-train tasks*, each representing a different agent task from potentially different domains. Let $`\mathcal{T}_{\text{test}}`$ be a held-out set of *meta-test tasks* used to evaluate generalization.

The two loops operate as follows:

- •
  Inner loop (the Harness Evolution): Given a fixed harness evolution protocol $`\Lambda`$ and a single task $`t_{i}`$, run the harness evolution loop for $`K`$ iterations to produce an optimized worker harness $`\mathcal{H}^{(K)}`$. Measure the convergence trajectory: how quickly and how well the worker improves on this task.
- •
  Outer loop (the Meta-Evolution): Across multiple tasks $`t_{i}\in\mathcal{T}_{\text{train}}`$, evaluate how effectively the current $`\Lambda`$ drives the inner loop. Modify $`\Lambda`$ to improve the *speed of adaptation*—the rate at which the inner loop converges to high performance on any single task.

The objective of the outer loop is to find a harness evolution protocol $`\Lambda^{(\text{best})}`$ that maximizes task performance across training tasks:

|  |  |  |  |
|----|----|----|----|
|  | 
``` math
\Lambda^{(\text{best})}=\arg\max_{\Lambda}\;\mathbb{E}_{t_{i}\sim\mathcal{T}_{\text{train}}}\left[\text{best\_score}\big(\textsc{HarnessEvolutionLoop}(t_{i},\Lambda,K)\big)\right]
``` |  | (2) |

where $`\textsc{HarnessEvolutionLoop}(t_{i},\Lambda,K)`$ runs Algorithm [1](#alg1 "Algorithm 1 ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build") for $`K`$ iterations, returning the best-performing harness $`\mathcal{H}^{(\text{best})}`$, its score, and the full evolution history. The evolution protocol $`\Lambda`$ is judged solely by the final best score achieved on each task—not by intermediate progress.

This formulation is shown in Algorithm [2](#alg2 "Algorithm 2 ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build"), and mirrors meta-learning, with the correspondence shown in Table [1](#S3.T1 "Table 1 ‣ 3.2 A Meta-Learning Formulation ‣ 3 Meta-Evolution: Learning to Evolve Harnesses ‣ The Last Harness You’ll Ever Build").

| Meta-Learning | Meta-Evolution |
|----|----|
| Parameters being adapted: $`\theta`$ | Harness being evolved: $`\mathcal{H}`$ |
| Adaptation procedure ($`\theta^{(0)}`$, optimizer, loss) | Evolution protocol $`\Lambda=(W_{\mathcal{H}},\mathcal{H}^{(0)},V,E)`$ |
| Inner loop: gradient updates on task $`t_{i}`$ | Inner loop: $`\textsc{HarnessEvolutionLoop}(t_{i},\Lambda,K)`$ |
| Outer loop: meta-gradient update | Outer loop: $`E_{\text{meta}}.\text{evolve}(\text{meta\_history},\Lambda^{(\text{best})})`$ |
| Meta-train tasks | Training tasks $`\mathcal{T}_{\text{train}}`$ |
| Meta-test tasks | Held-out tasks $`\mathcal{T}_{\text{test}}`$ |
| Objective: fast adaptation to new tasks | Objective: fast harness convergence on new tasks |

Table 1: Correspondence between meta-learning and meta-evolution

### 3.3 Evaluation Protocol

Generalization is evaluated on $`\mathcal{T}_{\text{test}}`$: given a new, unseen task, how quickly does the inner harness evolution loop—configured with the learned $`\Lambda^{(\text{best})}`$—produce a high-performing worker harness? The key metrics are:

- •
  *Convergence speed*: number of inner-loop iterations to reach a target performance threshold.
- •
  *Final performance*: task pass rate after a fixed number of iterations.
- •
  *Robustness*: variance in convergence speed across different meta-test tasks.

A well-optimized $`\Lambda^{(\text{best})}`$ should enable the harness evolution loop to rapidly adapt to any novel task—producing effective worker harnesses with fewer iterations and less compute than a manually designed harness evolution loop.

## 4 Conclusion

We presented the Harness Evolution Loop, a closed-loop architecture that automatically optimizes an AI agent’s harness $`\mathcal{H}`$—the prompts, tools, orchestration logic, and infrastructure that surround a foundation model—through repeated task execution, adversarial evaluation, and code modification. The system formalizes the agent as $`W_{\mathcal{H}}`$, separates evaluation ($`V`$) from evolution ($`E`$), and iteratively improves $`\mathcal{H}`$ while tracking the full convergence history.

We then introduced the Meta-Evolution Loop, which optimizes the evolution protocol $`\Lambda=(W_{\mathcal{H}},\mathcal{H}^{(0)},V,E)`$ itself across diverse tasks. By running the inner harness evolution loop on each training task $`t_{i}\in\mathcal{T}_{\text{train}}`$ and measuring convergence, the meta-evolution agent $`E_{\text{meta}}`$ learns a protocol $`\Lambda^{(\text{best})}`$ that enables rapid adaptation to unseen tasks. This two-level formulation mirrors meta-learning: the inner loop adapts the harness to a single task, while the outer loop optimizes the adaptation procedure for generalization.

Where harness engineering has traditionally required deep human expertise applied to each specific task domain, the Harness Evolution Loop automates this process entirely—transforming manual harness engineering into automated harness engineering. The Meta-Evolution Loop takes this one step further: it automates the design of the automation itself, learning *how to evolve harnesses* rather than evolving any single harness.

We plan to follow up with empirical results on diverse workflows that have resisted easy automation even with state-of-the-art agents and harnesses—from complex customized customer workflows to domain-specific enterprise processes—demonstrating that the framework can crack open task categories previously considered too brittle or too specialized for autonomous agents. Ultimately, we will release a product built on the learned evolution protocol $`\Lambda^{(\text{best})}`$: a system where any user can point a general-purpose agent at a new task domain and have it automatically evolve into a specialized, high-performing agent—no harness engineering expertise required.

## References

- Anthropic (2025) Anthropic Claude code: best practices for agentic coding. Note: [https://www.anthropic.com/engineering/claude-code-best-practices](https://www.anthropic.com/engineering/claude-code-best-practices)Anthropic Engineering Blog Cited by: [§2.1](#S2.SS1.p2.1 "2.1 Defining the Agent Harness ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build").
- Guo et al. (2026) Y. Guo, W. Yang, S. Yang, Z. Liu, C. Chen, Y. Wei, Y. Hu, Y. Huang, G. Hao, D. Yuan, et al. OpAgent: operator agent for web navigation. arXiv preprint arXiv:2602.13559. Cited by: [§2.1](#S2.SS1.p2.1 "2.1 Defining the Agent Harness ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build").
- Lopopolo (2026) R. Lopopolo Harness engineering: leveraging Codex in an agent-first world. Note: [https://openai.com/index/harness-engineering/](https://openai.com/index/harness-engineering/)OpenAI Engineering Blog Cited by: [§1](#S1.p1.1 "1 Introduction ‣ The Last Harness You’ll Ever Build").
- OpenAI (2025) OpenAI Introducing Codex. Note: [https://openai.com/index/introducing-codex/](https://openai.com/index/introducing-codex/)OpenAI Blog Cited by: [§2.1](#S2.SS1.p2.1 "2.1 Defining the Agent Harness ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build").
- Rajasekaran (2026) P. Rajasekaran Harness design for long-running application development. Note: [https://www.anthropic.com/engineering/harness-design-long-running-apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)Anthropic Engineering Blog Cited by: [§1](#S1.p1.1 "1 Introduction ‣ The Last Harness You’ll Ever Build").
- SylphAI (2026) SylphAI AdaL: the self-evolving AI coding agent. Note: [https://sylph.ai/](https://sylph.ai/) Cited by: [§2.1](#S2.SS1.p2.1 "2.1 Defining the Agent Harness ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build").
- Thrun and Pratt (1998) S. Thrun and L. Pratt Learning to learn. Springer Science & Business Media. Cited by: [§3.2](#S3.SS2.p1.1 "3.2 A Meta-Learning Formulation ‣ 3 Meta-Evolution: Learning to Evolve Harnesses ‣ The Last Harness You’ll Ever Build").
- Trivedy (2026) V. Trivedy The anatomy of an agent harness. Note: [https://www.langchain.com/blog/the-anatomy-of-an-agent-harness](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)LangChain Blog Cited by: [§2.1](#S2.SS1.p1.1 "2.1 Defining the Agent Harness ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build").
- Yin and Wang (2025) L. Yin and Z. Wang LLM-AutoDiff: auto-differentiate any LLM workflow. External Links: 2501.16673 Cited by: [§1](#S1.p1.1 "1 Introduction ‣ The Last Harness You’ll Ever Build").
- Zhou et al. (2024) S. Zhou, F. F. Xu, H. Zhu, X. Zhou, R. Lo, A. Sridhar, X. Cheng, T. Ou, Y. Bisk, D. Fried, U. Alon, and G. Neubig WebArena: a realistic web environment for building autonomous agents. In International Conference on Learning Representations (ICLR), Cited by: [§2.1](#S2.SS1.p2.1 "2.1 Defining the Agent Harness ‣ 2 The Harness Evolution Loop ‣ The Last Harness You’ll Ever Build").

Experimental support, please [view the build logs](./2604.21003v1/__stdout.txt) for errors. Generated by [ L A T E xml ![\[LOGO\]](/Users/junjian/GitHub/wang-junjian/wikillm/.scratch/harness-batch-2/media/The Last Harness Youll Ever Build/055b977d0a6a655149fabb1dc4ed16049b0af31f.png)](https://math.nist.gov/~BMiller/LaTeXML/) .

## Instructions for reporting errors

We are continuing to improve HTML versions of papers, and your feedback helps enhance accessibility and mobile support. To report errors in the HTML that will help us improve conversion and rendering, choose any of the methods listed below:

- Click the "Report Issue" (![[The Last Harness Youll Ever Build-a556641380f7b97e2e131566a80a75ad0f230978.svg]]) button, located in the page header.

**Tip:** You can select the relevant text first, to include it in your report.

Our team has already identified [the following issues](https://github.com/arXiv/html_feedback/issues). We appreciate your time reviewing and reporting rendering errors we may not have found yet. Your efforts will help us improve the HTML versions for all readers, because disability should not be a barrier to accessing research. Thank you for your continued support in championing open access for all.

Have a free development cycle? Help support accessibility at arXiv! Our collaborators at LaTeXML maintain a [list of packages that need conversion](https://github.com/brucemiller/LaTeXML/wiki/Porting-LaTeX-packages-for-LaTeXML), and welcome [developer contributions](https://github.com/brucemiller/LaTeXML/issues).

We gratefully acknowledge support from our **major funders**, [**member institutions**](https://info.arxiv.org/about/ourmembers.html), , and all contributors.

[About](https://info.arxiv.org/about) · [Help](https://info.arxiv.org/help) · [Contact](https://info.arxiv.org/help/contact.html) · [Subscribe](https://info.arxiv.org/help/subscribe) · [Copyright](https://info.arxiv.org/help/license/index.html) · [Privacy](https://info.arxiv.org/help/policies/privacy_policy.html) · [Accessibility](https://info.arxiv.org/help/web_accessibility.html) · [Operational Status (opens in new tab)](https://status.arxiv.org)

Major funding support from

[Simons Foundation](https://www.simonsfoundation.org/) [Simons Foundation International](https://www.sfi.org.bm/) [Schmidt Sciences](https://www.schmidtsciences.org/)

[![[The Last Harness Youll Ever Build-ee4fa28cc5b5a2e145a514bf2b95e569978d92fb.svg]]](javascript:toggleReadingMode(); "Disable reading mode, show header and footer")
