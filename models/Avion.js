const sequelize = require('sequelize');
const database = require('../config/database');
const Modelo = require('../models/Modelo');

//Modelo Avion

const Avion = database.define('Avion', {
    IdAvion: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,
        autoIncrement: true,

        validate: {
            notEmpty: false,
            isNumeric: true
        }
    },
    EstatusAvion: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Fabricante: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    DispInternet: {
        type: sequelize.TINYINT,
        allowNull: false,

        validate: {
            notEmpty: true,
        }
    },
    DispTelevision: {
        type: sequelize.TINYINT,
        allowNull: false,

        validate: {
            notEmpty: true,
        }
    },
    IdModelo: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Modelo,
            key: 'IdModelo',
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

module.exports = Avion;