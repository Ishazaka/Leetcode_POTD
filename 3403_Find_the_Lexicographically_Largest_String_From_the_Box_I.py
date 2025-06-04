
class Solution:
    def answerString(self, word: str, numFriends: int) -> str:
        if numFriends == 1:
            return word
        
        n = len(word)
        res = ""
        
        for i in range(n):
            minLen = min(n - numFriends + 1, n - i)
            res = max(res, word[i:i + minLen])
        
        return res
