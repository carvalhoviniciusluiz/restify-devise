'use strict'

import { passwords } from '../../controllers'

export default function (server) {
  server.post({
    name: 'password//recoveryToken',
    path: '/recoveryToken'
  },
  passwords.recoveryToken)
}
