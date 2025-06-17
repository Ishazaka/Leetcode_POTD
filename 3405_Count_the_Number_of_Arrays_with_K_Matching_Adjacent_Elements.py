class Solution:
    MOD = 10**9 + 7

    def countGoodArrays(self, n: int, m: int, k: int) -> int:
        self.precomputeFactorials(n)

        b = n - k
        c = self.nCr(n - 1, b - 1)
        ans = self.modExp(m - 1, b - 1, self.MOD)
        ans = (ans * m) % self.MOD
        ans = (ans * c) % self.MOD

        return int(ans)

    def precomputeFactorials(self, n: int):
        self.fact = [1] * (n + 1)
        self.invFact = [1] * (n + 1)

        for i in range(1, n + 1):
            self.fact[i] = (self.fact[i - 1] * i) % self.MOD

        self.invFact[n] = self.modExp(self.fact[n], self.MOD - 2, self.MOD)
        for i in range(n - 1, -1, -1):
            self.invFact[i] = (self.invFact[i + 1] * (i + 1)) % self.MOD

    def nCr(self, n: int, r: int) -> int:
        if r < 0 or r > n:
            return 0
        return (self.fact[n] * self.invFact[r] % self.MOD) * self.invFact[n - r] % self.MOD

    def modExp(self, x: int, y: int, m: int) -> int:
        res = 1
        x %= m
        while y > 0:
            if y & 1:
                res = (res * x) % m
            x = (x * x) % m
            y >>= 1
        return res
  
