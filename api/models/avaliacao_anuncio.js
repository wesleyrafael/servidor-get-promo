var sequelize = require('../../sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('avaliacao_anuncio', {
    id_avaliacao: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    apelido_avaliador: { // FK
      type: type.STRING,
      allowNull: false
    },
    anuncio_id: { // FK
      type: type.INTEGER,
      allowNull: false
    },
    data_avaliacao: {
      type: type.DATE,
      allowNull: false
    },
    valor: {
      type: type.INTEGER,
      allowNull: false
    },
    comentario: {
      type: type.STRING
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
};
