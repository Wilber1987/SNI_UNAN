using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO
{
    public class ProyectoTableAgenda : EntityClass
    {
        public int? IdAgenda { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdDependencia { get; set; }
        public string Dia { get; set; }
        public string Hora_Inicial { get; set; }
        public string Hora_Final { get; set; }
        public DateTime? Fecha_Caducidad { get; set; }      

    }
}
