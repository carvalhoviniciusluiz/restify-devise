'use strict'

import chalk from 'chalk'
import assert from 'assert-plus'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from '../../../../config'
import logger from 'winston'

const options = {}
options.secretOrKey = config.jwt.secret
options.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('token')

// e.g /confirmation?token=
export const jwtUrlQueryStrategy = (done) => {
  assert.func(done, 'not found (function) done')

  return new JwtStrategy(options, (jwtPayload, next) => {
    logger.info('[passport]',
      `${chalk.green('[jwtUrlQueryStrategy]')} payload received: ${jwtPayload}`)
    done(jwtPayload, next)
  })
}
