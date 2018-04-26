'use strict'

import Joi from 'joi'
import { registrations } from '../controllers'

export default function (server) {
  server.post({
    name: 'registration//post',
    path: '/registration',
    validation: {
      schema: {
        body: Joi.object({
          payload: Joi.object({
            email: Joi.string()
              .email()
              .required(),
            password: Joi.string()
              .min(6)
              .max(15)
              .required(),
            passwordConfirmation: Joi.string()
              .valid(Joi.ref('password'))
              .required()
          }).required()
        }).required()
      }
    }
  }, registrations.create) // sign_up
}
