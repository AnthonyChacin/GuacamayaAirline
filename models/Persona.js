const sequelize = require('sequelize');
const database = require('../config/database');

//Modelo Persona

const Persona = database.define('Persona', {
    IdPersona: {
        type: sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,

        validate: {
            notEmpty: false,
            isNumeric: true
        }
    },
    Pasaporte: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,

        validate: {
            notEmpty: true
        }
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Apellido: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    Sexo: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    FechaNac: {
        type: sequelize.DATEONLY,
        allowNull: false,

        validate: {
            notEmpty: true
        }
    },
    PaisNac: {
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

module.exports = Persona;