const User = require('../models/User');
const { ErrorConstructor } = require('../errors/errorConstructor');

module.exports.getUsers = async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return res.status(200).json(users);
};

module.exports.getCurrentUser = async (req, res, next) => {
  const { user } = req;

  if(!user) {
    throw new ErrorConstructor(401);
  }

  const { name, email } = user;
  return res.status(200).json({ name, email });
};

module.exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = await User.destroy({
    where: {
      id: userId,
    },
  });

  return res.status(204).send();
};
