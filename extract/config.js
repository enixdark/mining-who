module.exports = {
    'RABBITMQ_URI': process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672',
    'RABBITMQ_CHANNEL': process.env.RABBITMQ_CHANNEL || 'channel',
    'RABBITMQ_QUEUE': process.env.RABBITMQ_QUEUE || 'queue',
    'RABBITMQ_ROUTE': process.env.RABBITMQ_ROUTE || '#',
    'RABBITMQ_DURABLE': process.env.RABBITMQ_DURABLE || true,
    'RABBITMQ_PERSISTENT': process.env.RABBITMQ_PERSISTENT || true,
    'RABBITMQ_TIMEOUT': process.env.RABBITMQ_TIMEOUT || 2000,
    'ENV': process.env.NODE_ENV || 'development',
    'RABBITMQ_CLOSE': process.env.RABBITMQ_CLOSE || true,
    'MONGODB_COLLECTION': process.env.MONGODB_COLLECTION || 'queues'
}