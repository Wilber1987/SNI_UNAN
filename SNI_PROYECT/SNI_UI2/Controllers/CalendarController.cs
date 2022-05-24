using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;
using System.Text;
using CAPA_NEGOCIO;
using CAPA_NEGOCIO.Security;
using CAPA_NEGOCIO.Entity;
using CAPA_NEGOCIO.Views;
using CAPA_NEGOCIO.MAPEO;

namespace SNI_UI2.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        [HttpPost]
        public Object TakeData()
        {
            List<object> data = new List<object>();
            ProyectoCatDependencias Dep = new ProyectoCatDependencias();
            data.Add(Dep.Get());
            Tbl_InvestigatorProfile Users = new Tbl_InvestigatorProfile();
            data.Add(Users.Get());
            Users.Id_Investigador = AuthNetCore.User().UserId;
            data.Add(Users.TakeDepCoordinaciones());
            return data;
        }
        public Object TakeCalendar(Calendar cal)
        {
            cal.TakeActividades();
            cal.TakeAgenda();
            cal.TakeCalendario();
            return cal;
        }
        public Object TakeActividades(ProyectoTableActividades Inst)
        {            
            return Inst.Get();
        }
        public Object TakeActividad(ProyectoTableActividades Inst)
        {
            return Inst.GetActividad();
        }
        public Object SaveActividad(ProyectoTableActividades Act)
        {            
            return Act.SaveActividades();
        }
        public Object SaveTarea(ProyectoTableTareas Act)
        {
            return Act.SaveTarea();
        }
        public Object SolicitarActividad(ProyectoTableActividades Act)
        {
            return Act.SolicitarActividades();
        }
        //Agenda por usuario
        public Object AgendaUsuarioDependencia(ProyectoCatDependencias Act)
        {
            ProyectoTableAgenda ag = new ProyectoTableAgenda();
            ag.IdDependencia = Act.IdDependencia;
            ag.IdUsuario = AuthNetCore.User().UserId;
            return ag.Get();
        }
        public Object SaveAgendaUsuarioDependencia(ProyectoTableAgenda Act)
        {
            if (Act.IdAgenda != null)
            {
                return Act.Update("IdAgenda");
            }
            return Act.Save();
        }
    }
    public class Calendar
    {
        public int IdDependencia { get; set; }
        public int IdUsuario { get; set; }
        public List<Object> Actividades { get; set; }
        public List<Object> Agenda { get; set; }
        public List<Object> Calendario { get; set; }

        public void TakeAgenda()
        {
            ProyectoTableAgenda ag = new ProyectoTableAgenda();
            ag.IdDependencia = this.IdDependencia;
            this.Agenda = ag.Get();
        }
        public void TakeActividades()
        {
            ProyectoTableActividades ag = new ProyectoTableActividades();
            this.Actividades = ag.Get();
        }
        public void TakeCalendario()
        {
            ViewCalendarioByDependencia ag = new ViewCalendarioByDependencia();
            ag.IdDependencia = this.IdDependencia;
            this.Calendario = ag.Get();
        }
    }
}
