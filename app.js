const express = require("express");
const app = express();
const db = require("./db/connection")
const endpoints = require('./endpoints.json');

app.get('/api', (request, response) => {
  response.status(200).send(endpoints);
});

app.get('/api/topics', (request, response) => {
  response.status(200).send()
})

module.exports = app;
