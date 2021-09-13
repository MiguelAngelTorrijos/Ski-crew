const router = require("express").Router()

const Station = require('./../models/Station.model')



// LISTADO ESTACIONES

router.get('/', (req, res) => {
    Station
        .find()
        .then(stations => res.render('stations/list'))
        .catch(err => console.log(err))
})

// CREAR ESTACIONES

router.get('/create', (req, res) => {

    Station
        .find()
        .then(stations => res.render('stations/create', { stations }))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {

    const { name, location, zone, dateOpen, dateClose, imgbackground } = req.body
    const stationInfo = {
        kmSlopes: req.body.kmSlopes,
        snowpark: req.body.snowpark,
        mapSlopes: req.body.kmSlopes,
        slopesLevel: {
            blueSlopes: req.body.blueSlopes,
            greenSlopes: req.body.greenSlopes,
            redSlopes: req.body.redSlopes,
            blackSlopes: req.body.blackSlopes
        },
        cote: {
            maxCote: req.body.maxCote,
            minCote: req.body.minCote
        },
        priceDay: req.body.priceDay,
        capacity: req.body.capacity
    }

    Station
        .create({ name, location, zone, dateOpen, dateClose, imgbackground, stationInfo })
        .then(theStation => res.redirect(`/`))
        .catch(err => console.log(err))

})

module.exports = router;
