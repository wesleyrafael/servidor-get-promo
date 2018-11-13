var sequelize = require('sequelize');
var Usuario = require('./usuario');
module.exports = (sequelize,type) => {
  return sequelize.define('anuncio', {
    id: {
      type: type.INTEGER,
      primaryKey: true
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
    local: {
      type: type.STRING,
      allowNull: false
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
};
