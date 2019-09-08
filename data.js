const { Client } = require('pg');
const axios = require('axios');

const apiData = async () => {
  const dataUrl = "https://anytrip.com.au/api/v3/region/au2/vehicles";
  const params = {
    maxLat: -32.82746157127569,
    maxLon: 153.0008520507813,
    minLat: -34.47735382577876,
    minLon: 149.79471069335943,
    otrFilter: 300,
    speedFilter: 15,
    feeds: ["au2:st"].join(",") // Syndey trains: "au2:st", NSW trains: "au2:nt"
  };

  const { data: { response: { vehicles } } } = await axios.get(dataUrl, { params });

  const trips = vehicles
    .map(v => ({
        id: v.tripInstance.trip.id.replace('au2:st:', ''),
        date: v.tripInstance.startDate,
        time: v.tripInstance.time,
        routeName: v.tripInstance.trip.route.longName,
        routeDescription: v.tripInstance.trip.route.description,
        carriageIDs: (v.vehicleInstance.id || '').split('.'),
        occupancy: v.vehicleInstance.lastPosition.occupancy,
      })
    );

  return trips;
};

const dbData = async (tripIds) => {
  const client = new Client();
  await client.connect();

  const sql = `
    SELECT trip_id, stop_name, stop_sequence, arrival_time
    FROM stop_times
    LEFT JOIN stops ON stop_times.stop_id = stops.stop_id
    WHERE trip_id IN('${tripIds.join("','")}')
    ORDER BY trip_id ASC, stop_sequence ASC`;

  const { _rowCount, rows, _error } = await client.query(sql);

  await client.end();
  return rows;
};

module.exports = { apiData, dbData };