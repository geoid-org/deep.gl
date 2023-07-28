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
 * Class that represents the Cauchy distribution model.
 * The Cauchy distribution is a continuous probability distribution named after Augustin-Louis Cauchy.
 */
 export class Cauchy {
    readonly gamma: number;
  
    /**
     * @param {number} x0 - The location parameter, specifying the location of the peak of the distribution.
     * @param {number} gamma - The scale parameter which specifies the half-width at half-maximum (HWHM).
     */
    constructor(public x0: number, gamma: number) {
      if (gamma <= 0) {
        throw new Error(`Gamma must be > 0 (but was ${gamma})`);
      }
  
      this.gamma = gamma;
    }
  
    /**
     * Function that calculates the probability density at a given point 'x'.
     * The Probability Density Function (PDF) describes the likelihood of 'x' being the value of the random variable.
     * @param {number} x - The input number for which the probability density is to be calculated.
     * @returns {number} The probability density at 'x'.
     */
    pdf(x: number): number {
      const numerator = 1 / Math.PI;
      const denominator = this.gamma * (1 + ((x - this.x0) / this.gamma) ** 2);
      return numerator / denominator;
    }
  
    /**
     * Function that calculates the Cumulative Distribution Function (CDF) at a given point 'x'.
     * The CDF describes the probability that the random variable will take a value less than or equal to 'x'.
     * @param {number} x - The input number for which the cumulative distribution is to be calculated.
     * @returns {number} The cumulative distribution at 'x'.
     */
    cdf(x: number): number {
      return 1 / Math.PI * Math.atan((x - this.x0) / this.gamma) + 0.5;
    }
  
    /**
     * Function that calculates the Percent Point Function (PPF) or Quantile function at a given point 'x'.
     * The PPF is the inverse of the CDF.
     * @param {number} x - The input number for which the percent point function is to be calculated.
     * @returns {number} The percent point function at 'x'.
     */
    ppf(x: number): number {
      return this.x0 + this.gamma * Math.tan(Math.PI * (x - 0.5));
    }
  }
  