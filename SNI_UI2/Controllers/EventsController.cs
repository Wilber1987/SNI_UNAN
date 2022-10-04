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


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        public EventsController()
        {

        }
        [HttpPost]
        [AuthController]
        public object GetEventos(Tbl_Evento Inst)
        {           
            return Inst.GetEventos();
        }
        public object GetEventosPropiosGestion(Tbl_Evento Inst)
        {
            return Inst.GetEventosPropiosGestion();
        }
        public object GetEvento(Tbl_Evento Inst)
        {
            return Inst.GetEvento();
        }
        public object GetEventosInvitados(Tbl_Evento Inst)
        {
            return Inst.GetEventosInvitados();
        }
        public object GetEventosPropios(Tbl_Evento Inst)
        {
            return Inst.GetEventosPropios();
        }
        public object GetParticipaciones(Tbl_Participantes_Eventos Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.Get<Tbl_Participantes_Eventos>();
        }
        public Tbl_Participantes_Eventos AprobarParticipacion(Tbl_Participantes_Eventos Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.AprobarParticipacion();
        }
        public Tbl_Participantes_Eventos RechazarParticipacion(Tbl_Participantes_Eventos Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.RechazarParticipacion();
        }
        public Tbl_Participantes_Eventos CancelarParticipacion(Tbl_Participantes_Eventos Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.CancelarParticipacion();
        }
        public object InvitarInvestigadores(Tbl_Evento Inst)
        {
            return Inst.InvitarInvestigadores();
        }
        public Object AceptarInvitacion(Tbl_Invitaciones Inst)
        {
            return Inst.ChangeEstadoInvitacion("ACEPTADA");
        }
        public Object RechazarInvitacion(Tbl_Invitaciones Inst)
        {
            return Inst.ChangeEstadoInvitacion("RECHAZADA");
        }
        public object GetEventosInvitaciones(Tbl_Invitaciones Inst)
        {
            Inst.Id_Investigador = AuthNetCore.User().UserId;
            return Inst.Get<Tbl_Invitaciones>();
        }

    }
}
