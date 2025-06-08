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
};

function fetchArticleById(article_id) {
  return db.query(` SELECT * FROM articles WHERE article_id = $1`, [article_id])
  .then((result) => {
     if (result.rows.length === 0) { // se nao achar um artigo com o ID passado
      return Promise.reject({ status: 404, msg: "not found" }); // passa daqui para linha 20 do controller
     }
    return result.rows[0];
  })
};

function fetchCommentsByArticleId(article_id) {
  return db.query(
      `SELECT comment_id, votes, created_at, author, body, article_id
       FROM comments
       WHERE article_id = $1
       ORDER BY created_at DESC;`,
      [article_id]
    )
    .then((result) => result.rows);
};

function insertComment(article_id, username, body) {
  return db.query(
    `INSERT INTO comments (body, author, article_id)
     VALUES ($1, $2, $3)
     RETURNING *;`,
    [body, username, article_id]
  )
  .then((result) => result.rows[0]);
};

function updateArticleVotes(article_id, inc_votes) {
  if (typeof inc_votes !== 'number') {
    return Promise.reject({ status: 400, msg: 'bad request' });
  }
  return db.query(
      `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
      [inc_votes, article_id])
    .then((result) => {
      const updatedArticle = result.rows[0];
      if (!updatedArticle) {
        // Se não encontrar artigo, lança erro 404
        return Promise.reject({ status: 404, msg: 'Article not found' });
      }
      return updatedArticle;
    });

};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  insertComment,
  updateArticleVotes
};
