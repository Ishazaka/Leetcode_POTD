
class Solution:
    def minSum(self, nums1: List[int], nums2: List[int]) -> int:
        s1, z1 = 0, 0
        s2, z2 = 0, 0

        for x in nums1:
            if x == 0:
                z1 += 1
                s1 += 1  # assuming min fill with 1
            else:
                s1 += x

        for x in nums2:
            if x == 0:
                z2 += 1
                s2 += 1  # assuming min fill with 1
            else:
                s2 += x

        if (s1 > s2 and z2 == 0) or (s2 > s1 and z1 == 0):
            return -1

        return max(s1, s2)
   
