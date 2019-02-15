import Table from "./table";
import { column, key, foreignKey } from "../decorators/column";

export default class MealIngredient extends Table {
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