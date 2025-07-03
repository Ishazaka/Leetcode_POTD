
/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function(k) {
    let word = "a";

    while (word.length < k) {
        let next = "";
        for (let i = 0; i < word.length; i++) {
            let c = word[i];
            let nextChar = String.fromCharCode((c.charCodeAt(0) - 97 + 1) % 26 + 97);
            next += nextChar;
        }
        word += next;
    }

    return word[k - 1];
};
