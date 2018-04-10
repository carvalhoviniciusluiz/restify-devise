'use strict'

import { User } from '../../models/user'
import * as errors from 'restify-errors'
import logger from 'winston'

// POST /password
async function create (req, res, next) {
  logger.info('[controller]', 'passwords', 'password_recover')
  const { email } = req.body.payload
  try {
    await User.requestRecover({ email }, { req })
    res.json(204)
  } catch (error) {
    logger.warn('[controller]', 'passwords', error.message)
    next(new errors.BadRequestError(error.message))
  }
}

module.exports = create
