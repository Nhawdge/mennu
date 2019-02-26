using Mennu.Models;
using Mennu.Models.Db;
using Mennu.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mennu.Services
{
    public static class MealService
    {
        public static IEnumerable<Meal> GetMeals()
        {
            var meals = Enumerable.Empty<Meal>();
            try
            {
                using (var db = new mennuContext())
                {
                    meals = db.Meals.Select(x => new Meal(x)).ToList();

                    foreach (var meal in meals)
                    {
                        meal.Ingredients = db.Ingredients
                            .Where(x => x.Mealingredients.Any(y => y.MealId == meal.Id))
                            .Select(x => new Ingredient(x))
                            .ToList();
                    }
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
        public static bool SaveMeal(Meal meal)
        {
            return SaveMeal(new Meals
            {
                Id = meal.Id,
                Instructions = meal.Instructions,
                Name = meal.Name,
                Servings = meal.Servings
            });
        }
    }
}
