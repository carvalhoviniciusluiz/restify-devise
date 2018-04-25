'use strict'

import * as errors from 'restify-errors'
import * as jwt from 'jsonwebtoken'
import logger from 'winston'
import config from '../../../config'

// GET /recoveryToken
async function recoveryToken (req, res, next) {
  logger.info('[controller]', 'passwords', 'recovery_token')

  try {
    const token = jwt.sign({}, config.jwt.secret, {
      expiresIn: '5m'
    })
    res.json(200, { token })
  } catch (error) {
    logger.warn('[controller]', 'sessions', error.message)
    next(new errors.InternalServerError(error.message))
  }
}

module.exports = recoveryToken
