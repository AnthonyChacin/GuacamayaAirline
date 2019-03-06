const sequelize = require('sequelize');
const database = require('../config/database');
const Empleado = require('../models/Empleado');
const Persona = require('../models/Persona');

const controller = {};

controller.getEmpleados = async function (callback) {
    console.log('1')
    try {

        let empleados = await database.query(
            "SELECT `Persona`.`IdPersona`,`Persona`.`Pasaporte`, `Persona`.`Nombre`, `Persona`.`Apellido`, `Persona`.`Sexo`, `Persona`.`FechaNac`, `Persona`.`PaisNac`, `Cargo`.`Nombre` AS Cargo  FROM `Empleado`" + 
            " INNER JOIN `Persona` ON `Persona`.`IdPersona` = `Empleado`.`IdPersona`" +
            " INNER JOIN `Cargo` ON `Cargo`.`IdCargo` = `Empleado`.`IdCargo`;",
            { type: sequelize.QueryTypes.SELECT}
        )
        console.log('2') 
        
        callback(empleados, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getEmpleado = async function (data, callback) {
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
            let empleado = await Empleado.findAll({
                where: {
                    Activo: 1,
                    IdPersona: existePersona[0].IdPersona
                }
            });
            empleado = empleado.map(result => result.dataValues);
            if(empleado[0] != null){
                callback(1, empleado[0].IdPersona, null);
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

controller.getEmpleadoUpdate = async function (IdPersona, callback) {
    
    try {
        
        let empleadoUpdate = await database.query(
            "SELECT `Persona`.`IdPersona`,`Persona`.`Pasaporte`, `Persona`.`Nombre`, `Persona`.`Apellido`, `Persona`.`Sexo`, `Persona`.`FechaNac`, `Persona`.`PaisNac`, `Cargo`.`IdCargo` FROM `Empleado`" + 
            " INNER JOIN `Persona` ON `Persona`.`IdPersona` = `Empleado`.`IdPersona`" +
            " INNER JOIN `Cargo` ON `Cargo`.`IdCargo` = `Empleado`.`IdCargo`" +
            " WHERE `Empleado`.`IdPersona` = " + IdPersona + ";",
            { type: sequelize.QueryTypes.SELECT}
        )

        console.log(empleadoUpdate[0]);

        callback(empleadoUpdate[0], null)

    } catch (error) {
        callback(null, error)
    }
}

controller.updateEmpleado = async function (data, IdPersona, callback) {
    try {
        let response = await Empleado.update({
            IdCargo: data.IdCargo
        },{
            where:{
                IdPersona
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.deleteEmpleado = async function (IdPersona, callback) {
    try {
        let response = await Empleado.update({
            Activo: 0
        }, {
            where: {
                IdPersona
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createEmpleado = async function (data, callback) {
    try {
        let response = await Empleado.create({
            IdPersona: data.IdPersona1,
            IdCargo: data.IdCargo
        });
        // code goes here
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;