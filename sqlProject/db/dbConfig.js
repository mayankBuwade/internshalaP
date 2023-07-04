const mySQL = require("mysql2");
require("dotenv").config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // Additional configuration options can be added here if needed
};

const connection = mySQL.createConnection(config);

module.exports = connection;
