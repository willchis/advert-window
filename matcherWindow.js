const matcherWindow = require('./build/Release/matcherWindow');
const moment = require('moment');

// JS version
function matchingIdWithSourceAndWithinTimeWindow(source, id, scheduleTime, minutesEitherSideOfNow) {
    const now = moment().utc();
    const minutesEitherSideOfNowInSeconds = minutesEitherSideOfNow * 60;
    const parsedTime = moment(scheduleTime, moment.ISO_8601);
    const timeDiff = Math.abs(parsedTime.diff(now, 'seconds'));
    return source === id && timeDiff <= minutesEitherSideOfNowInSeconds;
};

console.time('c++: ');
for (i = 0; i < 1000; i ++) {
    matcherWindow.checkWindow("foo", "foo", "2017-07-28T12:56:12Z", 9);
}
console.log('Rough performance guide, over 1000 iterations...');
console.timeEnd('c++: ');

console.time('JS: ');
for (i = 0; i < 1000; i ++) {
    matchingIdWithSourceAndWithinTimeWindow("foo", "foo", "2017-07-28T12:56:12Z", 9);
}
console.timeEnd('JS: ');

module.exports = matcherWindow;