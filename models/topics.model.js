const db = require('../db/connection');

function fetchAllTopics() {
  console.log("fetching all topics")
  return db.query("SELECT * FROM topics;")
  .then(({ rows }) => {
    const allTopics = rows;
    return allTopics
  });
}

module.exports = { fetchAllTopics };
