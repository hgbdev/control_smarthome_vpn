const passport = require('../configs/passport.config');
const STATUS_CONSTANT = require('../constants/status.constant');
const ERROR_CONSTANT = require('../constants/error.constant');

module.exports = {
  login: (req, res, next) =>
    passport.authenticate('local', { session: false }, (err, user, msg) => {
      if (err || !user) {
        return res.status(STATUS_CONSTANT.UNAUTHORIZED.code).json({
          success: false,
          msg: msg.message,
          statusType: STATUS_CONSTANT.UNAUTHORIZED.type,
          errorType: ERROR_CONSTANT.AUTHENTICATION_ERROR.type,
          errorCode: ERROR_CONSTANT.AUTHENTICATION_ERROR.code,
        });
      }
      req.user = user;
      return next();
    })(req, res, next),
  authentication: (req, res, next) =>
    passport.authenticate('jwt', { session: false }, (err, user, msg) => {
      if (err || !user) {
        return res.status(STATUS_CONSTANT.UNAUTHORIZED.code).json({
          success: false,
          msg: msg.message || 'Invalid token',
          statusType: STATUS_CONSTANT.UNAUTHORIZED.type,
          errorType: ERROR_CONSTANT.AUTHENTICATION_ERROR.type,
          errorCode: ERROR_CONSTANT.AUTHENTICATION_ERROR.code,
        });
      }
      req.user = user;
      return next();
    })(req, res, next),
};
