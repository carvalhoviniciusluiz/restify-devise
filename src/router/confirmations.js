'use strict'

import passport from 'passport'
import { confirmations } from '../controllers'

export default function (server) {
  server.get({
    name: 'confirmation//confirm',
    path: '/confirmation'
  },
  passport.authenticate('jwtUrlQueryStrategy', {
    session: false
  }),
  confirmations.confirm)
}
