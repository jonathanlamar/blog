---
title: Supervised Machine Learning Models
date: 2022-02-20
image: svm.png
---

Here is a list of quick, memorizable descriptions of various machine learning
algorithms.  I put this list together for interview prep for various data science and MLE
interviews.  Note that there are some sections with **TODO:** notes that I left for myself.  That's
because these notes are unfinished, and I hope to come back and update this post with more details.

## Notation

The following notation will be more or less consistent for all of these models.
The observed data for the model is always organized into an $n\times m$
dimensional matrix $X$, where $n$ is the number of training samples, and $m$ is
the number of features (so that features are columns).  We write $X^{(j)}$ to
denote the $j$th column ($j$th feature) of $X$ and $X_{(i)}$ to denote the
$i$th row.  The values to be predicted, whether class labels or numerical
values, are collected into a $n\times 1$ column vector $y$.  For any model, the
predictions of that model are organized into a column vector denoted $\hat{y}$.
Similarly, a hat is generally placed over any function to denote an estimator
for that function, whose definition depends on the context.  Any deviation from
this notation will be explained.

## Naive Bayes

This is one of the simplest Bayesian probabilistic classifiers. With notation as
outlined above, we can estimate the distributions of the predictors across these
labels to obtain density kernels

$$
p_{j,y}(x) \simeq \mathbb{P}(X_{i,j} = x \vert y_i = y).
$$

Then the formula for predicting via Naive Bayes is a simple application of Bayes
rule:

$$
\hat{y}(x) = \text{argmax}_c(\mathbb{P}(y=c \vert X=x)),
$$

where

$$
\mathbb{P}(y=c \vert X=x) = \frac{\prod_j\mathbb{P}(X^{(j)} = x_j \vert y = c)\cdot\mathbb{P}(y=c)}
{\mathbb{P}(X = x)}.
$$

The numerator of the right hand side of this equation is obtained via the kernel
density estimations on the columns of $X$, as well as the distribution of values
of $y$.  The denominator is assumed to be uniformly distributed, and therefore
is ignored in the argmax calculation.

### Notes

- This model relies on a "strong" independence assumption between the
  predictors.
- It is an example of a more general family of models known as Bayesian
  networks. It may be worth mentioning this, but caveat that I don't know
  anything about them.

## Linear Regression

**TODO:** There is a lot missing from this model. It is worth doing a deep dive
on regression for a few days and writing up a full post.

These are models of the form

$$
y = X \beta + \epsilon,
$$

where $\beta X$ is basic matrix multiplication, and $\epsilon$ is normally
distributed. These are the most basic case of Generalized Linear Models, which
I hope to describe later.

### Basic Assumptions

- Linearity - The mean of the response variables is a linear combination of the
  regressors and the beta coefficients.
- Homoscedasticity (constant variance) - The values of the response variable
  have the same variance, no matter the value of $X$. In sample data, this means
  the variance of the errors is not dependent on $X$.
- Independence of errors - the errors look like normally distributed white
  noise.
- $X$ has full rank - no multiple colinearity. This is specifically an
  assumption for OLS. Other GLMs do not suffer from this assumption.
  However, uncorrelated features do improve significance and uniqueness of
  predictions in practice.
- Weak exogeneity - That the values of $X$ are not treated like random
  variables. I.e., they exist "outside of the model," and as such, can be
  treated as constants with no error.

### Ordinary Least Squares

The basic form of linear regression is OLS. This has the advantage of a closed
form solution, assuming full rank in $X$ as discussed above. The closed form
solution is

$$
\hat{\beta}_{\text{OLS}} = (X^TX)^{-1}X^Ty.
$$

This identity minimizes the "residual sum of squares," which is a statistician's
way of saying it minimizes the expression

$$
\begin{aligned}
\lVert y - X\beta\rVert^2 &= (y - X\beta)^T(y - X\beta) \\
&= y^Ty - y^TX\beta - \beta^TX^Ty + \beta^TX^TX\beta \\
&= y^Ty - 2y^TX\beta + \beta^TX^TX\beta.
\end{aligned}
$$

Taking the gradient of this expression (as a function of $\beta$), we obtain

$$
\begin{aligned}
\frac{d}{d\beta}(y^Ty - 2y^TX\beta + \beta^TX^TX\beta) &= -2y^TX + X^TX\beta + \beta^TX^TX \\
&= -2X^Ty + 2X^TX\beta \\
&= -2X^T(y - X\beta),
\end{aligned}
$$

which is zero when $\beta$ is equal to the OLS estimator
$\hat{\beta}_{\text{OLS}}$.  Since the RSS $\lVert y - X\beta\rVert^2$ is
quadratic in $\beta$ and has a positive-definite Hessian (which is $X^TX$), it
follows that $\hat{\beta}_{\text{OLS}}$ is the unique global minimum of RSS.

**TODO:** Review why positive definite Hessian implies convexity here.  It makes
intuitive sense, but I want to derive it.

### Evaluating the Model

Once we have an estimate $\hat{\beta}$ for the coefficient vector, how do we
evaluate the estimate?

**TODO:** Derive variance of beta coefficients here.

## Logistic Regression

**TODO:** Explain in terms of GLMs as well as in terms of perceptrons.

## Decision Tree Classifier

Decision trees form a tree of subsets of the dataset by recursively splitting
nodes according to the value of one variable. The process stops whenever a leaf
node contains only members of one class, or when splitting does not improve the
objective metric by more than a specified threshold.

### CART using Gini Impurity

This is the version of decision tree most commonly implemented, and can be used
for regression as well (although this will only decribe the classifier version).

#### Gini Impurity

From wikipedia: "Gini impurity is a measure of how often a randomly chosen
element from the set would be incorrectly labeled if it was randomly labeled
according to the distribution of labels in the subset."

View $X$ as a set of elements (the rows) which belong to $k$ classes (the values
of $y$), and let $p_i$ be the proportion of elements of $X$ which belong to the
$i$th class. The probability that an element of the $i$th class is incorrectly
labeled is

$$
p_i*(1-p_i) = p_i\sum_{j\neq i}p_j.
$$

Thus, Gini impurity is calculated by:

$$
I_G(p) = \sum_{i=1}^k\Big(p_i\sum_{j\neq i}p_j\Big) = \sum_{i=1}^kp_i(1-p_i).
$$

Note this is a function of $p$, the distribution of classes of elements of $X$.

### Typical Hyperparameters

- Max depth
- Minimum number of samples per leaf node.
- Max number of leaf nodes
- Splitting criterion (e.g., GIni Impurity versus Information Gain)
- Many others (see scikit-learn documentation for examples.)

#### The Algorithm

The algorithm is recursive. Let's say we have a subset of the training set, call
it $X'$. If we split the dataset by the values of the $j$th feature ($j$th
column), let's say by the inequality $X'^{(j)} \leq C$, we can then compare the
Gini impurity of $X'$ to the sum of the Gini impurities of the two subsets
obtained by splitting this way and record the difference. Since there are only
finitely many features and finitely many distinct splits for each feature, we
choose the split that results in maximum decrease in Gini impurity. This
algorithm continues until all leaf nodes contain only elements of the same
class, or until one of several possible stopping conditions are met. These
stopping conditions include:

- Leaf nodes are too small;
- There is not a split which results in a large enough drop in Gini impurity;
- The tree is too deep;
- possibly others.

The final prediction for a new point is defined by evaluating the splits
successively to the point until a leaf node is reached. The predicted class for
the point is the most common class in the leaf node.

## Random Forest

A random forest is a set of decision trees that are trained on random subsets of
the features and using random bootstrapped subsets of the training data.  The
training for each tree is performed independently.  To predict using random
forest, each tree forms its prediction, and the most common prediction among the
trees is the overall prediction.

This is an example of "ensemble modeling," where several simpler models are
aggregated in order to reduce variance by averaging.  Since fully grown decision
trees are typically low bias and high variance models, they work well with
ensembling.  Contrast with gradient boosted decision trees, which uses weak
predictions via shallow trees.

### Random Subspaces

At each split, each tree is only allowed to consider features from a randomly
chosen subset of the features.

### Bagging

Each tree is trained on a bootstrapped subset of the dataset (i.e., one which is
sampled with replacement).  This way each tree sees a different training set,
however all trees observe the same number of trainin samples.

### Hyperparameters

- Number of Trees
- Number of training samples per tree.
- Nummber of features considered per split.
- All hyperparameters inherited from decision tree model.

## Gradient Boosted Decision Trees

Gradient boosting is a general approach to machine learning, where a family of
"weak learners" (simple models with high bias/low variance, e.g., shallow
decision trees) are trained recursively on the error in prediction of the
previous iteration of the overall model.

This comes in many forms, but the most common by far is the gradient boosting of
decision trees using crossentropy (for classification) or mean squared error
(for regression).

### Additive Modeling

As outlined above, gradient boosting works by training a sequence of decision
trees $f_m(x)$ and expressing the final prediction as a sum

$$
F_n(x) = \sum_{i=0}^n\lambda^if_i(x),
$$

where $\lambda\in(0,1)$ is a discount factor. The first tree $F_0 = f_0$ is trained to predict the true value $y$
(whether this is a categorical or continuous random variable is immaterial in this discussion).  Subsequently, the $i$th
tree $f_i$ is trained to predict the error $L(y, F_{i-1})$.  If this is a classification tree, then $L$ is crossentropy
error and its value is either 0 or 1.  If this is a regression tree, then $L$ is root mean squared error and its value
is the target of the regression tree.

## K Nearest Neighbors

Extremely simple algorithm.  Assume the rows of $X$ exist in a metric space with
metric $d$ (usually euclidean space, but we could use a cosine-like metric for
high dimensional datasets).  For any point $x$ in the matrix, the predicted
label for $x$, $\hat{y}$, is computed by considering the $k$ rows of $X$ which
are closest to $x$ with respect to the metric $d$, and assigning $\hat{y}$ to be
the most common label among them.  Ties are broken either randomly or defaulting
to the class with greatest prior probability, or some other systematic process.
