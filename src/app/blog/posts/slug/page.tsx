import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LaTeX } from '@/components/LaTeX';

export const metadata = {
  title: 'From Least Squares to Likelihood: The Dual Nature of Linear Regression',
  description: 'A rigorous derivation of linear regression as both a geometric projection and a probabilistic model under Gaussian noise:connecting least squares with maximum likelihood estimation.',
};

const LinearRegression = () => {
  return (
    <article className="max-w-3xl mx-auto prose prose-lg prose-gray dark:prose-invert">
      <h1>From Least Squares to Likelihood: The Dual Nature of Linear Regression</h1>
      <p className="text-gray-600 mb-8">June 29, 2025</p>
      <p className="text-sm text-gray-600 italic mb-6">
  This post is accessible to readers with a basic understanding of matrix algebra and probability. 
  If you're new to those topics, don’t worry — my upcoming posts will cover the essential foundations 
  of linear algebra and probability for machine learning. Stay tuned!
</p>


      <section>
        <h2>Introduction</h2>
        <p>
          Imagine you want to predict the price <LaTeX math="y" /> of a house in City A. Naturally, the price depends on various factors — 
          the size of the house, its location (proximity to schools, hospitals, etc.), its age, and perhaps a dozen more. 
          In machine learning, we represent these influencing factors as a feature vector: 
          <strong><LaTeX math="X = [x_1, x_2, ..., x_n]" /></strong>, where each <LaTeX math="x_i" /> is a numerical representation of some property of the house.
        </p>

        <p>
          Our goal is to learn a relationship between <LaTeX math="X" /> and <LaTeX math="y" />, so we can predict the price of new houses just from their features.
          One of the most classic ways to approach this is through <strong>linear regression</strong>:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="y \approx w_0 + w_1 x_1 + w_2 x_2 + \dots + w_n x_n = w^\top x" displayMode={true} />
        </div>

        <p>
          This is the <strong>least squares perspective</strong>: find the weights <LaTeX math="w_1, ..., w_n" /> and bias <LaTeX math="w_0" /> that minimize the total squared error 
          between predicted and actual prices across the training data.
        </p>
        <p>
        In practice, no matter how many features we include, there will always be unpredictable or unmeasured influences — random fluctuations, measurement noise, and real-world complexities we choose to ignore for simplicity. 
          That's why we don't write our model as <LaTeX math="y = w^\top x" />, but rather:
        </p>

        <div className="text-center mt-4 mb-4">
          <LaTeX math="y = w^\top x + \varepsilon" displayMode={true} />
        </div>
        <p>
          The  <LaTeX math="\varepsilon" /> term captures this uncertainty — the deviation between the actual observed value and the model’s idealized prediction. 
          It reminds us that the model is a simplification. As the statistician George E. P. Box famously said:
        </p>

        <figure className="mt-6 p-4">
          <blockquote className="pl-8 italic border-l-4 border-gray-400">
            "All models are wrong, but some are useful."
          </blockquote>
          <figcaption className="text-right pr-4">&mdash; George E. P. Box</figcaption>
        </figure>

        <p>
          Thinking of <LaTeX math="\varepsilon" /> as a random variable — specifically, as a sample from a probability distribution — 
          turns this from a deterministic equation into a probabilistic model. 
          And as we’ll see next, this small conceptual shift leads us directly to <em>maximum likelihood estimation</em>.
        </p>

      </section>
      <section>
  <h2>The Least Squares Perspective</h2>

  <p>
    Before diving into the math, let’s address one notational point. 
    In the previous section, we used <LaTeX math="w_0" /> to represent the intercept term. 
    For clarity and to align with standard convention, we’ll now write the intercept as <LaTeX math="b" />, 
    and keep the rest of the weights as a vector <LaTeX math="w = [w_1, w_2, ..., w_n]^\top" />. 
    This allows us to express our model compactly as:
  </p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="y = w^\top x + b" displayMode={true} />
  </div>

  <p>
    Now suppose we are given a dataset of <LaTeX math="n" /> examples, 
    where each data point consists of a feature vector <LaTeX math="x^{(i)} \in \mathbb{R}^d" /> {''} 
    and a corresponding target value <LaTeX math="y^{(i)} \in \mathbb{R}" />. 
    Our goal is to find the parameters <LaTeX math="w" /> and <LaTeX math="b" /> {''} 
    that best fit the data — in other words, that produce predictions <LaTeX math="w^\top x^{(i)} + b" /> {''} 
    that are as close as possible to the actual observed values <LaTeX math="y^{(i)}" />.
  </p>
  <p>
  To make this concrete, here’s a snapshot of a real dataset used for regression: 
  the California Housing dataset. Each row represents one example (a house), 
  and each column is a numerical feature such as the median income of the area, 
  average number of rooms, etc. The target value <LaTeX math="y" /> is the median house value.
</p>

<div className="text-center mt-4 mb-4">
  <Image src="/assets/california_housing_head.png" alt="California Housing Dataset Preview" width={700} height={300} loading="eager" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
</div>

<p>
  In our notation, each row corresponds to a feature vector <LaTeX math="x^{(i)}" />, 
  and the final column (the target) corresponds to <LaTeX math="y^{(i)}" />. 
  If the dataset has <LaTeX math="n" /> rows and <LaTeX math="d" /> features, then:
</p>

<ul>
  <li><LaTeX math="X \in \mathbb{R}^{n \times d}" displayMode={true} /> is the matrix of feature vectors</li>
  <li><LaTeX math="y \in \mathbb{R}^n" /> is the vector of target values</li>
</ul>


<p>
  To measure how good our predictions are, we define the <strong>squared error loss</strong> for each data point:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\text{Error}^{(i)} = \left(y^{(i)} - w^\top x^{(i)} - b\right)^2" displayMode={true} />
</div>

<p>
  In machine learning, such loss functions are typically called <strong>objective functions</strong> — 
  mathematical expressions we aim to minimize (or maximize) using optimization techniques like 
  gradient descent or closed-form solvers. In this case, we use the <em>squared</em> error because it's:
</p>

<ul>
  <li><strong>Differentiable</strong>, which makes it easy to optimize using calculus-based methods,</li>
  <li><strong>Convex</strong>, so it guarantees a unique global minimum</li>
</ul>
<p>
  Here's a visual intuition for what the squared error captures: 
  Each blue point represents a house in our dataset, plotted against a single feature (average number of rooms). 
  The red line is the regression model’s prediction. The dashed vertical lines show the errors — 
  the distance between the true value and the predicted value for each data point.
</p>

<div className="text-center mt-4 mb-4">
    <Image src="/assets/residual_plot.png" alt="Scatter plot with regression line and residuals" width={500} height={400} loading="eager" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
</div>

<p>
  The squared error loss function penalizes these vertical distances — especially large ones — and 
  finds the line that minimizes the total penalty over the dataset.
</p>

<p>
    The total error over the dataset is then the sum of these individual squared errors. 
    This gives us the least squares objective function:
  </p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="\mathcal{L}(w, b) = \sum_{i=1}^{n} \left(y^{(i)} - w^\top x^{(i)} - b\right)^2" displayMode={true} />
  </div>

  <p>
    The optimal weights <LaTeX math="w^*" /> and intercept <LaTeX math="b^*" /> are those that minimize this loss:
  </p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="\min_{w, b} \ \mathcal{L}(w, b)" displayMode={true} />
  </div>

  <p>
    This optimization problem defines the classical formulation of linear regression. 
    It’s purely geometric and algebraic: we are finding the linear function that best fits the data by minimizing squared deviation.
  </p>


<p>
  To derive a closed-form solution, we express the entire dataset in matrix form. 
  Let <LaTeX math="X \in \mathbb{R}^{n \times d}" /> be the matrix of feature vectors, 
  where each row is a data point <LaTeX math="x^{(i)\top}" />  and  {''}
  <LaTeX math=" y \in \mathbb{R}^{n}" /> be the vector of target values. 
</p>

<p>
  To incorporate the intercept <LaTeX math="b" />, we augment <LaTeX math="X" />  
  with a column of ones, forming <LaTeX math="\tilde{X} \in \mathbb{R}^{n \times (d+1)}" />:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\tilde{X} = \begin{bmatrix} x^{(1)\top} & 1 \\ x^{(2)\top} & 1 \\ \vdots & \vdots \\ x^{(n)\top} & 1 \end{bmatrix}" displayMode={true} />
</div>

<p>
  Similarly, we define the augmented parameter vector:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\tilde{w} = \begin{bmatrix} w \\ b \end{bmatrix} \in \mathbb{R}^{d+1}" displayMode={true} />
</div>

<p>
  Now the prediction for all data points becomes simply:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\hat{y} = \tilde{X} \tilde{w}" />
</div>

<p>
  And the least squares loss can be written compactly as:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\mathcal{L}(\tilde{w}) = \|y - \tilde{X} \tilde{w}\|_2^2" displayMode={true} />
</div>

<p>
  This is a standard quadratic minimization problem. Let’s expand the squared loss function 
  <LaTeX math="\mathcal{L}(\tilde{w}) = \|y - \tilde{X} \tilde{w}\|_2^2" /> 
  {''} into a fully expanded quadratic form:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\mathcal{L}(\tilde{w}) = (y - \tilde{X} \tilde{w})^\top (y - \tilde{X} \tilde{w})" displayMode={true} />
</div>

<p>
  Expanding this using standard matrix identities:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="= y^\top y - 2 \tilde{w}^\top \tilde{X}^\top y + \tilde{w}^\top \tilde{X}^\top \tilde{X} \tilde{w}" displayMode={true} />
</div>
<p>
  Before we compute the gradient, let's confirm that {''}
  <LaTeX math="\tilde{w}^\top \tilde{X}^\top \tilde{X} \tilde{w}" /> 
  {''} is indeed a scalar (a single number), which justifies the symmetry trick used later in the derivation.
</p>

<p>
  Recall the matrix dimensions:
</p>

<ul className="pl-6 list-disc">
  <li>
    <LaTeX math="\tilde{X} \in \mathbb{R}^{n \times (d+1)}" /> — data matrix with bias column added
  </li>
  <li>
    <LaTeX math="\tilde{w} \in \mathbb{R}^{(d+1) \times 1}" /> — parameter vector
  </li>
</ul>

<p>
  Then we have:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\tilde{w}^\top \tilde{X}^\top \tilde{X} \tilde{w} \in \mathbb{R}^{1 \times 1}" displayMode={true} />
</div>

<p>
  Here's the reasoning:
</p>

<ol className="pl-6 list-decimal">
  <li><LaTeX math="\tilde{X} \tilde{w} \in \mathbb{R}^{n \times 1}" /> — the predicted values</li>
  <li><LaTeX math="\tilde{X}^\top (\tilde{X} \tilde{w}) \in \mathbb{R}^{(d+1) \times 1}" /></li>
  <li><LaTeX math="\tilde{w}^\top (\tilde{X}^\top \tilde{X} \tilde{w}) \in \mathbb{R}^{1 \times 1}" /></li>
</ol>

<p>
  Therefore, the whole expression collapses to a single real number. 
  Since it's a scalar, we can freely take its transpose:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\tilde{w}^\top \tilde{X}^\top \tilde{X} \tilde{w} = (\tilde{w}^\top \tilde{X}^\top \tilde{X} \tilde{w})^\top = \tilde{w}^\top (\tilde{X}^\top \tilde{X})^\top \tilde{w}" displayMode={true} />
</div>

<p>
  Which justifies the simplification in the gradient derivation.
</p>

<p>
  We now take the gradient of <LaTeX math="\mathcal{L}(\tilde{w})" /> with respect to <LaTeX math="\tilde{w}" />. 
  Using standard vector calculus identities (listed below), we obtain:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\nabla_{\tilde{w}} \mathcal{L} = -2 \tilde{X}^\top y + 2 \tilde{X}^\top \tilde{X} \tilde{w}" displayMode={true} />
</div>

<p>
  Setting the gradient to zero gives the first-order condition:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="-2 \tilde{X}^\top y + 2 \tilde{X}^\top \tilde{X} \tilde{w} = 0" displayMode={true} />
</div>

<p>
  Cancelling the constant and rearranging, we get the <strong>normal equation</strong>:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\tilde{X}^\top \tilde{X} \tilde{w} = \tilde{X}^\top y" displayMode={true} />
</div>

<p>
  And assuming <LaTeX math="\tilde{X}^\top \tilde{X}" /> is invertible, the unique solution is:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX math="\tilde{w}^* = (\tilde{X}^\top \tilde{X})^{-1} \tilde{X}^\top y" displayMode={true} />
</div>

<p>
  This is the closed-form solution to the least squares problem, derived directly from calculus and matrix algebra.
</p>

<div className="bg-gray-50 border-l-4 border-blue-400 p-4 mt-6 text-sm text-gray-800 rounded">
  <strong>📘 Matrix Derivative Reference:</strong>
  <p className="mt-2">
    The following identities were used in the derivation:
  </p>
  <ul className="list-disc list-inside mt-2">
    <li>
      <LaTeX math="\frac{\partial}{\partial x} (x^\top A) = A" /> (if <LaTeX math="A" /> is constant)
    </li>
    <li>
      <LaTeX math="\frac{\partial}{\partial x} (Ax) = A" />
    </li>
    <li>
      <LaTeX math="\frac{\partial}{\partial x} (x^\top A x) = A^\top x + A x" /> <br />
      (or <LaTeX math="2 A x" /> if <LaTeX math="A" /> is symmetric)
    </li>
  </ul>
  <p className="mt-2">
    These results are foundational in matrix calculus and commonly appear in optimization for machine learning.
  </p>
</div>


<p>
  This is the closed-form solution to the linear regression problem. 
  It gives us the optimal weights and intercept that minimize the total squared error across the training data.
</p>

<p>
  But there’s also a powerful geometric interpretation here. 
  If we look closely, we can see that linear regression is performing an 
  <strong> orthogonal projection of the target vector</strong> <LaTeX math="y \in \mathbb{R}^n" /> 
  onto the column space of the design matrix <LaTeX math="\tilde{X}" />.
</p>

<p>
  In other words, the predicted values <LaTeX math="\hat{y} = \tilde{X} \tilde{w} "  /> {''}
   live in the subspace spanned by the feature vectors (the columns of <LaTeX math="\tilde{X}" />). 
  Among all possible vectors in this subspace, <LaTeX math="\hat{y}" /> is the one closest to 
  the true output <LaTeX math="y" /> in Euclidean distance.
</p>

<p>

  This makes <LaTeX math="\hat{y}" /> the <em>best linear approximation</em> of <LaTeX math="y" /> {''}
  using the available features. The residual vector <LaTeX math="y - \hat{y}" /> is 
  <strong> orthogonal</strong> to the subspace spanned by the feature vectors.
</p>




<section>
  <h2>The Probabilistic Interpretation: Linear Regression as Maximum Likelihood</h2>

  <p>
    In the previous section, we viewed linear regression purely as a geometric problem: 
    we projected the target vector <LaTeX math="y" /> onto the column space of the design matrix <LaTeX math="\tilde{X}" />. 
    But notice what was missing: we made no assumptions about uncertainty or randomness. 
    The model simply sought the best deterministic fit.
  </p>

  <p>
    In this section, we take a different approach. Instead of treating <LaTeX math="y" /> as fixed, 
    we now treat it as a <strong>random variable</strong>. 
    Specifically, we assume that the outputs are generated from a linear model plus some random noise:
  </p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="y^{(i)} = w^\top x^{(i)} + b + \varepsilon^{(i)}" displayMode={true} />
  </div>

  <p>
    We model the noise as Gaussian:
  </p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="\varepsilon^{(i)} \sim \mathcal{N}(0, \sigma^2)" displayMode={true} />
  </div>
  <p>
  But why assume the noise <LaTeX math="\varepsilon" /> is Gaussian in the first place?
  This assumption may seem arbitrary, but it actually arises from a deep statistical principle: 
  <strong> maximum entropy</strong>.
</p>

<p>
  Among all probability distributions with a given mean and variance, 
  the Gaussian distribution is the one with the highest entropy — 
  meaning it makes the fewest assumptions beyond those two constraints. 
  In other words, it’s the most "uninformative" distribution consistent with knowing only the second moment.
</p>

<p>
  This aligns with a core generalization principle in machine learning: when we model uncertainty, we should 
  choose distributions that inject as little bias as possible beyond what the data dictates. 
  The Gaussian is a natural choice in this regard, especially within the 
  <a href="https://en.wikipedia.org/wiki/Exponential_family" target="_blank"> exponential family of distributions </a> 
  of distributions, which form the foundation of many standard ML models.
</p>


<p>
  The Gaussian noise assumption implies that for each data point, the target value {''}
  <LaTeX math="y^{(i)}" /> is normally distributed around the linear prediction {''}
  <LaTeX math="w^\top x^{(i)} + b" /> with variance <LaTeX math="\sigma^2" />:
</p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="p(y^{(i)} \mid x^{(i)}) = \mathcal{N}(y^{(i)} \mid w^\top x^{(i)} + b, \sigma^2)=\frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(y^{(i)} - w^\top x^{(i)} - b)^2}{2\sigma^2} \right)"  displayMode={true} />
  </div>
  <p>
  The goal of maximum likelihood is to choose parameters <LaTeX math="w" /> and {''}<LaTeX math="b" /> 
  {''} that maximize the probability of observing the entire dataset. 
  Assuming the data points are independent, we can write the likelihood as:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX 
    math="\mathcal{L}(w, b \mid x^{(1)}, \dots, x^{(n)}) = \prod_{i=1}^{n} p(y^{(i)} \mid x^{(i)}; w, b)" 
    displayMode={true} 
  />
</div>

<p>
  Plugging in the Gaussian formula for each term:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX 
    math="\mathcal{L}(w, b) = \prod_{i=1}^{n} \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(y^{(i)} - w^\top x^{(i)} - b)^2}{2\sigma^2}\right)" 
    displayMode={true} 
  />
</div>

<p>
  Using the product rule for exponentials, we simplify the product:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX 
    math="\mathcal{L}(w, b) = \left(\frac{1}{\sqrt{2\pi\sigma^2}}\right)^n \cdot \exp\left( -\frac{1}{2\sigma^2} \sum_{i=1}^{n} (y^{(i)} - w^\top x^{(i)} - b)^2 \right)" 
    displayMode={true} 
  />
</div>

<p>
  To make optimization easier, we take the logarithm of the likelihood function — known as the 
  <strong> log-likelihood</strong>. Taking the negative of this expression transforms the 
  maximization problem into a minimization problem:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX 
    math="-\log \mathcal{L}(w, b) = \frac{n}{2} \log(2\pi\sigma^2) + \frac{1}{2\sigma^2} \sum_{i=1}^{n} (y^{(i)} - w^\top x^{(i)} - b)^2" 
    displayMode={true} 
  />
</div>

<p>
  Notice that the first term <LaTeX math="\frac{n}{2} \log(2\pi\sigma^2)" /> is constant with respect to {''}
  <LaTeX math="w" /> and <LaTeX math="b" />, so it has no effect on the optimization.
</p>

<p>
  To make this explicit, let’s compute the partial derivatives with respect to the parameters:
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX 
    math="\frac{\partial}{\partial w}, \frac{\partial}{\partial b} \left[-\log \mathcal{L}(w, b)\right] = 0 + \frac{\partial}{\partial w}, \frac{\partial}{\partial b} \left[ \frac{1}{2\sigma^2} \sum_{i=1}^{n} (y^{(i)} - w^\top x^{(i)} - b)^2 \right]" 
    displayMode={true} 
  />
</div>

<p>
  This shows that the constant term vanishes under differentiation, and what remains is proportional to 
  the gradient of the squared loss function.
</p>

<p>
  Therefore, maximizing the log-likelihood is equivalent to minimizing the following (negative log-likelihood):
</p>

<div className="text-center mt-4 mb-4">
  <LaTeX 
    math="\sum_{i=1}^{n} (y^{(i)} - w^\top x^{(i)} - b)^2" 
    displayMode={true} 
  />
</div>

<p>
  This is exactly the same loss we derived from a geometric perspective — the squared error — now obtained 
  from a probabilistic foundation.
</p>


  {/* <p>
    Since the data points are assumed to be i.i.d., the likelihood of the full dataset is the product of the individual densities:
  </p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="\mathcal{L}(w, b) = \prod_{i=1}^{n} \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(y^{(i)} - w^\top x^{(i)} - b)^2}{2\sigma^2}\right)" displayMode={true} />
  </div>

  <p>
    To simplify optimization, we take the logarithm of the likelihood (log-likelihood):
  </p>

  <div className="text-center mt-4 mb-4">
    <LaTeX math="\log \mathcal{L}(w, b) = -\frac{n}{2} \log(2\pi\sigma^2) - \frac{1}{2\sigma^2} \sum_{i=1}^{n} (y^{(i)} - w^\top x^{(i)} - b)^2" displayMode={true} />
  </div> */}
  

 

  <div className="text-center mt-4 mb-4">
    <LaTeX math="\min_{w, b} \sum_{i=1}^{n} (y^{(i)} - w^\top x^{(i)} - b)^2" displayMode={true} />
  </div>

  <p>
    In other words, <strong>least squares estimation is equivalent to maximum likelihood estimation </strong> 
    under a Gaussian noise model. What was previously a purely geometric objective now emerges from a probabilistic framework.
  </p>

  <p>
    This new perspective allows us to reason probabilistically about our model’s uncertainty and  
    make confidence estimates
  </p>
  <section>
  <h2>Conclusion</h2>

  <p>
    We’ve now seen linear regression from two fundamental perspectives:
  </p>

  <ul>
    <li><strong>The geometric view</strong>: linear regression projects the target <LaTeX math="y" /> {''}
    onto the column space of <LaTeX math="\tilde{X}" />, finding the best linear approximation in Euclidean space.</li>
    
    <li><strong>The probabilistic view</strong>: assuming Gaussian noise and applying maximum likelihood 
    leads to the same squared error loss — but this time, derived from a principled statistical model.</li>
  </ul>

  <p>
    This duality is foundational to how we design and understand learning algorithms. 
    Whether we interpret linear regression as a projection or as a likelihood optimizer, we’re using 
    the same underlying mathematics — but with different implications and extensions.
  </p>
  <hr className="my-6" />

<p className="text-sm text-gray-600">
  📌 This post was inspired by a lecture and exam question from the 
  <strong> Machine Learning (CS376)</strong> course at KAIST, taught by {''}
  <a href="https://sites.google.com/view/npark/home?authuser=0" target="_blank" rel="noopener noreferrer">
    Professor Noseong Park
  </a>.
</p>



</section>


  {/* <p>
    In the final section, we’ll reflect on both perspectives — geometric and probabilistic — and discuss what this duality teaches us 
    about modeling in machine learning.
  </p> */}
</section>


   
  


</section>


      {/* Add the rest of the sections here */}

      <div className="mt-8">
        <Link 
          href="/blog" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Blog
        </Link>
      </div>
    </article>
  );
};

export default LinearRegression;