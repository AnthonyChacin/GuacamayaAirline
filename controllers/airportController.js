const sequelize = require('sequelize');
const database = require('../config/database');
const Airport = require('../models/Airport');

const controller = {};

controller.getAirports = async function (callback){
    try {
        let response = await Airport.findAll({
            where: {
                activo: 1
            }
        });
        let airports = response.map(result => result.dataValues);
        console.log(airports);
        callback(airports, null);
    }catch (error) {
        callback(null, error);
    }
}

module.exports = controller;