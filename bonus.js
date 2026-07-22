/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function (arr, k) {
  for (let num of arr) {
    if (num <= k) {
      k++;
    } else {
      break;
    }
  }
  return k;
};
