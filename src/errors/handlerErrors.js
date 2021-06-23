const { preparingResponse } = require('./preparingResponse');

module.exports.handlerErrors = (err, req, res, next) => {
  const response = preparingResponse(err);

  return res.status(response.status).json(response);
};
