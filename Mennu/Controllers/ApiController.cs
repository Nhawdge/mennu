using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mennu.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mennu.Controllers
{
    public class ApiController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAllMeals()
        {
            return Json(Services.MealService.GetMeals());
        }
        
        [HttpPost]
        public IActionResult SaveMeal([FromBody]Meals meal)
        {

            var response = Services.MealService.SaveMeal(meal);
            return Json(response);
        }


    }
}
