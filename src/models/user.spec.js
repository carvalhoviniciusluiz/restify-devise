'use strict'

import { User } from './user'
import { expect } from 'chai'
import { describe, it } from 'mocha'

describe('User: models', () => {
  describe('.paths', () => {
    it('should have the fields', () => {
      expect(User.schema.paths).to.have.all.keys(
        '__v',
        '_id',
        'account.language',
        'confirmationSentAt',
        'confirmationToken',
        'confirmationTokenExpiryAt',
        'confirmedAt',
        'createdAt',
        'currentSignInAt',
        'currentSignInIpAddress',
        'email',
        'failedAttempts',
        'hash',
        'lastSignInAt',
        'lastSignInIpAddress',
        'lockedAt',
        'recoveredAt',
        'recoverySentAt',
        'recoveryToken',
        'recoveryTokenExpiryAt',
        'registeredAt',
        'salt',
        'signInCount',
        'unlockToken',
        'unlockTokenExpiryAt',
        'unlockTokenSentAt',
        'unlockedAt',
        'unregisteredAt',
        'updatedAt'
      )
    })
  })
})
