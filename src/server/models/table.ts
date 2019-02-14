import { schema } from "../config";
import ITable from "../interfaces/itable";

export default abstract class Table implements ITable {
    columns: Array<string> = new Array<string>();
    foreignKeys: Array<object> = new Array<object>();

    /** 
     * Returns the select statement to select all from this table
     * @returns SQL string
     */
    toSelect(): string {
        var query = `
        SELECT * FROM ${schema.table.meal}
        `
        return query;
    }
    /** Returns a string of the query for INSERT INTO */
    toAdd(): string {
        var keys: string = this.columns.map(k => `\`${k}\``).join(",\n")
        var values: string = this.columns.map(k => {
            let val = (this[k] || "");
            return `'${val}'`
        }).join(",\n")


        var query = `
        
        INSERT INTO ${schema.table.meal}
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