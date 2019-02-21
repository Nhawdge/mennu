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
    static async query(query: string):Promise<{}> {
        var con = this.connection();

        return new Promise((resolve, reject) => {
            con.connect((error) => {
                if (error) return reject(error);
                con.query(query, (error, result, fields) => {
                    if (error) return reject(error);
                    return resolve(result);
                })
            })
        })

    };
}