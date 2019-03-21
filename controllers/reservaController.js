const database = require('../config/database');
const sequelize = require('sequelize');
const Reserva = require('../models/Reserva');

const controller = {};

controller.getReservaParticular = async function (IdReserva, callback){
    try {
        
        let reserva = await database.query(
            "SELECT R.`IdReserva`, C.`Pasaporte`, C.`Nombre`, C.`Apellido`, R.`FechaReserva`, R.`MetodoPago`," +
            " ROUND(SUM(T.`PrecioBase` + (T.`PrecioBase`*T.`FeeReservacion`/100) + " +
            "IF(P.`PiezasEquipaje` > T.`CantidadEq`,((P.`PiezasEquipaje` - T.`CantidadEq`)*(T.`PrecioBase`*T.`FeeEqExtra`/100)),0)" +
            "),2) AS TotalPagar" +
            " FROM `Reserva` AS R" +
            " INNER JOIN `Pasaje` AS P ON P.`IdReserva` = R.`IdReserva`" +
            " INNER JOIN `Tarifa` AS T ON T.`IdTarifa` = P.`IdTarifa`" +
            " INNER JOIN `Persona` AS C ON C.`IdPersona` = R.`IdComprador`" +
            " WHERE R.`Activo` = 1 AND R.`IdReserva` = "+IdReserva+"" +
            " GROUP BY R.`IdReserva`;",
            {type: sequelize.QueryTypes.SELECT}
        )

        let pasajes = await database.query(
            "SELECT P.`IdPasaje`, P.`Estado`, C.`Pasaporte`, C.`Nombre`, C.`Apellido`, V1.`IdVuelo` AS VueloReservado, R1.`Origen` AS OrigenVR, R1.`Destino` AS DestinoVR," +
            " V2.`IdVuelo` AS VueloAbordado, R2.`Origen` AS OrigenVA, R2.`Destino` AS DestinoVA, T.`IdTarifa`, T.`Clase`, P.`PiezasEquipaje`, P.Asiento," +
            " P.`EsIda` FROM `Pasaje` AS P" +
            " LEFT JOIN `Reserva` AS RE ON RE.`IdReserva` = P.`IdReserva`" +
            " LEFT JOIN `Persona` AS C ON C.`IdPersona` = P.`IdPasajero`" +
            " LEFT JOIN `Vuelo` AS V1 ON V1.`IdVuelo` = P.`IdVueloReservado`" +
            " LEFT JOIN `Vuelo` AS V2 ON V2.`IdVuelo` = P.`IdVueloAbordado`" +
            " LEFT JOIN `Ruta` AS R1 ON R1.`IdRuta` = V1.`IdRuta`" +
            " LEFT JOIN `Ruta` AS R2 ON R2.`IdRuta` = V2.`IdRuta`" +
            " LEFT JOIN `Tarifa` AS T ON T.`IdTarifa` = P.`IdTarifa`" +
            " WHERE P.`Activo` = 1 AND P.`IdReserva` = "+IdReserva+"",
            {type: sequelize.QueryTypes.SELECT}
        )

        console.log(reserva[0])
        console.log(pasajes)
        callback(reserva[0], pasajes, null)

    } catch (error) {
        callback(null, error)
    }
}

controller.getReservas = async function (callback){
    try {
        
        let reservas = await database.query(
            "SELECT R.`IdReserva`, R.`IdComprador`, R.`FechaReserva`, R.`MetodoPago`," +
            " ROUND(SUM(T.`PrecioBase` + (T.`PrecioBase`*T.`FeeReservacion`/100) + " +
            "IF(P.`PiezasEquipaje` > T.`CantidadEq`,((P.`PiezasEquipaje` - T.`CantidadEq`)*(T.`PrecioBase`*T.`FeeEqExtra`/100)),0)" +
            "),2) AS TotalPagar" +
            " FROM `Reserva` AS R" +
            " LEFT JOIN `Pasaje` AS P ON P.`IdReserva` = R.`IdReserva`" +
            " LEFT JOIN `Tarifa` AS T ON T.`IdTarifa` = P.`IdTarifa`" +
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