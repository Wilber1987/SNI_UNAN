using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.MAPEO;
using CAPA_NEGOCIO.Security;
using System;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        [HttpPost]
        [AuthController]
        public Object SaveGroup(Tbl_Grupos Inst)
        {
            Inst.Id_Investigador_Crea = AuthNetCore.User().UserId;
            return Inst.SaveGrupo();
        }
        public object TakeGrupos(Tbl_InvestigatorProfile Inst)
        {
            Tbl_Grupos tg = new Tbl_Grupos();
            return tg.GetGroupsByInvestigator(Inst);
        }
        public Object GetGroup(Tbl_Grupos Inst)
        {
            return Inst.GetGroup();
        }
        public Object GetRecomendedGroups(Tbl_Grupos Inst)
        {
            return Inst.GetRecomendedGroups();
        }
        public Object GetGroups(Tbl_Grupos Inst)
        {
            return Inst.GetGroups();
        }
        public Object GetGruposInvestigador()
        {
            Tbl_InvestigatorProfile Inv = new Tbl_InvestigatorProfile();
            Inv.Id_Investigador = AuthNetCore.User().UserId;
            Tbl_Grupos group = new Tbl_Grupos();
            return group.GetGroupsByInvestigator(Inv);
        }
    }
}
