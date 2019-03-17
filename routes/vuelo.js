const express = require('express');
const router = express.Router();
const vueloController = require('../controllers/vueloController');
const aeropuertoController = require('../controllers/aeropuertoController');
const avionController = require('../controllers/avionController');
const rutaController = require('../controllers/rutaController');
const tripulacionController = require('../controllers/tripulacionController');
const empleadoController = require('../controllers/empleadoController');

router.get('/', (req, res) => {
    vueloController.getVuelos((vuelos, err) => {
        if(err){
            //console.log(err)
            res.json({
                success: false,
                msg: 'Fallo al obtener los vuelos'
            })
        }else{
            rutaController.getRutas((rutas, err) => {
                if(err){
                    res.json({
                        success: false,
                        msg: 'Fallo al obtener las rutas'
                    })
                }else{
                    avionController.getAviones((aviones, err) => {
                        if(err){
                            res.json({
                                success: false,
                                msg: 'Fallo al obtener los aviones'
                            })
                        }else{
                            aeropuertoController.getAeropuertos((aeropuertos, err) => {
                                if(err){
                                    res.json({
                                        success: false,
                                        msg: 'Fallo al obtener los aeropuertos'
                                    })
                                }else{
                                    res.render('vuelo', {vuelos, rutas, aviones, aeropuertos})
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

router.get('/:id', (req, res) => {
    if(!!req.params.id){
        vueloController.getVueloUpdate( req.params.id, (vueloUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallos al obtener el vuelo '+ req.params.id +' a modificar'
                })
            }else{
                rutaController.getRutas((rutas, err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener las rutas'
                        })
                    }else{
                        avionController.getAviones((aviones, err) => {
                            if(err){
                                res.json({
                                    success: false,
                                    msg: 'Fallo al obtener los aviones'
                                })
                            }else{
                                aeropuertoController.getAeropuertos((aeropuertos, err) => {
                                    if(err){
                                        res.json({
                                            success: false,
                                            msg: 'Fallo al obtener los aeropuertos'
                                        })
                                    }else{
                                        res.render('vuelo', {vueloUpdate, rutas, aviones, aeropuertos})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

router.get('/tripulacion/:id', (req, res) => {
    if(!!req.params.id){
        tripulacionController.getTripulacionVuelo( req.params.id, (tripulacion, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallos al obtener la tripulacion del vuelo '+ req.params.id +'.'
                })
            }else{
                rutaController.getRutas((rutas, err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener las rutas'
                        })
                    }else{
                        empleadoController.getEmpleados((empleados, err) => {
                            if(err){
                                res.json({
                                    success: false,
                                    msg: 'Fallo al obtener los empleados'
                                })
                            }else{
                                aeropuertoController.getAeropuertos((aeropuertos, err) => {
                                    if(err){
                                        res.json({
                                            success: false,
                                            msg: 'Fallo al obtener los aeropuertos'
                                        })
                                    }else{
                                        vueloController.getVuelos((vuelos, err) => {
                                            if(err){
                                                res.json({
                                                    success: false, 
                                                    msg: 'Fallo al obtener los vuelos'
                                                })
                                            }else{
                                                var VueloTrabajado = req.params.id
                                                res.render('vuelo', {tripulacion, rutas, empleados, aeropuertos, VueloTrabajado, vuelos})
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

router.post('/update/:id', (req, res) => {
    if(!!req.params.id && !!req.body){
        vueloController.updateVuelo(req.body, req.params.id, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallos al modificar el vuelo '+ req.params.id+'.'
                })
            }else{
                res.redirect('/vuelo/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        console.log(req.body)
        vueloController.createVuelo(req.body, (err) => {
            console.log(err)
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al crear vuelo'
                })
            }else{
                res.redirect('/vuelo/');
            }
        })
    }
})

router.post('/createTripulacion', (req, res) => {
    if(!!req.body){
        console.log(req.body)
        tripulacionController.createTripulacion(req.body, (err) => {
            console.log(err)
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al crear tripulacion'
                })
            }else{
                res.redirect(`/vuelo/tripulacion/${req.body.IdVueloTrabajado}`);
            }
        })
    }
})

router.post('/deleteTripulacion/:IdEmpleado-:VueloTrabajado', (req, res) => {
    if(!!req.params){
        console.log('1')
        tripulacionController.deleteTripulacion(req.params, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al eliminar al empleado de la tripulacion'
                })
            }else{
                res.redirect(`/vuelo/tripulacion/${req.params.VueloTrabajado}`);
            }
        })
    }
})


router.get('/vuelo/:id');

module.exports = router;