<h1 align="center">Restify Devise</h1>

<p align="center">
  Starter project for a rest api with <a href="http://restify.com/docs/home/">restify</a> & <a href="https://www.npmjs.com/package/node-devise">node-devise</a>.
  Inspired by <a href="https://blog.risingstack.com/node-js-project-structure-tutorial-node-js-at-scale/">Advanced Node.js Project Structure Tutorial.</a>
</p>

<p align="center">
  <a href="https://travis-ci.org/carvalhoviniciusluiz/restify-devise"><img alt="Travis Status" src="https://img.shields.io/travis/carvalhoviniciusluiz/restify-devise/master.svg?label=travis&maxAge=43200"/></a>
  <a href="https://scrutinizer-ci.com/g/carvalhoviniciusluiz/restify-devise/?branch=master"><img alt="Code Coverage" src="https://scrutinizer-ci.com/g/carvalhoviniciusluiz/restify-devise/badges/quality-score.png?b=master"/></a>
</p>

<p align="center">
  It also allows users to deploy in Heroku without leaving the web browser and with little configuration.
</p>
<p align="center">
  <a href="https://heroku.com/deploy">
    <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
  </a>
</p>

- Restify Devise is consumable via API. To do this use [postman](https://www.getpostman.com/), [httpie](https://httpie.org/) or [curl](https://curl.haxx.se/).

- Try it online - [restify-devise.herokuapp](http://restify-devise.herokuapp.com/)

- Checkout our demo - [github.io/devise-vue](https://carvalhoviniciusluiz.github.io/devise-vue/#/)

## Note

- See the [node-devise](https://www.npmjs.com/package/node-devise) documentation for how to configure the user schema :).

- For the tests will be used [httpie](https://github.com/jakubroztocil/httpie#installation)

## Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)
  * [User registration](#user-registration)
  * [Signing in](#signing-in)
  * [Accessing Protected Routes](#accessing-protected-routes)
    * [Password recovery](#password-recovery)
    * [User unlock](#user-unlock)
* [License](#license)

## Requirements

- node >= 8
- npm >= 5

## Installation

You must configure the environment variables to be able to run the application, follow the table below for this:

> Development-specific options must be added in the configuration file `.env`

> You can also perform manual deployment on heroku through the [installation](./heroku.deploy.sh) file.

`sh heroku.deploy.sh`

Key | Description
------------ | -------------
PROCESS_TYPE| Defines a main process between the various application processes.
PORT| Server communication port.
CLIENT_URI| Define a URL for client redirection.
MONGODB_URI| Sets the location of mongodb. You can use the [mlab](https://mlab.com/signup/) service to receive a remote database.
SECRET_KEY| Encryption private key.
MAILER_USER| Reply email `may be fake`.
MAILER_KEY| By default, the application consumes the [sendgrid](https://app.sendgrid.com/signup) service for sending emails. You must enter the access token for the project.

## Usage

With the project installed correctly, you can test the endpoints below:

> You can use the web project to see the result of the routes below., e.g:

> `http restify-devise.herokuapp.com/session payload:='{"email": "your@email", "password": "secret"}'`

#### User registration

```
http :8088/registration payload:='{"email": "your@email", "password": "secret"}'
# HTTP/1.1 200 OK
# {}
```

You can change the language by changing the header `accept-language`:

```
http :8088/registration payload:='{"email": "your@email"}' 'accept-language: pt-BR'
# HTTP/1.1 400 Bad Request
# {
#   "code": "BadRequest",
#   "message": {
#     "context": {
#       "key": "password",
#       "label": "password"
#     },
#     "warn": "'Senha' é obrigatório"
#   }
# }
```

#### Signing in

When the account is not verified:

```
http :8088/session payload:='{"email": "your@email", "password": "secret"}'
# HTTP/1.1 401 Unauthorized
# {
#   "code": "InvalidCredentials",
#   "message": "Account not confirmed"
# }
```

When the password is incorrect:

```
http :8088/session payload:='{"email": "your@email", "password": "secret1"}'
# HTTP/1.1 401 Unauthorized
# {
#   "code": "InvalidCredentials",
#   "message": "Incorrect password"
# }
```

When the data is right:

```
http :8088/session payload:='{"email": "your@email", "password": "secret"}'
# HTTP/1.1 200 OK
# {
#   "token": "token"
# }
```

### Accessing Protected Routes

Recovery needs a token, so create a token to continue:

> this example is [available here as well](./src/controllers/passwords/create.spec.js).

```js
const createToken = () => {
  return jwt.sign({}, 'secret')
}
```

#### Password recovery

```
http :8088/password payload:='{"email": "your@email"}'
# HTTP/1.1 401 Unauthorized
# Unauthorized
```

the correct access returns `204` and forwards an email to the informed account

```
http :8088/password payload:='{"email": "your@email"}' token=='token'
# HTTP/1.1 204 No Content
# {}
```

#### User unlock

the project is set to [lock the account after 3 incorrect access](#note) attempts,
a blocked account will return the following response:

```
http :8088/session payload:='{"email": "your@email", "password": "secret1"}'
# HTTP/1.1 401 Unauthorized
# {
#   "code": "InvalidCredentials",
#   "message": "Account locked. Check unlock instructions sent to you."
# }
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present
