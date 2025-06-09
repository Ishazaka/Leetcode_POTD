
class Solution:
    def countSteps(self, n, prefix1, prefix2):
        steps = 0
        while prefix1 <= n:
            steps += min(n + 1, prefix2) - prefix1  # N+1 to include Nth value in range
            prefix1 *= 10  # Next level
            prefix2 *= 10  # Next level
        return steps

    def findKthNumber(self, n, k):
        curr = 1  # Current number
        k -= 1    # Skip the number you are already present at

        while k:
            steps = self.countSteps(n, curr, curr + 1)
            if steps <= k:
                curr += 1
                k -= steps
            else:
                curr *= 10
                k -= 1  # Current element has to be counted out
        return curr
      
