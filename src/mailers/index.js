'use strict'

import joi from 'joi'
import logger from 'winston'
import config from '../../config'
import { mailerSender } from './senders'
import { userLanguageObject } from '../helpers/i18n'
import acceptLanguage from 'accept-language'
import * as jwt from 'jsonwebtoken'

let options = {}

const createToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: `${options.jwt.tokenLifeSpan}d`
  })
}

const checkOptions = (input) => {
  const schemaOptions = joi.object().keys({
    req: joi.object().keys({
      isSecure: joi.func(),
      headers: joi.object().keys({
        host: joi.string()
      }).required()
    }).required()
  })
  const { error } = joi.validate(input, schemaOptions, { allowUnknown: true })
  return error
}

// implementation of notification send
const sendNotification = (record, action, done) => {
  done((opts) => {
    if (!checkOptions(opts)) {
      if (!options.i18n) {
        throw new Error(`Error: mailers, bad configuration found: i18n not found`)
      }

      const host = opts.req.isSecure()
        ? 'https'
        : 'http' + '://' + opts.req.headers.host

      let token = ''
      let subject = ''
      let url = ''

      // sets the correct language for emplate
      const i18n = userLanguageObject({ user: record })

      switch (action) {
        case 'account_confirmation':
          token = createToken({ confirmationToken: record.confirmationToken })
          url = `${host}/confirmation`
          subject = i18n.t('mailer.account_confirmation.subject')
          break

        case 'password_recovery':
          token = createToken({ recoveryToken: record.recoveryToken })
          url = `${host}/change_password`
          subject = i18n.t('mailer.password_recovery.subject')
          break

        case 'account_recovery':
          token = createToken({ unlockToken: record.unlockToken })
          url = `${host}/unlock`
          subject = i18n.t('mailer.account_recovery.subject')
          break

        default:
          logger.warn('mailer', 'Template not found')
      }

      // send mail
      mailerSender(action, {
        i18n,
        subject,
        email: record.email,
        url: `${url}?token=${token}`
      })
    }
  })
}

export default function (schema, opt) {
  options = Object.assign({
    jwt: {
      tokenLifeSpan: 3
    }
  }, opt)

  // TODO
  // https://github.com/Automattic/kue
  // https://github.com/OptimalBits/bull

  // implementation of notification send
  schema.methods.send = sendNotification
}
