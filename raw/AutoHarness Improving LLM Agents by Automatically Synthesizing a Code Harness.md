---
title: "AutoHarness: Improving LLM Agents by Automatically Synthesizing a Code Harness"
source: "https://arxiv.org/abs/2603.03329"
author: "Xinghua Lou, Miguel Lázaro-Gredilla, Antoine Dedieu, Carter Wendelken, Wolfgang Lehrach, Kevin P. Murphy"
published: 2026-02-10
created: 2026-10-08
description:
tags:
  - "clippings"
---

Xinghua Lou, Miguel Lázaro-Gredilla, Antoine Dedieu, Carter Wendelken, Wolfgang Lehrach, Kevin P. Murphy
Google DeepMind

###### Abstract

Language models used as agents often perform actions that are strictly prohibited by the external environment. For example, in the Kaggle GameArena chess competition, 78% of Gemini-2.5-Flash losses were attributed to illegal moves. We show that Gemini-2.5-Flash can automatically synthesize a code harness through iterative code refinement with environmental feedback — no hand-written harness required. The synthesized harness prevents all illegal moves across 145 TextArena games (both 1-player and 2-player), enabling the smaller Gemini-2.5-Flash to outperform larger models such as Gemini-2.5-Pro. Going further, the model can generate an entire policy in code, eliminating the need to use the LLM at decision-making time; this code policy achieves higher average reward than Gemini-2.5-Pro and GPT-5.2-High on 16 TextArena 1-player games, at nearly zero inference cost.

## 1. Introduction

LLM agents frequently take actions that the environment explicitly forbids. In the Kaggle GameArena chess tournament, 78% of Gemini-2.5-Flash's losses came from illegal moves — rule violations rather than strategy errors. Traditional mitigations (fine-tuning or hand-written harnesses) are expensive and brittle.

The authors propose "code as harness": let the LLM write its own harness — essentially a rejection sampler whose conditioning is learned. Harness generation is formulated as a search problem over program space, using Thompson-sampling-guided tree search (following Tang et al. 2024), with the LLM acting as the mutation operator.

## 2. Method

A tree of code hypotheses is maintained. Thompson sampling selects the next node to refine; node heuristic value = average legal-action accuracy. Refinement is performed by the base LLM; the environment (critic) feeds back whether actions are legal and the reward.

Refinement rules:
- If `is_legal_action()` returns True but the action was illegal, refine both functions.
- If `is_legal_action()` returns False and the action was illegal, refine only `propose_action()`.

Three harness modes:

1. **harness-as-action-filter**: code generates the set of legal actions; the LLM ranks them (optionally with CoT).
2. **harness-as-action-verifier** (the paper's focus): the LLM proposes an action first; `is_legal_action()` validates it; illegal actions are retried with a warning message.
3. **harness-as-policy**: pure code (Python + numpy) selects actions; no LLM call at inference time.

## 3. Experimental Setup

- All TextArena 1P/2P games, minus 9 free-text games, leaving **145 games** (Chess, Checkers, Blackjack, Sudoku, etc.).
- "Available Moves" hints were manually removed from some game observations to increase difficulty.
- Training: 10 parallel environments, rollouts up to 1000 steps, terminated on illegal action or code failure; up to 5 sampled failure steps given to the critic; Thompson sampling weight 1.0; trained with Gemini-2.5-Flash.
- Convergence in an average of **14.5 tree-search iterations**; 19/32 games finish within 10 iterations. Hardest games: GermanWhist-v0 (43), Cryptarithm-v0 (45), Othello-v0 (62), Chess-v0 (64).
- Test (1000 steps × 10 seeds): **100% legal action rate on all 145 games** (appendix tables show Legal Action Rate = 1.0 everywhere; the most learning steps was 136 for Breakthrough-v0-small).

## 4. Evaluation Results

16 1P + 16 2P games evaluated. 2P: 40 matches (half as first player); 1P: 20 episodes.

**2P**: Flash+Harness beats Gemini-2.5-Pro in 9/16 games, overall win rate **56.3%** (Pro: 38.2%); beats vanilla Flash in 12/16, win rate **64.8%**.

**1P**: better than Pro in 8/16, tied in 5/16. Average reward: this work **0.745**, Gemini-2.5-Pro **0.707**, Gemini-2.5-Flash **0.673**.

## 5. Harness-as-Policy

Heuristic now includes reward: illegal action → H=0; otherwise H = 0.5 + 0.5r (r = sparse terminal reward). At most 256 iterations, average **89.4 iterations**, heuristic reaches **0.939**.

Average reward on 16 1P games: this work **0.870** > GPT-5.2-High **0.844** > Gemini-2.5-Pro **0.707** > GPT-5.2 **0.635**. Head-to-head wins: GPT-5.2-High wins 5/16, this work wins 3/16, 8/16 ties.

Cost: this work's inference cost is nearly zero, while the GPT-5.2 experiments cost about **$640** (GPT-5.2 repeated 10 times, GPT-5.2-High 5 times).

## 6. Related Work

- LLM games and reasoning: CoT and Tree of Thoughts rely on the model's internal world model and are prone to hallucination; this work delegates transition legality to an external verifiable program.
- Code as policy: Voyager, Eureka, Code as Policies; the difference here is iterative code refinement based on tree search with environmental feedback.
- Refinement and search: Reflexion, AlphaCode, AlphaEvolve; this work applies Thompson sampling tree search to online multi-round harness generation.

## 7. Discussion and Conclusion

Currently a harness is generated separately for each environment. Future work: distill the experts back into the base LLM for recursive self-improvement, build a reusable harness library, and extend to multimodal games such as Craftax and Terra Nova.

## Appendices (summary)

- **Appendix A**: full table of 145 games (learning steps, legal rate all 1.0); 32 end-to-end evaluation games marked with \*; example of Chess observation with "Valid moves" removed.
- **Appendix B**: LLM-as-policy prompt (Think/Move two steps, `<move>` tags) and code-refinement prompt (requires step-by-step reasoning, forbids try-except, demands safe and concise code).
- **Appendix C**: function signatures `propose_action(board) -> str` and `is_legal_action(board, action) -> bool`; in policy mode the docstring changes to maximizing final reward.
- **Appendix D**: example code — Minesweeper `propose_action()` (first move picks the center cell, logical inference of safe cells, subset rule, minimum-probability risk guesses) and Chess UCI coordinate conversion, king localization, and attack detection functions.
