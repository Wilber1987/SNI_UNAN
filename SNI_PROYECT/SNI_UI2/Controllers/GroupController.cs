using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.MAPEO;
using CAPA_NEGOCIO.Security;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        [HttpPost]
        [AuthController]
        public object SaveGroup(Tbl_Grupos Inst)
        {
            Inst.Id_Investigador_Crea = AuthNetCore.User().UserId;
            return Inst.SaveGrupo();
        }
    }
}
