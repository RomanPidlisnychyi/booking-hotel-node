const Order = require('../models/Order');
const { ErrorConstructor } = require('../errors/errorConstructor');

module.exports.bookedRoom = async(req, res, next) => {
    const { user, params: { roomId }, body } = req;

    if(!user) {
        throw new ErrorConstructor(401);
    }

    const order = await Order.create({ ...body, userId: user.id, roomId });
    console.log('order', order);

    return res.status(200).json(user);
}