const express = require('express');
const router = express.Router();
const aeropuertoController = require('../controllers/aeropuertoController');
const vueloController = require('../controllers/vueloController');
const pasajeController = require('../controllers/pasajeController');
const tarifaController = require('../controllers/tarifaController');
const reservaController = require('../controllers/reservaController');
const clienteController = require('../controllers/clienteController');
const rutaController = require('../controllers/rutaController');
const avionController = require('../controllers/avionController');
const personaController = require('../controllers/personaController');



var escalasOfertadas = [];

router.get('/', (req, res) => {
  aeropuertoController.getAeropuertos((aeropuertos, err) => {
    if (err) {
      res.json({
        success: false,
        msg: 'Fallo al obtener los aeropuertos'
      })
    } else {
      pasajeController.contarPasajes((numPasajes, err) => {
        console.log(numPasajes);
        if (err) {
          res.json({
            success: false,
            msg: 'Fallo al obtener los pasajes'
          })
        } else {
          vueloController.reportarSobreventas((sobreventas, err) => {
            if (err) {
              res.json({
                success: false,
                msg: 'Fallo al obtener las sobreventas'
              })
            } else {
              reservaController.getReservas((reservas, err) => {
                if (err) {
                  res.json({
                    success: false, 
                    msg: 'Fallo al traer las reservas'
                  })
                }else{
                  clienteController.getClientes((clientes, err) => {
                    if(err){
                      res.json({
                        success: false,
                        msg: 'Fallo al obtener clientes'
                      })
                    }else{
                      res.render('index', { aeropuertos, numPasajes, sobreventas, reservas, clientes});
                    }
                  })
                }
              })
            }
          })
          
        }
      });
    }
  })
});

router.post('/checkin/', (req, res) => {
  if(!!req.body){
    reservaController.getReservaParticular(req.body.IdReserva, (reserva, pasajes, err) => {
      if(err){
        console.log(err)
        res.json({
          success: false, 
          msg: 'Fallo al obtener reserva'
        })
      }else{
        res.render('index', {reserva, pasajes})
      }
    })
  }
})

router.post('/comprar/:id', (req, res) => {
  if(!!req.params.id){
    pasajeController.updateEstadoPasaje(req.params.id, (err) => {
      if(err){
        console.log(err)
        res.json({
          success: false, 
          msg: 'Fallo al comprar pasaje'
        })
      }else{
        res.redirect('/')
        //res.render('index', {reserva, pasajes})
      }
    })
  }
})

router.get('/buscarVuelo/:id-:id2', (req, res) => {
  if(!!req.params.id){
    vueloController.getVuelos((vuelos, err) => {
      if(err){
        res.json({
          success: false,
          msg: 'Fallo al obtener vuelos'
        })
      }else{
        rutaController.getRutas((rutas, err) => {
          if(err){
            res.json({
              success: false,
              msg: 'Fallo al obtener las rutas'
            })
          }else{
            var IdPasaje = req.params.id;
            var IdVueloReservado = req.params.id2
            res.render('index', {vuelos, rutas, IdPasaje, IdVueloReservado})
          }
        })
      }
    })
  }
})

router.post('/asignarVuelo/:id', (req, res) => {
  if(!!req.params.id){
    pasajeController.updateVueloAbordado(req.body.IdVueloAbordado,req.params.id, (err) => {
      if(err){
        console.log(err)
        res.json({
          success: false, 
          msg: 'Fallo al updatear pasaje'
        })
      }else{
        res.redirect('/')
        //res.render('index', {reserva, pasajes})
      }
    })
  }
})

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

router.post('/ganancias', (req,res) => {
  tarifaController.reportarGanancias(req.body.FechaInicio, req.body.FechaFin, (ganancias, err) => {
    if(err) {
      console.log(err)
      res.json({
        success: false,
        msg: 'Fallo al obtener ganancias de tarifas'
      })
    } else {
      console.log(ganancias);
      pasajeController.contarPasajes((numPasajes, err) => {
        if(err){
          res.json({
            success: false,
            msg: 'Fallo al obtener el número de pasajes'
          })
        }else{
          aeropuertoController.getAeropuertos((aeropuertos, err) => {
            if(err){
              res.json({
                success: false,
                msg: 'Fallo al obtener los aeropuertos'
              })
            }else{
              vueloController.reportarSobreventas((sobreventas, err) => {
                if (err) {
                  res.json({
                    success: false,
                    msg: 'Fallo al obtener las sobreventas'
                  })
                } else {
                  var FechaInicio = req.body.FechaInicio;
                  var FechaFin = req.body.FechaFin;
                  res.render('index', { ganancias, aeropuertos, numPasajes, sobreventas, FechaInicio, FechaFin })
                }
              })
            }
          })
        }
      })
    }
  })
})

router.post('/abordaje', (req,res) => {
  pasajeController.reportarAbordaje(req.body.ID_Vuelo, (porcAbordo, err) => {
    if(err) {
      console.log(err)
      res.json({
        success: false,
        msg: 'Fallo al obtener abordaje de pasajes'
      })
    } else {
      console.log(porcAbordo);
      pasajeController.contarPasajes((numPasajes, err) => {
        if(err){
          res.json({
            success: false,
            msg: 'Fallo al obtener el número de pasajes'
          })
        }else{
          vueloController.reportarSobreventas((sobreventas, err) => {
            if (err) {
              res.json({
                success: false,
                msg: 'Fallo al obtener las sobreventas'
              })
            } else {
              aeropuertoController.getAeropuertos((aeropuertos, err) => {
                if(err){
                  res.json({
                    success: false,
                    msg: 'Fallo al obtener los aeropuertos'
                  })
                }else{
                  
                  var ID_Vuelo = req.body.ID_Vuelo;
                  res.render('index', { porcAbordo, aeropuertos, sobreventas, numPasajes, ID_Vuelo});
                }
              })
            }
          })
          
        }
      })
    }
  })
})

router.post('/vuelosCharter', (req,res) => {
  vueloController.getVuelosCharter((vuelosCharter, err) => {
    if(err){
      console.log(err)
      res.json({
        success: false,
        msg: 'Fallo al mostrar los vuelos charter'
      })
    }else{
      res.render('index', {vuelosCharter})
    }
  })
})

router.post('/destinos_populares', (req,res) => {
  pasajeController.destinosPopulares((destinosPop, err) =>{
    if(err){
      console.log(err)
      res.json({
        success: false,
        msg: 'Fallo al obtener los destinos'
      })
    }else{
      res.render('index', { destinosPop })
    }
  })
})

router.post('/demograficas', (req,res) => {
  personaController.demograficas((demograficas, err) =>{
    if(err){
      console.log(err)
      res.json({
        success: false,
        msg: 'Fallo al obtener las demograficas'
      })
    }else{
      res.render('index', { demograficas })
    }
  })
})

router.post('/pesoAvion', (req,res) => {
  avionController.pesoPromedioDeAvion(req.body.ID_Avion, (pesoAvion, err) => {
    if(err) {
      console.log(err)
      res.json({
        success: false,
        msg: 'Fallo al obtener peso promedio de avion'
      })
    } else {
      console.log(pesoAvion);
      pasajeController.contarPasajes((numPasajes, err) => {
        if(err){
          res.json({
            success: false,
            msg: 'Fallo al obtener el número de pasajes'
          })
        }else{
          vueloController.reportarSobreventas((sobreventas, err) => {
            if (err) {
              res.json({
                success: false,
                msg: 'Fallo al obtener las sobreventas'
              })
            } else {
              aeropuertoController.getAeropuertos((aeropuertos, err) => {
                if(err){
                  res.json({
                    success: false,
                    msg: 'Fallo al obtener los aeropuertos'
                  })
                }else{
                  
                  var ID_Avion = req.body.ID_Avion;
                  res.render('index', { pesoAvion, aeropuertos, sobreventas, numPasajes, ID_Avion});
                }
              })
            }
          })
          
        }
      })
    }
  })
})

module.exports = router;