'use strict'

import { User } from '../../models/user'
import * as errors from 'restify-errors'
import logger from 'winston'

// POST /registration
async function create (req, res, next) {
  logger.info('[controller]', 'registrations', 'registration_user_new')
  const { email, password } = req.body.payload
  try {
    await User.register({ email, password }, { req })
    res.json(200)
  } catch (error) {
    logger.warn('[controller]', 'registrations', error.message)
    next(new errors.InvalidCredentialsError(error.message))
  }
}

module.exports = create
