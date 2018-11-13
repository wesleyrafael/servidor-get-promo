var sequelize = require('../../sequelize');
var Usuario = sequelize.Usuario;
var bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

exports.cadastrarUsuario = function (req, res) {
    const data = {
      apelido: req.body.apelido,
      nome: req.body.nome,
      senha: req.body.senha,
      email: req.body.email,
      foto: req.body.foto,
      permissao: req.body.permissao
    };
    if (data.permissao === '' || data.email === '' || data.senha === '' || data.nome === '' || data.apelido == '') {
      res.json('Dados incompletos!');
    }
    Usuario.findOne({
      where: {
        apelido: data.apelido, //adicionar funcionalidade de checar email
      },
    })
      .then(usuario => {
        if (usuario != null) {
          console.log('apelido já existe');
          res.json('Apelido já existe');
        } else {
          bcrypt
            .hash(data.senha, BCRYPT_SALT_ROUNDS)
            .then(function(hashedPassword) {
              Usuario.create({
                apelido: req.body.apelido,
                nome: req.body.nome,
                senha: req.body.senha, //hashedPassword
                email: req.body.email,
                foto: req.body.foto,
                permissao: req.body.permissao
              }).then(() => {
                console.log('usuario criado no db');
                res.status(200).send({ message: 'usuario criado' });
              });
            });
        }
      })
      .catch(err => {
        console.log('problem communicating with db');
        res.status(500).json(err);
      });
  };
