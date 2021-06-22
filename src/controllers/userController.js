const User = require('../models/User');

module.exports.getUsers = async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  return res.status(200).json(users);
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
