module.exports = function(app) {
  var anuncioController = require('../controllers/anuncioController');

  // todoList Routes
  app.route('/anuncio/cadastrarAnuncio')
    .post(anuncioController.cadastrarAnuncio);
};
