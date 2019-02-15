import * as server from "./server"
import Meal from "./models/meal";
import { schema } from "./config";

var m = new Meal();
m.id ="test";
m.name = "test";
console.log(m);
console.log(schema.table);
console.log(m.toAdd());


//server.default.start(); 
