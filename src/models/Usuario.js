const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Usuario = connection.define("usuario", {
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  gender: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cpf: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  birth: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});

module.exports = Usuario;
