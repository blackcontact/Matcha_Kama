const CONFIG = require('../config/Config');
const validator = require('../helpers/Validator');
var passport = require('passport');
var jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = {

    getToken(req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || user.length == 0) {
                return res.status(400).json({
                    err: err,
                    message: 'Something is not right',
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                username = user.username;
                const token = jwt.sign(user, CONFIG.API_SECRET_JWT_KEY);
                return res.json({username, token});
            });
        })(req, res);
    },
    async createAccount(req, res, next) {
        if (!req.body.username || req.body.username.length == 0 ||
            !req.body.password || req.body.password.length == 0 ||
            !req.body.email || req.body.email.length == 0 ||
            !req.body.firstname || req.body.firstname.length == 0 ||
            !req.body.lastname || req.body.lastname.length == 0)
            return res.send('Bad query');
        let validateUserInputError = validator.validateUserInput(req.body);
        if (validateUserInputError)
            return res.send(validateUserInputError);
        const username = req.body.username;
        const email = req.body.email;
        const userExistUsername = await userModel.getOneByUsername({username});
        const userExistEmail = await userModel.getOneByEmail({email});
        if (userExistUsername.length != 0)
            return res.send('An user with this username already exist.')
        if (userExistEmail.length != 0)
            return res.send('An user with this email address already exist.')



            //TODO Y mettre dans la base de donnees !
        res.send('OK');
        
    }
}
