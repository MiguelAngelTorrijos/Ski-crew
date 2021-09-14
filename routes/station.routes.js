const router = require("express").Router()

const Station = require('./../models/Station.model')
const Comment = require('./../models/Comment.model')
const Event = require('./../models/Event.model')



// LISTADO ESTACIONES

router.get('/', (req, res) => {
    Station
        .find()
        .then(stations => res.render('stations/list', { stations }))
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

    const { name, location, zone, description, dateOpen, dateClose, imgbackground } = req.body
    const stationInfo = {
        kmSlopes: req.body.kmSlopes,
        snowpark: req.body.snowpark,
        numberOfslopes: req.body.numberOfslopes,
        mapSlopes: req.body.mapSlopes,
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
        .create({ name, location, zone, description, dateOpen, dateClose, imgbackground, stationInfo })
        .then(() => res.redirect(`/`))
        .catch(err => console.log(err))

})

// DETALLES ESTACIÓN

router.get('/:id', (req, res) => {
    const { id } = req.params
    Station
        .findById(id)
        .populate('comments')
        .populate('events')
        .then(theStation => res.render('stations/details', { theStation }))
        .catch(err => console.log(err))
})


// EDICIÓN DE ESTACIÓN

router.get('/edit/:id', (req, res) => {

    const { id } = req.params

    Station
        .findById(id)
        .then(theStation => res.render(`stations/edit`, { theStation }))
        .catch(err => console.log(err))
})

router.post('/edit/:id', (req, res) => {
    console.log("ENTRA EN EDITAR")


    const { id } = req.params
    const { name, location, zone, description, dateOpen, dateClose, imgbackground } = req.body

    const stationInfo = {
        kmSlopes: req.body.kmSlopes,
        snowpark: req.body.snowpark,
        numberOfslopes: req.body.numberOfslopes,
        mapSlopes: req.body.mapSlopes,
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
        .findByIdAndUpdate(id, { name, location, zone, description, dateOpen, dateClose, imgbackground, stationInfo }, { new: true })
        .then((response) => {
            console.log(response, "QUE PASA AQUI")
            res.redirect(`../${id}`)
        })
        .catch(err => console.log(err))
})

module.exports = router;
