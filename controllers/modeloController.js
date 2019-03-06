
const Modelo = require('../models/Modelo');

const controller = {};

controller.getModelos = async function (callback){
    try {
        let modelos = await Modelo.findAll({
            where: {
                Activo: 1
            }
        });
        modelos = modelos.map(result => result.dataValues);
        console.log(modelos);
        callback(modelos, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getModeloUpdate = async function (IdModelo, callback){
    try {
        let modeloUpdate = await Modelo.findAll({
            where: {
                Activo: 1,
                IdModelo
            }
        });
        modeloUpdate = modeloUpdate.map(result => result.dataValues);
        console.log(modeloUpdate);
        callback(modeloUpdate[0], null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteModelo = async function (IdModelo, callback) {
    try {
        let response = await Modelo.update({
            Activo: 0
        }, {
            where: {
                IdModelo
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createModelo = async function (data, callback) {
    console.log(data);
    try {
        let response = await Modelo.create({
            Nombre: data.Nombre,
            VelMax: data.VelMax,
            VelCrucero: data.VelCrucero,
            NumAsienPrim: data.NumAsienPrim,
            NumAsienEco: data.NumAsienEco,
            PesoVacio: data.PesoVacio,
            PesoMax: data.PesoMax,
            CargaMaxEq: data.CargaMaxEq,
            TripulacionNec: data.TripulacionNec,
            TipoCombustible: data.TipoCombustible,
            CantCombustible: data.CantCombustible,
            CantBanios: data.CantBanios,
            CantSalEmerg: data.CantSalEmerg,
            DistDespCargaMax: data.DistDespCargaMax
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateModelo = async function (data, IdModelo, callback) {
    try {
        let response = await Modelo.update({
            Nombre: data.Nombre,
            VelMax: data.VelMax,
            VelCrucero: data.VelCrucero,
            NumAsienPrim: data.NumAsienPrim,
            NumAsienEco: data.NumAsienEco,
            PesoVacio: data.PesoVacio,
            PesoMax: data.PesoMax,
            CargaMaxEq: data.CargaMaxEq,
            TripulacionNec: data.TripulacionNec,
            TipoCombustible: data.TipoCombustible,
            CantCombustible: data.CantCombustible,
            CantBanios: data.CantBanios,
            CantSalEmerg: data.CantSalEmerg,
            DistDespCargaMax: data.DistDespCargaMax
        },{
            where:{
                IdModelo
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;