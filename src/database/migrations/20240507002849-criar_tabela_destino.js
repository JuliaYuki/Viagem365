module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('destino', {
      nome_destino: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
      }, 
      localidade: {
        type: Sequelize.STRING,
      },
      coordenadas: {
        type: Sequelize.STRING,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        refereces: {
          model: 'Usuario',
          key: 'id'
        }
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('destino');
  },
};