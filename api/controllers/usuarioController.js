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
          apelido: data.apelido,
          nome: data.nome,
          senha: hashedPassword, //req.body.senha
          email: data.email,
          foto: data.foto,
          permissao: data.permissao
        }).then(() => {
          console.log('usuario '+ data.apelido + ' criado no db');
          res.status(200).send({ message: 'usuario '+ data.apelido + ' criado' });
        });
      });
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });
};

exports.loginUsuario = function (req, res) {
  const req_apelido = req.body.apelido;
  const req_senha = req.body.senha;

  Usuario.findOne({
    attributes: ['senha'],
    where: {
      apelido: req_apelido
    },
  })
  .then(usuario => {
    if (usuario == null){
      console.log('usuario nao existe');
      res.json('usuario nao existe');
    } else {
      hash = usuario.senha;
      bcrypt.compare(req_senha, hash, function(err, resp) {
      if(resp) {
        console.log('OK');
        res.json('OK');
      } else {
        console.log('senha incorreta');
        res.json('senha incorreta');
      }
      });
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });
};

exports.getAllUsuarios = function (req, res) {
  Usuario.findAll()
  .then(usuarios => {
    if (usuarios == null){
      console.log('nenhum usuario cadastrado');
      res.json('nenhum usuario cadastrado');
    } else {
      res.json(usuarios);
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });
};

exports.getUsuario = function (req, res) {
  const req_apelido = req.params.apelido;
  Usuario.findOne({
    where: {
      apelido: req_apelido
    },
  })
  .then(usuario => {
    if (usuario == null){
      console.log('usuario nao existe');
      res.json('Usuario nao existe');
    } else {
      res.json(usuario);
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });
};

exports.getAllUsuarios = function (req, res) {
  Usuario.findAll()
  .then(usuarios => {
    if (usuarios == null){
      console.log('nenhum usuario cadastrado');
      res.json('nenhum usuario cadastrado');
    } else {
      res.json(usuarios);
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });
};

/*exports.mudarApelido = function (req, res) {
  const apelido_antigo = req.params.apelidoAntigo;
  const apelido_novo = req.body.apelido_novo;
  if (apelido_novo == '') {
    res.json('Dados incompletos!');
  }

  Usuario.findOne({
    where: {
      apelido: apelido_novo
    },
  })
  .then(usuario => {
    if (usuario =! null){
      console.log('Apelido ja existe');
      res.json('Apelido ja existe');
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });

  Usuario.findOne({
    where: {
        apelido: apelido_antigo
      },
    })
    .then(usuario_att => {
      usuario_att.update({apelido: apelido_novo});
      console.log('usuario ' + apelido_antigo + ' agora é ' + apelido_novo);
      res.json('usuario ' + apelido_antigo + ' agora é ' + apelido_novo);

    })
    .catch(err => {
      console.log('problem communicating with db');
      res.status(500).json(err);
    });;
};*/

exports.deleteUsuario = function (req, res) {
  const req_apelido = req.params.apelido;
  Usuario.findOne({
    where: {
      apelido: req_apelido
    },
  })
  .then(usuario => {
    if (usuario == null){
      console.log('usuario nao existe');
      res.json('Usuario nao existe');
    } else {
      usuario.destroy();
      console.log('usuario deletado');
      res.json('Usuario deletado');
    }
  })
  .catch(err => {
    console.log('problem communicating with db');
    res.status(500).json(err);
  });
};
