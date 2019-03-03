const sequelize = require('sequelize');
const database = require('../config/database');
const Ruta = require('../models/Ruta');

//Modelo Dias_Semana_Ruta

const Dias_Semana_Ruta = database.define('Dias_Semana_Ruta', {
    IdRuta: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,

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
    DiasSemana: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,

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

module.exports = Dias_Semana_Ruta;