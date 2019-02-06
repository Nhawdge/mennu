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

    app.listen(3000, function () {
      console.log(`Server has started at http://${hostname}:${port} `);
    });
  };
  static start() {
    this.server();
  };
}

  // static server() {
  //   return http.createServer((req, res) => {
  //     console.log(req.method, "Request from:", req.url);

  //     res.statusCode = 200;
  //     var apiCall = router(req.url);

  //     if (req.method == 'GET') {
  //       apiCall(function (result) {
  //         res.end(result)
  //       })
  //     }
  //     else if (req.method == 'POST') {
  //       console.log(`'${req.data}'`);
  //       var body = "";

  //       req.on('data', function (data) {
  //         body += data;
  //       });

  //       req.on('end', function (data) {
  //         if (data) {
  //           body += data;
  //         }

  //         console.log("body is: ", body);
  //         apiCall(JSON.parse(body), function (result) {
  //           res.end(result)
  //         })
  //       });
  //     }
  //   });
  // };
  // static start() {
  //   this.server().listen(port, hostname, () => {
  //     console.log(`Server running at http://${hostname}:${port}/`);
  //   });
  // }

// function router(path): Function {
//   switch (path) {
//     case '/meals':
//       return api.meals.getAll;
//       break;
//     case '/meals/add':
//       return api.meals.add;
//       break;
//     case '/meals/save':
//       return api.meals.edit;
//       break;
//     case '/ingredients':
//       return api.ingredients.getAll;
//       break;
//     default:
//       return serveHtml(path);
//       break;
//   }
// }

// function serveHtml(path) {
//   return function (callback) {
//     if (path == '/') { path = '/index.html' }
//     path = "./src" + path;
//     if (!fs.existsSync(path)) {
//       path.replace("./src", "./build");
//     }

//     fs.readFile(path, "utf8", function (err, data) {
//       if (data) {
//         callback(data);
//       }
//       else {

//         callback("File not found")
//         console.warn("File not found");
//       }
//     })
//   }
// }