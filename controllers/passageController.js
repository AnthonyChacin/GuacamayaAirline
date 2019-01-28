const sequelize = require('sequelize');
const database = require('../config/database');
const Passage = require('../models/Passage');

const controller = {};

controller.getPassages = async function (callback){
    try {
        let response = await Passage.findAll({
            where: {
                activo: 1
            }
        });
        let passages = response.map(result => result.dataValues);
        console.log(passages);
        callback(passages, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deletePassage = async function (id, callback) {
    try {
        let response = await Passage.update({
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

controller.createPassage = async function (data, callback) {
    try {
        let response = await Passage.create({
            idReserva: data.idReserva,
            idPasajero: data.idPasajero,
            precioPasaje: data.precioPasaje,
            cantPiezasE: data.cantPiezasE
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;