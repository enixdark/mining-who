require('trycatch').configure({'long-stack-traces': true})

module.exports = function(loggger){
  process.on('uncaughtException', (err) => logger.log(err.stack))
  process.on('uncaughtApplicationException', (err) => logger.log(err.stack))
  process.on('unhandledRejection', (err) => logger.log(err.stack))
}