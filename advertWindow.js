const ad = require('./build/Release/advertWindow');
const moment = require('moment');

// JS version
function matchingAdvertIdAndWithinTimeWindow(source, ipHouseId, scheduleTime, minutesEitherSideOfNow) {
    const now = moment().utc();
    const minutesEitherSideOfNowInSeconds = minutesEitherSideOfNow * 60;
    const parsedTime = moment(scheduleTime, moment.ISO_8601);
    const timeDiff = Math.abs(parsedTime.diff(now, 'seconds'));
    return source === ipHouseId && timeDiff <= minutesEitherSideOfNowInSeconds;
};


console.time('c++: ');
for (i = 0; i < 1000; i ++) {
    ad.checkWindow("foo", "foo", "2017-07-28T12:56:12Z", 9);
}
console.timeEnd('c++: ');

console.time('JS: ');
for (i = 0; i < 1000; i ++) {
    matchingAdvertIdAndWithinTimeWindow("foo", "foo", "2017-07-28T12:56:12Z", 9);
}
console.timeEnd('JS: ');

module.exports = ad;