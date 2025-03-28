import heapq
from typing import List, Tuple

class Solution:
    def isValid(self, x: int, y: int, m: int, n: int) -> bool:
        return 0 <= x < m and 0 <= y < n

    def maxPoints(self, grid: List[List[int]], queries: List[int]) -> List[int]:
        sorted_queries = sorted(set(queries))  # We need to only solve for unique queries
        query_count = {}
        minheap = []
        m, n = len(grid), len(grid[0])
        visited = [[False for _ in range(n)] for _ in range(m)]

        # Apply BFS for each query incrementally
        heapq.heappush(minheap, (grid[0][0], 0, 0))
        visited[0][0] = True
        dirs = [-1, 0, 1, 0, -1]

        count = 0
        for query in sorted_queries:
            while minheap:
                val, x, y = heapq.heappop(minheap)
                if val >= query:
                    heapq.heappush(minheap, (val, x, y))
                    break
                count += 1  # Count current node

                for i in range(4):
                    newX, newY = x + dirs[i], y + dirs[i + 1]
                    if self.isValid(newX, newY, m, n) and not visited[newX][newY]:
                        visited[newX][newY] = True
                        heapq.heappush(minheap, (grid[newX][newY], newX, newY))
            query_count[query] = count

        # Build the answer
        res = [query_count[query] for query in queries]
        return res
