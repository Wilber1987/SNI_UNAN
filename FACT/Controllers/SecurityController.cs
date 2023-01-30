using DataBaseModel;
using Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers {
   [Route("api/[controller]/[action]")]
   [ApiController]
   public class SecurityController : ControllerBase {
       [HttpPost]
       public object Login(Security_Users Inst) {
            return AuthNetCore.loginIN(Inst.Mail, Inst.Password);
       }
   }
}
