const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

module.exports.authorized = async (req, res, next) => {
  const { authorization } = req.headers;
  const userToken = authorization && authorization.split(' ')[1];

  let userId;

  try {
    userId = jwt.verify(userToken, process.env.JWT_KEY).id;
  } catch (err) {
    return next();
  }

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  req.user = user?.dataValues;

  next();
};

module.exports.createUserValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);

  validationResult.error ? next(validationResult.error) : next();
};

module.exports.createOrderValidation = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);
  validationResult.error ? next(validationResult.error) : next();
};
