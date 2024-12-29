'use strict';
import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
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
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('cities');
  },
};
