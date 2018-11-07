const CONFIG = require('../config/Config');
const fetch = require('node-fetch');

var getOne = async (lat, lon) => {
  const response = await fetch('http://dev.virtualearth.net/REST/v1/Locations/' + lat + ',' + lon + '?key=' + CONFIG.BING_API);
  const json = await response.json();
  return (json.resourceSets[0].resources[0].address.locality);
};

module.exports = getOne;