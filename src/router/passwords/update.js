'use strict'

import Joi from 'joi'
import passport from 'passport'
import { passwords } from '../../controllers'

export default function (server) {
  server.post({
    name: 'password//changed',
    path: '/password_changed',
    validation: {
      schema: {
        body: Joi.object({
          password: Joi.string()
            .min(6)
            .max(15)
            .required(),
          password_confirmation: Joi.any()
            .valid(Joi.ref('password'))
            .required()
        }).required()
      },
      options: {
        joiOptions: {
          allowUnknown: true
        },
        errorResponder (transformedErr, req, res, next) {
          req.ifError = transformedErr
          return next()
        }
      }
    }
  },
  passport.authenticate('jwtBodyFieldStrategy', {
    session: false
  }),
  passwords.update) // change password
}
