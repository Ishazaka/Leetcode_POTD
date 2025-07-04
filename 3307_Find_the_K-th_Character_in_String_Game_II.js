
/**
 * @param {number} k
 * @param {number[]} operations
 * @return {character}
 */
var kthCharacter = function(k, operations) {
    // Base case: if k is 1, return 'a'
    if (k === 1) {
        return 'a';
    }

    const n = operations.length;
    let opType = 0;
    let len = 1;
    let newK = k;

    // Find which operation applies to the k-th character
    for (let i = 0; i < n; i++) {
        len *= 2;
        if (len >= k) {
            opType = operations[i];
            newK = k - len / 2;
            break;
        }
    }

    // Recursive call to get the previous character before transformation
    const res = kthCharacter(newK, operations);

    if (opType === 0) {
        return res;
    }

    // If opType is 1, transform the character
    if (res === 'z') {
        return 'a';
    }

    return String.fromCharCode(res.charCodeAt(0) + 1);
};
