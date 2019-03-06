const express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');


router.get('/', (req, res) => {
    modeloController.getModelos((modelos, err) => {
        if (err){
            res.json({
                success: false,
                msg: 'Fallo al mostrar Modelos'
            });
        }else{
            res.render('modelo', {modelos})
        }    
    });
});

router.get('/:id', (req, res) => {
    if(!!req.params.id){
        modeloController.getModeloUpdate(req.params.id, (modeloUpdate, err) => {
            if(err){
                res.json({
                    success: false,
                    msg: 'Fallo al buscar el modelo a modificar'
                })
            }else{
                modeloController.getModelos((modelos, err1) => {
                    if(err1){
                        res.json({
                            success: false,
                            msg: 'Fallo al obtener modelos'
                        })
                    }else{
                        res.render('modelo', {modelos, modeloUpdate})
                    }
                })
            }
        })
    }
});

router.post('/update/:id', (req, res) => {
    if(!!req.params.id){
        modeloController.updateModelo( req.body, req.params.id, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al modificar el modelo ${req.body.Nombre}`
                })
            }else{
                res.redirect('/modelo/');
            }
        })
    }
})

router.post('/create', (req, res) => {
    if(!!req.body){
        modeloController.createModelo( req.body, (err) => {
            if(err){
                res.json({
                    success: false,
                    msg: `Fallo al crear el modelo`
                })
            }else{
                res.redirect('/modelo/');
            }
        })
    }
})

router.get('/modelo/:id');

module.exports = router;