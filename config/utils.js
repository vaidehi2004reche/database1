const bcrypt = require('bcrypt');

const generatePassword = (password) => bcrypt.hashSync(password, 8);
const comparePassword = (inputPassword, originalPassword) => bcrypt.compareSync(inputPassword, originalPassword);

module.exports = { generatePassword, comparePassword };
