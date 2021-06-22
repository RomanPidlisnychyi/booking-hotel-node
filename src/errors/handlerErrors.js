const { preperingResponse } = require('./preperingResponse');

module.exports.handlerErrors = (err, req, res, next) => {
  const response = preperingResponse(err);

  return res.status(response.status).json(response);
};
