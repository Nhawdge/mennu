export class schema {
    static table = {
        meal: {
            tableName: "meals",
            key: [],
            columns: [],
            foreignKeys: []
        },
        ingredient: {
            tableName: "ingredients",
            key: [],
            columns: [],
            foreignKeys: []
        },
        mealingredient: {
            tableName: "mealingredients",
            key: [],
            columns: [],
            foreignKeys: []
        },
        mealplans: {
            tableName: "mealplans",
            key: [],
            columns: [],
            foreignKeys: []
        }
    };
    static enums: {
        relationships: {
            OneToOne: 1,
            OneToMany: 2,
            ManyToMany: 3
        }       

    }
    static dev: {};
    static prod: {};

}