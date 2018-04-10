'use strict'

import * as errors from 'restify-errors'
import logger from 'winston'
import config from '../../../config'
import { userLanguageObject } from '../../helpers/i18n'

// GET /confirmation/jwt?token=abcdef
async function confirm (req, res, next) {
  logger.info('[controller]', 'confirmations', 'confirmation_user_ok')
  try {
    await req.user.confirm()
    res.render('confirmations/confirm.pug', {
      redirectToUrl: config.uri.client,
      i18n: userLanguageObject(req)
    })
  } catch (error) {
    logger.warn('[controller]', 'confirmations', error.message)
    next(new errors.InvalidCredentialsError(error.message))
  }
}

module.exports = confirm
