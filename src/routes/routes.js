const { Router } = require("express");
const userRoutes = require("./user.routes");
const loginRoutes = require("./login.routes")

const routes = Router()

routes.use("/usuario", userRoutes)
routes.use("/login", loginRoutes)

module.exports = routes