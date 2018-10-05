function isAlphaNumeric(n) {
    'use strict';
    const regex = /^[a-zA-Z0-9]*$/;

    return regex.test(n);
}

module.exports = isAlphaNumeric;