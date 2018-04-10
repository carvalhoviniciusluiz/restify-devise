'use strict'

module.exports = {
  mailer: {
    account_confirmation: {
      subject: 'Welcome to Restify Devise',
      title: 'Restify Devise | Account confirmation',
      header: 'Welcome to Restify Devise!',
      paragraph1: 'Confirm your email address by clicking the link below.',
      paragraph2: 'We may need to send you important information about our services and it is imperative to have a valid email address.',
      action: 'Confirm email address'
    },
    password_recovery: {
      subject: 'Password recovery confirmation',
      title: 'Restify Devise | Password recovery',
      header: 'We need to confirm your request.',
      paragraph1: 'Click the link below to access the password change.',
      paragraph2: 'We received a password recovery request from Restify Devise.',
      paragraph3: 'If you did not request this account recovery, please ignore this email.',
      action: 'Change password'
    },
    account_recovery: {
      subject: 'Your account has been blocked',
      title: 'Restify Devise | Account recovery',
      header: 'Your account has been blocked!',
      paragraph1: 'Click the link below to unlock it.',
      paragraph2: 'We have detected several unsuccessful attempts to gain access to your account for this reason we resolve to block it.',
      paragraph3: 'Remember, you can change your password at any time :)',
      action: 'Unblock my account'
    },
    sincerely: 'Sincerely',
    team: '— Restify Devise Team'
  }
}
