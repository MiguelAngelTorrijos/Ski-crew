const router = require("express").Router()
const Station = require('./../models/Station.model')
const Comment = require('./../models/Comment.model')
const { isLoggedIn } = require('./../middleware')
const CDNupload = require('../config/cloudinary.config')

// LISTADO ESTACIONES

router.get('/', isLoggedIn, (req, res, next) => {

    Station
        .find()
        .then(stations => res.render('stations/list', { stations }))
        .catch(err => console.log(err))
})

// CREAR ESTACIONES

router.get('/create', isLoggedIn, (req, res) => {

    Station
        .find()
        .then(stations => res.render('stations/create', { stations }))
        .catch(err => console.log(err))
})

router.post('/create', CDNupload.array('imgFile'), (req, res) => {

    const { name, zone, description, dateOpen, dateClose } = req.body

    const query = {
        name,
        zone,
        description,
        dateOpen,
        dateClose,
        location: {
            type: 'Point',
            coordinates: [req.body.latitude || 0, req.body.longitude || 0]
        },

        stationInfo: {
            kmSlopes: req.body.kmSlopes,
            snowpark: req.body.snowpark,
            numberOfslopes: req.body.numberOfslopes,

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
    }

    // if (req.files[0]) query.stationInfo.mapSlopes = req.files[0].path
    req.files[0] && (query.stationInfo.mapSlopes = req.files[0].path)
    req.files[1] && (query.imgbackground = req.files[1].path)

    Station
        // .create({ name, location, zone, description, dateOpen, dateClose, stationInfo })
        .create(query)
        .then(() => res.redirect(`/`))
        .catch(err => console.log(err))

})

//  EDITAR COMENTARIOS

router.get('/edit/comment/:id', (req, res) => {

    const { id } = req.params

    Comment
        .findById(id)
        .then(comments => res.render('stations/edit-comment', comments))
        .catch(err => console.log(err))
})

router.post('/edit/comment/:id', (req, res) => {

    const { id } = req.params
    const { title, description } = req.body

    Comment
        .findByIdAndUpdate(id, { title, description }, { new: true })
        .then(() => Station.findOne({ comments: id }))
        .then(station => res.redirect(`/stations/${station._id}`))
        .catch(err => console.log(err))
})

// EDICIÓN DE ESTACIÓN

router.get('/edit/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    Station
        .findById(id)
        .then(theStation => res.render(`stations/edit`, theStation))
        .catch(err => console.log(err))
})

router.post('/edit/:id', CDNupload.array('imgFile'), (req, res) => {

    const { id } = req.params


    const { name, zone, description, dateOpen, dateClose } = req.body

    const query = {
        name,
        zone,
        description,
        dateOpen,
        dateClose,
        location: {
            type: 'Point',
            coordinates: [req.body.latitude || 0, req.body.longitude || 0]
        },

        stationInfo: {
            kmSlopes: req.body.kmSlopes,
            snowpark: req.body.snowpark,
            numberOfslopes: req.body.numberOfslopes,

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
    }


    req.files[0] && (query.stationInfo.mapSlopes = req.files[0].path)
    req.files[1] && (query.imgbackground = req.files[1].path)

    Station
        .findByIdAndUpdate(id, query, { new: true })
        .then((response) => {
            res.redirect(`../${id}`)
        })
        .catch(err => console.log(err))
})
// router.post('/edit/:id', (req, res) => {
//     console.log("ENTRA EN EDITAR")


//     const { id } = req.params
//     const { name, zone, description, dateOpen, dateClose, imgbackground } = req.body
//     console.log(req.body)

//     const location = {
//         type: 'Point',
//         coordinates: [req.body.latitude || 0, req.body.longitude || 0]
//     }

//     console.log(location);

//     const stationInfo = {
//         kmSlopes: req.body.kmSlopes,
//         snowpark: req.body.snowpark,
//         numberOfslopes: req.body.numberOfslopes,
//         mapSlopes: req.body.mapSlopes,
//         slopesLevel: {
//             blueSlopes: req.body.blueSlopes,
//             greenSlopes: req.body.greenSlopes,
//             redSlopes: req.body.redSlopes,
//             blackSlopes: req.body.blackSlopes
//         },
//         cote: {
//             maxCote: req.body.maxCote,
//             minCote: req.body.minCote
//         },
//         priceDay: req.body.priceDay,
//         capacity: req.body.capacity
//     }

//     Station
//         .findByIdAndUpdate(id, { name, location, zone, description, dateOpen, dateClose, imgbackground, stationInfo }, { new: true })
//         .then((response) => {
//             console.log(response, "QUE PASA AQUI")
//             res.redirect(`../${id}`)
//         })
//         .catch(err => console.log(err))
// })

// ELIMINAR COMENTARIOS

router.post('/delete/:id', (req, res) => {

    const { id } = req.params

    Comment
        .findByIdAndRemove(id)
        .then(() => { res.redirect('/stations') })
        .catch(err => console.log(err))
})

// DETALLES ESTACIÓN

router.get('/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    Station
        .findById(id)
        .populate('comments')
        .populate('events')
        .then(theStation => res.render('stations/details', theStation))
        .catch(err => console.log(err))
})

//  CREAR COMENTARIOS

router.post('/:id', (req, res) => {

    const { id } = req.params
    const { title, description } = req.body

    Comment
        .create({ title, description, user: req.session.currentUser._id })
        .then(comment => {

            return Station
                .findByIdAndUpdate(id, { "$push": { "comments": comment._id } })
        })
        .then(() => res.redirect(`/stations`))
        .catch(err => console.log(err))
})


module.exports = router;
