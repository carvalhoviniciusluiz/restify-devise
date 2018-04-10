'use strict'

import * as jwt from 'jsonwebtoken'
import config from '../../../config'

function signJwt (user) {
  const token = jwt.sign({ user }, config.jwt.secret, {
    expiresIn: '3d'
  })
  return { token }
}

module.exports = signJwt
