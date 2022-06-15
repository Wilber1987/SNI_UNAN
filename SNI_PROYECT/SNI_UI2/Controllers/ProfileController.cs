using CAPA_NEGOCIO;
using CAPA_NEGOCIO.MAPEO;
using CAPA_NEGOCIO.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        [HttpPost]
        [AuthController]
        //Save
        public object SaveProfile(Tbl_InvestigatorProfile Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.SaveProfile();
        }
        public object SaveFormacionAcademica(Tbl_Formacion_Academica Inst)
        {
            if (Inst.IdFormacion == null)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }
            else
            {
                return Inst.Update("IdFormacion");
            }
        }
        public object SavePatente(Tbl_Patentes Inst)
        {
            if (Inst.Id_Patente == null)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }
            else
            {
                return Inst.Update("Id_Patente");
            }
        }
        public object SaveDistincion(Tbl_Distinciones Inst)
        {
            if (Inst.Id_Distincion == null)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }
            else
            {
                return Inst.Update("Id_Distincion");
            }
        }
        public object SaveDatoLaboral(Tbl_Datos_Laborales Inst)
        {
            if (Inst.Id_DatoL == null)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }
            else
            {
                return Inst.Update("Id_DatoL");
            }
        }
        public object SaveEvento(Tbl_Evento Inst)
        {
            if (Inst.Id_Evento == null)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }
            else
            {
                return Inst.Update("Id_Evento");
            }
        }

        public object SaveRedSocialP(Tbl_Invest_RedS Inst)
        {
            if (Inst.Id_Investigador == null)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }
            else
            {
                return Inst.Update(new string[]{ "Id_Investigador", "Id_RedSocial"});
            }
        }
    }
}
