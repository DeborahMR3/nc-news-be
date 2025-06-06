const express = require("express");
const app = express();
const db = require("./db/connection")
const endpoints = require('./endpoints.json');

const { getAllTopics } = require("./controllers/topics.controller");
const { getAllArticles } = require("./controllers/articles.controller");
const { getAllUsers } = require('./controllers/users.controller');

app.get('/api', (request, response) => {
  response.status(200).send({ endpoints: endpoints}); // preciso da chave 'endpoints' para a resposta ser { endpoints: ... }
});

// app.get('/api/topics', (request, response) => {
//   response.status(200).send()
// })
app.get('/api/topics', getAllTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/users', getAllUsers);

const handlePostgresErrors = (err, request, response, next) => {
  // vou escrever aqui o codigo de erro do postgres
  if(err.code === "22P02") {
    response.status(400).send( { msg: "bad request"})
  } else {
    next(err)
  }
};

app.use(handlePostgresErrors)

module.exports = app;
