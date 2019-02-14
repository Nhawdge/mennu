import ITable from "../interfaces/itable";
import "reflect-metadata"

export default function column(target: ITable, key: string) {
    console.log("Decorator", this, target, key);
    var obj = Object.defineProperty(target, "columns", { value: [key] })
    obj.prototype = target.prototype;
    return obj;
}

// const key = (target: any, key: string) => {
//     console.log("key", this, key);
// }
