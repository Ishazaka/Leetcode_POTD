
from typing import List

class Solution:
    def putMarbles(self, weights: List[int], k: int) -> int:
        if k == 1:
            return 0  # No cuts = no difference

        pair_sums = []

        for i in range(len(weights) - 1):
            pair_sums.append(weights[i] + weights[i + 1])

        pair_sums.sort()

        return sum(pair_sums[-(k - 1):]) - sum(pair_sums[:k - 1])
