using Mennu.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mennu.Services
{
    public static class MealService
    {
        public static IEnumerable<Meals> GetMeals()
        {
            var meals = Enumerable.Empty<Meals>();
            try
            {
                using (var db = new mennuContext())
                {
                    meals = db.Meals.ToList();
                }
            }
            catch (Exception ex)
            {
                // TODO add logging
            }
            finally
            {
            }
            return meals;
        }
    }
}
