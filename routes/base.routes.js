const router = require("express").Router();

router.get('/', (req, res, next) => {
  res.redirect('/auth/login')
})

//ruta favoritos

router.get("/favs", (req, res, next) => {
  res.render("favs");
});



module.exports = router;
