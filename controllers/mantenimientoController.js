
const Mantenimiento = require('../models/Mantenimiento');

const controller = {};

controller.getMantenimientos = async function (callback){
    try {
        let mantenimientos = await Mantenimiento.findAll({
            where: {
                Activo: 1
            }
        });
        mantenimientos = mantenimientos.map(result => result.dataValues);
        console.log(mantenimientos);
        callback(mantenimientos, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getMantenimientoUpdate = async function (params, callback){
    try {
        let mantenimientoUpdate = await Mantenimiento.findOne({
            where: {
                IdAvion: params.id1,
                FechaEntroM: params.id2
            }
        });
        
        console.log(mantenimientoUpdate);

        callback(mantenimientoUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteMantenimiento = async function (params, callback) {
    try {
        let response = await Mantenimiento.update({
            Activo: 0
        }, {
            where: {
                IdAvion: params.id1,
                FechaEntroM: params.id2
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createMantenimiento = async function (data, callback) {
    console.log(data);
    try {
        let response = await Mantenimiento.create({
            IdAvion: data.IdAvion,
            FechaEntroM: data.FechaEntroM,
            Descripcion: data.Descripcion,
            FechaSalida: data.FechaSalida,
            Tipo: data.Tipo
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateMantenimiento = async function (data, params, callback) {
    try {
        let response = await Mantenimiento.update({
            IdAvion: data.IdAvion,
            FechaEntroM: data.FechaEntroM,
            Descripcion: data.Descripcion,
            FechaSalida: data.FechaSalida,
            Tipo: data.Tipo
        },{
            where:{
                IdAvion: params.IdAvion,
                FechaEntroM: params.FechaEntroM
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;