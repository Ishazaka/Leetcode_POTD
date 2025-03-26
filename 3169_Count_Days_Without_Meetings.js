
/**
 * @param {number} days
 * @param {number[][]} meetings
 * @return {number}
 */
var countDays = function(days, meetings) {

    meetings.sort((a, b) => a[0] - b[0]);

    let prevStart = 0;
    let prevEnd = 0;

    for (let i = 0; i < meetings.length; i++) {
        let currStart = meetings[i][0];
        let currEnd = meetings[i][1];
        console.log(currStart, currEnd);

        if (i === 0) {
            days -= (currEnd - currStart + 1);
            prevStart = currStart;
            prevEnd = currEnd;
            continue;
        }

        if (currStart <= prevEnd && currEnd <= prevEnd) {

            continue;
        }

        if (currStart <= prevEnd) {

            currStart = prevEnd + 1;
            days -= (currEnd - currStart + 1);
            prevEnd = currEnd;
            continue;
        }


        days -= (currEnd - currStart + 1);
        prevStart = currStart;
        prevEnd = currEnd;
    }

    return days;
};
