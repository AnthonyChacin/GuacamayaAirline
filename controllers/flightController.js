const sequelize = require('sequelize');
const database = require('../config/database');
const Flight = require('../models/Flight');

const controller = {};

controller.getFlights = async function (callback){
    try {
        let response = await Flight.findAll({
            where: {
                activo: 1
            }
        });
        let flights = response.map(result => result.dataValues);
        console.log(flights);
        callback(flights, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteFlight = async function (id, callback) {
    try {
        let response = await Flight.update({
            activo: 0
        }, {
            where: {
                id
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createFlight = async function (data, callback) {
    try {
        let response = await Flight.create({
            precioBase: data.precioBase,
            porcentajeAus: data.porcentajeAus,
            estatus: data.estatus,
            origen: data.origen,
            destino: data.destino,
            idAirplane: data.idAirplane
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;