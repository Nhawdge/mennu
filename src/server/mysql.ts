export default class {
    static connection() {
        var mysql = require('mysql');

        return mysql.createConnection({
            host: "localhost",
            user: "mennu",
            password: "a",
            database: "mennu"
        });

    };
    static query(query: string, callback: Function) {
        var con = this.connection();

        con.connect(function (err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
                if (err) {
                    console.error(err);
                    throw err;
                }
                if (callback) {
                    return callback(result);
                }
            });
        });
    };
}


// const query = async (query) => {
//     var con = this.connection();
//     return new Promise((resolve, reject) => {
//       con.connect((err) => {
//       if (err) return reject(err);
//       con.query(query, (err, result, fields) => {
//         if (err) {
//           console.error(err);
//           return reject(err);
//         }
//         return resolve(result)
//       });
//     });
//     })
//   };