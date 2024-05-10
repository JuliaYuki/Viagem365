const { DataTypes } = require("sequelize");
const { connection } = require("../database/connection");

const Destino = connection.define("destino", {
  destination: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.STRING,
  },
  latitude: {
    type: DataTypes.STRING,
  },
  longitude: {
    type: DataTypes.STRING,
  },
  user_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
});

module.exports = Destino;
