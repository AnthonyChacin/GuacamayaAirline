const database = require('../config/database');
const sequelize = require('sequelize');
const Reserva = require('../models/Reserva');

const controller = {};

controller.getReservas = async function (callback){
    try {
        
        let reservas = await database.query(
            "SELECT R.`IdReserva`, R.`IdComprador`, R.`FechaReserva`, R.`MetodoPago`," +
            " ROUND(SUM(T.`PrecioBase` + (T.`PrecioBase`*T.`FeeReservacion`/100) + " +
            "IF(P.`PiezasEquipaje` > T.`CantidadEq`,((P.`PiezasEquipaje` - T.`CantidadEq`)*(T.`PrecioBase`*T.`FeeEqExtra`/100)),0)" +
            "),2) AS TotalPagar" +
            " FROM `Reserva` AS R" +
            " INNER JOIN `Pasaje` AS P ON P.`IdReserva` = R.`IdReserva`" +
            " INNER JOIN `Tarifa` AS T ON T.`IdTarifa` = P.`IdTarifa`" +
            " WHERE R.`Activo` = 1" +
            " GROUP BY R.`IdReserva`;",
            {type: sequelize.QueryTypes.SELECT}
        ); 
        
        console.log(reservas);
        
        callback(reservas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getReservaUpdate = async function (IdReserva, callback){
    try {
        let reservaUpdate = await Reserva.findOne({
            where: {
                IdReserva
            }
        });

        callback(reservaUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteReserva = async function (IdReserva, callback) {
    try {
        let response = await Reserva.update({
            Activo: 0
        }, {
            where: {
                IdReserva
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createReserva = async function (data, callback) {
    
    try {
        let response = await Reserva.create({
            IdComprador: data.IdComprador,
            FechaReserva: data.FechaReserva,
            MetodoPago: data.MetodoPago
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateReserva = async function (data, IdReserva, callback) {
    try {
        let response = await Reserva.update({
            IdComprador: data.IdComprador,
            FechaReserva: data.FechaReserva,
            MetodoPago: data.MetodoPago
        },{
            where:{
                IdReserva
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;