import Meal from "./models/meal";
import mysql from "./mysql";

export class api {
    static meals = Meal;
    static database = mysql;
    // static ingredients = ingredients;
    // static plans = plans;
}
