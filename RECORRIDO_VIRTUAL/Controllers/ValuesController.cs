using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RECORRIDO_VIRTUAL.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public string getTest()
        {
            return "HOLA MUNDO";
        }
    }
}
