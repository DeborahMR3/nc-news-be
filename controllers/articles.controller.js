const { fetchAllArticles } = require('../models/articles.model');

const { fetchArticleById } = require('../models/articles.model');

const { fetchCommentsByArticleId } = require('../models/articles.model');

const { insertComment } = require('../models/articles.model');

const { updateArticleVotes } = require('../models/articles.model');

function getAllArticles(request, response) {
  fetchAllArticles()
  .then((result) => {
    response.status(200).send( { articles: result })
  })
};


function getArticleById(request, response, next) {
  const { article_id } = request.params;

  fetchArticleById(article_id) // // devo pedir para o model fazer um query
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err)

    })
};

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {
      response.status(200).send({ comments });
    })
    .catch(next);
};

function postCommentByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;

  fetchArticleById(article_id)
    .then(() => {
      return insertComment(article_id, username, body);
    })
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
}


function patchArticleById(request, response, next) {
  const { article_id } = request.params;
  const { inc_votes } = request.body;

  updateArticleVotes(article_id, inc_votes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
}

module.exports = { getAllArticles, getArticleById, getCommentsByArticleId, postCommentByArticleId, patchArticleById};
