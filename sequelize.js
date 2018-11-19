var Sequelize = require('sequelize');
var UsuarioModel = require('./api/models/usuario');
var AnuncioModel = require('./api/models/anuncio');
var CategoriaModel = require('./api/models/categoria');

const sequelize = new Sequelize('getPromoDB','getpromo','getpromo2018',{
  host: 'localhost',
  dialect: 'sqlite', // or 'sqlite', 'postgres', 'mariadb'
  port: 3306, // or 5432 (for postgres)
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: './db/get-promoDB.sqlite',
  timestamps: false
})

const Usuario = UsuarioModel(sequelize,Sequelize);
const Anuncio = AnuncioModel(sequelize,Sequelize);
const Categoria = CategoriaModel(sequelize,Sequelize);

Usuario.hasMany(Anuncio, {
  foreignKey: 'apelido_anunciante',
  targetKey: 'apelido'
});

/*Categoria.belongsToMany(Anuncio, {through: 'categoria_anuncio', foreignKey: 'nome_categoria'});
Anuncio.belongsToMany(Categoria, {through: 'categoria_anuncio', foreignKey: 'anuncio_id'});
*/
sequelize.sync()
    .then(() => {
      console.log('Users db and user table have been created')
    });

module.exports = {Usuario, Anuncio, Categoria};
