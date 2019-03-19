
const database = require('../config/database');
const sequelize = require('sequelize');
const Tarifa = require('../models/Tarifa');

const controller = {};

controller.getTarifas = async function (callback){
    try {
        let tarifas = await Tarifa.findAll({
            /* where: {
                Vigente: 1
            } */
        });
        tarifas = tarifas.map(result => result.dataValues);
        console.log(tarifas);
        callback(tarifas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getTarifaUpdate = async function (IdTarifa, callback){
    try {
        let tarifaUpdate = await Tarifa.findAll({
            where: {
                IdTarifa
            }
        });
        tarifaUpdate = tarifaUpdate.map(result => result.dataValues);
        console.log(tarifaUpdate);
        callback(tarifaUpdate[0], null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteTarifa = async function (IdTarifa, callback) {
    try {
        let response = await Tarifa.update({
            Vigente: 0
        }, {
            where: {
                IdTarifa
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createTarifa = async function (data, callback) {
    console.log(data);
    try {
        let response = await Tarifa.create({
            PrecioBase: data.PrecioBase,
            Clase: data.Clase,
            CantidadEq: data.CantidadEq,
            PesoEq: data.PesoEq,
            FeeReservacion: data.FeeReservacion,
            FeeEqExtra: data.FeeEqExtra
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateTarifa = async function (data, IdTarifa, callback) {
    try {
        let response = await Tarifa.update({
            PrecioBase: data.PrecioBase,
            Clase: data.Clase,
            CantidadEq: data.CantidadEq,
            PesoEq: data.PesoEq,
            FeeReservacion: data.FeeReservacion,
            FeeEqExtra: data.FeeEqExtra,
            Vigente: data.Vigente
        },{
            where:{
                IdTarifa
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.reportarGanancias = async function (fechaI, fechaF, callback) {
    try {
        let response = await database.query(
            /*
            //-------Version completa pero no existe CantidadEq en Pasaje--------
            "SELECT (CASE" +
            " WHEN P.`CantidadEq` <= T.`CantidadEq` THEN SUM(T.`PrecioBase`*(100+T.`FeeReservacion`)/100)" +
            " ELSE SUM(T.`PrecioBase`*(100+T.`FeeReservacion`+T.`FeeEqExtra`)/100)" +
            " END) AS ganancias FROM `Tarifa` AS T" +   
            // (inner joins...)
            */
            //-----------------Version incompleta-------------------------
            "SELECT SUM(`PrecioBase`) AS ganancias FROM `Tarifa` AS T" +
            //-------------------------------------------------------------
            " INNER JOIN `Pasaje` AS P ON T.`IdTarifa` = P.`IdTarifa`" +
            " INNER JOIN `Reserva`AS R ON P.`IdReserva` = R.`IdReserva`" +
            " WHERE YEAR(R.`FechaReserva`) >= YEAR('"+fechaI+"')" +
            " AND MONTH(R.`FechaReserva`) >= MONTH('"+fechaI+"')" +
            " AND DAY(R.`FechaReserva`) >= DAY('"+fechaI+"')" +
            " AND YEAR(R.`FechaReserva`) <= YEAR('"+fechaF+"')" +
            " AND MONTH(R.`FechaReserva`) <= MONTH('"+fechaF+"')" +
            " AND DAY(R.`FechaReserva`) <= DAY('"+fechaF+"')" +
            " AND R.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );

        callback(response, null)
    } catch (error) {
        callback(null, error)
    }
}

module.exports = controller;