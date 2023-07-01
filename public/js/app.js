const weatherForm = document.querySelector('form')
const $sendLocationButton = document.querySelector('#send-location')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const weather = ['cloudy' , 'sunny' , 'rain' , 'snowy' , 'stormy' , 'clear' , 'smoke' , 'fog' , 'overcast']
const links = ['https://media.giphy.com/media/Ke7i5t6QDmDSO82Uga/giphy.gif' ,
               'https://media.giphy.com/media/1Fm7jEapE18HwS6fkT/giphy.gif' ,
               'https://media.giphy.com/media/26BGD4XaoPO3zTz9K/giphy.gif' ,
               'https://media.giphy.com/media/7FDkW6NBCeUifj9S85/giphy.gif' ,
               'https://media.giphy.com/media/6ZhkSxi5KvORq/giphy.gif' ,
               'https://media.giphy.com/media/0tLvvglXfGOITSFJSU/giphy.gif' ,
               'https://media.giphy.com/media/3o6YgloxJD3H2pITNm/giphy.gif' ,
               'https://media.giphy.com/media/3o7rbT3ECCXdEGE8fu/giphy.gif' ,
               'https://media.giphy.com/media/G7XzhrnRdxNjW/giphy.gif' ,
            ]
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
                const gif = document.getElementById('giffy');
                gif.src=links[i]
                gif.style.display='inline'
                // setTimeout(() => {
                //     gif.style.display = 'none';
                //   }, 30000);              
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
                    fetch('/weather?address='+ location).then((response)=> {
                         response.json().then((data) => {
                         if(data.error){
                            messageOne.textContent = data.error
                         }
                         else{
                            messageOne.textContent = location
                            const forecastData = data.forecast;
                            var i;
                            for (i=0; i<len; ++i) {
                            if(forecastData.toLowerCase().includes(weather[i])){
                                  const gif = document.getElementById('giffy');
                                  gif.src=links[i]
                                  gif.style.display='inline'             
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