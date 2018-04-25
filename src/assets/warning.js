'use strict'

const warning = function () {
  const i = 'Stop!'
  const j = 'This is a developer-facing browser feature. Be aware that your account may be compromised by the unknown code use here.'
  const k = ['See https://en.wikipedia.org/wiki/Self-XSS for more information.']
  if (window.chrome || window.safari) {
    const l = 'font-family:helvetica; font-size:20px; ';
    [[i, l + 'font-size:50px; font-weight:bold; ' + 'color:red; -webkit-text-stroke:1px black;'], [j, l], [k, l], ['', '']].map(function (r) {
      setTimeout(console.log.bind(console, '\n%c' + r[0], r[1]))
    })
  }
}

let i = 0
function showWarningAndThrow () {
  if (!i) {
    setTimeout(function () {
      warning()
    }, 1)
    i = 1
  }
}

let l
let n = {
  set (o) {
    l = o
  },
  get () {
    showWarningAndThrow()
    return l
  }
}

Object.defineProperty(console, '__commandLineAPI', n)
const threshold = 160

setInterval(function () {
  const widthThreshold = this.outerWidth - this.innerWidth > threshold
  const heightThreshold = this.outerHeight - this.innerHeight > threshold

  if (!(heightThreshold && widthThreshold) && ((this.Firebug && this.Firebug.chrome && this.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
    void console.__commandLineAPI
  } else {
    console.clear()
    i = 0
  }
})
