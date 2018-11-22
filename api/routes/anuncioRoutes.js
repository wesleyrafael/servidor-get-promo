module.exports = function(app) {
  var anuncioController = require('../controllers/anuncioController');

  // todoList Routes
  app.route('/anuncio/cadastrarAnuncio')
    .post(anuncioController.cadastrarAnuncio);

  app.route('/anuncio/categorias/:id_categoria')
    .get(anuncioController.getAnuncioPorCategoria);
};
