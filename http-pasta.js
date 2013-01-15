// http-pasta.js
var p = require('gen-pasta')()

function httpPasta (opts) {
  // HTTP Functions

  function errorHandler (res) {
    var fired = false
    return function (error, code) {
      if (!fired) {
        fired = true
        res.statusCode = (code || 500)
        res.end('Server ' + error)
      } else {
        p.log("Already fired " + error)
      }
    }
  }

  function notyet (req, res) {
    p.log('You called a route that is not yet implemented')
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

  function jsonCORS (req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
  }

  function refuse (req, res, allowed) {
    res.statusCode = 405
    res.setHeader('Allow', allowed)
    res.end('Method Not Allowed')
  }

  function dispatch (methods) {
    return function (req, res) {
      var intended = methods[req.method]
      if (typeof intended === 'function') return intended.apply(null, arguments)
      var _default = methods[_default]
      if (typeof _default === 'function') return _default.apply(null, arguments)
      return refuse(req, res, Object.keys(methods))
    }
  }

  return { errorHandler: errorHandler
    , eh: errorHandler
    , notyet: notyet
    , jsonCORS: jsonCORS
    , redirect: redirect
    , dispatch: dispatch
    , refuse: refuse
    }

}

if (module && module.exports) module.exports = httpPasta

