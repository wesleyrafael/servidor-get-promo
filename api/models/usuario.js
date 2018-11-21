var sequelize = require('../../sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('usuario', {
    apelido: {
      type: type.STRING,
      primaryKey: true
    },
    nome: {
      type: type.STRING,
      allowNull: false
    },
    senha: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      unique: true,
      allowNull: false
    },
    foto: {
      type: type.BLOB
    },
    permissao: {
      type: type.INTEGER,
      allowNull: false
    },
    categoria_favorita1: {
      type: type.STRING,
    },
    categoria_favorita2: {
      type: type.STRING,
    },
    categoria_favorita3: {
      type: type.STRING,
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
};
