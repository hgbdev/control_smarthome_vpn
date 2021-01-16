const bcrypt = require('bcrypt');
const db = require('./../models');
const jsonwebtoken = require('jsonwebtoken');
const STATUS_CONSTANT = require('./../constants/status.constant');
const ERROR_CONSTANT = require('./../constants/error.constant');

const saltRounds = 10;
const UserModel = db.users;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = {
  create: async (req, res, next) => {
    const { username, password } = req.body;

    // Check user exist
    const checkUserExist = await UserModel.findOne({
      where: { username: username },
    });
    if (checkUserExist) {
      return res.status(STATUS_CONSTANT.BAD_REQUEST.code).json({
        success: false,
        result: null,
        msg: 'Created user failed',
        statusType: STATUS_CONSTANT.BAD_REQUEST.type,
        errorType: ERROR_CONSTANT.USER_EXIST.type,
        errorCode: ERROR_CONSTANT.USER_EXIST.code,
      });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const user = await UserModel.create({
      username,
      password: hash,
    });
    return res.status(STATUS_CONSTANT.CREATED.code).json({
      success: true,
      result: { username: user.username, createdAt: user.createdAt },
      msg: 'Create user successfully',
      statusType: STATUS_CONSTANT.CREATED.type,
    });
  },

  login: (req, res, next) => {
    const { username, createdAt } = req.user;
    const token = jsonwebtoken.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          username,
          createdAt,
        },
      },
      JWT_SECRET
    );
    return res.status(STATUS_CONSTANT.SUCCESS.code).json({
      success: true,
      result: { token },
      msg: 'Login successfully',
      statusType: STATUS_CONSTANT.SUCCESS.type,
    });
  },
};
