var app = new Vue({
    el: '#meal-planner',
    data: {
        suggestions: [],
        showAdd: false,
        newMeal: new Meal(),
        mealPlan: new MealPlan()        
    },
    methods: {
        loadMeals: function () {
            var self = this;

            get('/meals', function (response) {
                self.$data.suggestions = response.map(function (r) {
                    return  new Meal(r); // { text: r.name };
                })
            });
        },
        toggleShowAdd: function() {
            var self = this;
            self.$data.showAdd = !self.$data.showAdd;
        },
        addNewMeal: function(){
            var self = this;
                var payload = {name: this.$data.newMeal.name};

            post('/meals/add', JSON.stringify(payload),  function(response)
            {
                self.$data.newMeal = new Meal();
                console.log('post ', response)
                self.loadMeals();
            })
        },
        makeActive: function(meal) {
            var self = this;

            if (meal.isActive) {
                meal.isActive = false;
            }
            else { 
                this.$data.suggestions.forEach(function(item) {
                    item.isActive = false;
                })
                meal.isActive = true;
            }
        },
        dragStart: function(e,a){
            e.dataTransfer.setData('application/json', JSON.stringify(a))
            console.log("start dragging",e,a)

        },
        mealDrop: function(e){
            e.preventDefault();
            e.stopPropagation();
            var data =  e.dataTransfer.getData('application/json');
            console.log("Meal Drop", data);
            
            
        },
    },
    created: function () {
        this.loadMeals();
    }
})


function Meal(data) {
    var self = this;
    if (data == null) {data = {}}

    self.name = (data.name || "");
    self.id = (data.id ||  "");
    self.isActive = false;

}

function MealPlan(data) {
    var self = this;
    if (data == null) {data = {}}

    self.breakfast = new MealRow();
    self.lunch = new MealRow();
    self.dinner = new MealRow();

}

function MealRow(data) {
    var self = this;
    if (data == null) {data = {}}

    self.meals = [new Meal(),
                  new Meal(),
                  new Meal(), 
                  new Meal(), 
                  new Meal(), 
                  new Meal(), 
                  new Meal() ]

}