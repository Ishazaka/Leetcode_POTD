
class Solution:
    def maxDiff(self, num: int) -> int:
        s = str(num)
        
        # For max: Replace first digit that's not '9' with '9'
        for c in s:
            if c != '9':
                max_str = s.replace(c, '9')
                break
        else:
            max_str = s  # All digits are 9
        
        # For min:
        if s[0] != '1':
            # Replace first digit with '1' (to avoid leading zero)
            min_str = s.replace(s[0], '1')
        else:
            # Find first digit (after first) that is not 0 or 1
            found = False
            for c in s[1:]:
                if c != '0' and c != '1':
                    min_str = s.replace(c, '0')
                    found = True
                    break
            if not found:
                min_str = s

        return int(max_str) - int(min_str)
