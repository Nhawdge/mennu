export default class Meal {
    /** 
    * Creates a new Meal
    */
    constructor(data?: object) {
    }

    isActive: boolean = false;
    name: string = "";
    id: string = "";
    instructions: string = "";
    ingredients: Array<any> = []; // TODO 
    servings: number = 0;
}
