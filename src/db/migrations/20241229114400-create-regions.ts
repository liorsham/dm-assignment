'use strict';
import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
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
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('regions');
  },
};
