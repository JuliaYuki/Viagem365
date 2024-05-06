const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Usuario = connection.define("usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CPF: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;
