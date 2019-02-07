import Meal from "./meal";

export default class MealDay {
    /**
     * Creates a new Meal Day containing probably 3 meals.
     */
    constructor(day: string) {
        this.dayOfWeek = (day || "Sunday");
        this.meals.push(new Meal(), new Meal(), new Meal())
    }

    dayOfWeek: string;

    meals: Array<Meal> = []

}