const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const airportController = require('../controllers/airportController');


router.get('/', (req, res) => {
    flightController.getFlights((flights, err) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to show flights'
            });
        } else {
            airportController.getAirports((airports, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to get airports'
                    });
                } else {
                    res.render('flight', { flights, airports });
                }
            })
        }
    });
});

router.post("/delete/:id", (req, res) => {
    if (!!req.params.id) {
        flightController.deleteFlight(req.params.id, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Failed to delete flight'
                });
            else
                res.redirect('/flight/');
        });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
      flightController.createFlight(req.body, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to create flight'
          });
        else
          res.redirect('/flight/');
      });
    }
});

router.get('/flight/:id');

module.exports = router;