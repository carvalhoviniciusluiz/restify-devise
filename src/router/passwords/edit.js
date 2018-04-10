'use strict'

import passport from 'passport'
import { passwords } from '../../controllers'

export default function (server) {
  server.get({
    name: 'password//change',
    path: '/change_password'
  },
  passport.authenticate('jwtEmptyParamUrlQueryStrategy', {
    session: false
  }),
  passwords.edit)
}
