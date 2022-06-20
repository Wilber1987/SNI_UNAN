using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.Security;
using CAPA_NEGOCIO.Entity;
using CAPA_NEGOCIO.Views;
using CAPA_NEGOCIO.MAPEO;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpPost]
        public Object TakePostulantes(Tbl_InvestigatorProfile inv)
        {
            inv.Estado = "POSTULANTE";
            return inv.Get();
        }
        public Object TakeInvestigadores(Tbl_InvestigatorProfile inv)
        {
            return inv.Get();
        }
    }
}
