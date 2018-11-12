var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan')

const app = express();
const API_PORT = process.env.API_PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));

require('./routes/cadastrarUsuario')(app);

app.listen(API_PORT);

console.log('Listening on port ' + API_PORT);

module.exports = app;


/*var express = require('express'),
app = express(),
port = process.env.PORT || 8080;

app.listen(port);

var Sequelize = require('sequelize')
  , sequelize = new Sequelize('getpromoDB', 'getPromo', 'getPromo2018', {
      host: 'localhost'
      dialect: 'sqlite', // or 'sqlite', 'postgres', 'mariadb'
      port: 3306, // or 5432 (for postgres)

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      storage: './db/get-promoDB.sqlite'
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });*/
