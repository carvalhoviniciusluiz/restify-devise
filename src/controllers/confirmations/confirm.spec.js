'use strict'

import faker from 'faker'
import { describe, it } from 'mocha'
import { expect, request } from 'chai'
import { User } from '../../models/user'
import * as jwt from 'jsonwebtoken'
import config from '../../../config'

const agent = request.agent(require('../../server'))

const createToken = (user) => {
  return jwt.sign({ confirmationToken: user.confirmationToken }, config.jwt.secret)
}

/* eslint-disable no-undef */
describe('Confirmations: controllers', () => {
  context('/confirmation?token=', () => {
    it('GET. Should throw exception if token not found', async () => {
      try {
        await agent.get(`/confirmation`)
      } catch (error) {
        expect(error).to.have.status(401)
      }
    })

    it('GET. Should throw exception if token invalid', async () => {
      try {
        await agent.get(`/confirmation?token=abc123`)
      } catch (error) {
        expect(error).to.have.status(401)
      }
    })

    it('GET. Should throw exception if token fake', async () => {
      try {
        await agent.get(`/confirmation?token=${createToken({})}`)
      } catch (error) {
        expect(error).to.have.status(403)
        expect(error.response.body.code).to.be.equal('NotAuthorized')
        expect(error.response.body.message).to.be.equal('Unauthorized')
      }

      try {
        await agent.get(`/confirmation?token=${createToken({ confirmationToken: 1 })}`)
      } catch (error) {
        expect(error).to.have.status(403)
        expect(error.response.body.code).to.be.equal('NotAuthorized')
        expect(error.response.body.message).to.be.equal('Unauthorized')
      }
    })

    it('GET. 200 ok', async () => {
      let user = await User.register({
        password: faker.internet.password(),
        email: faker.internet.email().toLowerCase()
      })
      const token = createToken(user)

      const res = await agent.get(`/confirmation?token=${token}`)
      expect(res).to.have.status(200)
    })
  })
})
