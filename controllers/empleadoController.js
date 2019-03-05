const sequelize = require('sequelize');
const database = require('../config/database');
const Empleado = require('../models/Empleado');

const controller = {};

controller.createEmpleado = async function (data, callback) {
    try {
        let response = await Empleado.create({
            IdPersona: data.IdPersona,
            IdCargo: data.IdCargo
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;