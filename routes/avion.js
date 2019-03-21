const express = require('express');
const router = express.Router();
const avionController = require('../controllers/avionController');
const modeloController = require('../controllers/modeloController');


router.get('/', (req, res) => {
    avionController.getAviones((aviones, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al buscar aviones'
            });
        }else{
            modeloController.getModelos((modelos, err) => {
                if(err){
                    res.json({
                        success: false,
                        msg: 'Fallo buscar modelos'
                    })
                }else{
                    res.render('avion', {aviones, modelos})
                }
            })
        }    
    });
});

router.get('/estados/', (req,res) => {
    avionController.avionesPorEstados((avionesPorEstados, err) => {
        if(err){
            res.render({
                success: false,
                msg: 'Fallo al mostrar la cantidad de aviones por estados'
            })
        }else{
            res.render('avion', {avionesPorEstados})
        }
    })
})

router.get('/uso/:id', (req,res) => {
    if(!!req.params.id){
        avionController.usoAvion(req.params.id, (usoAvion, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al obtener cantidad de uso de los aviones'
                })
            }else{
                var IdAvion = req.params.id
                res.render('avion', {usoAvion, IdAvion})
            }
        })
    }
})

router.get('/:id', (req, res) => {
    if(!!req.params.id){
        avionController.getAvionUpdate(req.params.id, (avionUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar el avión a modificar'
                })
            }else{
                avionController.getAviones((aviones, err1) => {
                    if(err1){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener aviones'
                        })
                    }else{
                        modeloController.getModelos((modelos, err) => {
                            if(err){
                                res.json({
                                    success: false,
                                    msg: 'Fallo buscar modelos'
                                })
                            }else{
                                res.render('avion', {aviones, avionUpdate, modelos})
                            }
                        })
                    }
                })
            }
        })
    }
});

router.post('/update/:id', (req, res) => {
    if(!!req.params.id){
        avionController.updateAvion( req.body, req.params.id, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al modificar el avion ${req.params.id}`
                })
            }else{
                res.redirect('/avion/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        avionController.createAvion( req.body, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al crear el avión`
                })
            }else{
                res.redirect('/avion/');
            }
        })
    }
})

router.get('/avion/:id');

module.exports = router;