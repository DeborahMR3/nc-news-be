const handlePostgresErrors = (err, request, response, next) => {
  // vou escrever aqui o codigo de erro do postgres
  if(err.code === "22P02") {
    response.status(400).send( { msg: "bad request"})
  } else {
    next(err)
  }
};


module.exports = { handlePostgresErrors }
