const Op = require('sequelize').Op;
var sequelize = require('../../sequelize');
var Usuario = sequelize.Usuario;
var bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

exports.cadastrarUsuario = function(req, res) {
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
				[Op.or]: [{
					apelido: data.apelido
				}, {
					email: data.email
				}],
			},
		})
		.then(usuario => {
			if (usuario != null) {
				if (usuario.apelido == data.apelido) {
					console.log('apelido já cadastrado');
					res.json('apelido já cadastrado');
				}
				if (usuario.email == data.email) {
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
							console.log('usuario ' + data.apelido + ' criado no db');
							res.status(200).send({
								message: 'usuario ' + data.apelido + ' criado'
							});
						});
					});
			}
		})
		.catch(err => {
			console.log('problem communicating with db');
			res.status(500).json(err);
		});
};

exports.loginUsuario = function(req, res) {
	const req_senha = req.body.senha;
	const req_email = req.body.email;

	Usuario.findOne({
			where: {
				email: req_email
			},
		})
		.then(usuario => {
			if (usuario == null) {
				console.log('email não cadastrado');
				res.json('email não cadastrado');
			} else {
				hash = usuario.senha;
				bcrypt.compare(req_senha, hash, function(err, resp) {
					if (resp) {
						console.log('Login autorizado - usuario de email' + req_email);
						res.status(200).json(usuario);
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

exports.getAllUsuarios = function(req, res) {
	Usuario.findAll()
		.then(usuarios => {
			if (usuarios == null) {
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

exports.getUsuario = function(req, res) {
	const req_apelido = req.params.apelido;
	Usuario.findOne({
			where: {
				apelido: req_apelido
			},
		})
		.then(usuario => {
			if (usuario == null) {
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

exports.getAllUsuarios = function(req, res) {
	Usuario.findAll()
		.then(usuarios => {
			if (usuarios == null) {
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

exports.mudarApelido = function(req, res) {
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
			if (usuario != null) {
				console.log('Apelido ja existe');
				res.json('Apelido ja existe');
			} else {
				Usuario.update({
					apelido: apelido_novo
				}, {
					where: {
						apelido: apelido_antigo
					}
				}).then(() => {
					res.status(200).json({
						message: 'usuario com apelido ' + apelido_antigo +
							' mudou seu apelido para ' + apelido_novo
					});
				});
			}
		})
		.catch(err => {
			console.log('problem communicating with db ' + err);
			res.status(500).json(err);
		});
};

exports.mudarEmail = function(req, res) {
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
			if (usuario != null) {
				console.log('email ja cadastrado');
				res.json('email ja cadastrado');
			} else {
				Usuario.update({
					email: email_novo
				}, {
					where: {
						email: email_antigo
					}
				}).then(() => {
					res.status(200).json({
						message: 'usuario com email ' + email_antigo +
							' mudou seu email para ' + email_novo
					});
				});
			}
		})
		.catch(err => {
			console.log('problem communicating with db ' + err);
			res.status(500).json(err);
		});
};

exports.mudarSenha = function(req, res) {
	const data = {
		apelido: req.body.apelido,
		senha_atual: req.body.senha_atual,
		senha_nova: req.body.senha_nova
	};

	if (data.senha_nova == '' || data.senha_atual == '' || data.apelido == '') {
		res.json('Forneça todos os dados necessários!');
	}

	Usuario.findOne({
			attributes: ['senha'],
			where: {
				apelido: data.apelido
			},
		})
		.then(usuario => {
			if (usuario == null) {
				console.log('apelido não cadastrado');
				res.json('apelido não cadastrado');
			} else {
				hash = usuario.senha;
				bcrypt.compare(data.senha_atual, hash, function(err, resp) {
					if (resp) {
						console.log('senha atual confere');
						bcrypt
							.hash(data.senha_nova, BCRYPT_SALT_ROUNDS)
							.then(function(hashedPassword) {
								Usuario.update({
									senha: hashedPassword
								}, {
									where: {
										apelido: data.apelido
									}
								}).then(() => {
									res.status(200).json({
										message: 'senha do usuario ' + data.apelido + ' modificada'
									});
								});
							})

					} else {
						console.log('senha atual incorreta');
						res.json('senha atual incorreta');
					}
				});
			}
		})
		.catch(err => {
			console.log('problem communicating with db');
			res.status(500).json(err);
		});

	bcrypt
		.hash(data.senha_antiga, BCRYPT_SALT_ROUNDS)
		.then(function(hashedPassword) {
			Usuario.findOne({
					attributes: ['apelido', 'senha'],
					where: {
						[Op.and]: [{
							apelido: data.apelido
						}, {
							senha: hashedPassword
						}],
					},
				})
				.then(usuario => {
					if (usuario != null) {
						console.log('email ja cadastrado');
						res.json('email ja cadastrado');
					} else {
						Usuario.update({
							email: email_novo
						}, {
							where: {
								email: email_antigo
							}
						}).then(() => {
							res.status(200).json({
								message: 'usuario com email ' + email_antigo +
									' mudou seu email para ' + email_novo
							});
						});
					}
				}).catch(err => {
					console.log('problem communicating with db ' + err);
					res.status(500).json(err);
				});
		});
};

exports.mudarCategorias = function(req, res) {
	const data = {
		apelido: req.body.apelido,
		favorita1: req.body.categoria_favorita1,
		favorita2: req.body.categoria_favorita2,
		favorita3: req.body.categoria_favorita3
	};

	if (data.apelido == '') {
		res.json('Informe o apelido!');
	}

	Usuario.findOne({
			attributes: ['apelido'],
			where: {
				apelido: data.apelido
			},
		})
		.then(usuario => {
			if (usuario == null) {
				console.log('Apelido não cadastrado');
				res.json('Apelido não cadastrado');
			} else {
				Usuario.update({
					categoria_favorita1: data.favorita1,
					categoria_favorita2: data.favorita2,
					categoria_favorita3: data.favorita3
				}, {
					where: {
						apelido: data.apelido
					}
				}).then(() => {
					res.status(200).json({
						message: 'categorias do usuario ' + data.apelido + ' atualizadas.'
					});
				});
			}
		})
		.catch(err => {
			console.log('problem communicating with db ' + err);
			res.status(500).json(err);
		});
}

exports.deleteUsuario = function(req, res) {
	const req_apelido = req.params.apelido;
	Usuario.findOne({
			where: {
				apelido: req_apelido
			},
		})
		.then(usuario => {
			if (usuario == null) {
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
