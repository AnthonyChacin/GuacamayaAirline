const sequelize = require('sequelize');
const database = require('../config/database');
const Vuelo = require('../models/Vuelo');
const Tarifa = require('../models/Tarifa');
const Reserva = require('../models/Reserva');
const Cliente = require('../models/Cliente');

//Modelo Pasaje

const Pasaje = database.define('Pasaje', {
    IdPasaje: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,
        autoIncrement: true,

        validate: {
            notEmpty: false,
            isNumeric: true
        }
    },
    Estado: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    IdReserva: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Reserva,
            key: 'IdReserva',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    IdPasajero: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',

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
    IdVueloReservado: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: 'compositeIndex',

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
    IdVueloAbordado: {
        type: sequelize.INTEGER,
        allowNull: true,

        references: {
            model: Vuelo,
            key: 'IdVuelo',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    IdTarifa: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Tarifa,
            key: 'IdTarifa',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    PiezasEquipaje: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        }
    },
    Asiento: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        }
    },
    EsIda: {
        type: sequelize.TINYINT,
        allowNull: false,

        validate: {
            notEmpty: false
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

module.exports = Pasaje;