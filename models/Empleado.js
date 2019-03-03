const sequelize = require('sequelize');
const database = require('../config/database');
const Persona = require('../models/Persona');
const Cargo = require('../models/Cargo');

//Modelo Empleado

const Empleado = database.define('Empleado', {
    IdPersona: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Persona,
            key: 'IdPersona',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    IdCargo: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Cargo,
            key: 'IdCargo',
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

module.exports = Empleado;