const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');
const empleadoController = require('../controllers/empleadoController');
const personaController = require('../controllers/personaController');

router.get('/', (req, res) => {
    empleadoController.getEmpleados( (empleados, err) => {
        if(err){
            res.json({
                success: false,
                msg: 'Fallo al mostrar empleados'
            });
        }else{
            cargoController.getCargos( (cargos, err) => {
                if(err){
                    res.json({
                        success: false,
                        msg: 'Fallo al mostrar cargos de empleados'
                    })
                }else{
                    res.render('empleado', {empleados, cargos});
                }
            })
        }
    });
});

router.post("/update/:id", (req, res) => {
    if (!!req.body) {
      personaController.updatePersona(req.body, req.params.id, (err) => {
        if (err)
            res.json({
              success: false,
              msg: 'Fallo al modificar empleado en personas... '
            });
          else
            empleadoController.updateEmpleado(req.body, req.params.id, (err) => {
                if (err){
                    res.json({
                        success: false,
                        msg: 'Fallo al modificar empleado en empleado... '
                    });
                }else{
                    res.redirect('/empleado/');
                }
            })
      });
    }
});

router.post("/cargos/update/:id", (req, res) => {
    if (!!req.body) {
      cargoController.updateCargo(req.body, req.params.id, (err) => {
        if (err)
            res.json({
              success: false,
              msg: 'Fallo al modificar cargo'
            });
          else
            res.redirect('/empleado/');
      });
    }
});

router.get('/:id', (req, res) => {
    if(!!req.params.id){ 
      empleadoController.getEmpleadoUpdate( req.params.id, (empleadoUpdate, err) => {
        console.log(empleadoUpdate);
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al buscar empleado a modificar'
            });
        }else{
            empleadoController.getEmpleados((empleados, err) => {
                if (err){
                    res.json({
                        success: false,
                        msg: 'Fallo al mostrar empleados'
                    });
                }else{
                    cargoController.getCargos( (cargos, err) => {
                        if(err){
                            res.json({
                                success: false,
                                msg: 'Fallo al mostrar cargos de empleados'
                            })
                        }else{
                            res.render('empleado', {empleados, empleadoUpdate, cargos});
                        }
                    })
                }    
          });
        }    
      });
    }
});


router.get('/cargos/:id', (req, res) => {
    if(!!req.params.id){ 
      cargoController.getCargosUpdate( req.params.id, (cargoUpdate, err) => {
        console.log(cargoUpdate);
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al buscar el cargo a modificar'
            });
        }else{
            empleadoController.getEmpleados((empleados, err) => {
                if (err){
                    res.json({
                        success: false,
                        msg: 'Fallo al mostrar empleados'
                    });
                }else{
                    cargoController.getCargos( (cargos, err) => {
                        if(err){
                            res.json({
                                success: false,
                                msg: 'Fallo al mostrar cargos de empleados'
                            })
                        }else{
                            res.render('empleado', {empleados, cargoUpdate, cargos});
                        }
                    })
                }    
          });
        }    
      });
    }
});


router.post("/existe", (req, res) => {
    if(!!req.body){
        empleadoController.getEmpleado( req.body, (respuesta, data, err) => {

            console.log(respuesta)
            
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar empleado'
                });
            }else if(respuesta == 1){
                var a = 1;
                res.render('empleado', {a});
            }else if(respuesta == 0){
                var noExiste = true;
                empleadoController.getEmpleados( (empleados, err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Fallo al mostrar empleados'
                        });
                    }else{

                        var p = {Pasaporte: req.body.Pasaporte, Cargo: req.body.IdCargo};
                         
                        cargoController.getCargos( (cargos, err) => {
                            if(err){
                                res.json({
                                    success: false,
                                    msg: 'Fallo al mostrar cargos de empleados'
                                })
                            }else{
                                res.render('empleado', {noExiste, empleados, p, cargos});  
                            }
                        })

                    }
                });
            }else if(respuesta == 2){
                var data2 = {IdCargo: req.body.IdCargo, IdPersona1: data}
                empleadoController.createEmpleado(data2, (err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Fallo al crear empleado'
                        });
                    }else{
                        res.redirect('/empleado/');
                    }
                });
            }
        });
    }
});


router.post("/cargos/create", (req, res) => {
    console.log(req.body);
    if (!!req.body) {
      cargoController.createCargo(req.body, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Fallo al crear nuevo cargo'
          });
        else
          res.redirect('/empleado/');
      });
    }
});

router.post("/delete/:id", (req, res) => {
    if (!!req.params.id) {
      empleadoController.deleteEmpleado(req.params.id, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Fallo al eliminar empleado'
          });
        else
          res.redirect('/empleado/');
      });
    }
});

router.post("/create", (req, res) => {
    console.log(req.body);
    if (!!req.body) {
      personaController.createPersona(req.body, (IdPersona, err) => {
          console.log(IdPersona);
        if (err)
          res.json({
            success: false,
            msg: 'Fallo al crear persona'
          });
        else
          var data = {IdCargo: req.body.IdCargo, IdPersona1: IdPersona}
          empleadoController.createEmpleado(data, (err) => {
              if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al crear empleado'
                });
              }else{
                res.redirect('/empleado/');
              }
          })
      });
    }
});

router.get('/empleado/:id');

module.exports = router;
