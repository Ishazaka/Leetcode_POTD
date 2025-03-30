
class Solution:
    def isValid(self, mp: Counter, temp: Counter) -> bool:
        for c, freq in temp.items():
            if freq != mp[c]:
                return False
        return True

    def partitionLabels(self, s: str) -> List[int]:
        mp = Counter(s)
        temp = Counter()
        ans = []
        prev = 0

        for i, char in enumerate(s):
            temp[char] += 1
            if self.isValid(mp, temp):
                if not ans:
                    ans.append(i + 1)
                else:
                    ans.append(i - prev)
                prev = i

        return ans    
