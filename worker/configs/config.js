module.exports = {
    'RABBITMQ_URI': process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
    'RABBITMQ_CHANNEL': process.env.RABBITMQ_CHANNEL || 'channel',
    'RABBITMQ_EXCHANGE': process.env.RABBITMQ_EXCHANGE || 'exchange',
    'RABBITMQ_QUEUE': process.env.RABBITMQ_QUEUE || 'queue',
    'RABBITMQ_ROUTE': process.env.RABBITMQ_ROUTE || '#',
    'RABBITMQ_DURABLE': process.env.RABBITMQ_DURABLE || true,
    'RABBITMQ_PERSISTENT': process.env.RABBITMQ_PERSISTENT || true,
    'ENV': process.env.NODE_ENV || 'development', 
    'RABBITMQ_FETCH_MESSAGE': process.env.RABBITMQ_FETCH_MESSAGE || 50,
    'RABBITMQ_ACK_TIMEOUT': process.env.RABBITMQ_ACK_TIMEOUT || 5000,
    'RABBITMQ_REQUEST_LIMIT_TIMEOUT': process.env.RABBITMQ_REQUEST_LIMIT_TIMEOUT || 10000,
    'RETRY': process.env.RETRY || 5,
    'DATABASE': {
      'development': {
        'MONGODB_URI': process.env.MONGODB_URI || 'mongodb://localhost:27017/dns'
      },
      'production': {

      }
    } 
}

//'mongodb://103.57.220.75:27017/quandc'