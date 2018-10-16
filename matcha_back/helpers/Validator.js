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
  if (firstname === '' || validator101.isAlphabetic(firstname) == false) {
    return ('Please enter a valid firstname (no special char and no number)');
  }
  if (lastname === '' || validator101.isAlphabetic(lastname) == false) {
    return ('Please enter a valid lastname (no special char and no number)');
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
};

module.exports = validator101;