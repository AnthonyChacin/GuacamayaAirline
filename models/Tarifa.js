const sequelize = require('sequelize');
const database = require('../config/database');

//Modelo Tarifa

const Tarifa = database.define('Tarifa', {
    IdTarifa: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    PrecioBase: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    Clase: {
        type: sequelize.STRING,
        allowNull: false,
        
        validate: {
            notEmpty: true
        }
    },
    CantidadEq: {
        type: sequelize.INTEGER,
        allowNull: false,
        
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    PesoEq: {
        type: sequelize.INTEGER,
        allowNull: false,
        
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    FeeReservacion: {
        type: sequelize.FLOAT,
        allowNull: false,
        
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    FeeEqExtra: {
        type: sequelize.FLOAT,
        allowNull: false,
        
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    Vigente: {
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

module.exports = Tarifa;