const faker = require('faker');
const _ = require('lodash');
const profilModel = require('../models/profilModel');
const userModel = require('../models/userModel');

faker.locale = 'fr';

module.exports = {
  async generate100(req, res) {
    try {
      let i = 0;
      while (i < 100)
      {
        let firstname = _.deburr(faker.name.firstName());
        let lastname = _.deburr(faker.name.lastName());
        let username = firstname.toLowerCase() + lastname.toLowerCase();
        let email = firstname.toLowerCase() + '.' + lastname.toLowerCase() + '@gmail.com';
        let password_hash = '$2b$10$o5Cb3hTEkWmd0MI4dEYz9earHKZMAbbnCloKvZDx2oQB24MvLY.bS';
        let validation_code = null;
        let user = await userModel.newUser({username, email, firstname, lastname}, password_hash, validation_code);
        let user_id = user.insertId;
        let age = faker.random.number({min:18, max:85});
        let gender = faker.random.number(1);
        let sexTest = faker.random.number({min:1, max:100});
        let sexual_orientation;
        if (sexTest >= 30)
          sexual_orientation = 0; // Hetero
        else if (sexTest >= 10)
          sexual_orientation = 2; // Homo
        else
          sexual_orientation = 1; // Bi
        let bio = faker.lorem.paragraph();
        let image = [faker.image.avatar()];
        await profilModel.createOne(user_id, age, gender, sexual_orientation, bio, JSON.stringify(image));
        i++;
      }
      res.send('ok');
    } catch (e) {
      res.send(e);
    }
  }
};