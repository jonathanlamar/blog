---
title: Unsupervised Machine Learning Models
date: 2022-02-20
image: kmeans.png
author: Jon
tags: ["machine learning"]
---

Here is a list of quick, memorizable descriptions of various unsupervised algorithms that can be
used for analysis, dimension reduction, and data cleaning. I put this list together for interview
prep for various data science and MLE interviews.  Note that there are some sections with **TODO:**
notes that I left for myself.  That's because these notes are unfinished, and I hope to come back
and update this post with more details.

## PCA

### Theory

#### The Covariance Matrix

Let $X$ be an $n\times m$ dataset and let $\mu_X$ be the matrix with entries
$(\mu_X)_{i,j} = \mu_{X_j} = \frac{1}{n}\sum_kX_{k,j}$ (i.e., the column means
repeated over each column). The covariance matrix of $X$ is defined to be

$$
\Sigma = (1/n)(X-\mu_X)^T(X-\mu_X).
$$

This is ultimately due to the identity

$$
\begin{aligned}
\frac{1}{n}((X-\mu_X)^T(X-\mu_X))_{i,j}
&= \frac{1}{n}\sum_k(X-\mu_X)^T_{i,k}(X-\mu_X)_{k,j} \\
&= \frac{1}{n}\sum_k(X-\mu_X)_{k, i}(X-\mu_X)_{k,j} \\
&= \frac{1}{n}\sum_k\big[X_{k,i}X_{k,j} - \mu_{X_j}X_{k,i} - \mu_{X_i}X_{k,j} +
\mu_{X_i}\mu_{X_j}\big] \\
&= \frac{1}{n}\sum_kX_{k,i}X_{k,j} - \mu_{X_i}\mu_{X_j} \\
&= \widehat{\mathbb{E}}(X_{\cdot, i}X_{\cdot, j}) - \mu_{X_i}\mu_{X_j} \\
&= \text{Cov}(X_{\cdot, i}, X_{\cdot, j})
\end{aligned}
$$

where the estimated expectation in the last line is viewing the columns as
univariate random variables (so that isn't meant to be a dot product, although
the expectation itself is). Thus, the entries of the covariance matrix are the
pairwise covariances of the column vectors of $X$.

#### Eigenvalues of the Covariance Matrix

Now, assume that $\mu_X = 0$. All of this is still true otherwise, but the
calculations are more annoying. Because $\Sigma$ is symmetric, it is
diagonalizable. Consider the eigendecomposition

$$
\Sigma = Q\Lambda Q^{-1},
$$

where $Q$ is the matrix whose columns are the eigenvectors of $\Sigma$.

Consider the first principal component. By definition, this is the unit vector
linear combination of the features $X_{\cdot, i}$ which _maximizes_ variance.
So if we write

$$
Z_1 = \sum_{i=1}^m\phi_{i, 1}X_i,
$$

Then the vector $\phi = (\phi_{1,1}, \ldots, \phi_{m, 1})^T$ maximizes the
equation

$$
\begin{aligned}
\frac{1}{n}\langle Z_1, Z_1\rangle &= \frac{1}{n}\langle\sum_i\phi_{i, 1}X_i,
\sum_j\phi_{j, 1}X_j\rangle \\
&= \sum_{i,j}\phi_i\phi_j\cdot\frac{1}{n}\langle X_i, X_j\rangle \\
&= \sum_{i,j}\phi_i\phi_j\cdot \Sigma_{i,j} \\
&= \phi^T\Sigma\phi \\
&= \lVert\phi\rVert\cdot\lVert\Sigma\phi\rVert\cdot\cos(\theta) \\
&= \lVert\Sigma\phi\rVert\cdot\cos(\theta) \\
&\leq \lVert\Sigma\rVert.
\end{aligned}
$$

Now, it is a fact that I looked up on the internet that the $L2$-norm of a
matrix is equal to the largest singular value of that matrix (why?). It is also
a fact that the singular values and eigenvalues coincide for a symmetric matrix
(this is a straightforward computation). Thus, the final line in the above
equation is equal to the largest eigenvalue of $\Sigma$, and therefore the
eigenvector of $\Sigma$ corresponding to this eigenvalue is in fact the first
principal component.

The rest of the eigenvectors of $\Sigma$ are called the other principal
components of $X$

## Collaborative Filtering

### Problem Motivation

Suppose we are building a recommender system for a movie service with an
explicit rating system.  Users rate movies on a scale of 0 to 5 stars, or
something.  Imagine we have $k$ genres for titles in the form of a
$k$-dimensional vector $x^{(i)}$ for each movie $i$, as well as known weights
for genre preference of users in the form of $k$-dimensional vectors
$\theta^{(u)}$ for each user $u$ (in both cases, assuming the weights sum to 1).
Then it would be easy to predict the potential rating of a movie by a user.  The
rating $r_{u,i}$ would be approximated by 5 times the dot product of
$\theta^{(u)}$ and $x^{(i)}$.

### Alternating Least Squares

This suggests an optimization problem.  If we know the user preference vectors
$\theta^{(u)}$, then learning the movie genre vectors $x^{(i)}$ is achieved by
minimizing the expression
$$
\sum_{i}\sum_{u}\big(\theta^{(u)}\cdot x^{(i)} - r_{u,i}\big)^2 + \lambda\sum_i\lVert x^{(i)}\rVert^2
$$
(where the summands are only for the $(u,i) pairs such that $r_{u,i}$ exists).
Similarly, if we know the genre embeddings $x^{(i)}$, then learning the user
preferences $\theta^{(u)}$ is achieved by minimizing the expression
$$
\sum_{u}\sum_{u}\big(\theta^{(u)}\cdot x^{(i)} - r_{u,i}\big)^2 + \lambda\sum_u\lVert \theta^{(u)}\rVert^2.
$$
So, the way we find both user and movie genre embeddings, we simply alternate
minimizing the above expressions, with some initial random guesses.  We can
combine the above expressions into one:
$$
J = \sum_{u}\big(\theta^{(u)}\cdot x^{(i)} - r_{u,i}\big)^2 + \lambda\sum_u\lVert x^{(i)}\rVert^2 + \lambda\sum_u\lVert \theta^{(u)}\rVert^2.
$$
We can also just minimize $J$ directly using gradient descent.  I'm not sure if
that's advantageous.

### Low Rank Matrix Factorization

Let $m$ be the number of users and let $n$ be the number of movies, and let $k$
be the number of genres (called _latent factors_ in generality).  Let
$R\in\mathbb{R}^{m\times n}$ be the matrix of ratings, let
$X\in\mathbb{R}^{k\times n}$ be the matrix of genre weights for the movies, and
let $\Theta\in\mathbb{R}^{m\times k}$ be the matrix of genre preferences for the
users.  Then
$$
R = \Theta\cdot X.
$$
The fact that the matrix is low rank is actually highly important.  It says that
we don't need a lot of genres.  That in fact, the full ratings matrix has a lot
of dependencies (similarities between people and between movies, and also linear
dependencies between people's preferences for various genres).  We can rely on
this low rank assumption when designing algorithms for recommender systems.

## Other models I did not get a chance to write up

**TODO:** Write these up some time

* Singular Value Decomposition
* K Means
* Robust Covariance
* One Clas SVM
* Isolation Forest
