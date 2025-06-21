class Solution:
    def minimumDeletions(self, word: str, k: int) -> int:
        from collections import Counter

        freq = Counter(word)
        n = len(word)
        ans = n

        for _, f1 in freq.items():
            deletions = 0
            for _, f2 in freq.items():
                if f1 > f2:
                    deletions += f2
                elif f2 - f1 > k:
                    deletions += (f2 - f1 - k)
            ans = min(ans, deletions)

        return ans
