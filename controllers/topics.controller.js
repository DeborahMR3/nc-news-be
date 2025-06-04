const { fetchAllTopics } = require('../models/topics.model');

function getAllTopics(request, response) {
  fetchAllTopics()
  .then((allTopics) => {
    response.status(200).send( { topics: allTopics })
  })
}

module.exports = { getAllTopics };



// function getAllArticles(request, response) {
//   fetchAllArticles()
//   .then((result) => {
//     response.status(200).send( { articles: result })
//   })
// }
