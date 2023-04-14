using CAPA_DATOS;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.MAPEO;
using CAPA_NEGOCIO.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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


    }
}
