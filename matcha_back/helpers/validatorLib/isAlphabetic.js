function isAlphabetic(n) {
    'use strict';
    const regex = /^[a-zA-Z]*$/;

    return regex.test(n);
}

module.exports = isAlphabetic;