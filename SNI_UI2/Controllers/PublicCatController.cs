using CAPA_NEGOCIO.MAPEO;
using Microsoft.AspNetCore.Mvc;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PublicCatController : ControllerBase
    {
        [HttpPost]
        [AnonymousAuth]
        //Get
        public object GetTipoEstudio()
        {
            var inst = new Cat_TipoEstudio();
            inst.Estado = "Activo";
            return inst.Get<Cat_TipoEstudio>();
        }
        public object GetIdiomas()
        {
            var inst = new Cat_Idiomas();
            inst.Estado = "Activo";
            return inst.Get<Cat_Idiomas>();
        }       
        public object GetInstitucion()
        {
            var inst = new Cat_instituciones();
            inst.Estado = "Activo";
            return inst.Get<Cat_instituciones>();
        }
        public object GetCargos()
        {
            var inst = new Cat_Cargos();
            inst.Estado = "Activo";
            return inst.Get<Cat_Cargos>();
        }
        public object GetTipoEventos()
        {
            var inst = new Cat_Tipo_Evento();
            inst.Estado = "Activo";
            return inst.Get<Cat_Tipo_Evento>();
        }
        public object GetPaises()
        {
            var inst = new Cat_Paises();
            inst.Estado = "Activo";
            return inst.Get<Cat_Paises>();
        }
        public object GetTipoDistincion()
        {
            var inst = new CatTipoDistincion();
            inst.Estado = "Activo";
            return inst.Get<CatTipoDistincion>();
        }
        public object GetRedesSociales()
        {
            var inst = new CatRedesSociales();
            inst.Estado = "Activo";
            return inst.Get<CatRedesSociales>();
        }
        public object GetLocalidades()
        {
            var inst = new Cat_Localidad();
            inst.Estado = "Activo";
            return inst.Get<Cat_Localidad>();
        }
        public object GetTipoInvestigaciones()
        {
            var inst = new Cat_Tipo_Investigacion();
            inst.Estado = "Activo";
            return inst.Get<Cat_Tipo_Investigacion>();
        }
        public object GetProcesosEditoriales()
        {
            var inst = new Cat_Tipo_Proceso_Editorial();
            inst.Estado = "Activo";
            return inst.Get<Cat_Tipo_Proceso_Editorial>();
        }
        public object GetDisciplinas()
        {
            var inst = new Cat_Disciplinas();
            inst.Estado = "Activo";
            return inst.Get<Cat_Disciplinas>();
        }
        public object GetTipoGrupo()
        {
            var inst = new Cat_TipoGrupo();
            inst.Estado = "Activo";
            return inst.Get<Cat_TipoGrupo>();
        }
        public object GetTipoParticipacionEventos()
        {
            var inst = new Cat_Tipo_Participacion_Eventos();
            //inst.Estado = "Activo";
            return inst.Get<Cat_Tipo_Participacion_Eventos>();
        }
        public object GetInvestigadores()
        {
            var inst = new Tbl_InvestigatorProfile();
            inst.Estado = "Activo";
            return inst.Get<Tbl_InvestigatorProfile>();
        }
        //Postularse
        public object Register(Tbl_InvestigatorProfile postulante)
        {
            return postulante.Postularse();
        }

    }
}
