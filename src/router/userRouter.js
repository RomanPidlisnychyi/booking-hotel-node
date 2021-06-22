const { Router } = require('express');
const {
  getUsers,
  deleteUser,
} = require('../controllers/userController');
const { asyncWrapper } = require('../helpers/asyncWrapper');

const router = Router();

router.get('/', asyncWrapper(getUsers));

router.delete('/:userId', asyncWrapper(deleteUser));

module.exports = router;
