module.exports = function(app) {
  var usuarioController = require('../controllers/usuarioController');

  app.route('/usuario/cadastrarUsuario')
    .post(usuarioController.cadastrarUsuario);

  app.route('/usuario/login/')
    .post(usuarioController.loginUsuario);

  app.route('/usuario/getUsuario/:apelido')
    .get(usuarioController.getUsuario);

  app.route('/usuario/getAllUsuarios')
    .get(usuarioController.getAllUsuarios);

  app.route('/usuario/deleteUsuario/:apelido')
    .delete(usuarioController.deleteUsuario);

  /*app.route('/usuario/mudarApelido/:apelidoAntigo')
    .put(usuarioController.mudarApelido);*/


};
