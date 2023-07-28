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



// /**
//  * Mode
//  * @static
//  * @memberof
//  * @class
//  * @description Compute the mode of the supplied data set.
//  * @param data dataset
//  * @returns {number}
//  * @example
//  * @see {@link https://en.wikipedia.org/wiki/Mode_(statistics) Wikipedia: Mode}
//  */
// export const mode = (

//     data: Array<number>,

// ): number => {

//     let mode: number = 0;

//     const n: number = data.length;

// 	if (n == 0 || !n)
//     {
//         return 0;
//     }

//     const hash: Object = {};
//     let x: string = "";
//     let i: number;
    
//     for (i = 0; i < n; ++i)
//     {
//         x = data[i].toString();

//         if (hash.hasOwnProperty(x) )
//             hash[x]++;
//         else
//             hash[x] = 1;
//     }

//     let count: number = -1;
//     let value: string;

//     for (value in hash)
//     {
//         if (hash[value] > count)
//         {
//             count = hash[value];
//             mode = parseInt(value);
//         }
//     }

//     return mode

// };


/**
 * A class to compute the mode of a given dataset.
 * The mode of a dataset is the value that appears most frequently in the dataset.
 *
 * @see {@link https://en.wikipedia.org/wiki/Mode_(statistics) Wikipedia: Mode}
 */
 export class ModeCalculator {

    /**
     * Function to calculate the mode of an array of numbers.
     * If the input array is empty or invalid, it returns 0.
     *
     * @static
     * @param {Array<number>} data - The input array of numbers for which the mode is to be calculated.
     * @returns {number} - The mode of the input array of numbers.
     *
     * @example
     * let inputArray = [1, 2, 3, 2, 5, 2];
     * let modeValue = ModeCalculator.mode(inputArray);
     * console.log(modeValue); // Outputs: 2
     */
    static mode(data: Array<number>): number {
  
      let mode: number = 0;
      const n: number = data.length;
  
      if (n === 0 || !n) {
        return 0;
      }
  
      const hash: Record<string, number> = {};
      let x: string = "";
  
      for (let i = 0; i < n; ++i) {
        x = data[i].toString();
        if (hash.hasOwnProperty(x)) {
          hash[x]++;
        } else {
          hash[x] = 1;
        }
      }
  
      let count: number = -1;
  
      for (const value in hash) {
        if (hash[value] > count) {
          count = hash[value];
          mode = parseInt(value);
        }
      }
  
      return mode;
    }
  }
  
  

/**
 * Calculates the mode of an array of numbers. Returns undefined if no mode
 * exists, i.e. there are multiple values with the same largest count.
 */
//  export function mode(values: number[]) {
//     const counts = new Map<number, number>();
  
//     let maxCount = -1;
//     let result: number|undefined = undefined;
  
//     for (const v of values) {
//       if (!counts.has(v)) {
//         counts.set(v, 1);
//       } else {
//         const newCount = counts.get(v)! + 1;
//         counts.set(v, newCount);
//         if (newCount === maxCount) {
//           result = undefined;
//         } else if (newCount > maxCount) {
//           maxCount = newCount;
//           result = v;
//         }
//       }
//     }
  
//     return result;
//   }