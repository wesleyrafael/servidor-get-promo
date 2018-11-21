module.exports = function(app) {
  var usuarioController = require('../controllers/usuarioController');

  app.route('/usuario/cadastrarUsuario')
    .post(usuarioController.cadastrarUsuario);

  app.route('/usuario/deleteUsuario')
    .delete(usuarioController.deleteUsuario);

  app.route('/usuario/login/')
    .post(usuarioController.loginUsuario);

  app.route('/usuario/getUsuario/:apelido')
    .get(usuarioController.getUsuario);

  app.route('/usuario/listarUsuarios')
    .get(usuarioController.getAllUsuarios);

  app.route('/usuario/mudarApelido/')
    .put(usuarioController.mudarApelido);

  app.route('/usuario/mudarEmail/')
    .put(usuarioController.mudarEmail);

  app.route('/usuario/mudarSenha/')
    .put(usuarioController.mudarSenha);

  app.route('/usuario/mudarCategorias')
    .put(usuarioController.mudarCategorias);
};
