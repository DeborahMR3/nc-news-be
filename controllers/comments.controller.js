const { fetchCommentsByArticleId, insertComment, removeCommentById } = require('../models/comments.model');

function getCommentsByArticleId(request, response, next) {
  const { article_id } = request.params;
  fetchCommentsByArticleId(article_id)
    .then((comments) => {  // aqui eu acesso o resultado do db query? me retorna uma promise
      response.status(200).send({ comments });
    })
    .catch(next);
}

// FUNÇÃO DE POST
function postCommentByArticleId(request, response, next) {
  const { article_id } = request.params;
  const { username, body } = request.body;
  insertComment(article_id, username, body)
    .then((comment) => {
      response.status(201).send({ comment });
    })
    .catch(next);
}

//delete

function deleteCommentById(request, response, next) {
  const { comment_id } = request.params
  removeCommentById(comment_id)
    .then((result) => {
      response.status(204).send(); //tem que send sem nada dentro. {} isso eh reconhecido como algo
    })
    .catch(next)

}

module.exports = { getCommentsByArticleId, postCommentByArticleId, deleteCommentById  };
