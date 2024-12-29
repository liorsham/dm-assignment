import { Sequelize } from 'sequelize-typescript';
import { City } from './models/city';
import { Region } from './models/region';
import { Street } from './models/street';

const sequelize = new Sequelize({
  database: 'streets_db',
  username: 'user',
  password: 'password',
  host: 'postgres',
  dialect: 'postgres',
  models: [City, Region, Street],
});

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export { sequelize, City, Region, Street };
