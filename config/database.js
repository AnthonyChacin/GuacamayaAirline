const Sequelize = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize('mysql://uozmhg1r06aeugqmljcs:2oXvBJg2epxmdNX0GoIa@b2iacgn3r4tgjzrkdsej-mysql.services.clever-cloud.com:3306/b2iacgn3r4tgjzrkdsej', {
  //                            dialect -----user------------ ----pass------------ -------host----------------------------------------- port ---database name ----
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
