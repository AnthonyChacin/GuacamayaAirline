const sequelize = require('sequelize');
const database = require('../config/database');
const Persona = require('../models/Persona');

//Modelo Telefono_Persona

const Telefono_Persona = database.define('Telefono_Persona', {
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
    Telefono: {
        type: sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,

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

module.exports = Telefono_Persona;