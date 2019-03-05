const express = require('express');
const router = express.Router();
const aeropuertoController = require('../controllers/aeropuertoController');
const pistaController = require('../controllers/pistaController');


router.get('/', (req, res) => {
  aeropuertoController.getAeropuertos((aeropuertos, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al mostrar Aeropuertos'
            });
        }else{
          pistaController.getPistas((pistas, err) => {
            if(err){
              res.json({
                success: false,
                msg: 'Fallo al mostrar pistas'
              });
            }else{
              res.render('aeropuerto', {pistas, aeropuertos});
            }
          });
        }    
    });
});

router.get('/show/:id', (req, res) => {
  if(!!req.params.id){ //Parámetro que estoy recibiendo por el url,
                      //en este caso el CodigoIATA del aeropuerto a modificar
                      
    aeropuertoController.getAeropuertosUpdate( req.params.id, (aeropuertosUpdate, err) => {
      if (err){
          res.json({
              success: false,
              msg: 'Fallo al mostrar el aeropuerto a modificar'
          });
      }else{
        aeropuertoController.getAeropuertos((aeropuertos, err) => {
          if (err){
              res.json({
                  success: false,
                  msg: 'Fallo al mostrar aeropuetos'
              });
          }else{
            pistaController.getPistas((pistas, err) => {
              if(err){
                res.json({
                  success: false,
                  msg: 'Fallo al mostrar pistas'
                });
              }else{
                res.render('aeropuerto', {pistas, aeropuertos, aeropuertosUpdate});
              }
            });
          }    
        });
      }    
  });
  }
});

router.get('/show/pista/::id1::id2', (req, res) => {
  console.log(req.params.id1);
  console.log(req.params.id2);
  if(!!req.params.id1 && !!req.params.id2){
    pistaController.getpistasUpdate( req.params, (pistasUpdate, err) => {
      if (err){
          res.json({
              success: false,
              msg: 'Fallo al mostrar la pista a modificar'
          });
      }else{
        aeropuertoController.getAeropuertos((aeropuertos, err) => {
          if (err){
              res.json({
                  success: false,
                  msg: 'Fallo al mostrar aeropuetos'
              });
          }else{
            pistaController.getPistas((pistas, err) => {
              if(err){
                res.json({
                  success: false,
                  msg: 'Fallo al mostrar pistas'
                });
              }else{
                res.render('aeropuerto', {pistas, aeropuertos, pistasUpdate});
              }
            });
          }    
        });
      }    
  });
  }
});


router.post("/delete/:id", (req, res) => {
    if (!!req.params.id) {
      aeropuertoController.deleteAeropuerto(req.params.id, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Fallo al eliminar aeropuerto'
          });
        else
          res.redirect('/aeropuerto/');
      });
    }
});

router.post("/delete/pista/::id1::id2", (req, res) => {
  if (!!req.params.id1 && !!req.params.id2) {
    pistaController.deletePista(req.params, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Fallo al eliminar pista'
        });
      else
        res.redirect('/aeropuerto/');
    });
  }
});

router.post("/create", (req, res) => {
    console.log(req.body);
    if (!!req.body) {
      aeropuertoController.createAeropuerto(req.body, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Fallo al crear aeropuerto'
          });
        else
          res.redirect('/aeropuerto/');
      });
    }
});

router.post("/show/update/:id", (req, res) => {
  if (!!req.body) {
    aeropuertoController.updateAeropuerto(req.body, req.params.id, (err) => {
      if (err)
          res.json({
            success: false,
            msg: 'Fallo al modificar aeropuerto ... '
          });
        else
          res.redirect('/aeropuerto/');
    });
  }
});

router.post("/show/pista/update/::id1::id2", (req, res) => {
  if (!!req.body) {
    pistaController.updatePista(req.body, req.params, (err) => {
      if (err)
          res.json({
            success: false,
            msg: 'Fallo al modificar pista ... '
          });
        else
          res.redirect('/aeropuerto/');
    });
  }
});

router.post("/agregarPista", (req, res) => {
  console.log(req.body);
  if (!!req.body) {
    pistaController.createPista(req.body, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Fallo al agregar pista al aeropuerto...'
        });
      else
        res.redirect('/aeropuerto/');
    });
  }
});

router.get('/aeropuerto/:id');
router.get('/aeropuerto/pista/:id');

module.exports = router;