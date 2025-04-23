
/**
 * @param {number} n
 * @return {number}
 */
var countLargestGroup = function(n) {
   const map = new Map();

    // Group numbers by digit sum
    for (let i = 1; i <= n; i++) {
        let sum = getDigitSum(i);
        map.set(sum, (map.get(sum) || 0) + 1);
    }

    // Find the max group size
    let maxSize = Math.max(...map.values());

    // Count how many groups have the max size
    let count = 0;
    for (let size of map.values()) {
        if (size === maxSize) count++;
    }

    return count;
};

// Helper function to compute digit sum
function getDigitSum(num) {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}
