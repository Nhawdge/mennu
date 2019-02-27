var views: any = {
    main: 'main',
    edit: 'edit',
    help: 'help'
}

import Vue from "vue";
import Meal from './models/meal.js'
import MealPlan from './models/mealplan.js'
import Ingredient from './models/ingredient.js'
import { get, post } from './tools.js'
import MealDay from "./models/mealday.js";

let mainApp = new Vue({
    el: '#meal-planner',
    data: {
        suggestions: [] as Array<Meal>,
        showAdd: false as boolean,
        newMeal: new Meal() as Meal,
        mealPlan: new MealPlan() as MealPlan,
        visiblePage: views.main as string,
        views: views as object,
    },
    components: {
    },
    methods: {
        loadMeals: function (): void {
            var self = this;
            get('/api/GetAllMeals', function (response) {
                self.$data.suggestions = response.map(function (r) {
                    return new Meal(r);
                })
            });
        },
        toggleShowAdd: function (): void {
            var self = this;
            self.$data.showAdd = !self.$data.showAdd;
        },
        addNewMeal: function (): void {
            var self = this;
            var payload = { name: this.$data.newMeal.name };

            post('/api/SaveMeal', JSON.stringify(payload), function (response) {
                self.$data.newMeal = new Meal();
                self.loadMeals();
            })
        },
        makeActive: function (meal: Meal): void {
            var self = this;

            if (meal.isActive) {
                meal.isActive = false;
            }
            else {
                this.$data.suggestions.forEach(function (item) {
                    item.isActive = false;
                })
                meal.isActive = true;
            }
        },
        dragStart: function (evt: DragEvent, meal: Meal): void {
            evt.dataTransfer.setData('application/json', JSON.stringify(meal))
        },
        mealDrop: function (evt: DragEvent, meal: Meal): void {
            var data = evt.dataTransfer.getData('application/json');
            var newMeal = JSON.parse(data);
            meal.update(newMeal);
        },
        showEdit: function (): void {
            var self = this;
            var meal = self.$data.suggestions.filter(function (s) { return s.isActive })[0];
            if (meal) {
                self.$data.newMeal = meal;
                self.$data.visiblePage = views.edit;
            }
        },
        showMain: function (): void {
            this.$data.visiblePage = views.main;
        },
        showHelp: function (): void {
            this.$data.visiblePage = views.help;
        },
        saveMeal: function (e: Event): void {
            var self = this;
            e.preventDefault();
            var payload = self.$data.newMeal;
            post('/meals/save', JSON.stringify(payload), function (result): void {
                console.log("Saved? ", result);
            })
            self.$data.visiblePage = views.main;
        },
        addIngredient: function (e: Event): boolean {
            e.preventDefault();
            this.$data.newMeal.ingredients.push(new Ingredient());
            return false;
        },
        mealClick: function (meal: Meal): void {
            var self = this;
            if (self.selectedMeal) {
                meal.update(JSON.parse(JSON.stringify(self.selectedMeal)));
            }
        },
        buildWeek: function (): void {
            var self = this;
            self.$data.mealPlan.days.push(
                new MealDay("Sunday"),
                new MealDay("Monday"),
                new MealDay("Tuesday"),
                new MealDay("Wednesday"),
                new MealDay("Thursday"),
                new MealDay("Friday"),
                new MealDay("Saturday"),
            );
        },
        menuChange: function (screen): void {
            this.$data.visiblePage = views[screen];

        }
    },
    computed: {
        canShowEdit: function (): boolean {
            var self = this;
            if (self.$data.suggestions.length) {
                var meal = self.$data.suggestions.filter(function (s) { return s.isActive })
                return !(meal.length == 0);
            }
            return false;
        },
        selectedMeal: function (): Meal {
            var self = this;
            if (self.$data.suggestions.length) {
                var meal = self.$data.suggestions.filter(function (s) { return s.isActive })
                if (meal.length) {
                    return meal[0];
                }
            }
            return null;
        },
        ingredients: function (): Array<Ingredient> {
            var self = this;
            var allIngredients = new Array<Ingredient>();

            var meals = self.$data.mealPlan.days.reduce((a, b) => {
                a.push(...b.meals.reduce((c, d) => {
                    c.push(d);
                    return c
                }, []);
                return a;
            }, []);

            var ingredients = meals.reduce((acc, meal) => {
                acc.push(...meal.ingredients)
                return acc;
            }, [])
            console.log("Ingredients", ingredients)

            allIngredients = ingredients.reduce((acc, ing) => {
                let index = acc.findIndex(a => a.id == ing.id);

                if (index >= 0) {
                    acc[index].amount += ing.amount;
                    //console.log("Existing ing", ingredients[index])
                }
                else {
                    acc.push(new Ingredient(JSON.parse(JSON.stringify(ing))));
                }

                return acc;
            }, [])

            console.log(allIngredients);
            return allIngredients;
        }

    },
    created: function (): void {
        this.loadMeals();
        this.buildWeek();
    }
});

