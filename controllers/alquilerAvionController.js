
const Alquiler_Avion = require('../models/Alquiler_Avion');

const controller = {};

controller.getAvionesAlquilados = async function (callback){
    try {
        let avionesAlquilados = await Alquiler_Avion.findAll({
            where: {
                Activo: 1
            }
        });
        avionesAlquilados = avionesAlquilados.map(result => result.dataValues);
        console.log(avionesAlquilados);
        callback(avionesAlquilados, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getAvionAlquiladoUpdate = async function (params, callback){
    try {
        let avionAlquiladoUpdate = await Alquiler_Avion.findOne({
            where: {
                IdAvion: params.IdAvion,
                IdProveedor: params.IdProveedor,
                FechaSolicitud: params.FechaSolicitud
            }
        });
        
        console.log(avionAlquiladoUpdate);

        callback(avionAlquiladoUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteAvionAlquilado = async function (params, callback) {
    try {
        let response = await Alquiler_Avion.update({
            Activo: 0
        }, {
            where: {
                IdAvion: params.IdAvion,
                IdProveedor: params.IdProveedor,
                FechaSolicitud: params.FechaSolicitud
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createAvionAlquilado = async function (data, callback) {
    console.log(data);
    try {
        let response = await Alquiler_Avion.create({
            IdAvion: data.IdAvion,
            IdProveedor: data.IdProveedor,
            FechaSolicitud: data.FechaSolicitud,
            FechaEntrega: data.FechaEntrega,
            FechaDevolucion: data.FechaDevolucion,
            MontoPagado: data.MontoPagado
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateAvionAlquilado = async function (data, params, callback) {
    try {
        let response = await Alquiler_Avion.update({
            IdAvion: data.IdAvion,
            IdProveedor: data.IdProveedor,
            FechaSolicitud: data.FechaSolicitud,
            FechaEntrega: data.FechaEntrega,
            FechaDevolucion: data.FechaDevolucion,
            MontoPagado: data.MontoPagado
        },{
            where:{
                IdAvion: params.IdAvion,
                IdProveedor: params.IdProveedor,
                FechaSolicitud: params.FechaSolicitud
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;