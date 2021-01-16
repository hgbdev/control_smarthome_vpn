const { body } = require('express-validator');
const validateMiddleware = require('../middlewares/validate.middleware');

module.exports = {
  login: () => {
    return [
      body('username')
        .not()
        .isEmpty()
        .withMessage('Username does not Empty')
        .isLength({ min: 4, max: 20 })
        .withMessage('Username must be between 4 and 20 characters'),
      body('password')
        .not()
        .isEmpty()
        .withMessage('Password does not Empty')
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
      validateMiddleware,
    ];
  },
};
