
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
            Fecha: data.Fecha,
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
            Fecha: data.Fecha,
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