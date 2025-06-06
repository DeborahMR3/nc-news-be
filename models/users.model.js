const db = require('../db/connection');

function fetchAllUsers() {
  console.log("fetching all Users")
  return db.query("SELECT * FROM users;")  // query retorna algo assim { rows: [{1user}, {2user}, .....]}
  .then(({ rows }) => {
    return rows;    // quero que retorne so o value do objeto rows
  });
}

module.exports = { fetchAllUsers };
