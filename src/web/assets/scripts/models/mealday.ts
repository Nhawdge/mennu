import Meal from "./meal";

export default class  MealDay{
    /**
     * Creates a new Meal Day containing probably 3 meals.
     */
    constructor() {
        this.dayOfWeek = "Sunday";
    }

    dayOfWeek:string;

    meals:Array<Meal> = []

}