import MealDay from './mealday.js'

export default class MealPlan {
    /**
     * Creates a new Meal plan
     */
    constructor() {
        this.days.push(new MealDay());
    }
    days: Array<MealDay> = [];
}