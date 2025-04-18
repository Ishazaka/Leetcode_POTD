/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if (n === 1) return "1";

    let result = "1";

    for (let i = 2; i <= n; i++) {
        let current = "";
        let count = 1;

        for (let j = 1; j < result.length; j++) {
            if (result[j] === result[j - 1]) {
                count++;
            } else {
                current += count.toString() + result[j - 1];
                count = 1;
            }
        }

        current += count.toString() + result[result.length - 1]; // append the last group
        result = current;
    }

    return result;
};
