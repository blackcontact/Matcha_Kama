const searchModel = require('../models/searchModel');

function distance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }
}


module.exports = {
  async search(req, res) {
    if (req.body.age_min == undefined || req.body.age_max == undefined || req.body.pop_min == undefined || req.body.pop_max == undefined || req.body.dist_max == undefined)
      return res.status(400).send({err: 'Not a valid search query'});
    let search;
    try {
      let myProfile = (await searchModel.getMine(req.user.id))[0];
      const myTags = myProfile.tags.split(',');
      myProfile.position = JSON.parse(myProfile.position);
      //TODO: Changer les virgules du separator ?
      search = await searchModel.search(req.user.id, myProfile.sexual_orientation, myProfile.gender, req.body.age_min, req.body.age_max, req.body.pop_min, req.body.pop_max);
      search = search.map(x => {
        x.position = JSON.parse(x.position);
        x.tags = x.tags.split(',');
        x.sameTags = 0;
        x.distance = distance(myProfile.position.lat, myProfile.position.lon, x.position.lat, x.position.lon);
        if (x.distance > req.body.dist_max)
          return ;
        const tags = x.tags;
        tags.forEach(elem => {
          myTags.forEach(elem2 => {
            if (elem === elem2)
              x.sameTags++;
          });
        });
        return x;
      });
      res.send({result: search});
    } catch (err) {
      console.log(err);
      res.status(500).send({err});
    }
  }
};