module.exports = function(app) {
  var categoriaController = require('../controllers/categoriaController');

  // todoList Routes
  app.route('/categoria/cadastrarCategoria')
    .post(categoriaController.cadastrarCategoria);

  app.route('/categoria/listarCategorias')
    .get(categoriaController.getAllCategorias);
};
