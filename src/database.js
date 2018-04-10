// @see https://stackoverflow.com/questions/9299331/what-is-the-best-practice-to-gracefully-shutdown-a-node-js-program-from-an-exter
'use strict'

import mongoose from 'mongoose'
import chalk from 'chalk'
import logger from 'winston'
import assert from 'assert-plus'

// pluging in own promise library instead: http://mongoosejs.com/docs/promises.html
mongoose.Promise = require('bluebird')

let databaseResolve = () => {}
let databaseReject = () => {}
export const databaseValidate = new Promise((resolve, reject) => {
  databaseResolve = resolve
  databaseReject = reject
})

const isTest = process.env.NODE_ENV === 'test'
function notify (done) {
  if (!isTest && typeof done === 'function') {
    done()
  }
}

export default function (db) {
  assert.ok(db, 'mongo_uri not found')
  mongoose.connect(db)

  mongoose.connection.on('connected', () => {
    notify(() => logger.info('[database]', `Mongoose connected on ${chalk.cyan(db)}`))
    databaseResolve()
  })
  mongoose.connection.on('error', (err) => {
    databaseReject(err)
  })
  mongoose.connection.on('disconnected', () => {
    notify(() => logger.info('[database]', chalk.yellow('Mongoose disconnected')))
  })
  // CAPTURE APP TERMINATION / RESTART EVENTS
  // To be called when process is restarted or terminated
  const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
      notify(() => logger.info('[database]', chalk.yellow(`Mongoose disconnected through ${chalk.bold(msg)}`)))
      callback()
    })
  }
  // For nodemon restarts
  process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
      process.kill(process.pid, 'SIGUSR2')
    })
  })
  // For app termination
  process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
      process.exit(0)
    })
  })
  // For Heroku app termination
  process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app termination', () => {
      process.exit(0)
    })
  })
}
