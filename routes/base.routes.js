const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

//ruta favoritos

router.get("/favs", (req, res, next) => {
  res.render("favs");
});



module.exports = router;
