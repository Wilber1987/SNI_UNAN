using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.Security;
using Newtonsoft.Json;
using CAPA_NEGOCIO.MAPEO;
using CAPA_DATOS;
using SNI_UI2.Controllers;

namespace SNI_UI.Controllers
{
    //[AuthController]
    [Route("api/[controller]/[action]")]
    [ApiController]
   
    public class InvestigacionesController : ControllerBase
    {
        public InvestigacionesController()
        {
           
        }
        [HttpPost]
        [AuthController]
        public object GetInvestigaciones(Tbl_Investigaciones Inst)
        {   
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.GetInvestigaciones();
        }
        public object GetUltimasInvestigaciones(Tbl_Investigaciones Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.Get<Tbl_Investigaciones>("Visibilidad = 'public' Order by [Id_Investigacion] desc");
        }
        public object SaveInvestigacion(Tbl_Investigaciones Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            Inst.Estado = "PENDIENTE";
            return Inst.SaveInvestigacion();
        }
        public object UpdateInvestigacion(Tbl_Investigaciones Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            Inst.Estado = null;
            return Inst.SaveInvestigacion();
        }
        //PUBLIC CONTROLLER INVESTIGACIONES
        public object TakeInvestigaciones(Tbl_Investigaciones Inst)
        {            
            Cat_Disciplinas Dis = new Cat_Disciplinas();
            List<Object> Data = new List<Object>();
            Data.Add(Inst.GetInvestigaciones());
            Data.Add(Dis.TakeDisciplinas());
            return Data;
        }
        public object TakeInvestigacionesPorDisciplina(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<InvestigacionesClass>(ObjInst.ToString());
            Cat_Disciplinas Dis = new Cat_Disciplinas();
            List<Object> Data = new List<Object>();
            Data.Add(Inst.TakeInvestigacionesPorDisciplinas());
            Data.Add(Dis.TakeDisciplinas());
            return Data;
        }
        public object TakeInvestigacion(Tbl_Investigaciones ObjInst)
        {
            return ObjInst.GetInvestigacion();
        }
        public object TakeInvestigadorProfile(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<Tbl_InvestigatorProfile>(ObjInst.ToString());
            return Inst.TakeInvestigadorProfile();
        }
        public object TakeDisciplinas(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<Cat_Disciplinas>(ObjInst.ToString());
            return Inst.TakeDisciplinas();
        }
        public object TakeKnowledgeMap(Object ObjInst)
        {
            var Inst = JsonConvert.DeserializeObject<Tbl_InvestigatorProfile>(ObjInst.ToString());
            return Inst.TakeInvestigadorProfile();
        }
    }
}
