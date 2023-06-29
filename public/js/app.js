const weatherForm = document.querySelector('form')
const $sendLocationButton = document.querySelector('#send-location')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const weather = ['cloudy' , 'sunny' , 'rain' , 'snowy' , 'stormy' , 'clear' , 'smoke' , 'fog' , 'overcast']
var len = weather.length;



weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+ location).then((response)=> {
    response.json().then((data) => {
        if(data.error){
        messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            const forecastData = data.forecast;
            var i;
            for (i=0; i<len; ++i) {
            if(forecastData.toLowerCase().includes(weather[i])){
                const gif = document.getElementById(weather[i]);
                gif.style.display='inline'
                setTimeout(() => {
                    gif.style.display = 'none';
                  }, 30000);              
              }
            }
            messageTwo.textContent = data.forecast
        }
    })
})
})

$sendLocationButton.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')
    
    navigator.geolocation.getCurrentPosition((position) => {
           const latitude =  position.coords.latitude
           const longitude = position.coords.longitude

           search.value = latitude+' ,'+longitude
           messageOne.textContent = 'Loading...'
           messageTwo.textContent = ''
           fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?access_token=pk.eyJ1IjoiZGcwMDciLCJhIjoiY2xpZWVxaTlvMHphazNmcW82YnZpOHhjdSJ9.pYgO1uWy2WnWfM-5I6Os_A').then((response) => {    
           response.json().then((data) => {
                if(data.error){
                  messageOne.textContent = data.error
                }
                else{
                    const locality  = data.features[0].place_name.split(',')
                    const len = locality.length - 3
                    const location = locality.slice(len, locality.length);
                    console.log(locality)
                    fetch('/weather?address='+ location).then((response)=> {
                         response.json().then((data) => {
                         if(data.error){
                            messageOne.textContent = data.error
                         }
                         else{
                            messageOne.textContent = data.location
                            const weather = ['cloudy' , 'sunny' , 'rain' , 'snowy' , 'stormy']
                            const forecastData = data.forecast;
                            var i, len = weather.length;
                            for (i=0; i<len; ++i) {
                                if(forecastData.includes(weather[i])){
                                    document.getElementById(weather[i]).style.display = 'inline';
                                 }
                            }
                            messageTwo.textContent = data.forecast
                            }
                        })
                    })
                }
            })
        })     
              
        })
    })