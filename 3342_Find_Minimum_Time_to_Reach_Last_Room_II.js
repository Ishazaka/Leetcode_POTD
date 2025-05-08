/**
 * @param {number[][]} moveTime
 * @return {number}
 */
var minTimeToReach = function(moveTime) {
    const n = moveTime.length;
    const m = moveTime[0].length;

    // [time, row, col, isOneSecondMove]
    const pq = [[0, 0, 0, true]];
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: m }, () => [Infinity, Infinity])
    );

    visited[0][0][1] = 0; // at (0,0), starting with 1-second move (true)

    const dirs = [[0,1],[1,0],[-1,0],[0,-1]];

    while (pq.length > 0) {
        // sort acts as priority queue: smallest time first
        pq.sort((a, b) => a[0] - b[0]);
        const [curTime, i, j, isOneSec] = pq.shift();

        if (i === n - 1 && j === m - 1) return curTime;

        for (const [dx, dy] of dirs) {
            const ni = i + dx;
            const nj = j + dy;
            if (ni < 0 || nj < 0 || ni >= n || nj >= m) continue;

            const moveCost = isOneSec ? 1 : 2;
            let arrivalTime = curTime + moveCost;
            if (arrivalTime < moveTime[ni][nj]) {
                // wait until moveTime[ni][nj]
                arrivalTime = moveTime[ni][nj];
            }

            const nextParity = isOneSec ? 0 : 1; // invert parity
            if (arrivalTime < visited[ni][nj][nextParity]) {
                visited[ni][nj][nextParity] = arrivalTime;
                pq.push([arrivalTime, ni, nj, !isOneSec]);
            }
        }
    }

    return -1; // should never hit
};
