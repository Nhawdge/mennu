using Mennu.Models.Db;
using System;
using System.Collections.Generic;

namespace Mennu.Models
{
    public partial class Ingredient
    {
        public Ingredient(Ingredients ingredient)
        {
            this.Id = ingredient.Id;
            this.Name = ingredient.Name;
            this.Measurement = ingredient.Measurement;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public int? Measurement { get; set; }
    }
}
