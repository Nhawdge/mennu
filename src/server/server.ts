//const http = require('http');
//const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

import express = require("express");
import { api } from "./api";

export default class {
  static server() {
    const app: express.Application = express();

    app.get('/', function (req: Request, res: any) {
      res.sendFile("src/web/views/index.html", { root: '.' });
    })

    app.use(express.static("src/web/templates"))
    app.use("/views/", express.static("src/web/views"))
    app.use("/scripts", express.static("build/web"))
    app.use("/dist", express.static("dist"))
    app.use("/styles/", express.static("src/web/assets/styles"))
    app.use("/images/", express.static("src/web/assets/images"))

    app.use(express.json());
    app.all('/meals/:method?', function (req, res) { 
      var method = req.method
      var endpoint = (req.params.method || 'getAll');
      console.log(`${method} request to ${endpoint}`);
      if (method == 'GET' && endpoint == 'getAll') {
        api.database.query(api.meals.toSelectAll(), function (data) {
          res.json(data);
        });
      }
      if (method == 'POST' && endpoint == 'add') {
        // api.meals.add(req.body, function (data) {
        //   res.json(data);
        // })
      } 
      if (method == 'POST' && endpoint == 'save') {
        // api.meals.edit(req.body, function (data) {
        //   res.json(data);
        // })
      }

    })


    app.listen(3000, function () {
      console.log(`Server has started at http://${hostname}:${port} `);
    });
  };
  static start() {
    this.server();
  };
}
