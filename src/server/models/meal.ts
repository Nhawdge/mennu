import ITable from "../interfaces/itable";
import { schema } from "../config";
import column from "../decorators/column";
import Table from "./table";
import { ingredients } from "../tables/ingredient";

export default class Meal extends Table {

    /**
     * Builds a new meal
     */
    constructor() {
        super();
        this.columns.push("id", "name", "isActive", "instructions", "servings");
        this.foreignKeys.push({
            key: "id" as string,
            table: "ingredients" as string,
            foreignKey: "mealId"
        })
    }

    /** Guid */
    @column
    public id: string;

    /** Meal or Recipe name */
    name: string;

    /** Is Active */
    isActive: boolean;

    /** Recipe directions */
    instructions: string;

    /** Foreign Key */
    ingredients: Array<any>;

    /** How many people this will feed. */
    servings: number;
}