// @see https://www.npmjs.com/package/winston
'use strict'

import joi from 'joi'
import winston from 'winston'

const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  }
}

const file = process.env.NODE_ENV || 'environment'

winston.level = config.logger.level
winston.add(winston.transports.File, { name: 'main', filename: `log/${file}.log` })

if (!config.logger.enabled) {
  winston.remove(winston.transports.Console)
}

module.exports = config
