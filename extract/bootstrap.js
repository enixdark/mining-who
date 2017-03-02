require('trycatch').configure({'long-stack-traces': true})

module.exports = function(loggger){
  //catch all exception that unknown
  process.on('uncaughtException', (err) => logger.log(err.stack))
  process.on('uncaughtApplicationException', (err) => logger.log(err.stack))
  process.on('unhandledRejection', (err) => logger.log(err.stack))
}