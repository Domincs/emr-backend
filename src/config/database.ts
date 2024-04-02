
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres', 
  host: "localhost",
  username: "postgres",
  password: "dominicd",
  database: "emr",
  logging: false,
});

export default sequelize;

