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
 * Median
 * @static
 * @memberof
 * @class
 * @description Compute the median of the supplied data set.
 * @param data data set
 * @returns {number}
 * @example
 * @see {@link https://en.wikipedia.org/wiki/Median Wikipedia: Median}
 */
export const median = (

    data: Array<number>,

): number => {

    let median: number;

    const n: number = data.length;

	if (n == 0 || !n)
    {
        return 0;
    }

    const tmp: Array<number> = data.slice();

    // sort in ascending order
    tmp.sort( function(a, b){return a - b} );

    let m: number;

    // if n is even, then
    if ((n & 1) == 0)
    {
        m = n / 2 - 1;
        median = 0.5 * (tmp[m] + tmp[m + 1]);
    }
    else
    {
        m = (n + 1) / 2 - 1;
        median = tmp[m];
    }

    return median;

};


/** Calculates the median of an array of numbers. */
// export function median(values: number[]) {
//     return quantile(values, 0.5);
//   }