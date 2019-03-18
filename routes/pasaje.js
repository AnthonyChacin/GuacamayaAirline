const express = require('express');
const swal = require('sweetalert');
const router = express.Router();
const pasajeController = require('../controllers/pasajeController');
const rutaController = require('../controllers/rutaController');
const vueloController = require('../controllers/vueloController');
const reservaController = require('../controllers/reservaController');
const clienteController = require('../controllers/clienteController');
const tarifaController = require('../controllers/tarifaController');

router.get('/', (req,res) => {
    pasajeController.getPasajes((pasajes, err) => {
        if(err){
            res.json({
                success: false, 
                msg: 'Fallo al obtener los pasajes a mostrar'
            })
        }else{
            clienteController.getClientes((clientes, err) => {
                if(err){
                    res.json({
                        success: false, 
                        msg: 'Fallo al obtener los clientes'
                    })
                }else{
                    vueloController.getVuelos((vuelos, err) => {
                        if(err){
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
                                    tarifaController.getTarifas((tarifas, err) => {
                                        if(err){
                                            res.json({
                                                success: false, 
                                                msg: 'Fallo al obtener las tarifas'
                                            })
                                        }else{
                                            reservaController.getReservas((reservas, err) => {
                                                if(err){
                                                    res.json({
                                                        success: false, 
                                                        msg: 'Fallo al obtener las reservas'
                                                    })
                                                }else{
                                                    res.render('pasaje', {pasajes, clientes, vuelos, rutas, tarifas, reservas});
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
})

router.get('/:id', (req,res) => {
    if(!!req.params.id){
        pasajeController.getPasajeUpdate( req.params.id, (pasajeUpdate, err) => {
            if(err){
                res.render({
                    success: false, 
                    msg: 'Fallos al obtener el pasaje a modificar'
                })
            }else{
                clienteController.getClientes((clientes, err) => {
                    if(err){
                        res.json({
                            success: false, 
                            msg: 'Fallo al obtener los clientes'
                        })
                    }else{
                        vueloController.getVuelos((vuelos, err) => {
                            if(err){
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
                                        tarifaController.getTarifas((tarifas, err) => {
                                            if(err){
                                                res.json({
                                                    success: false, 
                                                    msg: 'Fallo al obtener las tarifas'
                                                })
                                            }else{
                                                reservaController.getReservas((reservas, err) => {
                                                    if(err){
                                                        res.json({
                                                            success: false, 
                                                            msg: 'Fallo al obtener las reservas'
                                                        })
                                                    }else{
                                                        res.render('pasaje', {pasajeUpdate, clientes, vuelos, rutas, tarifas, reservas});
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
    }
})

router.post('/createReserva', (req, res) => {
    if(!!req.body){
        reservaController.createReserva( req.body, (err) => {
           if(err){
            res.write('<script>');
            res.write('alert("Fallo al crear reserva!");');
            res.write("window.location.href='javascript:history.back(1)';");
            res.write('</script>');
            res.end();
           }else{
            res.write('<script>');
            res.write('alert("Reserva creada exitosamente!");');
            res.write("window.location.href='/pasaje/';");
            res.write('</script>');
            res.end();
           } 
        })
    }
})

router.post(`/update/:id`, (req, res) => {
    if(!!req.body && !!req.params.id){
        pasajeController.updatePasaje( req.body, req.params.id, (err) => {
           if(err){
                console.log(err)
                res.write('<script>')
                res.write('alert("Fallo al modificar el pasaje!");');
                res.write("window.location.href='javascript:history.back(1)';");
                res.write('</script>')
                res.end();
           }else{
                res.write('<script>');
                res.write('alert("Pasaje modificado exitosamente!");');
                res.write("window.location.href='/pasaje/';");
                res.write('</script>');
                res.end();
           } 
        })
    }
})

router.post('/createPasaje', (req, res) => {
    if(!!req.body){
        pasajeController.createPasaje( req.body, (err) => {
           if(err){
                console.log(err)
                res.write('<script>')
                res.write('alert("Fallo al crear el pasaje!");');
                res.write("window.location.href='javascript:history.back(1)';");
                res.write('</script>')
                res.end();
           }else{
                res.write('<script>');
                res.write('alert("Pasaje creado exitosamente!");');
                res.write("window.location.href='/pasaje/';");
                res.write('</script>');
                res.end();
           } 
        })
    }
})

router.get('/pasaje/:id');

module.exports = router;