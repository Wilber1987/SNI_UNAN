using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SECURITY;
using CAPA_MODEL;

namespace UNAN_UI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        [HttpPost]
        public Object TakeData()
        {
            
            return cal;
        }
        public Object TakeCalendar(Calendar cal)
        {
            cal.TakeActividades();
            cal.TakeAgenda();
            return cal;
        }
    }
    public class Calendar
    {
        public int IdDependencia { get; set; }
        public int IdUsuario { get; set; }
        public List<Object> Actividades { get; set; }
        public List<Object> Agenda { get; set; }
        
        public void TakeAgenda()
        {
            TblAgenda ag = new TblAgenda();
            this.Agenda = ag.TakeAgenda();
        }
        public void TakeActividades()
        {
            TblActividades ag = new TblActividades();
            this.Actividades = ag.TakeActividades();
        }
    }
}
