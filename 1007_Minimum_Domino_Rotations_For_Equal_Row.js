

var minDominoRotations = function(tops, bottoms) {
    const rotations = (target, A, B) => {
        let count = 0;
        for (let i = 0; i < A.length; i++) {
            if (A[i] !== target && B[i] !== target) return Infinity;
            else if (A[i] !== target) count++;
        }
        return count;
    };

    const result = Math.min(
        rotations(tops[0], tops, bottoms), // make all tops match tops[0]
        rotations(bottoms[0], tops, bottoms), // make all tops match bottoms[0]
        rotations(tops[0], bottoms, tops), // make all bottoms match tops[0]
        rotations(bottoms[0], bottoms, tops) // make all bottoms match bottoms[0]
    );

    return result === Infinity ? -1 : result;
};
