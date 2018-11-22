var sequelize = require('../../sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('categoria', {
    id_categoria: {
      type: type.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome_categoria:{
      type: type.STRING,
      allowNull: false,
      unique: true
    }
  },{
    timestamps: false,
    freezeTableName: true
  });
};
