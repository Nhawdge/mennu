using System;
using System.Collections.Generic;

namespace Mennu.Models
{
    public partial class Meals
    {
        public Meals()
        {
            Mealingredients = new HashSet<Mealingredients>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public int? Servings { get; set; }
        public string Instructions { get; set; }

        public virtual ICollection<Mealingredients> Mealingredients { get; set; }
    }
}
