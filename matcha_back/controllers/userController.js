var userModel = require('../models/userModel');

module.exports = {
    
    async getAllUsers(req, res, next) {
        try {
            let resources = await userModel.getAllUsers();
            res.send(resources);
        } catch (e) {
            res.send(e);
        }
    },
}
