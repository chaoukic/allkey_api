const bcrypt = require("bcrypt");
const saltRounds = 12;

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainPassword, salt);
};

const comparePassword = async (givenPassword, dbHash) => {
  return await bcrypt.compare(givenPassword, dbHash);
};

module.exports = {
  hashPassword,
  comparePassword,
};
