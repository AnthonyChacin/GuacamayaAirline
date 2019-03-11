
const Dias_Semana_Ruta = require('../models/Dias_Semana_Ruta');

const controller = {};

controller.getDSRutas = async function (callback){
    try {
        let DSRutas = await Dias_Semana_Ruta.findAll({
            where: {
                Activo: 1
            }
        });
        DSRutas = DSRutas.map(result => result.dataValues);
        console.log(DSRutas);
        callback(DSRutas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getDSRutasUpdate = async function (params, callback){
    try {
        let DSRutasUpdate = await Dias_Semana_Ruta.findOne({
            where: {
                IdRuta: params.IdRuta,
                DiasSemana: params.DiasSemana
            }
        });
        
        console.log(DSRutasUpdate);

        callback(DSRutasUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteDSRuta = async function (params, callback) {
    try {
        let response = await Dias_Semana_Ruta.update({
            Activo: 0
        }, {
            where: {
                IdRuta: params.IdRuta,
                DiasSemana: params.DiasSemana
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createDSRuta = async function (data, callback) {
    console.log(data);
    try {
        let response = await Dias_Semana_Ruta.create({
            IdRuta: data.IdRuta,
            DiasSemana: data.DiasSemana
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateDSRuta = async function (data, params, callback) {
    try {
        let response = await Dias_Semana_Ruta.update({
            IdRuta: data.IdRuta,
            DiasSemana: data.DiasSemana
        },{
            where:{
                IdRuta: params.IdRuta,
                DiasSemana: params.DiasSemana
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;