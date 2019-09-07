const data = require('./data');

module.exports.handler = async (event, context, callback) => {
  const response =  {
    statusCode: 200,
    body: JSON.stringify(await data())
  };

  callback(null, response);
};
