const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weaher',
        name: 'Debashis'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Debashis'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need any help',
        name: 'Debashis'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
       if (!req.query.address) {
       return res.send({
            error: 'You must provide an address'
        })
    } 

        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error }) 
            } 
            
             forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Debashis',
        errorMessage: 'Help artical not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Debashis',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})