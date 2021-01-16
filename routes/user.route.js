const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userValidate = require('./../validates/user.validate');
const passport = require('../configs/passport.config');

router.post(
  '/',
  authMiddleware.authentication,
  userValidate.login(),
  userController.create
);

router.post(
  '/login',
  userValidate.login(),
  authMiddleware.login,
  userController.login
);

router.post('/auth');

module.exports = router;
