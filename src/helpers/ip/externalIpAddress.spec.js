'use strict'

import { describe, it } from 'mocha'
import { expect } from 'chai'
import Joi from 'joi'
import externalIpAddress from './externalIpAddress'

/* eslint-disable no-undef */
describe('IP: helpers', () => {
  context('.externalIpAddress', () => {
    it('Should return valid ip', async () => {
      const ip = await externalIpAddress()

      const schema = {
        ip: Joi.string().ip({
          version: [
            'ipv4'
          ]
        })
      }

      const value = {
        ip
      }

      const { error } = Joi.validate(value, schema)

      expect(error).to.be.null()
    })
  })
})
