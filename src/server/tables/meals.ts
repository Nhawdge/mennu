import "../mysql";
import { schema } from "../config";
import tools from "../tools";
import mysql from "../mysql";

export class meals {
    static getAll(callback) {
        mysql.query(`SELECT * FROM ${schema.table.meal}`, callback);
    };

    static add(meal, callback) {
        if (!meal) { return }
        console.log("Saving new meal ", meal.name)
        var query =
            `INSERT INTO ${schema.table.meal}
            (\`id\`, \`name\`)
            VALUES
            ('${tools.guid()}', '${meal.name}' )`;
        mysql.query(query);
        callback(JSON.stringify({ isSucess: true }));
    };

    static edit(meal, callback) {
        if (!meal) { return }
        console.log("Saving new meal ", typeof (meal), meal)

        var query =
            `START TRANSACTION;
         
        UPDATE ${schema.table.meal}
        SET         
         name = '${meal.name}',
         servings = '${meal.servings}',
         instructions = '${meal.instructions}'
         WHERE id = '${meal.id}';
         `;

        if (meal.ingredients) {
            for (let ingredient of meal.ingredients) {
                var guid = tools.guid();
                query += `
            INSERT INTO ${schema.table.ingredient}
            (
                id,
                name
            )
            VALUES(
                '${guid}',
                '${ingredient.name}'
            );`

                query += `
            INSERT INTO \`${schema.table.mealingredient}\`
            (
                id,
                mealId,
                ingredientId,
                amount
                )
                VALUES(
                    '${tools.guid()}',
                    '${meal.id}',
                    '${guid}',
                    '${ingredient.amount}'            
                );
                `;
            }
        }
        query += '\nCOMMIT;'

        console.log("Query would be\n", query);
        mysql.query(query);
    };
    static delete() { };
}
