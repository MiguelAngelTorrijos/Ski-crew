const router = require("express").Router()

const Station = require('./../models/Station.model')
const Event = require('./../models/Event.model')
const { isLoggedIn } = require('./../middleware');
const { startSession } = require("mongoose");



router.get("/new", isLoggedIn, (req, res) => {

    Station
        .find()
        .then(stations => res.render('events/new', { stations }))
        .catch(err => console.log(err))
})

router.post('/new', (req, res) => {

    const { title, date, description, imageEvent, station } = req.body

    Event
        .create({ title, date, description, imageEvent })
        .then(event => {

            return Station
                .findByIdAndUpdate(station, { "$push": { "events": event._id } })
        })
        .then(() => res.redirect(`/stations`))
        .catch(err => console.log(err))

})









module.exports = router;