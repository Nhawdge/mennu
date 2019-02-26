export default class Meal {
    /** 
    * Creates a new Meal
    */
    constructor(data?: any) {
        if (data) {
            this.update(data);
        }
    }

    id: string = "";
    name: string = "";
    isActive: boolean = false;
    instructions: string = "";
    ingredients: Array<any> = []; // TODO 
    servings: number = 0;

    update(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.isActive = data.isActive;
        this.instructions = data.instructions;
        this.ingredients = data.ingredients;
        this.servings = data.servings;
    }
}
