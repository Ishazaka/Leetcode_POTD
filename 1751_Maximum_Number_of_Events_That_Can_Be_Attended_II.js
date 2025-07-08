
/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */
var maxValue = function(events, k) {
    events.sort((a, b) => a[0] - b[0]); // Sort by start time
    const n = events.length;
    
    // Binary search to find the next non-overlapping event
    const findNext = (target) => {
        let left = 0, right = n;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (events[mid][0] > target) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    };

    const memo = new Map();

    const dp = (i, k) => {
        if (i === n || k === 0) return 0;
        const key = `${i},${k}`;
        if (memo.has(key)) return memo.get(key);

        // Option 1: skip the event
        let skip = dp(i + 1, k);

        // Option 2: take the event
        const next = findNext(events[i][1]);
        let take = events[i][2] + dp(next, k - 1);

        const res = Math.max(skip, take);
        memo.set(key, res);
        return res;
    };

    return dp(0, k);
};
