var sequelize = require('../../sequelize');
var Anuncio = sequelize.Anuncio;

exports.cadastrarAnuncio = function (req, res) {
    const data = {
      id: req.body.id,
      apelido_anunciante: req.body.apelido_anunciante,
      descricao: req.body.descricao,
      data_criacao: req.body.data_criacao,
      data_expiracao: req.body.data_expiracao,
      local: req.body.local
    };
    if (data.local == '' || data.id === '' || data.apelido_anunciante === '' || data.descricao === '' || data.data_criacao === '' || data.data_expiracao == '') {
      res.json('Dados incompletos!');
    }
    Anuncio.findOne({
      where: {
        apelido_anunciante: data.apelido_anunciante,
        descricao: data.descricao,
        data_criacao: data.data_criacao,
        data_expiracao: data.data_expiracao,
        local: data.local
      }
    })
      .then(usuario => {
        if (usuario != null) {
          console.log('Anuncio já existe');
          res.json('Anuncio já existe');
        } else {
            Anuncio.create({
              id: req.body.id,
              apelido_anunciante: req.body.apelido_anunciante,
              descricao: req.body.descricao,
              data_criacao: req.body.data_criacao,
              data_expiracao: req.body.data_expiracao,
              local: req.body.local
            }).then(() => {
              console.log('anuncio criado no db');
              res.status(200).send({ message: 'anuncio criado' });
            });
          }
      })
      .catch(err => {
        console.log('problem communicating with db');
        res.status(500).json(err);
      });
  };
