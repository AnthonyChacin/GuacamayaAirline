const sequelize = require('sequelize');
const database = require('../config/database');
const Avion = require('../models/Avion');
const Proveedor = require('../models/Proveedor');

//Modelo Alquiler_Avion

const Alquiler_Avion = database.define('Alquiler_Avion', {
    IdAvion: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Avion,
            key: 'IdAvion',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    IdProveedor: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Proveedor,
            key: 'IdProveedor',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    FechaSolicitud: {
        type: sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    FechaEntrega: {
        type: sequelize.DATEONLY,
        allowNull: false,

        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    FechaDevolucion: {
        type: sequelize.DATEONLY,
        allowNull: false,

        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    MontoPagado: {
        type: sequelize.FLOAT,
        allowNull: true,

        validate: {
            notEmpty: true,
            isNumeric: true
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

module.exports = Alquiler_Avion;