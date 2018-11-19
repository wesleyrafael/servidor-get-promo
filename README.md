# servidor-get-promo
Servidor do projeto GetPromo, desenvolvido para a disciplina de Engenharia de Software II

O banco de dados é construído em SQLite, através do módulo sequelize do nodeJS.

Módulos necessários para uso do servidor:

- sequelize
- cors
- express
- body-parser
- morgan

Passos necessários para se poder rodar o servidor:

1. Clonar o projeto;
2. Ir à pasta do projeto e instalar os módulos necessários;
Para instalar um módulo, é só digitar:
```
npm install nome_do_módulo
```
3. Digitar npm start na pasta do projeto.


Para fazer requisições HTTP ao servidor, pode-se usar o módulo AXIOS (http://codeheaven.io/how-to-use-axios-as-your-http-client/).
Exemplo de requisição: 

```
var axios = require('axios');
console.log('in');
axios.post('http://localhost:8080/cadastrarUsuario', {
   apelido: 'teste',
   nome: 'testando',
   senha: 'abc322489oi',
   email: 'teste@hotmail.com',
   foto: 'null',
   permissao: 1
 }).then(function(response){
    console.log(response.data)
 });
 ```
