const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const api = require('./api');
const fs = require('fs');

module.exports = {
  server: function () {
    return http.createServer((req, res) => {

      console.log("Request from: ", req.url);
      if (req.url) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        var apiCall = router(req.url);
        apiCall(function (result) { res.end(result) });
      }
      else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('No endpoint found\n');
      }
    });
  },
  start: function () {
    this.server().listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
}

function router(path) {
  switch (path) {
    case '/meals':
      return api.meals.getAll;
      break;
    case '/ingredients':
      return api.ingredients.getAll;
      break;
    default:
      return function () { };
      break;
  }
}