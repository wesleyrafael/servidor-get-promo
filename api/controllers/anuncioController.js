var sequelize = require('../../sequelize');
var Anuncio = sequelize.Anuncio;
var Categoria = sequelize.Categoria;
var CategoriaAnuncio = sequelize.CategoriaAnuncio;

exports.getAnuncioPorCategoria = function (req, res) {
  const data = {
    categoria: req.params.categoria
  }

  Categoria.findOne({
    where: {
      nome_categoria: data.categoria
    }
  }).then(categoria => {
    if(categoria == null){
      console.log('a categoria ' + data.categoria + ' não existe');
      res.json('a categoria ' + data.categoria + ' não existe');
    }
    else{
      CategoriaAnuncio.findAll({
        attributes: ['anuncio_id'],
        where: {
          nome_categoria: data.categoria
        },
        raw: true
      })
      .then(ids => {
        if (ids == null){
          console.log('nenhum anuncio cadastrado nessa categoria');
          res.json('nenhum anuncio cadastrado nessa categoria');
        } else {

          var unpacked_ids = [];
          ids.forEach(function(an_id){
            console.log(an_id.anuncio_id);
            unpacked_ids.push(an_id.anuncio_id);
          });
          console.log(unpacked_ids);

          Anuncio.findAll({
            where: {
              anuncio_id: unpacked_ids
            }
          }).then(anuncios => {
            console.log('anuncios enviados');
            res.status(200).json(anuncios);
          });
        }

      });
    }
  }).catch(err => {
    console.log('problem communicating with db ' + err);
    res.status(500).json(err);
  });


};

exports.cadastrarAnuncio = function (req, res) {
    const data = {
      id: req.body.anuncio_id,
      apelido_anunciante: req.body.apelido_anunciante,
      descricao: req.body.descricao,
      data_criacao: req.body.data_criacao,
      data_expiracao: req.body.data_expiracao,
      local: req.body.local,
      categorias: [req.body.categoria1,req.body.categoria2,req.body.categoria3]
    };

    categoriasValidas = [];
    data.categorias.forEach(function(categoria){
      if(categoria != null){
        categoriasValidas.push(categoria);
      }
    })

    if (data.local == '' || data.id === '' || data.apelido_anunciante === '' ||
        data.descricao === '' || data.data_criacao === '' || data.data_expiracao == '') {
      res.json('Dados incompletos!');
    }
    var success_flag = 0;
    Anuncio.findOne({
      where: {
        apelido_anunciante: data.apelido_anunciante,
        descricao: data.descricao,
        data_criacao: data.data_criacao,
        data_expiracao: data.data_expiracao,
        local: data.local,
      }
    })
      .then(anuncio => {
        if (anuncio != null) {
          console.log('Anuncio já existe');
          res.json('Anuncio já existe');
        } else {
            Anuncio.create({
              anuncio_id: data.id,
              apelido_anunciante: data.apelido_anunciante,
              descricao: data.descricao,
              data_criacao: data.data_criacao,
              data_expiracao: data.data_expiracao,
              local: data.local
            }).then(() => {
              console.log('anuncio criado no db');

              categoriasValidas.forEach(function(categoria){
                CategoriaAnuncio.create({
                  anuncio_id: data.id,
                  nome_categoria: categoria
                });
              });

              res.status(200).send({message: 'anuncio criado no db'})
            });
          }
      })
      .catch(err => {
        console.log('problem communicating with db ' + err);
        res.status(500).json(err);
      });
};
