// https://devhints.io/chai
'use strict'

import { describe, it } from 'mocha'
import { expect } from 'chai'
import { mailerSender } from './senders'

describe('Senders: mailers', () => {
  describe('#mailerSender()', () => {
    it('should throw exception if template not found', async () => {
      try {
        await mailerSender('nameless', {
          email: 'one@example.com',
          subject: 'subject'
        })
      } catch (error) {
        expect(error.statusCode).to.be.equal(404)
      }
    })

    it('should render the templates correctly', async () => {
      const res = await mailerSender('test', {
        email: 'one@example.com',
        subject: 'subject'
      })
      expect(res.responseStatus).to.include('OK')
      expect(res).to.be.a('object')
      expect(res).to.have.all.keys('responseStatus', 'html')
      expect(res.html).to.be.equal('<p>subject</p>')
    })
  })
})
