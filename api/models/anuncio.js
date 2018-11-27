var sequelize = require('../../sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('anuncio', {
    anuncio_id: {
      type: type.INTEGER,
      primaryKey: true,
    },
    apelido_anunciante: {
      type: type.STRING,
      allowNull: false
    },
    descricao: {
      type: type.STRING,
      allowNull: false
    },
    data_criacao: {
      type: type.DATE,
      allowNull: false
    },
    data_expiracao: {
      type: type.DATE,
      allowNull: false
    },
    latitude: {
      type: type.STRING,
      allowNull: false
    },
    longitude: {
      type: type.STRING,
      allowNull: false
    },
    foto: {
      type: type.BLOB
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
};
