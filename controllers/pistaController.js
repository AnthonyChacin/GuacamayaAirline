const sequelize = require('sequelize');
const database = require('../config/database');
const Pista = require('../models/Pista');

const controller = {};

controller.getPistas = async function (callback){
    try {
        let response = await Pista.findAll({
            where: {
                activo: 1
            }
        });
        let pistas = response.map(result => result.dataValues);
        console.log(pistas);
        callback(pistas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deletePista = async function (id, callback) {
    try {
        let response = await Pista.update({
            activo: 0
        }, {
            where: {
                id
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
            codigoIATA: data.codigoIATA,
            distancia: data.distancia
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;