var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
AnonymousStrategy = require('passport-anonymous').Strategy;
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var UserModel = require('../models/userModel');
const CONFIG = require('./Config');

function createUserToken(user) {
    let userToken = {
        id: user.id,
        username: user.username
    }
    userToken.admin = true;
    return userToken;
}

passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            let user = await UserModel.getOneByUsername({username});
            if (user.length == 0 || user[0].password != password) {
                return done('Wrong password', false);
            }
            const userToken = createUserToken(user[0]);
            return done(null, userToken);
        } catch (e) {
            return done(e);
        }
    }
));

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = CONFIG.API_SECRET_JWT_KEY;
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        let id = jwt_payload.id;
        let rawUser = await UserModel.getOneById({id});
        let user = createUserToken(rawUser[0]);
        return done(null, user)
    } catch (e) {
        console.log(e);
        return done('There is a problem with your token. If you just registed, you need to activate your account');
    }
}));

//passport.use(new AnonymousStrategy());

passport.initialize()