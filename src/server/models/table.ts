import { schema } from "../config";

export default abstract class Table {
    columns: Array<string> = schema.table.meal.columns;
    foreignKeys: Array<object> = schema.table.meal.foreignKeys;
    abstract tableName: string;

    /** 
     * Returns the select statement to select all from this table
     * @param id Optional ID to "where" with;
     * @returns SQL string
     */
    toSelect(id?: string): string {
        var query = `
        SELECT * FROM ${schema.table.meal.tableName}
        `
        if (schema.table.meal.foreignKeys) {
            for (let fk of schema.table.meal.foreignKeys) {
                query += `JOIN ${schema.table[fk]} on ${schema.table.meal.key[0]} = ${fk}.id`
            }
        }
        return query;
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
    static toSelectAll(): string {
        var query = `
        SELECT * FROM ${schema.table.meal.tableName}
        `
        if (schema.table.meal.foreignKeys) {
            query += `JOIN `
        }
        return query;
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