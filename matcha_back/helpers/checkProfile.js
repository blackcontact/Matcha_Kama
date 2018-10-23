const profileModel = require('../models/profileModel');

const checkProfile = async function(req, res, next) {
  const user = await profileModel.getOne(req.user.id);

  if (user[0].age == null || user[0].gender == null || user[0].bio == null || user[0].avatar == null || JSON.parse(user[0].images).length == 0)
    return res.status(403).send({err: 'Your profile is incomplete. Please fill it if you want to browse this website'});
  else
    next();
};

module.exports = checkProfile;