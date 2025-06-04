const express = require("express");
const app = express();
const db = require("./db/connection")
const endpoints = require('./endpoints.json');

const { getAllTopics } = require('./controllers/topics.controller');

app.get('/api', (request, response) => {
  response.status(200).send({ endpoints: endpoints}); // preciso da chave 'endpoints' para a resposta ser { endpoints: ... }
});

// app.get('/api/topics', (request, response) => {
//   response.status(200).send()
// })
app.get('/api/topics', getAllTopics);

app.get('/api/articles', (request, response) => {
  response.status(200).send({
     articles: [
      {
        author: "test_author",
        title: "test_title",
        article_id: 1,
        topic: "test_topic",
        created_at: "1604394720000",
        votes: 0,
        article_img_url: "http://example.com/image.jpg",
        comment_count: 0
      }
    ]
  });
});

module.exports = app;
