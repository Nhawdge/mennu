const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const api = require('./api');
const fs = require('fs');

module.exports = {
  server: function () {
    return http.createServer((req, res) => {
      console.log( req.method,  "Request from:", req.url);

      res.statusCode = 200;
      var apiCall = router(req.url);

      if (req.method == 'GET') {
        apiCall(function (result) {
          res.end(result)
        })
      }
      else if (req.method == 'POST') {
        console.log(`'${req.data}'`);
        var body = "";

        req.on('data', function(data) {
          body += data;
        });

        req.on('end', function(data) {
          if (data) {
            body += data;
          }
          
          console.log("body is: ", body);
          apiCall(JSON.parse(body), function(result) {
            res.end(result)
          })
        });
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
    case '/meals/add':
      return api.meals.add;
      break;
    case '/meals/save':
      return api.meals.edit;
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
      if (data){
        callback(data);
      }
      else {
        console.warn("File not found");
      }
    })
  }
}