import Table from "./table";
import { key, column } from "../decorators/column";
import { schema } from "../config";

export default class Ingredient extends Table {
    tableName = schema.table.ingredient.tableName;
    /**
     * Row Id
     */
    @column
    @key
    id: string;

    /**
     * Name
     */
    @column
    name: string;
    
    /**
     * Measurement
     */
    @column
    measurement: number;
}