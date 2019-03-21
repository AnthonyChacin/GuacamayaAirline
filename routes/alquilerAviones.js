const express = require('express');
const router = express.Router();
const alquilerAvionController = require('../controllers/alquilerAvionController');
const proveedorController = require('../controllers/proveedorController');
const avionController = require('../controllers/avionController');


router.get('/', (req, res) => {
    alquilerAvionController.getAvionesAlquilados((avionesAlquilados, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al buscar aviones alquilados'
            });
        }else{
            avionController.getAviones((aviones, err) => {
                if(err){
                    res.json({
                        success: false,
                        msg: 'Fallo buscar aviones'
                    })
                }else{
                    proveedorController.getProveedores((proveedores, err) => {
                        if(err){
                            res.json({
                                success: false,
                                msg: 'Fallo buscar proveedores'
                            })
                        }else{
                            res.render('alquilerAviones', {avionesAlquilados, aviones, proveedores})
                        }
                    })
                }
            })
        }    
    });
});

router.get('/:IdAvion-:IdProveedor-:FechaSolicitud', (req, res) => {
    if(!!req.params){
        alquilerAvionController.getAvionAlquiladoUpdate(req.params, (avionAlquiladoUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar el avión alquilado a modificar'
                })
            }else{
                avionController.getAviones((aviones, err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener aviones'
                        })
                    }else{
                        proveedorController.getProveedores((proveedores, err) => {
                            if(err){
                                res.json({
                                    success: false,
                                    msg: 'Fallo buscar modelos'
                                })
                            }else{
                                alquilerAvionController.getAvionesAlquilados((avionesAlquilados, err) => {
                                    if (err){
                                        res.json({
                                            success: false,
                                            msg: 'Fallo al obtener la lista de aviones alquilados'
                                        })
                                    }else{
                                        res.render('alquilerAviones', {aviones, avionAlquiladoUpdate, proveedores, avionesAlquilados})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
});

router.post('/update/:IdAvion-:IdProveedor-:FechaSolicitud', (req, res) => {
    if(!!req.params){
        alquilerAvionController.updateAvionAlquilado( req.body, req.params, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al modificar el alquiler del avión ${req.params.IdAvion}`
                })
            }else{
                res.redirect('/alquilerAviones/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        alquilerAvionController.createAvionAlquilado( req.body, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al crear alquiler de avion`
                })
            }else{
                var EstatusAvion = 'Alquilado'
                avionController.updateEstatusAvion(req.body.IdAvion, EstatusAvion, (err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: `Fallo al setear el estatus del avion`
                        })
                    }else{
                        res.redirect('/alquilerAviones/');
                    }
                })
            }
        })
    }
})

router.get('/avion/:id');

module.exports = router;