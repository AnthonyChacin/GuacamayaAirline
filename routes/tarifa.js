const express = require('express');
const router = express.Router();
const tarifaController = require('../controllers/tarifaController');


router.get('/', (req, res) => {
    tarifaController.getTarifas((tarifas, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al mostrar Tarifas'
            });
        }else{
            res.render('tarifa', {tarifas})
        }    
    });
});

router.get('/:id', (req, res) => {
    if(!!req.params.id){
        tarifaController.getTarifaUpdate(req.params.id, (tarifaUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar la tarifa a modificar'
                })
            }else{
                tarifaController.getTarifas((tarifas, err1) => {
                    if(err1){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener tarifas'
                        })
                    }else{
                        res.render('tarifa', {tarifas, tarifaUpdate})
                    }
                })
            }
        })
    }
});

router.post('/update/:id', (req, res) => {
    if(!!req.params.id){
        tarifaController.updateTarifa( req.body, req.params.id, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al modificar la tarifa ${req.params.id}`
                })
            }else{
                res.redirect('/tarifa/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        tarifaController.createTarifa( req.body, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al crear la tarifa`
                })
            }else{
                res.redirect('/tarifa/');
            }
        })
    }
})

router.get('/tarifa/:id');

module.exports = router;