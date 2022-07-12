using CAPA_NEGOCIO.MAPEO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PublicCatController : ControllerBase
    {
        [HttpPost]
        [AuthAnonymous]
        //Get
        public object GetTipoEstudio()
        {
            var inst = new Cat_TipoEstudio();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetIdiomas()
        {
            var inst = new Cat_Idiomas();
            inst.Estado = "Activo";
            return inst.Get();
        }       
        public object GetInstitucion()
        {
            var inst = new Cat_instituciones();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetCargos()
        {
            var inst = new Cat_Cargos();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetTipoEventos()
        {
            var inst = new Cat_Tipo_Evento();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetPaises()
        {
            var inst = new Cat_Paises();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetTipoDistincion()
        {
            var inst = new CatTipoDistincion();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetRedesSociales()
        {
            var inst = new CatRedesSociales();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetLocalidades()
        {
            var inst = new Cat_Localidad();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetTipoInvestigaciones()
        {
            var inst = new Cat_Tipo_Investigacion();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetProcesosEditoriales()
        {
            var inst = new Cat_Tipo_Proceso_Editorial();
            inst.Estado = "Activo";
            return inst.Get();
        }
        public object GetDisciplinas()
        {
            var inst = new Cat_Disciplinas();
            inst.Estado = "Activo";
            return inst.Get();
        }
        //Postularse
        public object Register(Tbl_InvestigatorProfile postulante)
        {
            return postulante.Postularse();
        }

    }
}
