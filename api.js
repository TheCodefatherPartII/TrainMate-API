const { apiData, dbData } = require('./data');

process.on('unhandledRejection', (up) => { throw up; });
process.on('uncaughtException', (up) => { throw up; });

module.exports.handler = async (event, context, callback) => {
  const trips = await apiData();
  const tripIds = trips.map(t => t.id);
  const tripStops = await dbData(tripIds);

  const body = JSON.stringify(
    trips.map((trip) => Object.assign(trip, {
      stops: tripStops.filter(stop => stop.trip_id == trip.id).map(stop => ({
         name: stop.stop_name, time: stop.arrival_time
      }))
    }))
  );

  const response =  {
    statusCode: 200,
    body
  };

  callback(null, response);
};
