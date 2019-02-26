using System;
using System.Collections.Generic;

namespace Mennu.Models.Db
{
    public partial class Ingredients
    {
        public Ingredients()
        {
            Mealingredients = new HashSet<Mealingredients>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public int? Measurement { get; set; }

        public virtual ICollection<Mealingredients> Mealingredients { get; set; }
    }
}
