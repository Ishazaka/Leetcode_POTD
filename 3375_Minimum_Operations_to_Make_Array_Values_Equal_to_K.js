/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, k) {
    if (Math.min(...nums) < k) return -1;

    const greaterThanK = new Set();
    for (let num of nums) {
        if (num > k) {
            greaterThanK.add(num);
        }
    }

    const sorted = [...greaterThanK].sort((a, b) => b - a);
    let ops = 0;

    for (let i = 0; i < sorted.length; i++) {
        const h = sorted[i];
        const greater = nums.filter(n => n > h);
        if (greater.length === 0) continue;
        const first = greater[0];
        if (greater.every(n => n === first)) {
            ops++;
            // simulate the operation (not needed for count, but helps clarify logic)
            nums = nums.map(n => n > h ? h : n);
        } else {
            return -1;
        }
    }

    return nums.every(n => n === k) ? ops : ops + 1;
};
