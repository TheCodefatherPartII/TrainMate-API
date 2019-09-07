const data = require('./data');

process.on('unhandledRejection', (up) => { throw up; });
process.on('uncaughtException', (up) => { throw up; });

module.exports.handler = async (event, context, callback) => {
  const trips = await data();

  const response =  {
    statusCode: 200,
    body: JSON.stringify(trips)
  };

  callback(null, response);
};
