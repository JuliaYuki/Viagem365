const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Destino = connection.define("destino", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  localidade: {
    type: DataTypes.STRING,
  },
  coordenadas: {
    type: DataTypes.STRING,
  },
  usuarioId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'Usuario', 
      key: 'id',
    },
  },
});

module.exports = Destino;
