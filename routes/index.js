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

router.get('/:idAirport');

module.exports = router;