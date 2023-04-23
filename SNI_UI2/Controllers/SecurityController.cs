using Microsoft.AspNetCore.Mvc;
using CAPA_NEGOCIO.Security;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        [HttpPost]
        public object Login(UserModel Inst)
        {
            return AuthNetCore.loginIN(Inst.mail, Inst.password);
        }
        public object LogOut()
        {
            return AuthNetCore.ClearSeason();
        }
        public bool Verification()
        {
            return AuthNetCore.Authenticate();
        }
        public static bool IsAdmin()
        {
            return AuthNetCore.Authenticate();
        }
        public static bool Auth()
        {
            return AuthNetCore.Authenticate();
        }
        public static bool HavePermission(string permission)
        {
            return AuthNetCore.HavePermission(permission);
        }

    }
}
