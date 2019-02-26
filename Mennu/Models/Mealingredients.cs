using System;
using System.Collections.Generic;

namespace Mennu.Models
{
    public partial class Mealingredients
    {
        public string Id { get; set; }
        public string MealId { get; set; }
        public string IngredientId { get; set; }
        public string Amount { get; set; }
    }
}
