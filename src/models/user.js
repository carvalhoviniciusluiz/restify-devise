'use strict'

import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'
import devise from 'node-devise'
import mailer from '../mailers'
import i18n from '../helpers/i18n'

const userSchema = new mongoose.Schema({
  account: {
    language: {
      type: String,
      default: 'en-US'
    }
  }
})
userSchema.plugin(timestamps)
userSchema.plugin(devise, { i18n })
userSchema.plugin(mailer, { i18n })

// https://github.com/Automattic/mongoose/issues/1251
let instance

try {
  // http://mongoosejs.com/docs/api.html#index_Mongoose-model
  instance = mongoose.model('User', userSchema, 'users')
} catch (error) {
  instance = mongoose.model('User')
}

module.exports.User = instance
