const ad = require('./build/Release/advertWindow');

console.log(ad.checkWindow("foo", "foo", "2017-07-28T12:56:12Z", 9));

module.exports = ad;