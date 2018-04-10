'use strict'

import fs from 'fs'

export default function (server) {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file.indexOf('index') === -1) {
      const router = require(`./${file}`)
      router.default(server)
    }
  })
}
