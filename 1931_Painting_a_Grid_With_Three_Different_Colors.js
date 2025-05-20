
const MOD = 1e9 + 7;

function colorTheGrid(m, n) {
    const colors = [0, 1, 2]; // Red, Green, Blue
    const validStates = [];

    // Generate all valid colorings for one column
    function generateStates(pos, prevColor, state) {
        if (pos === m) {
            validStates.push(state.slice());
            return;
        }

        for (const color of colors) {
            if (color !== prevColor) {
                state.push(color);
                generateStates(pos + 1, color, state);
                state.pop();
            }
        }
    }

    generateStates(0, -1, []);

    // Convert a state to a string key
    function stateKey(state) {
        return state.join(',');
    }

    // Precompute transitions
    const transitions = new Map();
    for (const state1 of validStates) {
        const key1 = stateKey(state1);
        transitions.set(key1, []);
        for (const state2 of validStates) {
            let valid = true;
            for (let i = 0; i < m; i++) {
                if (state1[i] === state2[i]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                transitions.get(key1).push(stateKey(state2));
            }
        }
    }

    // DP
    let dp = new Map();
    for (const state of validStates) {
        dp.set(stateKey(state), 1);
    }

    for (let col = 1; col < n; col++) {
        const newDp = new Map();
        for (const [state, count] of dp.entries()) {
            for (const next of transitions.get(state)) {
                newDp.set(next, (newDp.get(next) || 0) + count);
                newDp.set(next, newDp.get(next) % MOD);
            }
        }
        dp = newDp;
    }

    let result = 0;
    for (const count of dp.values()) {
        result = (result + count) % MOD;
    }

    return result;
}
