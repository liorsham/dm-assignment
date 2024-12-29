'use strict';
const { QueryInterface, DataTypes } = require('sequelize');
export default {
  up: async (queryInterface: typeof QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('cities', {
      city_code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      city_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'regions',
          key: 'region_code',
        },
      },
    });
  },
  down: async (queryInterface: typeof QueryInterface) => {
    await queryInterface.dropTable('cities');
  },
};
