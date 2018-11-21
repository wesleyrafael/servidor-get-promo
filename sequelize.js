var Sequelize = require('sequelize');
var UsuarioModel = require('./api/models/usuario');
var AnuncioModel = require('./api/models/anuncio');
var CategoriaModel = require('./api/models/categoria');
var CategoriaAnuncioModel = require('./api/models/categoria_anuncio');

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
const CategoriaAnuncio = CategoriaAnuncioModel(sequelize,Sequelize);

Usuario.hasMany(Anuncio, {
  foreignKey: 'apelido_anunciante',
  targetKey: 'apelido'
});

Categoria.hasMany(Usuario, {
  foreignKey: 'categoria_favorita1',
  targetKey: 'nome_categoria'
});

Categoria.hasMany(Usuario, {
  foreignKey: 'categoria_favorita2',
  targetKey: 'nome_categoria'
});

Categoria.hasMany(Usuario, {
  foreignKey: 'categoria_favorita3',
  targetKey: 'nome_categoria'
});

Anuncio.belongsToMany(Categoria, {
  through: CategoriaAnuncio,
  foreignKey: 'anuncio_id',
  targetKey: 'anuncio_id'
});

Categoria.belongsToMany(Anuncio, {
  through: CategoriaAnuncio,
  foreignKey: 'nome_categoria',
  targetKey: 'nome_categoria'
});

sequelize.sync()
    .then(() => {
      console.log('Users db and user table have been created')
    });

module.exports = {Usuario, Anuncio, Categoria, CategoriaAnuncio};
