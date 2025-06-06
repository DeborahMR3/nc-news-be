const db = require('../db/connection');

function fetchAllArticles() {
  return db.query(`
    SELECT
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,

      COUNT(comments.article_id)::INT AS comment_count

      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC
  `)
  .then(result => result.rows);
}

function fetchArticleById(article_id) {
  return db.query(` SELECT * FROM articles WHERE article_id = $1`, [article_id])
  .then((result) => {
     if (result.rows.length === 0) { // se nao achar um artigo com o ID passado
      return Promise.reject({ status: 404, msg: "not found" }); // passa daqui para linha 20 do controller
     }
    return result.rows[0];
  })
}

module.exports = { fetchAllArticles, fetchArticleById };
