from collections import deque

class Solution:
    def ifexists(self, s: str, p: str, k: int) -> bool:
        str_k = p * k
        j = 0
        for char in s:
            if char == str_k[j]:
                j += 1
                if j == len(str_k):
                    return True
        return j == len(str_k)

    def longestSubsequenceRepeatedK(self, s: str, k: int) -> str:
        freq = [0] * 26
        for c in s:
            freq[ord(c) - ord('a')] += 1

        for i in range(26):
            if freq[i] < k:
                freq[i] = 0
            else:
                freq[i] //= k

        q = deque([""])
        ans = ""

        while q:
            str_curr = q.popleft()
            n_freq = freq[:]
            for x in str_curr:
                n_freq[ord(x) - ord('a')] -= 1

            for i in range(25, -1, -1):
                if n_freq[i] == 0:
                    continue
                c = chr(i + ord('a'))
                temp = str_curr + c
                if self.ifexists(s, temp, k):
                    q.append(temp)
                    if len(temp) > len(ans):
                        ans = temp

        return ans
  
