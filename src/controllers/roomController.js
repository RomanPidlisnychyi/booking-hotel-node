const Room = require('../models/Room');

module.exports.getRooms = async(req, res, next) => {
    let rooms = await Room.findAll();

    if(rooms?.length < 1) {
        for(let i = 0; i < 20; i++) {
            await Room.create();
        }

        rooms = await Room.findAll();
    }

    return res.status(200).json(rooms);
}