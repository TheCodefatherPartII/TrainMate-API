process.on('unhandledRejection', (up) => { throw up; });
process.on('uncaughtException', (up) => { throw up; });

module.exports.handler = async () => {
  /* Following command is used to download data we ingest into Aurora
  curl -X GET --header 'Accept: application/zip' --header 'Authorization: apikey Fnlvb7zDkIF01cCSYpvYKpvb6n2HpmXW8kHP' 'https://api.transport.nsw.gov.au/v1/gtfs/schedule/sydneytrains' > schedule.zip
  */
  console.log();
};
