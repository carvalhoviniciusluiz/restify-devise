// https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/en-US.yml
'use strict'

module.exports = {
  // authenticable
  authenticatorErrorMessage: 'No {{field}} provided',
  passwordErrorMessage: 'No password provided',
  passwordNotMatchErrorMessage: 'Incorrect password',
  hashedPasswordErrorMessage: 'Hashed password not found',
  authenticatorNotExistErrorMessage: 'Incorrect {{field}}',
  credentialsNotExistErrorMessage: 'Incorrect credentials',

  // confirmable
  invalidConfirmationTokenErrorMessage: 'Invalid confirmation token',
  confirmationTokenExpiredErrorMessage: 'Confirmation token expired',
  accountNotConfirmedErrorMessage: 'Account not confirmed',
  checkConfirmationTokenExpiredErrorMessage: 'Confirmation token expired. Check your email for confirmation instructions.',

  // lockable
  accountLockedErrorMessage: 'Account locked. Check unlock instructions sent to you.',
  invalidUnlockTokenErrorMessage: 'Invalid unlock token',
  unlockTokenExpiredErrorMessage: 'Unlock token expired',

  // recoverable
  invalidRecoveryDetailsErrorMessage: 'Invalid recovery details',
  invalidRecoveryTokenErrorMessage: 'Invalid recovery token',
  recoveryTokenExpiredErrorMessage: 'Recovery token expired',

  // registerable
  authenticatorAlreadyExistErrorMessage: 'Account of {{field}} already exist'
}
