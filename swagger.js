const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Viagem365 API",
    description: "Descrição",
  },
  host: "localhost:300",
  security: [{ apiKeyAuth: [] }],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "authorization",
      description: "Token de Autenticação",
    },
  },
};
const outputFile = "./src/routes/swagger.json";
const routes = ["./src/server.js"];

swaggerAutogen(outputFile, routes, doc);
