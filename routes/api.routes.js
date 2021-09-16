const router = require("express").Router()

const Station = require('./../models/Station.model')

router.get('/stations', (req, res) => {

    Station
        .find()
        .then(stations => res.json(stations))
        .catch(err => console.log(err))

})

module.exports = router