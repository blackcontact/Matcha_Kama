var isAlphaNumeric = require('./validatorLib/isAlphaNumeric');
var isNumeric = require('./validatorLib/isNumeric');
var isAlphabetic = require('./validatorLib/isAlphabetic');

function username(str) {
  if (!str) {
    return 'Please enter an username';
  }
  if (!(str.length >= 4 && str.length <= 20)) {
    return 'username must be between 4 and 20 chars';
  }
  if (!isAlphaNumeric(str)) {
    return 'username is not alphanumeric';
  }
}

function firstname(str) {
  if (!str) {
    return 'Please enter a first name';
  }
  if (!(str.length >= 2 && str.length <= 20)) {
    return 'first name must be between 2 and 20 chars';
  }
  if (!isAlphabetic(str)) {
    return 'first name is not alphanumeric';
  }
}

function lastname(str) {
  if (!str) {
    console.log(str);
    return 'Please enter a last name';
  }
  if (!(str.length >= 2 && str.length <= 20)) {
    return 'last name must be between 2 and 20 chars';
  }
  if (!isAlphabetic(str)) {
    return 'last name is not alphanumeric';
  }
}

function password(str) {
  const regex_digit = /\d/;
  const regex_alpha = /[a-zA-Z]+/g;

  if (!str) {
    return 'Please enter a password';
  }
  if (!(str.length >= 4 && str.length <= 20)) {
    return 'password must be between 4 and 20 chars';
  }
  if (regex_digit.test(str) == false) {
    return 'password must contains at least 1 digit';
  }
  if (regex_alpha.test(str) == false) {
    return 'password must contains at least 1 alphabetic character';
  }
}

function email(str) {
  const regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!str) {
    return 'Please enter an email';
  }
  if (regex_email.test(str) == false) {
    return 'Please enter a valid email';
  }
}

function age(str) {
  if (!str || str == '')
    return 'Please fill with something';
  if (!isNumeric(str))
    return 'Not a number';
  if (str < 18)
    return 'WTF You\'re way too young, please go to coco.fr';
  if (str > 100)
    return 'You filthy fuck, you\'re too old for this website grandpa';
  return;
}

function gender(str) {
  if (!str || str == '')
    return 'Please fill with something';
  if (str != 'M' && str != 'F') {
    return 'You sneaky bastard, you\'re trying to fuck with my form';
  }
  return;
}

function sexual_orientation(str) {
  if (!str || str == '')
    return 'Please fill with something';
  if (str != 'E' && str != 'O' && str != 'B') {
    return 'Fucking annoying cunt, stop screwing with the form and fill it correctly';
  }
  return;
}

function bio(str) {
  if (!str || str == '')
    return 'Please fill with something';
  if (str.length < 10)
    return 'Too short man, your life is that annoying?';
  if (str.length > 200)
    return 'C\'mon, it\'s a dating site, not Wikipedia';
  return;
}

function validateUserInput(User) {
  var username = User.username;
  var password = User.password;
  var email = User.email;
  var firstname = User.firstname;
  var lastname = User.lastname;
  var err;

  if ((err = validator101.username(username))) {
    return (err);
  }
  if ((err = validator101.password(password))) {
    return (err);
  }
  if ((err = validator101.email(email))) {
    return (err);
  }
  if ((err = validator101.firstname(firstname))) {
    return (err);
  }
  if ((err = validator101.lastname(lastname))) {
    return (err);
  }
  return;
}


const validator101 = {
  isAlphabetic,
  isAlphaNumeric,
  isNumeric,
  email,
  password,
  username,
  validateUserInput,
  age,
  gender,
  sexual_orientation,
  bio,
  firstname,
  lastname
};

module.exports = validator101;