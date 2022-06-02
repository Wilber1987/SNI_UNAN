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
            return (new Cat_TipoEstudio()).Get();
        }
        public object GetIdiomas()
        {
            return (new Cat_Idiomas()).Get();
        }       
        public object GetInstitucion()
        {
            return (new Cat_instituciones()).Get();
        }
        public object GetCargos()
        {
            return (new Cat_Cargos()).Get();
        }
        public object GetTipoEventos()
        {
            return (new Cat_Tipo_Evento()).Get();
        }
        public object GetPaises()
        {
            return (new Cat_Paises()).Get();
        }
        public object GetTipoDistincion()
        {
            return (new CatTipoDistincion()).Get();
        }
        //Postularse
        public object Register(Tbl_InvestigatorProfile postulante)
        {
            return postulante.Postularse();
        }

    }
}
