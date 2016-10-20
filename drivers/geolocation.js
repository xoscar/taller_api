var request = require('request');

var baseUrl = 'http://ip-api.com/json/{{ip}}';

module.exports.guess = function (ip, callback) {
  if (!ip) return callback('Not a valid ip');

  request.get(baseUrl.replace('{{ip}}', ip), (err, response, body) => {
    if (err) return callback(err);

    if (body.status === 'fail') return callback(body.query);

    callback(null, {
      country: body.country,
      countryCode: body.countryCode,
      region: body.region,
      city: body.city,
      zip: body.zip,
    });
  });
};
