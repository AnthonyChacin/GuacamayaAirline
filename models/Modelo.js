const sequelize = require('sequelize');
const database = require('../config/database');

//Modelo Modelo

const Modelo = database.define('Modelo', {
    IdModelo: {
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
    VelMax: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    VelCrucero: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    NumAsienPrim: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    NumAsienEco: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    PesoVacio: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    PesoMax: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    CargaMaxEq: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    CargaMaxCab: {
        type: sequelize.FLOAT,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    TripulacionNec: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    TipoCombustible: {
        type: sequelize.STRING,
        allowNull: false,

        validate: {
            notEmpty: true,
        }
    },
    CantCombustible: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    CantBanios: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    CantSalEmerg: {
        type: sequelize.INTEGER,
        allowNull: false,

        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    DistDespCargaMax: {
        type: sequelize.FLOAT,
        allowNull: false,

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

module.exports = Modelo;