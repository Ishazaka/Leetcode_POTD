class Solution:
    def __init__(self):
        self.parent = list(range(26))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union_find(self, x, y):
        pX = self.find(x)
        pY = self.find(y)
        if pX == pY:
            return
        if pX < pY:
            self.parent[pY] = pX
        else:
            self.parent[pX] = pY

    def smallestEquivalentString(self, s1: str, s2: str, baseStr: str) -> str:
        for i in range(len(s1)):
            self.union_find(ord(s1[i]) - ord('a'), ord(s2[i]) - ord('a'))

        result = ''
        for c in baseStr:
            smallest_char_index = self.find(ord(c) - ord('a'))
            result += chr(smallest_char_index + ord('a'))

        return result
