const sequelize = require('sequelize');
const database = require('../config/database');
const Customer = require('../models/Customer');

const controller = {};

controller.getCustomers = async function (callback){
    try {
        let response = await Customer.findAll({
            where: {
                activo: 1
            }
        });
        let customers = response.map(result => result.dataValues);
        console.log(customers);
        callback(customers, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteCustomer = async function (cedula, callback) {
    try {
        let response = await Customer.update({
            activo: 0
        }, {
            where: {
                cedula
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createCustomer = async function (data, callback) {
    try {
        let response = await Customer.create({
            cedula: data.cedula,
            nombre: data.nombre,
            apellido: data.apellido,
            fechaNac: data.fechaNac,
            paisNac: data.paisNac
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;