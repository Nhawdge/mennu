const api = require('./mysql.js');
const schema = require('./config.js');
const tools = require('./tools.js')

module.exports = {
    getAll: function (callback) {
        api.query(`SELECT * FROM ${schema.table.meal}`, callback);
    },
    add: function (callback) {
        var query = 
            `INSERT INTO ${schema.table.meal}
            (\`id\`)
            VALUES
            ('${tools.guid()}')`;
            console.log(query);
            api.query(query);
    },
    edit: function () {

    },
    delete: function () { }
}
