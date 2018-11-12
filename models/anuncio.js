/* CREATE TABLE anuncio (
  id integer PRIMARY KEY,
  apelido_anunciante text NOT NULL,
  descricao text NOT NULL,
  data_criacao DATE NOT NULL,
  data_expiracao DATE NOT NULL,
  local text NOT NULL,
  FOREIGN KEY (apelido_anunciante) REFERENCES usuario(apelido)
);
*/

var sequelize = require('sequelize');
module.exports = (sequelize,type) => {
  return sequelize.define('anuncio', {
    id: {
      type: type.INTEGER,
      primaryKey: true
    },
    apelido_anunciante: {
      type: type.STRING,
      references: {
        model: "Usuario",
        key: "apelido"
      },
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
    local: {
      type: type.STRING,
      allowNull: false
    }
  })
};
