'use strict';
const { QueryInterface, DataTypes } = require('sequelize');

export default{
  up: async (queryInterface: typeof QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('regions', {
      region_code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      region_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: typeof QueryInterface) => {
    await queryInterface.dropTable('regions');
  },
};
