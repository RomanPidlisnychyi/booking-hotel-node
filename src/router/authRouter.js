const { Router } = require('express');
const { register, login } = require('../controllers/authController');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const { createUserValidation } = require('../validation/validation');

const router = Router();

router.post('/register', createUserValidation, asyncWrapper(register));
router.post('/login', asyncWrapper(login));

module.exports = router;
