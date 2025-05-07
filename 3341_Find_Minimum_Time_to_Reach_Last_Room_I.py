
class Solution:
    def minTimeToReach(self, moveTime: List[List[int]]) -> int:
        n = len(moveTime)
        m = len(moveTime[0])

        q = [[0, 0, 0]]  # w, i, j
        dist = [[float('inf')] * m for _ in range(n)]
        dist[0][0] = 0

        while q:
            w, i, j = heapq.heappop(q)

            for di, dj in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                ni = di + i
                nj = dj + j

                if ni < 0 or nj < 0 or ni >= n or nj >= m:
                    continue

                curr = max(w, moveTime[ni][nj]) + 1

                if curr < dist[ni][nj]:
                    dist[ni][nj] = curr
                    heapq.heappush(q, [curr, ni, nj])

        return dist[n - 1][m - 1]
