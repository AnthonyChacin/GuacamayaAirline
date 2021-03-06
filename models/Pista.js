const sequelize = require('sequelize');
const database = require('../config/database');
const Aeropuerto = require('../models/Aeropuerto');

//Modelo Pista

const Pista = database.define('Pista', {
    CodigoIATA: {
        type: sequelize.CHAR(3),
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        },

        references: {
            model: Aeropuerto,
            key: 'CodigoIATA',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }

    },
    Distancia: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    Activo: {
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