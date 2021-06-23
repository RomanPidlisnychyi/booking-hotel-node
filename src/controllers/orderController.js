const Order = require('../models/Order');
const { ErrorConstructor } = require('../errors/errorConstructor');

module.exports.bookedRoom = async(req, res, next) => {
    const { user, params: { roomId }, body } = req;

    if(!user) {
        throw new ErrorConstructor(401);
    }

    const isOrder = await Order.findOne({
        where: {
            date: body.date,
            roomId,
        },
    });

    if (isOrder) {
        throw new ErrorConstructor(409);
    }

    const order = await Order.create({ ...body, userId: user.id, roomId: +roomId });

    return res.status(201).json({ id: order.id, roomId: order.roomId });
}

module.exports.canceledOrder = async(req, res, next) => {
    const { user, params: { roomId, date } } = req;

    if(!user) {
        throw new ErrorConstructor(401);
    }

    const isOrder = await Order.findOne({
        where: {
            date,
            roomId,
        },
    });

    if (!isOrder) {
        throw new ErrorConstructor(404);
    }

    if(isOrder.userId !== user.id) {
        throw new ErrorConstructor(403);
    }

    await isOrder.destroy();

    return res.status(204).send();
}

module.exports.getBookedRoomsByDate = async(req, res, next) => {
    const { date } = req.params;
    const orders = await Order.findAll({
        where: {
            date: date,
        },
    });

    return res.status(201).json(orders);
}

module.exports.getBookedRoomsByUser = async(req, res, next) => {
    const { user  } = req;

    if(!user) {
        throw new ErrorConstructor(401);
    }

    const orders = await Order.findAll({
        where: {
            userId: user.id,
        },
    });

    return res.status(201).json(orders);
}