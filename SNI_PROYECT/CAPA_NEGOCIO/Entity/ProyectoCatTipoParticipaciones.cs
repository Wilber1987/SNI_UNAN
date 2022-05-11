using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO
{
    public class ProyectoCatTipoParticipaciones : EntityClass
    {
        public int? IdTipoParticipacion { get; set; }
        public string Descripcion { get; set; }
    }
}
