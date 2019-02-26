using System;
using System.Collections.Generic;
using System.Linq;
using Mennu.Models.Db;

namespace Mennu.Models
{
    public class Meal
    {

        public IEnumerable<Ingredient> Ingredients = Enumerable.Empty<Ingredient>();
        public Meal()
        {

        }

        public Meal(Meals meal)
        {
            this.Id = meal.Id;
            this.Name = meal.Name;
            this.Servings = meal.Servings;
            this.Instructions = meal.Instructions;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public int? Servings { get; set; }
        public string Instructions { get; set; }
    }
}
