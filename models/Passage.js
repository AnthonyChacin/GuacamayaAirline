const sequelize = require('sequelize');
const database = require('../config/database');
const Reservation = require('../models/Reservation');
const Customer = require('../models/Customer');

//Passage model

const Passage = database.define('Passage', {    
    idReserva: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            isNumeric: true,
            notEmpty: true
        },
        references: {
            model: Reservation,
            key: 'id',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    idPasajero: {
        type: sequelize.INTEGER,
        allowNull: false,

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
    precioPasaje: {
        type: sequelize.FLOAT,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    tipoPasaje: {
        type: sequelize.TINYINT,
        allowNull: false,
        validate: {
            isNumeric: true,
            notEmpty: true
        }
    },
    cantPiezasE: {
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

module.exports = Passage;