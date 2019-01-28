const sequelize = require('sequelize');
const database = require('../config/database');
const Customer = require('../models/Customer');

//Reservation model

const Reservation = database.define('Reservation', {    
    idComprador: {
        type: sequelize.INTEGER,
        allowNull:false,

        validate: {
            isNumeric: true,
            notEmpty: true
        },

        references: {
            model: Customer,
            key: 'cedula',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    totalPagar: {
        type: sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    tipoAsiento: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    metodoPago: {
        type: sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
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

module.exports = Reservation;