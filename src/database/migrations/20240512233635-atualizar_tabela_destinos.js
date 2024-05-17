"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("destinos", "location", "cep", {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("destinos", "cep", "location", {});
  },
};
