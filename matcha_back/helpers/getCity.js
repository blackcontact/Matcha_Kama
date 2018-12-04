const CONFIG = require('../config/Config');
const fetch = require('node-fetch');

var getOne = async (lat, lon) => {
  try {
    const response = await fetch('http://dev.virtualearth.net/REST/v1/Locations/' + lat + ',' + lon + '?key=' + CONFIG.BING_API);
    const json = await response.json();
    console.log(json.resourceSets[0].resources[0].address.locality);
    return (json.resourceSets[0].resources[0].address.locality);  
  } catch (err) {
    console.log('error in getCity');
    return '';
  }
};

module.exports = getOne;