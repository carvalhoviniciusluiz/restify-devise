'use strict'

import chalk from 'chalk'
import logger from 'winston'
import config from './config'

logger.info(`Starting '${chalk.cyan(config.type)}' process`, { pid: process.pid })

if (config.type === 'app') {
  require('./src')
} else {
  throw new Error(`
    ${chalk.cyan(config.type)} is an unsupported process type.
    Use one of: 'app'!
  `)
}
