var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');

const app = express();
const API_PORT = process.env.API_PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

require('./api/routes/usuarioRoutes')(app);
require('./api/routes/anuncioRoutes')(app);
require('./api/routes/categoriaRoutes')(app);

app.listen(API_PORT);

console.log('Listening on port ' + API_PORT);
