module.exports = function(app) {
  var anuncioController = require('../controllers/usuarioController');

  // todoList Routes
  app.route('/usuario/cadastrarUsuario')
    .post(anuncioController.cadastrarUsuario);
};
