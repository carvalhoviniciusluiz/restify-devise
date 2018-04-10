'use strict'

import passport from 'passport'
import { unlocks } from '../controllers'

export default function (server) {
  server.get({
    name: 'unlock//get',
    path: '/unlock'
  },
  passport.authenticate('jwtUrlQueryStrategy', {
    session: false
  }),
  unlocks.unlock)
}
