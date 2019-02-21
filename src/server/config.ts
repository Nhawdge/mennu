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
    static foreignKeys: {
        meals: {
            ingredients: ` mealingredients on meals.id = mealingredients.mealid
            join ingredients on mealingredients.ingredientId = ingredients.id`
        },
        ingredients: {
            meals: `${schema.table.mealingredient.tableName} on ingredient.id = mealingredients.ingredientid
            join meals on mealingredients.mealid = meal.id `as string
        }
    }
    static dev: { };
    static prod: { };

}