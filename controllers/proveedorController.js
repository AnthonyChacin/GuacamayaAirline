
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