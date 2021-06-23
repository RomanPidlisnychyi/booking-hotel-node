const { Router } = require('express');
const {
  getUsers,
  deleteUser,
  getCurrentUser,
} = require('../controllers/userController');
const { asyncWrapper } = require('../helpers/asyncWrapper');

const router = Router();

router.get('/', asyncWrapper(getUsers));
router.get('/current', asyncWrapper(getCurrentUser));

router.delete('/:userId', asyncWrapper(deleteUser));

module.exports = router;
