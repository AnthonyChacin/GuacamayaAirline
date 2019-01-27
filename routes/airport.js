const express = require('express');
const router = express.Router();
const airportController = require('../controllers/airportController');


router.get('/airport', (req, res) => {
    airportController.getAirports((airports, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Failed to show airports'
            });
        }else{
            res.render('airport', {airports});
        }    
    });
});

router.post("/airport/delete/:id", (req, res) => {
    if (!!req.params.id) {
      airportController.deleteAirport(req.params.id, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to delete airport'
          });
        else
          res.redirect('/airport');
      });
    }
});

router.post("/airport/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
      airportController.createAirport(req.body, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to create airport'
          });
        else
          res.redirect('/airport');
      });
    }
});

router.get('/airport/:id');

module.exports = router;