const Sequelize = require("sequelize");

const HOST_NAME = process.env.HOST_NAME || "localhost";
const DB_NAME = process.env.DB_NAME || "api-estados";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "194469";


const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: HOST_NAME,
    dialect: "mysql"
})

module.exports = connection;