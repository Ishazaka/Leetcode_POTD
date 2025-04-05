class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        self.total = 0

        def recur(idx: int, XOR: int):
            if idx >= len(nums):
                self.total += XOR
                return
            recur(idx + 1, XOR)               
            recur(idx + 1, XOR ^ nums[idx])  

        recur(0, 0)
        return self.total
