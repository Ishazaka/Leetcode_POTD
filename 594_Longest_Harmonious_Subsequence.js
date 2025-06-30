/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function(nums) {
    nums.sort((a, b) => a - b);
    let left = 0, right = 1;
    let result = 0;

    while (right < nums.length) {
        const diff = nums[right] - nums[left];
        
        if (diff === 1) {
            result = Math.max(result, right - left + 1);
        }

        if (diff <= 1) {
            right++;
        } else {
            left++;
        }
    }

    return result;
};
