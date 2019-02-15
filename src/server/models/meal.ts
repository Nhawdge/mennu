import ITable from "../interfaces/itable";
import { schema } from "../config";
import { column, foreignKey } from "../decorators/column";
import Table from "./table";
import { ingredients } from "../tables/ingredient";

export default class Meal extends Table {

    /**
     * Builds a new meal
     */
    constructor() {
        super();        
    }

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
    @foreignKey
    ingredients: Array<ingredients>;

    /** How many people this will feed. */
    @column
    servings: number;
}