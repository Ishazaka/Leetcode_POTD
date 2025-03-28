class Solution:
    def minOperations(self, grid: List[List[int]], x: int) -> int:
        elements = [cell for row in grid for cell in row]
        elements.sort()
        selected_element = elements[(len(elements) - 1) // 2]
        remainder = selected_element % x
        cnt = 0
        for it in elements:
            if (it % x) != remainder:
                return -1
            cnt += abs(selected_element - it) // x
        return cnt
