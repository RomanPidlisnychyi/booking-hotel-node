const { Router } = require('express');
const { asyncWrapper } = require('../helpers/asyncWrapper');
const { getRooms } = require('../controllers/roomController');

const router = Router();

router.get('/', asyncWrapper(getRooms));

module.exports = router;