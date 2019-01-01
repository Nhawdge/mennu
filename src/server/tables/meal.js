const mysql = require('../mysql.js');
const schema = require('../config.js');
const tools = require('../tools.js')

module.exports = {
    getAll: function (callback) {
        mysql.query(`SELECT * FROM ${schema.table.meal}`, callback);
    },
    add: function (name, callback) {
        var query = 
            `INSERT INTO ${schema.table.meal}
            (\`id\`, \`name\`)
            VALUES
            ('${tools.guid()}', '${name}' )`;
            mysql.query(query);
    },
    edit: function () {

    },
    delete: function () { }
}
