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


controller.updateEstadoPasaje = async function (IdPasaje, callback) {
    try {
        let response = await Pasaje.update({
            Estado: 'Comprado'
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

controller.updateVueloAbordado = async function ( IdVueloAbordado,IdPasaje, callback) {
    try {
        let response = await Pasaje.update({
            IdVueloAbordado
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

controller.asignarAsiento = async function (Asiento,IdPasaje, callback) {
    try{

        let response = await Pasaje.update({
            Asiento
        },{
            where: {
                IdPasaje
            }
        });
        
        callback(null)

    }catch(error){
        callback(error)
    }
}

controller.buscarAsientosOcupados = async function (params, callback) {
    try {

        let asientosDisponibles = [];

        // Busco la cantidad de asientos ocupados del tipo determinado en la tarifa del pasaje.
        // Estos asientos corresponden al avión asignado al vuelo para el que se reservó el pasaje
        let asientosOcupados = await database.query(
            "SELECT P.`Asiento` FROM `Pasaje` AS P" +
            " INNER JOIN `Vuelo` AS V ON V.`IdVuelo` = P.`IdVueloReservado`" +
            " INNER JOIN `Avion` AS A ON A.`IdAvion` = V.`IdAvion`" +
            " INNER JOIN `Modelo` AS M ON M.`IdModelo` = A.`IdModelo`" +
            " INNER JOIN `Tarifa` AS T ON T.`IdTarifa` = P.`IdTarifa`" +
            " WHERE P.`Asiento` IS NOT NULL AND P.`IdVueloReservado` = "+params.IdVueloReservado+"" +
            " AND T.`Clase` = (SELECT `Tarifa`.`Clase` FROM `Tarifa` WHERE `Tarifa`.`IdTarifa` = "+params.IdTarifa+")" +
            " ORDER BY P.`Asiento` ASC;",
            { type: sequelize.QueryTypes.SELECT }
        );
        
        // Busco la cantidad de asientos que hay disponibles del tipo de asiento que está determinado en la
        // tarifa del pasaje seleccionado
        let tipoAsiento = await database.query(
            "SELECT IF(T.`Clase` = 'ClaseEconomica', M.`NumAsienEco`, M.`NumAsienPrim`) AS CantAsientos, T.`Clase` FROM `Pasaje` AS P" +
            " INNER JOIN `Vuelo` AS V ON V.`IdVuelo` = P.`IdVueloReservado`" +
            " INNER JOIN `Avion` AS A ON A.`IdAvion` = V.`IdAvion`" +
            " INNER JOIN `Modelo` AS M ON M.`IdModelo` = A.`IdModelo`" +
            " INNER JOIN `Tarifa` AS T ON T.`IdTarifa` = P.`IdTarifa`" +
            " AND T.`Clase` = (SELECT `Tarifa`.`Clase` FROM `Tarifa` WHERE `Tarifa`.`IdTarifa` = "+params.IdTarifa+") LIMIT 1",
            { type: sequelize.QueryTypes.SELECT }
        );
        
        var cont = 0;

        for (let i = 1; i <= tipoAsiento[0].CantAsientos; i++) {
            for (let j = 0; j < asientosOcupados.length; j++) {
                if(asientosOcupados[j].Asiento == i){
                    cont++;
                }
            }
            if(cont > 0){
                asientosDisponibles.push({Numero: i, Asiento: 1});
            }else{
                asientosDisponibles.push({Numero: i, Asiento: 0}); 
            }
            cont = 0;
        }

        //console.log(asientosDisponibles);

        //console.log(tipoAsiento[0]);
        //console.log(asientosOcupados);
        callback(asientosDisponibles, tipoAsiento[0], null)
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
            "SELECT CONCAT(A.`Ciudad`, ', ', A.`Pais`) AS destino, COUNT(P.`IdPasaje`) AS visitas, ROUND(COUNT(P.`IdPasaje`)/(SELECT COUNT(`IdPasaje`) FROM `Pasaje`)*100 ,2) as porcVisitas FROM `Pasaje` P" + 
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