using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO
{
    public class ProyectoTableParticipantes : EntityClass
    {
        public int? IdTarea { get; set; }
        public int? Id_Investigador { get; set; }
        public int? IdTipoParticipacion { get; set; }

    }
}
