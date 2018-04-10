'use strict'

import joi from 'joi'

const envVarsSchema = joi.object({
  CLIENT_URI: joi.string()
    .required(),
  MONGODB_URI: joi.string()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  uri: {
    client: envVars.CLIENT_URI,
    db: envVars.MONGODB_URI
  }
}

module.exports = config
