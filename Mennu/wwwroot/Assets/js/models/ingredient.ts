export default class Ingredient {

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.amount = data.amount;
            this.measurement = data.measurement;
        }
    }

    id:string = ""
    name: string = "";
    amount: number = null;
    measurement: number = null;
}