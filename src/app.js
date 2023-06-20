const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Divya'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About me',
        name:' Divya'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help Page',
        name: 'Divya',
        email: 'divya@example.com'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must enter an address'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
      })
    })
})

app.get('/products', (req, res) =>{
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404-page',{
        title: '404 page',
        name: 'Divya',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
   res.render('404-page',{
    title: '404 page',
    name: 'Divya',
    errorMsg:'Page not found'
})
})

app.listen(port, () =>{
    console.log('server is up on port ' + port)
})