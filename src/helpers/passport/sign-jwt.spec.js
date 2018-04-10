'use strict'

import { describe, it } from 'mocha'
import { expect } from 'chai'
import config from '../../../config'
import signJwt from './sign-jwt'
import * as jwt from 'jsonwebtoken'

/* eslint-disable no-undef */
describe('Passport: helpers', () => {
  context('.signJwt', () => {
    it('Should return valid token', async () => {
      const { token } = await signJwt({ test: 'test' })
      const decoded = await jwt.verify(token, config.jwt.secret)
      expect(decoded).to.have.all.keys('exp', 'iat', 'user')
      expect(decoded.user).to.have.property('test')
    })
  })
})
