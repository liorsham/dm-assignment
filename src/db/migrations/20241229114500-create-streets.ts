'use strict';
import { QueryInterface, Sequelize, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
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
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('streets');
  },
};
