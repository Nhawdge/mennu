import Table from "./table";
import { column, key, foreignKey } from "../decorators/column";
import { schema } from "../config";

export default class MealIngredient extends Table {
    tableName = schema.table.mealingredient.tableName;
    /**
     * Row id
     */
    @column
    @key
    id: string;

    /**
     * Meal id
     */
    @column
    @foreignKey
    mealId: string;

    /** 
     * IngredientId
     */
    @column
    @foreignKey
    ingredientId: string;
}