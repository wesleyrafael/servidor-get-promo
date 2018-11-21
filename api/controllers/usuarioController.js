const Op = require('sequelize').Op;
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
    permissao: req.body.permissao,
    favorita1: req.categoria_favorita1,
    favorita2: req.categoria_favorita2,
    favorita3: req.categoria_favorita3
  };
  if (data.permissao === '' || data.email === '' || data.senha === '' || data.nome === '' || data.apelido == '') {
    res.json('Dados incompletos!');
  }
  Usuario.findOne({
    where: {
      [Op.or]: [{apelido: data.apelido},{email: data.email}],
    },
  })
  .then(usuario => {
    if (usuario != null) {
      if(usuario.apelido == data.apelido){
        console.log('apelido já cadastrado');
        res.json('apelido já cadastrado');
      }
      if(usuario.email == data.email){
        console.log('email já cadastrado');
        res.json('email já cadastrado');
      }
    } else {
      bcrypt
      .hash(data.senha, BCRYPT_SALT_ROUNDS)
      .then(function(hashedPassword) {
        Usuario.create({
          apelido: data.apelido,
          nome: data.nome,
          senha: hashedPassword,
          email: data.email,
          foto: data.foto,
          permissao: data.permissao,
          categoria_favorita1: data.favorita1,
          categoria_favorita2: data.favorita2,
          categoria_favorita3: data.favorita3
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
  const req_senha = req.body.senha;
  const req_email = req.body.email;

  Usuario.findOne({
    attributes: ['senha'],
    where: {
      email: req_email
    },
  })
  .then(usuario => {
    if (usuario == null){
      console.log('email não cadastrado');
      res.json('email não cadastrado');
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

exports.mudarApelido = function (req, res) {
  const apelido_antigo = req.body.apelido_antigo;
  const apelido_novo = req.body.apelido_novo;
  if (apelido_novo == '') {
    res.json('Dados incompletos!');
  }

  Usuario.findOne({
    attributes: ['apelido'],
    where: {
      apelido: apelido_novo
    },
  })
  .then(usuario => {
    if (usuario != null){
      console.log('Apelido ja existe');
      res.json('Apelido ja existe');
    }
    else{
      Usuario.update(
        {apelido: apelido_novo},
        {where: {apelido: apelido_antigo}}
      ).then(() =>{
        res.status(200).json({message: 'usuario com apelido ' + apelido_antigo +
                                       ' mudou seu apelido para ' + apelido_novo});
      });
    }
  })
  .catch(err => {
    console.log('problem communicating with db ' + err);
    res.status(500).json(err);
  });
};

exports.mudarEmail = function (req, res) {
  const email_antigo = req.body.email_antigo;
  const email_novo = req.body.email_novo;
  if (email_novo == '') {
    res.json('Dados incompletos!');
  }

  Usuario.findOne({
    attributes: ['email'],
    where: {
      email: email_novo
    },
  })
  .then(usuario => {
    if (usuario != null){
      console.log('email ja cadastrado');
      res.json('email ja cadastrado');
    }
    else{
      Usuario.update(
        {email: email_novo},
        {where: {email: email_antigo}}
      ).then(() =>{
        res.status(200).json({message: 'usuario com email ' + email_antigo +
                                       ' mudou seu email para ' + email_novo});
      });
    }
  })
  .catch(err => {
    console.log('problem communicating with db ' + err);
    res.status(500).json(err);
  });
};

/*exports.updateUsuario = function (req,res){};*/

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
