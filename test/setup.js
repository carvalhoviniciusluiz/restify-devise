'use strict'

import mongoose from 'mongoose'
import chai from 'chai'
import chaiHttp from 'chai-http'
import dirtyChai from 'dirty-chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import winston from 'winston'
import { before, beforeEach, after, afterEach } from 'mocha'

chai.use(chaiHttp)
chai.use(dirtyChai)
chai.use(sinonChai)

before(() => {
  // we want to have logger.test() without flooding the console with other levels' messages
  winston.setLevels({
    debug: 5,
    info: 4,
    warn: 3,
    error: 2,
    critical: 1,
    test: 0
  })
  winston.addColors({
    debug: 'green',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    critical: 'red',
    test: 'blue'
  })
  winston.remove(winston.transports.Console)
  winston.add(winston.transports.Console, { level: 'test', colorize: true })
  winston.add(winston.transports.File, { name: 'test', filename: 'log/test.log' })

  // prepares a clean bank
  mongoose.connect('mongodb://localhost/accounts', (err) => {
    if (err) {
      throw err
    }
  })
})

beforeEach(function beforeEach () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function afterEach () {
  this.sandbox.restore()
})

after(() => {
  mongoose.connection.dropDatabase()
})
