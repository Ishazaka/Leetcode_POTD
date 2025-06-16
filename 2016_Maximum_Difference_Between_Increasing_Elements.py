
class Solution:
    def maximumDifference(self, nums):
        n = len(nums)
        maxi = nums[-1]
        maxDiff = float('-inf')

        for i in range(n - 2, -1, -1):
            if nums[i] != maxi:
                maxDiff = max(maxDiff, maxi - nums[i])
            maxi = max(maxi, nums[i])

        return -1 if maxDiff < 0 else maxDiff
       
