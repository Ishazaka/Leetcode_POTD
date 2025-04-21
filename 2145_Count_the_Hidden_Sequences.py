
class Solution:
    def numberOfArrays(self, differences: List[int], lower: int, upper: int) -> int:
        curr = 0
        min_val = 0
        max_val = 0
        
        for diff in differences:
            curr += diff
            min_val = min(min_val, curr)
            max_val = max(max_val, curr)
        
        # max - min gives the total spread. We need that to fit within [lower, upper]
        total_range = upper - lower
        
        if max_val - min_val > total_range:
            return 0
        
        return total_range - (max_val - min_val) + 1
