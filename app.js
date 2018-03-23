const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20juta%20street',
    json: true
}, (err, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
});