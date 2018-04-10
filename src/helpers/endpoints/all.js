'use strict'

import Table from 'cli-table'
import assert from 'assert-plus'

function listAll (server) {
  assert.object(server)

  const routes = server.router.getRoutes()
  const table = new Table({ head: ['', 'name', 'path'] })

  for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
      const val = routes[key]
      const _o = {}
      _o[val.method] = [val.name, val.path]
      table.push(_o)
    }
  }
  return table.toString()
}

module.exports = listAll
