'use strict'

module.exports = {
  mailer: {
    account_confirmation: {
      subject: 'Bem vindo ao Restify Devise',
      title: 'Bem vindo ao Restify Devise!',
      header: 'Bem vindo ao Restify Devise!',
      paragraph1: 'Confirme seu endereço de e-mail clicando no link abaixo.',
      paragraph2: 'Nós podemos precisar enviar-lhe informações importantes sobre os nossos serviços e é imprescindível ter um endereço de e-mail válido.',
      action: 'Confirmar endereço de email'
    },
    password_recovery: {
      subject: 'Confirmação de recuperação de senha',
      title: 'Precisamos confirmar sua solicitação!',
      header: 'Precisamos confirmar sua solicitação!',
      paragraph1: 'Clicando no link abaixo para acessar a alteração de senha.',
      paragraph2: 'Recebemos uma solicitação de recuperação de senha no Restify Devise.',
      paragraph3: 'Se você não solicitou esta recuperação da conta, ignore este e-mail.',
      action: 'Efetuar alteração de senha'
    },
    account_recovery: {
      subject: 'Sua conta foi bloqueada',
      title: 'Sua conta foi bloqueada!',
      header: 'Sua conta foi bloqueada!',
      paragraph1: 'Clique no link abaixo para desbloquea-la.',
      paragraph2: 'Detectamos várias tentativas sem sucesso de obter acesso a sua conta por este motivo resolvemos bloquea-la.',
      paragraph3: 'Lembre-se, você pode mudar sua senha a qualquer momento :)',
      action: 'Desbloquear minha conta'
    },
    sincerely: 'Atenciosamente',
    team: '— Equipe Restify Devise'
  }
}
