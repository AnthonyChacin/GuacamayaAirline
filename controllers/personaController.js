const sequelize = require('sequelize');
const database = require('../config/database');
const Persona = require('../models/Persona');

const controller = {};

controller.getPersonas = async function (callback){
    try {
        let personas = await Persona.findAll({
            where: {
                Activo: 1
            }
        });
        personas = personas.map(result => result.dataValues);
        console.log(personas);
        callback(personas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getPersona = async function (data, callback){
    try {
        let persona = await Persona.findAll({
            where: {
                Activo: 1,
                Pasaporte: data.Pasaporte
            }
        });
        persona = persona.map(result => result.dataValues);
        console.log(persona);
        callback(persona, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getPersonasUpdate = async function (id, callback){
    try {
        let personasUpdate = await Persona.findAll({
            where: {
                Activo: 1,
                IdPersona: id.id1,
                Pasaporte: id.id2
            }
        });
        personasUpdate = personasUpdate.map(result => result.dataValues);
        console.log(personasUpdate);
        callback(personasUpdate, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.updatePersona = async function (data, id, callback) {
    try {
        let response = await Persona.update({
            Pasaporte: data.Pasaporte,
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            Sexo: data.Sexo,
            FechaNac: data.FechaNac,
            PaisNac: data.PaisNac
        },{
            where:{
                IdPersona: id
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.deletePersona = async function (id, callback) {
    try {
        let response = await Persona.update({
            Activo: 0
        }, {
            where: {
                Pasaporte: id
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createPersona = async function (data, callback) {
    try {
        let persona = await Persona.create({
            Pasaporte: data.Pasaporte,
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            Sexo: data.Sexo,
            FechaNac: data.FechaNac,
            PaisNac: data.PaisNac
        });

        let persona1 = await Persona.findAll({
            where: {
                Activo: 1,
                Pasaporte: data.Pasaporte
            }
        })

        persona1 = persona1.map(result => result.dataValues);

        callback(persona1[0].IdPersona, null);
    } catch (error) {
        callback(null, error);
    }
}

module.exports = controller;