const database = require('../config/database');
const sequelize = require('sequelize');
const Pasaje = require('../models/Pasaje');

const controller = {};

controller.getPasajes = async function (callback){
    try {
        let pasajes = await Pasaje.findAll({
            where: {
                Activo: 1
            }
        });

        pasajes = pasajes.map(result => result.dataValues);
        
        console.log(pasajes);
        
        callback(pasajes, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getPasajeUpdate = async function (IdPasaje, callback){
    try {
        let pasajeUpdate = await Pasaje.findOne({
            where: {
                IdPasaje
            }
        });

        callback(pasajeUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deletePasaje = async function (IdPasaje, callback) {
    try {
        let response = await Pasaje.update({
            Activo: 0
        }, {
            where: {
                IdPasaje
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createPasaje = async function (data, callback) {
    
    try {
        let response = await Pasaje.create({
            Estado: data.Estado,
            IdReserva: data.IdReserva,
            IdPasajero: data.IdPasajero,
            IdVueloReservado: data.IdVueloReservado,
            IdVueloAbordado: data.IdVueloAbordado,
            IdTarifa: data.IdTarifa,
            PiezasEquipaje: data.PiezasEquipaje,
            Asiento: data.Asiento,
            EsIda: data.EsIda
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updatePasaje = async function (data, IdPasaje, callback) {
    try {
        let response = await Pasaje.update({
            Estado: data.Estado,
            IdReserva: data.IdReserva,
            IdPasajero: data.IdPasajero,
            IdVueloReservado: data.IdVueloReservado,
            IdVueloAbordado: data.IdVueloAbordado,
            IdTarifa: data.IdTarifa,
            PiezasEquipaje: data.PiezasEquipaje,
            Asiento: data.Asiento,
            EsIda: data.EsIda
        },{
            where:{
                IdPasaje
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.contarPasajes = async function (callback) {
    try {
        let cuenta = await database.query(
            "SELECT COUNT(`IdPasaje`) AS num_pasajes FROM `Pasaje` P WHERE P.`Estado` = 'Comprado' AND P.`Activo` = 1",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(cuenta);
        callback(cuenta, null)
    } catch (error) {
        callback(null, error);
    }
}

// Devuelve numero entre 0-100 (porcentaje)
controller.reportarAbordaje = async function (IdVuelo, callback) {
    try {
        let response = await database.query(
            //COUNT() no cuenta NULLs
            "SELECT ROUND(COUNT(IF(P.`IdVueloAbordado` = P.`IdVueloReservado`,P.`IdVueloAbordado`,NULL))/COUNT(P.`IdPasaje`)*100,2) AS abordaje FROM Pasaje P" + 
            " WHERE P.`Activo` = 1 AND P.`IdVueloReservado` = " + IdVuelo +"",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(response);
        callback(response,null);
    } catch (error) {
        callback(null,error);
    }
}

controller.destinosPopulares = async function (callback) {
    try {
        let response = await database.query(
            "SELECT CONCAT(A.`Ciudad`, ', ', A.`Pais`) AS destino, COUNT(P.`IdPasaje`) AS visitas FROM Pasaje P" + 
            " INNER JOIN `Vuelo` V ON V.`IdVuelo` = P.`IdVueloAbordado`" +
            " INNER JOIN `Aeropuerto` A ON A.`CodigoIATA` = V.`Destino`" +
            " WHERE P.`Activo` = 1" +
            " GROUP BY destino" + 
            " ORDER BY visitas DESC",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(response);
        callback(response,null);
    } catch (error) {
        callback(null,error);
    }
}

module.exports = controller;