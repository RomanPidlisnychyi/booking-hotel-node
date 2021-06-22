const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ErrorConstructor } = require('../errors/errorConstructor');

module.exports.register = async (req, res, next) => {
  const { email: userEmail, password } = req.body;

  const email = userEmail.toLowerCase();

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const newUser = await User.create({
    ...req.body,
    email,
    password: hashPassword,
  });
  const { name } = newUser;

  return res.status(200).json({ name, email });
};

module.exports.login = async (req, res, next) => {
  const { email: userEmail, password } = req.body;

  const email = userEmail.toLowerCase();

  const isUser = await User.findOne({
    where: {
      email,
    },
  });
  if (!isUser) {
    return next(new ErrorConstructor(404));
  }

  const isPasswordValid = await bcrypt.compareSync(password, isUser.password);
  if (!isPasswordValid) {
    return next(new ErrorConstructor(401.1));
  }

  const { id, name } = isUser;

  const token = jwt.sign({ id }, process.env.JWT_KEY);

  return res.status(200).json({ name, email, token });
};