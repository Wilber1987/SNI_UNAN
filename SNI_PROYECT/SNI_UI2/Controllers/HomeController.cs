using Microsoft.AspNetCore.Mvc;

namespace SNI_UI2.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }
    }
}
