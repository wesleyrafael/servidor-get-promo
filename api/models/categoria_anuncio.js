var sequelize = require('../../sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('categoria_anuncio', {
    id_categoria: {
      type: type.INTEGER,
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
