class Solution {
public:
    long long maximumTripletValue(vector<int>& nums) {
        long long A = 0, diff = 0, triplet = 0;

        for (int num : nums) {
            triplet = max(triplet, diff * num);

            diff = max(diff, A - num);

            A = max(A, (long long)num);
        }

        return triplet;
    }
};
