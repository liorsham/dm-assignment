'use strict';
const { QueryInterface, DataTypes } = require('sequelize');
export default {
  up: async (queryInterface: typeof QueryInterface, Sequelize: typeof DataTypes) => {
    await queryInterface.createTable('streets', {
      street_code: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      street_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street_name_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      official_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      city_code: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'city_code',
        },
      },
    });
  },
  down: async (queryInterface: typeof QueryInterface) => {
    await queryInterface.dropTable('streets');
  },
};
