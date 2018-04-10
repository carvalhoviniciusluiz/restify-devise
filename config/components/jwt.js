'use strict'

import joi from 'joi'

const envVarsSchema = joi.object({
  SECRET_KEY: joi.string()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  jwt: {
    secret: envVars.SECRET_KEY
  }
}

module.exports = config
