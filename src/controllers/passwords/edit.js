'use strict'

import logger from 'winston'
import * as jwt from 'jsonwebtoken'
import config from '../../../config'
import { changeLangRequest } from '../../helpers/i18n'

// GET /change_password?token=abcdef
async function create (req, res, next) {
  logger.info('[controller]', 'passwords', 'change_password')
  const { token } = req.query
  const decoded = await jwt.verify(token, config.jwt.secret)

  res.render('passwords/edit.pug', {
    token,
    i18n: changeLangRequest(req),
    error: decoded.error
  })
}

module.exports = create
