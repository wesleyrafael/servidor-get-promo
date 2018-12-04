var sequelize = require('../../sequelize');
var Anuncio = sequelize.Anuncio;
var Categoria = sequelize.Categoria;
var AvAnuncio = sequelize.AvAnuncio;

exports.getAvaliacoesDoAnuncio = function(req, res) {
	const an_id = req.params.anuncio_id;

	AvAnuncio.findAll({
			where: {
				anuncio_id: an_id
			}
		}).then(anuncios => {
			if (anuncios == null) {
				console.log('Anuncio sem avaliações!');
				res.json('Anuncio sem avaliações');
			} else {
				console.log('Avaliações enviadas');
				res.json(anuncios);
			}
		})
		.catch(err => {
			console.log('problem communicating with db');
			res.status(500).json(err);
		});
}

exports.avaliarAnuncio = function(req, res) {
	const data = {
		id_avaliacao: req.body.id_avaliacao,
		anuncio_id: req.body.anuncio_id,
		apelido_avaliador: req.body.apelido_avaliador,
		data_avaliacao: req.body.data_avaliacao,
		valor: req.body.valor,
		comentario: req.body.comentario
	}

	AvAnuncio.findOne({
			where: {
				apelido_avaliador: data.apelido_avaliador,
				anuncio_id: data.anuncio_id
			}
		}).then(avaliacao => {
			if (avaliacao != null) {
				console.log('Voce ja avaliou esse anuncio!');
				res.json('Voce ja avaliou esse anuncio!');
			} else {
				AvAnuncio.create({
					id_avaliacao: data.id_avaliacao,
					anuncio_id: data.anuncio_id,
					apelido_avaliador: data.apelido_avaliador,
					data_avaliacao: data.data_avaliacao,
					valor: data.valor,
					comentario: data.comentario
				}).then(() => {
					console.log('avaliacao cadastrada com sucesso!');
					res.status(200).send({
						message: 'avaliacao cadastrada com sucesso!'
					});
				})
			}
		})
		.catch(err => {
			console.log('problem communicating with db ' + err);
			res.status(500).json(err);
		});

}

exports.getAnuncioPorCategoria = function(req, res) {
	const data = {
		id_categoria: req.params.id_categoria
	}

	Categoria.findOne({
		where: {
			id_categoria: data.id_categoria
		}
	}).then(id_categoria => {
		if (id_categoria == null) {
			console.log('a categoria fornecida não existe');
			res.json('a categoria fornecida não existe');
		} else {
			Anuncio.findAll({
				where: {
					anuncio_id: data.id_categoria
				}
			}).then(anuncios => {
				console.log('anuncios enviados');
				res.status(200).json(anuncios);
			});
		}
		}).catch(err => {
			console.log('problem communicating with db ' + err);
			res.status(500).json(err);
	});
};

exports.cadastrarAnuncio = function(req, res) {
	const data = {
		id: req.body.anuncio_id,
		apelido_anunciante: req.body.apelido_anunciante,
		descricao: req.body.descricao,
		data_criacao: req.body.data_criacao,
		data_expiracao: req.body.data_expiracao,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		id_categoria: req.body.id_categoria,
		foto: req.body.foto
	};

	if (data.local == '' || data.id == null || data.apelido_anunciante == '' ||
		data.descricao == '' || data.data_criacao == '' || data.data_expiracao == '' || data.id_categoria == '' ) {
		res.json('Dados incompletos!');
	}

	Anuncio.findOne({
			where: {
				apelido_anunciante: data.apelido_anunciante,
				descricao: data.descricao,
				data_criacao: data.data_criacao,
				data_expiracao: data.data_expiracao,
				latitude: data.latitude,
				longitude: data.longitude,
				id_categoria: data.id_categoria
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
					latitude: data.latitude,
					longitude: data.longitude,
					foto: data.foto,
					id_categoria: data.id_categoria

				}).then(() => {
					console.log('anuncio criado no db');
					res.status(200).send({
						message: 'anuncio criado no db'
					})
				});
			}
		})
		.catch(err => {
			console.log('problem communicating with db ' + err);
			res.status(500).json(err);
		});
};
