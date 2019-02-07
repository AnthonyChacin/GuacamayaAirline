const sequelize = require('sequelize');
const database = require('../config/database');
const Airport = require('../models/Airport');
const Airplane = require('../models/Airplane');

//Flight model

const Flight = database.define('Flight', {
    precioBase: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    porcentajeAus: {
        type: sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    estatus: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    origen: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        },

        references: {
            model: Airport,
            key: 'codigoIATA',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    destino: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        },

        references: {
            model: Airport,
            key: 'codigoIATA',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    idAirplane: {
        type: sequelize.INTEGER,
        allowNull: false,
    
        validate: {
            isNumeric: true,
            notEmpty: true
        },

        /* references: {
            model: Airplane,
            key: 'id',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        } */
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

module.exports = Flight;
