'use strict'

import { describe, it } from 'mocha'
import { expect, request } from 'chai'
import config from '../../../config'
import * as jwt from 'jsonwebtoken'

let token = ''

const agent = request.agent(require('../../server'))

const createToken = () => {
  return jwt.sign({}, config.jwt.secret)
}

/* eslint-disable no-undef */
describe('Passwords: controllers', () => {
  context('/change_password', () => {
    beforeEach(async () => {
      token = createToken()
    })

    it('GET. Should throw exception if token is not provided', async () => {
      try {
        await agent.get(`/change_password`)
      } catch (error) {
        expect(error).to.have.status(401)
      }
    })

    it('GET. Should throw exception if token invalid', async () => {
      try {
        await agent.get(`/change_password?token=abc123`)
      } catch (error) {
        expect(error).to.have.status(401)
      }
    })

    it('GET. 200 ok', async () => {
      const res = await agent.get(`/change_password?token=${token}`)
      expect(res).to.have.status(200)
    })
  })
})
