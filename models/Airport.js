const sequelize = require('sequelize');
const database = require('../config/database');

//Airport model

const Airport = database.define('Airport', {
    codigoIATA: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            isAlpha: true,
            notEmpty: true
        }
    },
    ciudad: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    pais: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    activo: {
        type: sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,

        validate: {
            notEmpty: true
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Airport;
