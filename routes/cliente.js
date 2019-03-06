const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const personaController = require('../controllers/personaController');

router.get('/', (req, res) => {
    clienteController.getClientes( (clientes, err) => {
        if(err){
            res.json({
                success: false,
                msg: 'Fallo al mostrar Clientes'
            });
        }else{
            res.render('cliente', {clientes});
        }
    });
});


router.get('/:id', (req, res) => {
    if(!!req.params.id){ 
      clienteController.getClienteUpdate( req.params.id, (clienteUpdate, err) => {
        console.log(clienteUpdate);
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al buscar cliente a modificar'
            });
        }else{
            clienteController.getClientes((clientes, err) => {
                if (err){
                    res.json({
                        success: false,
                        msg: 'Fallo al mostrar clientes'
                    });
                }else{
                    res.render('cliente', {clientes, clienteUpdate});
                }    
          });
        }    
      });
    }
});

router.post("/update/:id", (req, res) => {
    if (!!req.body) {
      personaController.updatePersona(req.body, req.params.id, (err) => {
        if (err)
            res.json({
              success: false,
              msg: 'Fallo al modificar cliente ... '
            });
          else
            res.redirect('/cliente/');
      });
    }
});

router.post("/existe", (req, res) => {
    if(!!req.body){
        clienteController.getCliente( req.body, (respuesta, data, err) => {
            console.log(respuesta)
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar cliente'
                });
            }else if(respuesta == 1){
                res.redirect('/cliente/');
            }else if(respuesta == 0){
                var noExiste = true;
                clienteController.getClientes( (clientes, err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Fallo al mostrar Clientes'
                        });
                    }else{
                        var p = req.body.Pasaporte;
                        res.render('cliente', {noExiste, clientes, p});   
                    }
                });
            }else if(respuesta == 2){
                clienteController.createCliente(data, (err) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'Fallo al crear cliente'
                        });
                    }else{
                        res.redirect('/cliente/');
                    }
                });
            }
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
          clienteController.createCliente(IdPersona, (err) => {
              if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al crear cliente'
                });
              }else{
                res.redirect('/cliente/');
              }
          })
      });
    }
});

router.post("/delete/:id", (req, res) => {
    if (!!req.params.id) {
      clienteController.deleteCliente(req.params.id, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Fallo al eliminar cliente'
          });
        else
          res.redirect('/cliente/');
      });
    }
});

router.get('/cliente/:id');

module.exports = router;