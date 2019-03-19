const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');


router.get('/', (req, res) => {
    proveedorController.getProveedores((proveedores, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al mostrar Proveedores'
            });
        }else{
            res.render('proveedor', {proveedores})
        }    
    });
});

router.get('/tiempoRespuesta', (req, res) => {
    proveedorController.getProveedoresPTR((proveedoresPTR, err) => {
        if(err){
            res.json({
                success: false, 
                msg: 'Fallo al obtener tiempo de respuesta de proveedores'
            })
        }else{
            res.render('proveedor', {proveedoresPTR})
        }
    })
})

router.get('/preciosAlquileres', (req, res) => {
    proveedorController.getProveedoresPCA((proveedoresPCA, err) => {
        if(err){
            res.json({
                success: false, 
                msg: 'Fallo al obtener costo de alquileres de proveedores'
            })
        }else{
            res.render('proveedor', {proveedoresPCA})
        }
    })
})

router.get('/:id', (req, res) => {
    if(!!req.params.id){
        proveedorController.getProveedorUpdate(req.params.id, (proveedorUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar el proveedor a modificar'
                })
            }else{
                proveedorController.getProveedores((proveedores, err1) => {
                    if(err1){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener proveedores'
                        })
                    }else{
                        res.render('proveedor', {proveedores, proveedorUpdate})
                    }
                })
            }
        })
    }
});

router.post('/update/:id', (req, res) => {
    if(!!req.params.id){
        proveedorController.updateProveedor( req.body, req.params.id, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al modificar el proveedor ${req.body.Nombre}`
                })
            }else{
                res.redirect('/proveedor/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        proveedorController.createProveedor( req.body, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al crear el proveedor`
                })
            }else{
                res.redirect('/proveedor/');
            }
        })
    }
})

router.get('/proveedor/:id');

module.exports = router;