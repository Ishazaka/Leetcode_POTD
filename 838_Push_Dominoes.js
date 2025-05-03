
var pushDominoes = function(dominoes) {
    const n = dominoes.length;
    const forces = Array(n).fill(0);

    // Scan from left to right, marking forces moving right
    let force = 0;
    for (let i = 0; i < n; i++) {
        if (dominoes[i] === 'R') force = n;
        else if (dominoes[i] === 'L') force = 0;
        else force = Math.max(force - 1, 0);
        forces[i] += force;
    }

    // Scan from right to left, marking forces moving left
    force = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (dominoes[i] === 'L') force = n;
        else if (dominoes[i] === 'R') force = 0;
        else force = Math.max(force - 1, 0);
        forces[i] -= force;
    }

    // Generate final states
    let result = '';
    for (let f of forces) {
        if (f > 0) result += 'R';
        else if (f < 0) result += 'L';
        else result += '.';
    }

    return result;
};
