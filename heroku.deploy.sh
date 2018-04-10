# https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment
# https://devcenter.heroku.com/articles/error-codes#r14-memory-quota-exceeded
# https://devcenter.heroku.com/articles/node-memory-use#tuning-the-garbage-collector
#heroku apps:destroy --confirm restify-devise
heroku create
heroku apps:rename restify-devise
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set NODE_ENV=production
heroku config:set PROCESS_TYPE=app
heroku config:set PORT=8088
heroku config:set CLIENT_URI=https://github.com/carvalhoviniciusluiz/restify-devise#readme
heroku config:set MONGODB_URI=
heroku config:set SECRET_KEY=
heroku config:set MAILER_KEY=
heroku config:set MAILER_USER=donotreply@donotreply.com
heroku addons:create mongolab
git push heroku master
