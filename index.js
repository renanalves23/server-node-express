const express = require('express');

const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /users/1
//Request body = { "name": "Renan", "email": "email@contato.com" }

const users = ['Diego', 'Renan', 'Victor'];

//Midware Global
server.use((req, res, next) =>{
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

//Midware Local //vai no corpo da requisição e vê se existe a informação user
function checkUserExists(req, res, next) {
    //caso não ache
  if (!req.body.name) {
    return res.status(400).json({ error: 'User not found on request body' });
  }
  //caso exista
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'User does not exist' });
  }

  req.user = user;

  return next();
}

//retorna todos os usuários utiliza Route params
server.get('/users', (req, res) => {
  return res.json(users);
});

//retorna um usuário utiliza Route params
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//utiliza Request Body
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

//utiliza Request Body
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json();
});


server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  returnres.json(users); 

});
server.listen(3003);