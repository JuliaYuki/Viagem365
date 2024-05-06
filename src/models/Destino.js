const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Destino = connection.define("destino", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duracao_horas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

module.exports = Destino;
