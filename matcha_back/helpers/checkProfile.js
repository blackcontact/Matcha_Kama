const profileModel = require('../models/profileModel');
const tagModel = require('../models/tagModel');

const checkProfile = function(user_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await profileModel.getOne(user_id);
      const tags = await tagModel.getUserTags(user_id);
      if (user[0].age == null || user[0].gender == null || user[0].bio == null || user[0].avatar == null || JSON.parse(user[0].images).length == 0 || tags.length == 0)
        resolve(false);
      resolve(true);
    } catch(err) {
      reject(err);
    }
  });
};
const middlewareCheckProfile = async function(req, res, next) {
  const tester = checkProfile(req.user.id);
  if ((await tester) == false)
    return res.status(403).send({err: 'Your profile is incomplete. Please fill it if you want to browse this website'});
  else
    next();
};

module.exports = {
  checkProfile,
  middlewareCheckProfile
};