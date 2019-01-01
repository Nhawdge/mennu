var app = new Vue({
    el: '#meal-planner',
    data: {
        suggestions: [],
        showAdd: false
    },
    methods: {
        loadMeals: function () {
            var self = this;

            get('/meals', function (response) {
                self.$data.suggestions = response.map(function (r) {
                    return { text: r.id };
                })
            });
        },
        showAdd:function() {
            console.log("adding");
            this.$data.showAdd
        }
    
    },
    created: function () {
        this.loadMeals();
    }
})
