// https://github.com/svenfuchs/rails-i18n/blob/master/rails/locale/pt-BR.yml
'use strict'

module.exports = {
  // authenticable
  authenticatorErrorMessage: '{{field}} não fornecido',
  passwordErrorMessage: 'Nenhuma senha fornecida',
  passwordNotMatchErrorMessage: 'Senha incorreta',
  hashedPasswordErrorMessage: 'Senha (Hashed) não encontrada',
  authenticatorNotExistErrorMessage: '{{field}} incorreto',
  credentialsNotExistErrorMessage: 'Credenciais incorretas',

  // confirmable
  invalidConfirmationTokenErrorMessage: 'Token de confirmação inválido',
  confirmationTokenExpiredErrorMessage: 'Token de confirmação expirou',
  accountNotConfirmedErrorMessage: 'Conta não confirmada',
  checkConfirmationTokenExpiredErrorMessage: 'O token de confirmação expirou. Verifique seu email para obter instruções de confirmação.',

  // lockable
  accountLockedErrorMessage: 'Conta bloqueada. Verifique as instruções de desbloqueio enviadas para você.',
  invalidUnlockTokenErrorMessage: 'Token de desbloqueio inválido',
  unlockTokenExpiredErrorMessage: 'Token de desbloqueio expirado',

  // recoverable
  invalidRecoveryDetailsErrorMessage: 'Detalhes de recuperação inválidos',
  invalidRecoveryTokenErrorMessage: 'Token de recuperação inválido',
  recoveryTokenExpiredErrorMessage: 'Token de recuperação expirado',

  // registerable
  authenticatorAlreadyExistErrorMessage: 'Conta de {{field}} já existe'
}
