const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units=metric&appid=645038973f42dd29f38acb9fe78c6843'

request({ url, json: true}, (error, { body }) => {
    if(error) {
        callback('Unable to connect to Weather Service!', undefined)
    } else if(body.message) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.weather[0].main+'. It is currently '+body.main.temp+' degress out. It Feels like '+body.main.feels_like+' degress out and Humidity = '+body.main.humidity+'.')
    }
})
}

    module.exports = forecast