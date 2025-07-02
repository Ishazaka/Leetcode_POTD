
/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
const md = BigInt(1e9 + 7);

function possibleStringCount(word, k) {
    const n = word.length;
    let cnt = 1;
    let total = 1n;
    const seg = [];

    for (let i = 1; i < n; i++) {
        if (word[i] === word[i - 1]) {
            cnt++;
        } else {
            total = (total * BigInt(cnt)) % md;
            seg.push(cnt - 1);
            cnt = 1;
        }
    }

    // Add the last segment
    total = (total * BigInt(cnt)) % md;
    seg.push(cnt - 1);

    let mnlen = seg.length;
    if (k <= mnlen) return Number(total);

    k -= mnlen;

    const dp = new Array(k).fill(0n);
    dp[0] = 1n;

    for (const x of seg) {
        const pref = new Array(k).fill(0n);
        pref[0] = dp[0];
        for (let i = 1; i < k; i++) {
            pref[i] = (pref[i - 1] + dp[i]) % md;
        }

        for (let i = 0; i < k; i++) {
            if (i - x - 1 >= 0) {
                dp[i] = (pref[i] - pref[i - x - 1] + md) % md;
            } else {
                dp[i] = pref[i];
            }
        }
    }

    let invalid = 0n;
    for (const x of dp) {
        invalid = (invalid + x) % md;
    }

    return Number((total - invalid + md) % md);
}
