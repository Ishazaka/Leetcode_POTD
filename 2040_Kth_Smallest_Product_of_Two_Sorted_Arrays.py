from typing import List

class Solution:
    def kthSmallestProduct(self, nums1: List[int], nums2: List[int], k: int) -> int:
        if len(nums1) > len(nums2):
            return self.kthSmallestProduct(nums2, nums1, k)
        
        left, right = -10**10, 10**10
        while left < right:
            mid = (left + right) // 2
            count = self.countSmallerOrEqual(mid, nums1, nums2)
            if count < k:
                left = mid + 1
            else:
                right = mid
        return left

    def countSmallerOrEqual(self, mid: int, nums1: List[int], nums2: List[int]) -> int:
        ret = 0
        
        if mid >= 0:
            j0 = len(nums2) - 1
            j1 = len(nums2) - 1
            
            for num in nums1:
                if num > 0:
                    while j0 >= 0 and num * nums2[j0] > mid:
                        j0 -= 1
                    ret += j0 + 1
                elif num == 0:
                    ret += len(nums2)
                else:
                    while j1 >= 0 and num * nums2[j1] <= mid:
                        j1 -= 1
                    ret += len(nums2) - 1 - j1
        else:
            j0 = 0
            j1 = 0
            
            for num in nums1:
                if num > 0:
                    while j0 < len(nums2) and num * nums2[j0] <= mid:
                        j0 += 1
                    ret += j0
                elif num == 0:
                    ret += 0
                else:
                    while j1 < len(nums2) and num * nums2[j1] > mid:
                        j1 += 1
                    ret += len(nums2) - j1

        return ret
