function isPalindrome(s) {
    return s === s.split('').reverse().join('');
}

function generatePalindromes(freq, n) {
    const half = [];
    let mid = '';

    for (let i = 0; i < 10; i++) {
        const count = freq[i];
        if (count % 2 !== 0) {
            if (mid !== '') return [];  // more than 1 odd count not allowed
            mid = i.toString();
        }
        for (let j = 0; j < Math.floor(count / 2); j++) {
            half.push(i.toString());
        }
    }

    const results = new Set();

    const used = new Array(half.length).fill(false);
    const backtrack = (path) => {
        if (path.length === half.length) {
            const left = path.join('');
            if (left[0] === '0') return;
            const pal = left + mid + [...path].reverse().join('');
            results.add(pal);
            return;
        }

        for (let i = 0; i < half.length; i++) {
            if (used[i]) continue;
            if (i > 0 && half[i] === half[i - 1] && !used[i - 1]) continue;
            used[i] = true;
            path.push(half[i]);
            backtrack(path);
            path.pop();
            used[i] = false;
        }
    };

    half.sort();  // for deduplication
    backtrack([]);

    return [...results];
}

function factorial(n) {
    const f = [1];
    for (let i = 1; i <= n; i++) f[i] = f[i - 1] * i;
    return f;
}

function countGoodIntegers(n, k) {
    const fact = factorial(n);
    let total = 0;

    function dfs(pos, remaining, freq) {
        if (pos === 10) {
            if (remaining !== 0) return;

            const palindromes = generatePalindromes(freq, n);
            for (let pal of palindromes) {
                if (parseInt(pal) % k === 0) {
                    // Count permutations for this freq
                    let perm = fact[n];
                    for (let f of freq) perm /= fact[f];
                    if (freq[0] > 0) {
                        // remove leading zero perms
                        freq[0]--;
                        let bad = fact[n - 1];
                        for (let f of freq) bad /= fact[f];
                        perm -= bad;
                        freq[0]++;
                    }
                    total += perm;
                    break;
                }
            }
            return;
        }

        for (let i = 0; i <= remaining; i++) {
            freq[pos] = i;
            dfs(pos + 1, remaining - i, freq);
            freq[pos] = 0;
        }
    }

    dfs(0, n, Array(10).fill(0));
    return total;
}

