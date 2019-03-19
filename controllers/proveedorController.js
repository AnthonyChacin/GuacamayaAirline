const database = require('../config/database');
const sequelize = require('sequelize');
const Proveedor = require('../models/Proveedor');

const controller = {};

controller.getProveedores = async function (callback){
    try {
        let proveedores = await Proveedor.findAll({
            where: {
                Activo: 1
            }
        });
        proveedores = proveedores.map(result => result.dataValues);
        console.log(proveedores);
        callback(proveedores, null);
    }catch (error) {
        callback(null, error);
    }
}

controller.getProveedoresPTR = async function (calback){
    try{
        let proveedoresPTR = await database.query(
            "SELECT P.`Nombre`, P.`Ciudad`, P.`Pais`, ROUND(AVG(DATEDIFF(AA.`FechaEntrega`, AA.`FechaSolicitud`)),0) AS TiempoRespuesta FROM `Alquiler_Avion` AS AA" + 
            " INNER JOIN `Proveedor` AS P ON P.`IdProveedor` = AA.`IdProveedor`" +
            " WHERE AA.`Activo` = 1 AND P.`Activo` = 1" +
            " GROUP BY P.`IdProveedor`" +
            " ORDER BY TiempoRespuesta ASC",
            {type: sequelize.QueryTypes.SELECT }
        );

        calback(proveedoresPTR, null)
    }catch(error){
        calback(null, error)
    }
}

controller.getProveedoresPCA = async function (calback){
    try{
        let proveedoresPCA = await database.query(
            "SELECT P.`Nombre`, P.`Ciudad`, P.`Pais`, ROUND(AVG(AA.`MontoPagado`/(DATEDIFF(AA.`FechaDevolucion`, AA.`FechaEntrega`))),2) AS CostoAlquiler FROM `Alquiler_Avion` AS AA" + 
            " INNER JOIN `Proveedor` AS P ON P.`IdProveedor` = AA.`IdProveedor`" +
            " WHERE AA.`Activo` = 1 AND P.`Activo` = 1" +
            " GROUP BY P.`IdProveedor`" +
            " ORDER BY CostoAlquiler ASC",
            {type: sequelize.QueryTypes.SELECT }
        );

        calback(proveedoresPCA, null)
    }catch(error){
        calback(null, error)
    }
}

controller.getProveedorUpdate = async function (IdProveedor, callback){
    try {
        let proveedorUpdate = await Proveedor.findAll({
            where: {
                IdProveedor
            }
        });
        proveedorUpdate = proveedorUpdate.map(result => result.dataValues);
        console.log(proveedorUpdate);
        callback(proveedorUpdate[0], null);
    }catch (error) {
        callback(null, error);
    }
}

controller.deleteProveedor = async function (IdProveedor, callback) {
    try {
        let response = await Proveedor.update({
            Activo: 0
        }, {
            where: {
                IdProveedor
            }
        });
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.createProveedor = async function (data, callback) {
    console.log(data);
    try {
        let response = await Proveedor.create({
            Nombre: data.Nombre,
            Ciudad: data.Ciudad,
            Pais: data.Pais
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

controller.updateProveedor = async function (data, IdProveedor, callback) {
    try {
        let response = await Proveedor.update({
            Nombre: data.Nombre,
            Ciudad: data.Ciudad,
            Pais: data.Pais
        },{
            where:{
                IdProveedor
            } 
        });
        
        callback(null);
    } catch (error) {
        callback(error);
    }
}

module.exports = controller;