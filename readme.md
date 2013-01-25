HTTP Pasta
==========

A collection of req/res functions that I have found myself copy pastaing around.

I am trying to separate the pasta into useful strands.

httpPasta(opts)
---

opts.log is an optional log function to be used implace of gen-pasta's log.
Returns object p w/ all other methods.


p.errorHandler(res)
---

Takes a responce and returns a function that takes an error and optional
error code.

p.notyet(req, res)
---

404

p.redirect(url)
---

Create a function that responds 302 to url.

p.jsonCORS(req, res)
---

Add cors headers.

p.refuse(req, res, allowed)
---

405 method not allowed, what is?

p.dispatch(methodObj)
---

Returns a function that dispatches a req/res to the correct function
for that method.

