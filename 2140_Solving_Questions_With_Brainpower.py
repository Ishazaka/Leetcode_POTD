
class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        n = len(questions)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            points, brainpower = questions[i]
            next_index = i + brainpower + 1
            take = points + (dp[next_index] if next_index < n else 0)
            not_take = dp[i + 1]
            dp[i] = max(take, not_take)

        return dp[0]
