import ITable from "../interfaces/itable";

export default function column(target: ITable, key: string) {
    console.log("Decorator", this, key);
    //this["columns"].push(key);
}