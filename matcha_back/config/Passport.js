var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var AnonymousStrategy = require('passport-anonymous').Strategy;
var JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
var UserModel = require('../models/userModel');
const CONFIG = require('./Config');
const bcrypt = require('bcrypt');

function createUserToken(user) {
  let userToken = {
    id: user.id,
    username: user.username
  };
  userToken.admin = true;
  return userToken;
}

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      let user = await UserModel.getOneByUsername({username});
      if (!user || user.length == 0) {
        return done('Wrong password', false);
      }
      const match = await bcrypt.compare(password, user[0].password);
      if (!match)
        return done('Wrong password', false);
      if (user[0].validation_code != null)
        return done('Please validate your account', false);
      const userToken = createUserToken(user[0]);
      return done(null, userToken);
    } catch (e) {
      return done(e);
    }
  }
));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = CONFIG.API_SECRET_JWT_KEY;
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    let id = jwt_payload.id;
    let rawUser = await UserModel.getOneById({id});
    let user = createUserToken(rawUser[0]);
    return done(null, user);
  } catch (e) {
    console.log(e);
    return done('There is a problem with your token. If you just registed, you need to activate your account');
  }
}));

//passport.use(new AnonymousStrategy());

passport.initialize();