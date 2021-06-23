const { Router } = require('express');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const { bookedRoom, getBookedRoomsByDate, canceledOrder, getBookedRoomsByUser } = require('../controllers/orderController');
const { createOrderValidation } = require('../validation/validation');

const router = Router();

router.post('/:roomId', createOrderValidation, asyncWrapper(bookedRoom));
router.get('/:date', asyncWrapper(getBookedRoomsByDate));
router.delete('/:roomId/:date', asyncWrapper(canceledOrder));
router.get('/', asyncWrapper(getBookedRoomsByUser));

module.exports = router;