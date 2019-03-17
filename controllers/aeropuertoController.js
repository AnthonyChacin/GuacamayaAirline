const database = require('../config/database');
const sequelize = require('sequelize');
const Aeropuerto = require('../models/Aeropuerto');

const controller = {};

controller.getAeropuertos = async function (callback){
    try {
        let response = await Aeropuerto.findAll({
            where: {
                Activo: 1
            }
        });
        let aeropuertos = response.map(result => result.dataValues);
        console.log(aeropuertos);
        callback(aeropuertos, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getAeropuertosUpdate = async function (id, callback){
    try {
        let response = await Aeropuerto.findAll({
            where: {
                Activo: 1,
                CodigoIATA: id
            }
        });
        let aeropuertosUpdate = response.map(result => result.dataValues);
        console.log(aeropuertosUpdate);
        callback(aeropuertosUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteAeropuerto = async function (CodigoIATA, callback) {
    try {
        let response = await Aeropuerto.update({
            Activo: 0
        }, {
            where: {
                CodigoIATA
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createAeropuerto = async function (data, callback) {
    try {
        let response = await Aeropuerto.create({
            CodigoIATA: data.CodigoIATA,
            Ciudad: data.Ciudad,
            Pais: data.Pais,
            ZonaHoraria: data.ZonaHoraria
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateAeropuerto = async function (data, CodigoIATA, callback) {
    try {
        let response = await Aeropuerto.update({
            CodigoIATA: data.CodigoIATA,
            Ciudad: data.Ciudad,
            Pais: data.Pais,
            ZonaHoraria: data.ZonaHoraria
        },{
            where:{
                CodigoIATA
            } 
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;