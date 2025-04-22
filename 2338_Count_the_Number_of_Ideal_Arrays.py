
MOD = 10**9 + 7

class Solution:
    def idealArrays(self, n: int, maxValue: int) -> int:
        # Precompute factorials and inverse factorials
        N = n + 100
        factorial = [1] * N
        inv_fact = [1] * N
        for i in range(1, N):
            factorial[i] = factorial[i-1] * i % MOD

        inv_fact[-1] = pow(factorial[-1], MOD-2, MOD)
        for i in range(N-2, -1, -1):
            inv_fact[i] = inv_fact[i+1] * (i+1) % MOD

        def comb_mod(n, k):
            if k > n or k < 0:
                return 0
            return factorial[n] * inv_fact[k] % MOD * inv_fact[n-k] % MOD

        # Precompute number of multiplicative chains ending in value
        from collections import defaultdict

        max_len = 14  # Since comb(n-1, k-1) becomes 0 after this
        dp = [defaultdict(int) for _ in range(max_len+1)]
        for i in range(1, maxValue+1):
            dp[1][i] = 1

        for l in range(2, max_len+1):
            for i in range(1, maxValue+1):
                for j in range(i*2, maxValue+1, i):
                    dp[l][j] = (dp[l][j] + dp[l-1][i]) % MOD

        res = 0
        for length in range(1, max_len+1):
            total = 0
            for val in dp[length]:
                total = (total + dp[length][val]) % MOD
            res = (res + total * comb_mod(n-1, length-1)) % MOD

        return res
