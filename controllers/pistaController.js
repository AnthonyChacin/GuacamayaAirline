const sequelize = require('sequelize');
const database = require('../config/database');
const Pista = require('../models/Pista');

const controller = {};

controller.getPistas = async function (callback){
    try {
        let response = await Pista.findAll({
            where: {
                Activo: 1
            }
        });
        let pistas = response.map(result => result.dataValues);
        console.log(pistas);
        callback(pistas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deletePista = async function (param, callback) {
    try {
        let response = await Pista.update({
            Activo: 0
        }, {
            where: {
                CodigoIATA: param.CodigoIATA,
                Distancia: param.Distancia
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createPista = async function (data, callback) {
    try {
        let response = await Pista.create({
            CodigoIATA: data.CodigoIATA,
            Distancia: data.Distancia
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;