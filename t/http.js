var test = require('tape')
  , hp = require('../http-pasta')
  , p = hp()

test('HTTP tests', function (t) {
  t.plan(11)

  var ehres =
    { end: function (str) {
        t.equal(this.statusCode, 500, 'ErrorHandler statusCode')
        t.equal(str, 'Server doh!', 'ErrorHandler end call')
      }
    }

  var eh = p.errorHandler(ehres)

  eh('doh!')
  eh('doh!') // Shouldn't fire the second time

  var scres =
    { end: function (str) {
        t.equal(this.statusCode, 404, 'StatusCode check: statusCode')
        t.equal(str, 'Server Error: not found', 'StatusCode check: end call')
      }
    }

  var sc = p.errorHandler(scres)

  sc(new Error('not found'), 404)

  var nyres =
    { end: function (str) {
        t.equal(this.statusCode, 404, 'notyet statusCode')
        t.equal(str, 'not found', 'notyet end call')
      }
    }

  p.notyet({}, nyres)

  var redirectres =
    { end: function (str) {
        t.equal(this.statusCode, 302, 'redirect statusCode')
        t.equal(str, undefined, 'redirect end call')
      }
    , setHeader: function (str, loc) {
        t.equal(str, 'location', 'redirect setHeader location')
        t.equal(loc, 'asdf', 'redirect setHeader loc')
      }
    }

  p.redirect('asdf')({}, redirectres)
  p2 = hp({ log: function (a) {
    t.equal(a, 'You called a route that is not yet implemented.', 'opt.log')
  }})
  p2.notyet(null, { end: function () {} })

})
