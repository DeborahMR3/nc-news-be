const { fetchAllUsers } = require('../models/users.model');

// function getAllUsers(request, response) {
//   fetchAllUsers()
//   .then((allUsers) => {
//     response.status(200).send({ users: allUsers})
//   });
// };

function getAllUsers(request, response, next) {
  fetchAllUsers()
    .then((allUsers) => {
      response.status(200).send({ users: allUsers });
    })
    .catch(next);
}

module.exports = { getAllUsers};
