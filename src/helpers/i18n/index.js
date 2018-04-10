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

i18next.handler = function (options) {
  return function (request, response, next) {
    request.i18n = i18next
    request.t = i18next.t.bind(i18next)

    return next()
  }
}

export default i18next

// sets the language by the header
export const changeLangRequest = function (request) {
  if (request.i18n) {
    const language = request.headers['accept-language']
    request.i18n.changeLanguage(acceptLanguage.get(language))
    return request.i18n
  }
}

// defines a language according to user settings
export const userLanguageObject = function (options) {
  assert.object(options, 'options')
  assert.object(options.user, 'options.user')
  assert.object(options.user.account, 'options.user.account')
  assert.ok(options.user.account.language, 'options.user.account.language')

  const { user } = options

  const language = user.account.language
  i18next.changeLanguage(acceptLanguage.get(language))

  return i18next
}

