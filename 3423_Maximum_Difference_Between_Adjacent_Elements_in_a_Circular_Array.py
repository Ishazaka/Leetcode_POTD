class Solution:
    def maxAdjacentDistance(self, nums):
        n = len(nums)
        maxDiff = float('-inf')
        
        for i in range(1, n):
            maxDiff = max(maxDiff, abs(nums[i] - nums[i - 1]))
        
        maxDiff = max(maxDiff, abs(nums[0] - nums[n - 1]))
        
        return maxDiff
