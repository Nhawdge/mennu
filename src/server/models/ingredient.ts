import Table from "./table";
import { key, column } from "../decorators/column";

export default class Ingredient extends Table {

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