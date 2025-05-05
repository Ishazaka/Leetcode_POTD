/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
    const counts = {};
    let pairs = 0;

    for (let [a, b] of dominoes) {
        const key = a < b ? `${a},${b}` : `${b},${a}`;
        
        if (counts[key]) {
            pairs += counts[key];
            counts[key]++;
        } else {
            counts[key] = 1;
        }
    }

    return pairs;
};
