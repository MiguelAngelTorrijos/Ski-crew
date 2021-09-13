module.exports = app => {

    // Base URL's

    app.use("/profile", require("./user.routes"))
    app.use("/", require("./base.routes"))
    app.use("/stations", require("./station.routes"))
    app.use("/", require("./auth.routes"))
}