
const Dias_Semana_Ruta = require('../models/Dias_Semana_Ruta');

const controller = {};

controller.getDSRutas = async function (callback){
    try {
        let DSRutas = await Dias_Semana_Ruta.findAll({
        });
        DSRutas = DSRutas.map(result => result.dataValues);
        console.log(DSRutas);
        callback(DSRutas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getDSRutasUpdate = async function (IdRuta, callback){
    try {
        let DSRutasUpdate = await Dias_Semana_Ruta.findAll({
            where: {
                IdRuta
            }
        });
        
        DSRutasUpdate = DSRutasUpdate.map(result => result.dataValues);

        console.log(DSRutasUpdate)

        callback(DSRutasUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteDSRuta = async function (params, callback) {
    try {
        let response = await Dias_Semana_Ruta.destroy({
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

module.exports = controller;