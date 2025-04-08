/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function(nums) {
    let operations = 0;

    while (new Set(nums).size !== nums.length) {
   
        nums.splice(0, 3);
        operations++;
    }

    return operations;
};
