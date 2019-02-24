using Mennu.Models;
using Mennu.Utilities;
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

        public static bool SaveMeal(Meals meal)
        {
            try
            {
                using (var db = new mennuContext())
                {
                    if (false)//!meal.Id.HasValue())
                    {
                        //meal.Id = Guid.NewGuid();
                    }

                    db.Meals.Add(meal);
                    var rowsChanged = db.SaveChanges();

                    if (rowsChanged > 0)
                    {
                        return true;
                    }

                }
            }
            catch (Exception ex)
            {
                // todo logging
                return false;
            }
            return false;
        }
    }
}
