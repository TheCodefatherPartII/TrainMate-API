const axios = require('axios');

module.exports.handler = async (event, context, callback) => {
  const dataUrl = "https://anytrip.com.au/api/v3/region/au2/vehicles?maxLat=-33.50798440456585&maxLon=151.88024658203125&minLat=-34.14613482031263&minLon=150.0858483886719&otrFilter=300&speedFilter=15";
  const { data: { response: { vehicles } } } = await axios.get(dataUrl);

  console.log(vehicles);

  const response =  {
    statusCode: 200,
    body: JSON.stringify(vehicles)
  };

  callback(null, response);
};
