var sequelize = require('../../sequelize');
var Categoria = sequelize.Categoria;

exports.cadastrarCategoria = function (req, res) {
    const data = {
      nome_categoria: req.body.nome_categoria
    };
    if (data.nome_categoria == '') {
      res.json('Informe o nome da categoria!');
    }
    Categoria.findOne({
      where: {
        nome_categoria: data.nome_categoria
      }
    })
      .then(categoria => {
        if (categoria != null) {
          console.log('Categoria já existe');
          res.json('Categoria já existe');
        } else {
            Categoria.create({
              nome_categoria: data.nome_categoria
            }).then(() => {
              console.log('Categoria ' + data.nome_categoria + ' criada no db');
              res.status(200).send({ message: 'Categoria ' + data.nome_categoria + ' criada' });
            });
          }
      })
      .catch(err => {
        console.log('problem communicating with db');
        res.status(500).json(err);
      });
};

exports.getAllCategorias = function (req, res) {
  Categoria.findAll()
  .then(categorias => {
    if (categorias == null){
      console.log('nenhuma categoria cadastrada');
      res.json('nenhum categoria cadastrada');
    } else {
      res.json(categorias);
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });
};
