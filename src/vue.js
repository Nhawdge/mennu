var app = new Vue({
    el: '#meal-planner',
    data: {
        message: 'Hello',
        suggestions: [
            { text: "Spaghetti" },
            { text: "Broccoli" },
            { text: "Peas" },
            { text: "Carrots" }
        ]
    },
    methods: {

    },
    created: function() {
        loadMeals();
        console.log("loaded");
    }
})

function loadMeals() {
    get('/meals', function(res) {
        console.log(res);
    }); 
}