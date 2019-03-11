const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');
const avionController = require('../controllers/avionController');
const aeropuertoController = require('../controllers/aeropuertoController');
const diaSemanaRutaController = require('../controllers/diaSemanaRutaController');


router.get('/', (req, res) => {
    rutaController.getRutas((rutas, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al buscar rutas'
            });
        }else{
            avionController.getAvionesPropios((aviones, err) => {
                if(err){
                    res.json({
                        success: false,
                        msg: 'Fallo buscar aviones'
                    })
                }else{
                    aeropuertoController.getAeropuertos((aeropuertos, err) => {
                        if(err){
                            res.json({
                                success: false,
                                msg: 'Fallo buscar aeropuertos'
                            })
                        }else{
                            res.render('ruta', {rutas, aviones, aeropuertos})
                        }
                    })
                }
            })
        }    
    });
});

router.get('/:id', (req, res) => {
    if(!!req.params.id){
        rutaController.getRutaUpdate(req.params.id, (rutaUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar la ruta a modificar'
                })
            }else{
                rutaController.getRutas((rutas, err) => {
                    if (err){
                        res.json({
                            success: false,
                            msg: 'Fallo al buscar rutas'
                        });
                    }else{
                        avionController.getAvionesPropios((aviones, err) => {
                            if(err){
                                res.json({
                                    success: false,
                                    msg: 'Fallo buscar aviones'
                                })
                            }else{
                                aeropuertoController.getAeropuertos((aeropuertos, err) => {
                                    if(err){
                                        res.json({
                                            success: false,
                                            msg: 'Fallo buscar aeropuertos'
                                        })
                                    }else{
                                        res.render('ruta', {rutaUpdate, rutas, aviones, aeropuertos})
                                    }
                                })
                            }
                        })
                    }    
                });
            }
        })
    }
});

router.post('/update/:id', (req, res) => {
    if(!!req.params.id){
        rutaController.updateRuta( req.body, req.params.id, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al modificar la ruta ${req.params.id}`
                })
            }else{
                res.redirect('/ruta/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        console.log(req.body)
        if(!req.body.DiasSemana){
            var dsrFailed = 'Debe seleccionar al menos un día de la semana';
            res.render('ruta', {dsrFailed})
        }else{
            rutaController.createRuta( req.body, (err) => {
                if(err){
                    res.json({
                        success: false,
                        msg: `Fallo al crear la ruta`
                    })
                }else{
                    var parametros = {Origen: req.body.Origen, Destino: req.body.Destino}
                    rutaController.getRutaDS(parametros, (ruta, err) =>{
                        if(err){
                            res.json({
                                success: false,
                                msg: `Fallo al encontrar la ruta a la cual se le asignarán los días de la semana`
                            }) 
                        }else{
                            var data;
                            for (let i = 0; i < req.body.DiasSemana.length; i++) {
                                data = {IdRuta: ruta.IdRuta, DiasSemana: req.body.DiasSemana[i]}
                                console.log(data)
                                diaSemanaRutaController.createDSRuta( data, (err) => {
                                    if(err){
                                        res.json({
                                            success: false,
                                            msg: `Fallo al agregar día de la semana a la ruta`
                                        }) 
                                    }
                                })
                            }
                            res.redirect('/ruta/');
                        }
                    })
                }
            })
        }
    }
})

router.get('/ruta/:id');

module.exports = router;