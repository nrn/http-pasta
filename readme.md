HTTP Pasta
==========

A collection of req/res functions that I have found myself copy pastaing around.

I am trying to separate the pasta into useful strands.

errorHandler(res)
---

Takes a responce and returns a function that takes an error and optional
error code.

notyet(req, res)
---

404

redirect(url)
---

Create a function that responds 302 to url.

jsonCORS(req, res)
---

Add cors headers.

refuse(req, res, allowed)
---

405 method not allowed, what is?

dispatch(methodObj)
---

Returns a function that dispatches a req/res to the correct function
for that method.

