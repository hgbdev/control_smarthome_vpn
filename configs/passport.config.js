var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const bcrypt = require('bcrypt');

const UserModel = db.users;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return done(null, false, { message: 'User does not exist' });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return done(null, false, { message: 'Wrong password' });
    }
    return done(null, user);
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'JWT_SECRET',
    },
    async function (jwt_payload, done) {
      const { data } = jwt_payload;
      const user = await UserModel.findOne({
        where: { username: data.username },
      });
      if (!user) {
        return done(null, false, { message: 'Invalid token' });
      }
      return done(null, user);
    }
  )
);

module.exports = passport;
