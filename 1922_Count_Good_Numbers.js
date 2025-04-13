var countGoodNumbers = function(n) {
    const MOD = 1_000_000_007n;
    
    const modPow = (base, exp) => {
        let result = 1n;
        base = BigInt(base);
        exp = BigInt(exp);
        
        while (exp > 0n) {
            if (exp % 2n === 1n) {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp = exp / 2n;
        }
        
        return result;
    };

    const evenCount = Math.ceil(n / 2);
    const oddCount = Math.floor(n / 2);
    
    return Number((modPow(5, evenCount) * modPow(4, oddCount)) % MOD);
};
