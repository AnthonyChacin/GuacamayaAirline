
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
            "SELECT SUM(`PrecioBase`) AS ganancias FROM `Tarifa` T" +
            " INNER JOIN `Pasaje` P ON T.`IdTarifa` = P.`IdTarifa`" +
            " INNER JOIN `Reserva` R ON P.`IdReserva` = R.`IdReserva`" +
            " WHERE DATEDIFF(R.`FechaReserva`, "+fechaI+") >=0 AND DATEDIFF(R.`FechaReserva`, "+fechaF+") <=0 AND R.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );

        callback(response, null)
    } catch (error) {
        callback(null, error)
    }
}

module.exports = controller;