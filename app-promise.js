const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address to fecth weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    var encodedAddress = encodeURIComponent(argv.address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS'){
            throw new error('Unable to find that address.');
        }

        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;

        var weatherUrl = `https://api.darksky.net/forecast/99ba3d5149ba58733c578cab31b97666/${lat},${lng}`;
        
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherUrl);
    }).then((response)=> {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}. `)
    }).catch((err) => {
        if (err.code === 'ENOTFOUND'){
            console.log('Unable to connect to the API server')
        };
    });
    