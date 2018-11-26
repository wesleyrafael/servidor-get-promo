var Sequelize = require('sequelize');
var UsuarioModel = require('./api/models/usuario');
var AnuncioModel = require('./api/models/anuncio');
var CategoriaModel = require('./api/models/categoria');
var CategoriaAnuncioModel = require('./api/models/categoria_anuncio');
var AvAnuncioModel = require('./api/models/avaliacao_anuncio');

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
const AvAnuncio = AvAnuncioModel(sequelize,Sequelize);

Usuario.hasMany(Anuncio, {
  foreignKey: 'apelido_anunciante',
  targetKey: 'apelido'
});

Categoria.hasMany(Usuario, {
  foreignKey: 'categoria_favorita1',
  targetKey: 'id_categoria'
});

Categoria.hasMany(Usuario, {
  foreignKey: 'categoria_favorita2',
  targetKey: 'id_categoria'
});

Categoria.hasMany(Usuario, {
  foreignKey: 'categoria_favorita3',
  targetKey: 'id_categoria'
});

Anuncio.belongsToMany(Categoria, {
  through: CategoriaAnuncio,
  foreignKey: 'anuncio_id',
  targetKey: 'anuncio_id'
});

Categoria.belongsToMany(Anuncio, {
  through: CategoriaAnuncio,
  foreignKey: 'id_categoria',
  targetKey: 'id_categoria'
});

Anuncio.hasMany(AvAnuncio, {
  foreignKey: 'anuncio_id',
  targetKey: 'anuncio_id'
});

Usuario.hasMany(AvAnuncio, {
  foreignKey: 'apelido_avaliador',
  targetKey: 'apelido'
});

sequelize.sync()
    .then(() => {
      console.log('Users db and user table have been created')
    });

module.exports = {Usuario, Anuncio, Categoria, CategoriaAnuncio};
