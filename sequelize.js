var Sequelize = require('sequelize');
var UsuarioModel = require('./models/usuario');
var AnuncioModel = require('./models/anuncio');

const sequelize = new Sequelize('getPromoDB','getpromo','getpromo2018',{
  host: 'localhost',
  dialect: 'sqlite', // or 'sqlite', 'postgres', 'mariadb'
  port: 3306, // or 5432 (for postgres)

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: './db/get-promoDB.sqlite'
})

const Usuario = UsuarioModel(sequelize,Sequelize);
const Anuncio = AnuncioModel(sequelize,Sequelize);

sequelize.sync()
    .then(() => {
      console.log('Users db and user table have been created')
    });

module.exports = {Usuario, Anuncio};
