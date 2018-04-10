'use strict'

import assert from 'assert-plus'
import i18next from 'i18next'
import resources from './locales'
import acceptLanguage from 'accept-language'

// supported languages
export const languages = ['en-US', 'pt-BR']

i18next.init({
  lng: 'en-US',
  fallbackLng: languages,
  resources
})

i18next.handler = function () {
  return function (request, response, next) {
    request.i18n = i18next
    request.t = i18next.t.bind(i18next)

    return next()
  }
}

export default i18next

// sets the language by the header
export const changeLangRequest = function (request) {
  assert.object(request, 'request')
  assert.object(request.i18n, 'request.i18n')

  const { i18n } = request

  const language = request.headers['accept-language']
  i18n.changeLanguage(acceptLanguage.get(language))

  return i18n
}

// defines a language according to user settings
export const userLanguageObject = function (request) {
  assert.object(request, 'request')
  assert.object(request.user, 'request.user')

  const { user } = request

  assert.object(user.account, 'user.account')
  assert.ok(user.account.language, 'user.account.language')

  const language = user.account.language
  i18next.changeLanguage(acceptLanguage.get(language))

  return i18next
}
