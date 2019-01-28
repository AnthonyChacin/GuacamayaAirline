const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const passageController = require('../controllers/passageController');
const customerController = require('../controllers/customerController');

const c = 0;

router.get('/', (req, res) => {
    reservationController.getReservations((reservations, err) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to show reservations'
            });
        } else {
            passageController.getPassages((passages, err) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'Failed to get passages'
                    });
                } else {
                    customerController.getCustomers((customers, err) => {
                        if(err){
                            res.json({
                                success: false,
                                msg: 'Failed to get customers'
                            });
                        }else{
                            res.render('reservation', {reservations, passages, customers});
                        }
                    })
                }
            })
        }
    });
});

router.post("/delete/:id", (req, res) => {
    if (!!req.params.id) {
        reservationController.deleteReservation(req.params.id, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to delete reservation'
          });
        else
          res.redirect('/reservation/');
      });
    }
});

router.post("/create", (req, res) => {
    console.log('Hello from routes!');
    console.log(req.body);
    if (!!req.body) {
        reservationController.createReservation(req.body, (err) => {
        if (err)
          res.json({
            success: false,
            msg: 'Failed to create reservation'
          });
        else
          res.redirect('/reservation/');
      });
    }
});

router.get('/reservation/:id');

module.exports = router;