var countGood = function(nums, k) {
    let left = 0;
    let res = 0;
    let countMap = new Map();
    let pairCount = 0;

    for (let right = 0; right < nums.length; right++) {
        let num = nums[right];
        let count = countMap.get(num) || 0;
        pairCount += count; // adding all pairs (i, right) where i < right and nums[i] == nums[right]
        countMap.set(num, count + 1);

        while (pairCount >= k) {
            // All subarrays starting from `left` to `right` are valid
            res += nums.length - right;

            // Shrink from the left
            let leftNum = nums[left];
            let leftCount = countMap.get(leftNum);
            pairCount -= (leftCount - 1); // since we're removing one occurrence
            if (leftCount === 1) {
                countMap.delete(leftNum);
            } else {
                countMap.set(leftNum, leftCount - 1);
            }
            left++;
        }
    }

    return res;
};
