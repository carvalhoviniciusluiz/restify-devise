// @see https://nodejs.org/dist/latest-v4.x/docs/api/cluster.html
'use strict'

// import kue from 'kue'
import cluster from 'cluster'
import logger from 'winston'

export default function (done) {
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction && cluster.isMaster) {
    const numCPUs = require('os').cpus()

    // init cluster
    numCPUs.forEach(() => {
      const worker = cluster.fork()

      // for parallel jobs processing kue
      // kue.app.listen(8089)
      // kue.app.set('title', 'My background jobs')

      worker.on('online', () => {
        logger.warn('[cluster][worker]', `${worker.process.pid} is online now!`)
      })

      worker.on('exit', (code, signal) => {
        if (signal) {
          logger.warn('[cluster][worker]', `was killed by signal: ${signal}`)
        } else if (code !== 0) {
          logger.warn('[cluster][worker]', `exited with error code: ${code}`)
        } else {
          logger.warn('[cluster][worker]', 'success!')
        }
      })
    })

    logger.warn('[cluster]', `Clustering: I will start ${numCPUs.length} workers...`)
  } else if (typeof done === 'function') {
    done()
  }
}
