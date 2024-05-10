const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Destino = connection.define("destino", {
  nome_destino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
  },
  localidade: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.STRING,
  },
  longitude: {
    type: DataTypes.STRING,
  },
  usuario_id: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario', 
      key: 'id',
    },
  },
});

module.exports = Destino;
