const sequelize = require('sequelize');
const database = require('../config/database');
const Cliente = require('../models/Cliente');
const Persona = require('../models/Persona');

const controller = {};

controller.getClientes = async function (callback) {
    try {

        let clientes = await database.query(
            "SELECT `Pasaporte`, `Nombre`, `Apellido`, `Sexo`, `FechaNac`, `PaisNac`  FROM `Persona`" + 
            " INNER JOIN `Cliente` ON `Cliente`.`IdPersona` = `Persona`.`IdPersona`" +
            " WHERE `Persona`.`Activo` = 1;",
            { type: sequelize.QueryTypes.SELECT}
        )

        console.log(clientes);
        callback(clientes, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getCliente = async function (data, callback) {
    try {

        let existePersona = await Persona.findAll({
            where: {
                Activo: 1,
                Pasaporte: data.Pasaporte
            }
        });
        console.log(existePersona.length);
        if(existePersona.length != 0){
            console.log(existePersona.length + 1);
            let cliente = await Cliente.findAll({
                where: {
                    Activo: 1,
                    IdPersona: existePersona[0].IdPersona
                }
            });
            cliente = cliente.map(result => result.dataValues);
            if(cliente[0] != null){
                callback(1, cliente[0].IdPersona, null);
            }else{
                callback(2, existePersona[0].IdPersona, null);
            }
        }else{
            console.log(existePersona.length + 3);
            callback(0, null);
        }
    
    }catch (error) {
        callback(null, error);
    }
}

controller.getClienteUpdate = async function (data, callback) {
    
    try {
        let clienteUpdate = await database.query(
            "SELECT * FROM `Persona`" + 
            " WHERE `Persona`.`Pasaporte` = " + data +" LIMIT 1;",
            { type: sequelize.QueryTypes.SELECT}
        )
        console.log(clienteUpdate[0]);
          
        callback(clienteUpdate[0], null)

    } catch (error) {
        callback(null, error)
    }
}

controller.createCliente = async function (data, callback) {
    try {
        let response = await Cliente.create({
            IdPersona: data
        });

        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;