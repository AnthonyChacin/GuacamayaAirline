const sequelize = require('sequelize');
const database = require('../config/database');

//Modelo Proveedor

const Proveedor = database.define('Proveedor', {
    IdProveedor: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey:  true,
        autoIncrement: true,

        validate: {
            notEmpty: false,
            isNumeric: true
        }
    },
    Nombre: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,

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

module.exports = Proveedor;