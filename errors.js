const handlePostgresErrors = (err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "bad request" });
  } else if (err.code === "23503") {
    // Foreign key violation (usuário ou artigo não existe)
    response.status(404).send({ msg: "not found" });
  } else {
    next(err);
  }
};

// Para erros customizados do  código (Promise.reject({ status, msg }))
const handleCustomErrors = (err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

// Handler genérico
const handleServerErrors = (err, request, response, next) => {
  response.status(500).send({ msg: "Internal Server Error" });
};

module.exports = {
  handlePostgresErrors,
  handleCustomErrors,
  handleServerErrors
};
