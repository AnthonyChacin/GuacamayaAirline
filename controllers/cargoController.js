const sequelize = require('sequelize');
const database = require('../config/database');
const Cargo = require('../models/Cargo');

const controller = {};

controller.getCargos = async function (callback){
    try {
        let cargos = await Cargo.findAll({
            where: {
                Activo: 1
            }
        });
        cargos = cargos.map(result => result.dataValues);
        console.log(cargos);
        callback(cargos, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getCargosUpdate = async function (id, callback){
    try {
        let cargosUpdate = await Cargo.findAll({
            where: {
                Activo: 1,
                IdCargo: id.id1,
                Nombre: id.id2
            }
        });
        cargosUpdate = cargosUpdate.map(result => result.dataValues);
        console.log(cargosUpdate);
        callback(cargosUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.updateCargo = async function (data, id, callback) {
    try {
        let response = await Cargo.update({
            Nombre: data.Nombre
        },{
            where:{
                IdCargo: id.id1,
                Nombre: id.id2
            } 
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.deleteCargo = async function (id, callback) {
    try {
        let response = await Cargo.update({
            Activo: 0
        }, {
            where: {
                IdCargo: id.id1,
                Nombre: id.id2
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createCargo = async function (data, callback) {
    try {
        let response = await Cargo.create({
            Nombre: data.Nombre
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;