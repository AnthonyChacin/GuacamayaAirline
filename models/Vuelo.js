const sequelize = require('sequelize');
const database = require('../config/database');
const Avion = require('../models/Avion');
const Aeropuerto = require('../models/Aeropuerto');
const Ruta = require('../models/Ruta');

//Modelo Vuelo

const Vuelo = database.define('Vuelo', {
    IdVuelo: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,
        autoIncrement: true,

        validate: {
            notEmpty: false,
            isNumeric: true
        }
    },
    EstatusVuelo: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Fecha: {
        type: sequelize.DATEONLY,
        allowNull: false,

        validate: {
            isDate: true,
            notEmpty: true
        }
    },
    HoraSalida: {
        type: sequelize.TIME,
        allowNull: false,

        validate: {
            notEmpty: false,
        }
    },
    HoraLlegada: {
        type: sequelize.TIME,
        allowNull: false,

        validate: {
            notEmpty: false,
        }
    },
    Destino: {
        type: sequelize.CHAR(3),
        allowNull: false,

        validate: {
            notEmpty: true
        },

        references: {
            model: Aeropuerto,
            key: 'CodigoIATA',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    IdAvion: {
        type: sequelize.INTEGER,
        allowNull: false,

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
    IdRuta: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Ruta,
            key: 'IdRuta',
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

module.exports = Vuelo;