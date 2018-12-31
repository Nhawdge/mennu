const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const api = require('./meals');
module.exports = {
  server: function () {
    return http.createServer((req, res) => {
      console.log("Request from: ", req.url);
      if (req.url){
        api.add();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        api.getAll(function(result ) { res.end(result) });        
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