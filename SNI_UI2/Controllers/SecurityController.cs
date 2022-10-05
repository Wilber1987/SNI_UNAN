using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.Security;
using Newtonsoft.Json;
using CAPA_NEGOCIO.MAPEO;
using CAPA_DATOS;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        [HttpPost]
        public object Login(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<UserModel>(ObjInst.ToString());
            AuthNetCore.loginIN(Inst.mail, Inst.password);
            return AuthNetCore.User();
        }
        public object LogOut()
        {
            return AuthNetCore.ClearSeason();
        }
        public bool Verification()
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
