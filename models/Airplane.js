const sequelize = require('sequelize');
const database = require('../config/database');
const AirplaneModel = require('../models/AirplaneModel');
const Provider = require('../models/Provider');

//Airplane model

const Airplane = database.define('Airplane', {
    modelo: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            isNumeric: true,
            notEmpty: true
        },

        /* references: {
            model: AirplaneModel,
            key: 'id'
        } */
    },
    proveedor: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            isNumeric: true,
            notEmpty: true
        },

        /* references: {
            model: Provider,
            key: 'id'
        } */
    },
    estatus: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    rutaVuelo: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    fallas: {
        type: sequelize.TEXT,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    fabricante: {
        type: sequelize.STRING,
        allowNull: false,
    
        validate: { 
            notEmpty: true
        }
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Airplane;