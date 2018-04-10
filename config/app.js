'use strict'

import common from './components/common'
import jwt from './components/jwt'
import logger from './components/logger'
import mailer from './components/mailer'
import server from './components/server'
import uri from './components/uri'

module.exports = Object.assign({}, common, jwt, logger, mailer, server, uri)
