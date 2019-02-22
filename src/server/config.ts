const schema = {
    table: {
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
    },
    enums: {
        relationships: {
            OneToOne: 1,
            OneToMany: 2,
            ManyToMany: 3
        }
    },
    foreignKeys: {
        meals: {
            ingredients: `JOIN mealingredients ON meals.id = mealingredients.mealid
            JOIN ingredients ON mealingredients.ingredientId = ingredients.id`
        },
        ingredients: {
            meals: `JOIN mealingredients ON ingredient.id = mealingredients.ingredientid
            JOIN meals on mealingredients.mealid = meal.id `
        }
    },
    dev: {},
    prod: {}

}

export { schema } 