'use strict'

import { default as attributes } from './attributes'
import { default as devise } from './devise'
import { default as mailer } from './mailer'
import { default as renderControllers } from './render-controllers'
import { default as validation } from './validation'

module.exports = Object.assign({
  errors: {
    blank: 'não pode ficar em branco',
    invalid: 'não é válido'
  }
}, attributes, devise, mailer, renderControllers, validation)
