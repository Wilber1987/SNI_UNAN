using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAPA_NEGOCIO;
using Newtonsoft.Json;

namespace SNI_UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InvestigacionesController : ControllerBase
    {
        [HttpPost]
        public object TakeInvestigaciones(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<InvestigacionesClass>(ObjInst.ToString()); 
            return Inst.TakeInvestigaciones();
        }
        [HttpPost]
        public object TakeInvestigacion(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<InvestigacionesClass>(ObjInst.ToString());
            return Inst.TakeInvestigacion();
        }
    }
}
