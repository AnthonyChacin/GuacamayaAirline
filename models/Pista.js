const sequelize = require('sequelize');
const database = require('../config/database');

//Pista model

const Pista = database.define('Pista', {
    distancia: {
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

module.exports = Pista;