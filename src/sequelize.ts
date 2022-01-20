import { config } from 'dotenv-safe';
import { Sequelize } from 'sequelize-typescript';
import User from './models/users.models';
import Cards from './models/cards.models';
import Transactions from './models/transaction.models';

config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.DEV_DATABASE as string,
  host: process.env.DB_HOST as string,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  models: [User, Cards, Transactions],
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database', err);
  });

sequelize.addModels([User, Cards, Transactions]);

sequelize.sync();

export default sequelize;
