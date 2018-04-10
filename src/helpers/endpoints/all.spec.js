'use strict'

import { describe, it } from 'mocha'
import { expect } from 'chai'
import restify from 'restify'
import endpoints from '.'

const server = restify.createServer()
server.get('/hello/:name', (req, res, next) => next())

/* eslint-disable no-undef */
describe('endpoints: helpers', () => {
  context('.all', () => {
    it('Should throw exception if server is not provided', () => {
      try {
        endpoints.listAll()
      } catch (error) {
        expect(error.code).to.be.equal('ERR_ASSERTION')
      }
    })
    it('Should not return empty', () => {
      const output = endpoints.listAll(server)
      expect(output).to.be.not.undefined()
      expect(output).to.be.not.null()
    })
  })
})
