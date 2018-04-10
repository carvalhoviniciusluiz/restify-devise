'use strict'

import server from './server'
import chalk from 'chalk'
import logger from 'winston'
import config from '../config'
import databaseConnection, { databaseValidate } from './database'
import beforeServerListen from './cluster'
import endpoints from './helpers/endpoints'

// Verify `cluster` need
beforeServerListen(() => {
  if (config.isDevelop) {
    console.log(endpoints.listAll(server))
  }
  server.listen(config.server.port, () => databaseConnection(config.uri.db))
})

Promise.all([databaseValidate])
  .then(() => {
    logger.info('[app]', `Restify started in ${chalk.bold(config.env)}` +
                ` mode on ${chalk.cyan(server.url)}` +
                '; press Ctrl-C to terminate.')
  })
  .catch((error) => {
    if (error instanceof Error) {
      logger.error('[app]', error.stack)
    }
  })
