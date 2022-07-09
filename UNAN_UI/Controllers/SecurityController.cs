using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SECURITY;
using CAPA_DATOS;

namespace UNAN_UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        [HttpPost]
        public object Login(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<UserModel>(ObjInst.ToString());
            Inst.LoginIn();
            return Inst;
        }
        public object LogOut()
        {
            return AuthNetCore.ClearSeason();
        }
        public object Verification()
        {
            return AuthNetCore.Authenticate();
        }
    }
}
