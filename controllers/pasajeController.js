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

        /* let pasajes = await database.query(
            "SELECT `Pasaje`.`ID` AS PasajeID, Pasajero.`Pasaporte` AS PasaporteP, Pasajero.`Nombre` AS NombreP, Pasajero.`Apellido` AS ApellidoP, RutaR.`CodigoIATAOrigen` AS CodigoIATAOrigenR," +
            "VueloR.`CodigoIATADestino` AS CodigoIATADestinoR, VueloR.`FechaSalida` AS FechaSalidaR,`Tarifa`.`Clase`,`Tarifa`.`ID` AS TarifaID," +
            "Comprador.`Pasaporte` AS PasaporteC, Comprador.`Nombre` AS NombreC, Comprador.`Apellido` AS ApellidoC, RutaA.`CodigoIATAOrigen` AS CodigoIATAOrigenA, VueloA.`CodigoIATADestino` AS CodigoIATADestinoA," +
            "VueloA.`FechaSalida` AS FechaSalidaA, `Pasaje`.`Asiento`, `Pasaje`.`Estado`, `Pasaje`.`FechaReserva`, `Pasaje`.`MetodoPago` " +
            "FROM `Pasaje` " +
            "INNER JOIN `Cliente` AS Pasajero ON `Pasaje`.`IDPasajero`= Pasajero.`ID` " +
            "INNER JOIN `Cliente` AS Comprador ON `Pasaje`.`IDComprador`= Comprador.`ID` " +
            "INNER JOIN `Vuelo` AS VueloR ON `Pasaje`.`IDVueloReservado`= VueloR.`ID` " +
            "INNER JOIN `Vuelo` AS VueloA ON `Pasaje`.`IDVueloAbordado`= VueloA.`ID` " +
            "INNER JOIN `Ruta` AS RutaR ON VueloR.`IDRuta`= RutaR.`ID` " +
            "INNER JOIN `Ruta` AS RutaA ON VueloA.`IDRuta`= RutaA.`ID` " +
            "INNER JOIN `Tarifa` ON `Pasaje`.`IDTarifa`=`Tarifa`.`ID` " +
            "WHERE `Pasaje`.`Activo`= 1;",
            { type: sequelize.QueryTypes.SELECT }
        ); */
        
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
            "SELECT ROUND(COUNT(P.`IdVueloAbordado`)/COUNT(P.`IdPasaje`)*100,2) AS abordaje FROM Pasaje P" + 
            " WHERE P.`Activo` = 1 AND P.`IdVueloReservado` = " + IdVuelo,
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(response);
        callback(response,null);
    } catch (error) {
        callback(null,error);
    }
}

module.exports = controller;