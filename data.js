const axios = require('axios');

module.exports = async () => {
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
        carriageIDs: v.vehicleInstance.id.split('.'),
        occupancy: v.vehicleInstance.lastPosition.occupancy,
      })
    );

  return trips;
}