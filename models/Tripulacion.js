const sequelize = require('sequelize');
const database = require('../config/database');
const Empleado = require('../models/Empleado');
const Vuelo = require('../models/Vuelo');

//Modelo Tripulacion

const Tripulacion = database.define('Tripulacion', {
    IdEmpleado: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Empleado,
            key: 'IdPersona',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    IdVueloTrabajado: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Vuelo,
            key: 'IdVuelo',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
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

module.exports = Tripulacion;