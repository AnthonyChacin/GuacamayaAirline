const sequelize = require('sequelize');
const database = require('../config/database');

//Airport model
const Aeropuerto = database.define('Aeropuerto', {
    CodigoIATA: {
        type: sequelize.CHAR(3),
        allowNull: false,
        primaryKey: true,

        validate: {
            notEmpty: true
        }
    },
    Ciudad: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Pais: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    ZonaHoraria: {
        type: sequelize.FLOAT,
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

module.exports = Aeropuerto;
