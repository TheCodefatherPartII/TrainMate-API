const axios = require('axios');

module.exports = async () => {
  const dataUrl = "https://anytrip.com.au/api/v3/region/au2/vehicles";
  const params = {
    maxLat: -33.50798440456585,
    maxLon: 151.88024658203125,
    minLat: -34.14613482031263,
    minLon: 150.0858483886719,
    otrFilter: 300,
    speedFilter: 15,
    feeds: ["au2:st"].join(",") // Syndey trains: "au2:st", NSW trains: "au2:nt"
  };

  const { data: { response: { vehicles } } } = await axios.get(dataUrl, { params });

  console.log(JSON.stringify(vehicles[0]));

  const trips = vehicles
    .map(v => ({
        id: v.vehicleInstance.id,
        date: v.tripInstance.startDate,
        time: v.tripInstance.time,
        routeName: v.tripInstance.trip.route.longName,
        routeDescription: v.tripInstance.trip.route.description,
      })
    );

  return trips;
}