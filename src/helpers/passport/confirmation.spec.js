'use strict'

import faker from 'faker'
import { describe, it } from 'mocha'
import { expect } from 'chai'
import { User } from '../../models/user'
import confirmation from './confirmation'

let credentials = {}

/* eslint-disable no-undef */
describe('Passport: helpers', () => {
  context('.confirmation', () => {
    beforeEach(async () => {
      credentials = {
        password: faker.internet.password(),
        email: faker.internet.email().toLowerCase()
      }
      await User.register(credentials)
    })

    it('Should return unauthorized', async () => {
      await confirmation({}, (error) => {
        expect(error.statusCode).to.be.equal(403)
      })
    })

    it('Should return unauthorized and false to user', async () => {
      await confirmation({ email: faker.internet.email().toLowerCase() }, (error, user) => {
        expect(error.statusCode).to.be.equal(403)
        expect(user).to.be.false()
      })
    })

    it('Should return one user', async () => {
      await confirmation({ email: credentials.email }, (error, user) => {
        expect(error).to.be.null()
        expect(user).to.be.not.null()
      })
    })
  })
})
