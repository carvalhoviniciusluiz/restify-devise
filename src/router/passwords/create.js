'use strict'

import Joi from 'joi'
import passport from 'passport'
import { passwords } from '../../controllers'

export default function (server) {
  server.post({
    name: 'password//post',
    path: '/password',
    validation: {
      schema: {
        body: Joi.object({
          payload: Joi.object({
            email: Joi.string().email().required()
          }).required()
        }).required()
      }
    }
  },
  passport.authenticate('jwtEmptyParamUrlQueryStrategy', {
    session: false
  }),
  passwords.create) // recover
}
