const express = require('express');
const router = express.Router();
const airportController = require('../controllers/airportController');
const pistaController = require('../controllers/pistaController');


router.get('/', (req, res) => {
    airportController.getAirports((airports, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Failed to show airports'
            });
        }else{
          pistaController.getPistas((pistas, err) => {
            if(err){
              res.json({
                success: false,
                msg: 'Failed to get pistas'
              });
            }else{
              res.render('airport', {pistas, airports});
            }
          });
        }    
    });
});

router.get('/show/:id', (req, res) => {
  if(!!req.params.id){
    airportController.getAirportsUpdate( req.params.id, (airportsUpdate, err) => {
      if (err){
          res.json({
              success: false,
              msg: 'Failed to show airportsUpdate'
          });
      }else{
        airportController.getAirports((airports, err) => {
          if (err){
              res.json({
                  success: false,
                  msg: 'Failed to show airports'
              });
          }else{
            pistaController.getPistas((pistas, err) => {
              if(err){
                res.json({
                  success: false,
                  msg: 'Failed to get pistas'
                });
              }else{
                res.render('airport', {pistas, airports, airportsUpdate});
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
      airportController.deleteAirport(req.params.id, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to delete airport'
          });
        else
          res.redirect('/airport/');
      });
    }
});

router.post("/delete/pista/:id", (req, res) => {
  if (!!req.params.id) {
    pistaController.deletePista(req.params.id, (err) => {
      if (err)
        res.json({
          success: false,
          msg: 'Failed to delete pista'
        });
      else
        res.redirect('/airport/');
    });
  }
});

router.post("/create", (req, res) => {
    console.log(req.body);
    if (!!req.body) {
      airportController.createAirport(req.body, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to create airport'
          });
        else
          res.redirect('/airport/');
      });
    }
});

router.post("/show/update/:id", (req, res) => {
  if (!!req.body) {
    airportController.updateAirport(req.body, req.params.id, (err) => {
      if (err)
          res.json({
            success: false,
            msg: 'Failed to update airport ... '
          });
        else
          res.redirect('/airport/');
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
          msg: 'Failed to add pista'
        });
      else
        res.redirect('/airport/');
    });
  }
});

router.get('/airport/:id');
router.get('/airport/pista/:id');

module.exports = router;