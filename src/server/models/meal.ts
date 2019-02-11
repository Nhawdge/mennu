import ITable from "../interfaces/itable";
import { schema } from "../config";
import column from "../decorators/column";

export default class Meal implements ITable {
    /** Guid */
    @column
    public id: string; 

    /** Meal or Recipe name */
    @column
    name: string;

    /** Is Active */
    @column
    isActive: boolean;

    /** Recipe directions */
    @column
    instructions: string;

    /** Foreign Key */
    @column
    ingredients: Array<any>;

    /** How many people this will feed. */
    @column
    servings: number;

    columns: Array<any> = new Array<any>();

    toSelect(): string {
        var query = `
        SELECT * FROM ${schema.table.meal}
        `
        return query;
    }

    toAdd():string {
        var query = `
        INSERT INTO ${schema.table.meal}

        `
        return ""
    }
    toDelete():string {
        return "";
    }
    toUpdate():string {
        return "";
    }
}