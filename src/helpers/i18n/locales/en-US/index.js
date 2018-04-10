'use strict'

import { default as attributes } from './attributes'
import { default as devise } from './devise'
import { default as mailer } from './mailer'
import { default as renderControllers } from './render-controllers'
import { default as validation } from './validation'

module.exports = Object.assign({
  errors: {
    blank: 'can\'t be blank',
    invalid: 'is invalid'
  }
}, attributes, devise, mailer, renderControllers, validation)
