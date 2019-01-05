var views = {
    main: 'main',
    edit: 'edit'
}

var app = new Vue({
    el: '#meal-planner',
    data: {
        suggestions: [],
        showAdd: false,
        newMeal: new Meal(),
        mealPlan: new MealPlan(),
        visiblePage: views.edit,
        views: views
    },
    methods: {
        loadMeals: function () {
            var self = this;

            get('/meals', function (response) {
                self.$data.suggestions = response.map(function (r) {
                    return new Meal(r); // { text: r.name };
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
                console.log('post ', response)
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
            console.log(meal);
            var newMeal = JSON.parse(data);
            meal.update(newMeal);
        },
        showEdit: function () {
            var self = this;
            var meal = self.$data.suggestions.filter(function (s) { return s.isActive })[0];
            if (meal) { 
                self.$data.visiblePage = views.edit;
            }            
        },
        showMain: function() {
            this.$data.visiblePage = views.main;
        }
    },
    computed: {
        
    },
    created: function () {
        this.loadMeals();
    }
})



function Meal(data) {
    var self = this;
    if (data == null) { data = {} }


    self.name = (data.name || "");
    self.id = (data.id || "");
    self.isActive = false;

    self.update = function (data) {
        self.name = (data.name || "");
        self.id = (data.id || "");
    }

    self.update(data);
}

function MealPlan(data) {
    var self = this;
    if (data == null) { data = {} }

    self.breakfast = new MealRow();
    self.lunch = new MealRow();
    self.dinner = new MealRow();

}

function MealRow(data) {
    var self = this;
    if (data == null) { data = {} };

    self.meals = [new Meal(),
    new Meal(),
    new Meal(),
    new Meal(),
    new Meal(),
    new Meal(),
    new Meal()]

}