const { fetchAllTopics } = require('../models/topics.model');

function getAllTopics(request, response) {
  fetchAllTopics()
  .then((allTopics) => {
    response.status(200).send( { topics: allTopics })
  })
}

module.exports = { getAllTopics };
