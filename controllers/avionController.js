const sequelize = require('sequelize');
const database = require('../config/database');
const Avion = require('../models/Avion');

const controller = {};

controller.getAviones = async function (callback){
    try {
        let aviones = await Avion.findAll({
            where: {
                Activo: 1
            }
        });
        aviones = aviones.map(result => result.dataValues);
        console.log(aviones);
        callback(aviones, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.avionesPorEstados = async function (callback) {
    try {
        let avionesPorEstados = await database.query(
            "SELECT A.`EstatusAvion`, COUNT(A.`IdAvion`) AS CantidadAviones FROM `Avion` AS A" +
            " WHERE A.`Activo` = 1" +
            " GROUP BY A.`EstatusAvion`" +
            " ORDER BY CantidadAviones DESC",
            {type: sequelize.QueryTypes.SELECT}
        );

        callback(avionesPorEstados, null)
    } catch (error) {
        callback(null, error)
    }
}

controller.usoAvion = async function (IdAvion, callback) {
    try{
        let usoAvion = await database.query(
            "SELECT V.`IdVuelo`, R.`Origen`, V.`Destino`, V.`FechaSalida`, V.`FechaLlegada`, V.`EstatusVuelo`, V.`HoraSalida`, V.`HoraLlegada` FROM `Vuelo` AS V" +
            " INNER JOIN `Avion` AS A ON A.`IdAvion` = V.`IdAvion`" +
            " INNER JOIN `Ruta` AS R ON R.`IdRuta` = V.`IdRuta`" +
            " WHERE A.`Activo` = 1 AND (V.`EstatusVuelo` = 'Aterrizo' OR V.`EstatusVuelo` = 'En vuelo') AND V.`IdAvion` = "+IdAvion+"",
            {type: sequelize.QueryTypes.SELECT}
        );

        console.log(usoAvion)
        callback(usoAvion, null)
    
    }catch(error){
        callback(null, error)
    }
}

controller.getAvionUpdate = async function (IdAvion, callback){
    try {
        let avionUpdate = await Avion.findOne({
            where: {
                IdAvion
            }
        });
        
        console.log(avionUpdate);

        callback(avionUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getAvionesPropios = async function (callback){
    try {
        console.log('1')
        let avionesPropios = await database.query(
            "SELECT `Avion`.`IdAvion` FROM `Avion`" + 
            " LEFT JOIN `Alquiler_Avion` ON `Avion`.`IdAvion` = `Alquiler_Avion`.`IdAvion`" +
            " WHERE `Alquiler_Avion`.`IdAvion` IS NULL AND `Avion`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT}
        );
        
        console.log(avionesPropios);
        callback(avionesPropios, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteAvion = async function (IdAvion, callback) {
    try {
        let response = await Avion.update({
            Activo: 0
        }, {
            where: {
                IdAvion
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createAvion = async function (data, callback) {
    console.log(data);
    try {
        let response = await Avion.create({
            EstatusAvion: data.EstatusAvion,
            Fabricante: data.Fabricante,
            DispInternet: data.DispInternet,
            DispTelevision: data.DispTelevision,
            IdModelo: data.IdModelo
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