'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categoriesTable = await queryInterface.createTable("categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return categoriesTable;
  },

  down: async (queryInterface, _Sequelize) => {
    return await queryInterface.bulkDelete('categories', null, {});

  }
};
