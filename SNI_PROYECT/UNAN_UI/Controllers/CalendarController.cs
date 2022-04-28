using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SECURITY;
using CAPA_MODEL;
using System.IO;
using System.Text;
using CAPA_MODEL.Views;
using CAPA_MODEL.Entity;

namespace UNAN_UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        [HttpPost]
        public Object TakeData()
        {
            List<object> data = new List<object>();
            CatDependencias Dep = new CatDependencias();
            data.Add(Dep.Get());
            TblUsuario Users = new TblUsuario();
            data.Add(Users.Get());
            Users.IdUsuario = AuthNetCore.User().UserId;
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
        public Object TakeActividades(TblActividades Inst)
        {            
            return Inst.Get();
        }
        public Object TakeActividad(TblActividades Inst)
        {
            return Inst.GetActividad();
        }
        public Object SaveActividad(TblActividades Act)
        {            
            return Act.SaveActividades();
        }
        public Object SaveTarea(TblTareas Act)
        {
            return Act.SaveTarea();
        }
        public Object SolicitarActividad(TblActividades Act)
        {
            return Act.SolicitarActividades();
        }
        //Agenda por usuario
        public Object AgendaUsuarioDependencia(CatDependencias Act)
        {
            TblAgenda ag = new TblAgenda();
            ag.IdDependencia = Act.IdDependencia;
            ag.IdUsuario = AuthNetCore.User().UserId;
            return ag.Get();
        }
        public Object SaveAgendaUsuarioDependencia(TblAgenda Act)
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
            TblAgenda ag = new TblAgenda();
            ag.IdDependencia = this.IdDependencia;
            this.Agenda = ag.Get();
        }
        public void TakeActividades()
        {
            TblActividades ag = new TblActividades();
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
