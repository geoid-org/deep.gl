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
 * Arithmic Mean
 * 
 * Function to calculate the arithmetic mean (average) of a given dataset.
 *
 * @description - The arithmetic mean, commonly known as the average, is calculated by summing all 
 * the numbers in the dataset and dividing by the count of numbers. 
 * If the dataset is empty or invalid, the function returns 0.
 *
 * @see {@link https://en.wikipedia.org/wiki/Arithmetic_mean Wikipedia: Arithmetic Mean}
 *
 * @param {Array<number>} data - An array of numbers for which the arithmetic mean is to be calculated.
 *
 * @returns {number} The arithmetic mean of the input dataset. 
 * If the input dataset is empty or invalid, the function returns 0.
 *
 * @example
 * const data = [1, 2, 3, 4, 5];
 * const mean = arithmicMean(data);
 * console.log(mean); // Outputs: 3
 */
 export const arithmicMean = (

    data: Array<number>,

): number => {

    const n: number = data.length;

    if (n === 0 || !n) {
        return 0;
    }

    const sum = data.reduce((a, b) => a + b, 0);

    const m: number = sum / n;

    return m;

};
