using CAPA_NEGOCIO.MAPEO;
using CAPA_NEGOCIO.Security;
using Microsoft.AspNetCore.Mvc;

namespace SNI_UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProyectController : ControllerBase
    {
        public ProyectController()
        {
            //SqlADOConexion.IniciarConexion("sa", "zaxscd");
            if (!AuthNetCore.Authenticate())
            {
                Redirect("./Security/Login");
            }
        }
        [HttpPost]
        public object TakeProyect(Tbl_Proyectos Inst)
        {
            return Inst.Get<Tbl_Proyectos>();
        }
        public object TakeProyects(Tbl_Proyectos Inst)
        {
            return Inst.Get<Tbl_Proyectos>();
        }
        public object TakeTypeProyects(Cat_Tipo_Proyecto Inst)
        {
            return Inst.Get<Cat_Tipo_Proyecto>();
        }
        public List<ProyectoTableTareas> GetOwParticipations()
        {           
            return new ProyectoTableTareas().GetOwParticipations();
        }     
        public List<ProyectoTableActividades> GetOwActivities()
        {            
            return new ProyectoTableActividades().GetOwActivities();
        }
        public List<ProyectoCatDependencias> GetOwDependencies()
        {            
            return new ProyectoCatDependencias().GetOwDependencies();
        }

    }
}
