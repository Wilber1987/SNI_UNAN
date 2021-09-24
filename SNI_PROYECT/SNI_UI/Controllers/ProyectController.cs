using CAPA_NEGOCIO;
using CAPA_NEGOCIO.MAPEO;
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
        [HttpPost]
        public object TakeProyect(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<Tbl_Proyectos>(ObjInst.ToString());
            return Inst.TakeProyect();
        }
        public object TakeProyects(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<Tbl_Proyectos>(ObjInst.ToString());
            return Inst.TakeProyects();
        }
    }
}
