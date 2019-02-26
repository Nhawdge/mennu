using System;
using System.Collections.Generic;

namespace Mennu.Models.Db
{
    public partial class Mealingredients
    {
        public string Id { get; set; }
        public string MealId { get; set; }
        public string IngredientId { get; set; }
        public string Amount { get; set; }

        public virtual Ingredients Ingredient { get; set; }
        public virtual Meals Meal { get; set; }
    }
}
