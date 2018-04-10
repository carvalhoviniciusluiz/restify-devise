'use strict'

import path from 'path'
import restify from 'restify'
import logger from 'winston'
import * as errors from 'restify-errors'
import chalk from 'chalk'
import config from '../config'
import router from './router'
import compression from 'compression'
import helmet from 'helmet'
import validator from 'restify-joi-middleware'
import passport from './helpers/passport'
import restifyRender from 'restify-render-middleware'
import { pug } from 'consolidate'
import acceptLanguage from 'accept-language'
import i18n, { languages } from './helpers/i18n'

// set supported languages
acceptLanguage.languages(languages)

const server = restify.createServer({
  name: 'Restify Devise',
  version: '1.0.0',
  // https://github.com/restify/node-restify/issues/1219#issuecomment-328499227
  // https://github.com/makeomatic/restify-formatter-jsonapi/issues/2#issuecomment-307285452
  ignoreTrailingSlash: true
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.gzipResponse())

// https://www.npmjs.com/package/compression#filter-1
server.use(compression({
  filter (request, response) {
    if (request.headers['x-no-compression']) {
      logger.warn('server', 'X-No-Compresseion')
      // don't compress responses with this request header
      return false
    }

    // fallback to standard filter function
    return compression.filter(request, response)
  }
}))

// https://www.npmjs.com/package/helmet#how-it-works
server.use(helmet())
server.use(helmet.noCache())
server.use(helmet.referrerPolicy())

// joi validation middleware for restify
server.use(validator({
  joiOptions: {
    allowUnknown: false
  },
  errorTransformer: (validationInput, joiError) => {
    const { type, context } = joiError.details[0]
    const retError = new errors.BadRequestError()
    retError.body.message = {
      warn: `'${i18n.t(context.key)}' ${i18n.t(type, context)}`,
      context: joiError.details[0].context
    }
    return retError
  }
}))

// i18n middleware for restify
server.use(i18n.handler())

// add res.render()
server.use(restifyRender({
  engine: pug,
  dir: path.join(__dirname, 'views')
}))

server.pre((request, response, next) => {
  logger.info('[server]', request.method, request.url)
  next()
})

server.pre((req, res, next) => {
  const headerValue = req.headers['accept-language']

  if (headerValue) {
    i18n.changeLanguage(acceptLanguage.get(headerValue))
  }

  next()
})

passport.initialize(server)

// asset routing added
server.get('/assets/*', restify.plugins.serveStatic({
  directory: __dirname
  // default: 'style.css'
}))

// set routes app
router(server)

// TODO
// http://restify.com/docs/plugins-api/#auditlogger
// https://github.com/trentm/node-bunyan-winston/blob/master/restify-winston.js#L18-L80

// Restify servers emit all the events from the node http.Server and has several other events you want to listen on.
// http://nodejs.org/docs/latest/api/http.html#http_class_http_server

// When a client request is sent for a URL that does not exist, restify will emit this event.
// Note that restify checks for listeners on this event, and if there are none, responds with a default 404 handler.
// It is expected that if you listen for this event, you respond to the client.

server.on('NotFound', (request, response, error, next) => {
  const url = (request.isSecure())
    ? 'https'
    : 'http' + '://' + request.headers.host + request.url

  logger.warn('[server]', `Route ${chalk.cyan(url)} not found`)
  return next(new errors.NotFoundError())
})

// When a client request is sent for a URL that does exist, but you have not registered a route for that HTTP verb,
// restify will emit this event. Note that restify checks for listeners on this event, and if there are none,
// responds with a default 405 handler. It is expected that if you listen for this event, you respond to the client.
// server.on('MethodNotAllowed', (request, response, next) => {})

// When a client request is sent for a route that exists, but does not match the version(s) on those routes,
// restify will emit this event. Note that restify checks for listeners on this event, and if there are none,
// responds with a default 400 handler. It is expected that if you listen for this event, you respond to the client.
// server.on('VersionNotAllowed', (request, response, next) => {})

// When a client request is sent for a route that exist, but has a content-type mismatch,
// restify will emit this event. Note that restify checks for listeners on this event, and if there are none,
// responds with a default 415 handler. It is expected that if you listen for this event, you respond to the client.
// server.on('UnsupportedMediaType', (request, response, next) => {})

// Emitted after a route has finished all the handlers you registered.
// You can use this to write audit logs, etc. The route parameter will be the Route object that ran.
// server.on('after', (request, response, route, error) => {})

// Emitted when some handler throws an uncaughtException somewhere in the chain.
// The default behavior is to just call res.send(error), and let the built-ins in restify handle transforming,
// but you can override to whatever you want here.
server.on('uncaughtException', (request, response, route, error) => {
  logger.error('[server]', error.stack)
  response.send(error)
})

// error handler
server.on('error', (error) => {
  onError(error)
})

const port = normalizePort(config.server.port)

/**
  * Normalize a port into a number, string, or false.
  */
function normalizePort (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
  * Event listener for HTTP server "error" event.
  */
function onError (err) {
  if (err.syscall !== 'listen') {
    throw err
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  /* eslint-disable no-unreachable */
  switch (err.code) {
    case 'EACCES':
      logger.error('[server]', `${bind} requires elevated privileges`)
      process.exit(1)
      break

    // lsof -i tcp:8088
    // kill -9 <PID>
    case 'EADDRINUSE':
      logger.error('[server]', `${bind} is already in use`)
      // https://nodejs.org/api/process.html#process_signal_events
      // process.kill(process.pid, 'EADDRINUSE')
      process.exit(1)
      break

    default:
      throw err
  }
}

module.exports = server
