
/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function(arr) {
    let freq = new Map();
    let lucky = -1;

    // Count the frequency of each number
    for (let num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Find the largest lucky number
    for (let [num, count] of freq.entries()) {
        if (num === count) {
            lucky = Math.max(lucky, num);
        }
    }

    return lucky;
};
