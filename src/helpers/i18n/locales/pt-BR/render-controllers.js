'use strict'

module.exports = {
  confirmations: {
    confirm: {
      title: 'Restify Devise | Conta Confirmada',
      paragraph: 'Sua conta foi confirmada com sucesso...',
      footer: {
        paragraph1: 'Agora você pode fazer login na sua conta Restify Devise para usar o aplicativo.',
        paragraph2: '             Obrigado pela sua paciência'
      }
    }
  },
  passwords: {
    edit: {
      title: 'Restify Devise | Mudar Senha',
      header: 'Mudar Senha',
      paragraph: 'Digite uma senha para atualizar sua conta.',
      action: 'Mudar minha senha',
      fields: {
        password: 'Senha',
        password_confirmation: 'Confirmação de senha'
      }
    },
    update: {
      title: 'Restify Devise | Senha Modificada',
      paragraph: 'Sua senha foi alterada com sucesso...',
      footer: {
        paragraph1: 'Agora você pode fazer login na sua conta com a senha atualizada.',
        paragraph2: '             Obrigado pela sua paciência'
      }
    }
  },
  unlocks: {
    confirm: {
      title: 'Restify Devise | Conta Desbloqueada',
      paragraph: 'Sua conta foi desbloqueada com sucesso...',
      footer: {
        paragraph1: 'Agora você pode voltar a entrar na sua conta Restify Devise.',
        paragraph2: '             Obrigado pela sua paciência'
      }
    }
  }
}
