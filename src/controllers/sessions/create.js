'use strict'

import { User } from '../../models/user'
import * as errors from 'restify-errors'
import logger from 'winston'
import { Passport, Ip } from '../../helpers'

// POST /session
async function create (req, res, next) {
  logger.info('[controller]', 'sessions', 'session_user_authenticate')
  const { email, password } = req.body.payload
  const ip = await Ip.externalIpAddress()
  try {
    const user = await User.authenticate({ email, password }, { req })
    await user.track(ip)
    res.json(200, Passport.signJwt({ email }))
  } catch (error) {
    logger.warn('[controller]', 'sessions', error.message)
    next(new errors.InvalidCredentialsError(error.message))
  }
}

module.exports = create
