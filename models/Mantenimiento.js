const sequelize = require('sequelize');
const database = require('../config/database');
const Avion = require('../models/Avion');

//Modelo Mantenimiento

const Mantenimiento = database.define('Mantenimiento', {
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
    FechaEntroM: {
        type: sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    Descripcion: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    FechaSalida: {
        type: sequelize.DATEONLY,
        allowNull: false,

        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    Tipo: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true,
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

module.exports = Mantenimiento;