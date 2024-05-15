const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { schemas } = require("./schemas"); // Importa os schemas

const options = {
  definition: {
    swagger: "2.0", // Versão do Swagger
    info: {
      title: "Sua API RESTful",
      version: "1.0.0",
      description: "Documentação da API",
    },
    definitions: schemas, // Adiciona os schemas
  },
  apis: ["./src/routes/*.js"], // Arquivos com as rotas
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };