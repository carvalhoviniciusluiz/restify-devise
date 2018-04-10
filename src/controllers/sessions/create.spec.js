'use strict'

import faker from 'faker'
import { describe, it } from 'mocha'
import { expect, request } from 'chai'
import { User } from '../../models/user'

let user = {}
let credentials = {}

const agent = request.agent(require('../../server'))

/* eslint-disable no-undef */
describe('Sessions: controllers', () => {
  context('/session', () => {
    beforeEach(async () => {
      credentials = {
        password: faker.internet.password(),
        email: faker.internet.email().toLowerCase()
      }
      user = await User.register(credentials)
    })

    it('POST. Should throw exception if body is not provided', async () => {
      try {
        await agent.post(`/session`)
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body.code).to.be.equal('BadRequest')
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if payload is not provided', async () => {
      try {
        await agent.post(`/session`).send(credentials)
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body.code).to.be.equal('BadRequest')
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception when account have not confirmed', async () => {
      try {
        await agent.post(`/session`)
          .send({ payload: credentials })
          .set('accept-language', 'pt-BR')
      } catch (error) {
        expect(error).to.have.status(401)
        expect(error.response.body.code).to.be.equal('InvalidCredentials')
        expect(error.response.body.message).to.be.equal('Conta não confirmada')
      }
    })

    it('POST. 200 ok', async () => {
      await user.confirm()

      const res = await agent.post(`/session`).send({ payload: credentials })
      expect(res).to.have.status(200)
      expect(res.body).to.have.key('token')
    })
  })
})
