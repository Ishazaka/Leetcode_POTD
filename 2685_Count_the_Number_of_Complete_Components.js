
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countCompleteComponents = function(n, edges) {
    const graph = Array.from({ length: n }, () => []);
    
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Array(n).fill(false);
    let ans = 0;

    const dfs = (u, component) => {
        visited[u] = true;
        component.nodes++;
        component.degreeSum += graph[u].length;

        for (const v of graph[u]) {
            if (!visited[v]) {
                dfs(v, component);
            }
        }
    };

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;

        const component = { nodes: 0, degreeSum: 0 };
        dfs(i, component);

        if (component.degreeSum === component.nodes * (component.nodes - 1)) {
            ans++;
        }
    }

    return ans;
};
