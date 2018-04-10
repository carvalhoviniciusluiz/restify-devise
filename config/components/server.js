'use strict'

import joi from 'joi'

const envVarsSchema = joi.object({
  PORT: joi.number()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  server: {
    port: envVars.PORT
  }
}

module.exports = config
