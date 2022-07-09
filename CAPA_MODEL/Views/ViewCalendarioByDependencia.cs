using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_MODEL.Views
{
    public class ViewCalendarioByDependencia : EntityClass
    {
        public int? IdDependencia { get; set; }
        public int? IdCalendario { get; set; }
        public int? IdActividad { get; set; }
        public int? IdTarea { get; set; }
        public int? IdTareaPadre { get; set; }
        public string Estado { get; set; }
        public DateTime? Fecha_Inicial { get; set; }
        public DateTime? Fecha_Final { get; set; }

    }
}
