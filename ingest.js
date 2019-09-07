process.on('unhandledRejection', (up) => { throw up; });
process.on('uncaughtException', (up) => { throw up; });

module.exports.handler = async () => {
  console.log();
};
