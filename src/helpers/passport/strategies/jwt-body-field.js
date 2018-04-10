'use strict'

import chalk from 'chalk'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from '../../../../config'
import logger from 'winston'

const options = {}
options.secretOrKey = config.jwt.secret
options.jwtFromRequest = ExtractJwt.fromBodyField('token')

// e.g /change_password?token=
export const jwtBodyFieldStrategy = new JwtStrategy(options, (jwtPayload, next) => {
  logger.info('Passport', `${chalk.green('[jwtBodyFieldStrategy]')} payload received: ${jwtPayload}`)
  next(null, true)
})
