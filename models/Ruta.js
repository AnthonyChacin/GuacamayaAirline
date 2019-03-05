const sequelize = require('sequelize');
const database = require('../config/database');
const Avion = require('../models/Avion');
const Aeropuerto = require('../models/Aeropuerto');

//Modelo Ruta

const Ruta = database.define('Ruta', {
    IdRuta: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,
        autoIncrement: true,

        validate: {
            notEmpty: false,
            isNumeric: true
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
    Origen: {
        type: sequelize.CHAR(3),
        allowNull: false,
        //unique: 'compositeIndex',

        validate: {
            notEmpty: true
        },

        references: {
            model: Aeropuerto,
            key: 'CodigoIATA',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Destino: {
        type: sequelize.CHAR(3),
        allowNull: false,
        //unique: 'compositeIndex',

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

module.exports = Ruta;