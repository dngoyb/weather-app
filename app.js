const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=41%20Juta%20street',
    json: true
}, (err, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
});