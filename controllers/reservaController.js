
const Reserva = require('../models/Reserva');

const controller = {};

controller.getReservas = async function (callback){
    try {
        let reservas = await Reserva.findAll({
            where: {
                Activo: 1
            }
        });

        reservas = reservas.map(result => result.dataValues);
        
        console.log(reservas);
        
        callback(reservas, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteReserva = async function (IdReserva, callback) {
    try {
        let response = await Reserva.update({
            Activo: 0
        }, {
            where: {
                IdReserva
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createReserva = async function (data, callback) {
    
    try {
        let response = await Reserva.create({
            IdComprador: data.IdComprador,
            FechaReserva: data.FechaReserva,
            MetodoPago: data.MetodoPago
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateReserva = async function (data, IdReserva, callback) {
    try {
        let response = await Reserva.update({
            IdComprador: data.IdComprador,
            FechaReserva: data.FechaReserva,
            MetodoPago: data.MetodoPago
        },{
            where:{
                IdReserva
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;