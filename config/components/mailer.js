'use strict'

import joi from 'joi'

const envVarsSchema = joi.object({
  MAILER_USER: joi.string()
    .required(),
  MAILER_KEY: joi.string()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  mailer: {
    user: envVars.MAILER_USER,
    key: envVars.MAILER_KEY
  }
}

module.exports = config
