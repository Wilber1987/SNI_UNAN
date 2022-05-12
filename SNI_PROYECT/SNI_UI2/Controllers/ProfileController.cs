using CAPA_NEGOCIO.MAPEO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        [HttpPost]
        [AuthController]
        public object SaveProfile(Tbl_InvestigatorProfile Inst)
        {
            if (Inst.Id_Investigador == null)
            {
                return Inst.Save();
            }else
            {
                return Inst.Update("Id_Investigador");
            }
            
        }
        public object SaveFormacionAcademica(Tbl_Formacion_Academica Inst)
        {
            if (Inst.IdFormacion == null)
            {
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
                return Inst.Save();
            }
            else
            {
                return Inst.Update("Id_Evento");
            }
        }
    }
}
