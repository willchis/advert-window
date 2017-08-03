# matcher-window
npm module (c++ addon) for matching a field and within a time window (in JS).

## Usage
Check that two ids match each other (e.g. a "source" and an "id") and that the time passed in
is within a window +/- X minutes from now (UTC), where X is also an argument.

`matcherWindow.checkWindow(idToMatch1, idToMatch2, UTCTimeToCheckAgainstNow, minutesEitherSideOfNow);`

e.g.:
`matcherWindow.checkWindow("foo", "foo", "2017-07-28T12:56:12Z", 15)`

## Development
To make changes to the functionality, alter the c++ files in the `/cpp` folder and then recompile the module:
Run `node-gyp build` or `node-gyp-rebuild` to build and then test by using in JS as follows:

`module.exports = require('./build/Release/hello');`
