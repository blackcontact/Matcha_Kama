const profileModel = require('../models/profileModel');
const likeModel = require('../models/likeModel');
const notifications = require('../helpers/notifications');

module.exports = {
  async getProfile(req, res) {
    if (!req.params.id)
      return res.status(400).send({err: 'Invalid ID'});
    let profile = await profileModel.getOne(req.params.id);
    profile = profile[0];
    if (!profile)
      return res.status(400).send({err: 'No profile with this ID'});
    if (profile.age == null || profile.gender == null || profile.bio == null || profile.avatar == null || JSON.parse(profile.images).length == 0)
      return res.status(400).send({err: 'You can\'t see an incomplete profile'});
    res.send({profile});
    notifications.newVisit(req.user.id, req.params.id, res.io);
  },

  async toggleLike(req, res) {
    if (!req.params.id)
      return res.status(400).send({err: 'Invalid ID'});
    let profile = await profileModel.getOne(req.params.id);
    profile = profile[0];
    if (!profile)
      return res.status(400).send({err: 'No profile with this ID'});
    if (profile.age == null || profile.gender == null || profile.bio == null || profile.avatar == null || JSON.parse(profile.images).length == 0)
      return res.status(400).send({err: 'You can\'t like an incomplete profile'});
    const like = await likeModel.likeTest(req.user.id, req.params.id);
    if (!like[0]) {
      likeModel.newLike(req.user.id, req.params.id);
      res.send({success:true, like: true});
      notifications.newLike(req.user.id, req.params.id, res.io);
      if ((await likeModel.matchChecker(req.user.id, req.params.id))[0]) {
        notifications.newMatch(req.user.id, req.params.id, res.io);
        notifications.newMatch(req.params.id, req.user.id, res.io);
      }
    } else {
      const alreadymatch = await likeModel.matchChecker(req.user.id, req.params.id);
      likeModel.removeLike(req.user.id, req.params.id);
      res.send({success:true, like: false});
      if (alreadymatch[0]) {
        notifications.newUnmatch(req.user.id, req.params.id, res.io);
        notifications.newUnmatch(req.params.id, req.user.id, res.io);
      }
    }
  }
};