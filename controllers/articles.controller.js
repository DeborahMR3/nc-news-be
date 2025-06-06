const { fetchAllArticles } = require('../models/articles.model');

const { fetchArticleById } = require('../models/articles.model');

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
    .catch(next); /// Isso manda qualquer erro para os handlers de erro


};
module.exports = { getAllArticles, getArticleById };
