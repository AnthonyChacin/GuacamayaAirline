const sequelize = require('sequelize');
const database = require('../config/database');
const Reservation = require('../models/Reservation');

const controller = {};

controller.getReservations = async function (callback){
    try {
        let response = await Reservation.findAll({
            where: {
                activo: 1
            }
        });
        let reservations = response.map(result => result.dataValues);
        console.log(reservations);
        callback(reservations, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteReservation = async function (id, callback) {
    try {
        let response = await Reservation.update({
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

controller.createReservation = async function (data, callback) {
    try {
        let response = await Reservation.create({
            idComprador: data.idComprador,
            totalPagar: data.totalPagar,
            tipoAsiento: data.tipoAsiento,
            metodoPago: data.metodoPago
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;