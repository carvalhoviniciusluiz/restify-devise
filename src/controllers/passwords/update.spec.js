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

const createToken = (user) => {
  return jwt.sign({ recoveryToken: user.recoveryToken }, config.jwt.secret)
}

/* eslint-disable no-undef */
describe('Passwords: controllers', () => {
  context('/password_changed', () => {
    beforeEach(async () => {
      user = await User.register({
        password: faker.internet.password(),
        email: faker.internet.email().toLowerCase()
      })
      await user.sendConfirmation()
      await user.confirm()

      user = await User.requestRecover({ email: user.email })
      token = createToken(user)
    })

    it('should retorn unauthorized if token is not provided', async () => {
      try {
        await agent.post(`/password_changed`)
      } catch (error) {
        expect(error).to.have.status(401)
      }
    })

    it('should throw exception if password confirmation is blank')
    it('should throw exception if password not equal password confirmation')

    it('POST. 200 ok', async () => {
      const password = faker.internet.password()
      const res = await agent.post(`/password_changed`)
        .send({ token, password, password_confirmation: password })
      expect(res).to.have.status(200)
    })
  })
})
