const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key='+ process.env.WEATHERSTACK_API_KEY +'&query=' + latitude + ',' + longitude 
    //const url ='http://api.weatherstack.com/current?access_key=5b5d05a76dc826d05368864ceea10b30'+'&query=' + latitude + ',' + longitude 
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,
                body.current.weather_descriptions[0]+". It is currently " + body.current.temperature + " degress out. It feels like " +
                body.current.feelslike + " degress out. The Humidity is " + body.current.humidity + "%."
            )
        }
    })
}
 
module.exports = forecast