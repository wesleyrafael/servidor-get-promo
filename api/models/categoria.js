var sequelize = require('../../sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('categoria', {
    nome_categoria: {
      type: type.STRING,
      allowNull: false,
      primaryKey: true
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
};
