const { apiData, dbData } = require('./data');

module.exports.handler = async (event, context, callback) => {
  const trips = await apiData();
  const tripIds = trips.map(t => t.id);
  console.log(`Found ${tripIds.length} trips via API`);

  const tripStops = await dbData(tripIds);
  console.log(`Found ${tripStops.length} stops via DB`);

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
