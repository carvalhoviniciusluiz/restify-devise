'use strict'

export default function (server) {
  server.get({ name: 'home', path: '/' }, (req, res) => {
    res.render('home.pug', { title: 'Restify Devise' })
  })
}
