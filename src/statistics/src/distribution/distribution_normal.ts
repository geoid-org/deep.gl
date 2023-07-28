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



/**
 * Function that calculates the complementary error value.
 * This function is derived from the formula mentioned in the book, 'Numerical Recipes in C 2e' (p221).
 * @param {number} x - The input number for which the complementary error value is to be calculated.
 * @returns {number} Complementary error value for the input number 'x'.
 */
export function erfc(
    x: number
): number {
    const z = Math.abs(x);
    const t = 1 / (1 + z / 2);
    // prettier-ignore
    const r = t * Math.exp(
        -z * z - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (
            0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277))))))))
    );
  
    return x >= 0 ? r : 2 - r;
}

/**
 * Function that calculates the inverse of the complementary error function.
 * This function is derived from the formula mentioned in the book, 'Numerical Recipes 3e' (p265).
 * @param {number} x - The input number for which the inverse of the complementary error value is to be calculated.
 * @returns {number} The inverse of the complementary error function for the input number 'x'.
 */
export function ierfc(x: number): number {
    if (x >= 2) {
      return -100;
    }
  
    if (x <= 0) {
      return 100;
    }
    const xx = x < 1 ? x : 2 - x;
    const t = Math.sqrt(-2 * Math.log(xx / 2));
  
    // prettier-ignore
    let r = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);
  
    for (let j = 0; j < 2; j++) {
      const err = erfc(r) - xx;
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }
  
    return x < 1 ? r : -r;
}

/**
 * Class that represents the Gaussian (or Normal) distribution model.
 * The Gaussian distribution is a continuous probability distribution for a real-valued random variable.
 * More information: http://en.wikipedia.org/wiki/Normal_distribution
 */
export class Gaussian {
  readonly standardDeviation: number;

    /**
     * @param {number} mean - Mean or expected value of the distribution.
     * @param {number} variance - Variance of the distribution which is a measure of how spread out the values are.
     */
    constructor(
        public mean: number,
        public variance: number,
    ) {

        if (variance <= 0) {
            throw new Error(`Variance must be > 0 (but was ${variance})`);
        }

        this.standardDeviation = Math.sqrt(variance);
    }

  /**
   * Function that calculates the probability density at a given point 'x'.
   * The Probability Density Function (PDF) describes the likelihood of 'x' being the value of the random variable.
   * @param {number} x - The input number for which the probability density is to be calculated.
   * @returns {number} The probability density at 'x'.
   */
   pdf(x: number): number {
        const m = this.standardDeviation * Math.sqrt(2 * Math.PI);
        const e = Math.exp(-((x - this.mean) ** 2) / (2 * this.variance));
        return e / m;
    }

  /**
   * Function that calculates the Cumulative Distribution Function (CDF) at a given point 'x'.
   * The CDF describes the probability that the random variable will take a value less than or equal to 'x'.
   * @param {number} x - The input number for which the cumulative distribution is to be calculated.
   * @returns {number} The cumulative distribution at 'x'.
   */
   cdf(x: number): number {
        return 0.5 * erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)));
    }

  /**
   * Function that calculates the Percent Point Function (PPF) or Quantile function at a given point 'x'.
   * The PPF is the inverse of the CDF.
   * @param {number} x - The input number for which the percent point function is to be calculated.
   * @returns {number} The percent point function at 'x'.
   */
   ppf(x: number): number {
    return this.mean - this.standardDeviation * Math.sqrt(2) * ierfc(2 * x);
  }

  /**
   * Function to calculate the product of this Gaussian distribution with a given constant or another Gaussian distribution.
   * @param {number|Gaussian} d - The multiplier which could be a constant or another Gaussian distribution.
   * @returns {Gaussian} The product of this Gaussian distribution and 'd'.
   */
   mul(d: number | Gaussian): Gaussian {
    if (typeof d === 'number') {
      return this.scale(d);
    }

    const precision = 1 / this.variance;
    const dprecision = 1 / d.variance;
    return this.fromPrecisionMean(
      precision + dprecision,
      precision * this.mean + dprecision * d.mean,
    );
   }

  /**
   * Function to calculate the quotient of this Gaussian distribution with a given constant or another Gaussian distribution.
   * @param {number|Gaussian} d - The divisor which could be a constant or another Gaussian distribution.
   * @returns {Gaussian} The quotient of this Gaussian distribution and 'd'.
   */
   div(d: number | Gaussian): Gaussian {
    if (typeof d === 'number') {
      return this.scale(1 / d);
    }

    const precision = 1 / this.variance;
    const dprecision = 1 / d.variance;
    return this.fromPrecisionMean(
      precision - dprecision,
      precision * this.mean - dprecision * d.mean,
    );
  }

  /**
   * Function to calculate the sum of this Gaussian distribution and another Gaussian distribution.
   * @param {Gaussian} d - The other Gaussian distribution.
   * @returns {Gaussian} The sum of this Gaussian distribution and 'd'.
   */
   add(d: Gaussian): Gaussian {
    return new Gaussian(this.mean + d.mean, this.variance + d.variance);
  }

  /**
   * Function to calculate the difference of this Gaussian distribution and another Gaussian distribution.
   * @param {Gaussian} d - The other Gaussian distribution.
   * @returns {Gaussian} The difference of this Gaussian distribution and 'd'.
   */
   sub(d: Gaussian): Gaussian {
    return new Gaussian(this.mean - d.mean, this.variance + d.variance);
  }


  /**
   * Function to scale this Gaussian distribution by a constant factor.
   * @param {number} c - The scaling factor.
   * @returns {Gaussian} The scaled Gaussian distribution.
   */
   scale(c: number): Gaussian {
    return new Gaussian(this.mean * c, this.variance * c * c);
  }

  /**
   * Function to construct a new Gaussian distribution from the precision (reciprocal of variance) and the mean calculated using precision.
   * @param {number} precision - The precision of the Gaussian distribution.
   * @param {number} precisionmean - The mean of the Gaussian distribution calculated using precision.
   * @returns {Gaussian} The new Gaussian distribution.
   */
   fromPrecisionMean(precision: number, precisionmean: number): Gaussian {
    return new Gaussian(precisionmean / precision, 1 / precision);
  }
}
