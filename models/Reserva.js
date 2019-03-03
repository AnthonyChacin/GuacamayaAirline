const sequelize = require('sequelize');
const database = require('../config/database');
const Cliente = require('../models/Cliente');

//Modelo Reserva

const Reserva = database.define('Reserva', {
    IdReserva: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    IdComprador: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Cliente,
            key: 'IdPersona',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    FechaReserva: {
        type: sequelize.DATEONLY,
        allowNull: false,

        validate: {
            notEmpty: true,
            isDate: true
        }
    },
    MetodoPago: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
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

module.exports = Reserva;