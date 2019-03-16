const database = require('../config/database');
const sequelize = require('sequelize');
const Vuelo = require('../models/Vuelo');

const controller = {};

controller.getVuelos = async function (callback){
    try {
        let vuelos = await Vuelo.findAll({
            where: {
                Activo: 1
            }
        });

        vuelos = vuelos.map(result => result.dataValues);
        
        callback(vuelos, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getOfertasVuelos = async function (data, callback){
    try{

        let ofertasVuelos = await database.query(
            "SELECT `Vuelo`.`IdVuelo`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Ruta`.`Origen`, `Ruta`.`Destino`, `Vuelo`.`FechaSalida`, `Vuelo`.`FechaLlegada` FROM `Vuelo`" +
            " INNER JOIN `Ruta` ON `Ruta`.`IdRuta` = `Vuelo`.`IdRuta`" +
            " WHERE `Ruta`.`Origen` = '"+data.Origen+"' AND `Ruta`.`Destino` = '"+data.Destino+"'" +
            " AND `Vuelo`.`FechaSalida` = '"+data.FechaSalida+"' AND `Vuelo`.`EstatusVuelo` = 'A tiempo'" +
            " AND `Vuelo`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );

        callback(ofertasVuelos, null);

    }catch(error){
        callback(null, error);
    }
}

controller.getEscalas1 = async function (data, callback){
    try{
        
        let escalas1 = await database.query(
            "SELECT `Vuelo`.`IdVuelo`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Ruta`.`Origen`, `Ruta`.`Destino`, `Vuelo`.`FechaSalida`, `Vuelo`.`FechaLlegada` FROM `Vuelo`" +
            " INNER JOIN `Ruta` ON `Ruta`.`IdRuta` = `Vuelo`.`IdRuta`" +
            " WHERE `Ruta`.`Origen` = '"+data.Origen+"'" +
            " AND `Vuelo`.`FechaSalida` = '"+data.FechaSalida+"'" +
            " AND `Vuelo`.`EstatusVuelo` = 'A tiempo'" +
            " AND `Vuelo`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT }
        );
        console.log(escalas1)
        callback(escalas1, null);

    }catch(error){
        callback(null, error);
    }
}

controller.getEscalas2 = async function (escalas1, data, callback){
    //Defino el array donde voy a guardar todas las escalas, en este caso es un arrays de arrays
    var escalas = new Array(escalas1.length); 
    let escalas2;
    var cont;
    var aux;

    for (let i = 0; i < escalas1.length; i++) {

        data.Origen = escalas1[i].Destino
        data.FechaLlegada = escalas1[i].FechaLlegada
    
        aux = [];
        aux.push(escalas1[i])
        cont = 0;
        do{
            try{
                escalas2 = await database.query(
                    "SELECT `Vuelo`.`IdVuelo`, `Vuelo`.`HoraSalida`, `Vuelo`.`HoraLlegada`, `Ruta`.`Origen`, `Ruta`.`Destino` AS Destino, `Vuelo`.`FechaSalida`, `Vuelo`.`FechaLlegada` FROM `Vuelo`" +
                    " INNER JOIN `Ruta` ON `Ruta`.`IdRuta` = `Vuelo`.`IdRuta`" +
                    " WHERE `Ruta`.`Origen` = '"+data.Origen+"'" +
                    " AND YEAR(`Vuelo`.`FechaSalida`) >= YEAR('"+data.FechaLlegada+"')" +
                    " AND MONTH(`Vuelo`.`FechaSalida`) >= MONTH('"+data.FechaLlegada+"')" +
                    " AND DAY(`Vuelo`.`FechaSalida`) >= DAY('"+data.FechaLlegada+"')" +
                    " AND `Vuelo`.`EstatusVuelo` = 'A tiempo'" +
                    " AND `Vuelo`.`Activo` = 1" +
                    " ORDER BY `Vuelo`.`FechaSalida` ASC LIMIT 1;",
                    { type: sequelize.QueryTypes.SELECT }
                );
                
                data.Origen = escalas2.Destino
                data.FechaLlegada = escalas2.FechaLlegada
                cont++;
                if(escalas2.length >0 ) aux.push(escalas2[0])
            }catch(error){
                callback(null, error);
            }
        }while(data.Destino != escalas2.Destino && cont <= 3);   
        escalas[i] = aux;
    }
    
    callback(escalas, null)
}

controller.getVueloUpdate = async function (IdVuelo, callback){
    try {
        let vueloUpdate = await Vuelo.findOne({
            where: {
                IdVuelo
            }
        });

        callback(vueloUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteVuelo = async function (IdVuelo, callback) {
    try {
        let response = await Vuelo.update({
            Activo: 0
        }, {
            where: {
                IdVuelo
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createVuelo = async function (data, callback) {
    
    try {
        let response = await Vuelo.create({
            EstatusVuelo: data.EstatusVuelo,
            FechaSalida: data.FechaSalida,
            FechaLlegada: data.FechaLlegada,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Destino: data.Destino,
            IdAvion: data.IdAvion,
            IdRuta: data.IdRuta
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateVuelo = async function (data, IdVuelo, callback) {
    try {
        let response = await Vuelo.update({
            EstatusVuelo: data.EstatusVuelo,
            FechaSalida: data.FechaSalida,
            FechaLlegada: data.FechaLlegada,
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Destino: data.Destino,
            IdAvion: data.IdAvion,
            IdRuta: data.IdRuta
        },{
            where:{
                IdVuelo
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;