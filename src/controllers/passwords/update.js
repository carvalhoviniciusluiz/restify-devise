'use strict'

import { User } from '../../models/user'
import * as errors from 'restify-errors'
import logger from 'winston'
import * as jwt from 'jsonwebtoken'
import config from '../../../config'
import { userLanguageObject } from '../../helpers/i18n'

// POST /password_changed
async function update (req, res, next) {
  logger.info('[controller]', 'passwords', 'password_changed')

  const { token, password } = req.body
  const decoded = await jwt.verify(token, config.jwt.secret)

  // if have is an error
  if (req.ifError) {
    const newToken = jwt.sign({
      recoveryToken: decoded.recoveryToken,
      error: req.ifError.body.message.warn
    }, config.jwt.secret)

    // https://github.com/restify/node-restify/blob/cf342b9d23ff1d0eb2734e9f59ccc707f358d75c/lib/response.js#L624
    return res.redirect({
      pathname: '/change_password',
      secure: req.isSecure(),
      query: {
        token: newToken
      }
    }, next)
  }

  try {
    const user = await User.recover(decoded.recoveryToken, password)
    res.render('passwords/update.pug', {
      redirectToUrl: config.uri.client,
      i18n: userLanguageObject({ user })
    })
  } catch (error) {
    logger.warn('[controller]', 'passwords', error.message)
    next(new errors.BadRequestError(error.message))
  }
}

module.exports = update
