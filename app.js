const express = require("express");
const app = express();
app.use(express.json());  // nao endenti isso
const db = require("./db/connection")
const endpoints = require('./endpoints.json');

const { getAllTopics } = require("./controllers/topics.controller");
const { getAllArticles } = require("./controllers/articles.controller");
const { getAllUsers } = require('./controllers/users.controller');
const { getArticleById } = require('./controllers/articles.controller');

// AQUI TROQUEI
// const { getCommentsByArticleId } = require('./controllers/comments.controller');
const { getCommentsByArticleId, postCommentByArticleId } = require('./controllers/comments.controller');


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

//  middlewares de erro ABAIXO:
app.use(handlePostgresErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors)

module.exports = app;



// const express = require("express");
// const app = express();
// const db = require("./db/connection")
// const endpoints = require('./endpoints.json');

// const { getAllTopics } = require("./controllers/topics.controller");
// const { getAllArticles } = require("./controllers/articles.controller");
// const { getAllUsers } = require('./controllers/users.controller');
// const { getArticleById } = require('./controllers/articles.controller');
// const { getCommentsByArticleId } = require('./controllers/articles.controller');
// const { postCommentByArticleId } = require('./controllers/articles.controller');

// const { handlePostgresErrors,handleCustomErrors, handleServerErrors } = require('./errors')

// app.get('/api', (request, response) => {
//   response.status(200).send({ endpoints: endpoints}); // preciso da chave 'endpoints' para a resposta ser { endpoints: ... }
// });


// app.get('/api/topics', getAllTopics);

// app.get('/api/articles', getAllArticles);

// app.get('/api/users', getAllUsers);

// app.get('/api/articles/:article_id', getArticleById)

// app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

// //  middlewares de erro ABAIXO:

// app.use(handlePostgresErrors);
// app.use(handleCustomErrors);
// app.use(handleServerErrors)

// module.exports = app;
