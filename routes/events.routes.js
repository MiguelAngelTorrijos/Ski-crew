const router = require("express").Router()
const Station = require('./../models/Station.model')
const Event = require('./../models/Event.model')
const { isLoggedIn } = require('./../middleware')
const { startSession } = require("mongoose")
const CDNupload = require('../config/cloudinary.config')


router.get("/new", isLoggedIn, (req, res) => {

    Station
        .find()
        .then(stations => res.render('events/new', { stations }))
        .catch(err => console.log(err))
})

router.post('/new', CDNupload.single('imageEvent'), (req, res) => {

    const { title, date, description, imageEvent, station } = req.body

    Event
        .create({ title, date, description, imageEvent: req.file.path })
        .then(event => {

            return Station
                .findByIdAndUpdate(station, { "$push": { "events": event._id } })
        })
        .then(() => res.redirect(`/stations`))
        .catch(err => console.log(err))

})

router.post('/delete-event/:id', (req, res) => {

    const { id } = req.params
    console.log('quiero eliminar un comentario', id)

    Event
        .findByIdAndRemove(id)
        .then(() => res.redirect('/stations'))
        .catch(err => console.log(err))
})

module.exports = router;