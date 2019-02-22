import { schema } from "../config";
import mysql from "../mysql";
import Meal from "./meal";
import Ingredient from "./ingredient";

export default abstract class Table {
    columns: Array<string> = schema.table.meal.columns;
    foreignKeys: Array<string> = schema.table.meal.foreignKeys;
    abstract tableName: string;

    /** 
     * Returns the select statement to select all from this table
     * @param id Optional ID to "where" with;
     * @returns SQL string
     */
    GetAll(): Array<Table> {
        var self = this;
        var query = `
        SELECT * FROM ${schema.table.meal.tableName}
        `
        var meals: Array<Table>;
        var results: any;

        mysql.query(query).then((result: Array<any>) => {
            console.log(result);
            results = result.map(function (meal) {
                return new Meal(meal);
            })

        }).then(() => {
            if (!self.foreignKeys) {
                return;
            }
            console.log(results);
            for (let row of results) {

                for (let fk of self.foreignKeys) {
                    console.log(fk)
                    query = `SELECT * FROM ${fk} 
                     ${schema.foreignKeys[self.tableName][fk]}`

                    //query db and update property
                    mysql.query(query).then((results: Array<any>) => {
                        row[fk] = results.map(i => new Ingredient(i))
                    })
                }
            }
            console.log(results);

        }).catch(error => console.error(error));
        return new Array<Table>();
    }
    /**
     * Get Related data
     */
    getRelatedData(id: string, type: any) {
        var query = "";
        for (let key in this.foreignKeys) {
            query = `SELECT * FROM [${key}]
        join mealingredients on ${key}id = ${key}.id
        where ${this.tableName}id = ${id};`
        }
    }
    /**
     * Generates a statement to select all rows
     * @returns SQL String 
     */
    toSelectAll(): Array<Table> {
        throw "Not implemented";
    }
    /**
     * Generates SQL needed for insert
     * @returns a string of the query for INSERT INTO 
     */
    toAdd(): string {
        var keys: string = this.columns.map(k => `\`${k}\``).join(",\n")
        var values: string = this.columns.map(k => {
            let val = (this[k] || "");
            return `'${val}'`
        }).join(",\n")

        var fkeys = "";


        var query = ` 
        
        INSERT INTO ${schema.table.meal.tableName}
        (
            ${keys}
        )
        VALUES
        (
            ${values}
        )
        `
        return query
    }
    /** Sql to delete this object */
    toDelete(): string {
        return "";
    }
    /** SQL to update this object */
    toUpdate(): string {
        return "";
    }
}