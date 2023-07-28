// Copyright 2023 Geoid
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



/// Check


/**
 * Class that represents the Laplace distribution model.
 * The Laplace distribution is a continuous probability distribution named after Pierre-Simon Laplace. 
 * It is also sometimes referred to as a double exponential distribution.
 */
 export class Laplace {
    readonly b: number;
  
    /**
     * @param {number} mean - Mean or expected value of the distribution.
     * @param {number} variance - Variance of the distribution which is a measure of how spread out the values are.
     */
    constructor(public mean: number, public variance: number) {
      if (variance <= 0) {
        throw new Error(`Variance must be > 0 (but was ${variance})`);
      }
    
      this.b = Math.sqrt(variance) / Math.sqrt(2);
    }
  
    /**
     * Function that calculates the probability density at a given point 'x'.
     * The Probability Density Function (PDF) describes the likelihood of 'x' being the value of the random variable.
     * @param {number} x - The input number for which the probability density is to be calculated.
     * @returns {number} The probability density at 'x'.
     */
    pdf(x: number): number {
      const diff = Math.abs(x - this.mean);
      return (1 / (2 * this.b)) * Math.exp(-diff / this.b);
    }
  
    /**
     * Function that calculates the Cumulative Distribution Function (CDF) at a given point 'x'.
     * The CDF describes the probability that the random variable will take a value less than or equal to 'x'.
     * @param {number} x - The input number for which the cumulative distribution is to be calculated.
     * @returns {number} The cumulative distribution at 'x'.
     */
    cdf(x: number): number {
      if (x < this.mean) {
        return 0.5 * Math.exp((x - this.mean) / this.b);
      } else {
        return 1 - 0.5 * Math.exp(-(x - this.mean) / this.b);
      }
    }
  
    /**
     * Function that calculates the Percent Point Function (PPF) or Quantile function at a given point 'x'.
     * The PPF is the inverse of the CDF.
     * @param {number} x - The input number for which the percent point function is to be calculated.
     * @returns {number} The percent point function at 'x'.
     */
    ppf(x: number): number {
      if (x < 0.5) {
        return this.mean + this.b * Math.log(2 * x);
      } else {
        return this.mean - this.b * Math.log(2 * (1 - x));
      }
    }
  }
  