const assert = require('assert');
const matcherWindow = require('../matcherWindow.js');
const moment = require('moment');

describe('#checkWindow', function() {
    it('should return false if source and id are different', function() {
        const passes = matcherWindow.checkWindow('foo', 'bar', moment().utc().toISOString(), 100);
        assert.equal(passes, false);
    });

    it('should return true if source and id are the same', function() {
        const passes = matcherWindow.checkWindow('foo', 'foo', moment().utc().toISOString(), 100);
        assert.equal(passes, true);
    });

     it('should return false if time passed in is more than X minutes prior to now', function() {
        const fiveMinsAway = moment().utc().subtract(10, 'm').toISOString();
        console.log(fiveMinsAway);
        const passes = matcherWindow.checkWindow('foo', 'foo', fiveMinsAway, 1);
        assert.equal(passes, false);
    });

    it('should return false if time passed in is more than X minutes after now', function() {
        const fiveMinsAway = moment().utc().add(10, 'm').toISOString();
        console.log(fiveMinsAway);
        const passes = matcherWindow.checkWindow('foo', 'foo', fiveMinsAway, 1);
        assert.equal(passes, false);
    });

    it('should return true if time passed in is within X minutes prior to now', function() {
        const fiveMinsAway = moment().utc().subtract(10, 'm').toISOString();
        console.log(fiveMinsAway);
        const passes = matcherWindow.checkWindow('foo', 'foo', fiveMinsAway, 11);
        assert.equal(passes, true);
    });

    it('should return true if time passed in is within X minutes after now', function() {
        const fiveMinsAway = moment().utc().add(10, 'm').toISOString();
        console.log(fiveMinsAway);
        const passes = matcherWindow.checkWindow('foo', 'foo', fiveMinsAway, 11);
        assert.equal(passes, true);
    });
});