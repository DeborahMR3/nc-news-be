const { fetchAllArticles } = require('../models/articles.model');

function getAllArticles(request, response) {
  fetchAllArticles()
  .then((result) => {
    response.status(200).send( { articles: result })
  })
}

module.exports = { getAllArticles };
