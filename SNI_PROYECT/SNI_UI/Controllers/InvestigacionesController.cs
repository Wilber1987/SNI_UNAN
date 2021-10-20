using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAPA_NEGOCIO;
using Newtonsoft.Json;
using CAPA_NEGOCIO.MAPEO;

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
            Cat_Disciplinas Dis = new Cat_Disciplinas();
            List<Object> Data = new List<Object>();
            Data.Add(Inst.TakeInvestigaciones());
            Data.Add(Dis.TakeDisciplinas());
            return Data;
        }
        [HttpPost]
        public object TakeInvestigacionesPorDisciplina(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<InvestigacionesClass>(ObjInst.ToString());
            Cat_Disciplinas Dis = new Cat_Disciplinas();
            List<Object> Data = new List<Object>();
            Data.Add(Inst.TakeInvestigacionesPorDisciplinas());
            Data.Add(Dis.TakeDisciplinas());
            return Data;
        }
        [HttpPost]
        public object TakeInvestigacion(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<InvestigacionesClass>(ObjInst.ToString());
            return Inst.TakeInvestigacion();
        }
        [HttpPost]
        public object TakeInvestigadorProfile(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<Tbl_InvestigatorProfile>(ObjInst.ToString());
            return Inst.TakeInvestigadorProfile();
        }
        [HttpPost]
        public object TakeKnowledgeMap(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<Tbl_InvestigatorProfile>(ObjInst.ToString());
            return Inst.TakeInvestigadorProfile();
        }
    }
}
