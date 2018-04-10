'use strict'

import passport from 'passport'
import signJwt from './sign-jwt'
import { jwtBodyFieldStrategy } from './strategies/jwt-body-field'
import { jwtEmptyParamUrlQueryStrategy } from './strategies/jwt-empty-param-url-query'
import { jwtUrlQueryStrategy } from './strategies/jwt-url-query'
import confirmation from './confirmation'

module.exports = {
  initialize (server) {
    server.use(passport.initialize())
    passport.use('jwtBodyFieldStrategy', jwtBodyFieldStrategy)
    passport.use('jwtEmptyParamUrlQueryStrategy', jwtEmptyParamUrlQueryStrategy)
    passport.use('jwtUrlQueryStrategy', jwtUrlQueryStrategy(confirmation))
  },
  signJwt
}
