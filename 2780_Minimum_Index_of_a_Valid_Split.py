
// solution 1
class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        freq = Counter(nums)
        maxElem = max(freq, key=freq.get)
        maxFreq = freq[maxElem]

        cnt = 0
        for i, num in enumerate(nums):
            if num == maxElem:
                cnt += 1
            remainingCnt = maxFreq - cnt
            if cnt * 2 > (i + 1) and remainingCnt * 2 > (len(nums) - i - 1):
                return i
        return -1
