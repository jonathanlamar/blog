---
title: Notes on Reinforcement Learning 4
descriptions: Notes from the first chapter of Sutton and Barto's RL book
date: 2024-04-17
image: rl.png
---

I was studying reinforcement learning a while ago, attempting to educate myself about deep Q learning. As part of that
effort, I read through the first few chapters of
[Reinforcement Learning: An A Introduction](http://incompleteideas.net/book/the-book.html) by Sutton and Barto. Here
are my notes on Chapter 4.  Like all of my other notes, these were never intended to be shared, so apologies in advance
if they make no sense to anyone.

# Chapter 4

This chapter is all about _dynamic programming_, which is exactly what you'd think, although the treatment here is
simultaneously more abstract than the typical CS undergrad's view of solving coding problems, and also very specific to
solving tabular MDPs.  There is not a lot of practical information in this chapter about solving real problems, but it
is worth the discussion for the theoretical backbone.

## Policy Evaluation

Let $\pi$ be an arbitrary policy.  Recall that by definition, $v_\pi(s) == \mathbb{E}[G_t|S_t=s]$.  That expands to the
Bellman equation for $v_\pi$.

$$
\begin{aligned}
v_\pi(s) &= \mathbb{E}[G_t|S_t=s] \\
&= \mathbb{E}[R_t + \gamma G_{t+1}|S_t=s] \\
&= \mathbb{E}[R_t + \gamma \mathbb{E}[G_{t+1}]|S_t=s] \\
&= \mathbb{E}[R_t + \gamma v_\pi(S_{t+1})]|S_t=s] \\
&= \sum_{a\in\mathcal{A}}\pi(a|s)\sum_{\substack{s'\in\mathcal{S} \\ r\in\mathcal{R}}}p(s',r|s,a)(r+\gamma v_\pi(s'))
\end{aligned}
$$

This relationship between $\pi_\pi$ and itself allows us to update its values iteratively:

$$
v_{k+1}(s) = \mathbb{E}_\pi[R_{t+1} + \gamma v_k(S_{t+1}) | S_t=s]
$$

This process of assigning a value function to a policy is called _policy evaluation_ (get it?).

## Policy Improvement

Now let's flip the problem.  Suppose we have a policy $\pi$ and a resulting value function $v_\pi$.  Note this does not
mean $\pi$ is greedy with respect to $v_\pi$.  It may be possible that some action-value q values contradict the policy.
For example, suppose $\pi$ is nearly uniform for actions at a state $s$, and the action $a$ with the highest
action-value $q_\pi(s,a)$ as a relatively low $\pi$ value.  Then it is possible that $q_\pi(s,a) > v_\pi(s)$.  If that
is the case, then the policy $\pi'$ defined by selecting $a$ at state $s$ and agreeing with $\pi$ elsewhere is strictly
better than $\pi$ (in the sense that its expected return is greater).

## Policy Iteration

Thus, once a value function has been defined from a policy, we can improve the policy by replacing it with the greedy
policy with respect to that value function.  Iterating this two-step process of evaluation followed by improvement is
known as _policy iteration_:

$$
\pi_0 \overset{E}{\longrightarrow} \pi_1 \overset{I}{\longrightarrow} \pi_2 \overset{E}{\longrightarrow} \pi_3 \overset{I}{\longrightarrow} \cdots
$$

This feels eerily similar to Expectation-maximization algorithms in statistics, about which I know almost nothing.

## Other topics in this chapter

There are other topics, mostly related to the observation that the above algorithm involves repeated full scans of the
state-action space at every step.  Notably, the authors assert without proof that Bellman updates like the above can be
done in piecemeal fashion and will still converge to optimal value-policy pairs.
