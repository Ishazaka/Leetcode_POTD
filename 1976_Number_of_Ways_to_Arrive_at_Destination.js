/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var countPaths = function(n, roads) {
    const MOD = 1e9 + 7;

    // Create adjacency list
    const graph = Array.from({ length: n }, () => []);
    for (const [u, v, w] of roads) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }

    const dist = Array(n).fill(Infinity);
    const ways = Array(n).fill(0);
    dist[0] = 0;
    ways[0] = 1;

    // Min-heap priority queue using a simple array (can be optimized)
    const pq = [[0, 0]]; // [distance, node]

    while (pq.length > 0) {
        // Extract the smallest distance node
        pq.sort((a, b) => a[0] - b[0]); // sort by distance
        const [currDist, u] = pq.shift();

        if (currDist > dist[u]) continue;

        for (const [v, w] of graph[u]) {
            const newDist = currDist + w;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                ways[v] = ways[u];
                pq.push([newDist, v]);
            } else if (newDist === dist[v]) {
                ways[v] = (ways[v] + ways[u]) % MOD;
            }
        }
    }

    return ways[n - 1];
};
