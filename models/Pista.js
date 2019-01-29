const sequelize = require('sequelize');
const database = require('../config/database');
const Airport = require('../models/Airport');

//Modelo Pista

const Pista = database.define('Pista', {
    idAirport: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        },

        references: {
            model: Airport,
            key: 'id',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    distancia: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    cantPistas: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            isNumeric: true,
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

module.exports = Pista;