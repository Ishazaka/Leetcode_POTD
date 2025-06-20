class Solution:
    def maxDistance(self, s: str, k: int) -> int:
        from collections import defaultdict

        freq = defaultdict(int)
        max_dist = 0

        for c in s:
            freq[c] += 1

            vertical = abs(freq['N'] - freq['S'])
            horizontal = abs(freq['E'] - freq['W'])
            curr_dist = vertical + horizontal

            north_south_changes = min(k, freq['E'], freq['W'])
            remaining_k = k - north_south_changes
            east_west_changes = min(remaining_k, min(freq['N'], freq['S']))

            max_dist = max(max_dist, curr_dist + 2 * (north_south_changes + east_west_changes))

        return max_dist
