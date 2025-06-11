const express = require("express");
const app = express();
app.use(express.json());
const db = require("./db/connection")
const endpoints = require('./endpoints.json');


//  ➡️ rota raiz: redireciona para /api ADICIONEI PARA TENTAR FIX!!!!!!!!
app.get("/", (req, res) => {
  res.redirect("/api");
});
////////////////////


// mapeia a rota "/api/docs" para a pasta "public/
app.use('/api/docs', express.static('public'));


const { getAllTopics } = require("./controllers/topics.controller");
const { getAllArticles } = require("./controllers/articles.controller");
const { getAllUsers } = require('./controllers/users.controller');
const { getArticleById } = require('./controllers/articles.controller');


// const { getCommentsByArticleId, postCommentByArticleId } = require('./controllers/comments.controller');
const { patchArticleById } = require('./controllers/articles.controller');
const { getCommentsByArticleId, postCommentByArticleId, deleteCommentById } = require('./controllers/comments.controller');
const { handlePostgresErrors, handleCustomErrors, handleServerErrors } = require('./errors')

app.get('/api', (request, response) => {
  response.status(200).send({ endpoints: endpoints }); // preciso da chave 'endpoints' para a resposta ser { endpoints: ... }
});

app.get('/api/topics', getAllTopics);

app.get('/api/articles', getAllArticles);

app.get('/api/users', getAllUsers);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

app.post('/api/articles/:article_id/comments', postCommentByArticleId);

app.patch('/api/articles/:article_id', patchArticleById);

app.delete('/api/comments/:comment_id', deleteCommentById);

//  middlewares de erro ABAIXO:
app.use(handlePostgresErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors)

module.exports = app;
