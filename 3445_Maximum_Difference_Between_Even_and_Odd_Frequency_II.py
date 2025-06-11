class Solution:
    def maxDifference(self, s: str, k: int) -> int:
        def getStatus(cnt_a, cnt_b):
            return ((cnt_a % 2) << 1) | (cnt_b % 2)

        n = len(s)
        ans = float('-inf')

        for a in map(str, range(5)):
            for b in map(str, range(5)):
                if a == b:
                    continue

                best = [float('inf')] * 4

                cnt_a = cnt_b = 0
                prev_a = prev_b = 0
                left = -1

                for right in range(n):
                    cnt_a += s[right] == a
                    cnt_b += s[right] == b

                    while right - left >= k and cnt_b - prev_b >= 2:
                        left_status = getStatus(prev_a, prev_b)
                        best[left_status] = min(best[left_status], prev_a - prev_b)

                        left += 1
                        prev_a += s[left] == a
                        prev_b += s[left] == b

                    right_status = getStatus(cnt_a, cnt_b)
                    target_status = right_status ^ 0b10

                    if best[target_status] != float('inf'):
                        ans = max(ans, (cnt_a - cnt_b) - best[target_status])

        return -1 if ans == float('-inf') else ans
