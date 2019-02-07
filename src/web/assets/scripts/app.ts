var views = {
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
    methods: {
        loadMeals: function () {
            var self = this;
            console.log('loading meals');
            get('/meals', function (response) {
                self.$data.suggestions = response.map(function (r) {
                    return new Meal(r);
                })
            });
        },
        toggleShowAdd: function () {
            var self = this;
            self.$data.showAdd = !self.$data.showAdd;
        },
        addNewMeal: function () {
            var self = this;
            var payload = { name: this.$data.newMeal.name };

            post('/meals/add', JSON.stringify(payload), function (response) {
                self.$data.newMeal = new Meal();
                console.log('post ', response, "Loading meals")
                self.loadMeals();
            })
        },
        makeActive: function (meal) {
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
        dragStart: function (evt, meal) {
            evt.dataTransfer.setData('application/json', JSON.stringify(meal))
        },
        mealDrop: function (evt, meal) {
            var data = evt.dataTransfer.getData('application/json');
            var newMeal = JSON.parse(data);
            meal.update(newMeal);
        },
        showEdit: function () {
            var self = this;
            var meal = self.$data.suggestions.filter(function (s) { return s.isActive })[0];
            if (meal) {
                self.$data.newMeal = meal;
                self.$data.visiblePage = views.edit;
            }
        },
        showMain: function () {
            this.$data.visiblePage = views.main;
        },
        showHelp: function () {
            this.$data.visiblePage = views.help;
        },
        saveMeal: function (e) {
            var self = this;
            e.preventDefault();
            var payload = self.$data.newMeal;
            post('/meals/save', JSON.stringify(payload), function (result) {
                console.log("Saved? ", result);
            })
            self.$data.visiblePage = views.main;
        },
        addIngredient: function (e) {
            e.preventDefault();
            this.$data.newMeal.ingredients.push(new Ingredient());
            return false;
        },
        mealClick: function (meal) {
            var self = this;
            if (self.selectedMeal) {
                meal.update(JSON.parse(JSON.stringify(self.selectedMeal)));
            }
        },
        buildWeek: function () {
            var self = this;
            console.log(self.$data.mealPlan);
            self.$data.mealPlan.days.push(
                new MealDay("Sunday"),
                new MealDay("Monday"),
                new MealDay("Tuesday"),
                new MealDay("Wednesday"),
                new MealDay("Thursday"),
                new MealDay("Friday"),
                new MealDay("Saturday"),
                );
        }
    },
    computed: {
        canShowEdit: function () {
            var self = this;
            if (self.$data.suggestions.length) {
                var meal = self.$data.suggestions.filter(function (s) { return s.isActive })
                return false// !meal.length == 0;
            }
            return false;

        },
        selectedMeal: function () {
            var self = this;
            if (self.$data.suggestions.length) {
                var meal = self.$data.suggestions.filter(function (s) { return s.isActive })
                if (meal.length) {
                    return meal[0];
                }
            }

        }
    },
    created: function () {
        this.loadMeals();
        this.buildWeek();
    }
});

