const router = require("express").Router();

router.get("/", (req, res, next) => res.render('stations/list'))

module.exports = router