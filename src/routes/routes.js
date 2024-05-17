const { Router } = require("express");
const userRoutes = require("./user.routes");
const loginRoutes = require("./login.routes")
const destinationRoute = require("./destination.routes")

const routes = Router()
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require('./swagger.json')

routes.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes.use("/usuario", userRoutes)
routes.use("/login", loginRoutes)
routes.use("/destino", destinationRoute)

module.exports = routes