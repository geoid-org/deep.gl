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
 * Quantile
 * @static
 * @memberof
 * @class
 * @description Finds the quantile of an array of numbers for the cumulative probability p.
 * @param data data set
 * @param p cumulative probability
 * @returns {number}
 * @example
 * @see {@link https://en.wikipedia.org/wiki/Quantile Wikipedia: Quantile}
 */
export const quantile = (

  data: Array<number>,
  p: number,

): number => {

	const n: number = data.length;

	if (n == 0 || !n)
	{
		return 0;
	}

    const sorted = data.slice(0).sort((a, b) => (a - b));

	if (p === 0)
	{
		return data[0];
	}

    if (p === 1)
	{
		return data[n - 1];
	}
  
    // See https://en.wikipedia.org/wiki/Quantile#Estimating_quantiles_from_a_sample
    const index = n * p - 0.5;
    // Option A: (n - 1) * p        Excel Default, Python/NumPy, Google Docs, R Default
    // Option B: (n + 1) * p - 1    Excel Option, WIKI 4
    // Option C: n * p - 0.5        >> WIKI 3, Matlab, Mathematics
  
    if (Number.isInteger(index))
	{
		return sorted[index];
	}

	const floor = Math.floor(index);
    
    return lerp(sorted[floor], sorted[floor + 1], index - floor);

};
