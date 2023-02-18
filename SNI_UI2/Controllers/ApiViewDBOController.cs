using DataBaseModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using SNI_UI2.Controllers;

namespace API.Controllers {
   [Route("api/[controller]/[action]")]
   [ApiController]
   public class  ApiViewDBOController : ControllerBase {
       //ViewInvestigacionesDisciplinas
       [HttpPost]
       [AuthController]
       public List<ViewInvestigacionesDisciplinas> getViewInvestigacionesDisciplinas(ViewInvestigacionesDisciplinas Inst) {
           return Inst.Get<ViewInvestigacionesDisciplinas>();
       }
       //ViewInvestigacionesPhoto
       [HttpPost]
       [AuthController]
       public List<ViewInvestigacionesPhoto> getViewInvestigacionesPhoto(ViewInvestigacionesPhoto Inst) {
           return Inst.Get<ViewInvestigacionesPhoto>();
       }
       //ViewInvestigaciones
       [HttpPost]
       [AuthController]
       public List<ViewInvestigaciones> getViewInvestigaciones(ViewInvestigaciones Inst) {
           return Inst.Get<ViewInvestigaciones>();
       }
       //ViewColaboradores
       [HttpPost]
       [AuthController]
       public List<ViewColaboradores> getViewColaboradores(ViewColaboradores Inst) {
           return Inst.Get<ViewColaboradores>();
       }
       //ViewParticipantesProyectos
       [HttpPost]
       [AuthController]
       public List<ViewParticipantesProyectos> getViewParticipantesProyectos(ViewParticipantesProyectos Inst) {
           return Inst.Get<ViewParticipantesProyectos>();
       }
       //ViewRedesInvestigadores
       [HttpPost]
       [AuthController]
       public List<ViewRedesInvestigadores> getViewRedesInvestigadores(ViewRedesInvestigadores Inst) {
           return Inst.Get<ViewRedesInvestigadores>();
       }
       //ViewIdiomasInvestigadores
       [HttpPost]
       [AuthController]
       public List<ViewIdiomasInvestigadores> getViewIdiomasInvestigadores(ViewIdiomasInvestigadores Inst) {
           return Inst.Get<ViewIdiomasInvestigadores>();
       }
       //ViewCalendarioByDependencia
       [HttpPost]
       [AuthController]
       public List<ViewCalendarioByDependencia> getViewCalendarioByDependencia(ViewCalendarioByDependencia Inst) {
           return Inst.Get<ViewCalendarioByDependencia>();
       }
       //ViewActividadesParticipantes
       [HttpPost]
       [AuthController]
       public List<ViewActividadesParticipantes> getViewActividadesParticipantes(ViewActividadesParticipantes Inst) {
           return Inst.Get<ViewActividadesParticipantes>();
       }
   }
}
