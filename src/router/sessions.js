'use strict'

import Joi from 'joi'
import { sessions } from '../controllers'

export default function (server) {
  server.post({
    name: 'session//post',
    path: '/session',
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
              .required()
          }).required()
        }).required()
      }
    }
  }, sessions.create) // sign_in
}
