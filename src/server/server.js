const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const api = require('./api');
const fs = require('fs');

module.exports = {
  server: function () {
    return http.createServer((req, res) => {
      console.log("Request from:", req.url);

      res.statusCode = 200;
      var apiCall = router(req.url);
      apiCall(function (result) {
        res.end(result)
      });
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
      return serveHtml(path);
      break;
  }
}

function serveHtml(path) {
  return function (callback) {
    if (path == '/') { path = '/index.html' }
    fs.readFile("./src" + path, "utf8", function (err, data) {
      callback(data);
    })
  }
}