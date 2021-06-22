const { Router } = require('express');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const { bookedRoom } = require('../controllers/orderController');
const { createOrderValidation } = require('../validation/validation');

const router = Router();

router.post('/:roomId', createOrderValidation, asyncWrapper(bookedRoom));

module.exports = router;