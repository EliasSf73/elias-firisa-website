import React from 'react';
import Link from 'next/link';
import { LaTeX } from '@/components/LaTeX';

export const metadata = {
  title: 'From Least Squares to Likelihood: The True Nature of Linear Regression',
  description: 'A mathematically rigorous journey through linear regression — from geometric intuition to probabilistic modeling, connecting least squares with maximum likelihood estimation.',
};

const LinearRegression = () => {
  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-lg prose-gray dark:prose-invert">
      <style jsx global>{`
        .prose p {
          margin-bottom: 1.5rem;
        }
        .prose h2 {
          margin-top: 2rem;
          margin-bottom: 1.5rem;
        }
        .prose h3 {
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
      `}</style>
      <h1>From Least Squares to Likelihood: The True Nature of Linear Regression</h1>
      <p className="text-gray-600 mb-8">June 29, 2025</p>

      <section>
        <h2>Introduction</h2>
        <p>
          Imagine you want to predict the price \( y \) of a house in City A. Naturally, the price depends on various factors — 
          the size of the house, its location (proximity to schools, hospitals, etc.), its age, and perhaps a dozen more. 
          In machine learning, we represent these influencing factors as a feature vector:
          <div className="text-center mt-4 mb-4">
            <LaTeX math="\mathbf{X} = [x_1, x_2, \dots, x_n]" />
          </div>
          where each \( x_i \) is a numerical representation of some property of the house.
        </p>

        <p>
          Our goal is to learn a relationship between \( \mathbf{X} \) and \( y \), so we can predict the price of new houses just from their features.
          One of the most classic ways to approach this is through <strong>linear regression</strong>:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="y \approx w_0 + w_1 x_1 + w_2 x_2 + \dots + w_n x_n = \mathbf{w}^\top \mathbf{x}" />
        </div>

        <p>
          This is the <strong>least squares perspective</strong>: find the weights \( w_1, \dots, w_n \) and bias \( w_0 \) that minimize the total squared error 
          between predicted and actual prices across the training data.
        </p>
        <p>
          In practice, no matter how many features we include, there will always be unpredictable or unmeasured influences — random fluctuations, measurement noise, and real-world complexities we choose to ignore for simplicity. 
          That's why we don't write our model as
          <div className="text-center mt-4 mb-4">
            <LaTeX math="y = \mathbf{w}^\top \mathbf{x}" />
          </div>
          but rather:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="y = \mathbf{w}^\top \mathbf{x} + \varepsilon" />
        </div>

        <p>
          The \( \varepsilon \) term captures this uncertainty — the deviation between the actual observed value and the model’s idealized prediction 
          It reminds us that the model is a simplification. As the statistician George E. P. Box famously said:
        </p>

        <blockquote className="mt-8 mb-8 p-8 border-l-8 border-gray-400 pl-8 italic text-xl font-medium">
          <p className="mb-4 text-gray-900">
            "All models are wrong, but some are useful."
          </p>
          <p className="text-right text-gray-600">
            — George E. P. Box
          </p>
        </blockquote>

        <p>
          Thinking of \( \varepsilon \) as a random variable — specifically, as a sample from a probability distribution — 
          turns this from a deterministic equation into a probabilistic model. 
          And as we’ll see next, this small conceptual shift leads us directly to <em>maximum likelihood estimation</em>.
        </p>
        <p>
          where \( \beta \) represents the coefficients we want to estimate.
        </p>
        <p>
          The most common approach to linear regression is through the method of least squares. Given a dataset 
          with \( n \) observations and \( p \) features, we seek to find a linear relationship between the input features \( \mathbf{X} \) and 
          the response variable \( y \):
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="y = X\beta + \varepsilon" />
        </div>
        <p>
          where \( \beta \) represents the coefficients we want to estimate.
        </p>

        <h3>Deriving the Least Squares Solution</h3>
        <p>
          The least squares approach minimizes the sum of squared residuals:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="\min_\beta (y - \mathbf{X}\beta)^\top(y - \mathbf{X}\beta)" />
        </div>
        <p>
          Taking the derivative and setting it to zero gives us the normal equations:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="X^\top X\beta = X^\top y" />
        </div>
        <p>          Assuming \( X^\top X \) is invertible, we obtain:        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="\hat{\beta} = (X^\top X)^{-1}X^\top y" />
        </div>

        <h2>The Probabilistic View: Modeling Uncertainty</h2>
        <p>
          While the least squares approach is powerful, it doesn't explicitly model uncertainty in the data. 
          The probabilistic view addresses this by treating the response variable as a random variable:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="y \mid x \sim \mathcal{N}(X\beta, \sigma^2)" />
        </div>
        <p>
          This formulation assumes that the errors follow a normal distribution with mean 0 and variance \( \sigma^2 \).
        </p>

        <h3>Maximum Likelihood Estimation</h3>
        <p>
          From a probabilistic perspective, we can derive the same least squares solution using maximum likelihood estimation:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="L(\beta, \sigma^2) = \prod \exp\left(-\frac{(y_i - x_i\beta)^2}{2\sigma^2}\right)" />
        </div>
        <p>
          Maximizing the log-likelihood leads to the same normal equations as the least squares approach:
        </p>
        <div className="text-center mt-4 mb-4">
          <LaTeX math="\mathbf{X}^\top \mathbf{X}\beta = \mathbf{X}^\top y" />
        </div>

        <h2>Deriving MLE: From Likelihood to Loss</h2>
        <p>
          Let's derive the connection between the probabilistic view and the loss function:
        </p>
        <ol>
          <li>
            Start with the likelihood function for independent observations:
            <div className="text-center mt-4 mb-4">
              <LaTeX math="L(\beta, \sigma^2) = \prod \exp\left(-\frac{(y_i - x_i\beta)^2}{2\sigma^2}\right)" />
            </div>
          </li>
          <li>
            Take the log-likelihood:
            <div className="text-center mt-4 mb-4">
              <LaTeX math="\log L = \sum \left[-\log(\sqrt{2\pi\sigma}) - \frac{(y_i - x_i\beta)^2}{2\sigma^2}\right]" />
            </div>
          </li>
          <li>
            Ignore constant terms and focus on the quadratic part:
            <div className="text-center mt-4 mb-4">
              <LaTeX math="-\sum (y_i - x_i\beta)^2" />
            </div>
          </li>
          <li>
            This is equivalent to minimizing the sum of squared errors:
            <div className="text-center mt-4 mb-4">
              <LaTeX math="\min_\beta \sum (y_i - x_i\beta)^2" />
            </div>
          </li>
        </ol>

        <h2>Why This Matters</h2>
        <p>
          Understanding both perspectives of linear regression provides several important insights:
        </p>
        <ul>
          <li>
            <strong>Model Assumptions:</strong> The probabilistic view makes explicit the assumptions about the error distribution,
            which are often implicit in the least squares approach.
          </li>
          <li>
            <strong>Uncertainty Quantification:</strong> The probabilistic framework allows us to derive confidence intervals
            and prediction intervals, which are crucial for practical applications.
          </li>
          <li>
            <strong>Connection to Other Models:</strong> The probabilistic interpretation connects linear regression to
            other statistical models and provides a foundation for more advanced techniques like Bayesian regression.
          </li>
          <li>
            <strong>Regularization:</strong> Both perspectives can be extended to include regularization terms, with the
            probabilistic view providing a natural interpretation of regularization as prior distributions.
          </li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Linear regression, despite its simplicity, reveals deep connections between optimization and probability theory.
          Understanding both perspectives provides a more complete picture of the model and its limitations. 
          In future posts, we'll explore how these ideas extend to more complex models and how they can be applied 
          to real-world problems in computational neuroscience and machine learning.
        </p>

        <div className="mt-8">
          <Link 
            href="/blog" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Blog
          </Link>
        </div>
      </section>
    </article>
  );
};

export default LinearRegression;
