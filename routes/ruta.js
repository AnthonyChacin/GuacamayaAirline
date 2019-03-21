const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');
const avionController = require('../controllers/avionController');
const aeropuertoController = require('../controllers/aeropuertoController');
const diaSemanaRutaController = require('../controllers/diaSemanaRutaController');


router.get('/', (req, res) => {
    rutaController.getRutas((rutas, err) => {
        if (err){
            console.log(err)
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
                                        diaSemanaRutaController.getDSRutasUpdate(req.params.id, (DSRutasUpdate, err) => {
                                            if (err){
                                                res.json({
                                                    success: false,
                                                    msg: 'Fallo buscar los días de la semana programados para la ruta'
                                                })
                                            }else{
                                                var diasSemana = {Lunes: '', Martes: '', Miercoles: '', Jueves: '', Viernes: '', Sabado: '', Domingo: ''};
                                                for (let i = 0; i < DSRutasUpdate.length; i++) {
                                                    if(DSRutasUpdate[i].DiasSemana == 'Lunes') diasSemana.Lunes = 'Lunes'
                                                    else if (DSRutasUpdate[i].DiasSemana == 'Martes') diasSemana.Martes = 'Martes'
                                                    else if (DSRutasUpdate[i].DiasSemana == 'Miercoles') diasSemana.Miercoles = 'Miercoles'
                                                    else if (DSRutasUpdate[i].DiasSemana == 'Jueves') diasSemana.Jueves = 'Jueves'
                                                    else if (DSRutasUpdate[i].DiasSemana == 'Viernes') diasSemana.Viernes = 'Viernes'
                                                    else if (DSRutasUpdate[i].DiasSemana == 'Sabado') diasSemana.Sabado = 'Sabado'
                                                    else if (DSRutasUpdate[i].DiasSemana == 'Domingo') diasSemana.Domingo = 'Domingo'
                                                }
                                                res.render('ruta', {rutaUpdate, rutas, aviones, aeropuertos, diasSemana})
                                            }
                                        })
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
                res.write('<script>');
                res.write('alert("Ruta '+req.params.id+' modificada exitosamente");');
                res.write("window.location.href='/ruta/';");
                res.write('</script>');
                res.end();
            }
        })
    }
})

router.post('/delete/:id', (req, res) => {
    if(!!req.params.id){
        rutaController.deleteRuta(req.params.id, (err) => {
            if(err){
                res.write('<script>');
                res.write('alert("No se pudo eliminar la ruta '+req.params.id+'.");');
                res.write("window.location.href='/ruta/';");
                res.write('</script>');
                res.end();
            }else{
                res.write('<script>');
                res.write('alert("Ruta '+req.params.id+' eliminada exitosamente");');
                res.write("window.location.href='/ruta/';");
                res.write('</script>');
                res.end();
            }
        })
    }
})

router.post('/updateDias/:id', (req, res) => {
    if(!!req.params.id && !!req.body){

        if(!!req.body.DiasSemana){

            var diasSemana = req.body.DiasSemana;
            console.log(diasSemana)

            diaSemanaRutaController.getDSRutasUpdate(req.params.id, (DSRutasUpdate, err) => {
                if (err){
                    res.json({
                        success: false,
                        msg: 'Fallo al buscar los días de la semana programados para la ruta'
                    })
                }else{
                    var cont = 0;
                    var parametros = {IdRuta: req.params.id, DiasSemana: ''}

                    // Se eliminan los días que no estén en el conjunto de días que trae el formulario a actualizar
                    for (let i = 0; i < DSRutasUpdate.length; i++) {
                        for (let j = 0; j < diasSemana.length; j++) {
                            console.log(diasSemana[j])
                            console.log(DSRutasUpdate[i].DiasSemana)
                            if(DSRutasUpdate[i].DiasSemana == diasSemana[j]) cont++
                        }
                        console.log('cont'+cont)
                        if(cont == 0){
                            parametros.DiasSemana = DSRutasUpdate[i].DiasSemana;
                            console.log(parametros)
                            diaSemanaRutaController.deleteDSRuta( parametros, (err) => {
                                if(err){
                                    res.json({
                                        success: false,
                                        msg: `Fallo al eliminar el día ${parametros.DiasSemana} de la ruta ${parametros.IdRuta}`
                                    }) 
                                }else{
                                    // continua ....
                                }
                            })
                        }
                        cont = 0;
                    }

                    for (let i = 0; i < diasSemana.length; i++) {
                        for (let j = 0; j < DSRutasUpdate.length; j++) {
                            if(diasSemana[i] == DSRutasUpdate[j].DiasSemana) cont++
                        }
                        if(cont == 0){
                            parametros.DiasSemana = diasSemana[i];
                            diaSemanaRutaController.createDSRuta(parametros, (err) => {
                                if(err){
                                    res.json({
                                        success: false,
                                        msg: `Fallo al agregar el día ${parametros.DiasSemana} a la ruta ${parametros.IdRuta}`
                                    }) 
                                }else{
                                    // continua ....
                                }
                            })
                        }
                        cont = 0;
                    }

                    res.write('<script>');
                    res.write('alert("Dias actualizados con exito");');
                    res.write("window.location.href='/ruta/"+req.params.id+"';");
                    res.write('</script>');
                    res.end();
                } 
            })
        }else{
            res.write('<script>');
            res.write('alert("Debe estar seleccionado al menos un dia de la semana para poder actualizar los dias programados de la ruta '+req.params.id+', la ruta siempre debe tener dias programados");');
            res.write("window.location.href='javascript:history.back(1)';");
            res.write('</script>');
            res.end();
        }

    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        if(req.body.Origen == req.body.Destino){
            res.write('<script>');
            res.write('alert("El origen y destino para una ruta no pueden ser iguales");');
            res.write("window.location.href='javascript:history.back(1)';");
            res.write('</script>');
            res.end();
        }else{
            if(!req.body.DiasSemana){
                res.write('<script>');
                res.write('alert("Debe seleccionar al menos un dia de la semana para asignarselo a la ruta, la ruta siempre debe tener días programados");');
                res.write("window.location.href='javascript:history.back(1)';");
                res.write('</script>');
                res.end();
            }else{
                rutaController.createRuta( req.body, (err) => {
                    if(err){
                        res.write('<script>');
                        res.write('alert("Ya existe una ruta con exactamente el mismo origen y destino que acaba de seleccionar, '+req.body.Origen+' - '+req.body.Destino+'.");');
                        res.write("window.location.href='javascript:history.back(1)';");
                        res.write('</script>');
                        res.end();
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

                                var EstatusAvion = 'En Ruta'
                                avionController.updateEstatusAvion(req.body.IdAvion, EstatusAvion, (err) => {
                                    if(err){
                                        res.json({
                                            success: false,
                                            msg: `Fallo al setear el estatus del avion`
                                        }) 
                                    }
                                })

                                res.write('<script>');
                                res.write('alert("¡Ruta creada exitosamente!");');
                                res.write("window.location.href='/ruta/';");
                                res.write('</script>');
                                res.end();
                            }
                        })
                    }
                })
            }
        }
    }
})

router.get('/ruta/:id');

module.exports = router;