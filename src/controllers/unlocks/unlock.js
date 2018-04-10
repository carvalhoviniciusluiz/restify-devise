'use strict'

import { User } from '../../models/user'
import * as errors from 'restify-errors'
import logger from 'winston'
import config from '../../../config'
import { userLanguageObject } from '../../helpers/i18n'

// GET /unlock/jwt?token=abcdef
async function unlock (req, res, next) {
  logger.info('[controller]', 'unlocks', 'unlock_user_account')
  try {
    await User.unlock(req.user.unlockToken)
    res.render('unlocks/unlock.pug', {
      redirectToUrl: config.uri.client,
      i18n: userLanguageObject(req)
    })
  } catch (error) {
    logger.warn('[controller]', 'unlocks', error.message)
    next(new errors.InvalidCredentialsError(error.message))
  }
}

module.exports = unlock
