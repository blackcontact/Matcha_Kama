const _ = require('lodash');
const profileModel = require('../models/profileModel');
const userModel = require('../models/userModel');


module.exports = {
  async generate100(req, res) {
    const faker = require('faker');
    faker.locale = 'fr';
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
        let image = [faker.image.avatar()];
        await profileModel.createOne(user_id, age, gender, sexual_orientation, bio, JSON.stringify(image));
        i++;
      }
      res.send('ok');
    } catch (err) {
      res.send({err});
    }
  }
};