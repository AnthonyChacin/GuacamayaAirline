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

controller.getpistasUpdate = async function (id, callback){
    try {
        let response = await Pista.findAll({
            where: {
                Activo: 1,
                CodigoIATA: id.id1,
                Nombre: id.id2
            }
        });
        let pistasUpdate = response.map(result => result.dataValues);
        console.log(pistasUpdate);
        callback(pistasUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.updatePista = async function (data, id, callback) {
    try {
        let response = await Pista.update({
            CodigoIATA: data.CodigoIATA,
            Nombre: data.Nombre,
            Distancia: data.Distancia
        },{
            where:{
                CodigoIATA: id.id1,
                Nombre: id.id2
            } 
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.deletePista = async function (id, callback) {
    try {
        let response = await Pista.update({
            Activo: 0
        }, {
            where: {
                CodigoIATA: id.id1,
                Nombre: id.id2
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
            Nombre: data.Nombre,
            Distancia: data.Distancia
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;