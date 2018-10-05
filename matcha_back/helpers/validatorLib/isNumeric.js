function isNumeric(str) {
    'use strict';

    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = isNumeric;