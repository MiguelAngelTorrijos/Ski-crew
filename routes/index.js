module.exports = app => {
  app.use("/", require("./auth.routes"));   
}