import Fastify from 'fastify'
import { config } from './config.js'
import { filmRoutes } from './routes/film.route.js'
import swagger from '@fastify/swagger';

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

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: config.port })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()