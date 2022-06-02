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
            if (Inst.Id_Investigador == -1)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }else
            {
                return Inst.Update("Id_Investigador");
            }
            
        }
        public object SaveFormacionAcademica(Tbl_Formacion_Academica Inst)
        {
            if (Inst.IdFormacion == -1)
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
            if (Inst.Id_Patente == -1)
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
            if (Inst.Id_Distincion == -1)
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
            if (Inst.Id_DatoL == -1)
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
            if (Inst.Id_Evento == -1)
            {
                Inst.Id_Investigador = AuthNetCore.User().UserId;
                return Inst.Save();
            }
            else
            {
                return Inst.Update("Id_Evento");
            }
        }
      
        
    }
}
