import Vue from "vue";

export default Vue.extend({
    template: `<div id="menu" class="menu">
    <span v-bind:class="{ selected: visiblePage === views.main }">
        <button v-on:click="changeMenu('main')">Home</button>
    </span>
    <span v-bind:class="{ disabled: false, selected: visiblePage === views.edit }">
        <button v-on:click="changeMenu('edit')">Edit</button>
    </span>
    <span v-bind:class="{ selected: visiblePage === views.help }">
        <button v-on:click="changeMenu('help')">Help!</button>
    </span>
    </div>`,
    data() {
        return {
            views: {
                main: 'main',
                edit: 'edit',
                help: 'help'
            } as object,
            visiblePage: "main" as string
        }
    },
    methods: {
        changeMenu: function (newMenu):void {
            this.$data.visiblePage = newMenu;
            this.$emit('change-menu', newMenu);
        }
    },
    created: function() :void {
        this.changeMenu(this.$data.views.main);
    }
});