'use strict'

import { networkInterfaces } from 'os'

// https://gist.github.com/szalishchuk/9054346#gistcomment-2369455
async function externalIpAddress () {
  return [].concat(...Object.values(networkInterfaces()))
    .filter(details => details.family === 'IPv4' && !details.internal)
    .pop().address
}

module.exports = externalIpAddress
