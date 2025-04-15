class FenwickTree {
    constructor(size) {
        this.tree = Array(size + 1).fill(0);
    }

    update(index, delta) {
        index += 1;
        while (index < this.tree.length) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    query(index) {
        index += 1;
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }

    queryRange(start, end) {
        return this.query(end) - this.query(start - 1);
    }
}

var goodTriplets = function(nums1, nums2) {
    const n = nums1.length;

    // Map values in nums2 to their indices
    const posInNums2 = Array(n);
    for (let i = 0; i < n; i++) {
        posInNums2[nums2[i]] = i;
    }

    // Transform nums1 to their positions in nums2
    const transformed = nums1.map(v => posInNums2[v]);

    // Count smaller values to the left of each index using Fenwick Tree
    const leftTree = new FenwickTree(n);
    const smallerLeft = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        smallerLeft[i] = leftTree.query(transformed[i] - 1);
        leftTree.update(transformed[i], 1);
    }

    // Count greater values to the right of each index using Fenwick Tree
    const rightTree = new FenwickTree(n);
    const greaterRight = Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        greaterRight[i] = rightTree.queryRange(transformed[i] + 1, n - 1);
        rightTree.update(transformed[i], 1);
    }

    // Total good triplets
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += smallerLeft[i] * greaterRight[i];
    }

    return total;
};
