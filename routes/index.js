const express = require('express');
const router = express.Router();
const aeropuertoController = require('../controllers/aeropuertoController');
const vueloController = require('../controllers/vueloController');

var escalasOfertadas = [];

router.get('/', (req, res) => {
  aeropuertoController.getAeropuertos((aeropuertos, err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Fallo al obtener los aeropuertos'
      })
    } else {
      res.render('index', { aeropuertos });
    }
  })
});

router.post('/buscarOfertas', (req, res) => {
  if (!!req.body) {
    console.log(req.body)
    vueloController.getOfertasVuelos(req.body, (ofertasVuelos, err) => {
      if (err) {
        console.log(err)
        res.json({
          success: false,
          msg: 'Fallo al mostrar los vuelos ofertados'
        })
      } else {
        if (ofertasVuelos.length > 0) {
          res.render('index', { ofertasVuelos });
        } else {
          vueloController.getEscalas1(req.body, (escalas1, err) => {
            if (err) {
              console.log(err)
              res.json({
                success: false,
                msg: 'Fallo al obtener escala 1'
              })
            } else {
              var data = {Origen: '', Destino: req.body.Destino, FechaLlegada: ''}
              vueloController.getEscalas2(escalas1, data, (escalas, err) => {
                if (err) {
                  res.json({
                    success: false, 
                    msg: 'Fallo al obtener escalas totales'
                  })
                } else {
                  escalasOfertadas = []
                  for (let i = 0; i < escalas.length; i++) {
                    if(escalas[i][(escalas[i].length - 1)].Destino == req.body.Destino) escalasOfertadas.push(escalas[i])
                    console.log(escalas[i].length)
                  }
                  console.log(escalasOfertadas)
                  res.render('index', {escalasOfertadas})
                }
              })

            }
          })
        }
      }
    })
  }
})


router.get('/:id');

module.exports = router;