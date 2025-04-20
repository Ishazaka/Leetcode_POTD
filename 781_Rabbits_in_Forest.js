
/**
 * @param {number[]} answers
 * @return {number}
 */
var numRabbits = function(answers) {
    const countMap = new Map();
    let totalRabbits = 0;
    
    // Count frequency of each answer
    for (let ans of answers) {
        countMap.set(ans, (countMap.get(ans) || 0) + 1);
    }
    
    for (let [ans, count] of countMap.entries()) {
        const groupSize = ans + 1;
        const groups = Math.ceil(count / groupSize);
        totalRabbits += groups * groupSize;
    }

    return totalRabbits;
};
