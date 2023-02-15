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
       public List<ViewInvestigacionesDisciplinas> getViewInvestigacionesDisciplinas() {
           return new ViewInvestigacionesDisciplinas().Get<ViewInvestigacionesDisciplinas>();
       }
       //ViewInvestigacionesPhoto
       [HttpPost]
       [AuthController]
       public List<ViewInvestigacionesPhoto> getViewInvestigacionesPhoto() {
           return new ViewInvestigacionesPhoto().Get<ViewInvestigacionesPhoto>();
       }
       //ViewInvestigaciones
       [HttpPost]
       [AuthController]
       public List<ViewInvestigaciones> getViewInvestigaciones() {
           return new ViewInvestigaciones().Get<ViewInvestigaciones>();
       }
       //ViewColaboradores
       [HttpPost]
       [AuthController]
       public List<ViewColaboradores> getViewColaboradores() {
           return new ViewColaboradores().Get<ViewColaboradores>();
       }
       //ViewParticipantesProyectos
       [HttpPost]
       [AuthController]
       public List<ViewParticipantesProyectos> getViewParticipantesProyectos() {
           return new ViewParticipantesProyectos().Get<ViewParticipantesProyectos>();
       }
       //ViewRedesInvestigadores
       [HttpPost]
       [AuthController]
       public List<ViewRedesInvestigadores> getViewRedesInvestigadores() {
           return new ViewRedesInvestigadores().Get<ViewRedesInvestigadores>();
       }
       //ViewIdiomasInvestigadores
       [HttpPost]
       [AuthController]
       public List<ViewIdiomasInvestigadores> getViewIdiomasInvestigadores() {
           return new ViewIdiomasInvestigadores().Get<ViewIdiomasInvestigadores>();
       }
       //ViewCalendarioByDependencia
       [HttpPost]
       [AuthController]
       public List<ViewCalendarioByDependencia> getViewCalendarioByDependencia() {
           return new ViewCalendarioByDependencia().Get<ViewCalendarioByDependencia>();
       }
       //ViewActividadesParticipantes
       [HttpPost]
       [AuthController]
       public List<ViewActividadesParticipantes> getViewActividadesParticipantes() {
           return new ViewActividadesParticipantes().Get<ViewActividadesParticipantes>();
       }
   }
}
