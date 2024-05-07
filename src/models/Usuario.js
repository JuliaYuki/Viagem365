const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Usuario = connection.define("usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATE,
  },
  endereco: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Usuario;
