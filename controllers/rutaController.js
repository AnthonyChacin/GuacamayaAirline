
const Ruta = require('../models/Ruta');

const controller = {};

controller.getRutas = async function (callback){
    try {
        let rutas = await Ruta.findAll({
            where: {
                Activo: 1
            }
        });
        rutas = rutas.map(result => result.dataValues);
        console.log(rutas);
        callback(rutas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getRutaDS = async function (params, callback){
    try {
        let ruta = await Ruta.findAll({
            where: {
                Origen: params.Origen,
                Destino: params.Destino,
                Activo: 1
            }
        });
        ruta = ruta.map(result => result.dataValues);

        callback(ruta[0], null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getRutaUpdate = async function (IdRuta, callback){
    try {
        let rutaUpdate = await Ruta.findOne({
            where: {
                IdRuta
            }
        });
        
        console.log(rutaUpdate);

        callback(rutaUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteRuta = async function (IdRuta, callback) {
    try {
        let response = await Ruta.update({
            Activo: 0
        }, {
            where: {
                IdRuta
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createRuta = async function (data, callback) {
    console.log(data);
    try {
        let response = await Ruta.create({
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Origen: data.Origen,
            Destino: data.Destino,
            IdAvion: data.IdAvion
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateRuta = async function (data, IdRuta, callback) {
    try {
        let response = await Ruta.update({
            HoraSalida: data.HoraSalida,
            HoraLlegada: data.HoraLlegada,
            Origen: data.Origen,
            Destino: data.Destino,
            IdAvion: data.IdAvion
        },{
            where:{
                IdRuta
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;