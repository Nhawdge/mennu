import { column, foreignKey, key } from "../decorators/column";
import Table from "./table";
import Ingredient from "./ingredient";
import { schema } from "../config";

export default class Meal extends Table {
    tableName:string = schema.table.meal.tableName;
    /**
     * Builds a new meal
     */
    constructor() {
        super();        
    }

    /** Guid */
    @column
    @key
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
    ingredients: Array<Ingredient>;

    /** How many people this will feed. */
    @column
    servings: number;
}