

class Solution:
    def maximumTripletValue(self, nums: List[int]) -> int:
        n = len(nums)
        max_before = [0] * n
        max_after = [0] * n

        max_before[0] = nums[0]
        for i in range(1, n):
            max_before[i] = max(max_before[i - 1], nums[i])

        max_after[n - 1] = nums[n - 1]
        for k in range(n - 2, -1, -1):
            max_after[k] = max(max_after[k + 1], nums[k])

        max_value = 0
        for j in range(1, n - 1):
            value = (max_before[j - 1] - nums[j]) * max_after[j + 1]
            max_value = max(max_value, value)

        return max_value
