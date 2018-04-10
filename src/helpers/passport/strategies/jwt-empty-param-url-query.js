'use strict'

import chalk from 'chalk'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from '../../../../config'
import logger from 'winston'

const options = {}
options.secretOrKey = config.jwt.secret
options.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('token')

// e.g /confirmation?token=
export const jwtEmptyParamUrlQueryStrategy = new JwtStrategy(options, (jwtPayload, next) => {
  logger.info('Passport', `${chalk.green('[jwtEmptyParamUrlQueryStrategy]')} payload received: ${jwtPayload}`)
  next(null, true)
})
