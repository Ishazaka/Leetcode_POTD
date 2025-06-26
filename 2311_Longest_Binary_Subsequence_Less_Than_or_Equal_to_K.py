class Solution:
    def longestSubsequence(self, s: str, k: int) -> int:
        n = len(s)
        # Step-1: Keep all set bits until value exceeds k
        val = 0
        i = 0
        while i < min(n, 32):
            if s[n - i - 1] == '1':
                power = 2 ** i
                if val + power > k:
                    break
                val += power
            i += 1
        # Step-2: Count the removed bits
        removed_count = 0
        while i < n:
            if s[n - i - 1] == '1':
                removed_count += 1
            i += 1
        return n - removed_count       
