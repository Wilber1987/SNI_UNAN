using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAPA_NEGOCIO;

namespace SNI_UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InvestigacionesController : ControllerBase
    {
        [HttpPost]
        public object TakeInvestigaciones()
        {
            InvestigacionesClass Inst = new InvestigacionesClass();
            return Inst.TakeInvestigaciones();
        }
    }
}
