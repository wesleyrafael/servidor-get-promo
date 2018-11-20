var sequelize = require('../../sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('categoria_anuncio', {
    nome_categoria: {
      type: type.STRING,
      primaryKey: true
    },
    anuncio_id: {
      type: type.INTEGER,
      primaryKey: true
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
};
