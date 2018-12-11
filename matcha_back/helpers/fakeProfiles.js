const _ = require('lodash');
const profileModel = require('../models/profileModel');
const userModel = require('../models/userModel');
const tagModel = require('../models/tagModel');
const getCity = require('./getCity');

function rad(dg) {
  return (dg * Math.PI / 180);
}

function deg(rd) {
  return (rd * 180 / Math.PI);
}

function normalizeLongitude(lon) {
  var n = Math.PI;
  if (lon > n) {
    lon = lon - 2 * n;
  } else if (lon < -n) {
    lon = lon + 2 * n;
  }
  return lon;
}

function newGeoPoint(startlat, startlon, maxdist) {
  // Fonction inspiree par http://www.geomidpoint.com/random/
  var lat = 0;
  var lon = 0;
  if (startlat == -999) {
    return ('Problem');
  }
  var brg = new Array(0, 180, 0);
  if (startlat == 90) {
    startlat = 89.99999999;
  }
  if (startlat == -90) {
    startlat = -89.99999999;
  }
  startlat = rad(startlat);
  if (startlon == -999) {
    return ('Problem');
  }
  startlon = rad(startlon);
  var radiusEarth = 6372.796924;
  maxdist = maxdist / radiusEarth;
  var cosdif = Math.cos(maxdist) - 1;
  var sinstartlat = Math.sin(startlat);
  var cosstartlat = Math.cos(startlat);
  var dist = 0;
  var rad360 = 2 * Math.PI;

  dist = Math.acos(Math.random() * cosdif + 1);
  brg[0] = rad360 * Math.random();
  lat = Math.asin(sinstartlat * Math.cos(dist) + cosstartlat * Math.sin(dist) * Math.cos(brg[0]));
  lon = deg(normalizeLongitude(startlon * 1 + Math.atan2(Math.sin(brg[0]) * Math.sin(dist) * cosstartlat, Math.cos(dist) - sinstartlat * Math.sin(lat))));
  lat = deg(lat);
  dist = Math.round(dist * radiusEarth * 10000) / 10000;
  brg[0] = Math.round(deg(brg[0]) * 1000) / 1000;
  const returnPoint = {
    lat,
    lon
    //distance: dist
  };
  return returnPoint;
}

async function generateOne(faker, maxtags) {
  let firstname = _.deburr(faker.name.firstName());
  let lastname = _.deburr(faker.name.lastName());
  let username = firstname.toLowerCase() + lastname.toLowerCase();
  let email = firstname.toLowerCase() + '.' + lastname.toLowerCase() + '@gmail.com';
  let password_hash = '$2b$10$o5Cb3hTEkWmd0MI4dEYz9earHKZMAbbnCloKvZDx2oQB24MvLY.bS'; //test01
  let validation_code = null;
  let age = faker.random.number({min:18, max:85});
  let gender = faker.random.number(1) ? 'M' : 'F';
  let sexTest = faker.random.number({min:1, max:100});
  let sexual_orientation;
  if (sexTest >= 30)
    sexual_orientation = 'E'; // Hetero
  else if (sexTest >= 10)
    sexual_orientation = 'O'; // Homo
  else
    sexual_orientation = 'B'; // Bi
  let bio = faker.lorem.paragraph();
  let avatar = (gender == 'M') ? 'male-' + faker.random.number({min:1,max:120}) + '.png' : 'female-' + faker.random.number({min:1,max:117}) + '.png';
  avatar = 'samplephotos/' + avatar;
  let images = 'samplephotos/image-' + faker.random.number({min:1,max:120}) + '.jpg';
  let position = newGeoPoint(45.764043, 4.835658999999964, 50);
  let user = await userModel.newUser({username, email, firstname, lastname}, password_hash, validation_code);
  let user_id = user.insertId;
  await profileModel.createOne(user_id, age, gender, sexual_orientation, bio, avatar, JSON.stringify([images]), JSON.stringify(position), await getCity(position.lat, position.lon));
  var arr = [];
  while(arr.length < 8){
    var randomnumber = Math.floor(Math.random() * maxtags) + 1;
    if(arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
  }
  await tagModel.manualAddTags(user_id, arr);
}


module.exports = {
  async generate100(req, res) {
    console.log('Starting generator...');
    const faker = require('faker');
    faker.locale = 'fr';
    let i = 1;
    const total = (await tagModel.count())[0].total;
    while (i < 500)
    {
      console.log('Generate user #' + i);
      generateOne(faker, total);
      i++;
    }
    console.log('-----DONE-----');
    res.send('ok');
  }
};