const sequelize = require('sequelize');
const database = require('../config/database');
const Tripulacion = require('../models/Tripulacion');

const controller = {};

controller.getTripulacionVuelo = async function (IdVuelo, callback){
    try {
        let tripulacion = await database.query(
            "SELECT `Tripulacion`.`IdEmpleado`, `Persona`.`IdPersona`, `Persona`.`Pasaporte`, `Persona`.`Nombre`, `Persona`.`Apellido`, `Cargo`.`Nombre` AS Cargo FROM `Tripulacion`" +
            " INNER JOIN `Persona` ON `Persona`.`IdPersona` = `Tripulacion`.`IdEmpleado`" +
            " INNER JOIN `Empleado` ON `Empleado`.`IdPersona` = `Persona`.`IdPersona`" +
            " INNER JOIN `Cargo` ON `Cargo`.`IdCargo` = `Empleado`.`IdCargo`" +
            " WHERE `Tripulacion`.`IdVueloTrabajado` = "+IdVuelo+" AND `Tripulacion`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT}
        )

        console.log(tripulacion);

        callback(tripulacion, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteTripulacion = async function (params, callback) {
    try {
        let response = await Tripulacion.update({
            Activo: 0
        }, {
            where: {
                IdEmpleado: params.IdEmpleado,
                IdVueloTrabajado: params.VueloTrabajado
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createTripulacion = async function (data, callback) {
    console.log(data);
    try {
        let response = await Tripulacion.create({
            IdEmpleado: data.IdEmpleado,
            IdVueloTrabajado: data.IdVueloTrabajado
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateAvion = async function (data, IdAvion, callback) {
    try {
        let response = await Avion.update({
            EstatusAvion: data.EstatusAvion,
            Fabricante: data.Fabricante,
            DispInternet: data.DispInternet,
            DispTelevision: data.DispTelevision,
            IdModelo: data.IdModelo
        },{
            where:{
                IdAvion
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;