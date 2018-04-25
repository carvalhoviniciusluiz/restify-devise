'use strict'

import { describe, it } from 'mocha'
import { expect, request } from 'chai'

const agent = request.agent(require('../../server'))

/* eslint-disable no-undef */
describe('Passwords: controllers', () => {
  context('/recoveryToken', () => {
    it('GET. 200 ok', async () => {
      const res = await agent.post('/recoveryToken')
      expect(res).to.have.status(200)
    })
  })
})
