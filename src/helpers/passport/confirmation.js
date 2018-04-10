'use strict'

import { User } from '../../models/user'
import * as errors from 'restify-errors'
import logger from 'winston'
import { omit } from 'lodash'

async function confirmation (jwtPayload, next) {
  const criteria = {}
  const token = omit(jwtPayload, ['exp', 'iat'])
  const attrName = Object.keys(token).map((k) => k).shift()
  try {
    if (attrName !== undefined) {
      criteria[attrName] = jwtPayload[attrName]
      const user = await User.findOne(criteria)
      if (user) {
        logger.info('Passport', 'Validation request')
        return next(null, user)
      }
    }
    logger.warn('Passport', `Invalid token ${jwtPayload[attrName]}`)
    next(new errors.NotAuthorizedError('Unauthorized'), false)
  } catch (err) {
    logger.error('Passport', `Error during validation to token ${jwtPayload[attrName]}`, err)
    next(err, false)
  }
}

module.exports = confirmation
