const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Renan", "email": "email@contato.com" }

const users = ['Diego', 'Renan', 'Victor'];

//Midwares
server.use((req, res, next) =>{
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  return next();
});

//retorna todos os usuários utiliza Route params
server.get('/users', (req, res) => {
  return res.json(users);
});

//retorna um usuário utiliza Route params
server.get('/users/:index', (req, res) => {
    const { index } = req.params;

  return res.json(users[index]);
});

//utiliza Request Body
server.post('/users', (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

//utiliza Request Body
server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json();
});


server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  returnres.json(users); 

});
server.listen(3003);