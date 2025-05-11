MOD = 1_000_000_007
MAX_SIZE = 41

factorials = [1] * MAX_SIZE
inverse_factorials = [1] * MAX_SIZE

def initialize_factorials():
    for i in range(1, MAX_SIZE):
        factorials[i] = factorials[i - 1] * i % MOD

def modular_pow(base, exponent):
    result = 1
    while exponent > 0:
        if exponent % 2 == 1:
            result = result * base % MOD
        base = base * base % MOD
        exponent //= 2
    return result

def initialize_inverse_factorials():
    inverse_factorials[MAX_SIZE - 1] = modular_pow(factorials[MAX_SIZE - 1], MOD - 2)
    for i in range(MAX_SIZE - 1, 0, -1):
        inverse_factorials[i - 1] = inverse_factorials[i] * i % MOD

initialize_factorials()
initialize_inverse_factorials()

class Solution:
    def countBalancedPermutations(self, num: str) -> int:
        digit_counts = self.calculate_digit_counts(num)
        total_sum = self.calculate_total_sum(num)

        if total_sum % 2 != 0:
            return 0

        for i in range(1, 10):
            digit_counts[i] += digit_counts[i - 1]

        length = len(num)
        half_length = length // 2

        memo = [[[-1] * (total_sum // 2 + 1) for _ in range(half_length + 1)] for _ in range(10)]

        return (factorials[half_length] * factorials[length - half_length] % MOD *
                self.recursive_balance(9, half_length, total_sum // 2, digit_counts, memo) % MOD)

    def calculate_digit_counts(self, num):
        counts = [0] * 10
        for c in num:
            counts[int(c)] += 1
        return counts

    def calculate_total_sum(self, num):
        return sum(int(c) for c in num)

    def recursive_balance(self, digit, remaining_left, remaining_sum, digit_counts, memo):
        if digit < 0:
            return 1 if remaining_sum == 0 else 0

        if memo[digit][remaining_left][remaining_sum] != -1:
            return memo[digit][remaining_left][remaining_sum]

        result = 0
        current_count = digit_counts[digit] - (digit_counts[digit - 1] if digit > 0 else 0)
        remaining_right = digit_counts[digit] - remaining_left

        min_k = max(current_count - remaining_right, 0)
        max_k = min(current_count, remaining_left)

        for k in range(min_k, max_k + 1):
            if k * digit > remaining_sum:
                continue

            sub_result = self.recursive_balance(digit - 1,
                                                remaining_left - k,
                                                remaining_sum - k * digit,
                                                digit_counts,
                                                memo)
            result = (result + sub_result * inverse_factorials[k] % MOD *
                      inverse_factorials[current_count - k]) % MOD

        memo[digit][remaining_left][remaining_sum] = result
        return result
