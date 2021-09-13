const router = require("express").Router();

const User = require('./../models/User.model')

router.get('/', (req, res) => {
    User
        .find()
        .then(users => res.render('users/profile'))
        .catch(err => console.log(err))
})

module.exports = router;