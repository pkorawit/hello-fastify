import Fastify from 'fastify'
import { config } from './config.js'
import { filmRoutes } from './routes/film.route.js'
import swagger from '@fastify/swagger'
import socketio from 'fastify-socket.io'

console.log(config);
const fastify = Fastify({
  logger: true
})

fastify.register(swagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
})

fastify.register(filmRoutes)
fastify.register(socketio)

// Test route for sending a message to client
fastify.get('/ws', (req, reply) => {
  fastify.io.emit('message', 'hello from server')
  reply.send('done')
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: config.port })
    // Listen to an event after server ready
    fastify.io.on('connect', (socket) => console.log('Socket connected!', socket.id))
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()