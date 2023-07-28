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
 * Harmonic Mean
 * Function to compute the harmonic mean of a given dataset.
 *
 * The harmonic mean is a kind of average which is appropriate for situations 
 * when the average of rates is desired. It is calculated by dividing the number of observations by 
 * the reciprocal of each number in the dataset. The function returns 0 for an empty or invalid dataset.
 * Small absolute values in the dataset (below 1e-9) are considered as 0 to prevent division by a number close to zero.
 *
 * @see {@link https://en.wikipedia.org/wiki/Harmonic_mean Wikipedia: Harmonic Mean}
 *
 * @param {Array<number>} data - An array of numbers for which the harmonic mean is to be computed.
 *
 * @returns {number} The harmonic mean of the input dataset. 
 * If the input dataset is empty or invalid, the function returns 0.
 *
 * @example
 * const data = [1, 2, 3];
 * const hMean = harmonicMean(data);
 * console.log(hMean); // Outputs: 1.6363636363636365
 */
 export const harmonicMean = (

    data: Array<number>,

): number => {

    const n: number = data.length;
    if (n === 0 || !n) {
        return 0;
    }

    let s: number = Math.abs(data[0]) > 0.000000001 ? 1 / data[0] : 0;
    let r: number;
    let i: number;

    for (i = 1; i < n; ++i) {
        r = Math.abs(data[i]) > 0.000000001 ? 1 / data[i] : 0;
        s += r;
    }

    return n / s;

};
