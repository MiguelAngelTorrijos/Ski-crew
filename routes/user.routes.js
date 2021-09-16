const router = require("express").Router();
const User = require('./../models/User.model');
const { isLoggedIn } = require('./../middleware');

router.get('/', isLoggedIn, (req, res) => {

    User
        .find()
        .then((user) => {
            res.render('users/profile', { user: req.session.currentUser })
        })
        .catch(err => console.log(err))
})

router.post('/', isLoggedIn, (req, res, next) => {
    res.send('Hello World');
})

router.get('/edit/', isLoggedIn, (req, res, next) => {
    res.render('./users/profile-change');
})

router.post('/edit/', (req, res, next) => {
    const { username, email, photoProfile } = req.body;
    console.log(req.body)

    User
        .findByIdAndUpdate(req.session.currentUser, { username, email, photoProfile }, { new: true })
        .then((response) => { res.redirect('/profile') })
        .catch(err => console.log(err))
})



module.exports = router;