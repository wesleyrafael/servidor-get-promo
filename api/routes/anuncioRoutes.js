module.exports = function(app) {
  var anuncioController = require('../controllers/anuncioController');

  app.route('/anuncio/categorias/:id_categoria')
    .get(anuncioController.getAnuncioPorCategoria);

  app.route('/anuncio/cadastrarAnuncio')
    .post(anuncioController.cadastrarAnuncio);

  app.route('/anuncio/avaliar')
    .post(anuncioController.avaliarAnuncio);

  app.route('anuncio/:anuncio_id/avaliacoes')
    .get(anuncioController.getAvaliacoesDoAnuncio);
};
