const sequelize = require('sequelize');
const database = require('../config/database');
const Modelo = require('../models/Modelo');
const Articulo_Medico = require('../models/Articulo_Medico');

//Modelo Amed_Mavion
//Relación entre articulo medico y el modelo del avion... 

const Amed_Mavion = database.define('Amed_Mavion', {
    IdModelo: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,

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
    IdArticulo: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,

        validate: {
            notEmpty: false,
            isNumeric: true
        },

        references: {
            model: Articulo_Medico,
            key: 'IdArticulo',
            deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    Cantidad: {
        type: sequelize.INTEGER,
        allowNull: true,

        validate: {
            notEmpty: true,
            isNumeric: true
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

module.exports = Amed_Mavion;