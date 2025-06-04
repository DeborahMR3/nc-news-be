const db = require('../db/connection');

function fetchAllTopics() {
  console.log("fetching all topics")
  return db.query("SELECT * FROM topics;")
  .then(({ rows }) => {
    const allTopics = rows;
    return allTopics
  });
}

// function fetchAllArticles() {
//   return db.query(`SELECT
//       articles.author,
//       articles.title,
//       articles.article_id,
//       articles.topic,
//       articles.created_at,
//       articles.votes,
//       articles.article_img_url,
//       article.comment_count,

//       COUNT(comments.comment_id)::INT AS comment_count

//       FROM articles
//       LEFT JOIN comments ON comments.article_id = articles.article_id
//       GROUP BY articles.article_id
//       ORDER BY articles.created_at DESC`)

//   .then(result => result.rows);
// }

module.exports = { fetchAllTopics };
