
const MOD = 1000000007n;
const SIZE = 26;

/**
 * @param {string} s
 * @param {number} t
 * @param {number[]} nums
 * @return {number}
 */
var lengthAfterTransformations = function(s, t, nums) {
    // Convert nums to transformation matrix
    const buildMatrix = () => {
        const mat = Array.from({ length: SIZE }, () => Array(SIZE).fill(0n));
        for (let i = 0; i < SIZE; i++) {
            const steps = nums[i];
            for (let j = 1; j <= steps; j++) {
                const to = (i + j) % SIZE;
                mat[i][to] = (mat[i][to] + 1n) % MOD;
            }
        }
        return mat;
    };

    const multiply = (a, b) => {
        const res = Array.from({ length: SIZE }, () => Array(SIZE).fill(0n));
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                for (let k = 0; k < SIZE; k++) {
                    res[i][j] = (res[i][j] + a[i][k] * b[k][j]) % MOD;
                }
            }
        }
        return res;
    };

    const power = (mat, exp) => {
        let result = Array.from({ length: SIZE }, (_, i) =>
            Array.from({ length: SIZE }, (_, j) => (i === j ? 1n : 0n))
        );
        while (exp > 0) {
            if (exp % 2n === 1n) result = multiply(result, mat);
            mat = multiply(mat, mat);
            exp = exp / 2n;
        }
        return result;
    };

    const applyMatrixToVector = (mat, vec) => {
        const res = Array(SIZE).fill(0n);
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                res[i] = (res[i] + mat[i][j] * vec[j]) % MOD;
            }
        }
        return res;
    };

    // Step 1: build transformation matrix
    const matrix = buildMatrix();

    // Step 2: exponentiate it to t
    const expMatrix = power(matrix, BigInt(t));

    // Step 3: apply result to base vector [1n, 1n, ..., 1n]
    const baseVector = Array(SIZE).fill(1n);
    const finalVector = applyMatrixToVector(expMatrix, baseVector);

    // Step 4: sum for input string
    let total = 0n;
    for (const ch of s) {
        const index = ch.charCodeAt(0) - 97;
        total = (total + finalVector[index]) % MOD;
    }

    return Number(total);
};
