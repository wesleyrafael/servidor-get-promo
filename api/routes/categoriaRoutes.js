module.exports = function(app) {
  var categoriaController = require('../controllers/categoriaController');

  app.route('/categoria/cadastrarCategoria')
    .post(categoriaController.cadastrarCategoria);

  app.route('/categoria/listarCategorias')
    .get(categoriaController.getAllCategorias);
};
