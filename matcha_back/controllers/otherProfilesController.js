const profileModel = require('../models/profileModel');
const blockedModel = require('../models/blockedModel');
const likeModel = require('../models/likeModel');
const tagModel = require('../models/tagModel');
const notifications = require('../helpers/notifications');
const messageModel = require('../models/messageModel');
const checkProfile = require('../helpers/checkProfile');
const reportedModel = require('../models/reportedModel');
const userModel = require('../models/userModel');
const geolib = require('geolib');

module.exports = {
  async getProfile(req, res) {
    if (!req.params.id)
      return res.status(400).send({err: 'Invalid ID'});
    let profile = await profileModel.getOne(req.params.id);
    profile = profile[0];
    if (!profile)
      return res.status(400).send({err: 'No profile with this ID'});
    const block = await blockedModel.blockTest(req.params.id, req.user.id);
    if (block[0])
      return res.status(400).send({err: 'This user blocked you'});
    if (!checkProfile.checkProfile(req.params.id))
      return res.status(400).send({err: 'You can\'t see an incomplete profile'});
    profile.isliked = (await likeModel.likeTest(req.user.id, req.params.id)).length ? true : false;
    profile.isblocked = (await blockedModel.blockTest(req.user.id, req.params.id)).length ? true : false;
    profile.tags = await tagModel.getUserTags(req.params.id);
    profile.liked_me = (await likeModel.likeTest(req.params.id, req.user.id)).length ? true : false;
    profile.isreported = (await reportedModel.reportTest(req.params.id, req.user.id)).length ? true : false;
    const position = JSON.parse((await profileModel.getPosition(req.user.id))[0].position);
    const position2 = JSON.parse(profile.position);
    profile.distance = false;
    if(position && profile.position) {
      let mypos = {};
      mypos.latitude = position.lat;
      mypos.longitude = position.lon;
      let othpos = {};
      othpos.latitude = position2.lat;
      othpos.longitude = position2.lon;
      profile.distance = (geolib.getDistance(mypos, othpos));
    }
    if (res.connectedUsers[req.params.id])
      profile.online = true;
    else
      profile.online = false;
    res.send({profile});
    if (req.user.id != req.params.id)
    {
      notifications.newVisit(req.user.id, req.params.id, res.io);
      profileModel.addPopularity(req.params.id, 1);
    }
  },

  async toggleLike(req, res) {
    if (!req.params.id)
      return res.status(400).send({err: 'Invalid ID'});
    let profile = await profileModel.getOne(req.params.id);
    profile = profile[0];
    if (!profile)
      return res.status(400).send({err: 'No profile with this ID'});
    if (!checkProfile.checkProfile(req.params.id))
      return res.status(400).send({err: 'You can\'t like an incomplete profile'});
    if (req.user.id == req.params.id)
      return res.status(400).send({err: 'WTF YOU CAN\'T LIKE YOURSELF YOU PRICK'});
    const like = await likeModel.likeTest(req.user.id, req.params.id);
    if (!like[0]) {
      await likeModel.newLike(req.user.id, req.params.id);
      res.send({success:true, like: true});
      await notifications.newLike(req.user.id, req.params.id, res.io);
      await profileModel.addPopularity(req.params.id, 100);
      let matchChecker = ((await likeModel.matchChecker(req.user.id, req.params.id))[0]);
      if (matchChecker) {
        console.log('HOY');
        await notifications.newMatch(req.user.id, req.params.id, res.io);
        await notifications.newMatch(req.params.id, req.user.id, res.io);
        await profileModel.addPopularity(req.user.id, 500);
        await profileModel.addPopularity(req.params.id, 500);
      }
    } else {
      const alreadymatch = await likeModel.matchChecker(req.user.id, req.params.id);
      await likeModel.removeLike(req.user.id, req.params.id);
      await profileModel.removePopularity(req.params.id, 100);
      res.send({success:true, like: false});
      if (alreadymatch[0]) {
        await notifications.newUnmatch(req.user.id, req.params.id, res.io);
        await notifications.newUnmatch(req.params.id, req.user.id, res.io);
        await profileModel.removePopularity(req.params.id, 500);
        await profileModel.removePopularity(req.user.id, 500);
      }
    }
  },
  async toggleBlock(req, res) {
    if (!req.params.id)
      return res.status(400).send({err: 'Invalid ID'});
    let profile = await profileModel.getOne(req.params.id);
    profile = profile[0];
    if (!profile)
      return res.status(400).send({err: 'No profile with this ID'});
    if (!checkProfile.checkProfile(req.params.id))
      return res.status(400).send({err: 'You can\'t block an incomplete profile'});
    if (req.user.id == req.params.id)
      return res.status(400).send({err: 'WTF YOU CAN\'T BLOCK YOURSELF YOU PRICK'});
    const block = await blockedModel.blockTest(req.user.id, req.params.id);
    if (!block[0]) {
      blockedModel.newBlock(req.user.id, req.params.id);
      res.send({success:true, block: true});
    } else {
      blockedModel.removeBlock(req.user.id, req.params.id);
      res.send({success:true, block: false});
    }
  },

  async toggleReport(req, res) {
    if (!req.params.id)
      return res.status(400).send({err: 'Invalid ID'});
    let profile = await profileModel.getOne(req.params.id);
    profile = profile[0];
    if (!profile)
      return res.status(400).send({err: 'No profile with this ID'});
    if (!checkProfile.checkProfile(req.params.id))
      return res.status(400).send({err: 'You can\'t report an incomplete profile'});
    if (req.user.id === req.params.id)
      return res.status(400).send({err: 'WTF YOU CAN\'T REPORT YOURSELF YOU PRICK'});
    const report = await reportedModel.reportTest(req.user.id, req.params.id);
    if (!report[0]) {
      reportedModel.newReport(req.user.id, req.params.id);
      res.send({success:true, report: true});
    } else {
      reportedModel.removeReport(req.user.id, req.params.id);
      res.send({success:true, report: false});
    }
  },

  async getMessages(req, res) {
    if (!req.params.id)
      return res.status(400).send({err: 'Invalid ID'});
    let profile = await profileModel.getOne(req.params.id);
    profile = profile[0];
    if (!profile)
      return res.status(400).send({err: 'No profile with this ID'});
    const block = await blockedModel.blockTest(req.params.id, req.user.id);
    if (block[0])
      return res.status(400).send({err: 'This user blocked you'});
    if (!checkProfile.checkProfile(req.params.id))
      return res.status(400).send({err: 'You can\'t see messages from an incomplete profile'});
    if (!(await likeModel.matchChecker(req.user.id, req.params.id))[0]) {
      res.status(400).send({err: 'Sorry but you need to match first to chat to someone'});
    }
    const messages = await messageModel.getAllMessages(req.user.id, req.params.id);
    messageModel.setAllAsRead(req.user.id, req.params.id);
    res.send({messages});
  },

  async getReported(req, res) {
    const user = userModel.isAdmin(req.user.id);
    if ((await user).length == 0)
      return res.status(400).send('You\'re not admin');
    const reported = await reportedModel.getReported();
    res.send({reported});
  }
};