const Sequelize = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT_MySQL, DB_HOST } = process.env;

const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT_MySQL}/${DB_NAME}`, {
  //                            dialect -----user---------pass---------host----- port------database name
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
