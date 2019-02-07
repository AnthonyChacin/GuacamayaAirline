const express = require('express');
const router = express.Router();
const airportController = require('../controllers/airportController');


router.get('/', (req, res) => {
    airportController.getAirports((airports, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Failed to show airports'
            });
        }else{
            res.render('index', {airports});
        }    
    });
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
          res.redirect('/');
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
          res.redirect('/');
      });
    }
});

router.get('/:id');

module.exports = router;