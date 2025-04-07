
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total_sum = sum(nums)
        
        # If the sum is odd, we can't divide it into two equal subsets
        if total_sum % 2 != 0:
            return False
        
        target = total_sum // 2
        n = len(nums)
        
        # dp[i] means whether a subset sum i can be achieved
        dp = [False] * (target + 1)
        dp[0] = True  # We can always make sum 0 with an empty subset
        
        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]
        
        return dp[target]
  
