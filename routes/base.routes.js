const router = require("express").Router();
const User = require("./../models/User.model");
const Station = require('./../models/Station.model')


router.get("/", (req, res, next) => {
  res.redirect("/auth/login");
});

router.get("/favs", (req, res, next) => {
  User
    .findById(req.session.currentUser._id)
    .populate('favorites')
    .then(user => {
      console.log(user)
      res.render('favs', { user })
    })
    .catch(err => console.log(err));
});

router.get('/favs/:id/delete', (req, res) => {
  const { id } = req.params;
  User
    .findByIdAndUpdate(req.session.currentUser, { $pull : { favorites: id } })
    .then((response) => {
      res.redirect('/favs')
    })
})

router.post("/favs/:id", (req, res) => { 
  const{id} = req.params;
  User
    .findByIdAndUpdate(req.session.currentUser, { $push: { favorites: id } })
    .then(response => res.redirect('/favs'))
    .catch(err => console.log(err, "el error"))
}) 

module.exports = router;




