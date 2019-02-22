import Table from "./table";
import { key, column } from "../decorators/column";
import { schema } from "../config";

export default class Ingredient extends Table {
    tableName: string = schema.table.ingredient.tableName;

    /**
     * New ingredient
     */
    constructor(data?: any) {
        super();
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.measurement = data.measurement;
        }
    }

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