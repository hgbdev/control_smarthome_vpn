var { validationResult } = require('express-validator');
const STATUS_CONSTANT = require('./../constants/status.constant');
const ERROR_CONSTANT = require('./../constants/error.constant');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(STATUS_CONSTANT.BAD_REQUEST.code).json({
      success: false,
      result: errors,
      msg: 'Data validation error',
      statusType: STATUS_CONSTANT.BAD_REQUEST.type,
      errorType: ERROR_CONSTANT.VALIDATE.type,
      errorCode: ERROR_CONSTANT.VALIDATE.code,
    });
  }
  return next();
};
