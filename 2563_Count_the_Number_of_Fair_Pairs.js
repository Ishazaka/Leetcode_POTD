
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countFairPairs = function(nums, lower, upper) {
    nums.sort((a, b) => a - b);
    let cnt = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        const num = nums[i];
        const minVal = lower - num;
        const maxVal = upper - num;

        const l = lowerBound(nums, i + 1, n, minVal);
        const u = upperBound(nums, i + 1, n, maxVal);
        cnt += (u - l);
    }

    return cnt;
};

function lowerBound(arr, start, end, target) {
    let low = start, high = end;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}

function upperBound(arr, start, end, target) {
    let low = start, high = end;
    while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] <= target) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return low;
}
