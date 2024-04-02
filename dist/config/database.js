"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: "localhost",
    username: "postgres",
    password: "dominicd",
    database: "emr",
    logging: false,
});
exports.default = sequelize;
