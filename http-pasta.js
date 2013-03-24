// http-pasta.js
var p = require('gen-pasta')()

function httpPasta (opts) {
  // HTTP Functions
  if (!opts) opts = {}
  var log = p.log
  if (typeof opts.log === 'function') log = opts.log

  function errorHandler (res) {
    var fired = false
    return function (error, code, cb) {
      if (!fired) {
        if (typeof error === 'number') {
          code = error
          error = 'Error: ' + code
        }
        code = code || 500
        error = error || 'Unspecified error'
        if (cb) res.on('close', cb)
        var stack = error.stack || error
        fired = true
        res.statusCode = (code || 500)
        res.end('Server ' + error)
        log(code + ': ' + stack)
      } else {
        log("Already fired " + error)
        if (cb) cb()
      }
    }
  }

  function notyet (req, res) {
    log('You called a route that is not yet implemented.')
    res.statusCode = 404
    res.end('not found')
  }


  function redirect (loc) {
    return function (req, res) {
      res.statusCode = 302
      res.setHeader('location', loc)
      res.end()
    }
  }

  function cors (res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,HEAD,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept')

  }

  function refuse (req, res, allowed) {
    res.statusCode = 405
    res.setHeader('Allow', allowed)
    res.end('Method Not Allowed')
  }

  function dispatch (methods) {
    return function (req, res) {
      var intended = methods[req.method]
      if (typeof intended === 'function') return intended.apply(this, arguments)
      var _default = methods[_default]
      if (typeof _default === 'function') return _default.apply(this, arguments)
      return refuse(req, res, Object.keys(methods))
    }
  }

  return { errorHandler: errorHandler
    , eh: errorHandler
    , notyet: notyet
    , cors: cors
    , redirect: redirect
    , dispatch: dispatch
    , refuse: refuse
    }

}

if (module && module.exports) module.exports = httpPasta

