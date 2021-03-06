require('dotenv').config({ path: 'variables.env'});
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routeIndex = require("./routes/index");
const routeAeropuerto = require("./routes/aeropuerto");
const routePasaje = require("./routes/pasaje");
const routeCliente = require('./routes/cliente');
const routeEmpleado = require('./routes/empleado');
const routeModelo = require('./routes/modelo');
const routeTarifa = require('./routes/tarifa');
const routeProveedor = require('./routes/proveedor');
const routeAvion = require('./routes/avion');
const routeRuta = require('./routes/ruta');
const routeVuelo = require('./routes/vuelo');
const routeAlquilerAviones = require('./routes/alquilerAviones');
const routeMantenimiento = require('./routes/mantenimiento');
const sequelize = require("./config/database");
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routeIndex);
app.use('/aeropuerto', routeAeropuerto);
app.use('/pasaje', routePasaje);
app.use('/cliente', routeCliente);
app.use('/empleado', routeEmpleado);
app.use('/modelo', routeModelo);
app.use('/tarifa', routeTarifa);
app.use('/proveedor', routeProveedor);
app.use('/avion', routeAvion);
app.use('/ruta', routeRuta);
app.use('/vuelo', routeVuelo);
app.use('/alquilerAviones', routeAlquilerAviones);
app.use('/mantenimiento', routeMantenimiento);

sequelize.authenticate().then(value => value).catch(err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

sequelize.sync({logging: false});


//Instrucción a utilizar cuando haga deploy de la aplicación
app.set('port', process.env.PORT || 8080);

//Instrucción a utilizar mientras esté trabajando de manera local
//app.set('port', process.env.DB_PORT_APP || 8081);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port} 🔥`);
})