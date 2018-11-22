var sequelize = require('../../sequelize');
var Anuncio = sequelize.Anuncio;
var Categoria = sequelize.Categoria;
var CategoriaAnuncio = sequelize.CategoriaAnuncio;

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
            CategoriaAnuncio.findAll({
                    attributes: ['anuncio_id'],
                    where: {
                        id_categoria: data.id_categoria
                    },
                    raw: true
                })
                .then(ids => {
                    if (ids == null) {
                        console.log('nenhum anuncio cadastrado nessa id_categoria');
                        res.json('nenhum anuncio cadastrado nessa id_categoria');
                    } else {
                        var unpacked_ids = [];
                        ids.forEach(function(an_id) {
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

exports.cadastrarAnuncio = function(req, res) {
    const data = {
        id: req.body.anuncio_id,
        apelido_anunciante: req.body.apelido_anunciante,
        descricao: req.body.descricao,
        data_criacao: req.body.data_criacao,
        data_expiracao: req.body.data_expiracao,
        local: req.body.local,
        id_categorias: [req.body.id_categoria1, req.body.id_categoria2, req.body.id_categoria3],
        foto: req.body.foto
    };

    id_categoriasValidas = [];
    data.id_categorias.forEach(function(id_categoria) {
        if (id_categoria != null) {
            id_categoriasValidas.push(id_categoria);
        }
    })

    if (data.local == '' || data.id === null || data.apelido_anunciante === '' ||
        data.descricao === '' || data.data_criacao === '' || data.data_expiracao == '') {
        res.json('Dados incompletos!');
    }

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
                    local: data.local,
                    foto: data.foto
                }).then(() => {
                    console.log('anuncio criado no db');

                    id_categoriasValidas.forEach(function(id_categoria) {
                        CategoriaAnuncio.create({
                            anuncio_id: data.id,
                            id_categoria: id_categoria
                        });
                    });

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
