import * as server from "./server"
import Meal from "./models/meal";

var m = new Meal();
console.log(m);
console.log(m.toSelect());
m.id = "123";
console.log("id is", m.id);
console.log(m.columns);

//server.default.start(); 
