import * as server from "./server"
import Meal from "./models/meal";

var m = new Meal();
m.id ="test";
m.name = "test";
console.log(m);
console.log(m.toAdd());
//server.default.start(); 
