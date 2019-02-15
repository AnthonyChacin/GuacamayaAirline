require('dotenv').config({ path: 'variables.env'});
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const routeIndex = require("./routes/index");
const routeAirport = require("./routes/airport");
const routeFlight = require("./routes/flight");
const routeCustomer = require("./routes/customer");
const routeReservation = require("./routes/Reservation");
const sequelize = require("./config/database");
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( '/', routeIndex);
app.use( '/airport', routeAirport);
app.use('/flight', routeFlight);
app.use('/customer', routeCustomer);
app.use('/reservation', routeReservation);

sequelize.authenticate().then(value => value).catch(err => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

sequelize.sync({logging: false});

app.set('port', process.env.PORT || 8081);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port} 🔥`);
})