const bcrypt = require("bcrypt");
const saltRounds = 12;

const hashPassword = (plainPassword) => {
  bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    return hash;
  });
};

const comparePassword = (givenPassword, dbHash) => {
  bcrypt.compare(givenPassword, dbHash, (err, result) => {
    return result;
  });
};

module.exports = {
  hashPassword,
  comparePassword,
};
