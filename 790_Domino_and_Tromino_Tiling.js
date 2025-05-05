/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function(n) {
    const mod = 1e9 + 7;

    // dp[i] stores the ways to fully tile a 2 x i board
    let dp = Array(n + 3).fill(0);

    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = (2 * dp[i - 1] + dp[i - 3]) % mod;
    }

    return dp[n];
};
