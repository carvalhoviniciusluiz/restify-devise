'use strict'

import faker from 'faker'
import { describe, it } from 'mocha'
import { expect, request } from 'chai'
import { User } from '../../models/user'
import config from '../../../config'
import * as jwt from 'jsonwebtoken'

let user = {}
let token = ''

const agent = request.agent(require('../../server'))

const createToken = () => {
  return jwt.sign({}, config.jwt.secret)
}

/* eslint-disable no-undef */
describe('Passwords: controllers', () => {
  context('/password', () => {
    beforeEach(async () => {
      user = await User.register({
        password: faker.internet.password(),
        email: faker.internet.email().toLowerCase()
      })
      token = createToken()
    })

    it('POST. Should throw exception if body is not provided', async () => {
      try {
        await agent.post(`/password`)
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if email is not provided', async () => {
      try {
        await agent.post(`/password`).send({ payload: {} })
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if email invalid', async () => {
      try {
        await agent.post(`/password`).send({ payload: { email: 'email' } })
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if token invalid', async () => {
      try {
        await agent.post(`/password?token=abc123`)
          .send({ payload: { email: user.email } })
      } catch (error) {
        expect(error).to.have.status(401)
      }
    })

    it('POST. Should throw exception if email not have confirmed', async () => {
      try {
        await agent.post(`/password?token=${token}`)
          .send({ payload: { email: user.email } })
          .set('accept-language', 'pt-BR')
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body.code).to.be.equal('BadRequest')
        expect(error.response.body.message).to.be.equal('Conta não confirmada')
      }
    })

    it('POST. 200 ok', async () => {
      await User.confirm(user.confirmationToken)
      const res = await agent.post(`/password?token=${token}`)
        .send({ payload: { email: user.email } })
      expect(res).to.have.status(204)
    })
  })
})
