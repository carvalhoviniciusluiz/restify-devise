'use strict'

import path from 'path'
import assert from 'assert-plus'
import logger from 'winston'
import EmailTemplates from 'email-templates'
import config from '../../config'
import * as errors from 'restify-errors'

// using sendgrid's email sending service
import sgMail from '@sendgrid/mail'

export const mailerSender = async (templateName, locals) => {
  try {
    assert.object(locals, 'locals')
    assert.ok(locals.email, 'locals.email')
    assert.ok(locals.subject, 'locals.subject')
    assert.ok(templateName, 'HTML template')

    // const view = path.join(`${__dirname}/templates`, templateName)

    // css not applied correctly
    // const html = await require('consolidate').pug(`${view}.pug`, locals)

    const email = new EmailTemplates({
      views: {
        root: path.join(__dirname, 'templates')
      },
      transport: {
        jsonTransport: true
      }
    })
    const html = await email.render(templateName, locals)

    // if we are testing don't send out an email instead return
    // success and the html for inspection
    if (config.isTest) {
      return {
        responseStatus: '250 2.0.0 OK 1350452502 s5sm19782310obo.10',
        html
      }
    }

    sgMail.setApiKey(config.mailer.key)
    const msg = {
      to: locals.email,
      from: {
        email: config.mailer.user,
        name: 'Restify Devise'
      },
      subject: locals.subject,
      html
    }

    const res = await sgMail.send(msg)

    if (!config.isProduction) {
      logger.info('[senders]', `${res[0].statusCode} ${res[0].statusMessage}`)
    }
  } catch (error) {
    logger.error('[senders]', error)
    throw new errors.NotFoundError(error.message)
  }
}
