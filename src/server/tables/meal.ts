const mysql = require('../mysql.js');
const schema = require('../config.js');
const tools = require('../tools.js')

module.exports = {
    getAll: function (callback) {
        mysql.query(`SELECT * FROM ${schema.table.meal}`, callback);
    },
    add: function (meal, callback) {
        if (!meal) { return }
        console.log("Saving new meal ", meal.name)
        var query =
            `INSERT INTO ${schema.table.meal}
            (\`id\`, \`name\`)
            VALUES
            ('${tools.guid()}', '${meal.name}' )`;
        mysql.query(query);
        callback(JSON.stringify({ isSucess: true }));
    },
    edit: function (meal, callback) {
        if (!meal) { return }
        console.log("Saving new meal ", typeof (meal), meal)

        var query =
            `START TRANSACTION;
         
        UPDATE \`${schema.table.meal}\` 
        SET 
         \`id\` = '${meal.id}',
         \`name\` = '${meal.name}',
         \`servings\` = '${meal.servings}',
         \`instructions\` = '${meal.instructions}'
         WHERE \`id\` = '${meal.id}';
         `;

        for (ingredient of meal.ingredients) {
            var guid = tools.guid();
            query += `
            INSERT INTO \`${schema.table.ingredient}\`
            (
                \`id\`,
                \`name\`
            )
            VALUES(
                '${guid}',
                '${ingredient.name}'
            );`

            query += `
            INSERT INTO \`${schema.table.mealingredient}\`
            (
                \`id\`,
                \`mealId\`,
                \`ingredientId\`,
                \`amount\`
                )
                VALUES(
                    '${tools.guid()}',
                    '${meal.id}',
                    '${guid}',
                    '${ingredient.amount}'            
                );
                `;

        }
        query += '\nCOMMIT;'

        console.log("Query would be\n", query);
        //mysql.query(query);
    },
    delete: function () { }
}
