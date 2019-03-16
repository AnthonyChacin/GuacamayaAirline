const express = require('express');
const router = express.Router();
const avionController = require('../controllers/avionController');
const mantenimientoController = require('../controllers/mantenimientoController');


router.get('/', (req, res) => {
    mantenimientoController.getMantenimientos((mantenimientos, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al buscar mantenimientos'
            });
        }else{
            avionController.getAvionesPropios((aviones, err) => {
                if(err){
                    res.json({
                        success: false,
                        msg: 'Fallo buscar aviones'
                    })
                }else{
                    res.render('mantenimiento', {aviones, mantenimientos})
                }
            })
        }    
    });
});

router.get('/:id1-:id2', (req, res) => {
    if(!!req.params.id1 && !!req.params.id2){
        mantenimientoController.getMantenimientoUpdate(req.params, (mantenimientoUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar mantenimiento a modificar'
                })
            }else{
                mantenimientoController.getMantenimientos((mantenimientos, err1) => {
                    if(err1){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener mantenimientos'
                        })
                    }else{
                        avionController.getAvionesPropios((aviones, err2) => {
                            if(err2){
                                res.json({
                                    success: false,
                                    msg: 'Fallo buscar modelos'
                                })
                            }else{
                                res.render('mantenimiento', {aviones, mantenimientos, mantenimientoUpdate})
                            }
                        })
                    }
                })
            }
        })
    }
});

router.post('/update/:id1-:id2', (req, res) => {
    if(!!req.params.id1 && !!req.params.id2){
        if(req.body.FechaSalida == ''){
            req.body.FechaSalida = '0001-01-01'
        }
        mantenimientoController.updateMantenimiento( req.body, req.params, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al modificar mantenimiento para el avión ${req.params.id1} con fecha de entrada ${req.params.id2}`
                })
            }else{
                res.redirect('/mantenimiento/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        if(req.body.FechaSalida == ''){
            req.body.FechaSalida = '0001-01-01'
        }
        mantenimientoController.createMantenimiento( req.body, (err) => {
            console.log(err)
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al registrar mantenimiento`
                })
            }else{
                res.redirect('/mantenimiento/');
            }
        })
    }
})

module.exports = router;