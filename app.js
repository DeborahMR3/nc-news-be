const express = require("express");
const app = express();
const db = require("./db/connection")
const endpoints = require('./endpoints.json');

const { getAllTopics } = require("./controllers/topics.controller");
const { getAllArticles } = require("./controllers/articles.controller");
const { getAllUsers } = require('./controllers/users.controller');
const { getArticleById } = require('./controllers/articles.controller');
const { handlePostgresErrors, handleCustomErrors } = require('./errors');

app.get('/api', (request, response) => {
  response.status(200).send({ endpoints: endpoints}); // preciso da chave 'endpoints' para a resposta ser { endpoints: ... }
});

// app.get('/api/topics', (request, response) => {
//   response.status(200).send()
// })
app.get('/api/topics', getAllTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/users', getAllUsers);

app.get('/api/articles/:article_id', getArticleById)

//  middlewares de erro ABAIXO:

app.use(handlePostgresErrors) // funcao esta em erros.js // para erros do postgres

app.use(handleCustomErrors)  // para erros customizados (status/msg)

module.exports = app;
