'use strict'

import faker from 'faker'
import { describe, it } from 'mocha'
import { expect, request } from 'chai'

const agent = request.agent(require('../../server'))

/* eslint-disable no-undef */
describe('Registrations: controllers', () => {
  context('/registration', () => {
    it('POST. Should throw exception if body is not provided', async () => {
      try {
        await agent.post(`/registration`)
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if email is not provided', async () => {
      try {
        await agent.post(`/registration`).send({
          payload: {
            password: faker.internet.password()
          }
        })
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if email invalid', async () => {
      try {
        await agent.post(`/registration`).send({ payload: { email: 'email' } })
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if email already exists', async () => {
      const credentials = {
        payload: {
          password: faker.internet.password(),
          email: faker.internet.email().toLowerCase()
        }
      }
      await agent.post(`/registration`).send(credentials)
      try {
        await agent.post(`/registration`).send(credentials)
      } catch (error) {
        expect(error).to.have.status(401)
        expect(error.response.body).to.have.all.keys('code', 'message')
      }
    })

    it('POST. Should throw exception if password is not provided', async () => {
      try {
        await agent.post(`/registration`).send({ email: 'email@email' })
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. Should throw exception if password invalid', async () => {
      try {
        await agent.post(`/registration`).send({
          payload: {
            password: '1',
            email: faker.internet.email().toLowerCase()
          }
        })
      } catch (error) {
        expect(error).to.have.status(400)
        expect(error.response.body).to.have.all.keys('code', 'message')
        expect(error.response.body.message).to.have.all.keys('warn', 'context')
      }
    })

    it('POST. 200 ok', async () => {
      const credentials = {
        payload: {
          password: faker.internet.password(),
          email: faker.internet.email().toLowerCase()
        }
      }
      const res = await agent.post(`/registration`).send(credentials)
      expect(res).to.have.status(200)
    })
  })
})
